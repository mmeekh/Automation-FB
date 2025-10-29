'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MessageFlowNode, Button } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
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

  useEffect(() => {
    setMessageText(node.data.messageText);
  }, [node.data.messageText, node.id]);

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(node.id, { label: event.target.value });
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessageText(value);
    updateNodeData(node.id, { messageText: value });
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
            <label className="text-xs font-semibold uppercase text-neutral-500">
              Node Title
              <input
                type="text"
                value={node.data.label}
                onChange={handleLabelChange}
                className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Welcome Message"
              />
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Shown at the top of the node inside the canvas.
            </p>
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

        <textarea
          ref={textareaRef}
          value={messageText}
          onChange={handleMessageChange}
          className="h-40 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Merhaba! Saç modelinizi AI ile değiştirebilirim..."
        />
        <p className="mt-2 text-xs text-neutral-500">
          {messageText.length} characters
        </p>
      </section>

      {/* Image upload */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <ImageUploader
          label="Optional Image"
          description="Shown under the message. Recommended size 800x600."
          value={node.data.imageUrl}
          onChange={handleImageChange}
        />
      </section>

      {/* Buttons */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <ButtonBuilder buttons={node.data.buttons} onChange={handleButtonsChange} />
      </section>
    </div>
  );
}
