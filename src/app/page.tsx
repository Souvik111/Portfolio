import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import HoverVideo from "@/components/HoverVideo";
import CursorTrail from "@/components/CursorTrail";

const IMG = "/home";

const work = [
  {
    href: "/work/deepr",
    image: `${IMG}/work-deepr.png`,
    title: "Deepr- Making the invisible visible",
    desc: "Reimagining how people discover the people behind their favourite music, so I designed a cross-platform music-credit discovery experience",
    tags: ["ios App", "Multi-Platform", "0-1 Product", "Concept"],
  },
  {
    href: "/work/piex",
    image: `${IMG}/work-solar.png`,
    title: "Solar Energy SaaS",
    desc: "Designed an operations dashboard and energy forecast model for an industrial solar monitoring platform.",
    tags: ["Enterprise SaaS", "Data Visualization", "Responsive", "Design Challenge"],
  },
  {
    href: "/work/8x",
    image: `${IMG}/work-8x.png`,
    title: "8x — Making outreach worth trusting",
    desc: "Reimagining how brands invite creators to campaigns, so I redesigned the one flow where a click sends a real message to a real person",
    tags: ["Desktop Web", "Redesign", "B2B SaaS", "Prototype"],
  },
];

const socials = [
  { name: "LinkedIn", icon: "icon-linkedin", href: "https://www.linkedin.com/in/souvik-mondal-3a7a7415b/" },
  { name: "GitHub", icon: "icon-github", href: "https://github.com/Souvik111" },
  { name: "Behance", icon: "icon-behance", href: "https://www.behance.net/souvikmondal6" },
  { name: "X", icon: "icon-x", href: "https://x.com/Sou__Vik" },
];

