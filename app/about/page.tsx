import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { CenteredIntro } from "@/components/sections/CenteredIntro";
import { ImageBand } from "@/components/sections/ImageBand";
import { ImageMosaic } from "@/components/sections/ImageMosaic";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextureCTA } from "@/components/sections/TextureCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.about.intro.description,
};

export default function AboutPage() {
  return (
    <>
      <Hero 
        title={siteConfig.about.hero.title}
        subtitle={siteConfig.about.hero.subtitle}
        showScroll={true}
        cta=""
        image="/images/placeholder-6.jpg"
      />
      
      <div className="relative z-10 bg-background mt-[100vh]">
        <CenteredIntro 
           heading={siteConfig.about.intro.heading}
           description={siteConfig.about.intro.description}
           watermark="HISTORY"
        />

        <ImageBand 
          title="Our Approach"
          description="We believe in transparency, quality, and safety above all else. Every project is an opportunity to prove our expertise."
          image="/images/placeholder-5.jpg"
        />

        <section className="py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <Reveal>
                 <h2 className="text-3xl font-bold mb-6">Our People</h2>
                 <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                   We invest in our team because they invest in your project. Our crew is trained, certified, and committed to excellence.
                 </p>
              </Reveal>
              <Reveal delay={0.2}>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   From our project managers to our finishers, everyone plays a critical role in delivering the final product.
                 </p>
              </Reveal>
            </div>
            <ImageMosaic images={siteConfig.about.mosaic} />
          </Container>
        </section>

        <TextureCTA />
      </div>
    </>
  );
}
