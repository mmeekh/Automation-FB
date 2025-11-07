import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth/jwt';

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

    // Return user info (without access token for security)
    return NextResponse.json({
      success: true,
      user: {
        id: user.userId,
        facebookId: user.facebookId,
        name: user.name,
        email: user.email,
        picture: user.picture,
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
