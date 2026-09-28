"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type Art = {
  file: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  big?: boolean;
  /** original upload, shown full size when the card is opened */
  full: { w: number; h: number };
};

const IMG = "/playground";

// Cards sit in canvas coordinates; clicking one opens the original at full size.
// They stay plain divs (not buttons) so dragging the canvas still works over them —
// PanZoomCanvas swallows the click that ends a drag.
export default function ArtGallery({ items }: { items: Art[] }) {
  const [open, setOpen] = useState<Art | null>(null);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {items.map((a) => {
        const img = a.big ? 192 : 176;
        return (
          <figure
            key={a.file}
            role="button"
            tabIndex={0}
            aria-label={`Open ${a.title}`}
            onClick={() => setOpen(a)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(a);
              }
            }}
            className="card-hover absolute cursor-zoom-in rounded-[10px] bg-white p-[8px]"
            style={{ left: a.x, top: a.y, width: img + 16 }}
          >
            <Image
              src={`${IMG}/${a.file}.png`}
              alt={a.title}
              width={img}
              height={img}
              draggable={false}
              className="rounded-[8px] object-cover"
              style={{ width: img, height: a.big ? 191.4 : 175.4 }}
            />
            <figcaption className="mt-[10px]">
              <p className="font-display text-[18px] font-medium leading-[27px] text-ink">
                {a.title}
              </p>
              <p className="text-[12px] font-light leading-[18px] text-ink">{a.sub}</p>
            </figcaption>
          </figure>
        );
      })}

      {mounted &&
        open &&
        createPortal(
          <div
            className="book-backdrop fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-black/55 p-6 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label={open.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[16px] text-black shadow-lg transition-transform hover:scale-110"
            >
              ✕
            </button>
            <Image
              src={`${IMG}/full/${open.file}.png`}
              alt={open.title}
              width={open.full.w}
              height={open.full.h}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] w-auto max-w-[92vw] rounded-[10px] object-contain shadow-[0_30px_60px_rgb(0_0_0/0.4)]"
            />
            <figcaption className="text-center text-white">
              <p className="font-display text-[20px] font-medium">{open.title}</p>
              <p className="text-[14px] font-light text-white/70">{open.sub}</p>
            </figcaption>
          </div>,
          document.body
        )}
    </>
  );
}
