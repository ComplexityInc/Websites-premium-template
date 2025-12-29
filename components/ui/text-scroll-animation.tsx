"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// CHARACTER ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
};

/**
 * Text character that animates with X translation and 3D rotation
 */
export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block text-accent", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

/**
 * Image/icon that animates with scale and Y bounce
 */
export const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

/**
 * Image/icon that animates with rotation and scale for dramatic effect
 */
export const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL TEXT ANIMATION - Reusable heading animation
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollTextAnimationProps {
  text: string;
  className?: string;
  charClassName?: string;
}

/**
 * Animated heading where each character flies in from scattered positions
 * as the user scrolls into view.
 */
export function ScrollTextAnimation({
  text,
  className,
  charClassName,
}: ScrollTextAnimationProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div
      ref={targetRef}
      className={cn(
        "text-center font-bold uppercase tracking-tight",
        className
      )}
      style={{ perspective: "500px" }}
    >
      {characters.map((char, index) => {
        const isSpace = char === " ";
        const distanceFromCenter = index - centerIndex;

        return (
          <AnimatedChar
            key={index}
            char={char}
            isSpace={isSpace}
            distanceFromCenter={distanceFromCenter}
            scrollYProgress={scrollYProgress}
            className={charClassName}
          />
        );
      })}
    </div>
  );
}

function AnimatedChar({
  char,
  isSpace,
  distanceFromCenter,
  scrollYProgress,
  className,
}: {
  char: string;
  isSpace: boolean;
  distanceFromCenter: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  className?: string;
}) {
  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-3 md:w-4", className)}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// BRACKET SVG (decorative)
// ═══════════════════════════════════════════════════════════════════════════

export const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};
