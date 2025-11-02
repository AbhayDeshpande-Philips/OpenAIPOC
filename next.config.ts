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
  // 💥 ADD THIS SECTION 💥
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Allow scripts from your own host and the OpenAI platform CDN
              "script-src 'self' 'unsafe-eval' https://cdn.platform.openai.com;",
              // Allow frame/iframe content from the OpenAI platform
              "frame-src 'self' https://cdn.platform.openai.com;",
              // Allow connections (fetch/XHR) to the OpenAI API and CDN
              "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com;",
              // Default fallback for other content like images and styles
              "default-src 'self';",
            ].join(' '),
          },
        ],
      },
    ];
  },
  // 💥 END OF NEW SECTION 💥
};

export default nextConfig;
