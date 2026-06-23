import { capacities, categories, products } from "./data/products.js";
import { defaultLocale, localeMeta, localeOrder, translations } from "./i18n/translations.js";

const WHATSAPP_PHONE = "8619064025220";
const CART_KEY = "samsweet-inquiry-cart-v1";
const LOCALE_KEY = "samsweet-locale";

const productById = new Map(products.map((product) => [product.id, product]));
const app = document.querySelector("#app");

const state = {
  locale: loadLocale(),
  cart: loadCart(),
  filters: {
    search: "",
    category: "all",
    capacity: "all"
  },
  customer: {
    name: "",
    country: "",
    whatsapp: "",
    remark: ""
  }
};

let toastTimer;

function loadLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    return translations[saved] ? saved : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([id, qty]) => productById.has(id) && Number(qty) > 0)
        .map(([id, qty]) => [id, Math.min(9999, Math.max(1, Number(qty)))])
    );
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function saveLocale() {
  localStorage.setItem(LOCALE_KEY, state.locale);
}

function text() {
  return translations[state.locale] || translations[defaultLocale];
}

function meta() {
  return localeMeta[state.locale] || localeMeta[defaultLocale];
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setDocumentLocale() {
  const current = meta();
  document.documentElement.lang = current.lang;
  document.documentElement.dir = current.dir;
  document.body.dataset.locale = state.locale;
}

function totalCartQty() {
  return Object.values(state.cart).reduce((sum, qty) => sum + Number(qty), 0);
}

function cartItems() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ product: productById.get(id), qty }))
    .filter((item) => item.product && item.qty > 0);
}

