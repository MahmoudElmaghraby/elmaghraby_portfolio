import { experience } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-[#27272a] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">03 Path</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Engineering log</h2>
        <ol className="mt-10 border-t border-[#27272a]">
          {experience.map((item) => (
            <li
              key={item.company}
              className="grid gap-2 border-b border-[#27272a] py-5 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-zinc-500 uppercase">
                {item.current ? (
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#10b981] opacity-70" />
                    <span className="relative size-2 rounded-full bg-[#10b981]" />
                  </span>
                ) : (
                  <span className="size-2 bg-[#27272a]" aria-hidden="true" />
                )}
                {item.period}
              </p>
              <div>
                <h3 className="text-lg text-white">{item.company}</h3>
                <p className="mt-1 text-sm text-zinc-300">{item.role}</p>
                <p className="mt-1 font-mono text-[11px] text-zinc-500">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
