import { existsSync, readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const requiredFiles = [
  "README.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  "LICENSE",
  ".github/workflows/ci.yml",
  ".github/PULL_REQUEST_TEMPLATE.md",
];
const missingFiles = requiredFiles.filter((file) => !existsSync(file));
const violations = [
  ...missingFiles.map((file) => `Missing ${file}`),
  packageJson.license !== "MIT" ? "package.json must declare MIT" : undefined,
  packageJson.repository !== "https://github.com/tomerwave/milio-raycast"
    ? "package.json repository is incorrect"
    : undefined,
].filter(Boolean);

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Repository checks passed");
