import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only honours `quality` values listed here; 75 is the default,
    // 92 is for the photo-heavy website screenshots in /web.
    qualities: [75, 92],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
