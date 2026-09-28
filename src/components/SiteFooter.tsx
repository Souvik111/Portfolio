import Image from "next/image";

// Shared footer for the case study pages.
export default function SiteFooter() {
  return (
    <footer className="mt-[60px] border-t border-black/20 pt-[26px]">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[16px] font-light leading-[21px] text-black/70">
        <p>© 2026 Souvik Mondal</p>
        <p className="flex items-center gap-[8px]">
          website build with love in
          <Image
            src="/claude-pixel.png"
            alt="Claude"
            width={34}
            height={21}
            className="h-[21px] w-[34px] object-contain [image-rendering:pixelated]"
          />
        </p>
      </div>
    </footer>
  );
}
