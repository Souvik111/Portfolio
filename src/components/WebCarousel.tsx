"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type Site = {
  shot: string;
  name: string;
  /** omitted while the site is still being built */
  url?: string;
  tags: string[];
};

const IMG = "/web";

// One site at a time in a browser-chrome frame; arrows (or ← →) move through the set.
export default function WebCarousel({ sites }: { sites: Site[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1); // which way the new slide comes in
  const site = sites[i];

  const prev = useCallback(() => {
    setDir(-1);
    setI((n) => Math.max(0, n - 1));
  }, []);
  const next = useCallback(() => {
    setDir(1);
    setI((n) => Math.min(sites.length - 1, n + 1));
  }, [sites.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* title row */}
      <div className="mt-[52px] flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-[24px] font-medium leading-[34px] text-black md:text-[28px]">
          Web Design &amp; Development
        </h1>
        <div className="flex items-center gap-[14px]">
          <p className="text-[18px] leading-[27px] text-black/70">
            {pad(i + 1)}/{pad(sites.length)}
          </p>
          <span className="contents min-[1460px]:hidden">
          <button
            type="button"
            onClick={prev}
            disabled={i === 0}
            aria-label="Previous site"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-105 disabled:opacity-35 disabled:hover:scale-100"
          >
            <Image src={`${IMG}/icon-arrow.svg`} alt="" width={11} height={20} className="h-[16px] w-[9px] rotate-180" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={i === sites.length - 1}
            aria-label="Next site"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/20 bg-white transition-transform hover:scale-105 disabled:opacity-35 disabled:hover:scale-100"
          >
            <Image src={`${IMG}/icon-arrow.svg`} alt="" width={11} height={20} className="h-[16px] w-[9px]" />
          </button>
          </span>
        </div>
      </div>

      {/* browser frame */}
      <div className="relative mt-[25px]">
        <button
          type="button"
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous site"
          className="absolute left-[-104px] top-1/2 hidden h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-105 disabled:opacity-35 disabled:hover:scale-100 min-[1460px]:flex"
        >
          <Image src={`${IMG}/icon-arrow.svg`} alt="" width={11} height={20} className="h-[20px] w-[11px] rotate-180" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={i === sites.length - 1}
          aria-label="Next site"
          className="absolute right-[-104px] top-1/2 hidden h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white transition-transform hover:scale-105 disabled:opacity-35 disabled:hover:scale-100 min-[1460px]:flex"
        >
          <Image src={`${IMG}/icon-arrow.svg`} alt="" width={11} height={20} className="h-[20px] w-[11px]" />
        </button>
        <div className="w-full overflow-hidden rounded-[9px] border border-[#e5e5e5] bg-[#d9d9d9]">
          <div className="relative flex h-[50px] items-center border-b border-[#e7e7e7] bg-[#f5f5f5] px-[73px]">
            {/* traffic lights, Figma colours */}
            <span className="absolute left-[17px] flex items-center gap-[6px]" aria-hidden>
              <i className="block h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
              <i className="block h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
              <i className="block h-[10px] w-[10px] rounded-full bg-[#28c840]" />
            </span>
            <div className="flex h-[29px] w-full items-center justify-center rounded-[6px] border border-[#f0f0f0] bg-white px-3">
              <span key={i} className="slide-fade truncate text-[10px] font-light leading-[13px] text-black">
                {site.url ?? ""}
              </span>
            </div>
          </div>
          <div className="aspect-[831/457] w-full overflow-hidden">
            <Image
              key={site.shot}
              src={`${IMG}/${site.shot}.png`}
              alt={site.name}
              width={2400}
              height={1320}
              quality={92}
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
              className={`h-full w-full object-cover object-top ${dir > 0 ? "slide-next" : "slide-prev"}`}
            />
          </div>
        </div>

      </div>

      {/* caption row */}
      <div className="mt-[30px] flex w-full flex-wrap items-center gap-x-[22px] gap-y-3">
        <p key={`n${i}`} className="slide-fade text-[22px] leading-[33px] text-black">{site.name}</p>
        <ul key={`t${i}`} className="slide-fade flex flex-wrap items-center gap-[8px]">
          {site.tags.map((t) => (
            <li
              key={t}
              className="rounded-[8px] bg-white px-[10px] py-[4px] text-[12px] font-light uppercase leading-[18px] text-black"
            >
              {t}
            </li>
          ))}
        </ul>
        {site.url ? (
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pop ml-auto flex h-[37px] items-center rounded-full bg-orange px-[25px] text-[16px] font-medium text-white"
          >
            <span>Visit Website</span>
          </a>
        ) : null}
      </div>

      <p className="mt-[16px] text-center text-[13px] text-black/40 lg:hidden">
        <Link href="/#playground" className="underline">
          Back to home
        </Link>
      </p>
    </>
  );
}
