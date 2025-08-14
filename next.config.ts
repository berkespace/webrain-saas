import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Geçici olarak ESLint'i devre dışı bırak
  },
  typescript: {
    ignoreBuildErrors: true, // Geçici olarak TypeScript'i devre dışı bırak
  },
  headers: async () => {
    return [
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ]
  },
};

export default nextConfig;
