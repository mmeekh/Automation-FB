'use client';

import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface ProvidersProps {
  children: ReactNode;
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function Providers({ children }: ProvidersProps) {
  if (!googleClientId) {
    return <>{children}</>;
  }

  return <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>;
}
