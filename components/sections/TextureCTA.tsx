"use client";

import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Highlighter } from "@/components/ui/Highlighter";

export function TextureCTA() {
  return (
    <section className="relative py-32 bg-background overflow-hidden z-30">
      {/* Texture Background Fallback if image missing */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('/textures/concrete-placeholder.jpg')" }} />
      
      <Container className="relative z-10 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {siteConfig.cta.heading}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get in touch with our team to{" "}
            <Highlighter action="underline" color="hsl(140, 15%, 40%)">
              discuss your requirements
            </Highlighter>.
          </p>
          <Button href="/contact" variant="solid" size="lg">
            {siteConfig.cta.button}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
