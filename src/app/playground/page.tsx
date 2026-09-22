import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import PanZoomCanvas from "@/components/PanZoomCanvas";
import MusicCorner from "@/components/MusicCorner";

export const metadata: Metadata = {
  title: "Playground — Souvik",
  description: "Digital artworks, AI experiments and a little music corner.",
};

const IMG = "/playground";

// Positions are Figma world coordinates (1440-wide frame).
type Art = { file: string; title: string; sub: string; x: number; y: number; big?: boolean };

const digital: Art[] = [
  { file: "isometric-art", title: "Isometric art", sub: "Made in blender", x: 48, y: 273 },
  { file: "space-art", title: "Space art", sub: "Made in blender", x: 269, y: 273, big: true },
  { file: "isometric-club", title: "Isometric club", sub: "Made in blender", x: 503, y: 273, big: true },
  { file: "couple-illustration", title: "Couple illustration", sub: "Made in illustrator", x: 48, y: 551 },
  { file: "13-reason-why", title: "13 reason why", sub: "Made in illustrator", x: 269, y: 551 },
  { file: "little-things", title: "Little things", sub: "Made in illustrator", x: 491, y: 551 },
  { file: "shawn-mendes", title: "Shawn Mendes", sub: "Made in illustrator", x: 48, y: 816, big: true },
];

const ai: Art[] = [
  { file: "pixel-art", title: "Pixel art", sub: "Made in midjourney", x: 892, y: 658 },
  { file: "supra", title: "Supra", sub: "Made in midjourney", x: 1113, y: 658, big: true },
  { file: "nature-club", title: "Nature club", sub: "Made in midjourney", x: 1347, y: 658, big: true },
  { file: "cat", title: "Cat", sub: "Made in midjourney", x: 892, y: 940 },
  { file: "sunset", title: "Sunset", sub: "Made in midjourney", x: 1113, y: 940, big: true },
  { file: "fantasy-art", title: "Fantasy art", sub: "Made in midjourney", x: 1347, y: 940, big: true },
];

function ArtCard({ a }: { a: Art }) {
  const img = a.big ? 192 : 176;
  return (
    <figure
      className="absolute rounded-[10px] bg-white p-[8px]"
      style={{ left: a.x, top: a.y, width: img + 16 }}
    >
      <Image
        src={`${IMG}/${a.file}.png`}
        alt={a.title}
        width={img}
        height={img}
        draggable={false}
        className="rounded-[8px] object-cover"
        style={{ width: img, height: a.big ? 191.4 : 175.4 }}
      />
      <figcaption className="mt-[10px]">
        <p className="font-display text-[18px] font-medium leading-[27px] text-ink">{a.title}</p>
        <p className="text-[12px] font-light leading-[18px] text-ink">{a.sub}</p>
      </figcaption>
    </figure>
  );
}

function Heading({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <h2
      className="absolute whitespace-nowrap font-display text-[32px] font-medium leading-[48px] text-ink"
      style={{ left: x, top: y }}
    >
      {children}
    </h2>
  );
}

export default function PlaygroundPage() {
  return (
    <main className="flex h-dvh flex-col bg-bg">
      <div className="relative z-10 shrink-0 pb-[20px]">
        <Nav variant="home" active="Playground" />
      </div>
      <div className="min-h-0 flex-1">
        <PanZoomCanvas world={{ width: 1600, height: 1080 }}>
          {/* Figma frame had the nav inside it; the nav lives outside the canvas here, so lift everything by 170 */}
          <div className="absolute left-0 top-[-170px]">
            <Heading x={48} y={210}>Some of my digital artworks</Heading>
            {digital.map((a) => <ArtCard key={a.file} a={a} />)}

            <Heading x={892} y={210}>Obsessed with</Heading>
            <MusicCorner />

            <Heading x={892} y={595}>Some AI generated arts</Heading>
            {ai.map((a) => <ArtCard key={a.file} a={a} />)}
          </div>
        </PanZoomCanvas>
      </div>
    </main>
  );
}
