"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Infinite dot-grid canvas: drag anywhere to pan, wheel / pinch to zoom.
// Children are laid out in fixed "world" coordinates and move only with the canvas.
// Fully zoomed out always shows the whole world.

const MAX_SCALE = 2.5;
const GRID = 22.7; // dot spacing from the Figma grid

type View = { x: number; y: number; s: number };

export default function PanZoomCanvas({
  world,
  children,
}: {
  world: { width: number; height: number };
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>({ x: 0, y: 0, s: 1 });
  const [view, setView] = useState<View>({ x: 0, y: 0, s: 1 });
  const minScaleRef = useRef(0.2);

  const apply = (v: View) => {
    viewRef.current = v;
    setView(v);
  };

  // scale at which the whole world fits inside the viewport
  const fitScale = () => {
    const el = wrapRef.current!;
    const pad = 40;
    return Math.min(
      (el.clientWidth - pad * 2) / world.width,
      (el.clientHeight - pad * 2) / world.height,
      1
    );
  };

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(minScaleRef.current, s));

  const zoomAt = (cx: number, cy: number, factor: number) => {
    const v = viewRef.current;
    const s = clampScale(v.s * factor);
    const k = s / v.s;
    apply({ s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
  };

  const fitAll = () => {
    const el = wrapRef.current!;
    const s = fitScale();
    apply({
      s,
      x: (el.clientWidth - world.width * s) / 2,
      y: (el.clientHeight - world.height * s) / 2,
    });
  };

  useEffect(() => {
    const el = wrapRef.current!;

    const init = () => {
      minScaleRef.current = fitScale();
      // start at 1:1 on wide screens, otherwise fit the width
      const s = clampScale(Math.min(1, (el.clientWidth - 32) / world.width));
      apply({ s, x: Math.max(0, (el.clientWidth - world.width * s) / 2), y: 0 });
    };
    init();

    const onResize = () => {
      minScaleRef.current = fitScale();
      apply({ ...viewRef.current, s: clampScale(viewRef.current.s) });
    };

    // --- pointer drag (mouse / touch / pen) + two-finger pinch ---
    const pointers = new Map<number, { x: number; y: number }>();
    let last: { x: number; y: number } | null = null;
    let lastDist = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      el.setPointerCapture(e.pointerId);
      last = { x: e.clientX, y: e.clientY };
      moved = false;
      el.classList.add("cursor-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pts = [...pointers.values()];
      if (pts.length === 2) {
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const cx = (pts[0].x + pts[1].x) / 2 - el.getBoundingClientRect().left;
        const cy = (pts[0].y + pts[1].y) / 2 - el.getBoundingClientRect().top;
        if (lastDist) zoomAt(cx, cy, dist / lastDist);
        lastDist = dist;
        last = null;
        return;
      }
      if (!last) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
      last = { x: e.clientX, y: e.clientY };
      const v = viewRef.current;
      apply({ ...v, x: v.x + dx, y: v.y + dy });
    };
    const onUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastDist = 0;
      last = pointers.size === 1 ? [...pointers.values()][0] : null;
      if (pointers.size === 0) el.classList.remove("cursor-grabbing");
    };
    // swallow the click that ends a drag so links underneath don't fire
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    };

    // --- wheel: zoom (ctrl/cmd or trackpad pinch), otherwise pan ---
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.01));
      } else {
        const v = viewRef.current;
        apply({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY });
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [world.width, world.height]);

  const dot = 2.8 * view.s;
  const step = GRID * view.s;

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full cursor-grab touch-none overflow-hidden select-none"
      style={{
        backgroundImage: `radial-gradient(circle, #c9c9c9 ${dot / 2}px, transparent ${dot / 2 + 0.5}px)`,
        backgroundSize: `${step}px ${step}px`,
        backgroundPosition: `${view.x}px ${view.y}px`,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: world.width,
          height: world.height,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
        }}
      >
        {children}
      </div>

      {/* zoom controls */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => {
            const el = wrapRef.current!;
            zoomAt(el.clientWidth / 2, el.clientHeight / 2, 0.8);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-surface-nav text-[20px] leading-none text-black"
        >
          −
        </button>
        <button
          type="button"
          onClick={fitAll}
          className="flex h-10 items-center justify-center rounded-full border border-black/10 bg-surface-nav px-4 text-[13px] font-medium text-black"
        >
          Fit
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => {
            const el = wrapRef.current!;
            zoomAt(el.clientWidth / 2, el.clientHeight / 2, 1.25);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-surface-nav text-[20px] leading-none text-black"
        >
          +
        </button>
      </div>
      <p className="pointer-events-none absolute bottom-6 left-5 text-[12px] text-black/50">
        Drag to move · ⌘ / ctrl + scroll or pinch to zoom
      </p>
    </div>
  );
}
