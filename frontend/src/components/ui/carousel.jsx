import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within <Carousel />");
  return context;
}

const Carousel = React.forwardRef(({ orientation = "horizontal", opts, plugins, setApi, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  return (
    <CarouselContext.Provider value={{ carouselRef, api, scrollPrev: () => api.scrollPrev(), scrollNext: () => api.scrollNext(), canScrollPrev, canScrollNext, orientation, opts, plugins }}>
      <div ref={ref} onKeyDownCapture={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); api.scrollPrev(); } else if (e.key === "ArrowRight") { e.preventDefault(); api.scrollNext(); } }} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

// CarouselContent, CarouselItem, CarouselPrevious, CarouselNext follow the same pattern without type annotations
