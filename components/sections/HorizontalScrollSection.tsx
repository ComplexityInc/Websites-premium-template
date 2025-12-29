"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Highlighter } from "@/components/ui/Highlighter";
import { TextAnimation } from "@/components/ui/text-animation";

// ═══════════════════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL SECTION
// Panels: Team → Precision Engineering (Text Reveal)
// ═══════════════════════════════════════════════════════════════════════════

const PANELS = [
  {
    id: "team",
    type: "content" as const,
    title: "The team behind the pour.",
    description: "Founded on the principles of hard work and honest communication, our team is our greatest asset.",
    image: "/images/team-placeholder.jpg",
    cta: { label: "Meet the Team", href: "/about" },
  },
  {
    id: "precision",
    type: "text-reveal" as const,
  },
];

const PANEL_COUNT = PANELS.length;

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal movement (0% -> -50%)
  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-50%"]
  );

  // Text Parallax Logic for Panel 2
  // As we scroll through the section, the text should slide.
  // We want the text to be "moving" as it enters the screen.
  // Panel 2 enters from the right.
  const textX1 = useTransform(scrollYProgress, [0.2, 1], ["-20%", "0%"]); // "PRECISION" slides right to center
  const textX2 = useTransform(scrollYProgress, [0.2, 1], ["20%", "0%"]);  // "ENGINEERING" slides left to center

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{
        height: `${PANEL_COUNT * 100}vh`, // 200vh
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{
            x: xPercent,
            width: `${PANEL_COUNT * 100}%`,
          }}
        >
          {PANELS.map((panel, index) => (
            <div
              key={panel.id}
              className="relative h-full shrink-0 flex items-center justify-center p-4"
              style={{ width: `${100 / PANEL_COUNT}%` }}
            >
              {panel.type === "text-reveal" ? (
                <div className="flex flex-col gap-0 md:gap-4 opacity-90 scale-75 md:scale-100">
                  <motion.div style={{ x: textX1 }}>
                    <TextAnimation 
                      text="PRECISION" 
                      image="/images/text-bg-1.png"
                      className="items-start"
                    />
                  </motion.div>
                  <motion.div style={{ x: textX2 }}>
                    <TextAnimation 
                      text="ENGINEERING" 
                      image="/images/text-bg-1.png" 
                      className="items-end"
                    />
                  </motion.div>
                </div>
              ) : (
                <ContentPanel
                  title={panel.title!}
                  image={panel.image!}
                  cta={panel.cta!}
                  isLast={index === PANEL_COUNT - 1}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <ProgressDot index={0} scrollYProgress={scrollYProgress} />
          <ProgressDot index={1} scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS DOT — Separate component to use hooks properly
// ═══════════════════════════════════════════════════════════════════════════

function ProgressDot({ 
  index, 
  scrollYProgress 
}: { 
  index: number; 
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(
    scrollYProgress,
    [
      index / PANEL_COUNT,
      (index + 0.5) / PANEL_COUNT,
      (index + 1) / PANEL_COUNT,
    ],
    [1, 1.5, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      index / PANEL_COUNT,
      (index + 0.5) / PANEL_COUNT,
      (index + 1) / PANEL_COUNT,
    ],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-foreground/30"
      style={{ scale, opacity }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT PANEL (Team / CTA)
// ═══════════════════════════════════════════════════════════════════════════

function ContentPanel({
  title,
  image,
  cta,
  isLast,
}: {
  title: string;
  image: string;
  cta: { label: string; href: string };
  isLast: boolean;
}) {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center">
      {/* Text Side */}
      <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
        <div className="max-w-lg">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8"
          >
            {isLast ? (
              <>
                Get in touch with our team to{" "}
                <Highlighter action="underline" color="hsl(140, 15%, 40%)">
                  discuss your requirements
                </Highlighter>
                .
              </>
            ) : (
              <>
                Founded on the principles of{" "}
                <Highlighter action="underline" color="hsl(140, 15%, 40%)">
                  hard work
                </Highlighter>{" "}
                and{" "}
                <Highlighter action="underline" color="hsl(140, 15%, 40%)">
                  honest communication
                </Highlighter>
                , our team is our{" "}
                <Highlighter action="highlight" color="hsl(140, 15%, 85%)">
                  greatest asset
                </Highlighter>
                .
              </>
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button href={cta.href} variant={isLast ? "solid" : "outline"}>
              {cta.label}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative h-64 lg:h-full order-1 lg:order-2">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
}
