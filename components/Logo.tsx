import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * ME monogram: the right stem of the "M" doubles as the spine of the "E",
 * framed by a mobile device outline with Flutter-style layout guides.
 */
export function Logo({ className, title = "Mahmoud Elmaghraby" }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const metal = `logo-metal-${id}`;
  const frame = `logo-frame-${id}`;
  const glow = `logo-glow-${id}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn("size-8 shrink-0", className)}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={metal} x1="10" y1="12" x2="38" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.45" stopColor="#cffafe" />
          <stop offset="0.6" stopColor="#5eead4" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id={frame} x1="8" y1="3" x2="40" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#a5f3fc" stopOpacity="0.35" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0.9" />
        </linearGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Mobile frame */}
      <rect x="8.5" y="3.5" width="31" height="41" rx="7" stroke={`url(#${frame})`} strokeWidth="1.5" />
      <path d="M20 7.5h8" stroke={`url(#${frame})`} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 40.5h6" stroke={`url(#${frame})`} strokeWidth="1.25" strokeLinecap="round" />

      {/* Flutter layout guides */}
      <g stroke="#22d3ee" strokeOpacity="0.22" strokeWidth="0.6" strokeDasharray="1.5 1.5">
        <path d="M11 11.5h26" />
        <path d="M11 36.5h26" />
        <path d="M13 11v26" />
        <path d="M35 11v26" />
      </g>

      {/* ME monogram */}
      <g
        filter={`url(#${glow})`}
        stroke={`url(#${metal})`}
        strokeWidth="2.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M13 34V14l6 10 6-10v20" />
        <path d="M25 14h10M25 24h8M25 34h10" />
      </g>
    </svg>
  );
}