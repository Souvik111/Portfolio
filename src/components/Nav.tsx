import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

// One nav everywhere: avatar left, centred pill, Read CV right.
const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
];

const CV = { label: "Read CV", href: "/cv.pdf" };

export default function Nav({ active = "Home" }: { active?: string }) {
  return (
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 pt-[30px] md:grid md:grid-cols-[1fr_auto_1fr] xl:px-0">
      <Link
        href="/"
        aria-label="Home"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-black/10 bg-surface-nav"
      >
        <Image
          src="/home/avatar.png"
          alt=""
          width={30}
          height={38}
          className="h-[38px] w-[30px] rounded-[100px] object-cover"
          priority
        />
      </Link>

      <nav className="hidden h-[52px] items-center rounded-full border border-black/10 bg-surface-nav px-[7px] md:flex md:justify-self-center">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={`flex h-[38px] items-center rounded-full px-[14px] text-[16px] font-medium text-black ${
              l.label === active ? "bg-surface-muted" : ""
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <a
        href={CV.href}
        target="_blank"
        rel="noopener"
        className="btn-pop hidden h-[52px] items-center rounded-full bg-orange px-[25px] text-[16px] font-medium text-white md:flex md:justify-self-end"
      >
        <span>{CV.label}</span>
      </a>

      <MobileMenu links={links} active={active} cta={CV} />
    </header>
  );
}
