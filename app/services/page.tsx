import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { CenteredIntro } from "@/components/sections/CenteredIntro";
import { HorizontalLockSlideshow } from "@/components/sections/HorizontalLockSlideshow";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive concrete and construction services.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero 
        title={siteConfig.services.hero.title}
        subtitle={siteConfig.services.hero.subtitle}
        showScroll={true}
        cta="Get a Quote"
        image="/images/placeholder-3.jpg"
      />
      
      <div className="relative z-10 bg-background mt-[100vh]">
        <div id="intro">
          <CenteredIntro 
             heading="Precision at every scale."
             description="We handle residential flourishes and commercial foundations with equal care."
             watermark="SERVICES"
          />
        </div>

        {/* Horizontal Lock Slideshow */}
        <HorizontalLockSlideshow />
      </div>
      
    </>
  );
}
