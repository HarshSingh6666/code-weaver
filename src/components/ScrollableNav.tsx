import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal scroll container with auto-hiding left/right arrow buttons.
 * Use to wrap a TabsList, nav row, or any inline list that may overflow.
 */
export const ScrollableNav = ({ children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(160, el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Left fade + arrow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-background via-background/70 to-transparent transition-opacity duration-200",
          canLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        tabIndex={canLeft ? 0 : -1}
        className={cn(
          "absolute left-1 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full glass border border-border/60 flex items-center justify-center text-foreground shadow-lg transition-all duration-200",
          "hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95",
          canLeft ? "opacity-100" : "opacity-0 pointer-events-none -translate-x-2",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Scroller */}
      <div
        ref={ref}
        className="overflow-x-auto scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {/* Right fade + arrow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-background via-background/70 to-transparent transition-opacity duration-200",
          canRight ? "opacity-100" : "opacity-0",
        )}
      />
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        tabIndex={canRight ? 0 : -1}
        className={cn(
          "absolute right-1 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full glass border border-border/60 flex items-center justify-center text-foreground shadow-lg transition-all duration-200",
          "hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95",
          canRight ? "opacity-100" : "opacity-0 pointer-events-none translate-x-2",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
