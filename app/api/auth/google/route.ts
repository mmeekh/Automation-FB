import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { createToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

interface GoogleLoginRequest {
  idToken?: string;
  accessToken?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GoogleLoginRequest = await request.json();
    const { idToken, accessToken } = body;

    if (!idToken && !accessToken) {
      return NextResponse.json(
        { error: 'ID token or access token is required' },
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
    let googleId: string | undefined;
    let email: string | null = null;
    let name: string | null = null;
    let picture: string | null = null;
    let providerToken = idToken || accessToken!;
    let expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

    if (idToken) {
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

      googleId = payload.sub;
      email = payload.email ?? null;
      name = payload.name ?? null;
      picture = payload.picture ?? null;
    } else if (accessToken) {
      try {
        const tokenInfo = await client.getTokenInfo(accessToken);
        if (tokenInfo.aud !== clientId) {
          return NextResponse.json(
            { error: 'Access token audience mismatch' },
            { status: 401 }
          );
        }
        googleId = tokenInfo.sub;
        if (tokenInfo.expiry_date) {
          expiresAt = tokenInfo.expiry_date;
        }
      } catch (error) {
        console.error('Failed to verify access token:', error);
        return NextResponse.json(
          { error: 'Invalid Google access token' },
          { status: 401 }
        );
      }

      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!userInfoRes.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await userInfoRes.json();
        googleId = userInfo.sub || googleId;
        email = userInfo.email ?? null;
        name = userInfo.name ?? null;
        picture = userInfo.picture ?? null;
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        return NextResponse.json(
          { error: 'Unable to fetch Google user info' },
          { status: 500 }
        );
      }
    }

    if (!googleId) {
      return NextResponse.json(
        { error: 'Unable to determine Google user ID' },
        { status: 401 }
      );
    }

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
      accessToken: providerToken,
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
