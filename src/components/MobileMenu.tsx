"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type L = { label: string; href: string };

// Hamburger + dropdown for small screens; the desktop pill stays untouched.
export default function MobileMenu({
  links,
  active,
  cta,
}: {
  links: L[];
  active: string;
  cta?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[52px] w-[52px] flex-col items-center justify-center gap-[6px] rounded-full border border-black/10 bg-surface-nav"
      >
        <span
          className={`h-[2px] w-[20px] rounded bg-black transition-transform duration-200 ${
            open ? "translate-y-[8px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-[2px] w-[20px] rounded bg-black transition-opacity duration-200 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-[2px] w-[20px] rounded bg-black transition-transform duration-200 ${
            open ? "-translate-y-[8px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <nav className="absolute right-0 top-[64px] z-50 flex w-[220px] flex-col gap-[4px] rounded-[20px] border border-black/10 bg-surface-nav p-[8px] shadow-[0_12px_30px_rgb(0_0_0/0.12)]">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex h-[44px] items-center rounded-full px-[16px] text-[16px] font-medium text-black ${
                l.label === active ? "bg-surface-muted" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          {cta && (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="btn-pop mt-[4px] flex h-[44px] items-center justify-center rounded-full bg-orange text-[16px] font-medium text-white"
            >
              <span>{cta.label}</span>
            </a>
          )}
        </nav>
      )}
    </div>
  );
}
