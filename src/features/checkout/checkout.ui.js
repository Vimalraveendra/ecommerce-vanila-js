export function renderEmptyCart(container) {
  container.innerHTML = `
      <div class="success-page">
        <div class="success-icon">🛒</div>
        <div class="success-title">Your cart is empty</div>
        <div class="success-sub">Add some products before checking out.</div>
        <button class="btn btn--primary btn--lg" id="shopBtn">Shop now</button>
      </div>
    `;
}
