"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { architecture } from "@/lib/site";

export function Architecture() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="architecture" className="scroll-mt-20 border-b border-[#27272a] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">05 Architecture</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Clean Architecture
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
          Three layers. Select one to trace the data flow into the next.
        </p>

        <div className="mt-10">
          {architecture.map((layer, layerIndex) => {
            const selected = active === layerIndex;
            const linked = active === layerIndex || active === layerIndex + 1;
            return (
              <div key={layer.id}>
                <div className="grid items-stretch gap-3 sm:grid-cols-[9.5rem_1fr]">
                  <button
                    type="button"
                    onClick={() => setActive(layerIndex)}
                    aria-pressed={selected}
                    className={cn(
                      "border px-3 py-3 text-left font-mono text-[11px] tracking-[0.14em] uppercase",
                      selected
                        ? "border-[#10b981] text-[#10b981]"
                        : "border-[#27272a] text-zinc-400 hover:text-white",
                    )}
                  >
                    0{layerIndex + 1}
                    <span className="mt-1 block text-xs tracking-normal text-white normal-case">
                      {layer.name} Layer
                    </span>
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    {layer.nodes.map((node) => (
                      <button
                        key={node}
                        type="button"
                        onClick={() => setActive(layerIndex)}
                        className={cn(
                          "border px-3 py-4 text-left font-mono text-[11px] leading-5",
                          selected
                            ? "border-[#10b981] text-white"
                            : "border-[#27272a] text-zinc-400",
                        )}
                      >
                        {node}
                      </button>
                    ))}
                  </div>
                </div>
                {layerIndex < architecture.length - 1 ? (
                  <div className="grid sm:grid-cols-[9.5rem_1fr]">
                    <div className="hidden sm:block" />
                    <div className="grid grid-cols-3">
                      {[0, 1, 2].map((column) => (
                        <FlowLine key={column} active={linked} reduce={Boolean(reduce)} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FlowLine({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <svg viewBox="0 0 12 56" className="mx-auto h-14 w-8" aria-hidden="true">
      <motion.line
        x1="6"
        y1="2"
        x2="6"
        y2="48"
        stroke={active ? "#10b981" : "#27272a"}
        strokeWidth="1.5"
        strokeDasharray="3 5"
        animate={reduce || !active ? { strokeDashoffset: 0 } : { strokeDashoffset: [0, -16] }}
        transition={reduce || !active ? { duration: 0 } : { duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      <path d="M3 46 L6 52 L9 46" fill="none" stroke={active ? "#10b981" : "#27272a"} strokeWidth="1.5" />
    </svg>
  );
}
