import { metrics } from "@/lib/site";

export function About() {
  return (
    <section id="impact" className="scroll-mt-20 border-b border-[#27272a]" aria-label="Engineering metrics">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-4 border-b border-[#27272a] px-4 py-6 last:border-b-0 sm:px-6 md:border-r md:border-b-0 md:last:border-r-0"
          >
            {metric.pulse ? (
              <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#10b981] opacity-70" />
                <span className="relative size-2.5 rounded-full bg-[#10b981]" />
              </span>
            ) : (
              <span className="size-2.5 shrink-0 bg-[#27272a]" aria-hidden="true" />
            )}
            <div>
              <p className="font-mono text-2xl tracking-tight text-white sm:text-3xl">{metric.value}</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
