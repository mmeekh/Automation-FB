/**
 * Facebook/Instagram Graph API integration
 */

const FACEBOOK_GRAPH_API = 'https://graph.facebook.com/v18.0';

export interface FacebookUser {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  instagram_business_account?: {
    id: string;
  };
}

export interface InstagramBusinessAccount {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  follows_count?: number;
  media_count?: number;
}

/**
 * Verify Facebook access token and get user info
 */
export async function verifyFacebookToken(
  accessToken: string
): Promise<FacebookUser | null> {
  try {
    const response = await fetch(
      `${FACEBOOK_GRAPH_API}/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    if (!response.ok) {
      console.error('Facebook token verification failed:', await response.text());
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error verifying Facebook token:', error);
    return null;
  }
}

/**
 * Get user's Facebook Pages
 */
export async function getFacebookPages(
  accessToken: string
): Promise<FacebookPage[]> {
  try {
    const response = await fetch(
      `${FACEBOOK_GRAPH_API}/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Facebook pages');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Facebook pages:', error);
    return [];
  }
}

/**
 * Get Instagram Business Account details
 */
export async function getInstagramAccount(
  instagramAccountId: string,
  accessToken: string
): Promise<InstagramBusinessAccount | null> {
  try {
    const response = await fetch(
      `${FACEBOOK_GRAPH_API}/${instagramAccountId}?fields=id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram account');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram account:', error);
    return null;
  }
}

/**
 * Get all Instagram accounts connected to user's Facebook pages
 */
export async function getAllInstagramAccounts(
  accessToken: string
): Promise<InstagramBusinessAccount[]> {
  const pages = await getFacebookPages(accessToken);
  const instagramAccounts: InstagramBusinessAccount[] = [];

  for (const page of pages) {
    if (page.instagram_business_account) {
      const igAccount = await getInstagramAccount(
        page.instagram_business_account.id,
        page.access_token
      );
      if (igAccount) {
        instagramAccounts.push(igAccount);
      }
    }
  }

  return instagramAccounts;
}

/**
 * Exchange short-lived token for long-lived token
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string
): Promise<{ access_token: string; expires_in: number } | null> {
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  if (!appId || !appSecret) {
    console.error('Facebook app credentials not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${FACEBOOK_GRAPH_API}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
    );

    if (!response.ok) {
      console.error('Token exchange failed:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error exchanging token:', error);
    return null;
  }
}
