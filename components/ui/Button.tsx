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
    // CRITICAL: "group" enables group-hover on children, "relative overflow-hidden" clips the blob
    const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden transition-all duration-300 ease-in-out group outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide text-sm";
    
    // Size styles
    const sizes = {
      default: "h-12 px-8 rounded-md",
      lg: "h-14 px-10 text-base rounded-lg",
    };

    const sizeClasses = sizes[size];

    // Variant-specific styles (outer container)
    // REMOVED hover:text-* from container to avoid conflict with inner span group-hover
    const variantContainerStyles = {
       solid: "bg-accent border border-accent",
       outline: "bg-transparent border border-accent",
    };

    // Determine blob color based on variant
    const blobColor = variant === "solid" ? "bg-white" : "bg-accent";

    // The animated background blob
    // Uses viewport-relative sizing (vmax) to guarantee coverage on any button width
    const animatedBlob = (
      <span
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 rounded-full transition-all duration-500 ease-out z-0",
          blobColor,
          // Standard buttons (compact, like header CTA)
          !wide && "w-60 h-60 rotate-[-40deg] -translate-x-full translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-hover:translate-y-0",
          // Wide buttons (form submit): guaranteed coverage + fully hidden at rest
          wide && [
            "w-[120vmax] h-[120vmax]",
            "rotate-[-40deg]",
            "-translate-x-[120%] translate-y-[120%]",
            "group-hover:translate-x-[-35%] group-hover:translate-y-[-35%]"
          ].join(" ")
        )}
      />
    );

    // Inner text span
    // Text color controlled ONLY here via group-hover (no conflict with container)
    const contentSpan = (
      <span className={cn(
        "relative w-full text-center transition-colors duration-300 ease-in-out z-10",
        // Solid: white text -> green text on hover (white blob reveals)
        variant === "solid" && "text-accent-foreground group-hover:text-accent",
        // Outline: green text -> white text on hover (green blob fills)
        variant === "outline" && "text-accent group-hover:text-white"
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
