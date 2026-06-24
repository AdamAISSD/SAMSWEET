# SAMSWEET SSD

Responsive multilingual independent site for SAMSWEET SSD and memory wholesale inquiries.

The site is built as a static GitHub Pages project. It presents PCIe SSD, 2.5 SATA SSD, M.2 NGFF SATA SSD, mSATA SSD, and DDR memory products; supports English, Arabic, French, Spanish, Portuguese, Russian, and Simplified Chinese; stores an inquiry cart in `localStorage`; and submits an encoded inquiry message to WhatsApp `+86 136 0248 9689`.

## UI Refinement

The current interface has been refined as a conversion-focused premium B2B technology storefront:

- Apple-like dark-first liquid glass visual system.
- Larger SSD hero visual with trust strip and Bento stats.
- Category Bento cards with use case, popular capacities, product count, and Explore action.
- Product section with stronger search, result count, active filter chips, spec chips, procurement quantity controls, and Added feedback.
- Four-step wholesale timeline, procurement specs matrix, modern FAQ accordion, stronger final CTA, and four-column footer.
- 390px mobile layout keeps language and cart accessible without page-level horizontal overflow.

## Live Deployment

- Repository: `https://github.com/AdamAISSD/SAMSWEET`
- GitHub Pages: `https://adamaissd.github.io/SAMSWEET/`
- Deployment: GitHub Actions workflow in `.github/workflows/deploy.yml`

## Local Commands

```bash
npm ci
npm run export:data
npm run build
npm run preview
npm run lint
```

This project has no runtime npm dependencies. The build script exports `public/data/products.json`, copies `index.html`, `src/`, and `public/` into `dist/`, then generates `robots.txt` and `sitemap.xml`.

If the local machine does not expose global Node/npm, use GitHub Actions or a local Node.js installation. The Codex desktop runtime may provide a bundled `node.exe` for static checks.

## Project Structure

```text
index.html
src/
  app.js
  styles.css
  data/products.js
  i18n/translations.js
  i18n/*.json
public/
  .nojekyll
  assets/products/
  data/products.json
  data/latest-prices.json
  data/latest-prices.schema.json
android/
  SamsweetPriceAdmin/
docs/
  implementation-plan.md
  design-standard.md
  ui-redesign-reference.xml
  price-admin-architecture.md
  android-app-design-standard.md
  source-harvest-report.md
  acceptance-report.md
  price-sync-acceptance-report.md
.github/workflows/deploy.yml
.github/workflows/android-build.yml
scripts/
  build.mjs
  export-data.mjs
  preview.mjs
  lint.mjs
```

## Product Data

Edit products in `src/data/products.js`.

Each product includes category, capacity, interface, protocol, quality grade, reference price text, local image path, source platform, placeholder status, and highlights. The active reference prices come from the user-supplied SAMSWEET price list dated June 8, 2026. Final price, stock, warranty, and shipment details must be confirmed by quotation.

`public/data/products.json` is exported from `src/data/products.js` so the website and Android app use the same product IDs.

## Latest Price Sync

Current public prices live in:

- `public/data/latest-prices.json`
- `public/data/latest-prices.schema.json`
- `public/data/products.json`

The storefront loads `./data/latest-prices.json?ts=<timestamp>` after the base product data. If the request succeeds, product cards, cart rows, and WhatsApp order text use the latest price. If it fails, the site keeps the original reference prices and shows a fallback status.

Price data is public because GitHub Pages is public. Treat prices as reference pricing only:

> Final price, stock, warranty, and shipment details are confirmed by quotation.

## Android Price Admin

Android app source path:

```text
android/SamsweetPriceAdmin/
```

App name: `SAMSWEET Price Admin`  
Package: `com.samsweet.priceadmin`

The app updates prices without a server:

```text
Android APP
-> GitHub REST Contents API
-> public/data/latest-prices.json
-> GitHub Actions
-> GitHub Pages
-> Storefront latest price fetch
```

Android build command in a machine with JDK 17, Android SDK, and Gradle:

```bash
cd android/SamsweetPriceAdmin
gradle :app:assembleDebug
```

GitHub Actions also builds a debug APK artifact through `.github/workflows/android-build.yml`.

See `docs/android-build-guide.md` for local and CI Android build details. No APK is committed to Git.

## GitHub Token Safety

The Android app never includes a token in source code, README, `BuildConfig`, `strings.xml`, logs, or CI.

Recommended fine-grained personal access token:

- Owner/repository: `AdamAISSD/SAMSWEET` only
- Contents: read/write
- Actions: read only if workflow status checks are needed
- Expiration: set a reasonable expiration date

The app supports session-only token use. If the user chooses to remember it, the token is encrypted with Android Keystore-backed AES/GCM storage. UI previews show only the first four and last four characters.

## Uploading Prices

1. Open `SAMSWEET Price Admin`.
2. Enter GitHub owner, repo, branch, product path, price path, Pages URL, and token.
3. Tap `Sync`.
4. Edit product prices, availability, and notes.
5. Preview changes.
6. Tap `Confirm and Upload`.
7. Wait for GitHub Actions Pages deployment.
8. Open `https://adamaissd.github.io/SAMSWEET/` and verify latest prices.

## Languages

Primary multilingual content lives in `src/i18n/translations.js`. JSON snapshots are also generated in `src/i18n/*.json` for handoff and review.

Arabic uses `dir="rtl"`. Technical terms such as PCIe, NVMe, SATA, NGFF, mSATA, DDR, GB, and TB remain in English for clarity.

## Inquiry Flow

1. Buyer adds products and quantities to the cart.
2. Cart persists in `localStorage`.
3. Buyer fills name, country, WhatsApp, and remark.
4. Submit generates the order text, calls `navigator.clipboard.writeText(orderText)` inside the click/submit flow, and opens:
   `https://wa.me/8613602489689?text=<URL_ENCODED_ORDER_TEXT>`
5. If clipboard access is blocked, a fallback textarea displays the full order text.

## Assets and Sources

Real local assets copied from the reference repository:

- `public/assets/products/samsweet-nvme-hero.webp`
- `public/assets/products/samsweet-nvme-hero.jpg`
- `public/assets/products/sata-detail-square.webp`
- `public/assets/products/sata-production-dark.webp`
- `public/assets/products/sata-production-dark.jpg`

Generated placeholder assets:

- `public/assets/products/pcie-ssd-placeholder.svg`
- `public/assets/products/sata-ssd-placeholder.svg`
- `public/assets/products/m2-ngff-placeholder.svg`
- `public/assets/products/msata-placeholder.svg`
- `public/assets/products/ddr-memory-placeholder.svg`

JD and Tmall product images are not hotlinked. See `docs/source-harvest-report.md` for harvest limits.

## Deployment Notes

The workflow installs with `npm ci`, builds with `npm run build`, uploads `dist/`, and deploys through GitHub Pages Actions. `.nojekyll` is included to avoid Jekyll processing static assets.

No backend, database, payment, login, customer-data storage, cookies, or secrets are included in the website. Android tokens are entered by the admin at runtime only.
