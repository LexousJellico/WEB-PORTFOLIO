/** @type {import("next").NextConfig} */
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const outputFileTracingExcludes = {
  "*": [
    ".git/**",
    ".github/**",
    ".next/cache/**",
    "node_modules/@next/swc-*/**",
    "node_modules/@swc/core-*/**",
    "node_modules/@img/**",
    "node_modules/eslint/**",
    "node_modules/eslint-config-next/**",
    "node_modules/tailwindcss/**",
    "node_modules/postcss/**",
    "node_modules/autoprefixer/**",
    "node_modules/@eslint/**",
    "node_modules/@typescript-eslint/**",
    "README.md",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    "scripts/**",
  ],
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: { cpus: 1 },
  outputFileTracingRoot: __dirname,
  outputFileTracingExcludes,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
