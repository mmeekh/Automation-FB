import { NextRequest, NextResponse } from 'next/server';
import { verifyFacebookToken, exchangeForLongLivedToken } from '@/lib/auth/facebook';
import { createToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

interface LoginRequest {
  accessToken: string;
}

/**
 * POST /api/auth/facebook
 *
 * Login with Facebook access token
 *
 * @body {accessToken: string} - Facebook access token from client SDK
 * @returns {user, token} - User info and JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // 1. Verify the Facebook token and get user info
    const facebookUser = await verifyFacebookToken(accessToken);

    if (!facebookUser) {
      return NextResponse.json(
        { error: 'Invalid Facebook token' },
        { status: 401 }
      );
    }

    // 2. Exchange short-lived token for long-lived token (60 days)
    const longLivedTokenData = await exchangeForLongLivedToken(accessToken);
    const finalAccessToken = longLivedTokenData?.access_token || accessToken;
    const expiresIn = longLivedTokenData?.expires_in || 3600; // Default 1 hour if exchange fails

    // 3. Create or update user in database
    const user = await prisma.user.upsert({
      where: { facebookId: facebookUser.id },
      update: {
        email: facebookUser.email,
        name: facebookUser.name,
        picture: facebookUser.picture?.data?.url,
      },
      create: {
        facebookId: facebookUser.id,
        email: facebookUser.email,
        name: facebookUser.name,
        picture: facebookUser.picture?.data?.url,
        subscriptionTier: 'free',
      },
    });

    // 4. Create JWT payload with database user ID
    const jwtPayload = {
      userId: user.id, // Database ID (cuid)
      facebookId: user.facebookId,
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      picture: user.picture ?? undefined,
      accessToken: finalAccessToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    // 5. Create JWT token
    const token = await createToken(jwtPayload);

    // 6. Log login event
    await prisma.event.create({
      data: {
        userId: user.id,
        eventType: 'user_login',
        details: {
          method: 'facebook',
          timestamp: new Date().toISOString(),
        },
      },
    });

    // 7. Set cookie and return response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        facebookId: user.facebookId,
        name: user.name,
        email: user.email,
        picture: user.picture,
        subscriptionTier: user.subscriptionTier,
      },
      token,
    });

    // Set HTTP-only cookie for security
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Facebook login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
