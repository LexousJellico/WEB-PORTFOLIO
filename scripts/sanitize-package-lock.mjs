import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lockFile = path.join(root, "package-lock.json");
const internalRegistryPattern = /https:\/\/[^"\s]*?(?:internal|openai|artifactory|ace-research|applied-caas)[^"\s]*?\/npm-public\//gi;
const privateHostPattern = /packages\.[^"\s]*|artifactory|internal\.api\.openai|applied-caas|ace-research/gi;

if (!fs.existsSync(lockFile)) {
  console.error("package-lock.json was not found.");
  process.exit(1);
}

const original = fs.readFileSync(lockFile, "utf8");
const sanitized = original.replace(internalRegistryPattern, "https://registry.npmjs.org/");

if (privateHostPattern.test(sanitized)) {
  console.error("package-lock.json still contains a private/internal registry reference.");
  process.exit(1);
}

if (sanitized !== original) {
  fs.writeFileSync(lockFile, sanitized);
  console.log("Sanitized package-lock.json registry URLs.");
} else {
  console.log("package-lock.json registry URLs are already clean.");
}
