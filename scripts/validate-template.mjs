import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const publicDir = path.join(root, "public");
const scannedDirs = ["components", "data", "pages", "styles"];
const requiredPublicAssets = [
  "avatar.png",
  "logo-mark.png",
  "logo-mark.webp",
  "favicon.ico",
  "apple-touch-icon.png",
  "og-image.png",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
];
const imagePathPattern = /["'`]\/(?!api\/|contact\?|robots\.txt|sitemap\.xml|site\.webmanifest)([^"'`?#]+\.(?:png|jpe?g|svg|gif|webp|ico))["'`]/gi;
const absoluteUrlPattern = /https?:\/\/[^\s"'`<>]+/gi;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedChangeFrequencies = new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

const errors = [];
const warnings = [];

const readFile = (filePath) => fs.readFileSync(filePath, "utf8");

const walkFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walkFiles(fullPath);
    if (!/\.(?:js|jsx|mjs|css|md|json)$/i.test(entry.name)) return [];

    return [fullPath];
  });
};

const scanSourceFiles = () =>
  scannedDirs.flatMap((dir) => walkFiles(path.join(root, dir)));

const relative = (filePath) => path.relative(root, filePath).replace(/\\/g, "/");

const loadSiteConfig = () => {
  const siteConfigPath = path.join(root, "data", "siteConfig.js");
  const source = readFile(siteConfigPath).replace(/export const /g, "const ");
  const sandbox = {
    process: {
      env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
      },
    },
    result: null,
  };

  vm.runInNewContext(`${source}\nresult = { siteConfig, pageRoutes, pageMetaByPath, getBaseUrl };`, sandbox, {
    filename: "data/siteConfig.js",
  });

  return sandbox.result;
};

const { siteConfig, pageRoutes, pageMetaByPath, getBaseUrl } = loadSiteConfig();

const validatePublicAssets = () => {
  for (const asset of requiredPublicAssets) {
    if (!fs.existsSync(path.join(publicDir, asset))) {
      errors.push(`Missing required public asset: /${asset}`);
    }
  }

  for (const file of scanSourceFiles()) {
    const content = readFile(file);
    const matches = [...content.matchAll(imagePathPattern)];

    for (const match of matches) {
      const publicPath = match[1];
      const assetPath = path.join(publicDir, publicPath);

      if (!fs.existsSync(assetPath)) {
        errors.push(`Missing public asset: /${publicPath} referenced in ${relative(file)}`);
      }
    }
  }
};

const validateHttpUrl = (name, value) => {
  if (!value || !/^https?:\/\//i.test(value)) {
    errors.push(`siteConfig.${name} must start with http:// or https://`);
    return;
  }

  try {
    const parsed = new URL(value);

    if (!parsed.hostname.includes(".")) {
      errors.push(`siteConfig.${name} must contain a valid hostname.`);
    }
  } catch {
    errors.push(`siteConfig.${name} is not a valid URL: ${value}`);
  }
};

const validateSiteConfig = () => {
  const requiredFields = [
    "name",
    "owner",
    "role",
    "email",
    "github",
    "linkedin",
    "repository",
    "siteUrl",
    "description",
    "keywords",
  ];

  for (const field of requiredFields) {
    const value = siteConfig[field];

    if (!String(value || "").trim()) {
      errors.push(`Missing siteConfig.${field} value.`);
    }
  }

  if (siteConfig.email && !emailPattern.test(siteConfig.email)) {
    errors.push(`Invalid siteConfig.email value: ${siteConfig.email}`);
  }

  for (const field of ["siteUrl", "github", "linkedin", "repository"]) {
    validateHttpUrl(field, siteConfig[field]);
  }

  const baseUrl = getBaseUrl();

  if (baseUrl.endsWith("/")) {
    errors.push("getBaseUrl() must not return a trailing slash.");
  }
};

const validateExternalUrls = () => {
  for (const file of scanSourceFiles()) {
    const content = readFile(file);
    const urls = content.match(absoluteUrlPattern) || [];

    for (const url of urls) {
      try {
        const parsed = new URL(url.replace(/[),.;]+$/, ""));

        if (!parsed.hostname.includes(".")) {
          warnings.push(`Suspicious URL in ${relative(file)}: ${url}`);
        }
      } catch {
        errors.push(`Invalid URL in ${relative(file)}: ${url}`);
      }
    }
  }
};

