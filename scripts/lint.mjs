import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "src/app.js",
  "src/styles.css",
  "src/data/products.js",
  "src/i18n/translations.js",
  "docs/design-standard.md",
  "docs/source-harvest-report.md",
  "docs/acceptance-report.md",
  "README.md",
  ".github/workflows/deploy.yml",
  "public/.nojekyll"
];

let failures = 0;

async function assertFile(relativePath) {
  try {
    const content = await readFile(path.join(root, relativePath), "utf8");
    if (relativePath !== "public/.nojekyll" && !content.trim()) throw new Error("empty");
    return content;
  } catch (error) {
    console.error(`Missing or empty required file: ${relativePath}`);
    failures += 1;
    return "";
  }
}

for (const file of required) {
  await assertFile(file);
}

const index = await assertFile("index.html");
const app = await assertFile("src/app.js");
const translations = await assertFile("src/i18n/translations.js");
const products = await assertFile("src/data/products.js");

const checks = [
  [index.includes("SAMSWEET SSD | Wholesale SSD and Memory Supplier"), "SEO title missing"],
  [index.includes("application/ld+json"), "JSON-LD script missing"],
  [app.includes("navigator.clipboard.writeText(orderText)"), "Clipboard call must use orderText inside submit flow"],
  [app.includes("encodeURIComponent(orderText)"), "WhatsApp text must be encoded with encodeURIComponent"],
  [app.includes("8619064025220"), "WhatsApp phone number missing"],
  [translations.includes("ar:"), "Arabic translations missing"],
  [translations.includes("dir: \"rtl\""), "Arabic RTL metadata missing"],
  [products.includes("placeholder: true") || products.includes("sourcePlatform: \"ExistingRepo\""), "Product source/placeholder metadata missing"]
];

for (const [ok, message] of checks) {
  if (!ok) {
    console.error(message);
    failures += 1;
  }
}

const assetNames = await readdir(path.join(root, "public", "assets", "products"));
if (!assetNames.some((name) => name.endsWith(".webp") || name.endsWith(".svg"))) {
  console.error("No local product image assets found");
  failures += 1;
}

if (failures) {
  console.error(`Lint failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("Static lint checks passed.");
