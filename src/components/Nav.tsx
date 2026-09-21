import Image from "next/image";
import Link from "next/link";

type Variant = "home" | "case-study";

const homeLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Playground", href: "/#playground" },
  { label: "About", href: "/#about" },
];

const caseStudyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

function Pill({ links, active }: { links: typeof homeLinks; active: string }) {
  return (
    <nav className="flex h-[52px] items-center rounded-full border border-black/10 bg-surface-nav px-[7px]">
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
  );
}

export default function Nav({
  active = "Home",
  variant = "case-study",
}: {
  active?: string;
  variant?: Variant;
}) {
  if (variant === "home") {
    return (
      <header className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-6 pt-[30px] xl:px-0">
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
        <Pill links={homeLinks} active={active} />
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener"
          className="justify-self-end flex h-[52px] items-center rounded-full bg-orange px-[25px] text-[16px] font-medium text-white"
        >
          Read CV
        </a>
      </header>
    );
  }

  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 pt-[30px] md:px-[150px]">
      <Link href="/" aria-label="Home">
        <Image
          src="/deepr/avatar.png"
          alt=""
          width={40}
          height={52}
          className="h-[52px] w-[40px] object-contain"
          priority
        />
      </Link>
      <Pill links={caseStudyLinks} active={active} />
    </header>
  );
}
