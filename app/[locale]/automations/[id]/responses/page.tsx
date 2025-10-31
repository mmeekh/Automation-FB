'use client';

import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { ResponsesTable } from '@/components/responses/ResponsesTable';
import { getMockResponsesByFlow } from '@/lib/mock-data/responses';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAutomationLauncher } from '@/lib/hooks/useAutomationLauncher';

export default function ResponsesPage() {
  const params = useParams();
  const flowId = params.id as string;
  const templateId = flowId.startsWith('flow-') ? flowId.slice(5) : flowId;
  const user = useStore((state) => state.user);
  const openAuthModal = useStore((state) => state.openAuthModal);
  const launchAutomation = useAutomationLauncher();

  // Get responses for this flow
  const responses = getMockResponsesByFlow(flowId);

  if (!user) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
          <div className="max-w-md w-full text-center bg-white border border-neutral-200/80 rounded-3xl shadow-xl p-10 space-y-4">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Yanıtları görmek için giriş yapın
            </h1>
            <Button onClick={openAuthModal} size="lg" className="w-full">
              Giriş Yap
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={() => launchAutomation(templateId, { mode: 'push' })}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Otomasyona Dön
            </Button>
            <h1 className="text-3xl font-bold text-neutral-900">
              Kullanıcı Yanıtları
            </h1>
            <p className="text-neutral-600 mt-2">
              {responses.length} kullanıcı bu otomasyonla etkileşime girdi
            </p>
          </div>

          {/* Table */}
          <ResponsesTable responses={responses} flowId={flowId} />
        </div>
      </main>
    </>
  );
}
