import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { createToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

interface GoogleLoginRequest {
  idToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GoogleLoginRequest = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('Google client ID is not configured');
      return NextResponse.json(
        { error: 'Authentication server misconfigured' },
        { status: 500 }
      );
    }

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub) {
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      );
    }

    const googleId = payload.sub;
    const email = payload.email ?? null;
    const name = payload.name ?? null;
    const picture = payload.picture ?? null;

    const now = Date.now();
    const expiresAt = now + 30 * 24 * 60 * 60 * 1000; // 30 days

    const user = await prisma.user.upsert({
      where: { googleId },
      update: {
        email,
        name,
        picture,
      },
      create: {
        googleId,
        email,
        name,
        picture,
        subscriptionTier: 'free',
      },
    });

    const jwtPayload = {
      userId: user.id,
      facebookId: user.facebookId ?? undefined,
      googleId: user.googleId ?? undefined,
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      picture: user.picture ?? undefined,
      accessToken: idToken,
      expiresAt,
    };

    const token = await createToken(jwtPayload);

    await prisma.event.create({
      data: {
        userId: user.id,
        eventType: 'user_login',
        details: {
          method: 'google',
          timestamp: new Date().toISOString(),
        },
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        facebookId: user.facebookId,
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
        subscriptionTier: user.subscriptionTier,
      },
      token,
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
