"use client";

import { useEffect, useRef, useState } from "react";

// Sketchy orange line that follows the pointer and fades out behind it.
// Elements with data-cursor-label="…" get the orange star badge from the design,
// which follows the pointer while hovered (e.g. "View case study" on work cards).
// Only active for fine pointers (mouse/trackpad), never on touch.
const TRAIL_MS = 700;
const ORANGE = "#f0603c";
const BADGE = 150; // the star is 243 in the design, shown a little smaller here

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const points: { x: number; y: number; t: number; c: string }[] = [];
    let cursor = { x: -100, y: -100 };
    let hovered: string | null = null;
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e: PointerEvent) => {
      cursor = { x: e.clientX, y: e.clientY };
      const el = e.target as Element | null;
      // white trail over dark/orange surfaces so it stays visible
      const c = el?.closest('[data-trail="light"]') ? "#fff" : ORANGE;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now(), c });

      const next = el?.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ?? null;
      if (next !== hovered) {
        hovered = next;
        setLabel(next);
      }
      const root = document.documentElement.style;
      root.setProperty("--cursor-x", `${e.clientX}px`);
      root.setProperty("--cursor-y", `${e.clientY}px`);
    };
    const leave = () => {
      cursor = { x: -100, y: -100 };
      hovered = null;
      setLabel(null);
    };

    const draw = () => {
      const now = performance.now();
      while (points.length && now - points[0].t > TRAIL_MS) points.shift();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // trail: one segment per pair of points, thinner + more transparent with age
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const life = 1 - (now - b.t) / TRAIL_MS; // 1 = fresh, 0 = gone
        ctx.strokeStyle = b.c;
        ctx.globalAlpha = Math.max(life, 0) * 0.9;
        ctx.lineWidth = 0.6 + life * 2.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        // mid-point quadratic gives the hand-drawn smoothness
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.quadraticCurveTo(a.x, a.y, mx, my);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100]"
      />
      <div
        aria-hidden
        className={`cursor-badge pointer-events-none fixed left-0 top-0 z-[101] grid place-items-center ${
          label ? "cursor-badge-on" : ""
        }`}
        style={{ width: BADGE, height: BADGE }}
      >
        <span
          className="absolute inset-0 bg-[url('/home/badge-star.svg')] bg-contain bg-center bg-no-repeat"
        />
        <span className="relative max-w-[62%] text-center text-[14px] leading-[18px] text-white">
          {label}
        </span>
      </div>
    </>
  );
}
