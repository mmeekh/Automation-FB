'use client';

import { ChangeEvent } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { ResultFlowNode, ResultNodeData } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { EmojiPicker } from './EmojiPicker';
import { ImageUploader } from './ImageUploader';

type DelayedMessage = NonNullable<ResultNodeData['delayedMessages']>[number];

interface ResultEditorProps {
  node: ResultFlowNode;
}

export function ResultEditor({ node }: ResultEditorProps) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);
  const currentFlow = useFlowStore((state) => state.currentFlow);

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(node.id, { label: event.target.value });
  };

  const handleOutputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(node.id, { outputTemplate: event.target.value });
  };

  const handleAppointmentChange = (
    field: 'text' | 'phoneNumber' | 'autoMessage',
    value: string
  ) => {
    const button = node.data.appointmentButton ?? {
      text: 'Randevu Al',
      phoneNumber: '',
      autoMessage: '',
    };

    updateNodeData(node.id, {
      appointmentButton: {
        ...button,
        [field]: value,
      },
    });
  };

  const generateAutoMessage = () => {
    const flowName = currentFlow?.name ?? 'otomasyon';
    const message = `Merhaba! ${flowName} sonucumu çok beğendim. Bir randevu planlamak istiyorum.`;
    handleAppointmentChange('autoMessage', message);
  };

  const handleDelayedMessageChange = (
    index: number,
    field: 'delay' | 'text',
    value: string | number
  ) => {
    const messages = node.data.delayedMessages ?? [];
    const updated = messages.map((message: DelayedMessage, idx: number) =>
      idx === index
        ? {
            ...message,
            [field]: field === 'delay' ? Number(value) : value,
          }
        : message
    );

    updateNodeData(node.id, { delayedMessages: updated });
  };

  const addDelayedMessage = () => {
    const messages = node.data.delayedMessages ?? [];
    const nextDelay = messages.length > 0 ? messages[messages.length - 1].delay + 1 : 2;
    updateNodeData(node.id, {
      delayedMessages: [
        ...messages,
        {
          delay: nextDelay,
          text: 'Yeni bilgi mesajı.',
        },
      ],
    });
  };

  const removeDelayedMessage = (index: number) => {
    const messages = node.data.delayedMessages ?? [];
    updateNodeData(node.id, {
      delayedMessages: messages.filter((_, idx: number) => idx !== index),
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Appearance */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Node appearance
        </h3>
        <div className="flex items-center gap-4">
          <EmojiPicker
            value={node.data.icon}
            onSelect={(emoji) => updateNodeData(node.id, { icon: emoji })}
          />
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase text-neutral-500">
              Node Title
              <input
                type="text"
                value={node.data.label}
                onChange={handleLabelChange}
                className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Sonuç Mesajı"
              />
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Shown in the node header inside the flow.
            </p>
          </div>
        </div>
      </section>

      {/* Output template */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-neutral-800">Result Message</h3>
          <p className="text-xs text-neutral-500">
            This message is sent with the AI generated result and appointment instructions.
          </p>
        </div>
        <textarea
          value={node.data.outputTemplate}
          onChange={handleOutputChange}
          className="h-40 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="İşte yeni görünümünüz!"
        />
      </section>

      {/* Preview image */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <ImageUploader
          label="Result Image"
          description="Optional AI generated result preview."
          value={node.data.imageUrl}
          onChange={(imageUrl) => updateNodeData(node.id, { imageUrl })}
        />
      </section>

      {/* Appointment button */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-800">Appointment Button</h3>
            <p className="text-xs text-neutral-500">
              Configure the WhatsApp CTA that schedules the salon appointment.
            </p>
          </div>

          <button
            type="button"
            onClick={generateAutoMessage}
            className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-600 transition hover:bg-primary-100"
          >
            Auto-generate message
          </button>
        </div>

        <div className="grid gap-4">
          <label className="text-xs font-semibold uppercase text-neutral-500">
            Button Label
            <input
              type="text"
              value={node.data.appointmentButton?.text ?? ''}
              onChange={(event) => handleAppointmentChange('text', event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Randevu Al"
            />
          </label>

          <label className="text-xs font-semibold uppercase text-neutral-500">
            WhatsApp Phone Number
            <input
              type="tel"
              value={node.data.appointmentButton?.phoneNumber ?? ''}
              onChange={(event) => handleAppointmentChange('phoneNumber', event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="905321234567"
            />
          </label>

          <label className="text-xs font-semibold uppercase text-neutral-500">
            Auto Message
            <textarea
              value={node.data.appointmentButton?.autoMessage ?? ''}
              onChange={(event) => handleAppointmentChange('autoMessage', event.target.value)}
              className="mt-1 h-28 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Merhaba! Sonucunuzu çok beğendim..."
            />
          </label>
        </div>
      </section>

      {/* Delayed messages */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-800">Follow-up Messages</h3>
            <p className="text-xs text-neutral-500">
              Optional messages sent automatically after the result, e.g. address info.
            </p>
          </div>
          <button
            type="button"
            onClick={addDelayedMessage}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100"
          >
            <PlusIcon className="h-4 w-4" />
            Add message
          </button>
        </div>

        {(node.data.delayedMessages ?? []).length === 0 ? (
          <p className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500">
            No follow-up messages yet.
          </p>
        ) : (
          <div className="space-y-3">
            {(node.data.delayedMessages ?? []).map((message: DelayedMessage, index: number) => (
              <div
                key={`${message.delay}-${index}`}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-neutral-500">
                      Message {index + 1}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Sent after {message.delay} seconds
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDelayedMessage(index)}
                    className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove follow-up message"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid gap-3">
                  <label className="text-xs font-semibold uppercase text-neutral-500">
                    Delay (seconds)
                    <input
                      type="number"
                      min={1}
                      value={message.delay}
                      onChange={(event) =>
                        handleDelayedMessageChange(index, 'delay', Number(event.target.value))
                      }
                      className="mt-1 w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </label>

                  <label className="text-xs font-semibold uppercase text-neutral-500">
                    Message Text
                    <textarea
                      value={message.text}
                      onChange={(event) =>
                        handleDelayedMessageChange(index, 'text', event.target.value)
                      }
                      className="mt-1 h-24 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="Adres ve çalışma saatleri..."
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
