"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedAvatarTooltipProps {
  initials: string;
  label: string;
  caption?: string;
  meta?: string;
  gradient?: string;
  size?: "sm" | "md";
}

const dimensionMap = {
  sm: 44,
  md: 52,
};

export function AnimatedAvatarTooltip({
  initials,
  label,
  caption,
  meta,
  gradient = "from-primary-500 via-accent-500 to-primary-600",
  size = "md",
}: AnimatedAvatarTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const dimension = dimensionMap[size];

  return (
    <>
      <div
        ref={anchorRef}
        className="relative inline-flex"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTooltipPos(null);
        }}
        onMouseMove={(event) => {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
          const { clientX, clientY } = event;
          frameRef.current = requestAnimationFrame(() => {
            setTooltipPos({
              left: clientX,
              top: clientY + window.scrollY,
            });
          });
        }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center"
          style={{ width: dimension, height: dimension }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-br shadow-lg",
              gradient
            )}
          />
          <span className="absolute inset-[2px] rounded-full bg-neutral-950" />
          <span className="relative z-10 text-sm font-semibold text-white/90">
            {initials}
          </span>
          <motion.span
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && tooltipPos && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="pointer-events-none fixed z-[9999] -translate-x-1/2 transform"
                style={{ left: tooltipPos.left, top: tooltipPos.top - 16 }}
              >
                <div className="rounded-2xl border border-white/10 bg-neutral-900/95 px-4 py-2 shadow-2xl backdrop-blur">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  {caption && (
                    <p className="text-xs font-medium text-neutral-400">{caption}</p>
                  )}
                  {meta && (
                    <p className="mt-0.5 text-[11px] text-neutral-500">{meta}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
