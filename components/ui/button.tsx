import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center px-6 py-2 gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-light text-white hover:bg-purple-900 hover:text-metal-100",
        outline:
          "border border-cyan text-cyan bg-transparent hover:bg-cyan hover:text-white dark:hover:text-cyan-light hover:text-cyan-light",
        outlineContrast:
          "border border-black text-black dark:text-white dark:border-metal-300 bg-transparent hover:border-metal-600 dark:hover:border-cyan hover:text-black dark:hover:text-cyan-light",
        secondary:
          "bg-purple-200 dark:bg-purple-900 text-cyan-light dark:text-cyan hover:text-white dark:hover:text-white hover:bg-cyan dark:hover:bg-cyan-light",
        ghost: "bg-transparent hover:bg-transparent",
        icon: "bg-transparent hover:bg-inherit",
        danger:
          "bg-red-500 hover:bg-red-300 dark:bg-red-300 dark:hover:bg-red-500 text-white",
        success:
          "bg-green-500 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600 text-white",
      },
      size: {
        default: "h-14 text-lg",
        sm: "h-12 text-lg",
        xs: "h-8 text-sm",
        lg: "h-16 text-xl",
        icon: "h-10 w-10 p-2 text-lg",
      },
      iconSize: {
        default: "[&_svg]:size-4",
        sm: "[&_svg]:size-3",
        md: "[&_svg]:size-5",
        lg: "[&_svg]:size-6",
        "3xl": "[&_svg]:size-[56px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconSize: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, iconSize, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
