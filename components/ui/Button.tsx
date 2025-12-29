import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "solid" | "outline";
  size?: "default" | "lg";
  wide?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "default", wide = false, href, children, ...props }, ref) => {
    
    // Base container styles
    const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden font-medium transition-all duration-300 ease-in-out group outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide text-sm";
    
    // Size styles
    const sizes = {
      default: "h-12 px-8 rounded-md",
      lg: "h-14 px-10 text-base rounded-lg",
    };

    const sizeClasses = sizes[size];

    // Variant-specific styles (outer container)
    const variantContainerStyles = {
       // Solid: Green BG, White Text -> (Hover) Green Text (on White Blob)
       // We set bg-accent (Green) initially. The blob will be White.
       solid: "bg-accent text-accent-foreground border border-accent hover:text-white",
       
       // Outline: Transparent BG, Green Text -> (Hover) White Text (on Green Blob)
       outline: "bg-transparent border border-accent text-accent hover:text-white",
    };

    // Determine blob color based on variant
    // Solid -> White Blob (reverses the green)
    // Outline -> Green Blob (fills the outline)
    const blobColor = variant === "solid" ? "bg-white" : "bg-accent";

    // The animated background blob
    // If wide=true, we use a much larger overlay to cover full-width buttons (like forms).
    const animatedBlob = (
      <span className={cn(
        "pointer-events-none absolute bottom-0 left-0 transition-all duration-500 ease-out z-0 rounded-full",
        blobColor,
        // Standard button logic (compact buttons like header CTA)
        !wide && "w-60 h-60 rotate-[-40deg] -translate-x-full translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0",
        // Wide button logic: oversized blob designed for full-width buttons
        // Uses larger dimensions and adjusted transforms to ensure edge-to-edge coverage
        wide && "w-[300%] h-[800%] rotate-[-40deg] -translate-x-[110%] translate-y-[95%] group-hover:translate-x-[-15%] group-hover:translate-y-[-45%] origin-bottom-left"
      )} />
    );

    // Inner text span
    const contentSpan = (
      <span className={cn(
        "relative w-full text-center transition-colors duration-300 ease-in-out z-10",
        // Text Color Logic:
        // Solid: Starts White (accent-foreground). On Hover (White Blob), turns Green (accent).
        // Outline: Starts Green (current). On Hover (Green Blob), turns White.
        // NOTE: User manually edited this section previously to simplify solid variant hover logic.
        // We ensure it remains consistent with their intent:
        // "solid": "bg-accent text-accent-foreground border border-accent hover:text-white"
        variant === "solid" ? "text-accent-foreground group-hover:text-accent" : "text-current group-hover:text-white"
      )}>
        {children}
      </span>
    );

    const combinedClasses = cn(baseStyles, variantContainerStyles[variant], sizeClasses, className);

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {animatedBlob}
          {contentSpan}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {animatedBlob}
        {contentSpan}
      </button>
    );
  }
);
Button.displayName = "Button";
