import { cn } from "@/lib/cn";

type BadgeProps = {
  href: string;
  className?: string;
};

const badgeClass =
  "inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/20 bg-black px-3.5 text-white transition-colors hover:border-white/40";

export function AppStoreBadge({ href, className }: BadgeProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Download on the App Store" className={cn(badgeClass, className)}>
      <AppleIcon className="size-6 shrink-0" />
      <span className="text-left leading-none">
        <span className="block text-[9px] tracking-wide text-zinc-300">Download on the</span>
        <span className="mt-1 block text-[15px] font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}

export function GooglePlayBadge({ href, className }: BadgeProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Get it on Google Play" className={cn(badgeClass, className)}>
      <PlayIcon className="size-6 shrink-0" />
      <span className="text-left leading-none">
        <span className="block text-[9px] tracking-[0.14em] text-zinc-300 uppercase">Get it on</span>
        <span className="mt-1 block text-[15px] font-semibold tracking-tight">Google Play</span>
      </span>
    </a>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8s-1.7-.8-2.9-.8c-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7 1.9-1.1 2.6-2.1c.8-1.2 1.1-2.3 1.1-2.4-.1 0-2.1-.8-2.1-3.6ZM14.7 6.6c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
      />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#34A853" d="M3.5 20.8 13.8 12 3.5 3.2v17.6Z" />
      <path fill="#4285F4" d="M3.5 3.2 13.8 12l3.2-2.6L5.4 2.4c-.7-.4-1.6 0-1.9.8Z" />
      <path fill="#FBBC04" d="M3.5 20.8c.3.8 1.2 1.2 1.9.8l11.6-6.9-3.2-2.7-10.3 8.8Z" />
      <path fill="#EA4335" d="M13.8 12 17 9.4l2.4 1.4c.8.5.8 1.6 0 2.1L17 14.6 13.8 12Z" />
    </svg>
  );
}
