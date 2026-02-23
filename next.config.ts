import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid "Cannot find module eslint-config-next/core-web-vitals" on Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
