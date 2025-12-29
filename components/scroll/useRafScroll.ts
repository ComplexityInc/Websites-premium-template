"use client";

import { useEffect, useRef } from "react";

type RafCallback = (scrollY: number) => void;

/**
 * Efficient scroll tracking using requestAnimationFrame.
 * Runs the callback on every animation frame with the current scrollY.
 * 
 * @param cb - Callback receiving current scroll position
 * @param enabled - Toggle to enable/disable (for reduced motion)
 */
export function useRafScroll(cb: RafCallback, enabled: boolean = true) {
  const cbRef = useRef(cb);

  // Keep callback ref updated (must be in useEffect per React rules)
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let running = true;

    const loop = () => {
      if (!running) return;
      cbRef.current(window.scrollY || 0);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);
}
