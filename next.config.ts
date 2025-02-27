import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
