"use client";

import { useLenis } from "lenis/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToHash() {
  const lenis = useLenis();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // 1. Standard Route Change -> Scroll to Top
    // This fixes the issue where Lenis or Next.js retains scroll position from the previous page
    if (lenis) {
      // Immediate scroll to top prevents visual jumpiness
      lenis.scrollTo(0, { immediate: true });
    }

    // 2. Hash Handling (Optional, if you still have explicit hash links or anchors within pages)
    // If a hash exists, we give it a moment to render, then scroll to it.
    // If you don't use hashes for deep linking, this block can be largely ignored, 
    // but it's good practice to keep it for robustness.
    const hash = window.location.hash;
    if (hash && lenis) {
       setTimeout(() => {
          if (!isMounted.current) return;
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
             lenis.scrollTo(element, { offset: -112, immediate: false });
          }
       }, 100);
    }
  }, [pathname, searchParams, lenis]);

  return null;
}
