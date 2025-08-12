import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // <-- Increase body size limit (you can set '20mb', '50mb', etc)
    }
  }
};

export default nextConfig;
