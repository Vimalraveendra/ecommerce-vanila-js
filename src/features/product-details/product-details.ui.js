import { getStockCount } from "./product-details.service.js";
import { renderStars } from "../products/products.service.js";

export function renderProductNotFound(container) {
  container.innerHTML = `<div class="back-link" id="backLink2">← Back to products</div>
      <div style="text-align:center;padding:80px;color:var(--text-secondary)">
        Product not found.
      </div>
    `;
}

export function renderProductDetails(product, container) {
  const stockCount = getStockCount();
  const isLow = stockCount <= 5;
  container.innerHTML = `
    <div class="back-link" id="backLink">← Back to products</div>
    <div class="detail-page">
      <div class="detail-gallery">
        <img class="detail-gallery__img" src="${product.image}" alt="${product.title}" />
      </div>
      <div class="detail-info">
        <div class="detail-category">${product.category}</div>
        <h1 class="detail-title">${product.title}</h1>
        <div class="detail-rating">
          <span class="detail-stars">${renderStars(product.rating.rate)}</span>
          <span>${product.rating.rate} out of 5 (${product.rating.count} reviews)</span>
        </div>
        <div class="detail-price">$${product.price.toFixed(2)}</div>
        <div class="detail-badge ${isLow ? "detail-badge--low" : "detail-badge--instock"}">
          ${isLow ? `Only ${stockCount} left` : "In stock"}
        </div>
        <p class="detail-desc">${product.description}</p>
        <div class="detail-qty">
          <span class="detail-qty__label">Quantity</span>
          <div class="qty-control">
            <button class="qty-btn" id="qtyDecrease">−</button>
            <span class="qty-num" id="qtyNum">1</span>
            <button class="qty-btn" id="qtyIncrease">+</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn--primary btn--lg" id="addToCartBtn">Add to cart</button>
          <button class="btn btn--lg" id="buyNowBtn">Buy now</button>
        </div>
        <div class="detail-specs">
          <div class="detail-specs__title">Product details</div>
          <div class="detail-specs__row">
            <span class="detail-specs__key">Category</span>
            <span class="detail-specs__val" style="text-transform:capitalize">${product.category}</span>
          </div>
          <div class="detail-specs__row">
            <span class="detail-specs__key">Rating</span>
            <span class="detail-specs__val">${product.rating.rate}/5</span>
          </div>
          <div class="detail-specs__row">
            <span class="detail-specs__key">Reviews</span>
            <span class="detail-specs__val">${product.rating.count}</span>
          </div>
          <div class="detail-specs__row">
            <span class="detail-specs__key">SKU</span>
            <span class="detail-specs__val">SV-${product.id.toString().padStart(4, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
