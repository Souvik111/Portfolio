"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// "My Sketchbook" on the playground canvas. Click → the book opens in a modal and
// pages flip in 3D. ← → (or the on-screen arrows) turn pages, Esc closes.
// Pages are read-only images; nothing is written by visitors.

const COVER = "/playground/sketchbook-cover.png";

// Sheet k shows pages[2k] on its front (right side) and pages[2k+1] on its back (left side).
// pages[0] is the cover itself, pages[1] the inside cover.
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

const PAGE_W = 320;
const PAGE_H = 420;

export default function Sketchbook({ x, y }: { x: number; y: number }) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(0); // number of sheets turned
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pages: (string | null)[] = [COVER, null, ...SKETCHES];
  if (pages.length % 2) pages.push(null);
  const sheets = pages.length / 2;

  const next = useCallback(() => setFlipped((f) => Math.min(sheets, f + 1)), [sheets]);
  const prev = useCallback(() => setFlipped((f) => Math.max(0, f - 1)), []);
  const close = useCallback(() => {
    setOpen(false);
    setFlipped(0);
  }, []);

  // open with the cover already turning
  const show = () => {
    setOpen(true);
    setTimeout(() => setFlipped(1), 350);
  };

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
        onClick={show}
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
            className="book-backdrop fixed inset-0 z-[200] flex items-center justify-center bg-black/55"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label="My sketchbook"
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {/* the book: two page widths; when closed it slides so the cover sits centred */}
              <div
                className="book relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: PAGE_W * 2,
                  height: PAGE_H,
                  transform: `translateX(${flipped === 0 ? -PAGE_W / 2 : flipped === sheets ? PAGE_W / 2 : 0}px)`,
                }}
              >
                {Array.from({ length: sheets }).map((_, k) => {
                  const turned = k < flipped;
                  return (
                    <div
                      key={k}
                      className="sheet absolute top-0"
                      style={{
                        left: PAGE_W,
                        width: PAGE_W,
                        height: PAGE_H,
                        transformOrigin: "left center",
                        transform: `rotateY(${turned ? -180 : 0}deg)`,
                        zIndex: turned ? k : sheets - k,
                      }}
                    >
                      <Page src={pages[2 * k]} side="front" cover={k === 0} />
                      <Page src={pages[2 * k + 1]} side="back" />
                    </div>
                  );
                })}
              </div>

              {/* controls */}
              <button
                type="button"
                onClick={prev}
                disabled={flipped === 0}
                aria-label="Previous page"
                className="absolute left-[-64px] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[22px] text-black shadow-lg disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                disabled={flipped === sheets}
                aria-label="Next page"
                className="absolute right-[-64px] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[22px] text-black shadow-lg disabled:opacity-30"
              >
                →
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-[-64px] top-[-64px] flex h-12 w-12 items-center justify-center rounded-full bg-white text-[20px] text-black shadow-lg"
              >
                ✕
              </button>
              <p className="absolute bottom-[-40px] left-0 right-0 text-center text-[13px] text-white/70">
                ← → to turn pages · Esc to close
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function Page({ src, side, cover }: { src: string | null; side: "front" | "back"; cover?: boolean }) {
  return (
    <div
      className={`page absolute inset-0 overflow-hidden ${
        side === "front" ? "rounded-r-[10px]" : "rounded-l-[10px]"
      } ${cover ? "" : "bg-[#fdfaf2]"}`}
      style={{
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : undefined,
      }}
    >
      {src ? (
        cover ? (
          <Image src={src} alt="" fill sizes="320px" className="object-cover" />
        ) : (
          <div className="absolute inset-[18px]">
            <Image src={src} alt="Sketch" fill sizes="320px" className="rounded-[6px] object-cover" />
          </div>
        )
      ) : (
        <div className="absolute inset-0 page-paper" />
      )}
      {/* spine shading */}
      <div
        className={`pointer-events-none absolute inset-y-0 w-[40px] ${
          side === "front" ? "left-0 bg-gradient-to-r from-black/15 to-transparent" : "right-0 bg-gradient-to-l from-black/15 to-transparent"
        }`}
      />
    </div>
  );
}
