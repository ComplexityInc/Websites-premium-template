"use client";

import { useRef, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HorizontalLockSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemsLength = siteConfig.services.items.length;
    
    // Set up responsive height and scroll logic
    const handleResize = () => {
      if (!container) return;
      if (window.innerWidth < 768) {
        container.style.height = 'auto';
      } else {
        container.style.height = `${itemsLength * 100}vh`;
      }
    };

    // Initial resize check
    handleResize();
    window.addEventListener('resize', handleResize);

    let rafId: number;

    const onScroll = () => {
      if (!container || window.innerWidth < 768) return; 

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const rawProgress = scrolled / viewportHeight;
      const maxProgress = itemsLength - 1; 
      const progress = Math.max(0, Math.min(rawProgress, maxProgress));
      
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        
        // 1. Enter Progress
        let enterProgress = 0;
        if (index === 0) {
          enterProgress = 1;
        } else {
          enterProgress = Math.max(0, Math.min(1, progress - (index - 1)));
        }

        // 2. Exit Progress
        const exitProgress = Math.max(0, Math.min(1, progress - index));
        
        // Apply Transforms
        const xTrans = (1 - enterProgress) * 100;
        const scale = 1 - (exitProgress * 0.05);
        const brightness = 1 - (exitProgress * 0.5);
        
        slide.style.transform = `translate3d(${xTrans}%, 0, 0) scale(${scale})`;
        slide.style.filter = `brightness(${brightness})`;
        slide.style.zIndex = `${index + 10}`;
      });
    };

    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-background min-h-screen"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {siteConfig.services.items.map((item, index) => (
          <div
            key={index}
            ref={(el) => { slideRefs.current[index] = el; }}
            className={cn(
              "absolute inset-0 w-full h-full will-change-transform bg-zinc-950",
              "flex flex-col justify-end md:justify-center p-6 md:p-20",
              // Mobile fallback: Relative positioning, natural stacking
              "max-md:relative max-md:h-screen max-md:translate-x-0! max-md:scale-100! max-md:filter-none!"
            )}
            style={{ 
              zIndex: index 
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 bg-black/40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text readability */}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl w-full text-white">
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span className="text-sm md:text-base font-mono tracking-widest text-primary-foreground/80 border border-white/20 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                  0{index + 1} — Service
                </span>
                
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                  {item.title}
                </h2>
                
                <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed drop-shadow-md">
                  {item.description}
                </p>

                {/* Optional features list */}
                {item.mosaic && (
                  <ul className="hidden md:flex flex-wrap gap-4 pt-4">
                     {/* Placeholder features strictly for visuals */}
                     {['Custom Solution', 'Expert Team', 'High Durability'].map((f, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                         {f}
                       </li>
                     ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
