'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MessageFlowNode, Button } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { validationRules } from '@/lib/utils/validation';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { EmojiPicker } from './EmojiPicker';
import { ImageUploader } from './ImageUploader';
import { ButtonBuilder } from './ButtonBuilder';

interface MessageEditorProps {
  node: MessageFlowNode;
}

export function MessageEditor({ node }: MessageEditorProps) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const [messageText, setMessageText] = useState(node.data.messageText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isArtNode = (node.data.icon ?? '').toUpperCase() === 'ART';
  const messagePlaceholder = isArtNode
    ? 'Begendigimiz gorseli tanimlayan mesaji buraya yazin...'
    : 'Merhaba! Sac modelinizi AI ile degistirebilirim...';

  useEffect(() => {
    setMessageText(node.data.messageText);
  }, [node.data.messageText, node.id]);

  const handleLabelChange = (value: string, isValid: boolean) => {
    if (isValid) {
      updateNodeData(node.id, { label: value });
    }
  };

  const handleMessageChange = (value: string, isValid: boolean) => {
    setMessageText(value);
    if (isValid) {
      updateNodeData(node.id, { messageText: value });
    }
  };

  const handleIconSelect = (emoji: string) => {
    updateNodeData(node.id, { icon: emoji });
  };

  const handleEmojiInsert = useCallback(
    (emoji: string) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        const combined = `${messageText}${emoji}`;
        setMessageText(combined);
        updateNodeData(node.id, { messageText: combined });
        return;
      }

      const start = textarea.selectionStart ?? messageText.length;
      const end = textarea.selectionEnd ?? messageText.length;
      const nextValue = `${messageText.slice(0, start)}${emoji}${messageText.slice(end)}`;

      setMessageText(nextValue);
      updateNodeData(node.id, { messageText: nextValue });

      // restore cursor position after emoji insert
      requestAnimationFrame(() => {
        textarea.focus();
        const caretPosition = start + emoji.length;
        textarea.setSelectionRange(caretPosition, caretPosition);
      });
    },
    [messageText, node.id, updateNodeData]
  );

  const handleButtonsChange = (buttons: Button[]) => {
    updateNodeData(node.id, { buttons });
  };

  const handleImageChange = (imageUrl: string | null) => {
    updateNodeData(node.id, { imageUrl });
  };

  const handleSecondaryTextChange = (value: string) => {
    updateNodeData(node.id, { secondaryText: value });
  };

  const handleStatusTextChange = (value: string) => {
    updateNodeData(node.id, { statusText: value });
  };

  const handleMaxRetriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    updateNodeData(node.id, {
      maxRetries: Number.isFinite(nextValue) ? Math.max(1, Math.min(10, Math.round(nextValue))) : 1,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Node meta */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Node appearance
        </h3>
        <div className="flex items-center gap-4">
          <EmojiPicker value={node.data.icon} onSelect={handleIconSelect} />
          <div className="flex-1">
            <FormInput
              label="Node Title"
              value={node.data.label}
              onChange={handleLabelChange}
              placeholder="Welcome Message"
              helperText="Shown at the top of the node inside the canvas."
              validationRules={[
                validationRules.required('Node title is required'),
                validationRules.minLength(3, 'Node title must be at least 3 characters'),
                validationRules.maxLength(50, 'Node title cannot exceed 50 characters'),
              ]}
            />
          </div>
        </div>
      </section>

      {/* Message body */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-800">Message Text</h3>
            <p className="text-xs text-neutral-500">
              Use line breaks to create paragraphs. Emojis are supported.
            </p>
          </div>
          <EmojiPicker
            onSelect={handleEmojiInsert}
            className="translate-y-1"
          />
        </div>

        <FormTextarea
          ref={textareaRef}
          value={messageText}
          onChange={handleMessageChange}
          placeholder={messagePlaceholder}
          rows={6}
          showCharCount
          maxCharCount={1000}
          validationRules={[
            validationRules.required('Message text is required'),
            validationRules.minLength(10, 'Message must be at least 10 characters'),
            validationRules.maxLength(1000, 'Message cannot exceed 1000 characters'),
          ]}
        />

        {isArtNode && (
          <div className="mt-4 space-y-4">
            <FormTextarea
              label="Alt mesaj"
              rows={3}
              value={node.data.secondaryText ?? ''}
              onChange={handleSecondaryTextChange}
              placeholder="Ister internetten buldugun gorseli, ister paylastigimizdan sec..."
              showCharCount
              maxCharCount={300}
              validationRules={[
                validationRules.maxLength(300, 'Alt mesaj 300 karakteri geçemez'),
              ]}
            />
            <FormInput
              label="Durum mesaji"
              value={node.data.statusText ?? ''}
              onChange={handleStatusTextChange}
              placeholder="Waiting for image from contact..."
              validationRules={[
                validationRules.maxLength(100, 'Durum mesajı 100 karakteri geçemez'),
              ]}
            />
          </div>
        )}
      </section>

      {/* Image upload */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <ImageUploader
          label={isArtNode ? 'Stil karti gorseli' : 'Optional Image'}
          description={
            isArtNode
              ? 'Kartta goruntulenecek yardimci gorsel. 800x600 orani tavsiye edilir.'
              : 'Shown under the message. Recommended size 800x600.'
          }
          value={node.data.imageUrl}
          onChange={handleImageChange}
        />
      </section>

      {/* Buttons */}
      {isArtNode ? (
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-800">Retry ayarlari</h3>
          <p className="mt-1 text-xs text-neutral-500">
            Kullanici istediginiz gorseli gondermezse kac kez hatirlatma yapilacagini belirleyin.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={node.data.maxRetries ?? 2}
              onChange={handleMaxRetriesChange}
              className="flex-1 h-2 rounded-full bg-neutral-200 accent-primary-500"
            />
            <span className="w-10 text-right text-lg font-bold text-primary-600">
              {node.data.maxRetries ?? 2}
            </span>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <ButtonBuilder buttons={node.data.buttons} onChange={handleButtonsChange} />
        </section>
      )}
    </div>
  );
}
