import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface ImageMosaicProps {
  images: string[];
  className?: string;
}

export function ImageMosaic({ images, className }: ImageMosaicProps) {
  // Simple 2-column or 3-column mosaic
  const safeImages = images.slice(0, 4); // Limit to 4 for this layout

  return (
    <div className={cn("grid grid-cols-2 gap-4 md:gap-6", className)}>
      <div className="space-y-4 md:space-y-6">
        {safeImages[0] && (
            <Reveal delay={0.1} className="relative aspect-[3/4] w-full overflow-hidden">
              <Image src={safeImages[0]} alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
        )}
        {safeImages[2] && (
            <Reveal delay={0.3} className="relative aspect-[4/3] w-full overflow-hidden">
              <Image src={safeImages[2]} alt="Gallery 3" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
        )}
      </div>
      <div className="space-y-4 md:space-y-6 pt-12">
        {safeImages[1] && (
            <Reveal delay={0.2} className="relative aspect-[4/3] w-full overflow-hidden">
              <Image src={safeImages[1]} alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
        )}
        {safeImages[3] && (
            <Reveal delay={0.4} className="relative aspect-[3/4] w-full overflow-hidden">
              <Image src={safeImages[3]} alt="Gallery 4" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
        )}
      </div>
    </div>
  );
}
