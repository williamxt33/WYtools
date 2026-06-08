import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // already there, don't duplicate
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
