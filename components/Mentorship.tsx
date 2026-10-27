"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { mentorship, mentorshipFilters, mentorshipMetrics, mentorshipTags } from "@/lib/site";

const highlights = [
  {
    kicker: "Competition Judge & Lead Mentor",
    body: "Served as a judge and mentor in coding competitions. Mentored a student developer team at Techno Space that secured 1st Place in a competitive programming hackathon.",
  },
  {
    kicker: "Technical Instructor at CIC",
    detail: "IGS & Partners",
    body: "Led the Applied Flutter UI Development bootcamp for engineering students at CIC, with a 86.67 / 100 Facilitator NPS for practical delivery and mentorship.",
  },
  {
    kicker: "2+ Years Teaching",
    body: "Structured lecturing in Flutter, BLoC Architecture, Firebase, and Native Android.",
  },
] as const;

type FilterId = (typeof mentorshipFilters)[number]["id"];
type Photo = (typeof mentorship)[number];

export function Mentorship() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<Photo | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const visible = mentorship.filter((photo) => filter === "all" || photo.category === filter);

  useEffect(() => {
    if (!active) {
      if (wasOpen.current) {
        wasOpen.current = false;
        openerRef.current?.focus();
      }
      return;
    }

    wasOpen.current = true;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="mentorship" className="scroll-mt-20 border-b border-[#27272a] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">04 Mentorship</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Mentorship, Instructing & Judging
        </h2>

        <div className="mt-10 grid border border-[#27272a] md:grid-cols-3">
          {mentorshipMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-[#27272a] px-5 py-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
            >
              <p className="font-mono text-2xl tracking-tight text-white sm:text-3xl">
                <span className="mr-2" aria-hidden="true">
                  {metric.mark}
                </span>
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.kicker} className="border border-[#27272a] p-5">
              <h3 className="text-lg text-white">{item.kicker}</h3>
              {"detail" in item ? (
                <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[#10b981] uppercase">{item.detail}</p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.body}</p>
              {item.kicker === "2+ Years Teaching" ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {mentorshipTags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[#10b981]/50 bg-[#10b981]/10 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-[#10b981] uppercase shadow-[0_0_18px_rgba(16,185,129,0.28)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Photo filters">
          {mentorshipFilters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
                  selected
                    ? "border-[#10b981] bg-[#10b981] text-black"
                    : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "photo" : "photos"}
        </p>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((photo) => (
              <motion.button
                key={photo.image}
                type="button"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.28 }}
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setActive(photo);
                }}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-[#050505] text-left"
              >
                <motion.span
                  className="block"
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="block h-auto w-full"
                  />
                </motion.span>
                <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-white backdrop-blur-md">
                  {photo.badge}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-4 text-sm leading-5 text-zinc-100">
                  {photo.caption}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onClick={() => setActive(null)}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-white/10 bg-black/70 text-white"
            >
              <X className="size-5" />
            </button>
            <motion.figure
              className="max-h-full max-w-5xl"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={active.image}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="90vw"
                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
                priority
              />
              <figcaption className="mt-3 text-center text-sm text-zinc-300">{active.caption}</figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
