"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// "Now Playing" card, built 1:1 from the Figma frame (320x220 at 892,273).
// Plays a public Spotify playlist: track list comes from /api/playlist, audio is
// Spotify's own 30-second preview for each track, cover art from Spotify oEmbed.
// prev / next / seek all work. The pixel cat beside it dances (sprite sheet)
// only while a track is playing.

type Track = { id: string; title: string; artist: string; duration: number; preview: string };

const IMG = "/playground";
const PLAYLIST_URL = "https://open.spotify.com/playlist/1IxTCaR4wT1BnnOe4Ocv8f";

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export default function MusicCorner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [covers, setCovers] = useState<Record<string, string>>({});
  const wantPlay = useRef(false); // keep playing across prev/next
  const track = tracks[i];

  // playlist (server route parses Spotify's embed page)
  useEffect(() => {
    fetch("/api/playlist")
      .then((r) => r.json())
      .then((d) => setTracks(d.tracks ?? []))
      .catch(() => {});
  }, []);

  // cover art for the current track via Spotify oEmbed (CORS-friendly)
  useEffect(() => {
    if (!track || covers[track.id]) return;
    fetch(`https://open.spotify.com/oembed?url=spotify:track:${track.id}`)
      .then((r) => r.json())
      .then((d) => setCovers((c) => ({ ...c, [track.id]: d.thumbnail_url })))
      .catch(() => {});
  }, [track, covers]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || !track) return;
    if (a.paused) {
      wantPlay.current = true;
      a.play().catch(() => {});
    } else {
      wantPlay.current = false;
      a.pause();
    }
  };
  const go = (d: number) => {
    if (!tracks.length) return;
    setI((i + d + tracks.length) % tracks.length);
    setT(0);
  };
  // when the track changes, resume if we were playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !track) return;
    a.load();
    if (wantPlay.current) a.play().catch(() => {});
  }, [track]);
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
    const ended = () => setI((n) => (tracks.length ? (n + 1) % tracks.length : n)); // auto-advance
    const err = () => setI((n) => (tracks.length ? (n + 1) % tracks.length : n)); // skip broken previews
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", ended);
    a.addEventListener("timeupdate", time);
    a.addEventListener("loadedmetadata", meta);
    a.addEventListener("error", err);
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", ended);
      a.removeEventListener("timeupdate", time);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("error", err);
    };
  }, [tracks.length]);

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src={track?.preview} preload="metadata" />

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
          {/* cover art comes from Spotify's CDN, so a plain img avoids next/image remote config */}
          {track && covers[track.id] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={covers[track.id]}
              alt={`${track.title} cover`}
              width={96}
              height={96}
              draggable={false}
              className="absolute left-[12px] top-[13px] h-[96px] w-[96px] rounded-[6px] object-cover"
            />
          ) : (
            <div className="absolute left-[12px] top-[13px] h-[96px] w-[96px] rounded-[6px] bg-[#2f2f2f]" />
          )}
          <div className="absolute left-[119px] top-[23px] w-[149px]">
            <p className="truncate text-[16px] font-bold leading-[21px]">{track?.title ?? "Loading…"}</p>
            <p className="mt-[5px] truncate text-[14px] leading-[18px] text-white/60">{track?.artist ?? ""}</p>
            <a
              href={track ? `https://open.spotify.com/track/${track.id}` : PLAYLIST_URL}
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
                <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden>
                  <path d="M1 1.5v15a1 1 0 0 0 1.5.87l12-7.5a1 1 0 0 0 0-1.74l-12-7.5A1 1 0 0 0 1 1.5z" fill="#fff" />
                </svg>
              )}
            </button>
            <button type="button" aria-label="Next" onClick={() => go(1)} className="opacity-85 hover:opacity-100">
              <Image src={`${IMG}/icon-next.svg`} alt="" width={23} height={16} className="h-[16px] w-[23px]" />
            </button>
          </div>

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
