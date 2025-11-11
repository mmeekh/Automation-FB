import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  userId: string; // Database user ID (cuid)
  facebookId: string;
  email?: string;
  name?: string;
  picture?: string;
  accessToken: string;
  expiresAt: number;
}

/**
 * Create a JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // Token expires in 30 days
    .sign(secret);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Get user from request cookies and load from database
 */
export async function getUserFromCookies(cookieHeader: string | null): Promise<JWTPayload | null> {
  if (!cookieHeader) return null;

  const token = cookieHeader
    .split(';')
    .find((c) => c.trim().startsWith('auth_token='))
    ?.split('=')[1];

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  // Verify user still exists in database
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) return null;

  // Return payload with fresh data from database
  return {
    ...payload,
    email: user.email || payload.email,
    name: user.name || payload.name,
    picture: user.picture || payload.picture,
  };
}
