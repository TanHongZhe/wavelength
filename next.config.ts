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
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/valentines-games',
        destination: '/',
        permanent: false,
      },
      {
        source: '/long-distance-games',
        destination: '/',
        permanent: false,
      },
      {
        source: '/relationship-games',
        destination: '/',
        permanent: false,
      },
      {
        source: '/couple-games',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
