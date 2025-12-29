"use client";

import { useState, useEffect } from "react";

/**
 * Detect prefers-reduced-motion media query.
 * Use to conditionally disable animations for accessibility.
 * Uses lazy initialization to avoid setState in effect.
 * 
 * @returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  // Lazy initialization to avoid hydration mismatch
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Listen for changes to reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
