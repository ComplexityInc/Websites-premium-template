import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { CenteredIntro } from "@/components/sections/CenteredIntro";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextureCTA } from "@/components/sections/TextureCTA";
import { ZoomHeroParallax } from "@/components/ui/zoom-hero-parallax";

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
      
      <div className="bg-background mt-[100vh]">
        <CenteredIntro 
           heading={siteConfig.about.intro.heading}
           description={siteConfig.about.intro.description}
           watermark="HISTORY"
        />

        {/* SECTION 1: "Our Approach" Banner */}
        <section className="relative h-[60vh] min-h-[500px] w-full flex items-center overflow-hidden">
          {/* Full-bleed background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/about/aboutusimgMAIN.jpg" 
              alt="Our Approach" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <Container className="relative z-10">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                  Our Approach
                </h2>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  We believe in transparency, quality, and safety above all else. Every project is an opportunity to prove our expertise and build lasting relationships.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* SECTION 2: "Our People" Textured Collage */}
        <section className="relative py-32 overflow-hidden bg-[#EAEAEA]"> {/* Light concrete base color */}
          
          {/* Texture Layer A (Light) */}
          <div className="absolute top-0 right-[-10%] w-[60%] h-full pointer-events-none opacity-40 mix-blend-multiply">
            <Image 
              src="/images/about/concretewall1.jpg" 
              alt="" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Texture Layer B (Darker, Offset) */}
          <div className="absolute bottom-0 left-[-10%] w-[50%] h-[80%] pointer-events-none opacity-20 mix-blend-multiply">
            <Image 
              src="/images/about/concretewall2.jpg" 
              alt="" 
              fill 
              className="object-cover" 
            />
          </div>

          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Text Content */}
              <div>
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight">
                    Our People
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      We invest in our team because they invest in your project. Our crew is trained, certified, and committed to excellence in every pour.
                    </p>
                    <p>
                      From our project managers to our finishers, everyone plays a critical role in delivering the final product. We foster a culture of respect, safety, and continuous improvement.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Minimal Collage Block */}
              <div className="relative h-[500px] w-full mt-12 lg:mt-0">
                <Reveal delay={0.2} className="h-full w-full">
                  {/* Image 1: Top Right (Large) */}
                  <div className="absolute top-0 right-0 w-[70%] h-[60%] shadow-2xl rounded-sm overflow-hidden z-10">
                    <Image 
                      src="/images/about/aboutUsimg1.jpg" 
                      alt="Team Member" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Image 2: Bottom Left (Medium) */}
                  <div className="absolute bottom-0 left-0 w-[60%] h-[50%] shadow-2xl rounded-sm overflow-hidden z-20 border-0 border-[#EAEAEA]">
                    <Image 
                      src="/images/about/aboutusimg7.jpg" 
                      alt="Team Work" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Image 3: Floating Overlay (Small) */}
                  <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] shadow-xl rounded-sm overflow-hidden z-30 border-0 border-[#EAEAEA]">
                    <Image 
                      src="/images/about/aboutusimg8.jpg" 
                      alt="Details" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </Reveal>
              </div>

            </div>
          </Container>
        </section>



        <ZoomHeroParallax 
          src="/images/about/concretewall2.jpg"
          title="every detail considered. every pour, every time."
          subtitle="Everything needs good foundation. With us, we got you covered."
          maxScale={1.7}
          textMaxScale={1.25}
        />
 
        <TextureCTA />
      </div>
    </>
  );
}
