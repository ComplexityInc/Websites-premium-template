"use client";

import { Container } from "@/components/ui/Container";

const LOGOS = [
  "/images/adelaideconcrete.png",
  "/images/conceptconcrete.png",
  "/images/metroconcrete.jpg",
  "/images/lousianaconcrete.webp",
  "/images/laconcreteconcept.png",
];

export function PartnerMarquee() {
  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border/40">
      <Container>
        <div className="flex flex-col items-center">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Who We Work With
          </h3>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {/* SET 1 */}
              {LOGOS.map((logo, index) => (
                <div key={`orig-${index}`} className="flex items-center justify-center min-w-[150px]">
                  <img 
                    src={logo} 
                    alt="Partner" 
                    className="h-16 w-auto object-contain" 
                  />
                </div>
              ))}

              {/* SET 2 (Duplicate) */}
              {LOGOS.map((logo, index) => (
                <div key={`dup-${index}`} className="flex items-center justify-center min-w-[150px]">
                  <img 
                    src={logo} 
                    alt="Partner" 
                    className="h-16 w-auto object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
