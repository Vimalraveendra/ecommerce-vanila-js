export function renderOrderConfirmation(container, orderNum, total) {
  container.innerHTML = `
  <div class="success-page">
      <div class="success-icon">✓</div>
      <h1 class="success-title">Order placed!</h1>
      <p class="success-sub">
        Thank you for your purchase.<br>
        A confirmation email has been sent to your inbox.
      </p>
      <div class="order-number">Order #SV-${orderNum}</div>
      <div class="success-sub" style="margin-bottom:28px">Total charged: $${total.toFixed(2)}</div>
      <button class="btn btn--primary btn--lg" id="continueBtn">Continue shopping</button>
    </div>
  `;
}
