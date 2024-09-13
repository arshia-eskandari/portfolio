import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "animated-button shine inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background duration-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground", // removed hover:bg-primary/90
        destructive: "bg-destructive text-destructive-foreground", // removed hover:bg-destructive/90
        outline:
          "border border-input bg-background hover:text-accent-foreground", // removed hover:bg-accent
        secondary: "bg-secondary text-secondary-foreground", // removed hover:bg-secondary/80
        ghost: "hover:text-accent-foreground", // removed hover:bg-accent
        link: "text-primary underline-offset-4 hover:underline", // removed hover:bg-accent
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-2xl px-3",
        lg: "h-11 rounded-2xl px-8",
        icon: "h-10 w-10",
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

function ButtonComponent(
  { className, variant, size, asChild = false, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonComponent,
);

export { Button, buttonVariants };
