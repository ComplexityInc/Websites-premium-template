"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED CHARACTER with subtle curvature and disarray
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedChar({
  char,
  isSpace,
  distanceFromCenter,
  index,
  scrollYProgress,
}: {
  char: string;
  isSpace: boolean;
  distanceFromCenter: number;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Scatter/fly-in animation
  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.5, 1]);
  
  // Subtle curvature: slight vertical offset based on position (creates wave effect)
  const curveOffset = Math.sin((index / 5) * Math.PI) * 3; // ±3px wave
  const y = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 15, curveOffset]);
  
  // Subtle disarray: small random-ish rotation per character (deterministic via index)
  const baseRotation = ((index % 7) - 3) * 1.5; // -4.5° to +4.5° based on index
  const rotate = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 8, baseRotation]);

  return (
    <motion.span
      className={cn(
        "inline-block text-foreground",
        isSpace && "w-[0.25em]"
      )}
      style={{ x, y, rotate, opacity }}
    >
      {char}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CAPABILITIES GRID with Scroll Text Animation
// ═══════════════════════════════════════════════════════════════════════════

export function CapabilitiesGrid() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "center center"],
  });

  // Use lowercase heading text (matching reference image style)
  const headingText = siteConfig.capabilities.title.toLowerCase();
  const characters = headingText.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <section className="py-24 md:py-32 bg-muted/30 overflow-hidden">
      <Container>
        {/* Animated Heading — centered with more spacing */}
        <div
          ref={headingRef}
          className="mb-20 md:mb-28 text-center"
          style={{ perspective: "800px" }}
        >
          <h3 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-relaxed"
            style={{ 
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.02em",
            }}
          >
            {characters.map((char, index) => (
              <AnimatedChar
                key={index}
                char={char}
                isSpace={char === " "}
                distanceFromCenter={index - centerIndex}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </h3>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.capabilities.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden bg-white border border-border rounded-lg"
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>

              <div className="absolute inset-0 p-6 flex items-center justify-center text-center">
                <span className="bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold uppercase tracking-wider text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}

          {/* CTA Tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: siteConfig.capabilities.items.length * 0.1, duration: 0.5 }}
            className="aspect-square flex items-center justify-center p-8 bg-background border border-accent/20 rounded-lg"
          >
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground mb-4">
                Need something custom?
              </p>
              <a
                href="/services"
                className="text-accent hover:text-foreground font-bold underline underline-offset-4 transition-colors"
              >
                View All Services
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
