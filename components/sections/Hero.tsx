"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

// HERO SCENE - Fixed "Curtain Reveal" Effect
// Use fixed positioning + window scroll tracking
// ═══════════════════════════════════════════════════════════════════════════

// Tuning parameters
const BG_MAX_PX = 200; // Max background translate (px) - negative for reverse parallax
const HERO_EXIT_START = 0.2; // Progress when exit animation begins
const HERO_EXIT_END = 0.8; // Progress when hero fully exits

interface HeroProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  variant?: "home" | "page";
  backgroundImage?: string;
  /** Alias for backgroundImage - backwards compatibility */
  image?: string;
  /** Show scroll indicator (default: true for home) */
  showScroll?: boolean;
}

export function Hero({
  title = siteConfig.hero.title,
  subtitle = siteConfig.hero.subtitle,
  cta = siteConfig.hero.cta,
  backgroundImage,
  image,
  showScroll,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve props with backwards compatibility
  const resolvedBgImage = backgroundImage || image || "/images/hero-bg.jpg";
  
  // Show scroll indicator (default true for all pages per user request)
  const shouldShowScroll = showScroll ?? true;

  // Detect reduced motion preference using lazy initialization (avoids setState in effect)
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

  // Scene progress tracking via Framer Motion 
  // For fixed hero, we track window scroll relative to viewport height
  const { scrollY } = useScroll();
  
  const [viewportHeight, setViewportHeight] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight;
  });

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map scroll pixels to 0-1 progress based on HERO_RUNWAY_VH (100vh for curtain effect)
  const scrollYProgress = useTransform(
    scrollY,
    [0, viewportHeight || 1000], // 0 to 100vh
    [0, 1]
  );

  // Transform mappings based on scroll progress
  // Reverse parallax: background moves UP when scrolling DOWN
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -BG_MAX_PX]
  );

  // Text layer: stays stable early, then fades out
  const textOpacity = useTransform(
    scrollYProgress,
    [0, HERO_EXIT_START, HERO_EXIT_END],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, HERO_EXIT_START, HERO_EXIT_END],
    prefersReducedMotion ? [0, 0, 0] : [0, 0, -80]
  );

  // Overall hero container opacity (for slide-into-top effect)
  const heroOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.3]
  );

  // Removed variant-based early return to support global curtain reveal


  // Home variant: Fixed "Curtain Reveal" choreography
  return (
    <section
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden flex items-start justify-center pt-[25vh] md:pt-[30vh] bg-foreground"
    >
      <motion.div
        className="relative w-full h-full"
        style={{ opacity: heroOpacity }}
      >
        {/* Background Layer - Reverse parallax */}
        <motion.div
          className="absolute inset-0 parallax-layer"
          style={{ y: bgY }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-foreground/80 via-foreground/60 to-foreground/90 z-10" />
          
          {/* Background image placeholder - use actual image when available */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${resolvedBgImage})`,
              transform: "scale(1.1)",
            }}
          />
          
          {/* Fallback gradient if no image */}
          <div className="absolute inset-0 bg-linear-to-br from-foreground via-foreground/95 to-muted/20" />
        </motion.div>

        {/* Content Layer - Pinned then fades/translates out */}
        <motion.div
          className="relative z-20 text-center px-6 pt-12"
          style={{ opacity: textOpacity, y: textY }}
        >
          <Container className="max-w-4xl">
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-background tracking-tight mb-6 whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Button */}
            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  href="/contact"
                  variant="outline"
                  className="border-background/50 text-background hover:bg-background hover:text-foreground"
                >
                  {cta}
                </Button>
              </motion.div>
            )}
          </Container>

        </motion.div>

        {/* Scroll indicator - fixed to bottom of viewport */}
        {shouldShowScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-background/60"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
