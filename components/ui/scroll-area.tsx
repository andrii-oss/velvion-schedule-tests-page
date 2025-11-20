"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(false);

  const updateShadows = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    const noScroll = scrollHeight <= clientHeight;
    setShowTopShadow(!noScroll && scrollTop > 0);
    setShowBottomShadow(!noScroll && scrollTop + clientHeight < scrollHeight);
  }, []);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    updateShadows();

    el.addEventListener("scroll", updateShadows);

    const resizeObserver = new ResizeObserver(updateShadows);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateShadows);
      resizeObserver.disconnect();
    };
  }, [updateShadows]);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn(
          "h-full w-full rounded-[inherit]",
          !(showTopShadow || showBottomShadow) && "overflow-hidden"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {showTopShadow && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-linear-to-b from-black/5 to-transparent " />
      )}

      {showBottomShadow && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 bg-linear-to-t from-black/5 to-transparent" />
      )}

      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-px",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-px",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-500 transition-colors min-h-[20px]" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollBar };
