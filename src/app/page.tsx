import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

const IMG = "/home";

const work = [
  {
    href: "/work/deepr",
    image: `${IMG}/work-deepr.png`,
    title: "Deepr- Making the invisible visible",
    desc: "Designer on  a music credit discovery concept across ios, Netflix, YouTube TV, and 4 streaming platform integration.",
    tags: ["ios App", "Multi-Platform", "0-1 Product", "Concept"],
  },
  {
    href: "#",
    image: `${IMG}/work-solar.png`,
    title: "Solar Energy SaaS",
    desc: "Designed an operations dashboard and energy forecast model for an industrial solar monitoring platform.",
    tags: ["Enterprise SaaS", "Data Visualization", "Responsive", "Design Challenge"],
  },
];

const socials = [
  { name: "LinkedIn", icon: "icon-linkedin", href: "#" },
  { name: "GitHub", icon: "icon-github", href: "#" },
  { name: "Behance", icon: "icon-behance", href: "#" },
  { name: "X", icon: "icon-x", href: "#" },
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[30px]">
      <Nav variant="home" active="Home" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Hero */}
        <section className="relative mt-[96px] min-h-[270px]">
          <p className="hello inline-block text-[20px] font-light leading-[26px] text-black/70">
            Hi, I&apos;m Souvik
            <span className="hello-wave inline-block" aria-hidden>
              👋
            </span>
          </p>
          <h1 className="headline mt-[15px] max-w-[773px] font-display text-[58px] font-medium leading-[69.6px] text-black">
            I design products that make people feel{" "}
            <span className="flower inline-block" aria-label="flower">
              ✿
            </span>{" "}
            not just use{" "}
            <span className="sparkle inline-block" aria-label="sparkle">
              ✦
            </span>
          </h1>
          <p className="mt-[20px] max-w-[606px] text-[20px] font-light leading-[26px] text-black/70">
            3 years in, I&apos;ve learned to go beyond the interface. I design,
            prototype, build, and ship ideas with AI and code.
          </p>
          {/* TODO: swap for the waving-cat GIF/video once supplied (waves on hover) */}
          <Image
            src={`${IMG}/cat-wave.png`}
            alt="Pixel cat"
            width={480}
            height={270}
            priority
            className="cat-wave absolute right-[-66px] top-[-17px] hidden h-[270px] w-[480px] lg:block"
          />
        </section>

        {/* Work */}
        <section id="work" className="mt-[61px] grid gap-x-[20px] gap-y-[38px] md:grid-cols-2">
          {work.map((w) => (
            <article key={w.title}>
              <Link
                href={w.href}
                className="block overflow-hidden rounded-[20px]"
                aria-label={w.title}
              >
                <Image
                  src={w.image}
                  alt=""
                  width={590}
                  height={460}
                  className="h-auto w-full"
                />
              </Link>
              <h2 className="mt-[20px] font-display text-[26px] font-medium leading-[31.2px] text-black">
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
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex h-[460px] items-center justify-center rounded-[20px] bg-[#e4e4e4]"
            >
              <p className="font-display text-[38px] leading-[45.6px] text-black/30">
                Coming Soon...
              </p>
            </div>
          ))}
        </section>

        {/* Web work */}
        <section
          id="playground"
          className="mt-[100px] rounded-[20px] border-t border-black/20 bg-white px-[30px] pt-[50px] pb-[30px]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[512px] pl-[20px]">
              <h2 className="font-display text-[34px] font-medium leading-[40.8px] text-black">
                Stuff I&apos;ve made for the web
              </h2>
              <p className="mt-[8px] text-[16px] font-light leading-[20.8px] text-black/70">
                Some websites and landing pages I&apos;ve designed along the way.
              </p>
            </div>
            <a
              href="#"
              className="mt-[9px] flex h-[52px] items-center rounded-full bg-orange px-[25px] text-[16px] font-medium text-white"
            >
              Explore More
            </a>
          </div>
          <div className="mt-[34px] grid gap-[20px] md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Image
                key={n}
                src={`${IMG}/web-${n}.png`}
                alt={`Website design ${n}`}
                width={367}
                height={367}
                className="h-auto w-full rounded-[10px]"
              />
            ))}
          </div>
        </section>

        {/* Footer / contact */}
        <footer
          id="contact"
          className="relative mt-[100px] overflow-hidden rounded-[20px] border-t border-black/20 bg-orange px-[40px] pt-[40px] pb-[35px] text-white"
        >
          <div className="flex flex-wrap justify-between gap-10">
            <div className="max-w-[512px]">
              <h2 className="font-display text-[38px] leading-[45.6px]">
                Let&apos;s make something worth remembering.
              </h2>
              <p className="mt-[10px] text-[16px] font-light leading-[20.8px]">
                Whether it&apos;s a product, an idea, or simply a conversation
                about design — my inbox is open.
              </p>
            </div>
            <div className="flex w-[290px] flex-col gap-[24px]">
              <a
                href="mailto:souvikm725@gmail.com"
                className="flex h-[59px] items-center justify-center rounded-[10px] bg-surface-muted text-[18px] font-medium leading-[23.4px] text-orange"
              >
                souvikm725@gmail.com
              </a>
              <ul className="flex items-center gap-[16px]">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
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
          <div aria-hidden className="cat-walk pointer-events-none absolute bottom-[10px] left-0 z-10">
            <div className="cat-walk-frames" />
          </div>
        </footer>
      </div>
    </main>
  );
}
