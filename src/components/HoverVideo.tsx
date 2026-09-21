"use client";

import { useEffect, useRef } from "react";

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

  // Never autoplay: rest on the first frame until the pointer is over it.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const rest = () => {
      if (!v.matches(":hover")) {
        v.pause();
        v.currentTime = 0;
      }
    };
    v.addEventListener("loadeddata", rest);
    return () => v.removeEventListener("loadeddata", rest);
  }, []);

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
      onPointerEnter={play}
      onPointerLeave={stop}
      onContextMenu={(e) => e.preventDefault()}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      className={className}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
