import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Geçici olarak ESLint'i devre dışı bırak
  },
  typescript: {
    ignoreBuildErrors: true, // Geçici olarak TypeScript'i devre dışı bırak
  },
  env: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  },
  // Şirket ağı için optimize edilmiş ayarlar
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Timeout ayarları
  serverRuntimeConfig: {
    // API timeout'ları
    apiTimeout: 30000, // 30 saniye
  },
  // HTTP ayarları
  httpAgentOptions: {
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 50,
    maxFreeSockets: 10,
    timeout: 30000,
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
