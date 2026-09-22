import { NextResponse } from "next/server";

// Reads the public playlist through Spotify's embed page (no API keys needed) and
// returns a compact track list. Cached for an hour.
export const revalidate = 3600;

const PLAYLIST_ID = "1IxTCaR4wT1BnnOe4Ocv8f";

type EmbedTrack = {
  uri: string;
  title: string;
  subtitle: string;
  duration: number;
  isPlayable: boolean;
  audioPreview?: { url: string } | null;
};

export async function GET() {
  const res = await fetch(`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`, {
    headers: { "user-agent": "Mozilla/5.0" },
    next: { revalidate },
  });
  if (!res.ok) return NextResponse.json({ error: "spotify unavailable" }, { status: 502 });
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return NextResponse.json({ error: "unexpected page" }, { status: 502 });

  const entity = JSON.parse(m[1]).props.pageProps.state.data.entity;
  const tracks = (entity.trackList as EmbedTrack[])
    .filter((t) => t.isPlayable && t.audioPreview?.url)
    .map((t) => ({
      id: t.uri.split(":").pop()!,
      title: t.title,
      artist: t.subtitle.replace(/ /g, " "),
      duration: t.duration,
      preview: t.audioPreview!.url,
    }));

  return NextResponse.json({ name: entity.name as string, tracks });
}
