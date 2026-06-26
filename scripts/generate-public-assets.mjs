import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const publicDir = path.join(root, "public");
const configFile = path.join(root, "data", "siteConfig.js");

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const loadSiteConfig = () => {
  const source = fs.readFileSync(configFile, "utf8").replace(/export const /g, "const ");
  const sandbox = {
    process: {
      env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
      },
    },
    result: null,
  };

  vm.runInNewContext(`${source}\nresult = { siteConfig, pageRoutes, getBaseUrl };`, sandbox, {
    filename: "data/siteConfig.js",
  });

  return sandbox.result;
};

const { siteConfig, pageRoutes, getBaseUrl } = loadSiteConfig();
const baseUrl = getBaseUrl();
const generatedDate = new Date().toISOString().slice(0, 10);

const robotsTxt = `${[
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${baseUrl}/sitemap.xml`,
].join("\n")}\n`;

const manifest = {
  name: `${siteConfig.name} Portfolio`,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#131424",
  theme_color: "#f13024",
  icons: [
    {
      src: "/favicon.ico",
      sizes: "16x16 32x32 48x48 64x64",
      type: "image/x-icon",
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      src: "/logo-mark.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/logo-mark.webp",
      sizes: "512x512",
      type: "image/webp",
    },
  ],
};

const sitemapUrls = pageRoutes
  .map((route) => {
    const cleanPath = route.path === "/" ? "" : route.path;

    return `  <url>\n    <loc>${escapeXml(`${baseUrl}${cleanPath}`)}</loc>\n    <lastmod>${generatedDate}</lastmod>\n    <changefreq>${route.changeFrequency}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`;
  })
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
fs.writeFileSync(path.join(publicDir, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);

console.log("Generated public SEO assets.");
