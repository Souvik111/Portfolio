"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// "Now Playing" card, built 1:1 from the Figma frame (320x220 at 892,273),
// driven by an <audio> element so prev / next / seek all work.
// The pixel cat beside it dances (sprite sheet) only while a track is playing.

type Track = {
  title: string;
  artist: string;
  cover: string;
  src: string; // mp3 in public/playground/music/
  spotify: string;
};

const PLAYLIST: Track[] = [
  {
    title: "Creep",
    artist: "Radiohead",
    cover: "/playground/album-creep.png",
    src: "/playground/music/creep.mp3",
    spotify: "https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r",
  },
];

const IMG = "/playground";

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export default function MusicCorner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [missing, setMissing] = useState(false);
  const track = PLAYLIST[i];

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setMissing(true));
    else a.pause();
  };
  const go = (d: number) => {
    setI((i + d + PLAYLIST.length) % PLAYLIST.length);
    setT(0);
    setMissing(false);
    // keep playing across track changes
    setTimeout(() => audioRef.current?.play().catch(() => setMissing(true)), 0);
  };
  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * dur;
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    const time = () => setT(a.currentTime);
    const meta = () => setDur(a.duration);
    const err = () => {
      setMissing(true);
      setPlaying(false);
    };
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    a.addEventListener("timeupdate", time);
    a.addEventListener("loadedmetadata", meta);
    a.addEventListener("error", err);
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", off);
      a.removeEventListener("timeupdate", time);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("error", err);
    };
  }, [i]);

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div
        className="card-hover absolute overflow-hidden rounded-[11px] bg-[#2a2a2a] text-white"
        style={{ left: 892, top: 273, width: 320, height: 220 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative h-[37px]">
          <Image
            src={`${IMG}/icon-eq.svg`}
            alt=""
            width={10}
            height={12}
            className={`absolute left-[12px] top-[13px] h-[12px] w-[10px] ${playing ? "eq-pulse" : ""}`}
          />
          <span className="absolute left-[32px] top-[11px] text-[12px] font-bold leading-[16px]">
            Now Playing
          </span>
          <span className="absolute left-[289px] top-[18px] h-[2px] w-[16px] bg-white" aria-hidden />
        </div>

        {/* body */}
        <div className="relative h-[183px] rounded-b-[12px] bg-[#1f1f1f]">
          <Image
            src={track.cover}
            alt={`${track.title} cover`}
            width={96}
            height={96}
            className="absolute left-[12px] top-[13px] h-[96px] w-[96px] rounded-[6px] object-cover"
          />
          <div className="absolute left-[119px] top-[23px] w-[149px]">
            <p className="truncate text-[16px] font-bold leading-[21px]">{track.title}</p>
            <p className="mt-[5px] truncate text-[14px] leading-[18px] text-white/60">{track.artist}</p>
            <a
              href={track.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[10px] flex items-center gap-[6px] text-[12px] font-bold leading-[16px] hover:underline"
            >
              <Image src={`${IMG}/spotify-badge.svg`} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
              Save on Spotify
            </a>
          </div>
          <Image
            src={`${IMG}/spotify-logo.svg`}
            alt="Spotify"
            width={28}
            height={28}
            className="absolute left-[278px] top-[13px] h-[28px] w-[28px]"
          />

          {/* progress */}
          <span className="absolute left-[12px] top-[120px] text-[13px] leading-[17px] text-white/60">{fmt(t)}</span>
          <span className="absolute left-[277px] top-[120px] text-[13px] leading-[17px] text-white/60">{fmt(dur)}</span>
          <div
            className="absolute left-[48px] top-[118px] h-[20px] w-[218px] cursor-pointer"
            onPointerDown={seek}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
          >
            <div className="absolute top-[8px] h-[3.6px] w-full rounded-full bg-[#474747]" />
            <div className="absolute top-[8px] h-[3.6px] rounded-full bg-white" style={{ width: `${pct}%` }} />
          </div>

          {/* controls */}
          <div className="absolute left-[99px] top-[145px] flex h-[18px] w-[122px] items-center justify-between">
            <button type="button" aria-label="Previous" onClick={() => go(-1)} className="opacity-85 hover:opacity-100">
              <Image src={`${IMG}/icon-prev.svg`} alt="" width={23} height={16} className="h-[16px] w-[23px]" />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={toggle}
              className="flex h-[18px] w-[14px] items-center justify-center"
            >
              {playing ? (
                <Image src={`${IMG}/icon-pause.svg`} alt="" width={14} height={18} className="h-[18px] w-[14px]" />
              ) : (
                // play triangle (the Figma frame only shows the playing state)
                <span
                  aria-hidden
                  className="ml-[3px] block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white"
                />
              )}
            </button>
            <button type="button" aria-label="Next" onClick={() => go(1)} className="opacity-85 hover:opacity-100">
              <Image src={`${IMG}/icon-next.svg`} alt="" width={23} height={16} className="h-[16px] w-[23px]" />
            </button>
          </div>

          {missing && (
            <p className="absolute bottom-[4px] left-0 right-0 text-center text-[10px] text-white/50">
              Add {track.src.split("/").pop()} to public/playground/music
            </p>
          )}
        </div>
      </div>

      {/* dancing cat sprite: 48 frames, 12x4 grid, 200x257 per cell, shown at 153x197 */}
      <div
        aria-hidden
        className={`cat-dance pointer-events-none absolute ${playing ? "cat-dance-on" : ""}`}
        style={{ left: 1218, top: 310 }}
      />
    </>
  );
}
