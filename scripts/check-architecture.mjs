import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const sourceRoot = join(process.cwd(), "src");
const violations = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (entry === "utils") violations.push("src/utils is not allowed");
    if (statSync(path).isDirectory()) visit(path);
    if (!path.endsWith(".tsx")) continue;
    const source = readFileSync(path, "utf8");
    const componentCount = source.match(/export (?:default )?function [A-Z]\w*/g)?.length ?? 0;
    if (componentCount > 1) {
      violations.push(`${relative(process.cwd(), path)} exports ${componentCount} components`);
    }
  }
}

visit(sourceRoot);

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Architecture checks passed");
