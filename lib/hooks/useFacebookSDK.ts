'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: {
          authResponse: {
            accessToken: string;
            expiresIn: number;
            userID: string;
          } | null;
          status: string;
        }) => void,
        options?: { scope: string }
      ) => void;
      logout: (callback: () => void) => void;
      getLoginStatus: (
        callback: (response: {
          authResponse: {
            accessToken: string;
            expiresIn: number;
            userID: string;
          } | null;
          status: string;
        }) => void
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';
const FACEBOOK_SDK_VERSION = 'v18.0';

/**
 * Facebook SDK hook
 *
 * @example
 * const { isLoaded, login, logout } = useFacebookSDK();
 *
 * const handleLogin = async () => {
 *   const result = await login();
 *   if (result.accessToken) {
 *     // Use access token to login to your backend
 *     await backendLogin(result.accessToken);
 *   }
 * };
 */
export function useFacebookSDK() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    if (document.getElementById('facebook-jssdk')) {
      setIsLoaded(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: FACEBOOK_SDK_VERSION,
      });
      setIsLoaded(true);
    };

    // Load SDK script
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  /**
   * Login with Facebook
   * Requests permissions for Instagram access
   */
  const login = async (): Promise<{
    success: boolean;
    accessToken?: string;
    userID?: string;
    error?: string;
  }> => {
    if (!isLoaded || !window.FB) {
      return { success: false, error: 'Facebook SDK not loaded' };
    }

    return new Promise((resolve) => {
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            resolve({
              success: true,
              accessToken: response.authResponse.accessToken,
              userID: response.authResponse.userID,
            });
          } else {
            resolve({
              success: false,
              error: 'User cancelled login or did not fully authorize.',
            });
          }
        },
        {
          scope: [
            'email',
            'public_profile',
            'instagram_basic',
            'instagram_manage_messages',
            'pages_manage_metadata',
            'pages_read_engagement',
            'pages_show_list',
          ].join(','),
        }
      );
    });
  };

  /**
   * Logout from Facebook
   */
  const logout = async (): Promise<void> => {
    if (!isLoaded || !window.FB) {
      return;
    }

    return new Promise((resolve) => {
      window.FB.logout(() => {
        resolve();
      });
    });
  };

  /**
   * Get login status
   */
  const getLoginStatus = async (): Promise<{
    isConnected: boolean;
    accessToken?: string;
    userID?: string;
  }> => {
    if (!isLoaded || !window.FB) {
      return { isConnected: false };
    }

    return new Promise((resolve) => {
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected' && response.authResponse) {
          resolve({
            isConnected: true,
            accessToken: response.authResponse.accessToken,
            userID: response.authResponse.userID,
          });
        } else {
          resolve({ isConnected: false });
        }
      });
    });
  };

  return {
    isLoaded,
    login,
    logout,
    getLoginStatus,
  };
}
