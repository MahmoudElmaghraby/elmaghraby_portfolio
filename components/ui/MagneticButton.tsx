"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "glass";
  download?: boolean | string;
  external?: boolean;
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "solid",
  download,
  external,
  className,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * 0.28);
    y.set((event.clientY - (box.top + box.height / 2)) * 0.4);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-md px-4 font-mono text-xs tracking-wide uppercase",
        variant === "solid"
          ? "bg-[#10b981] text-black"
          : "border border-[#27272a] bg-[#050505] text-white",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
