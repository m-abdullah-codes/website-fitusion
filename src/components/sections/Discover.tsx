"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconBadge, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/plans";

/** How aggressively off-center cards shrink / fade. */
const SCALE_STRENGTH = 0.42;
const FADE_STRENGTH = 0.9;
const MIN_SCALE = 0.82;
const MIN_OPACITY = 0.4;

export function Discover() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    startIndex: 1, // Strength Build starts highlighted, matching the design
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useRef(false);
  const swipeHinted = useRef(false);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  /** Continuous depth: scale + fade each card by its distance from the center. */
  const tween = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const progress = emblaApi.scrollProgress();
    const inView = emblaApi.slidesInView();

    emblaApi.scrollSnapList().forEach((snap, snapIndex) => {
      const diff = Math.abs(snap - progress);
      engine.slideRegistry[snapIndex].forEach((slideIndex) => {
        if (!inView.includes(slideIndex)) return;
        const node = cardRefs.current[slideIndex];
        if (!node) return;
        if (reducedMotion.current) {
          node.style.transform = "";
          node.style.opacity = "";
          return;
        }
        const scale = Math.max(MIN_SCALE, 1 - diff * SCALE_STRENGTH);
        const opacity = Math.max(MIN_OPACITY, 1 - diff * FADE_STRENGTH);
        node.style.transform = `scale(${scale.toFixed(3)})`;
        node.style.opacity = opacity.toFixed(3);
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!emblaApi) return;

    const refresh = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
      tween();
    };
    refresh();

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", tween);
    emblaApi.on("reInit", refresh);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", tween);
      emblaApi.off("reInit", refresh);
    };
  }, [emblaApi, onSelect, tween]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  /** Mobile-only swipe hint: auto-advance once when the section first enters view. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !emblaApi) return;

    const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || swipeHinted.current || !isMobile()) return;
        swipeHinted.current = true;
        observer.disconnect();

        const timer = setTimeout(() => {
          emblaApi.scrollNext();
        }, 500);

        return () => clearTimeout(timer);
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [emblaApi]);

  return (
    <section ref={sectionRef} className="section-flush overflow-hidden">
      <div className="section-container px-6">
        <SectionHeading
          top="Discover"
          accent="What Sets Us Apart"
          subtitle="We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter."
        />
      </div>

      {/* Embla viewport */}
      <div className="cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 sm:-ml-6">
          {PLANS.map(({ icon, title, description }, i) => {
            const active = i === selectedIndex;
            return (
              <div
                key={title}
                className="min-w-0 pl-4 sm:pl-6 flex-[0_0_82%] sm:flex-[0_0_56%] lg:flex-[0_0_34%]"
              >
                <article
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-full min-h-[300px] sm:min-h-[330px] rounded-[28px] border p-6 sm:p-7",
                    "flex flex-col will-change-transform select-none",
                    "transition-[background-color,border-color] duration-300",
                    active
                      ? "card-surface-active border-olive/60 shadow-soft"
                      : "card-surface border-iron cursor-pointer"
                  )}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <IconBadge
                      icon={icon}
                      size="lg"
                      filled
                      className="rounded-full bg-coal border border-olive shrink-0"
                    />
                    <h3 className="font-sans font-bold text-pure text-xl sm:text-2xl leading-tight">
                      {title}
                    </h3>
                  </div>

                  <p
                    className={cn(
                      "text-base leading-relaxed mb-8 flex-1",
                      active ? "text-bone/90" : "text-ash"
                    )}
                  >
                    {description}
                  </p>

                  <button
                    className={cn(
                      "self-start rounded-full px-7 py-2.5 font-sans font-bold text-sm",
                      "transition-all hover:scale-[1.03] active:scale-[0.98]",
                      active
                        ? "btn-primary-gradient text-void hover:shadow-glow"
                        : "bg-fern text-citron hover:bg-fern/90"
                    )}
                  >
                    See Plan
                  </button>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls: arrows (desktop) flanking clickable dots */}
      <div className="mt-8 flex justify-center items-center gap-5">
        <button
          aria-label="Previous plan"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className={cn(
            "hidden sm:flex w-10 h-10 rounded-full border border-iron bg-onyx text-volt",
            "items-center justify-center transition hover:border-olive hover:bg-graphite",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2.5">
          {scrollSnaps.map((_, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={i}
                aria-label={`Go to plan ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  active ? "w-7 bg-volt" : "w-2.5 bg-smoke/50 hover:bg-smoke"
                )}
              />
            );
          })}
        </div>

        <button
          aria-label="Next plan"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className={cn(
            "hidden sm:flex w-10 h-10 rounded-full border border-iron bg-onyx text-volt",
            "items-center justify-center transition hover:border-olive hover:bg-graphite",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
