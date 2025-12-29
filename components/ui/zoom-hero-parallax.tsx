'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type ZoomHeroParallaxProps = {
  src: string;
  title: string;
  subtitle?: string;
  /** Clamp to protect against pixelation if image is only ~2K wide */
  maxScale?: number;        // e.g. 1.6–2.0
  textMaxScale?: number;    // e.g. 1.15–1.30
  className?: string;
};

export function ZoomHeroParallax({
  src,
  title,
  subtitle,
  maxScale = 1.8,
  textMaxScale = 1.22,
  className,
}: ZoomHeroParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Long scroll window like the original component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, maxScale]);
  
  // Text scales up, and tracking gets tighter for a "focusing" effect
  const textScale = useTransform(scrollYProgress, [0, 1], [1, textMaxScale]);
  
  // Optional: gentle fade near the end so it exits cleanly into next section
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);

  return (
    <section ref={ref} className={cn('relative h-[260vh] bg-white', className)}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={src}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Dark readability overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Overlay text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="max-w-4xl text-center text-white">
            <motion.h2
              style={{ scale: textScale }}
              className="text-4xl font-semibold md:text-6xl tracking-tight"
            >
              {title}
            </motion.h2>
            {subtitle ? (
              <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl font-light">
                {subtitle}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
