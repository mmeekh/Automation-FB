'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { AutomationTemplate, FlowStep } from '@/lib/automations/types';
import { CustomizationData } from '@/lib/types/customization';
import { Button, Input } from '@/components';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

interface FlowStepEditorProps {
  step: FlowStep;
  stepNumber: number;
  totalSteps: number;
  isExpanded: boolean;
  onToggle: () => void;
  data: CustomizationData;
  onChange: (updates: Partial<CustomizationData>) => void;
  template: AutomationTemplate;
}

export function FlowStepEditor({
  step,
  stepNumber,
  totalSteps,
  isExpanded,
  onToggle,
  data,
  onChange,
  template,
}: FlowStepEditorProps) {
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasMessage = step.type === 'message' || step.type === 'cta';
  const hasImage = step.type === 'image_request' || step.type === 'ai_processing' || step.type === 'result';
  const currentMessage = hasMessage ? data.messages[step.id] || step.content || '' : '';
  const currentImage = hasImage ? data.images[step.id] : null;

  const getStepIcon = () => {
    if (step.type === 'message') return '💬';
    if (step.type === 'image_request') return '🖼️';
    if (step.type === 'ai_processing') return '✨';
    if (step.type === 'result') return '🎨';
    if (step.type === 'cta') return '🔗';
    return '📍';
  };

  const getStepLabel = () => {
    if (step.type === 'message') return 'Message';
    if (step.type === 'image_request') return 'Image Request';
    if (step.type === 'ai_processing') return 'AI Processing';
    if (step.type === 'result') return 'Result';
    if (step.type === 'cta') return 'Call to Action';
    return 'Step';
  };

  const handleMessageChange = (newMessage: string) => {
    onChange({
      messages: {
        ...data.messages,
        [step.id]: newMessage,
      },
    });
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    onChange({
      images: {
        ...data.images,
        [step.id]: imageUrl,
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const isCustomized =
    (hasMessage && currentMessage !== (step.content || '')) || (hasImage && currentImage);

  return (
    <div
      className={`border-2 rounded-2xl transition-all ${
        isExpanded
          ? 'border-primary-300 bg-gradient-to-br from-primary-50/50 to-accent-50/30 shadow-lg'
          : isCustomized
          ? 'border-green-200 bg-green-50/30'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      }`}
    >
      {/* Collapsed Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center font-bold text-neutral-700">
            {stepNumber}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getStepIcon()}</span>
              <span className="font-bold text-neutral-900">{getStepLabel()}</span>
              {isCustomized && (
                <CheckCircleIcon className="w-5 h-5 text-green-600" title="Customized" />
              )}
            </div>
            <p className="text-sm text-neutral-600 line-clamp-1">
              {hasMessage ? currentMessage : 'Click to customize'}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-neutral-200/50">
          {/* Message Editor */}
          {hasMessage && (
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-primary-600" />
                  Message Content
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingMessage(!isEditingMessage)}
                  className="border-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  {isEditingMessage ? 'Preview' : 'Edit'}
                </Button>
              </div>

              {isEditingMessage ? (
                <div className="space-y-2">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm resize-none"
                    placeholder="Enter your message..."
                  />
                  <p className="text-xs text-neutral-500">
                    💡 Tip: Use emojis to make your message more engaging! 😊
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                  <p className="text-neutral-800 whitespace-pre-wrap leading-relaxed">
                    {currentMessage || (
                      <span className="text-neutral-400 italic">No message set</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Image Editor */}
          {hasImage && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                  <PhotoIcon className="w-5 h-5 text-accent-600" />
                  Image Content
                </h4>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingImage(true);
                }}
                onDragLeave={() => setIsDraggingImage(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-all ${
                  isDraggingImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 bg-neutral-50'
                } ${currentImage ? 'p-0' : 'p-8'}`}
              >
                {currentImage ? (
                  <div className="relative group">
                    <Image
                      src={currentImage}
                      alt="Preview"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white text-neutral-900 hover:bg-neutral-100"
                      >
                        <PhotoIcon className="w-5 h-5" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <PhotoIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <p className="font-semibold text-neutral-700 mb-2">
                      Drop an image here or click to upload
                    </p>
                    <p className="text-sm text-neutral-500 mb-4">
                      PNG, JPG up to 10MB
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2"
                    >
                      Select Image
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <p className="text-xs text-neutral-500 mt-2">
                {step.type === 'ai_processing'
                  ? '✨ This is a reference image for AI generation style'
                  : '🖼️ This image will be sent to users at this step'}
              </p>
            </div>
          )}

          {/* Step Info */}
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 border border-neutral-200">
            <p className="text-xs text-neutral-600">
              <span className="font-semibold">Step {stepNumber} of {totalSteps}</span>
              {step.metadata?.description && ` • ${step.metadata.description}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
