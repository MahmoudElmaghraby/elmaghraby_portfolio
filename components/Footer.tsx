import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[#27272a] px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 font-mono text-[11px] tracking-[0.12em] text-zinc-500 uppercase sm:flex-row sm:justify-between">
        <p>
          {site.name} / {site.role}
        </p>
        <p>© 2026</p>
      </div>
    </footer>
  );
}