// Gmail compose in a new tab instead of mailto: (which makes the browser ask to open a mail app)
const EMAIL = "souvikm725@gmail.com";
const EMAIL_HREF = `https://mail.google.com/mail/?view=cm&to=${EMAIL}`;

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[30px]">
      <CursorTrail />
      <Nav active="Home" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Hero */}
        <section className="relative mt-[60px] md:mt-[96px] lg:min-h-[270px]">
          <p className="hello inline-block text-[20px] font-light leading-[26px] text-black/70">
            Hi, I&apos;m Souvik
            <span className="hello-wave inline-block" aria-hidden>
              👋
            </span>
          </p>
          <h1 className="headline mt-[15px] max-w-[773px] font-display text-[36px] font-medium leading-[1.2] text-black md:text-[58px] md:leading-[69.6px]">
            I design products that make people feel{" "}
            <span className="flower inline-block" aria-label="flower">
              ✿
            </span>{" "}
            not just use{" "}
            <span className="sparkle inline-block" aria-label="sparkle">
              ✦
            </span>
          </h1>
          <p className="mt-[20px] max-w-[606px] text-[18px] font-light leading-[24px] text-black/70 md:text-[20px] md:leading-[26px]">
            3 years in, I&apos;ve learned to go beyond the interface. I design,
            prototype, build, and ship ideas with AI and code.
          </p>
          {/* waves only while hovered; transparent-background video (HEVC alpha for Safari, VP9 alpha elsewhere) */}
          <HoverVideo
            base={`${IMG}/video/cat-wave`}
            poster={`${IMG}/cat-wave-poster.png`}
            label="Pixel cat waving"
            className="absolute right-[52px] top-[-17px] hidden h-[270px] w-[245px] cursor-pointer object-cover lg:block"
          />
        </section>

        {/* Work */}
        <section id="work" className="mt-[50px] grid gap-x-[20px] gap-y-[38px] md:mt-[61px] md:grid-cols-2">
          {work.map((w) => (
            <article key={w.title}>
              <Link
                href={w.href}
                className="card-hover group block overflow-hidden rounded-[20px]"
                aria-label={w.title}
                data-cursor-label="View case study"
              >
                <Image
                  src={w.image}
                  alt=""
                  width={590}
                  height={460}
                  className="aspect-[590/460] w-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
              </Link>
              <h2 className="mt-[20px] font-display text-[22px] font-medium leading-[1.2] text-black md:text-[26px] md:leading-[31.2px]">
                {w.title}
              </h2>
              <p className="mt-[10px] text-[16px] font-light leading-[20.8px] text-black">
                {w.desc}
              </p>
              <ul className="mt-[12px] flex flex-wrap items-center gap-[10px]">
                {w.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-[4px] bg-white px-[10px] py-[4px] text-[12px] font-light leading-[15.6px] text-black"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* Web work */}
        <section
          id="playground"
          className="mt-[70px] rounded-[20px] border-t border-black/20 bg-white px-[20px] pt-[36px] pb-[20px] md:mt-[100px] md:px-[30px] md:pt-[50px] md:pb-[30px]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[512px] md:pl-[20px]">
              <h2 className="font-display text-[26px] font-medium leading-[1.2] text-black md:text-[34px] md:leading-[40.8px]">
                Stuff I&apos;ve made for the web
              </h2>
              <p className="mt-[8px] text-[16px] font-light leading-[20.8px] text-black/70">
                A few websites and landing pages I&apos;ve designed for brands, products, and ideas.
              </p>
            </div>
            <Link
              href="/web"
              className="btn-pop mt-[9px] flex h-[52px] items-center rounded-full bg-orange px-[25px] text-[16px] font-medium text-white"
            >
              <span>Explore More</span>
            </Link>
          </div>
          <div className="mt-[28px] grid gap-[20px] sm:grid-cols-2 md:mt-[34px] md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Image
                key={n}
                src={`${IMG}/web-${n}.png`}
                alt={`Website design ${n}`}
                width={367}
                height={367}
                className="card-hover h-auto w-full rounded-[10px]"
              />
            ))}
          </div>
        </section>

        {/* Footer / contact */}
        <footer
          id="contact"
          data-trail="light"
          className="relative mt-[70px] overflow-hidden rounded-[20px] border-t border-black/20 bg-orange px-[20px] pt-[32px] pb-[35px] text-white md:mt-[100px] md:px-[40px] md:pt-[40px]"
        >
          <div className="flex flex-wrap justify-between gap-10">
            <div className="max-w-[512px]">
              <h2 className="font-display text-[28px] leading-[1.2] md:text-[38px] md:leading-[45.6px]">
                Let&apos;s make something worth remembering.
              </h2>
              <p className="mt-[10px] text-[16px] font-light leading-[20.8px]">
                Whether it&apos;s a product, an idea, or simply a conversation
                about design — my inbox is open.
              </p>
            </div>
            <div className="flex w-full max-w-[290px] flex-col gap-[24px]">
              <a
                href={EMAIL_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[59px] items-center justify-center rounded-[10px] bg-surface-muted text-[18px] font-medium leading-[23.4px] text-orange"
              >
                {EMAIL}
              </a>
              <ul className="flex items-center gap-[16px]">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-surface-muted"
                    >
                      <Image
                        src={`${IMG}/${s.icon}.svg`}
                        alt=""
                        width={24}
                        height={24}
                        className="h-[24px] w-[24px]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="mt-[38px] border-white/20" />
          <p className="mt-[25px] text-[16px] font-light leading-[20.8px]">
            © 2026 Souvik Mondal
          </p>
          {/* 8-frame walk cycle sprite (public/home/cat-walk-sprite.png); walks in front of the text */}
          <div aria-hidden className="cat-walk absolute bottom-[10px] left-0 z-10 cursor-pointer">
            <div className="cat-thought">
              Let me go… 🐾
              <i className="cat-thought-dot cat-thought-dot-1" />
              <i className="cat-thought-dot cat-thought-dot-2" />
            </div>
            <div className="cat-walk-frames" />
          </div>
        </footer>
      </div>
    </main>
  );
}
