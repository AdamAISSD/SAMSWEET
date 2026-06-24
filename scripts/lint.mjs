import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "src/app.js",
  "src/styles.css",
  "src/data/products.js",
  "src/i18n/translations.js",
  "public/data/products.json",
  "public/data/latest-prices.json",
  "public/data/latest-prices.schema.json",
  "docs/design-standard.md",
  "docs/ui-redesign-reference.xml",
  "docs/price-admin-architecture.md",
  "docs/android-app-design-standard.md",
  "docs/android-build-guide.md",
  "docs/price-sync-acceptance-report.md",
  "docs/final-completion-report.md",
  "docs/source-harvest-report.md",
  "docs/acceptance-report.md",
  "README.md",
  ".github/workflows/deploy.yml",
  ".github/workflows/android-build.yml",
  "android/SamsweetPriceAdmin/settings.gradle.kts",
  "android/SamsweetPriceAdmin/gradle.properties",
  "android/SamsweetPriceAdmin/app/src/main/java/com/samsweet/priceadmin/MainActivity.kt",
  "android/SamsweetPriceAdmin/app/src/main/java/com/samsweet/priceadmin/PriceAdminViewModel.kt",
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
const productCatalog = await assertFile("public/data/products.json");
const latestPrices = await assertFile("public/data/latest-prices.json");
const latestPriceSchema = await assertFile("public/data/latest-prices.schema.json");

const checks = [
  [index.includes("SAMSWEET SSD | Wholesale SSD and Memory Supplier"), "SEO title missing"],
  [index.includes("application/ld+json"), "JSON-LD script missing"],
  [app.includes("navigator.clipboard.writeText(orderText)"), "Clipboard call must use orderText inside submit flow"],
  [app.includes("encodeURIComponent(orderText)"), "WhatsApp text must be encoded with encodeURIComponent"],
  [app.includes("8613602489689"), "WhatsApp phone number missing"],
  [app.includes("PRICE_DATA_URL") && app.includes("?ts=${Date.now()}"), "Latest price JSON cache-busting fetch missing"],
  [app.includes("mergeLatestPrices"), "Latest price merge logic missing"],
  [translations.includes("ar:"), "Arabic translations missing"],
  [translations.includes("dir: \"rtl\""), "Arabic RTL metadata missing"],
  [products.includes("placeholder: true") || products.includes("sourcePlatform: \"ExistingRepo\""), "Product source/placeholder metadata missing"],
  [productCatalog.includes("\"items\""), "Public product catalog missing items"],
  [latestPrices.includes("\"source\": \"android-price-admin\""), "Latest price document source missing"],
  [latestPriceSchema.includes("\"schemaVersion\""), "Latest price schema missing schemaVersion"]
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

try {
  const catalog = JSON.parse(productCatalog);
  const prices = JSON.parse(latestPrices);
  const ids = new Set(catalog.items.map((item) => item.id));
  const duplicateIds = catalog.items
    .map((item) => item.id)
    .filter((id, index, list) => list.indexOf(id) !== index);
  const unknownPriceIds = Object.keys(prices.items || {}).filter((id) => !ids.has(id));

  if (duplicateIds.length) {
    console.error(`Duplicate product ids in public/data/products.json: ${duplicateIds.join(", ")}`);
    failures += 1;
  }

  if (unknownPriceIds.length) {
    console.error(`Unknown latest price product ids: ${unknownPriceIds.join(", ")}`);
    failures += 1;
  }
} catch (error) {
  console.error(`Failed to parse public data JSON: ${error.message}`);
  failures += 1;
}

if (failures) {
  console.error(`Lint failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("Static lint checks passed.");
