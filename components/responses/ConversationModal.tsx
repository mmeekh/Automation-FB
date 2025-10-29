'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AutomationResponse } from '@/lib/types/response';
import { formatTime } from '@/lib/utils/date';

interface ConversationModalProps {
  response: AutomationResponse;
  onClose: () => void;
}

export function ConversationModal({ response, onClose }: ConversationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <Image
              src={response.profilePicture}
              alt={response.username}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold text-neutral-900">@{response.username}</h2>
              <p className="text-sm text-neutral-500">{response.flowName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
          {response.conversationLog.length === 0 ? (
            <p className="text-center text-neutral-500 py-8">Konuşma kaydı yok</p>
          ) : (
            response.conversationLog.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'bot'
                      ? 'bg-white border border-neutral-200'
                      : 'bg-primary-500 text-white'
                  }`}
                >
                  {msg.type === 'image' ? (
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                      <Image src={msg.content} alt="Message image" fill className="object-cover" />
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'bot' ? 'text-neutral-500' : 'text-primary-100'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-semibold text-neutral-900">
                {response.duration ? `${response.duration}s` : '-'}
              </p>
              <p className="text-neutral-500">Süre</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{response.retriesCount}</p>
              <p className="text-neutral-500">Tekrar</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{response.conversationLog.length}</p>
              <p className="text-neutral-500">Mesaj</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
