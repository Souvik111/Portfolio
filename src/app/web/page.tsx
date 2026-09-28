import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WebCarousel, { type Site } from "@/components/WebCarousel";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Web Design & Development — Souvik",
  description: "Websites and landing pages designed for brands, products, and ideas.",
};

const sites: Site[] = [
  { shot: "shot-01", name: "Missscarlett", url: "https://www.missscarlett.com.au/", tags: ["Web design", "Development"] },
  { shot: "shot-02", name: "Swoodle", url: "https://swoodle.com.au/", tags: ["Web design", "Development"] },
  { shot: "shot-03", name: "Belvia Construction", url: "https://belviaconstruction.com/", tags: ["Web design", "Development"] },
  { shot: "shot-04", name: "Design Neko", url: "https://designneko.com/", tags: ["Web design", "Development"] },
  { shot: "shot-05", name: "Fidus Insurance Brokers", url: "https://www.fidusinsurancebrokers.co.uk/", tags: ["Web design", "Development"] },
  { shot: "shot-06", name: "Better Than Reality", url: "https://betterthanreality.com.au/", tags: ["Web design", "Development"] },
  { shot: "shot-07", name: "zkLink", url: "https://zk.link/", tags: ["Web design", "Development"] },
  { shot: "shot-08", name: "Four Beans & Co. Cafe", url: "https://grindbeans.com.au/", tags: ["Web design", "Development"] },
  { shot: "shot-09", name: "Activ Therapy", url: "https://activtherapy.com.au/", tags: ["Web design", "Development"] },
  { shot: "shot-10", name: "Brolo", tags: ["Web design"] },
  { shot: "shot-11", name: "Landing page", tags: ["Web design"] },
  { shot: "shot-12", name: "Landing page", tags: ["Web design"] },
  { shot: "shot-13", name: "Fashion store", tags: ["Web design"] },
];

export default function WebPage() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[40px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        <Link
          href="/#playground"
          className="mt-[60px] inline-flex h-[52px] items-center gap-[12px] rounded-full border border-black/10 bg-surface-nav px-[23px] text-[18px] leading-[27px] text-black transition-transform hover:-translate-x-1"
        >
          <Image src="/web/icon-back.svg" alt="" width={18} height={15} className="h-[15px] w-[18px]" />
          Back
        </Link>

        <WebCarousel sites={sites} />

        <SiteFooter />
      </div>
    </main>
  );
}
