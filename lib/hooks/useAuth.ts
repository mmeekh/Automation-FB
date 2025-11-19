'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/services/api';

export interface User {
  id: string;
  facebookId?: string;
  googleId?: string;
  name: string;
  email?: string;
  picture?: string;
  subscriptionTier?: string;
}

export interface InstagramAccount {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  follows_count?: number;
  media_count?: number;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Authentication hook for Facebook/Instagram login
 *
 * @example
 * const { user, login, logout, fetchInstagramAccounts } = useAuth();
 *
 * // Login with Facebook
 * const handleLogin = async () => {
 *   const result = await login(facebookAccessToken);
 *   if (result.success) {
 *     console.log('Logged in:', result.user);
 *   }
 * };
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const setAuthenticatedUser = useCallback((user: User) => {
    setState({
      user,
      isLoading: false,
      isAuthenticated: true,
    });
  }, []);

  /**
   * Fetch current user from API
   */
  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get<{ success: boolean; user: User }>('/auth/me');
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      // Silent fail - user not authenticated, which is fine
      console.log('[useAuth] User not authenticated');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  /**
   * Login with Facebook access token
   */
  const login = useCallback(async (accessToken: string) => {
    try {
      const response = await api.post<{ success: boolean; user: User; token: string }>(
        '/auth/facebook',
        { accessToken }
      );

      setAuthenticatedUser(response.user);

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed' };
    }
  }, [setAuthenticatedUser]);

  const loginWithGoogle = useCallback(async (idToken: string) => {
    try {
      const response = await api.post<{ success: boolean; user: User; token: string }>(
        '/auth/google',
        { idToken }
      );

      setAuthenticatedUser(response.user);

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Google login failed:', error);
      return { success: false, error: 'Google login failed' };
    }
  }, [setAuthenticatedUser]);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  /**
   * Fetch Instagram accounts
   */
  const fetchInstagramAccounts = useCallback(async (): Promise<InstagramAccount[]> => {
    try {
      const response = await api.get<{ success: boolean; accounts: InstagramAccount[] }>(
        '/auth/instagram/accounts'
      );
      return response.accounts;
    } catch (error) {
      console.error('Failed to fetch Instagram accounts:', error);
      return [];
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    login,
    loginWithGoogle,
    logout,
    fetchUser,
    fetchInstagramAccounts,
  };
}
