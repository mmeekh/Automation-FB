'use client';

import { ChangeEvent } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { Button } from '@/lib/types/flow';

interface ButtonBuilderProps {
  buttons: Button[];
  onChange: (buttons: Button[]) => void;
}

const createButton = (type: Button['type']): Button => ({
  id: `btn-${Math.random().toString(36).slice(2, 9)}`,
  text: type === 'whatsapp' ? 'WhatsApp Appointment' : 'Cancel',
  type,
  whatsappConfig:
    type === 'whatsapp'
      ? {
          phoneNumber: '',
          messageTemplate: 'Merhaba! Randevu almak istiyorum.',
        }
      : undefined,
});

export function ButtonBuilder({ buttons, onChange }: ButtonBuilderProps) {
  const updateButton = (id: string, changes: Partial<Button>) => {
    const updated = buttons.map((button) => {
      if (button.id !== id) return button;
      return {
        ...button,
        ...changes,
        whatsappConfig:
          changes.type && changes.type !== 'whatsapp'
            ? undefined
            : changes.whatsappConfig ?? button.whatsappConfig,
      };
    });

    onChange(updated);
  };

  const updateWhatsappConfig = (
    id: string,
    field: 'phoneNumber' | 'messageTemplate',
    value: string
  ) => {
    const updated = buttons.map((button) => {
      if (button.id !== id) return button;
      return {
        ...button,
        whatsappConfig: {
          phoneNumber: button.whatsappConfig?.phoneNumber ?? '',
          messageTemplate: button.whatsappConfig?.messageTemplate ?? '',
          [field]: value,
        },
      };
    });

    onChange(updated);
  };

  const handleTextChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    updateButton(id, { text: event.target.value });
  };

  const handleTypeChange = (id: string, type: Button['type']) => {
    updateButton(id, {
      type,
      whatsappConfig:
        type === 'whatsapp'
          ? {
              phoneNumber: '',
              messageTemplate: 'Merhaba! Randevu almak istiyorum.',
            }
          : undefined,
    });
  };

  const removeButton = (id: string) => {
    const updated = buttons.filter((button) => button.id !== id);
    onChange(updated);
  };

  const addButton = (type: Button['type']) => {
    const newButton = createButton(type);
    onChange([...buttons, newButton]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-800">Buttons</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => addButton('whatsapp')}
            className="flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
          >
            <PlusIcon className="h-4 w-4" />
            WhatsApp
          </button>
          <button
            type="button"
            onClick={() => addButton('cancel')}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100"
          >
            <PlusIcon className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>

      {buttons.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-500">
          No buttons yet. Add a WhatsApp or Cancel button.
        </div>
      ) : (
        <div className="space-y-3">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-500 uppercase">
                    Button Type
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTypeChange(button.id, 'whatsapp')}
                      className={clsx(
                        'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                        button.type === 'whatsapp'
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      )}
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange(button.id, 'cancel')}
                      className={clsx(
                        'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                        button.type === 'cancel'
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      )}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeButton(button.id)}
                  className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove button"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-neutral-500">
                    Button Label
                    <input
                      type="text"
                      value={button.text}
                      onChange={handleTextChange(button.id)}
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="Button text"
                    />
                  </label>
                </div>

                {button.type === 'whatsapp' && (
                  <>
                    <div>
                      <label className="text-xs font-semibold uppercase text-neutral-500">
                        Phone Number
                        <input
                          type="tel"
                          value={button.whatsappConfig?.phoneNumber ?? ''}
                          onChange={(event) =>
                            updateWhatsappConfig(button.id, 'phoneNumber', event.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                          placeholder="905321234567"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-neutral-500">
                        Message Template
                        <textarea
                          value={button.whatsappConfig?.messageTemplate ?? ''}
                          onChange={(event) =>
                            updateWhatsappConfig(button.id, 'messageTemplate', event.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                          rows={3}
                          placeholder="Merhaba! Randevu almak istiyorum."
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
