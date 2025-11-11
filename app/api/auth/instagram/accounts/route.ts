import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth/jwt';
import { getAllInstagramAccounts } from '@/lib/auth/facebook';
import { prisma } from '@/lib/db';

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

    // 3. Fetch Instagram accounts from Facebook Graph API
    const accounts = await getAllInstagramAccounts(user.accessToken);

    // 4. Save/update accounts in database
    const savedAccounts = await Promise.all(
      accounts.map(async (account) => {
        // Calculate token expiration (60 days for long-lived tokens)
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 60);

        return prisma.instagramAccount.upsert({
          where: { instagramId: account.id },
          update: {
            username: account.username,
            name: account.name,
            profilePictureUrl: account.profile_picture_url,
            followersCount: account.followers_count,
            accessToken: user.accessToken, // Use Facebook access token
            tokenExpiresAt,
            isActive: true,
          },
          create: {
            userId: user.userId,
            instagramId: account.id,
            username: account.username,
            name: account.name,
            profilePictureUrl: account.profile_picture_url,
            followersCount: account.followers_count,
            accessToken: user.accessToken,
            tokenExpiresAt,
            isActive: true,
          },
        });
      })
    );

    // 5. Log event
    await prisma.event.create({
      data: {
        userId: user.userId,
        eventType: 'instagram_accounts_synced',
        details: {
          accountCount: savedAccounts.length,
          timestamp: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      accounts: savedAccounts.map((acc) => ({
        id: acc.id,
        instagramId: acc.instagramId,
        username: acc.username,
        name: acc.name,
        profilePictureUrl: acc.profilePictureUrl,
        followersCount: acc.followersCount,
        isActive: acc.isActive,
      })),
    });
  } catch (error) {
    console.error('Error fetching Instagram accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram accounts' },
      { status: 500 }
    );
  }
}
