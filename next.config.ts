import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: "export",

  // Image optimization config for static export
  images: {
    unoptimized: true,
  },


  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
