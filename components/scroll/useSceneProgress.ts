"use client";

import { useScroll, MotionValue } from "framer-motion";

/**
 * Scene progress hook for consistent scroll tracking across scenes.
 * Wraps Framer Motion's useScroll for unified scene-based architecture.
 * 
 * @param containerRef - Ref to the scene wrapper element
 * @param offset - Scroll offset configuration (default: start-start to end-start)
 * @returns progress MotionValue (0..1) as user scrolls through the scene
 */
export function useSceneProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  offset: ["start start" | "start end" | "end start" | "end end", "start start" | "start end" | "end start" | "end end"] = ["start start", "end start"]
): {
  progress: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  return {
    progress: scrollYProgress,
  };
}