const routeToPageFile = (routePath) => {
  if (routePath === "/") {
    return path.join(root, "pages", "index.jsx");
  }

  return path.join(root, "pages", routePath.replace(/^\//, ""), "index.jsx");
};

const validateRoutesAndMetadata = () => {
  const seenRoutes = new Set();

  for (const route of pageRoutes) {
    if (!route.path?.startsWith("/")) {
      errors.push(`Invalid route path in pageRoutes: ${route.path}`);
      continue;
    }

    if (seenRoutes.has(route.path)) {
      errors.push(`Duplicate route path in pageRoutes: ${route.path}`);
    }

    seenRoutes.add(route.path);

    if (!fs.existsSync(routeToPageFile(route.path))) {
      errors.push(`pageRoutes contains ${route.path}, but the matching page file does not exist.`);
    }

    if (!pageMetaByPath[route.path]) {
      errors.push(`Missing pageMetaByPath entry for ${route.path}.`);
    }

    if (!allowedChangeFrequencies.has(route.changeFrequency)) {
      errors.push(`Invalid sitemap changeFrequency for ${route.path}: ${route.changeFrequency}`);
    }

    const priority = Number(route.priority);

    if (!Number.isFinite(priority) || priority < 0 || priority > 1) {
      errors.push(`Sitemap priority for ${route.path} must be from 0.0 to 1.0.`);
    }
  }
};

const validateAboutTabIds = () => {
  const aboutFile = path.join(root, "data", "about.js");

  if (!fs.existsSync(aboutFile)) return;

  const source = readFile(aboutFile);
  const ids = [...source.matchAll(/id:\s*["'`]([^"'`]+)["'`]/g)].map((match) => match[1]);
  const seen = new Set();

  if (ids.length === 0) {
    warnings.push("No stable IDs were found in data/about.js. Add id values to keep tab ARIA links safe when editing titles.");
  }

  for (const id of ids) {
    if (!/^[a-z0-9-]+$/.test(id)) {
      errors.push(`Invalid about tab id '${id}'. Use lowercase letters, numbers, and dashes only.`);
    }

    if (seen.has(id)) {
      errors.push(`Duplicate about tab id '${id}' in data/about.js.`);
    }

    seen.add(id);
  }
};

const validateProjectData = () => {
  const projectFile = path.join(root, "data", "projects.js");

  if (!fs.existsSync(projectFile)) return;

  const source = readFile(projectFile);
  const titles = [...source.matchAll(/title:\s*["'`]([^"'`]+)["'`]/g)].map((match) => match[1]);
  const paths = [...source.matchAll(/path:\s*["'`]([^"'`]+)["'`]/g)].map((match) => match[1]);
  const seenTitles = new Set();

  for (const title of titles) {
    if (seenTitles.has(title)) {
      warnings.push(`Duplicate project title in data/projects.js: ${title}`);
    }

    seenTitles.add(title);
  }

  for (const projectPath of paths) {
    if (!projectPath.startsWith("/")) {
      errors.push(`Project image path must start with /: ${projectPath}`);
      continue;
    }

    if (!fs.existsSync(path.join(publicDir, projectPath.slice(1)))) {
      errors.push(`Project image does not exist: ${projectPath}`);
    }
  }
};

const validateContactSettings = () => {
  const envExample = path.join(root, ".env.example");

  if (!fs.existsSync(envExample)) {
    errors.push("Missing .env.example file.");
    return;
  }

  const envContent = readFile(envExample);

  for (const envName of ["NEXT_PUBLIC_SITE_URL", "CONTACT_WEBHOOK_URL", "CONTACT_WEBHOOK_TOKEN"]) {
    if (!envContent.includes(envName)) {
      warnings.push(`.env.example does not mention ${envName}.`);
    }
  }
};

const validatePackageLock = () => {
  const lockFile = path.join(root, "package-lock.json");

  if (!fs.existsSync(lockFile)) {
    errors.push("Missing package-lock.json. Use npm install to regenerate it.");
    return;
  }

  const lockContent = readFile(lockFile);

  if (/packages\.[^"\s]*|artifactory|internal\.api\.openai|applied-caas|ace-research|localhost|127\.0\.0\.1/i.test(lockContent)) {
    errors.push("package-lock.json contains a private/internal registry URL.");
  }
};

validatePublicAssets();
validateSiteConfig();
validateExternalUrls();
validateRoutesAndMetadata();
validateAboutTabIds();
validateProjectData();
validateContactSettings();
validatePackageLock();

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  console.error("Template validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Template validation passed.");
