'use client';

import { useCallback } from 'react';
import { Button } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export function ImagesStep({ template, data, onChange, onNext, onBack }: StepProps) {
  const handleImageUpload = useCallback(
    (imageKey: string, file: File) => {
      // Create object URL for preview (in production, upload to S3/Cloudflare)
      const imageUrl = URL.createObjectURL(file);

      onChange({
        images: {
          ...data.images,
          [imageKey]: imageUrl,
        },
      });
    },
    [data.images, onChange]
  );

  const handleFileDrop = (imageKey: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(imageKey, file);
    }
  };

  const handleFileSelect = (imageKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(imageKey, file);
    }
  };

  const imageSlots = [
    { key: 'example_before', label: 'Example Before Photo', desc: 'Show customers what to send' },
    { key: 'example_after', label: 'Example After Photo', desc: 'Show expected results' },
    { key: 'style_1', label: 'Style Reference 1', desc: 'Hair style option' },
    { key: 'style_2', label: 'Style Reference 2', desc: 'Hair style option' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-4">
          <PhotoIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Upload Images</h2>
        <p className="text-neutral-600 mt-2">
          Add custom example photos and style references for your automation.
        </p>
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageSlots.map((slot) => {
          const imageUrl = data.images[slot.key];

          return (
            <div
              key={slot.key}
              className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-all duration-300"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(slot.key, e)}
            >
              <div className="p-6">
                {/* Label */}
                <h3 className="font-semibold text-neutral-900 mb-1">{slot.label}</h3>
                <p className="text-xs text-neutral-500 mb-4">{slot.desc}</p>

                {/* Upload Area */}
                {imageUrl ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 group">
                    <img
                      src={imageUrl}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer px-4 py-2 bg-white text-neutral-900 rounded-lg font-medium text-sm hover:bg-neutral-100">
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileSelect(slot.key, e)}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-neutral-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer group">
                    <CloudArrowUpIcon className="w-12 h-12 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    <span className="text-sm font-medium text-neutral-600 mt-3 group-hover:text-primary-600">
                      Click or drag to upload
                    </span>
                    <span className="text-xs text-neutral-400 mt-1">PNG, JPG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileSelect(slot.key, e)}
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">⚠️ Optional:</span> Images are not required. If you skip this,
          the automation will use default placeholder images.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="border-2">
          ← Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
        >
          Next: Configure Settings →
        </Button>
      </div>
    </div>
  );
}
