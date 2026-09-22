"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PageFlip } from "page-flip";

// "My Sketchbook" on the playground canvas. Click → a large open book over a blurred
// page with real page-curl turns (page-flip). ← → keys, the pill arrows, or dragging a
// page corner turn pages; Esc / ✕ closes. Read-only — visitors can't write in it.

const COVER = "/playground/sketchbook-cover.png";

// Hand-made sketches, in order. Drop files in public/playground/sketches and list them here.
// `pencil` = light graphite work that needs extra contrast on the white page.
const SKETCHES: { src: string; pencil?: boolean }[] = [
  { src: "/playground/sketches/01.png" },
  { src: "/playground/sketches/02.png", pencil: true },
  { src: "/playground/sketches/03.png" },
  { src: "/playground/sketches/04.png" },
  { src: "/playground/sketches/05.png" },
];

export default function Sketchbook({ x, y }: { x: number; y: number }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ w: 520, h: 780 });
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  useEffect(() => setMounted(true), []);

  // page size follows the viewport (two pages side by side)
  useEffect(() => {
    const fit = () => {
      const h = Math.min(780, window.innerHeight * 0.78);
      const w = Math.min(520, (window.innerWidth - 160) / 2, h * 0.68);
      setSize({ w: Math.round(w), h: Math.round(Math.min(h, w / 0.68)) });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // pages: title, sketches…, padded to an even count
  const pages: ({ kind: "title" } | { kind: "sketch"; src: string; pencil?: boolean } | { kind: "blank" })[] = [
    { kind: "title" },
    ...SKETCHES.map((sk) => ({ kind: "sketch" as const, ...sk })),
  ];
  if (pages.length % 2) pages.push({ kind: "blank" });

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => flipRef.current?.flipNext(), []);
  const prev = useCallback(() => flipRef.current?.flipPrev(), []);

  // mount the page-flip engine on the rendered pages
  useEffect(() => {
    if (!open || !bookRef.current) return;
    const pf = new PageFlip(bookRef.current, {
      width: size.w,
      height: size.h,
      size: "fixed",
      showCover: false,
      usePortrait: false,
      drawShadow: true,
      maxShadowOpacity: 0.45,
      flippingTime: 900,
      mobileScrollSupport: false,
      showPageCorners: true,
    });
    pf.loadFromHTML(bookRef.current.querySelectorAll<HTMLElement>(".pf-page"));
    flipRef.current = pf;
    return () => {
      pf.destroy();
      flipRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, size.w, size.h]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, close]);

  return (
    <>
      {/* notebook on the canvas: 222x278 at Figma (179,1297) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open my sketchbook"
        className="sketchbook-cover absolute block cursor-pointer"
        style={{ left: x, top: y, width: 222, height: 278 }}
      >
        <Image src={COVER} alt="" width={222} height={278} draggable={false} className="h-[278px] w-[222px]" />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="book-backdrop fixed inset-0 z-[200] flex items-center justify-center bg-black/25 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label="My sketchbook"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#e5322d] text-[16px] text-white shadow-lg transition-transform hover:scale-110"
            >
              ✕
            </button>

            <div className="relative" onClick={(e) => e.stopPropagation()} style={{ width: size.w * 2, height: size.h }}>
              {/* cover/binding peeking out on both sides */}
              <div className="absolute inset-y-[-8px] inset-x-[-14px] rounded-[10px] bg-[#f0603c] shadow-[0_30px_60px_rgb(0_0_0/0.35)]" />
              <div className="absolute inset-y-[-4px] inset-x-[-6px] rounded-[8px] bg-[#fbe9e2]" />

              <div ref={bookRef} className="absolute inset-0">
                {pages.map((p, n) => (
                  <div key={n} className="pf-page relative overflow-hidden bg-white" style={{ width: size.w, height: size.h }}>
                    {p.kind === "title" && (
                      <div className="absolute left-[10%] right-[10%] top-[8%] text-center font-sans">
                        <p className="font-display text-[26px] font-bold text-ink">My Sketchbook</p>
                        <p className="mt-1 text-[13px] font-light text-ink/60">my hand made sketches</p>
                        <p className="mt-8 text-[15px] leading-[1.7] text-ink/80">
                          Before Figma, there was a pencil. This is where my ideas still start —
                          quick portraits, odd little characters, and whatever my hand wanders into
                          when I&apos;m not designing screens. Drawn on paper, scanned as they are:
                          the smudges, the wobbly lines, all of it.
                        </p>
                        <p className="mt-6 text-[15px] leading-[1.7] text-ink/80">
                          Turn the page → and have a look.
                        </p>
                      </div>
                    )}
                    {p.kind === "sketch" && (
                      <div className={`sketch-on-paper absolute inset-x-[6%] top-[5%] bottom-[8%] ${p.pencil ? "sketch-pencil" : ""}`}>
                        <Image src={p.src} alt={`Sketch ${n}`} fill sizes="520px" draggable={false} className="object-contain" />
                      </div>
                    )}
                    <span className="absolute bottom-[3.5%] left-0 right-0 text-center text-[11px] italic text-ink/45">{n + 1}</span>
                    {/* inner shadow towards the spine */}
                    <div
                      className={`pointer-events-none absolute inset-y-0 w-[60px] ${
                        n % 2 === 0
                          ? "right-0 bg-gradient-to-l from-black/10 to-transparent"
                          : "left-0 bg-gradient-to-r from-black/10 to-transparent"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#1c1c1c] py-3 pl-5 pr-3 text-[15px] font-medium text-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              Use arrow keys to turn pages
              <span className="flex gap-1">
                <button type="button" onClick={prev} aria-label="Previous page" className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
                  ←
                </button>
                <button type="button" onClick={next} aria-label="Next page" className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
                  →
                </button>
              </span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
