import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // <-- Increase body size limit (you can set '20mb', '50mb', etc)
    },
  },
};

export default nextConfig;
