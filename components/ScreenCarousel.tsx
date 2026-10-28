"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type ScreenCarouselProps = {
  images: readonly string[];
  title: string;
  imageClassName?: string;
};

export function ScreenCarousel({ images, title, imageClassName }: ScreenCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const multiple = images.length > 1;

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(images.length - 1, Math.max(0, index)));
  }, [images.length]);

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const next = (index + images.length) % images.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [images.length],
  );

  return (
    <div className="group absolute inset-0">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-full w-full shrink-0 snap-center snap-always"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="260px"
              draggable={false}
              className={cn("object-cover object-top select-none", imageClassName)}
            />
          </div>
        ))}
      </div>

      {multiple ? (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous screenshot"
            className="absolute top-1/2 left-2 z-40 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100 md:flex"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next screenshot"
            className="absolute top-1/2 right-2 z-40 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100 md:flex"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 ring-1 ring-white/10 backdrop-blur">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-[#10b981]" : "w-1.5 bg-white/45 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
