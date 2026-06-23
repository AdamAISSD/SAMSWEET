import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = process.env.SITE_URL || "https://adamaissd.github.io/SAMSWEET/";

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(path.join(root, "index.html"), path.join(dist, "index.html"));
await cp(path.join(root, "src"), path.join(dist, "src"), { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/?$/, "/")}sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl.replace(/\/?$/, "/")}</loc>\n    <lastmod>2026-06-24</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;

await writeFile(path.join(dist, "robots.txt"), robots, "utf8");
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

const index = await readFile(path.join(dist, "index.html"), "utf8");
await writeFile(
  path.join(dist, "index.html"),
  index.replaceAll("__SITE_URL__", siteUrl.replace(/\/?$/, "/")),
  "utf8"
);

console.log(`Built SAMSWEET site to ${dist}`);
