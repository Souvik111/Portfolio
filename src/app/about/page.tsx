import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Souvik Mondal",
  description:
    "Product designer who builds what he designs — from Figma through to working prototypes.",
};

const EMAIL = "souvikm725@gmail.com";
// same profiles the homepage footer links to
const TWITTER = "https://x.com/Sou__Vik";
const LINKEDIN = "https://www.linkedin.com/in/souvik-mondal-3a7a7415b/";

const outside = [
  "Making sketches (the old-fashioned kind, pencil on paper)",
  "Exploring new product ideas",
  "Running a YouTube & Instagram channel on movies and series",
  "Sharing work and thoughts on Twitter and Substack",
];

const experience = [
  ["Product Designer", "Independent", "2025 - Present"],
  ["UI/UX Designer", "Draftss", "2023 - 2025"],
];

export default function AboutPage() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[40px]">
      <Nav active="About" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Intro */}
        <section className="mt-[110px] flex flex-col gap-[40px] lg:flex-row lg:justify-between lg:gap-[46px]">
          <div className="lg:w-[704px]">
            <h1 className="font-display text-[26px] font-medium leading-[34px] text-black md:text-[28px]">
              Hi there, I&apos;m Souvik
            </h1>

            <div className="mt-[16px] flex flex-col gap-[10px] text-[18px] font-light leading-[23px] text-black/70">
              <p>
                I&apos;m a product designer who learned early that good design doesn&apos;t stop at
                Figma — it ships. I spent nearly two years at Draftss, a design agency, designing
                across dozens of client products — different industries, different problems, fast
                turnarounds. That breadth taught me to think quickly and design with intent. Now
                I&apos;m independent, building my own things, and looking for a product-based company
                where I can go deep on one.
              </p>
              <p>
                What sets me apart is that I build what I design. I use Claude Code to turn my UIs
                into real, working prototypes — no handoff, no translation loss. I&apos;m genuinely
                obsessed with the gap between &quot;designed&quot; and &quot;shipped,&quot; and
                I&apos;ve made closing it part of my workflow.
              </p>
            </div>

            <h2 className="mt-[24px] font-display text-[20px] font-medium leading-[24px] text-black">
              Outside of design, you can find me
            </h2>
            <ul className="mt-[18px] list-disc pl-[20px] text-[18px] font-light leading-[23px] text-black/70 marker:text-black/40">
              {outside.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-[24px] text-[18px] font-light leading-[23px] text-black/70 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-orange">
              You can find me on{" "}
              <a href={TWITTER} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>{" "}
              and{" "}
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>{" "}
              or reach me directly at{" "}
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {EMAIL}
              </a>
            </p>
          </div>

          <Image
            src="/about/portrait.png"
            alt="Souvik Mondal"
            width={450}
            height={498}
            priority
            className="h-auto w-full rounded-[15px] object-cover lg:w-[450px]"
          />
        </section>

        {/* Experience */}
        <section className="mt-[70px]">
          <h2 className="font-display text-[26px] font-medium leading-[34px] text-black md:text-[28px]">
            Experience
          </h2>
          <div className="mt-[24px] overflow-hidden rounded-[8px] border border-black/20 bg-white">
            {experience.map(([role, place, years], i) => (
              <div
                key={role}
                className={`grid grid-cols-1 sm:grid-cols-[400px_400px_1fr] ${
                  i > 0 ? "border-t border-black/20" : ""
                }`}
              >
                <p className="px-[28px] py-[14px] text-[18px] font-light leading-[23px] text-black/70 sm:py-[24px]">
                  {role}
                </p>
                <p className="px-[28px] pb-[14px] text-[18px] font-light leading-[23px] text-black/70 sm:border-l sm:border-black/20 sm:py-[24px]">
                  {place}
                </p>
                <p className="px-[28px] pb-[14px] text-[18px] font-light leading-[23px] text-black/70 sm:border-l sm:border-black/20 sm:py-[24px]">
                  {years}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
