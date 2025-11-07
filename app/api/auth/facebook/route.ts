import { NextRequest, NextResponse } from 'next/server';
import { verifyFacebookToken, exchangeForLongLivedToken } from '@/lib/auth/facebook';
import { createToken } from '@/lib/auth/jwt';

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

    // 3. Create JWT payload
    const jwtPayload = {
      userId: facebookUser.id,
      facebookId: facebookUser.id,
      email: facebookUser.email,
      name: facebookUser.name,
      picture: facebookUser.picture?.data?.url,
      accessToken: finalAccessToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    // 4. Create JWT token
    const token = await createToken(jwtPayload);

    // 5. Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: facebookUser.id,
        name: facebookUser.name,
        email: facebookUser.email,
        picture: facebookUser.picture?.data?.url,
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
