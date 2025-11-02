// next.config.js (Corrected Version)

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
              // 1. Must be listed first or separated by semicolons
              "default-src 'self';",
              
              // 2. ADD style-src BACK to allow React/Next.js inline styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              
              // 3. Script sources (includes 'unsafe-inline' for now)
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.platform.openai.com;",
              
              // 4. Frames (OpenAI component)
              "frame-src 'self' https://cdn.platform.openai.com;",
              
              // 5. API connections (OpenAI APIs & Netlify Functions)
              "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com https://spiffy-bubblegum-0a46fa.netlify.app/.netlify/functions/;",
              
              // 6. Image sources (required for data: and blob: image URLs)
              "img-src 'self' data: blob: https://*; ",

            ].join('; '), // 🚨 CRITICAL CHANGE: JOIN WITH SEMICOLON AND SPACE
          },
        ],
      },
    ];
  },
};

export default nextConfig;