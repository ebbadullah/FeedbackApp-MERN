import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-brand-blue-500 text-white hover:bg-brand-blue-600 active:bg-brand-blue-700",
        secondary:
          "bg-brand-yellow-500 text-gray-900 hover:bg-brand-yellow-600 active:bg-brand-yellow-700",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-button-pulse",
        glow: "animate-button-glow",
        slide:
          "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";

    // For slide animation, we need to add an after element
    const slideAnimation =
      animation === "slide" ? (
        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20 group-active:opacity-30"></span>
      ) : null;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, animation }),
          animation === "slide" ? "group" : "",
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
        {slideAnimation}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
