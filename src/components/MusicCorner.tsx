"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// "Now Playing" card, built 1:1 from the Figma frame (320x220 at 892,273).
// Audio comes from Spotify's own (visually hidden) playlist embed, driven through
// the Spotify IFrame API — so visitors logged into Spotify hear full tracks,
// everyone else hears Spotify's 30s previews. Track names/art come from
// /api/playlist + Spotify oEmbed. The pixel cat dances only while playing.

type Track = { id: string; title: string; artist: string; duration: number; preview: string };

type Controller = {
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (seconds: number) => void;
  addListener: (
    ev: string,
    cb: (e: { data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number } }) => void
  ) => void;
};
type SpotifyApi = {
  createController: (
    el: HTMLElement,
    opts: { uri: string; width: number; height: number },
    cb: (c: Controller) => void
  ) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyApi) => void;
  }
}

// The API script only fires onSpotifyIframeApiReady once per page, so cache it
// (React strict mode mounts twice in dev).
let apiPromise: Promise<SpotifyApi> | null = null;
function loadSpotifyApi(): Promise<SpotifyApi> {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      window.onSpotifyIframeApiReady = (api) => resolve(api);
      const s = document.createElement("script");
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      document.body.appendChild(s);
    });
  }
  return apiPromise;
}

const IMG = "/playground";
const PLAYLIST_ID = "1IxTCaR4wT1BnnOe4Ocv8f";
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export default function MusicCorner() {
  const hostRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef<Controller | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0); // seconds
  const [dur, setDur] = useState(0); // seconds
  const [covers, setCovers] = useState<Record<string, string>>({});
  const lastPos = useRef(0);
  const tracksRef = useRef<Track[]>([]);
  tracksRef.current = tracks;
  const track = tracks[i];

  // playlist metadata (server route parses Spotify's embed page)
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

  // Spotify embed + IFrame API
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const mount = document.createElement("div");
    host.appendChild(mount);
    let alive = true;

    loadSpotifyApi().then((api) => {
      if (!alive) return;
      api.createController(mount, { uri: `spotify:playlist:${PLAYLIST_ID}`, width: 300, height: 380 }, (c) => {
        ctrl.current = c;
        c.addListener("playback_update", ({ data }) => {
          setPlaying(!data.isPaused);
          setT(data.position / 1000);
          setDur(data.duration / 1000);
          const list = tracksRef.current;
          // full-length playback: identify the track by its duration
          if (data.duration > 31000 && list.length) {
            const k = list.findIndex((x) => Math.abs(x.duration - data.duration) < 1500);
            if (k >= 0) setI(k);
          } else if (!data.isPaused && data.position < lastPos.current - 5000) {
            // preview mode: position jumped back → embed auto-advanced
            setI((n) => (list.length ? (n + 1) % list.length : n));
          }
          lastPos.current = data.position;
        });
      });
    });
    return () => {
      alive = false;
      ctrl.current = null;
      mount.remove();
    };
  }, []);

  const toggle = () => ctrl.current?.togglePlay();
  const go = (d: number) => {
    if (!ctrl.current) return;
    if (d > 0) ctrl.current.nextTrack();
    else ctrl.current.previousTrack();
    setI((n) => (tracks.length ? (n + d + tracks.length) % tracks.length : n));
    setT(0);
    lastPos.current = 0;
  };
  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ctrl.current || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sec = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * dur;
    ctrl.current.seek(sec);
    setT(sec);
    lastPos.current = sec * 1000;
  };

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <>
      {/* Spotify's own embed: kept inside the viewport (it lazy-loads) but invisible; the card below is the UI */}
      <div
        ref={hostRef}
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 h-[380px] w-[300px] opacity-0"
      />

      <div
        className="card-hover absolute overflow-hidden rounded-[11px] bg-[#2a2a2a] text-white"
        style={{ left: 892, top: 273, width: 320, height: 220 }}
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

      {/* dancing cat sprite: 48 frames, 12x4 grid, 257x257 per cell, shown at 197x197 */}
      <div
        aria-hidden
        className={`cat-dance pointer-events-none absolute ${playing ? "cat-dance-on" : ""}`}
        style={{ left: 1213, top: 310 }}
      />
    </>
  );
}
