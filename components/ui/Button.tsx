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
    // REVERTED: Restored original hover:text-white logic on container
    const variantContainerStyles = {
       solid: "bg-accent text-accent-foreground border border-accent hover:text-white",
       outline: "bg-transparent border border-accent text-accent hover:text-white",
    };

    // Determine blob color based on variant
    const blobColor = variant === "solid" ? "bg-white" : "bg-accent";

    // The animated background blob
    // MODIFIED: Only renders if !wide to disable animation on contact form button.
    // Restored original transform logic for the standard button.
    const animatedBlob = !wide ? (
      <span className={cn(
        "pointer-events-none absolute bottom-0 left-0 rounded-full transition-all duration-500 ease-out z-0",
        blobColor,
        "w-60 h-60 rotate-[-40deg] -translate-x-full translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-hover:translate-y-0"
      )} />
    ) : null;

    // Inner text span
    // REVERTED: Simplified back to original intent, z-10 to stay above blob.
    // Relying on container hover:text-white for consistent text color change.
    const contentSpan = (
      <span className={cn(
        "relative w-full text-center transition-colors duration-300 ease-in-out z-10",
        variant === "solid" ? "group-hover:text-accent" : "text-current group-hover:text-white"
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
