'use client';

import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface ImageUploaderProps {
  label: string;
  description?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  accept?: string;
}

export function ImageUploader({
  label,
  description,
  value,
  onChange,
  accept = 'image/*',
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        readFile(file);
      }
    },
    [readFile]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      if (file) {
        readFile(file);
      }
    },
    [readFile]
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-800">{label}</p>
          {description && <p className="text-xs text-neutral-500">{description}</p>}
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-semibold text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>

      <div
        className={clsx(
          'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 text-center transition hover:border-primary-300 hover:bg-primary-50/40',
          isDragging && 'border-primary-400 bg-primary-50/60'
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative h-40 w-full overflow-hidden rounded-lg border border-neutral-100">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="px-6 py-10">
            <p className="text-sm font-medium text-neutral-700">
              Click to upload or drag &amp; drop
            </p>
            <p className="mt-1 text-xs text-neutral-500">PNG, JPG up to 5MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
