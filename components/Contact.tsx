import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl border-t border-[#27272a] pt-12">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">06 Contact</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Start a build.
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-zinc-200 hover:text-[#10b981] sm:text-base"
        >
          <Mail className="size-4 text-[#10b981]" />
          {site.email}
        </a>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MagneticButton href={`mailto:${site.email}`}>
            <Mail className="size-3.5" />
            Contact Me
          </MagneticButton>
          <MagneticButton href={site.cv} download="Mahmoud-Elmaghraby-CV.pdf" variant="glass">
            <Download className="size-3.5" />
            Download Resume
          </MagneticButton>
          <MagneticButton href={site.linkedin} variant="glass" external>
            <LinkedInIcon className="size-3.5" />
            LinkedIn
          </MagneticButton>
          <MagneticButton href={site.github} variant="glass" external>
            <GitHubIcon className="size-3.5" />
            GitHub
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
