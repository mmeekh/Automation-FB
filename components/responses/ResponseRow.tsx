'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AutomationResponse } from '@/lib/types/response';
import { ImagePreviewModal } from './ImagePreviewModal';
import { ConversationModal } from './ConversationModal';
import { formatDateTime } from '@/lib/utils/date';

interface ResponseRowProps {
  response: AutomationResponse;
}

export function ResponseRow({ response }: ResponseRowProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConversation, setShowConversation] = useState(false);

  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    failed: 'bg-red-100 text-red-700',
    abandoned: 'bg-neutral-100 text-neutral-700',
  };

  const statusLabels = {
    completed: 'Tamamlandı',
    in_progress: 'Devam Ediyor',
    failed: 'Başarısız',
    abandoned: 'Terk Edildi',
  };

  return (
    <>
      <div
        className="grid grid-cols-4 gap-4 p-4 hover:bg-neutral-50 transition cursor-pointer"
        onClick={() => setShowConversation(true)}
      >
        {/* Column 1: User Info */}
        <div className="flex items-center gap-3">
          <Image
            src={response.profilePicture}
            alt={response.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="min-w-0">
            <p className="font-semibold text-neutral-900 text-sm truncate">@{response.username}</p>
            <p className="text-xs text-neutral-500">
              {formatDateTime(response.startedAt)}
            </p>
            <span
              className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${statusColors[response.status]}`}
            >
              {statusLabels[response.status]}
            </span>
          </div>
        </div>

        {/* Column 2: Input Image 1 */}
        <div
          className="flex justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setPreviewImage(response.inputImage1);
          }}
        >
          {response.inputImage1 ? (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-200 hover:shadow-lg transition cursor-pointer">
              <Image src={response.inputImage1} alt="Input 1" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center">
              <span className="text-xs text-neutral-400">Yok</span>
            </div>
          )}
        </div>

        {/* Column 3: Input Image 2 */}
        <div
          className="flex justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setPreviewImage(response.inputImage2);
          }}
        >
          {response.inputImage2 ? (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-200 hover:shadow-lg transition cursor-pointer">
              <Image src={response.inputImage2} alt="Input 2" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center">
              <span className="text-xs text-neutral-400">Yok</span>
            </div>
          )}
        </div>

        {/* Column 4: Output Image */}
        <div
          className="flex justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setPreviewImage(response.outputImage);
          }}
        >
          {response.outputImage ? (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-green-300 hover:shadow-lg transition cursor-pointer">
              <Image src={response.outputImage} alt="Output" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center">
              <span className="text-xs text-neutral-400">Yok</span>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {previewImage && <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />}
      {showConversation && (
        <ConversationModal response={response} onClose={() => setShowConversation(false)} />
      )}
    </>
  );
}
