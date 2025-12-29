"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-6"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
               "text-xl font-bold tracking-tight uppercase z-50 relative transition-colors",
               !isScrolled && "text-white mix-blend-difference" // Contrast against hero
            )}
           >
            {siteConfig.name}
          </Link>

          {/* Desktop Nav */}
          <nav className={cn(
            "hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase transition-colors",
             !isScrolled ? "text-white/90" : "text-foreground"
          )}>
            {siteConfig.nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
             <div className={cn("flex gap-3", !isScrolled ? "text-white" : "text-foreground")}>
               <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                 <Instagram className="w-5 h-5 hover:text-accent transition-colors" />
               </a>
               <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                 <Linkedin className="w-5 h-5 hover:text-accent transition-colors" />
               </a>
             </div>
             <Button 
               href="/contact" 
               variant="solid"
               className={cn(
                 // Only slightly adjust opacity/border if needed, but keep Green Brand Color
                 !isScrolled && "border-none shadow-lg" 
               )}
             >
               {siteConfig.hero.cta}
             </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-1"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={cn("w-7 h-7 transition-colors", isScrolled ? "text-foreground" : "text-white")} />
          </button>
        </Container>
      </header>
      
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
