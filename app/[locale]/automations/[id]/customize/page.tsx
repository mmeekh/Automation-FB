'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

/**
 * Legacy customize page - redirects to new flow builder
 * This page is kept for backward compatibility
 */
export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  useEffect(() => {
    // Map template ID to flow ID
    const flowId = `flow-${templateId}`;
    // Redirect to new builder page
    router.replace(`/automations/builder/${flowId}`);
  }, [templateId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="text-neutral-600">Redirecting to Flow Builder...</p>
      </div>
    </div>
  );
}
