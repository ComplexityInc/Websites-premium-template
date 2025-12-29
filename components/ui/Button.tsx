import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "solid" | "outline";
  size?: "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "default", href, children, ...props }, ref) => {
    
    // Base container styles
    const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden font-medium transition-all group outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide text-sm";
    
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
       solid: "bg-accent text-accent-foreground border border-accent hover:border-accent",
       
       // Outline: Transparent BG, Green Text -> (Hover) White Text (on Green Blob)
       outline: "bg-transparent border border-accent text-accent hover:text-white",
    };

    // Determine blob color based on variant
    // Solid -> White Blob (reverses the green)
    // Outline -> Green Blob (fills the outline)
    const blobColor = variant === "solid" ? "bg-white" : "bg-accent";

    // The animated background blob
    // Reverted to the original logic requested by user, but sized up slightly to `w-56 h-56` (14rem) to cover long buttons.
    // Original prompt logic: "w-48 h-48 ... -translate-x-full translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
    const animatedBlob = (
      <span className={cn(
        "absolute w-60 h-60 rounded rounded-full rotate-[-40deg] bottom-0 left-0",
        blobColor,
        // Initial Position (Hidden bottom-left)
        "-translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out",
        // Hover Position (Slides up and right to cover)
        "group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
      )} />
    );

    // Inner text span
    const contentSpan = (
      <span className={cn(
        "relative w-full text-center transition-colors duration-300 ease-in-out z-10",
        // Text Color Logic:
        // Solid: Starts White (accent-foreground). On Hover (White Blob), turns Green (accent).
        // Outline: Starts Green (current). On Hover (Green Blob), turns White.
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
