# SAMSWEET Independent Site Implementation Plan

Date: 2026-06-24

## Objective

Build and deploy a responsive English-first SAMSWEET SSD and memory independent site for overseas B2B buyers. The site will present SSD and memory product lines, support multilingual browsing, persist an inquiry cart in localStorage, and submit encoded order details to WhatsApp `8613602489689`.

## Source Strategy

- Use `AdamAISSD/samsweet-ssd-homepage` as a read-only visual and product reference.
- Attempt normal access to the SAMSWEET JD and Tmall shop URLs without login bypass, CAPTCHA bypass, scraping circumvention, or hotlinking.
- Use the user-provided June 8, 2026 price list as a first-party quotation reference.
- Localize all usable SAMSWEET-owned images into `public/assets/products/`.
- Use clearly marked generated/SVG placeholder assets when source images cannot be reliably obtained.

## Technical Approach

- Build a static, GitHub Pages-friendly storefront with maintainable HTML, CSS, and JavaScript modules.
- Use `src/data/products.js` for product data and `src/i18n/translations.js` for all language strings.
- Keep all order logic client-side. No backend, database, payment, login, or customer data persistence beyond the buyer's local browser cart.
- Provide `package.json` scripts for GitHub Actions:
  - `npm run build` creates `dist/`.
  - `npm run preview` serves `dist/` locally.
  - `npm run lint` runs static quality checks.

## Parallel Workstreams

- Agent A: product data, image/source harvest, `docs/source-harvest-report.md`.
- Agent B/D: design standard and multilingual B2B copy.
- Main Agent C: storefront architecture, cart, WhatsApp order flow, responsive UI, SEO.
- Agent E: GitHub Pages workflow, README/deployment checks.

## Core Features

- Home hero with premium dark SAMSWEET positioning.
- Product categories: PCIe SSD, 2.5 SATA SSD, M.2 NGFF SSD, mSATA SSD, DDR Memory.
- Search, category filter, capacity filter.
- Product cards with quantity stepper and direct quantity input.
- Cart drawer/modal with localStorage persistence.
- Inquiry form for name, country, WhatsApp, and remark.
- Clipboard copy inside the submit click handler using `navigator.clipboard.writeText(orderText)`.
- WhatsApp redirect using `encodeURIComponent(orderText)`.
- Fallback textarea modal when clipboard or popup/open behavior is blocked.
- Language switcher for English, Arabic RTL, French, Spanish, Portuguese, Russian, and Simplified Chinese.
- SEO meta, Open Graph/Twitter card, robots.txt, sitemap.xml, and Product JSON-LD without fake prices.

## Quality Gates

- Responsive checks at 390px, 768px, 1440px, and 1920px.
- English default language and persisted language switching.
- Arabic `dir=rtl` and correct layout direction.
- Add single and multiple products to cart, modify quantities, refresh persistence.
- Submit order and verify WhatsApp phone `8613602489689`, URL encoding, and fallback copy path.
- No hotlinked JD/Tmall images.
- No secrets, cookies, tokens, customer data, or private credentials in the repo.
- `docs/design-standard.md`, `docs/source-harvest-report.md`, `docs/acceptance-report.md`, and `README.md` completed.

## Deployment Plan

- Create or update GitHub repository `AdamAISSD/SAMSWEET`.
- Push all project files and assets.
- Use GitHub Actions to build and deploy `dist/` to GitHub Pages.
- Confirm final Pages URL and last commit hash.

## Known Risks

- JD/Tmall may block full listing access or image retrieval through normal unauthenticated requests.
- Local environment may not include a global `npm`; GitHub Actions will use standard Node/npm, and local validation can use the bundled Codex Node runtime where needed.
- GitHub repo creation and Pages activation depend on existing GitHub CLI authentication.
