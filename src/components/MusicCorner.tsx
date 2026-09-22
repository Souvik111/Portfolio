"use client";

import { useEffect, useRef, useState } from "react";
import { alphaVideoSources } from "@/lib/alphaVideo";

// "Now Playing" card (Figma chrome) wrapping a real Spotify embed, plus the
// pixel cat next to it that only dances while the track is actually playing.

const TRACK_URI = "spotify:track:70LcF31zb1H0PyJoS1Sx1r"; // Creep — Radiohead

type Controller = {
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: {
      createController: (
        el: HTMLElement,
        opts: { uri: string; width: string | number; height: string | number; theme?: string },
        cb: (c: Controller) => void
      ) => void;
    }) => void;
  }
}

export default function MusicCorner() {
  const embedRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [catSources, setCatSources] = useState<{ src: string; type: string }[]>([]);
  useEffect(() => setCatSources(alphaVideoSources("/playground/video/cat-dance")), []);

  // load the Spotify iframe API once and subscribe to playback state
  useEffect(() => {
    const host = embedRef.current;
    if (!host) return;
    const mount = document.createElement("div");
    host.appendChild(mount);

    window.onSpotifyIframeApiReady = (api) => {
      api.createController(mount, { uri: TRACK_URI, width: "100%", height: 152 }, (c) => {
        c.addListener("playback_update", (e) => setPlaying(!e.data.isPaused));
      });
    };
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      delete window.onSpotifyIframeApiReady;
      s.remove();
    };
  }, []);

  // cat dances only while music plays
  useEffect(() => {
    const v = catRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <>
      {/* player card: 320x220 at (892,273) */}
      <div
        className="card-hover absolute overflow-hidden rounded-[11px] bg-[#2a2a2a]"
        style={{ left: 892, top: 273, width: 320, height: 220 }}
      >
        <div className="flex h-[37px] items-center gap-[10px] px-[12px]">
          <span className="flex h-[12px] items-end gap-[2px]" aria-hidden>
            <i className={`w-[2px] bg-white ${playing ? "eq eq-1" : "h-[4px]"}`} />
            <i className={`w-[2px] bg-white ${playing ? "eq eq-2" : "h-[9px]"}`} />
            <i className={`w-[2px] bg-white ${playing ? "eq eq-3" : "h-[12px]"}`} />
          </span>
          <span className="text-[12px] font-bold leading-[16px] text-white">
            {playing ? "Now Playing" : "Paused"}
          </span>
          <span className="ml-auto h-[2px] w-[16px] bg-white" aria-hidden />
        </div>
        <div
          ref={embedRef}
          className="h-[182px] rounded-b-[12px] bg-[#1f1f1f] px-[1px] pt-[15px]"
        />
      </div>

      {/* dancing cat: 153x197 at (1218,310) */}
      <video
        ref={catRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="/playground/cat-dance-poster.png"
        aria-label="Pixel cat with headphones, dances while music plays"
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute"
        style={{ left: 1218, top: 310, width: 153, height: 197 }}
      >
        {catSources.map((src) => (
          <source key={src.src} {...src} />
        ))}
      </video>
    </>
  );
}
