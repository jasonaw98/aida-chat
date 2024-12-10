import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  images: {
    domains: ["img.clerk.com"],
  },
};

export default nextConfig;
