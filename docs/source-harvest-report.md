# SAMSWEET Source Harvest Report

Harvest run: 2026-06-24 Asia/Taipei

Scope: validate public sources and extract usable product/category/price facts for the SAMSWEET site. No credentials were used. No CAPTCHA, login, risk-control, or anti-bot flow was bypassed. JD/Tmall assets were not hotlinked.

Contact route for storefront inquiries: WhatsApp `+86 136 0248 9689`, `https://wa.me/8613602489689`. This contact number is site configuration, not harvested JD/Tmall data.

## Source Results

| Source | Access result | Usable for site | Notes |
| --- | --- | --- | --- |
| User-supplied June 8, 2026 price list | Provided in task | Primary price source | Use as canonical pricing unless a pricing owner confirms a newer list. |
| Reference repo: `https://github.com/AdamAISSD/samsweet-ssd-homepage` | Public clone/read succeeded | Categories, product-family copy, reference specs, conflicting later price table, reference asset inventory | Last observed commit `af7cd569a2c0e23ea9dae10334ace222b69d3992`, commit date 2026-06-13 +0800, subject `Update SAMSWEET official pricing site`. |
| JD: `https://mall.jd.com/index-12312905.html` | HTTP 200, title identified as SAMSWEET JD flagship store | Store presence only | Static HTML confirmed official-store page metadata, `shop_id=12312905`, `vender_id=12693229`, and `mainCategoryId=652`. Product modules are dynamic/lazy-loaded and no reliable product names, SKU prices, or product images were present in the anonymous HTML. |
| JD search page generated from page IDs | HTTP 200, title identified as SAMSWEET JD in-store search | Store/search presence only | Search shell loaded, but product item blocks were not server-rendered. Public module endpoint checks returned no usable product HTML. |
| Tmall: `https://samsweet.tmall.com/category.htm?search=y&orderType=hotsell_desc` | HTTP 200 shell containing CAPTCHA/risk redirect | Not usable | Response immediately configured `action: "captcha"` and redirected to a `_____tmd_____/punish` URL. No product/category/price/image data was harvested. |

## Product Families To Carry Forward

Use the June 8, 2026 list as the canonical price source:

| Family | Product/category label | Usable specs/copy | Canonical June 8 prices |
| --- | --- | --- | --- |
| PCIE SSD | `PCIE SSD` / all-new SSD | Reference repo frames this as M.2/NVMe-class SSD; reference spec section says M.2 2280, NVMe 1.4, backward compatible with PCIe 3.0. Treat performance claims as marketing copy until a datasheet confirms them. | 128GB RMB128; 256GB RMB215; 512GB RMB375; 1TB RMB600 |
| 2.5 SATA SSD | `2.5 SATA 3.0 SSD 6.0Gbps` | SATA 3.0 / 6.0Gbps, 2.5-inch upgrade category. | 128GB RMB85; 256GB RMB141; 512GB RMB272; 1TB RMB520 |
| M.2 NGFF SATA SSD | `M.2 NGFF SATA SSD` | M.2 NGFF with SATA interface. | 128GB RMB85; 256GB RMB141; 512GB RMB272; 1TB RMB520 |
| mSATA SSD | `mSATA SSD` | Compact SATA SSD category. | 128GB RMB85; 256GB RMB145; 512GB RMB278 |
| RAM | `DDR Memory` / RAM | DDR3/DDR4 memory category. | DDR4 8GB 2400MHz RMB124; DDR4 16GB 2666MHz RMB330; DDR3 8GB 1600MHz RMB61 |
| Packaging | Packaging fee | Per-piece add-on fee. | RMB1/piece |
| B Quality SSD | B Quality SATA / M.2 / mSATA, capacities 128GB / 256GB / 512GB | The user prompt includes exact B Quality prices for the three SSD families. Treat these as a lower-grade quotation tier and label clearly. | SATA: 128GB RMB80, 256GB RMB125, 512GB RMB230; M.2 NGFF: 128GB RMB81, 256GB RMB127, 512GB RMB235; mSATA: 128GB RMB81, 256GB RMB127, 512GB RMB235 |

## Price Conflicts Found

The reference repo presents a later `2026-06-12` quote table. It conflicts with the requested June 8 list in several places:

| Item | June 8 task price | Reference repo June 12 price |
| --- | ---: | ---: |
| 2.5 SATA SSD 256GB | RMB141 | RMB145 |
| 2.5 SATA SSD 512GB | RMB272 | RMB260 |
| M.2 NGFF SATA SSD 256GB | RMB141 | RMB145 |
| M.2 NGFF SATA SSD 512GB | RMB272 | RMB260 |
| M.2 NGFF SATA SSD 1TB | RMB520 | RMB522 |
| mSATA SSD 512GB | RMB278 | RMB263 |
| DDR4 8GB 2400MHz | RMB124 | RMB138 |
| DDR4 16GB 2666MHz | RMB330 | RMB345 |
| DDR3 8GB 1600MHz | RMB61 | RMB65 |

Recommendation: keep the June 8 price list as the active/canonical dataset for this task and record the June 12 reference values as a secondary source requiring pricing-owner confirmation before display.

## Asset Notes

- Do not hotlink JD or Tmall product/media URLs.
- JD and Tmall did not expose reliable anonymous product image data during this harvest.
- Mark product image slots as placeholders unless an owned asset or explicitly approved reference-repo asset is used.
- The reference repo contains these local assets: `samsweet-nvme-hero.jpg`, `samsweet-nvme-hero.webp`, `sata-detail-square.webp`, `sata-production-dark.jpg`, and `sata-production-dark.webp`. These are usable only if the project owner accepts the reference repo as an approved asset source.

## Product Data Recommendations

- Keep every generated product record traceable with `source: "user-price-list-2026-06-08"` for price values.
- Add optional secondary source metadata such as `referenceRepoCommit: "af7cd569a2c0e23ea9dae10334ace222b69d3992"` for family labels/spec copy derived from the reference repo.
- Add `sourceUrls` for store presence only: JD mall URL and Tmall category URL. Do not label JD/Tmall as price or image sources from this harvest.
- Use placeholders for image fields, for example `imageStatus: "placeholder"` or `imageAlt` without a remote URL.
- Represent B Quality products as a separate lower-grade quotation tier if displayed; label them clearly and avoid mixing them with brand-new SSD product cards.

## Harvest Limits

- Tmall category access was blocked by a CAPTCHA/risk-control redirect; no protected action was attempted.
- JD store/search pages loaded as public shells, but product lists/prices/images were not present in static anonymous HTML.
- No live JD/Tmall product price validation was possible from ordinary public page fetches.
- The June 8 price list is a supplied commercial reference, not a live marketplace scrape.
- Reference repo price data is later than the supplied list but conflicts with it; use only with explicit confirmation.
