"use client";

import { useEffect, useRef, useState } from "react";
import { alphaVideoSources } from "@/lib/alphaVideo";

// Plays a muted looping clip only while hovered; rests on the first frame otherwise.
export default function HoverVideo({
  base,
  poster,
  className,
  label,
}: {
  /** path without extension; .webm / .mov alpha variants are picked per browser */
  base: string;
  poster?: string;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<{ src: string; type: string }[]>([]);
  useEffect(() => setSources(alphaVideoSources(base)), [base]);

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
      poster={poster}
      className={className}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
