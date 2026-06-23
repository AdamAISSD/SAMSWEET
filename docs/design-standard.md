# SAMSWEET Design Standard

Date: 2026-06-24

## 0. Redesign Reference

The UI refinement pass follows `docs/ui-redesign-reference.xml`. The XML reference translates the product manager, senior UI designer, and frontend engineering requirements into module-level acceptance criteria for header, hero, product categories, product grid, trust modules, order flow, FAQ, final CTA, footer, mobile behavior, accessibility, and technical constraints.

## 1. Brand Positioning

SAMSWEET is a professional SSD and memory supplier for global buyers.

The core feeling is fast, stable, reliable, wholesale-ready, and factory-backed. The site is designed for PC builders, repair shops, distributors, export buyers, and channel partners who need clear SSD / memory product lines, practical quotation contact, and a trustworthy path to bulk inquiry.

Claims must stay credible. Do not use unsupported statements such as "No.1 in the world", "lifetime warranty", "official Apple/Samsung supplier", or unverified certifications. Prefer practical B2B language: "wholesale SSD supply", "factory-backed storage solutions", "contact for current quotation", "bulk orders and channel supply", and "quality checked before shipment".

## 2. Visual Style

- Dark-first background system: `#05070D` and `#080B12`.
- Primary colors: electric blue, cyan, and silver.
- Accent colors: restrained violet glow and emerald status highlights.
- Use large areas of breathing room. Do not pile too many claims, cards, badges, or gradients into a single viewport.
- The overall impression should match a 2026 flagship technology product page: premium, precise, high-performance, and export-ready.
- Use frosted glass cards, fine hairline borders, soft localized glows, dark metal product surfaces, and Bento modules.
- The hero visual should show a clear SSD / memory product signal, with dark metal, silver heat spreader, cyan edge light, and clean studio lighting.
- Avoid cheap ecommerce template styling, Taobao-style dense detail pages, loud sales stickers, fake certification badges, and low-quality decorative gradients.

## 3. Typography

- English-first system font stack:
  `Inter, SF Pro Display, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Chinese fallback:
  `"Microsoft YaHei", "Noto Sans SC", sans-serif`
- Headings should be large, short, and powerful.
- Procurement copy should be concise, specific, and calm.
- Technical parameters, prices, capacities, and quantities should use `font-variant-numeric: tabular-nums`.
- Keep technical terms such as PCIe, NVMe, SATA, NGFF, mSATA, DDR, and GB/TB readable across every language.

## 4. Layout

- Desktop: widescreen hero, large SSD visual, Bento product information, product grid, and a clear inquiry/cart entry point.
- Mobile: single-column layout, strong product cards, large touch targets, and a bottom sticky cart button.
- Header: SAMSWEET logo/text, navigation, language switcher, and WhatsApp CTA.
- Homepage sections must include:
  - Hero
  - Product Categories
  - Featured Products
  - Why SAMSWEET
  - Technical Specs
  - Wholesale Order Flow
  - Warranty / Quality Control
  - FAQ
  - Final CTA
- Page sections should be full-width bands or clean constrained layouts, not nested card stacks.
- Cards are reserved for products, Bento metrics, FAQ items, cart rows, and drawer/modal surfaces.
- Header should behave like a centered liquid-glass navigation bar on desktop and prioritize logo, language, and cart on mobile.
- Product categories should act as B2B navigation cards, not just counters.
- The product grid is the primary conversion surface and should expose result count, active filters, procurement-style quantity controls, and visible add-to-inquiry feedback.

## 5. Product Card Standard

Each product card must show:

- Product image
- Product name
- Capacity, interface, protocol, and speed when available
- MOQ or `Wholesale Inquiry`
- Quantity selector
- `Add to Inquiry`

Quantity controls must support `+`, `-`, and direct numeric input. Add-to-cart feedback must be clear and immediate. Product cards must not invent prices, certifications, warranties, or speed claims that are not present in the product data.

## 6. Interaction

- Micro-interactions should be restrained: hover lift, soft glow, button press, and cart drawer slide.
- Avoid excessive motion and background effects.
- Respect `prefers-reduced-motion`.
- Cart actions, quantity changes, filter updates, language switching, and order submission must provide visible state feedback.
- The WhatsApp order action must copy order text inside the user's click event using `navigator.clipboard.writeText(orderText)`.
- If clipboard access fails, show a fallback modal or textarea with the order text so the inquiry is never lost.

## 7. Accessibility

- Text contrast must be strong on dark and glass surfaces.
- Every image must include meaningful `alt` text.
- Buttons, links, filters, steppers, cart drawer controls, language controls, and form fields must be keyboard accessible.
- Focus states must be visible.
- Language switching must update `html lang` and `html dir`.
- Arabic must set `dir="rtl"` and keep spacing, cart layout, product cards, and form alignment coherent.
- Technical model names, Latin brand terms, numbers, and units should not be manually reversed in Arabic.

## 8. Performance

- The first hero image should not be lazy-loaded.
- Non-hero product and support images should use lazy loading.
- Prefer WebP / SVG local assets and keep JPEG fallback where available.
- Define image dimensions or stable aspect-ratio containers to reduce layout shift.
- Keep runtime dependencies minimal.
- Avoid large scrolling backdrop-filter layers when a smaller glass surface can achieve the same effect.
- Lighthouse targets:
  - Performance >= 90
  - Accessibility >= 95
  - Best Practices >= 95
  - SEO >= 90
