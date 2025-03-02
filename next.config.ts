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
      {
        protocol: "https",
        hostname: "my-cinesphere-bucket.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cinesphere-bucket.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
