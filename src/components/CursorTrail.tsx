"use client";

import { useEffect, useRef } from "react";

// Sketchy orange line that follows the pointer and fades out behind it,
// plus a blue ring / orange dot in place of the native cursor.
// Only active for fine pointers (mouse/trackpad), never on touch.
const TRAIL_MS = 700;
const ORANGE = "#f0603c";
const BLUE = "#4f7be8";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const points: { x: number; y: number; t: number }[] = [];
    let cursor = { x: -100, y: -100 };
    let hoveringLink = false;
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
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      const el = e.target as Element | null;
      hoveringLink = !!el?.closest("a, button, [role=button], video");
    };
    const leave = () => {
      cursor = { x: -100, y: -100 };
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
        ctx.strokeStyle = ORANGE;
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

      // cursor: blue ring with orange dot, ring grows over links
      ctx.globalAlpha = 1;
      const r = hoveringLink ? 14 : 9;
      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ORANGE;
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    resize();
    document.documentElement.classList.add("custom-cursor");
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
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
