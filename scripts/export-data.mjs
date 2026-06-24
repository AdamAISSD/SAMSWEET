import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { capacities, categories, priceListDate, products } from "../src/data/products.js";

const root = process.cwd();
const dataDir = path.join(root, "public", "data");
const productJsonPath = path.join(dataDir, "products.json");
const priceJsonPath = path.join(dataDir, "latest-prices.json");
const seedPrices = process.argv.includes("--seed-prices");
const generatedAt = "2026-06-24T00:00:00.000Z";

await mkdir(dataDir, { recursive: true });

const productCatalog = {
  schemaVersion: 1,
  updatedAt: generatedAt,
  source: "src/data/products.js",
  priceListDate,
  categories,
  capacities,
  items: products
};

await writeFile(productJsonPath, `${JSON.stringify(productCatalog, null, 2)}\n`, "utf8");

if (seedPrices) {
  let exists = true;
  try {
    await access(priceJsonPath);
  } catch {
    exists = false;
  }

  if (!exists) {
    const items = Object.fromEntries(
      products.map((product) => {
        const price = Number(product.priceText?.match(/RMB\s+(\d+(?:\.\d+)?)/i)?.[1] || NaN);
        const priceValue = Number.isFinite(price) ? price : null;
        return [
          product.id,
          {
            price: priceValue,
            priceText: priceValue === null ? "Contact for current quote" : `RMB ${priceValue}`,
            available: true,
            note: "Final price confirmed by quotation"
          }
        ];
      })
    );

    const priceDocument = {
      schemaVersion: 1,
      updatedAt: generatedAt,
      updatedBy: "SAMSWEET Price Admin",
      currency: "RMB",
      displayCurrency: "RMB",
      source: "android-price-admin",
      items
    };

    await writeFile(priceJsonPath, `${JSON.stringify(priceDocument, null, 2)}\n`, "utf8");
  }
}

console.log(`Exported ${products.length} products to ${path.relative(root, productJsonPath)}`);
