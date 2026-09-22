"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// "My Sketchbook" on the playground canvas. Click → a large open book over a blurred
// page; lined paper pages with the sketches, page numbers, 3D page flips.
// ← → (or the pill arrows) turn pages, Esc / ✕ closes. Read-only — nothing to write.

const COVER = "/playground/sketchbook-cover.png";

// Sheet k shows pages[2k] on its front (right side) and pages[2k+1] on its back (left side).
// Page 0 = title page (never shown alone), then one sketch per page.
const SKETCHES = [
  "/playground/isometric-art.png",
  "/playground/space-art.png",
  "/playground/couple-illustration.png",
  "/playground/13-reason-why.png",
  "/playground/little-things.png",
  "/playground/shawn-mendes.png",
  "/playground/pixel-art.png",
  "/playground/cat.png",
];

type PageData = { kind: "title" } | { kind: "sketch"; src: string } | { kind: "blank" };

export default function Sketchbook({ x, y }: { x: number; y: number }) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(1); // sheets turned; sheet 0 (cover) is always turned
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ w: 520, h: 780 });
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

  // pages: [cover-front(unused), title, sketch1, sketch2, ...]
  const pages: PageData[] = [{ kind: "blank" }, { kind: "title" }, ...SKETCHES.map((src) => ({ kind: "sketch" as const, src }))];
  if (pages.length % 2) pages.push({ kind: "blank" });
  const sheets = pages.length / 2;

  const next = useCallback(() => setFlipped((f) => Math.min(sheets - 1, f + 1)), [sheets]);
  const prev = useCallback(() => setFlipped((f) => Math.max(1, f - 1)), []);
  const close = useCallback(() => {
    setOpen(false);
    setFlipped(1);
  }, []);

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

  const { w: PW, h: PH } = size;

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
            {/* close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#e5322d] text-[16px] text-white shadow-lg transition-transform hover:scale-110"
            >
              ✕
            </button>

            {/* the book */}
            <div className="relative" onClick={(e) => e.stopPropagation()} style={{ width: PW * 2, height: PH }}>
              {/* cover/binding peeking out on both sides */}
              <div className="absolute inset-y-[-8px] inset-x-[-14px] rounded-[10px] bg-[#f0603c] shadow-[0_30px_60px_rgb(0_0_0/0.35)]" />
              <div className="absolute inset-y-[-4px] inset-x-[-6px] rounded-[8px] bg-[#fbe9e2]" />

              <div className="book absolute inset-0">
                {Array.from({ length: sheets }).map((_, k) => {
                  const turned = k < flipped;
                  return (
                    <div
                      key={k}
                      className="sheet absolute top-0"
                      style={{
                        left: PW,
                        width: PW,
                        height: PH,
                        transformOrigin: "left center",
                        transform: `rotateY(${turned ? -180 : 0}deg)`,
                        zIndex: turned ? k : sheets - k,
                      }}
                    >
                      <Page data={pages[2 * k]} n={2 * k} side="front" />
                      <Page data={pages[2 * k + 1]} n={2 * k + 1} side="back" />
                    </div>
                  );
                })}
                {/* spine */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[100] w-[28px] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" />
              </div>
            </div>

            {/* arrow pill */}
            <div
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#1c1c1c] py-3 pl-5 pr-3 text-[15px] font-medium text-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              Use arrow keys to turn pages
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={prev}
                  disabled={flipped === 1}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={flipped === sheets - 1}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 disabled:opacity-30"
                >
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

function Page({ data, n, side }: { data: PageData; n: number; side: "front" | "back" }) {
  return (
    <div
      className="page page-paper absolute inset-0 overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : undefined,
      }}
    >
      {data.kind === "title" && (
        <div className="absolute left-[10%] top-[8%]">
          <p className="font-display text-[26px] font-bold text-ink">My Sketchbook</p>
          <p className="mt-1 text-[13px] font-light text-ink/60">my hand made sketches</p>
        </div>
      )}
      {data.kind === "sketch" && (
        <div className="absolute inset-x-[10%] top-[13%] bottom-[12%]">
          <Image src={data.src} alt={`Sketch ${n}`} fill sizes="520px" className="object-contain" />
        </div>
      )}
      {n > 0 && (
        <span className="absolute bottom-[4.5%] left-0 right-0 text-center text-[11px] italic text-ink/45">{n}</span>
      )}
      {/* inner shadow towards the spine */}
      <div
        className={`pointer-events-none absolute inset-y-0 w-[60px] ${
          side === "front"
            ? "left-0 bg-gradient-to-r from-black/12 to-transparent"
            : "right-0 bg-gradient-to-l from-black/12 to-transparent"
        }`}
      />
    </div>
  );
}
