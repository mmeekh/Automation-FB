import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * GET /api/auth/me
 *
 * Get current authenticated user
 *
 * @returns {user} - Current user info
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookies(request.cookies.get('auth_token')?.value || null);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (user.expiresAt < Date.now()) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    // Load full user data with Instagram accounts from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        instagramAccounts: {
          where: { isActive: true },
          select: {
            id: true,
            instagramId: true,
            username: true,
            name: true,
            profilePictureUrl: true,
            followersCount: true,
            isActive: true,
          },
        },
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user info with Instagram accounts (without access token for security)
    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        facebookId: dbUser.facebookId,
        googleId: dbUser.googleId,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.picture,
        subscriptionTier: dbUser.subscriptionTier,
        instagramAccounts: dbUser.instagramAccounts,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
