import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  // output: "export", // Disabled to use @cloudflare/next-on-pages adapter

  // Image optimization config for static export
  images: {
    unoptimized: true,
  },


  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,

  async redirects() {
    return [
      // Blog is permanently removed — 301 passes any accumulated link equity to home
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      // Category landing pages now have real pages — no redirect needed
      // (routes removed: /valentines-games, /long-distance-games, /relationship-games, /couple-games)
    ];
  },
};

export default nextConfig;
