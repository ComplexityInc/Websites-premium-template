"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextAnimation } from "@/components/ui/text-animation";
import { Container } from "@/components/ui/Container";

export function ScrollTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // "Slidy slam" effect: Text moves horizontally as you scroll
  // Row 1 moves Right
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Row 2 moves Left (for contrast)
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="py-32 bg-background overflow-hidden">
      <Container>
        <div className="flex flex-col gap-4 opacity-90">
            <motion.div style={{ x: x1 }}>
                <TextAnimation 
                    text="PRECISION" 
                    image="/images/service-3.jpg"
                    className="items-start"
                />
            </motion.div>
            
            <motion.div style={{ x: x2 }}>
                <TextAnimation 
                    text="ENGINEERING" 
                    image="/images/service-3.jpg"
                    className="items-end"
                />
            </motion.div>
        </div>
      </Container>
    </section>
  );
}
