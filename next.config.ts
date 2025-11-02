// next.config.js (Corrected Version)

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
  devIndicators: {
    buildActivity: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.platform.openai.com;",
              "frame-src 'self' https://cdn.platform.openai.com;",
              "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com https://*.netlify.app;",
              "img-src 'self' data: blob: https://*;
,
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;