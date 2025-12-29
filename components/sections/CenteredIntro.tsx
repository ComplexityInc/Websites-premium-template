"use client";

import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { Highlighter } from "@/components/ui/Highlighter";

interface CenteredIntroProps {
  heading?: string;
  description?: string;
  watermark?: string;
}

export function CenteredIntro({
  heading = siteConfig.intro.heading,
  watermark = "CONCRETE"
}: CenteredIntroProps) {
  return (
    <section 
      id="intro" 
      className="relative min-h-[90vh] py-24 flex items-center justify-center overflow-hidden bg-background z-10"
    >
      {/* Watermark Logo */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span className="text-[20vw] md:text-[15vw] font-bold text-foreground opacity-[0.03] whitespace-nowrap leading-none uppercase">
          {watermark}
        </span>
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center">
        <div className="mb-8">
          <TextReveal className="justify-center text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {heading}
          </TextReveal>
        </div>
        
        <Reveal delay={0.4}>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            We bring{" "}
            <Highlighter action="underline" color="hsl(140, 15%, 40%)">
              decades of experience
            </Highlighter>{" "}
            to every pour. From{" "}
            <Highlighter action="highlight" color="hsl(140, 15%, 85%)">
              architectural residential slabs
            </Highlighter>{" "}
            to large-scale commercial foundations, our team is dedicated to{" "}
            <Highlighter action="underline" color="hsl(140, 15%, 40%)">
              quality, safety, and finish
            </Highlighter>.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
           <div className="flex flex-col items-center gap-6">
             <div className="h-1 w-20 bg-accent mx-auto" />
             <Button href="/services" variant="outline" className="mt-8">
               See More Capabilities
             </Button>
           </div>
        </Reveal>
      </Container>
    </section>
  );
}
