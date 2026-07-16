import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.875rem] text-[0.9375rem] font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-yellow-400 text-neutral-950 shadow-[0_8px_30px_rgba(245,197,24,0.18)] hover:-translate-y-0.5 hover:bg-yellow-300 active:translate-y-0 active:bg-yellow-500",
        outline:
          "border border-neutral-300 bg-white/70 text-neutral-950 hover:-translate-y-0.5 hover:border-neutral-950 hover:bg-white",
        ghost:
          "text-neutral-950 hover:bg-neutral-950/[0.06]",
      },
      size: {
        default: "h-14 px-7",
        sm: "h-11 rounded-xl px-5 text-sm",
        lg: "h-[3.75rem] px-8 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
