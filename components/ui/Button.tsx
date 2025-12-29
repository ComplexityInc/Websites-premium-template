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
    // REVERTED to original logic (keeps hover:text-* functionality on container)
    const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden transition-all duration-300 ease-in-out group outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide text-sm";
    
    // Size styles
    const sizes = {
      default: "h-12 px-8 rounded-md",
      lg: "h-14 px-10 text-base rounded-lg",
    };

    const sizeClasses = sizes[size];

    // Variant-specific styles (outer container)
    // Removed hover:text-white from solid to allow contentSpan to control text color (flipping to green on white blob)
    const variantContainerStyles = {
       solid: "bg-accent text-accent-foreground border border-accent",
       outline: "bg-transparent border border-accent text-accent hover:text-white",
    };

    // Determine blob color based on variant
    const blobColor = variant === "solid" ? "bg-white" : "bg-accent";

    // The animated background blob
    // Guaranteed to "land perfectly" by using oversized dimensions and precise offsets
    const animatedBlob = (
      <span className={cn(
        "pointer-events-none absolute bottom-0 left-0 rounded-full transition-all ease-out z-0",
        blobColor,
        // Standard button: Original bubble wash
        !wide && "w-60 h-60 duration-500 -rotate-45 -translate-x-full translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-hover:translate-y-0",
        // Wide button: Massive circle that sweeps across to fill perfectly
        wide && "w-[250%] h-[850%] duration-700 -rotate-45 -translate-x-[110%] translate-y-[110%] group-hover:translate-x-[-15%] group-hover:translate-y-[-50%]"
      )} />
    );

    // Inner text span
    // Text color logic: 
    // Solid: White text -> Green text on Hover (matched with White blob)
    // Outline: Green text -> White text on Hover (matched with Green blob)
    const contentSpan = (
      <span className={cn(
        "relative w-full text-center transition-colors duration-300 ease-in-out z-10",
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
