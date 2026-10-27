import { Download, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { about, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="scroll-mt-20 border-b border-[#27272a] px-4 pt-24 pb-14 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#10b981] uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#10b981] opacity-70" />
            <span className="relative size-2 rounded-full bg-[#10b981]" />
          </span>
          {site.availability}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 font-mono text-xs tracking-[0.28em] text-zinc-400 uppercase">
          {site.role}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">{about}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticButton href={site.cv} download="Mahmoud-Elmaghraby-CV.pdf">
            <Download className="size-3.5" />
            Download Resume
          </MagneticButton>
          <MagneticButton href="#contact" variant="glass">
            <Mail className="size-3.5" />
            Contact Me
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
