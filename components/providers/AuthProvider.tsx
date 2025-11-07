'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useStore } from '@/lib/store';

/**
 * AuthProvider - Syncs authentication state from backend to Zustand store
 *
 * This component:
 * 1. Checks authentication status on mount using the auth cookie
 * 2. Updates the Zustand store with user data from backend
 * 3. Keeps user logged in across page refreshes
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (!isLoading && user) {
      // Sync backend user to Zustand store
      setUser({
        id: user.id,
        name: user.name,
        email: user.email || '',
        avatar: user.picture || user.name.charAt(0).toUpperCase(),
      });
    } else if (!isLoading && !user) {
      // Clear store if not authenticated
      setUser(null);
    }
  }, [user, isLoading, setUser]);

  return <>{children}</>;
}
