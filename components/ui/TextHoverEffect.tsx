"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextHoverEffectProps {
  text: string;
  duration?: number;
  className?: string;
  textClassName?: string;
}

export function TextHoverEffect({
  text,
  duration,
  className,
  textClassName,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  const lines = text.split('\n');

  return (
    <div className={cn("h-[40rem] flex items-center justify-center", className)}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 900 750"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none"
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="25%"
          >
            {hovered && (
              <>
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="25%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </>
            )}
          </linearGradient>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>

        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <text
              x="50%"
              y={`${18 + i * 13}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.8"
              className={cn(
                "fill-transparent stroke-white/50 font-bold",
                textClassName
              )}
              style={{
                opacity: hovered ? 1 : 0.6,
                fontSize: '5.5rem',
              }}
            >
              {line}
            </text>

            <motion.text
              x="50%"
              y={`${18 + i * 13}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.8"
              className={cn(
                "fill-transparent stroke-white/80 font-bold",
                textClassName
              )}
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
              style={{
                fontSize: '5.5rem',
              }}
            >
              {line}
            </motion.text>

            <text
              x="50%"
              y={`${18 + i * 13}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="url(#textGradient)"
              strokeWidth="0.8"
              mask="url(#textMask)"
              className={cn(
                "fill-transparent font-bold",
                textClassName
              )}
              style={{
                fontSize: '5.5rem',
              }}
            >
              {line}
            </text>
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}
