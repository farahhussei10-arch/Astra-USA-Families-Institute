import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-5 text-sm font-bold tracking-[0.02em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12 before:bg-white/25 before:transition-transform before:duration-700 hover:before:translate-x-[420%]",
  {
    variants: {
      variant: {
        primary:
          "border border-white/10 bg-[linear-gradient(135deg,#1d6df2_0%,#2a4fcf_35%,#17346e_100%)] text-primary-foreground shadow-[0_18px_40px_rgba(38,88,255,0.34)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(38,88,255,0.42)]",
        gold:
          "border border-amber-200/40 bg-[linear-gradient(135deg,#f7d779_0%,#d9a93d_35%,#b67c1b_100%)] text-slate-950 shadow-[0_18px_40px_rgba(217,169,61,0.35)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(217,169,61,0.42)]",
        outline:
          "border border-white/12 bg-white/5 text-foreground backdrop-blur-md hover:border-primary/60 hover:bg-white/8 hover:text-primary",
        whatsapp:
          "border border-[#8affb0]/40 bg-[linear-gradient(135deg,#35e47d_0%,#19b866_100%)] text-white shadow-[0_18px_40px_rgba(34,197,94,0.3)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(34,197,94,0.42)]",
        ghost: "text-foreground hover:bg-white/5",
      },
      size: {
        default: "h-11",
        lg: "h-13 px-6 text-base",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };