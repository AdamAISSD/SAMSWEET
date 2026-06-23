# SAMSWEET Acceptance Report

Date: 2026-06-24 Asia/Taipei

## Build and Static Checks

| Check | Result | Notes |
| --- | --- | --- |
| Local build | Pass | Ran `node scripts/build.mjs` with bundled Codex Node.js. Output: `dist/`. |
| Module syntax | Pass | Ran Node syntax checks for `src/app.js` and `src/i18n/translations.js`. |
| Static lint | Pass | Ran `node scripts/lint.mjs`; required files, order-flow code markers, i18n metadata, and local assets passed. |
| `npm install` / `npm ci` local | Not available locally | This Windows environment has bundled `node.exe` but no global `npm`/`corepack`. The GitHub Actions environment uses standard Node/npm and a committed `package-lock.json`. |
| Preview | Pass | Ran `node scripts/preview.mjs` at `http://localhost:4173/`. |

## Responsive Acceptance

Automated Chrome/Playwright checks were run against `http://localhost:4173/`.

| Viewport | Result | Notes |
| --- | --- | --- |
| 390px mobile | Pass | No horizontal scroll; sticky cart button visible; product cards usable. |
| 768px tablet | Pass | No horizontal scroll; filters and grid responsive. |
| 1440px desktop | Pass | No horizontal scroll; desktop hero/product layout usable. |
| 1920px wide desktop | Pass | No horizontal scroll; content remains constrained. |

## Order Acceptance

| Scenario | Result |
| --- | --- |
| Add 1 product | Pass |
| Add multiple products | Pass |
| Modify quantity in cart | Pass |
| Refresh page and keep cart | Pass |
| Generate WhatsApp URL | Pass |
| WhatsApp phone is `8613602489689` | Pass |
| Order text uses `encodeURIComponent(orderText)` | Pass |
| Clipboard call uses `navigator.clipboard.writeText(orderText)` inside submit flow | Pass |
| Clipboard blocked fallback textarea | Pass |
| Order text includes product name, model/spec, capacity, interface, quantity, source, page URL, customer name/country/WhatsApp/remark | Pass |
| Success message says `Order copied. WhatsApp will open with your inquiry message.` | Pass |

## Multilingual Acceptance

| Language | Result | Notes |
| --- | --- | --- |
| English default | Pass | `html lang="en" dir="ltr"`. |
| Arabic | Pass | `html lang="ar" dir="rtl"` and persisted in `localStorage`. |
| French | Pass | `html lang="fr" dir="ltr"`. |
| Spanish | Pass | `html lang="es" dir="ltr"`. |
| Portuguese | Pass | `html lang="pt" dir="ltr"`. |
| Russian | Pass | `html lang="ru" dir="ltr"`. |
| Chinese Simplified | Pass | `html lang="zh-CN" dir="ltr"`. |

## Performance and Quality Acceptance

| Check | Result | Notes |
| --- | --- | --- |
| Console errors | Pass | Automated browser run captured no console/page errors after fixes. |
| Broken images | Pass | All local image URLs fetched successfully. |
| Broken internal links | Pass | Header/product/CTA anchors point to present sections. |
| SEO meta | Pass | Title, description, canonical, Open Graph, Twitter card, robots.txt, sitemap.xml. |
| Product JSON-LD | Pass | Static Product/ItemList JSON-LD without fake offer prices. |
| Lighthouse or equivalent | Pass equivalent | Lighthouse CLI is not installed in this local runtime. Equivalent automated checks covered responsive layout, console errors, images, SEO tags, and JS order flow. |

## Source and Asset Status

Real local assets were copied from the reference repository `AdamAISSD/samsweet-ssd-homepage`.

Generated placeholder SVGs are used for product families where JD/Tmall images could not be reliably harvested without platform risk controls. JD/Tmall assets are not hotlinked.

See `docs/source-harvest-report.md` for source limitations and price conflict notes.
