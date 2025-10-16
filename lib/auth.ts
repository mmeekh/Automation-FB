/**
 * Frontend OAuth Handler Functions
 * Backend'e kolayca bağlanabilir şekilde hazırlanmıştır
 */

export type OAuthProvider = 'google' | 'facebook' | 'instagram' | 'email';

interface OAuthConfig {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

export const oauthProviders: Record<OAuthProvider, OAuthConfig> = {
  google: {
    name: 'Google',
    icon: '🔍',
    color: 'text-red-600',
    bgColor: 'bg-white',
    hoverColor: 'hover:bg-red-50',
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: 'text-blue-600',
    bgColor: 'bg-white',
    hoverColor: 'hover:bg-blue-50',
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    color: 'text-pink-600',
    bgColor: 'bg-white',
    hoverColor: 'hover:bg-pink-50',
  },
  email: {
    name: 'Email',
    icon: '📧',
    color: 'text-neutral-600',
    bgColor: 'bg-white',
    hoverColor: 'hover:bg-neutral-50',
  },
};

/**
 * OAuth login handler
 * Backend hazır olduğunda bu fonksiyonu güncelleyerek API'ye bağlayın
 *
 * @example Backend Integration:
 * ```typescript
 * const response = await fetch('/api/auth/oauth', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ provider }),
 * });
 * const { redirectUrl } = await response.json();
 * window.location.href = redirectUrl;
 * ```
 */
export async function handleOAuthLogin(provider: OAuthProvider): Promise<void> {
  console.log(`🔐 OAuth Login initiated: ${provider}`);

  // TODO: Backend hazır olduğunda bu kısmı güncelleyin
  // Backend'den OAuth URL'i alıp yönlendirme yapın

  // Geçici: Development için alert
  if (process.env.NODE_ENV === 'development') {
    console.log(`Provider: ${provider}`);
    console.log(`Redirect URL will be: ${getOAuthRedirectUrl(provider)}`);
    alert(`${oauthProviders[provider].name} OAuth will be implemented soon!\n\nBackend endpoint: /api/auth/${provider}`);
    return;
  }

  // Production için backend çağrısı
  try {
    const response = await fetch(`/api/auth/oauth/${provider}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`OAuth initialization failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Backend'den gelen OAuth URL'ine yönlendir
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  } catch (error) {
    console.error('OAuth error:', error);
    throw error;
  }
}

/**
 * OAuth callback handler
 * Backend OAuth callback'inden dönen token'ı işler
 */
export async function handleOAuthCallback(
  provider: OAuthProvider,
  code: string
): Promise<{ token: string; user: any }> {
  console.log(`🔐 OAuth Callback: ${provider}`);

  // TODO: Backend hazır olduğunda bu endpoint'i kullanın
  const response = await fetch(`/api/auth/oauth/${provider}/callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('OAuth callback failed');
  }

  return await response.json();
}

/**
 * OAuth redirect URL builder
 * Backend'de OAuth provider'a gönderilecek redirect URL'i
 */
function getOAuthRedirectUrl(provider: OAuthProvider): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3007';

  return `${baseUrl}/api/auth/${provider}/callback`;
}

/**
 * Email/Password login with 2FA
 * Backend'e email/password gönderir
 */
export async function handleEmailLogin(
  email: string,
  password: string,
  twoFactorCode?: string
): Promise<{ token: string; user: any; requires2FA?: boolean }> {
  console.log('🔐 Email Login initiated');

  // TODO: Backend hazır olduğunda bu endpoint'i kullanın
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, twoFactorCode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
}

/**
 * Logout handler
 */
export async function handleLogout(): Promise<void> {
  console.log('🔐 Logout initiated');

  // TODO: Backend hazır olduğunda bu endpoint'i kullanın
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  }

  // Local state'i temizle
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}
