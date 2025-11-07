import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth/jwt';
import { getAllInstagramAccounts } from '@/lib/auth/facebook';

export const runtime = 'nodejs';

/**
 * GET /api/auth/instagram/accounts
 *
 * Get all Instagram business accounts connected to user's Facebook pages
 * Requires authentication
 *
 * @returns {accounts: InstagramBusinessAccount[]}
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Get user from cookie
    const user = await getUserFromCookies(request.cookies.get('auth_token')?.value || null);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Check if token is expired
    if (user.expiresAt < Date.now()) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    // 3. Fetch Instagram accounts
    const accounts = await getAllInstagramAccounts(user.accessToken);

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error) {
    console.error('Error fetching Instagram accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram accounts' },
      { status: 500 }
    );
  }
}
