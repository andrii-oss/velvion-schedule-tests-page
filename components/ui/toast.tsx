"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-[100] flex max-h-screen w-[calc(100vw-32px)] flex-col-reverse p-4 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-[8px] p-4 pr-6 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  {
    variants: {
      variant: {
        default: "bg-black text-light shadow-lg",
        destructive: "bg-black text-light shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toastRef = React.useRef<React.ElementRef<typeof ToastPrimitives.Root>>(null);

  React.useEffect(() => {
    const element = toastRef.current;
    if (!element) return;

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state");
      setIsOpen(state === "open");
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    // Initial state
    const initialState = element.getAttribute("data-state");
    setIsOpen(initialState === "open");

    return () => observer.disconnect();
  }, []);

  return (
    <ToastPrimitives.Root
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        toastRef.current = node;
      }}
      className={cn(toastVariants({ variant }), className)}
      style={{
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        opacity: isOpen ? 1 : 0,
      }}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-cyan dark:border-cyan-light bg-transparent px-3 text-sm font-medium",
      "transition-colors hover:bg-cyan-light dark:hover:bg-cyan/20 focus:outline-none focus:ring-1 focus:ring-cyan disabled:pointer-events-none",
      "text-cyan dark:text-cyan-light disabled:opacity-50",
      "group-[.destructive]:border-red-500 group-[.destructive]:hover:border-red-600",
      "group-[.destructive]:hover:bg-red-100 dark:group-[.destructive]:hover:bg-red-900/30",
      "group-[.destructive]:text-red-700 dark:group-[.destructive]:text-red-300",
      "group-[.destructive]:focus:ring-red-500",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1 text-cyan-light opacity-100 transition-opacity hover:text-cyan-light hover:bg-cyan-light/10",
      "focus:outline-none focus:ring-1 focus:ring-cyan-light/20",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-6 w-6" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      "text-sm font-semibold text-light [&+div]:text-xs",
      className
    )}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90 text-light/80", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

function Toaster({
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastProvider>) {
  return (
    <ToastProvider {...props}>
      <ToastViewport />
    </ToastProvider>
  );
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
};
