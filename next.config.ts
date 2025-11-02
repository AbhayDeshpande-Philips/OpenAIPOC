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
              // 🚨 CHANGE IS HERE: ADDING 'unsafe-inline'
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.platform.openai.com;",
              
              "frame-src 'self' https://cdn.platform.openai.com;",
              "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com;",
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
