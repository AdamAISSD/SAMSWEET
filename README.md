# SAMSWEET SSD

Responsive multilingual independent site for SAMSWEET SSD and memory wholesale inquiries.

The site is built as a static GitHub Pages project. It presents PCIe SSD, 2.5 SATA SSD, M.2 NGFF SATA SSD, mSATA SSD, and DDR memory products; supports English, Arabic, French, Spanish, Portuguese, Russian, and Simplified Chinese; stores an inquiry cart in `localStorage`; and submits an encoded inquiry message to WhatsApp `+86 13602489689`.

## Live Deployment

- Repository: `https://github.com/AdamAISSD/SAMSWEET`
- GitHub Pages: `https://adamaissd.github.io/SAMSWEET/`
- Deployment: GitHub Actions workflow in `.github/workflows/deploy.yml`

## Local Commands

```bash
npm ci
npm run build
npm run preview
npm run lint
```

This project has no runtime npm dependencies. The build script copies `index.html`, `src/`, and `public/` into `dist/`, then generates `robots.txt` and `sitemap.xml`.

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
docs/
  implementation-plan.md
  design-standard.md
  source-harvest-report.md
  acceptance-report.md
.github/workflows/deploy.yml
scripts/
  build.mjs
  preview.mjs
  lint.mjs
```

## Product Data

Edit products in `src/data/products.js`.

Each product includes category, capacity, interface, protocol, quality grade, reference price text, local image path, source platform, placeholder status, and highlights. The active reference prices come from the user-supplied SAMSWEET price list dated June 8, 2026. Final price, stock, warranty, and shipment details must be confirmed by quotation.

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

No backend, database, payment, login, customer-data storage, tokens, cookies, or secrets are included.
