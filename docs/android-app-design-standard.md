# SAMSWEET Price Admin Android Design Standard

Date: 2026-06-24

## Positioning

`SAMSWEET Price Admin` is a professional B2B admin tool for updating public storefront reference prices without a server.

It should feel calm, precise, and trustworthy: a mobile control panel for a serious SSD and memory supplier, not a generic webview or low-end admin template.

## Visual System

- Material 3 / Material 3 Expressive direction.
- Dark-first: black, graphite, deep navy.
- Accent colors: electric blue, cyan, violet, emerald success.
- Large rounded cards with clear hierarchy.
- High contrast typography.
- Restrained motion and no excessive neon.
- Clear status chips for synced, modified, error, and upload states.

## Screens

### First Configuration

- Shows repository defaults: `AdamAISSD/SAMSWEET`, branch `main`, price path `public/data/latest-prices.json`, product path `public/data/products.json`, Pages URL.
- GitHub token field uses password masking.
- Token preview only shows first 4 and last 4 characters.
- User can choose session-only token or encrypted local storage.
- Guidance explains fine-grained PAT scope and expiration.

### Dashboard

- Title: `SAMSWEET Price Admin`
- Subtitle: `Update GitHub Pages prices without a server`
- Bento cards: repository, branch, product count, unsynced changes, price updated, last commit.
- Main actions: Sync, Edit Prices, Preview Changes, Upload, Open GitHub Pages.

### Edit Prices

- Top search field.
- Category and capacity chips.
- Product cards show name, ID, category, capacity, interface, current price, availability, note.
- Modified cards display `Modified`.
- Invalid cards show red validation text.
- Batch actions: RMB price text, clear notes, mark available, contact for quote.
- Import: clipboard JSON, local JSON file.
- Export: copy JSON, save JSON file.

### Preview Changes

- Before / after comparison.
- Changes emphasize price text, availability, and notes.
- Upload button is prominent and only enabled after changes exist.

### Settings

- Repository fields.
- Token field.
- Remember token toggle.
- Clear token.
- Test connection.

## Error UX

Important errors appear in readable cards, not only transient toasts. Dashboard exposes Copy Error for troubleshooting. Token strings must be redacted from errors.

## Accessibility

- Large touch targets.
- Keyboard-friendly text fields.
- High contrast.
- No hidden essential text.
- Clear loading indicator during sync/upload.

## Security UX

- No hardcoded token.
- No token in `strings.xml`, `BuildConfig`, README, logs, or crash upload.
- `Authorization` request header is constructed at runtime from user input only.
- Saved tokens use Android Keystore-backed encrypted storage.
