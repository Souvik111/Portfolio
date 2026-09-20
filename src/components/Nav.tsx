import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({ active = "Home" }: { active?: string }) {
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
    </header>
  );
}
