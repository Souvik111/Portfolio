"use client";

import { useRef } from "react";

// Plays a muted looping clip only while hovered; rests on the first frame otherwise.
export default function HoverVideo({
  sources,
  className,
  label,
}: {
  /** ordered by preference; the browser picks the first it can play */
  sources: { src: string; type: string }[];
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => ref.current?.play().catch(() => {});
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <video
      ref={ref}
      aria-label={label}
      muted
      loop
      playsInline
      preload="auto"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
      className={className}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
