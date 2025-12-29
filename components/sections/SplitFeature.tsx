"use client";

import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Highlighter } from "@/components/ui/Highlighter";

interface SplitFeatureProps {
  heading?: string;
  description?: string;
  image?: string;
  cta?: string;
  ctaHref?: string;
  reverse?: boolean;
}

export function SplitFeature({
  heading = siteConfig.splitFeature.heading,
  image = siteConfig.splitFeature.image,
  cta = siteConfig.splitFeature.cta,
  ctaHref = "/about",
  reverse = false,
}: SplitFeatureProps) {
  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <Reveal className={reverse ? "lg:order-2" : ""}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded on the principles of{" "}
              <Highlighter action="underline" color="hsl(140, 15%, 40%)">
                hard work
              </Highlighter>{" "}
              and{" "}
              <Highlighter action="underline" color="hsl(140, 15%, 40%)">
                honest communication
              </Highlighter>, our team is our{" "}
              <Highlighter action="highlight" color="hsl(140, 15%, 85%)">
                greatest asset
              </Highlighter>. We take pride in a roll-up-your-sleeves mentality.
            </p>
            {cta && (
              <Button href={ctaHref} variant="outline">
                {cta}
              </Button>
            )}
          </Reveal>

          {/* Image Content */}
          <Reveal delay={0.2} className={`relative ${reverse ? "lg:order-1" : ""}`}>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mr-0">
               {/* "Frame" effect */}
               <div className="absolute inset-0 bg-muted -translate-x-4 translate-y-4 md:-translate-x-8 md:translate-y-8 -z-10" />
               
               <Image
                 src={image}
                 alt={heading || "Feature"}
                 fill
                 className="object-cover"
               />
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
