import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface ImageBandProps {
  title: string;
  description?: string;
  image: string;
}

export function ImageBand({ title, description, image }: ImageBandProps) {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <Container className="relative z-10 text-center text-white">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
          {description && (
             <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