function renderApp() {
  setDocumentLocale();
  const t = text();

  app.innerHTML = `
    <header class="site-header">
      <a class="brand-mark" href="#hero" aria-label="SAMSWEET home">
        <span class="brand-orb" aria-hidden="true"></span>
        <span>SAMSWEET</span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#categories">${escapeHtml(t.nav.categories)}</a>
        <a href="#products">${escapeHtml(t.nav.products)}</a>
        <a href="#quality">${escapeHtml(t.nav.quality)}</a>
        <a href="#faq">${escapeHtml(t.nav.faq)}</a>
      </nav>
      <div class="header-actions">
        <div class="language-menu" aria-label="Language switcher">
          ${localeOrder
            .map(
              (locale) => `
                <button class="lang-option ${locale === state.locale ? "is-active" : ""}" type="button" data-locale="${locale}" aria-pressed="${locale === state.locale}">
                  ${escapeHtml(localeMeta[locale].short)}
                </button>
              `
            )
            .join("")}
        </div>
        <a class="button button-ghost header-whatsapp" href="https://wa.me/${WHATSAPP_PHONE}" target="_blank" rel="noopener">
          ${escapeHtml(t.nav.whatsapp)}
        </a>
        <button class="button button-primary js-cart-open" type="button" aria-label="${escapeHtml(t.cart.open)}">
          <span>${escapeHtml(t.nav.cart)}</span>
          <span class="cart-count" data-cart-count>${totalCartQty()}</span>
        </button>
      </div>
    </header>

    <main>
      <section class="hero-section" id="hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p>
          <h1>${escapeHtml(t.hero.title)}</h1>
          <p class="hero-lead">${escapeHtml(t.hero.subtitle)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#products">${escapeHtml(t.hero.primary)}</a>
            <button class="button button-ghost js-cart-open" type="button">${escapeHtml(t.hero.secondary)}</button>
          </div>
        </div>
        <div class="hero-visual" aria-label="SAMSWEET SSD hero visual">
          <picture>
            <source srcset="assets/products/samsweet-nvme-hero.webp" type="image/webp">
            <img src="assets/products/samsweet-nvme-hero.jpg" alt="SAMSWEET M.2 NVMe SSD product visual" width="1815" height="724" loading="eager">
          </picture>
          <div class="hero-bento">
            ${t.hero.stats.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="categories">
        ${sectionHeader(t.categories.eyebrow, t.categories.title, t.categories.body)}
        <div class="category-grid">
          ${categories.map((category) => categoryCard(category)).join("")}
        </div>
      </section>

      <section class="section product-section" id="products">
        ${sectionHeader(t.products.eyebrow, t.products.title, t.products.body)}
        <div class="product-toolbar" aria-label="Product filters">
          <label>
            <span>${escapeHtml(t.products.search)}</span>
            <input class="filter-input" data-filter="search" type="search" value="${escapeHtml(state.filters.search)}" placeholder="${escapeHtml(t.products.search)}">
          </label>
          <label>
            <span>${escapeHtml(t.products.category)}</span>
            <select class="filter-input" data-filter="category">
              <option value="all">${escapeHtml(t.categoryLabels.all)}</option>
              ${categories
                .map((category) => `<option value="${escapeHtml(category)}" ${state.filters.category === category ? "selected" : ""}>${escapeHtml(t.categoryLabels[category] || category)}</option>`)
                .join("")}
            </select>
          </label>
          <label>
            <span>${escapeHtml(t.products.capacity)}</span>
            <select class="filter-input" data-filter="capacity">
              <option value="all">${escapeHtml(t.products.allCapacities)}</option>
              ${capacities
                .map((capacity) => `<option value="${escapeHtml(capacity)}" ${state.filters.capacity === capacity ? "selected" : ""}>${escapeHtml(capacity)}</option>`)
                .join("")}
            </select>
          </label>
        </div>
        <div class="product-grid" id="product-grid"></div>
      </section>

      <section class="section split-section" id="why">
        <div>
          <p class="eyebrow">${escapeHtml(t.why.eyebrow)}</p>
          <h2>${escapeHtml(t.why.title)}</h2>
        </div>
        <div class="bento-grid">
          ${t.why.items.map(([title, body]) => infoCard(title, body)).join("")}
        </div>
      </section>

      <section class="section specs-band" id="specs">
        ${sectionHeader(t.specs.eyebrow, t.specs.title, "")}
        <div class="spec-table" role="list">
          ${t.specs.items
            .map(
              ([title, body]) => `
                <div class="spec-row" role="listitem">
                  <strong>${escapeHtml(title)}</strong>
                  <span>${escapeHtml(body)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section flow-section" id="flow">
        ${sectionHeader(t.flow.eyebrow, t.flow.title, "")}
        <div class="flow-grid">
          ${t.flow.steps
            .map(
              ([title, body], index) => `
                <article class="flow-card">
                  <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(title)}</h3>
                  <p>${escapeHtml(body)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section quality-section" id="quality">
        <div class="quality-media">
          <picture>
            <source srcset="assets/products/sata-production-dark.webp" type="image/webp">
            <img src="assets/products/sata-production-dark.jpg" alt="SAMSWEET SSD product and production quality visual" width="1600" height="900" loading="lazy">
          </picture>
        </div>
        <div class="quality-copy">
          <p class="eyebrow">${escapeHtml(t.quality.eyebrow)}</p>
          <h2>${escapeHtml(t.quality.title)}</h2>
          <ul class="check-list">
            ${t.quality.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="section faq-section" id="faq">
        ${sectionHeader(t.faq.eyebrow, t.faq.title, "")}
        <div class="faq-grid">
          ${t.faq.items
            .map(
              ([question, answer]) => `
                <details class="faq-item">
                  <summary>${escapeHtml(question)}</summary>
                  <p>${escapeHtml(answer)}</p>
                </details>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="final-cta" id="contact">
        <p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p>
        <h2>${escapeHtml(t.finalCta.title)}</h2>
        <p>${escapeHtml(t.finalCta.body)}</p>
        <button class="button button-primary js-cart-open" type="button">${escapeHtml(t.finalCta.button)}</button>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <strong>SAMSWEET</strong>
        <p>${escapeHtml(t.footer.summary)}</p>
      </div>
      <div>
        <p>${escapeHtml(t.footer.whatsapp)}</p>
        <p>${escapeHtml(categories.map((category) => t.categoryLabels[category] || category).join(" · "))}</p>
      </div>
      <div>
        <p>${escapeHtml(localeOrder.map((locale) => localeMeta[locale].name).join(" · "))}</p>
        <p>${escapeHtml(t.footer.disclaimer)}</p>
      </div>
    </footer>

    ${renderCartDrawer()}
    ${renderFallbackModal()}
    <button class="mobile-cart-button js-cart-open" type="button" aria-label="${escapeHtml(t.cart.open)}">
      <span>${escapeHtml(t.nav.cart)}</span>
      <strong data-cart-count>${totalCartQty()}</strong>
    </button>
    <div class="toast" role="status" aria-live="polite" id="toast"></div>
  `;

  renderProducts();
  renderCart();
}

function sectionHeader(eyebrow, title, body) {
  return `
    <div class="section-header">
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h2>${escapeHtml(title)}</h2>
      ${body ? `<p>${escapeHtml(body)}</p>` : ""}
    </div>
  `;
}

function infoCard(title, body) {
  return `
    <article class="info-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(body)}</p>
    </article>
  `;
}

function categoryCard(category) {
  const t = text();
  const count = products.filter((product) => product.category === category && product.qualityGrade === "Brand New").length;
  return `
    <button class="category-card" type="button" data-category-card="${escapeHtml(category)}">
      <span>${escapeHtml(t.categoryLabels[category] || category)}</span>
      <strong>${count}</strong>
    </button>
  `;
}

function productMatches(product) {
  const search = state.filters.search.trim().toLowerCase();
  const haystack = [
    product.name,
    product.category,
    product.capacity,
    product.interface,
    product.protocol,
    product.formFactor,
    product.qualityGrade
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    (!search || haystack.includes(search)) &&
    (state.filters.category === "all" || product.category === state.filters.category) &&
    (state.filters.capacity === "all" || product.capacity === state.filters.capacity)
  );
}

function renderProducts() {
  const t = text();
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const filtered = products.filter(productMatches);

  if (!filtered.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHtml(t.products.noResults)}</p>`;
    return;
  }

  grid.innerHTML = filtered.map((product) => productCard(product)).join("");
}

function productImage(product, eager = false) {
  const img = `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" width="1200" height="800" loading="${eager ? "eager" : "lazy"}">`;
  if (!product.imageFallback) return img;
  return `
    <picture>
      <source srcset="${escapeHtml(product.image)}" type="image/webp">
      <img src="${escapeHtml(product.imageFallback)}" alt="${escapeHtml(product.imageAlt || product.name)}" width="1200" height="800" loading="${eager ? "eager" : "lazy"}">
    </picture>
  `;
}

function productCard(product) {
  const t = text();
  const sourceLabel = product.placeholder ? t.products.placeholder : t.products.referenceAsset;
  const currentQty = state.cart[product.id] || 1;
  return `
    <article class="product-card">
      <div class="product-media">
        ${productImage(product)}
        <span class="asset-badge">${escapeHtml(sourceLabel)}</span>
      </div>
      <div class="product-body">
        <div class="product-title-row">
          <p class="product-category">${escapeHtml(t.categoryLabels[product.category] || product.category)} · ${escapeHtml(product.qualityGrade)}</p>
          <h3>${escapeHtml(product.name)}</h3>
        </div>
        <dl class="product-specs">
          <div><dt>Capacity</dt><dd>${escapeHtml(product.capacity || "-")}</dd></div>
          <div><dt>Interface</dt><dd>${escapeHtml(product.interface || "-")}</dd></div>
          <div><dt>Protocol</dt><dd>${escapeHtml(product.protocol || "-")}</dd></div>
          <div><dt>Speed</dt><dd>${escapeHtml(product.speedRead || "Confirm")}</dd></div>
        </dl>
        <p class="price-text">${escapeHtml(product.priceText || "Contact for quote")}</p>
        <ul class="mini-list">
          ${product.highlights.slice(0, 3).map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
        </ul>
        <div class="product-actions">
          <div class="quantity-control" aria-label="${escapeHtml(t.products.qty)}">
            <button type="button" data-step-product="${escapeHtml(product.id)}" data-delta="-1" aria-label="Decrease quantity">-</button>
            <input type="number" min="1" max="9999" value="${currentQty}" data-product-qty="${escapeHtml(product.id)}" aria-label="${escapeHtml(t.products.qty)} ${escapeHtml(product.name)}">
            <button type="button" data-step-product="${escapeHtml(product.id)}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="button button-primary" type="button" data-add-product="${escapeHtml(product.id)}">${escapeHtml(t.products.add)}</button>
        </div>
      </div>
    </article>
  `;
}

function renderCartDrawer() {
  const t = text();
  return `
    <div class="drawer-backdrop" data-cart-close></div>
    <aside class="cart-drawer" id="cart-drawer" aria-hidden="true" aria-label="${escapeHtml(t.cart.title)}">
      <div class="drawer-head">
        <div>
          <p class="eyebrow">${escapeHtml(t.nav.cart)}</p>
          <h2>${escapeHtml(t.cart.title)}</h2>
        </div>
        <button class="icon-button" type="button" data-cart-close aria-label="${escapeHtml(t.cart.close)}">×</button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <form class="order-form" id="order-form">
        <h3>${escapeHtml(t.cart.formTitle)}</h3>
        <label>${escapeHtml(t.cart.name)}<input name="name" autocomplete="name" value="${escapeHtml(state.customer.name)}"></label>
        <label>${escapeHtml(t.cart.country)}<input name="country" autocomplete="country-name" value="${escapeHtml(state.customer.country)}"></label>
        <label>${escapeHtml(t.cart.whatsapp)}<input name="whatsapp" autocomplete="tel" value="${escapeHtml(state.customer.whatsapp)}"></label>
        <label>${escapeHtml(t.cart.remark)}<textarea name="remark" rows="3">${escapeHtml(state.customer.remark)}</textarea></label>
        <p class="cart-note">${escapeHtml(t.cart.subtotalNote)}</p>
        <button class="button button-primary full-width" type="submit">${escapeHtml(t.cart.submit)}</button>
      </form>
    </aside>
  `;
}

function renderFallbackModal() {
  return `
    <div class="fallback-modal" id="fallback-modal" hidden>
      <div class="fallback-card" role="dialog" aria-modal="true" aria-labelledby="fallback-title">
        <button class="icon-button fallback-close" type="button" data-fallback-close aria-label="Close">×</button>
        <h2 id="fallback-title"></h2>
        <p id="fallback-body"></p>
        <textarea id="fallback-text" rows="12" readonly></textarea>
        <a class="button button-primary full-width" id="fallback-whatsapp" href="#" target="_blank" rel="noopener"></a>
      </div>
    </div>
  `;
}

function renderCart() {
  const t = text();
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(totalCartQty());
  });

  const itemsWrap = document.querySelector("#cart-items");
  if (!itemsWrap) return;

  const items = cartItems();
  if (!items.length) {
    itemsWrap.innerHTML = `<p class="empty-state">${escapeHtml(t.cart.empty)}</p>`;
    return;
  }

  itemsWrap.innerHTML = `
    ${items
      .map(
        ({ product, qty }) => `
          <article class="cart-row">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" width="80" height="80" loading="lazy">
            <div>
              <strong>${escapeHtml(product.name)}</strong>
              <p>${escapeHtml([product.capacity, product.interface, product.protocol].filter(Boolean).join(" / "))}</p>
              <p>${escapeHtml(product.sourcePlatform)} · ${escapeHtml(product.qualityGrade)}</p>
            </div>
            <div class="cart-row-actions">
              <div class="quantity-control compact">
                <button type="button" data-cart-delta="${escapeHtml(product.id)}" data-delta="-1" aria-label="Decrease quantity">-</button>
                <input type="number" min="1" max="9999" value="${qty}" data-cart-qty="${escapeHtml(product.id)}" aria-label="${escapeHtml(t.products.qty)} ${escapeHtml(product.name)}">
                <button type="button" data-cart-delta="${escapeHtml(product.id)}" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
              <button class="text-button" type="button" data-remove-product="${escapeHtml(product.id)}">${escapeHtml(t.cart.remove)}</button>
            </div>
          </article>
        `
      )
      .join("")}
    <button class="text-button danger" type="button" data-clear-cart>${escapeHtml(t.cart.clear)}</button>
  `;
}

