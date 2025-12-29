"use client";

import { cn } from "@/lib/utils";
import { MotionValue, useTransform, motion } from "framer-motion";

interface ConcreteGapperProps {
  /** 0.0 to 1.0 value representing scroll progress through this section */
  progress: MotionValue<number>;
  className?: string;
}

const WORDS = [
  { text: "HIGH", start: 0.0, end: 0.3 },
  { text: "QUALITY", start: 0.35, end: 0.65 },
  { text: "CONCRETE", start: 0.7, end: 1.0 },
];

/**
 * Scroll-driven word reveal animation.
 * As progress goes 0→1, words reveal sequentially with blur/translate/opacity.
 */
export function ConcreteGapper({ progress, className }: ConcreteGapperProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center bg-background overflow-hidden select-none",
        className
      )}
    >
      {/* Grainy texture overlay for negative space feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Animated Words */}
      <div className="flex flex-col items-center justify-center gap-2 z-10">
        {WORDS.map((item) => (
          <AnimatedWord key={item.text} item={item} progress={progress} />
        ))}
      </div>

      {/* Subtle decorative elements */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px bg-accent"
        style={{
          width: useTransform(progress, [0.8, 1], ["0%", "20%"]),
          opacity: useTransform(progress, [0.8, 1], [0, 1]),
        }}
      />
    </div>
  );
}

function AnimatedWord({
  item,
  progress,
}: {
  item: { text: string; start: number; end: number };
  progress: MotionValue<number>;
}) {
  // Calculate opacity: 0 before start, 1 during range, fade to 0.3 after end
  const opacity = useTransform(progress, (p) => {
    if (p < item.start) return 0;
    if (p < item.end) return 1;
    return 0.3;
  });

  // Calculate blur: blurred before start, clear during range, slightly blurred after
  const blur = useTransform(progress, (p) => {
    if (p < item.start) return 20;
    if (p < item.end) return 0;
    return 4;
  });

  // Calculate translateY: below before start, centered during range
  const y = useTransform(progress, (p) => {
    if (p < item.start) return 32;
    return 0;
  });

  // Calculate scale: smaller before start, full during range
  const scale = useTransform(progress, (p) => {
    if (p < item.start) return 0.9;
    return 1;
  });

  return (
    <motion.span
      className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground"
      style={{
        opacity,
        y,
        scale,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
      }}
    >
      {item.text}
    </motion.span>
  );
}
