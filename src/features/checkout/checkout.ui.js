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

export function renderCheckoutSteps() {
  const checkoutWrapper = document.createElement("div");
  checkoutWrapper.classList.add("checkout-steps");
  checkoutWrapper.innerHTML = `
        <div class="checkout-step checkout-step--done">

          <div class="checkout-step__num">✓</div>
          <span>Cart</span>
        </div>
        <div class="checkout-step__line"></div>
        <div class="checkout-step checkout-step--active" id="step2">
          <div class="checkout-step__num">2</div>
          <span>Details</span>
        </div>
        <div class="checkout-step__line"></div>
        <div class="checkout-step" id="step3">
          <div class="checkout-step__num">3</div>
          <span>Confirm</span>
        </div>`;
  return checkoutWrapper;
}

export function renderCheckout(cartItems, container, totals) {
  container.innerHTML = `  <div class="checkout-page">
      <div class="back-link" id="backLink">← Back to cart</div>
      </div>`;
  const checkoutWrapper = document.querySelector(".checkout-page");
  checkoutWrapper.appendChild(renderCheckoutSteps());
}
