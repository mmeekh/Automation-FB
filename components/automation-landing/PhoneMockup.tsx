'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { AutomationContent } from "@/lib/automation-content/types";

interface PhoneMockupProps {
  chatPreview: AutomationContent["chatPreview"];
}

const AUTO_PLAY_INTERVAL = 2000;

export function PhoneMockup({ chatPreview }: PhoneMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolledRef = useRef(false);

  const visibleMessages = chatPreview.slice(0, currentIndex + 1);
  const firstImageId = useMemo(
    () => chatPreview.find((message) => Boolean(message.image))?.id ?? null,
    [chatPreview],
  );

  useEffect(() => {
    if (!autoPlay || currentIndex >= chatPreview.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, chatPreview.length - 1));
    }, AUTO_PLAY_INTERVAL);

    return () => clearTimeout(timer);
  }, [autoPlay, currentIndex, chatPreview.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const shouldAutoScroll = autoPlay || !hasAutoScrolledRef.current;
    if (!shouldAutoScroll) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: hasAutoScrolledRef.current ? "smooth" : "auto",
    });

    if (autoPlay) {
      hasAutoScrolledRef.current = true;
    }
  }, [visibleMessages.length, autoPlay]);

  useEffect(() => {
    setCurrentIndex(0);
    setAutoPlay(true);
    hasAutoScrolledRef.current = false;
  }, [chatPreview]);

  return (
    <div className="sticky top-24 mx-auto w-full max-w-sm">
      <div className="relative w-full aspect-[9/19] rounded-[3rem] border-8 border-neutral-800 bg-neutral-900 p-4 shadow-2xl">
        <div className="absolute left-1/2 top-0 z-10 h-7 w-40 -translate-x-1/2 rounded-b-3xl bg-neutral-900" />

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-white">
          <div className="flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-neutral-900">LookLab AI</p>
              <p className="text-xs text-neutral-500">Aktif</p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 min-h-0 space-y-4 overflow-y-auto bg-neutral-50 px-4 py-6"
          >
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((message) => {
                const isUser = message.type === "user";
                const hasText = Boolean(message.content?.trim());
                const hasImage = Boolean(message.image);
                const storedRatio = hasImage ? imageRatios[message.id] : undefined;
                const aspectRatio = storedRatio ?? 0.75;
                const isFirstImage = hasImage && message.id === firstImageId;

                const baseClasses =
                  "flex max-w-[75%] flex-col gap-2 rounded-2xl overflow-hidden shadow-sm transition-colors";
                const bubbleTone = hasImage
                  ? "bg-white border border-neutral-200 text-neutral-900"
                  : isUser
                    ? "rounded-br-sm bg-primary-500 px-4 py-2 text-white"
                    : "rounded-bl-sm bg-white px-4 py-2 text-neutral-900 border border-neutral-200";
                const bubbleClasses = `${baseClasses} ${bubbleTone}`;
                const rowClasses = `flex ${isUser ? "justify-end" : "justify-start"}`;

                const imageWrapperStyle: CSSProperties | undefined = hasImage
                  ? {
                      width: isUser ? 180 : "100%",
                      maxWidth: isUser ? 180 : "100%",
                      aspectRatio: `${aspectRatio}`,
                      position: "relative",
                    }
                  : undefined;

                return (
                  <motion.div
                    key={message.id}
                    className={rowClasses}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className={bubbleClasses}>
                      {hasImage && (
                        <div
                          className="relative mx-auto overflow-hidden rounded-2xl bg-neutral-100"
                          style={imageWrapperStyle}
                        >
                          <Image
                            src={message.image as string}
                            alt={message.imageAlt ?? "Preview image"}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 220px, 260px"
                            priority={isFirstImage}
                            loading={isFirstImage ? "eager" : "lazy"}
                            onLoadingComplete={(img) => {
                              if (img.naturalWidth && img.naturalHeight) {
                                setImageRatios((prev) => ({
                                  ...prev,
                                  [message.id]: img.naturalWidth / img.naturalHeight,
                                }));
                              }
                            }}
                          />
                        </div>
                      )}

                      {hasText && (
                        <div
                          className={
                            hasImage
                              ? "px-4 py-2 text-sm leading-relaxed text-neutral-800"
                              : "text-sm leading-relaxed"
                          }
                        >
                          {message.content}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="border-t border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2">
              <span className="text-xs text-neutral-400">Mesaj yaz...</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {chatPreview.map((_, idx) => {
          const isActive = idx <= currentIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setAutoPlay(false);
              }}
              className={`h-1.5 rounded-full transition-all ${
                isActive ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300/80 hover:bg-neutral-400"
              }`}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="text-sm text-neutral-600 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Geri
        </button>
        <button
          type="button"
          onClick={() => setAutoPlay((prev) => !prev)}
          className="text-sm font-medium text-neutral-700 hover:text-primary-600"
        >
          {autoPlay ? "Duraklat" : "Devam"}
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.min(chatPreview.length - 1, prev + 1))}
          disabled={currentIndex === chatPreview.length - 1}
          className="text-sm text-neutral-600 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Ileri
        </button>
      </div>
    </div>
  );
}
