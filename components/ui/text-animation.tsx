
import { cn } from "@/lib/utils";

interface TextAnimationProps {
  text?: string;
  image?: string;
  className?: string; // Container className
  textClassName?: string; // Text specific className override
}

export const TextAnimation = ({ text, image, className, textClassName }: TextAnimationProps = {}) => {
  const baseTextClass = "m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text bg-contain bg-clip-text opacity-80 will-change-transform transform-gpu";
  
  // If props are provided, render the specific text instance (for HorizontalScrollSection)
  if (text) {
    return (
      <div className={cn("flex flex-col justify-center", className)}>
        <p 
          className={cn(baseTextClass, textClassName)}
          style={{ backgroundImage: image ? `url('${image}')` : undefined }}
        >
          {text}
        </p>
      </div>
    );
  }

  // Default Demo Implementation (User Provided + Fixes)
  return (
    <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-white isolate z-0 overflow-hidden">
      <p className={`${baseTextClass} bg-[url('https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')]`}>
        Text
      </p>
      <p className={`${baseTextClass} bg-[url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')]`}>
        Animation
      </p>
    </div>
  );
};
