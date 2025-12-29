"use client";

import { useRef, useMemo } from "react";
import type React from "react";
import { useInView } from "framer-motion";

type AnnotationAction = "highlight" | "underline";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
}

/**
 * Pure CSS-based highlighter that's stable during scroll.
 * Uses CSS pseudo-elements instead of rough-notation SVG overlays.
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "hsl(140, 15%, 75%)",
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  
  const isInView = useInView(elementRef, {
    once: true,
    margin: "-15%",
  });

  // Memoize to avoid recalculation
  const isHighlight = useMemo(() => action === "highlight", [action]);

  return (
    <span
      ref={elementRef}
      className="relative inline"
      style={{
        // For highlight: background grows from 0% to 100% width
        // For underline: bottom border animates in
        ...(isHighlight ? {
          backgroundImage: `linear-gradient(to right, ${color} 100%, transparent 0%)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 85%",
          backgroundSize: isInView ? "100% 40%" : "0% 40%",
          transition: "background-size 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingBottom: "2px",
        } : {
          backgroundImage: `linear-gradient(to right, ${color} 100%, transparent 0%)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 100%",
          backgroundSize: isInView ? "100% 2px" : "0% 2px",
          transition: "background-size 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingBottom: "3px",
        }),
      }}
    >
      {children}
    </span>
  );
}
