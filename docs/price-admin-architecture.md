# SAMSWEET Price Admin Architecture

Date: 2026-06-24

## Decision

SAMSWEET price updates use a zero-server architecture:

Android APP -> GitHub REST Contents API -> `public/data/latest-prices.json` -> GitHub Actions Pages build -> GitHub Pages -> storefront fetches latest price JSON.

No backend server, database, Firebase, Supabase, Cloudflare Worker, Netlify Function, Vercel Serverless, VPS, login service, or paid service is introduced.

## Why GitHub Contents API

- The website is already deployed from GitHub Pages.
- GitHub Actions already rebuilds the static site after a push to `main`.
- The price file is plain JSON, small, auditable, and versioned in Git history.
- The Android app can update exactly one file through the standard Contents API.
- GitHub handles authentication, commit history, and conflict detection.

## Data Flow

1. Admin opens `SAMSWEET Price Admin` on Android.
2. App syncs `public/data/products.json` and `public/data/latest-prices.json` from GitHub.
3. Admin edits price, price text, availability, and note.
4. App saves unsynced edits as a local draft.
5. Admin reviews the diff.
6. App GETs the current price file and sha through the Contents API.
7. App PUTs the updated JSON with commit message, content, sha, and branch.
8. GitHub records a commit on `main`.
9. GitHub Actions runs `.github/workflows/deploy.yml`.
10. GitHub Pages publishes the updated static site.
11. Website fetches `./data/latest-prices.json?ts=<timestamp>` and merges prices into product cards, cart, and WhatsApp order text.

## Price JSON Schema

Files:

- `public/data/latest-prices.json`
- `public/data/latest-prices.schema.json`
- `public/data/products.json`

Required price fields:

- `schemaVersion`
- `updatedAt`
- `currency`
- `items`
- each item: `price`, `priceText`, `available`, `note`

`price` can be a number or `null`. `priceText` is what buyers see, for example `RMB 128` or `Contact for current quote`.

## Token Risk

The Android app never ships a token.

The admin manually enters a GitHub fine-grained personal access token. Recommended scope:

- Repository: `AdamAISSD/SAMSWEET` only
- Contents: read/write
- Actions: read only if workflow status inspection is needed
- Expiration: set a short or managed expiration date

The app masks tokens in UI, does not log tokens, and only saves tokens when the user enables encrypted local storage. Saved tokens use Android Keystore-backed AES/GCM storage.

## Conflict Handling

GitHub Contents API requires the current file sha. If upload receives a 409 conflict, the app re-syncs the latest file and keeps the local draft, then asks the admin to review and confirm upload again.

## Limitations

- GitHub Pages can take a few minutes to publish after the commit.
- GitHub Pages does not allow custom cache headers, so the website requests `latest-prices.json` with a timestamp query.
- Anyone can view public price JSON because the site is public. Treat prices as public reference prices, not confidential pricing.
- Final price, stock, warranty, and shipment details are still confirmed by quotation.
