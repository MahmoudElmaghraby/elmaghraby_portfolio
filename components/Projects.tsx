import Image from "next/image";
import { IPhone15 } from "@/components/PhoneFrame";
import { ScreenCarousel } from "@/components/ScreenCarousel";
import { AppStoreBadge, GooglePlayBadge } from "@/components/StoreBadges";
import { cn } from "@/lib/cn";
import { projects } from "@/lib/site";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-20 border-b border-[#27272a] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#10b981] uppercase">02 Simulator</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mobile simulator</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
          iPhone 15 Pro frames showing screenshots of four shipped products, led by Ithnain, my biggest app. Swipe inside each phone to browse more screens.
        </p>

        <article className="mt-12 grid items-center gap-10 rounded-3xl border border-[#10b981]/30 bg-[#10b981]/[0.04] p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
          <IPhone15 label={featured.title}>
            <ScreenCarousel images={featured.images} title={featured.title} />
          </IPhone15>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-[#10b981] uppercase">
              <span className="size-1.5 rounded-full bg-[#10b981]" aria-hidden="true" />
              {featured.badge}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <Image
                src={featured.icon}
                alt={`${featured.title} icon`}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-2xl ring-1 ring-white/10"
              />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{featured.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{featured.subtitle}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-300">{featured.description}</p>
            <ul className="mt-5 space-y-2.5">
              {featured.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#10b981]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {featured.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#27272a] bg-black/40 px-3 py-2.5">
                  <dt className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">{stat.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <li key={tag} className="rounded-md border border-[#27272a] px-2 py-1 font-mono text-[11px] text-zinc-400">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <GooglePlayBadge href={featured.playStore} />
              <span className="font-mono text-[11px] tracking-[0.12em] text-zinc-500 uppercase">{featured.iosStatus}</span>
            </div>
          </div>
        </article>

        <div className="mt-14 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-6 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {rest.map((project) => {
            return (
            <article key={project.id} className="w-[86vw] max-w-[300px] shrink-0 snap-center lg:w-auto lg:max-w-none">
              <IPhone15 label={project.title}>
                <ScreenCarousel
                  images={project.images}
                  title={project.title}
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
