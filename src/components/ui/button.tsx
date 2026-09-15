import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-bright",
        gold: "bg-gold text-gold-foreground shadow-button hover:-translate-y-0.5 hover:bg-gold-bright",
        outline:
          "border border-border-strong bg-surface/80 text-foreground backdrop-blur hover:border-primary hover:text-primary",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-button hover:-translate-y-0.5 hover:bg-whatsapp-bright",
        ghost: "text-foreground hover:bg-muted",
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

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };