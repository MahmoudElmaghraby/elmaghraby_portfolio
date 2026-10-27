"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#27272a] bg-[#050505]">
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-white">
          <Logo />
          <span>Mahmoud Elmaghraby <span className="text-[#10b981]">/</span> portfolio.vercel</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.16em] text-zinc-400 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden font-mono text-[11px] tracking-[0.16em] text-[#10b981] uppercase md:inline"
        >
          Contact
        </a>
        <button
          type="button"
          className="grid size-10 place-items-center text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open ? (
        <div id="mobile-nav" className="border-t border-[#27272a] bg-[#050505] px-4 py-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 font-mono text-xs tracking-[0.16em] text-zinc-200 uppercase"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
