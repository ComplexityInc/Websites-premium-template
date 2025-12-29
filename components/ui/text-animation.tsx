import { cn } from "@/lib/utils";

interface TextAnimationProps {
  text: string;
  image: string;
  className?: string;
}

export const TextAnimation = ({ text, image, className }: TextAnimationProps) => {
  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden", className)}>
      <p 
        className="m-0 text-transparent text-6xl sm:text-8xl md:text-9xl font-black uppercase bg-cover bg-center bg-clip-text opacity-90 leading-none tracking-tighter animate-text"
        style={{ backgroundImage: `url('${image}')` }}
      >
        {text}
      </p>
    </div>
  );
};
