import { Hero } from "@/components/sections/Hero";
import { CenteredIntro } from "@/components/sections/CenteredIntro";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { HorizontalScrollSection } from "@/components/sections/HorizontalScrollSection";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { TextureCTA } from "@/components/sections/TextureCTA";

// Home: Hero → CenteredIntro → CapabilitiesGrid → [Horizontal: Team → Precision] → Marquee → CTA
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background mt-[100vh]">
        <CenteredIntro />
        <CapabilitiesGrid />
        <HorizontalScrollSection />
        <PartnerMarquee />
        <TextureCTA />
      </div>
    </>
  );
}
