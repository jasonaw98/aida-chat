import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [{ hostname: "https://example.com/**" }],
  },
};

export default nextConfig;
