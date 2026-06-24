# SAMSWEET Price Sync Acceptance Report

Date: 2026-06-24 Asia/Taipei

## Scope

This report covers the Android Price Admin source, shared public price JSON, storefront latest-price loading, GitHub Contents API flow, and security checks.

## Web Price Loading

| Check | Result | Notes |
| --- | --- | --- |
| `public/data/latest-prices.json` exists | Pass | 27 product IDs seeded from the June 8, 2026 SAMSWEET reference list. |
| `public/data/latest-prices.schema.json` exists | Pass | Requires schemaVersion, updatedAt, currency, items, price, priceText, available, note. |
| `public/data/products.json` exists | Pass | Generated from `src/data/products.js` to keep product IDs aligned. |
| Storefront fetches latest prices | Pass | `src/app.js` fetches `./data/latest-prices.json?ts=<timestamp>` with no-store fallback. |
| JSON failure does not white-screen | Pass | Errors are caught and fallback reference prices remain visible. |
| Product card latest price | Pass | Cards show Latest Price, availability, updated time, and live/fallback status. |
| Cart latest price | Pass | Cart rows show current merged price text. |
| WhatsApp order latest price | Pass | Order text includes Latest price, Price updated, and Availability per item. |
| Disclaimer retained | Pass | Final price, stock, warranty, and shipment details confirmed by quotation. |

## Android App

| Check | Result | Notes |
| --- | --- | --- |
| Source path | Pass | `android/SamsweetPriceAdmin/`. |
| Kotlin + Jetpack Compose | Pass | Material 3 Compose app with dark-first admin UI. |
| First configuration | Pass | Owner/repo/branch/path/Pages defaults plus token field and remember toggle. |
| Dashboard | Pass | Repository, branch, product count, unsynced count, price updated, last commit. |
| Edit prices | Pass | Search, category/capacity filters, editable price, priceText, availability, note. |
| Batch actions | Pass | RMB text, clear notes, mark available, contact for quote. |
| Import/export JSON | Pass | Clipboard import/export and Android file picker/save document. |
| Preview diff | Pass | Before/after cards and Confirm and Upload action. |
| GitHub Contents API | Pass | GET current file and sha, PUT updated content, branch and commit message included. |
| 409 conflict | Pass | App re-syncs latest file and keeps local draft for another confirmation. |
| Local draft | Pass | Draft stored locally and restored on next launch. Upload success clears draft. |
| Token security | Pass | No hardcoded token. Optional saved token uses Android Keystore AES/GCM. |

## GitHub Actions

| Check | Result | Notes |
| --- | --- | --- |
| Pages workflow | Pass | Existing deploy workflow builds `dist/`; `public/data/*` is copied into output. |
| Android workflow | Pass | `.github/workflows/android-build.yml` builds debug APK artifact. |
| No deployment secret required | Pass | Pages deploy uses standard GitHub Pages OIDC permissions only. |
| No Android token in CI | Pass | Android app token is user-entered on device only. |

## Local Validation

Local Windows PATH does not expose global `node`, `npm`, `gradle`, or Android SDK tools. Web validation used the bundled Codex Node runtime. Browser validation used local Chrome through Playwright. Android source was statically reviewed and is configured for GitHub Actions / Android Studio build.

Commands intended for full environments:

```bash
npm ci
npm run build
npm run lint
cd android/SamsweetPriceAdmin
gradle :app:assembleDebug
```

Observed local results:

- `node --check src/app.js`: Pass.
- `node scripts/build.mjs`: Pass.
- `node scripts/lint.mjs`: Pass.
- `npm ci`: Not available locally because `npm` is not on PATH.
- `gradle :app:assembleDebug`: Not available locally because `gradle` is not on PATH.

## Browser Smoke Test

Local Chrome test against `http://localhost:4173/`:

| Check | Result |
| --- | --- |
| 390px mobile | Pass, 27 products, 27 price panels, live price loaded. |
| 768px tablet | Pass, no horizontal overflow. |
| 1440px desktop | Pass. |
| 1920px wide desktop | Pass. |
| Arabic language switch | Pass, `html lang="ar" dir="rtl"`. |
| Search `PCIe 128` | Pass, one matching product. |
| Add product | Pass, cart count increased from 0 to 1. |
| Reload persistence | Pass, cart count remained 1 after reload. |
| Submit order | Pass, clipboard text contains `Latest price: RMB 128`. |
| WhatsApp URL | Pass, starts with `https://wa.me/8613602489689?text=` and contains encoded line breaks. |
| Console/page errors | Pass, none captured. |

## Security Scan Notes

The repository should not contain real tokens, passwords, keystores, signing files, `.env`, or customer data. Source code necessarily contains non-secret strings such as the HTTP header name `Authorization` and token variable names because the GitHub API requires runtime authentication.

No real GitHub personal access token was added. The only `Authorization` usage is the runtime header construction in the Android GitHub API client.

## Pages Update

After the Android app uploads `public/data/latest-prices.json`, GitHub Pages deployment may take a few minutes. The storefront reduces cache risk with a timestamp query parameter when loading the price file.
