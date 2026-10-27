import Image from "next/image";
import { IPhone15 } from "@/components/PhoneFrame";
import { AppStoreBadge, GooglePlayBadge } from "@/components/StoreBadges";
import { cn } from "@/lib/cn";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-20 border-b border-[#27272a] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">02 Simulator</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mobile simulator</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
          iPhone 15 Pro frames showing screenshots of the three shipped products.
        </p>
        <div className="mt-12 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-6 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {projects.map((project) => {
            const androidShot = project.image.endsWith("banzinty.png");
            return (
            <article key={project.id} className="w-[86vw] max-w-[300px] shrink-0 snap-center lg:w-auto lg:max-w-none">
              <IPhone15 label={project.title}>
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="260px"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover select-none",
                    androidShot ? "object-center scale-[1.08] translate-y-[-2px]" : "object-top",
                  )}
                />
              </IPhone15>
              <h3 className="mt-5 text-lg font-medium text-white">{project.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">{project.description}</p>
              <div className={cn("mt-4 flex items-stretch gap-2", project.appStore ? "justify-start" : "justify-center")}>
                {project.appStore ? <AppStoreBadge href={project.appStore} className="min-w-0 flex-1" /> : null}
                <GooglePlayBadge href={project.playStore} className={project.appStore ? "min-w-0 flex-1" : undefined} />
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