function updateQuantityInput(input, delta) {
  const next = Math.max(1, Math.min(9999, Number(input.value || 1) + delta));
  input.value = String(next);
}

function addToCart(productId, qty) {
  const nextQty = Math.max(1, Math.min(9999, Number(qty || 1)));
  state.cart[productId] = (state.cart[productId] || 0) + nextQty;
  saveCart();
  renderCart();
  showToast(text().products.added);
}

function setCartQty(productId, qty) {
  const nextQty = Math.max(1, Math.min(9999, Number(qty || 1)));
  state.cart[productId] = nextQty;
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  delete state.cart[productId];
  saveCart();
  renderCart();
}

function clearCart() {
  state.cart = {};
  saveCart();
  renderCart();
}

function openCart() {
  document.body.classList.add("cart-open");
  const drawer = document.querySelector("#cart-drawer");
  drawer?.setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  const drawer = document.querySelector("#cart-drawer");
  drawer?.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function persistCustomerForm(form) {
  const data = new FormData(form);
  state.customer = {
    name: String(data.get("name") || ""),
    country: String(data.get("country") || ""),
    whatsapp: String(data.get("whatsapp") || ""),
    remark: String(data.get("remark") || "")
  };
}

function buildOrderText() {
  const items = cartItems();
  const lines = ["Hello SAMSWEET, I want to inquire about these products:", ""];

  items.forEach(({ product, qty }, index) => {
    lines.push(`${index + 1}. Product: ${product.name}`);
    lines.push(`   Model/Spec: ${[product.qualityGrade, product.formFactor].filter(Boolean).join(" / ")}`);
    lines.push(`   Capacity: ${product.capacity || ""}`);
    lines.push(`   Interface: ${product.interface || ""}`);
    lines.push(`   Protocol: ${product.protocol || ""}`);
    lines.push(`   Quantity: ${qty}`);
    lines.push(`   Source: ${product.sourcePlatform || ""}`);
    lines.push(`   Source page: ${product.sourceUrl || window.location.href}`);
    lines.push(`   Reference price: ${product.priceText || "Contact for quote"}`);
    lines.push("");
  });

  lines.push("Customer Info:");
  lines.push(`Name: ${state.customer.name}`);
  lines.push(`Country: ${state.customer.country}`);
  lines.push(`WhatsApp: ${state.customer.whatsapp}`);
  lines.push(`Remark: ${state.customer.remark}`);
  lines.push("");
  lines.push(`Page: ${window.location.href}`);

  return lines.join("\n");
}

function whatsappUrl(orderText) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(orderText)}`;
}

async function submitOrder(event) {
  event.preventDefault();
  const t = text();
  const form = event.target;
  persistCustomerForm(form);

  if (!cartItems().length) {
    showToast(t.cart.required);
    return;
  }

  const orderText = buildOrderText();
  const url = whatsappUrl(orderText);

  try {
    await navigator.clipboard.writeText(orderText);
    showToast(t.cart.copied);
    const opened = window.open(url, "_blank", "noopener");
    if (!opened) {
      window.location.href = url;
    }
  } catch {
    showFallback(orderText, url);
  }
}

function showFallback(orderText, url) {
  const t = text();
  const modal = document.querySelector("#fallback-modal");
  const title = document.querySelector("#fallback-title");
  const body = document.querySelector("#fallback-body");
  const textarea = document.querySelector("#fallback-text");
  const link = document.querySelector("#fallback-whatsapp");
  if (!modal || !title || !body || !textarea || !link) return;
  title.textContent = t.cart.fallbackTitle;
  body.textContent = t.cart.fallbackBody;
  textarea.value = orderText;
  link.textContent = t.cart.fallbackButton;
  link.href = url;
  modal.hidden = false;
  textarea.focus();
  textarea.select();
}

function closeFallback() {
  const modal = document.querySelector("#fallback-modal");
  if (modal) modal.hidden = true;
}

function bindGlobalEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    const locale = target.dataset.locale;
    if (locale && translations[locale]) {
      state.locale = locale;
      saveLocale();
      renderApp();
      return;
    }

    const category = target.dataset.categoryCard;
    if (category) {
      state.filters.category = category;
      renderApp();
      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (target.matches(".js-cart-open")) {
      openCart();
      return;
    }

    if (target.hasAttribute("data-cart-close")) {
      closeCart();
      return;
    }

    if (target.hasAttribute("data-fallback-close")) {
      closeFallback();
      return;
    }

    const stepProduct = target.dataset.stepProduct;
    if (stepProduct) {
      const input = document.querySelector(`[data-product-qty="${CSS.escape(stepProduct)}"]`);
      if (input) updateQuantityInput(input, Number(target.dataset.delta || 0));
      return;
    }

    const addProduct = target.dataset.addProduct;
    if (addProduct) {
      const input = document.querySelector(`[data-product-qty="${CSS.escape(addProduct)}"]`);
      addToCart(addProduct, input?.value || 1);
      return;
    }

    const cartDelta = target.dataset.cartDelta;
    if (cartDelta) {
      setCartQty(cartDelta, (state.cart[cartDelta] || 1) + Number(target.dataset.delta || 0));
      return;
    }

    const removeProduct = target.dataset.removeProduct;
    if (removeProduct) {
      removeFromCart(removeProduct);
      return;
    }

    if (target.hasAttribute("data-clear-cart")) {
      clearCart();
    }
  });

  document.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement)) return;

    const filter = input.dataset.filter;
    if (filter) {
      state.filters[filter] = input.value;
      renderProducts();
      return;
    }

    const cartQty = input.dataset.cartQty;
    if (cartQty) {
      setCartQty(cartQty, input.value);
      return;
    }

    const form = input.closest("#order-form");
    if (form) {
      persistCustomerForm(form);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("#order-form")) {
      submitOrder(event);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      closeFallback();
    }
  });
}

bindGlobalEvents();
renderApp();
