"use client";

import { useEffect, useRef } from "react";

// Sketchy orange line that follows the pointer and fades out behind it.
// Elements with data-cursor-label="…" get a big orange badge that follows
// the pointer while hovered (e.g. "View Case study" on work cards).
// Only active for fine pointers (mouse/trackpad), never on touch.
const TRAIL_MS = 700;
const ORANGE = "#f0603c";
const BADGE_R = 75;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const points: { x: number; y: number; t: number; c: string }[] = [];
    let cursor = { x: -100, y: -100 };
    let label: string | null = null;
    let badge = 0; // 0..1 scale, eased
    const displayFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-syne").trim() ||
      "sans-serif";
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
      label = el?.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ?? null;
    };
    const leave = () => {
      cursor = { x: -100, y: -100 };
      label = null;
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

      // hover badge: orange circle with the label, eased in/out
      badge += ((label ? 1 : 0) - badge) * 0.18;
      if (badge > 0.01) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = ORANGE;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, BADGE_R * badge, 0, Math.PI * 2);
        ctx.fill();
        if (label && badge > 0.6) {
          ctx.fillStyle = "#fff";
          ctx.globalAlpha = (badge - 0.6) / 0.4;
          ctx.font = `500 ${20 * badge}px ${displayFont}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const lines = label.split("\\n");
          const lh = 25 * badge;
          lines.forEach((line, i) => {
            ctx.fillText(line, cursor.x, cursor.y + (i - (lines.length - 1) / 2) * lh);
          });
        }
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
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
