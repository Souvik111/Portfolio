import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import PanZoomCanvas from "@/components/PanZoomCanvas";
import MusicCorner from "@/components/MusicCorner";
import Sketchbook from "@/components/Sketchbook";
import ArtGallery, { type Art } from "@/components/ArtGallery";

export const metadata: Metadata = {
  title: "Playground — Souvik",
  description: "Digital artworks, AI experiments and a little music corner.",
};

const IMG = "/playground";

// Positions are Figma world coordinates (1440-wide frame).
const digital: Art[] = [
  { file: "isometric-art", title: "Isometric art", sub: "Made in blender", x: 48, y: 273, full: { w: 630, h: 470 } },
  { file: "space-art", title: "Space art", sub: "Made in blender", x: 269, y: 273, big: true, full: { w: 627, h: 625 } },
  { file: "isometric-club", title: "Isometric club", sub: "Made in blender", x: 503, y: 273, big: true, full: { w: 627, h: 470 } },
  { file: "couple-illustration", title: "Couple illustration", sub: "Made in illustrator", x: 48, y: 551, full: { w: 632, h: 630 } },
  { file: "13-reason-why", title: "13 reason why", sub: "Made in illustrator", x: 269, y: 551, full: { w: 627, h: 627 } },
  { file: "little-things", title: "Little things", sub: "Made in illustrator", x: 491, y: 551, full: { w: 631, h: 492 } },
  { file: "shawn-mendes", title: "Shawn Mendes", sub: "Made in illustrator", x: 48, y: 816, big: true, full: { w: 503, h: 631 } },
];

// Sticky-note intro (Figma 23:644): note + tape SVG over its shadow, text tilted 2.69° like the note.
function StickyNote({ x, y, scale = 0.55 }: { x: number; y: number; scale?: number }) {
  return (
    <div
      className="absolute origin-top-left"
      style={{ left: x, top: y, width: 731, height: 778, transform: `scale(${scale})` }}
    >
      <Image src={`${IMG}/note-shadow.svg`} alt="" width={731} height={735} draggable={false} className="absolute left-0 top-[43px] h-[735px] w-[731px]" />
      <Image src={`${IMG}/note.svg`} alt="" width={731} height={778} draggable={false} className="absolute left-0 top-0 h-[778px] w-[731px]" />
      <div
        className="absolute left-[92px] top-[118px] w-[542px] origin-top-left rotate-[2.69deg] font-display text-[28px] font-medium leading-[1.5] text-black"
      >
        <p>Welcome to Playground</p>
        <p className="mt-[38px]">
          Things I made when I probably should&apos;ve been working.&nbsp; Experiments, sketches,
          prototypes, rabbit holes, and whatever else caught my curiosity.
        </p>
        <p className="mt-[38px]">Drag around and enjoy :)</p>
        <p className="mt-[150px] pl-[400px]">-Souvik</p>
      </div>
    </div>
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
    <main className="relative h-dvh bg-bg">
      {/* nav floats over the canvas so the dot grid runs edge to edge; gaps between items stay draggable */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_nav]:pointer-events-auto">
        <Nav active="Playground" />
      </div>
      <div className="h-full">
        <PanZoomCanvas world={{ width: 2060, height: 1620 }}>
          {/* Figma frame coordinates, lifted slightly so the first row sits just under the floating nav */}
          <div className="absolute left-0 top-[-60px]">
            <Heading x={48} y={210}>Some of my digital artworks</Heading>
            <ArtGallery items={digital} />

            <Heading x={892} y={210}>Obsessed with</Heading>
            <MusicCorner />

            <StickyNote x={1638} y={235} scale={0.494} />

            <Sketchbook x={179} y={1297} />
          </div>
        </PanZoomCanvas>
      </div>
    </main>
  );
}
