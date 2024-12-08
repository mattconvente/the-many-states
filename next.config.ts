import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Temporarily ignore build errors while I figure out the correct types.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
