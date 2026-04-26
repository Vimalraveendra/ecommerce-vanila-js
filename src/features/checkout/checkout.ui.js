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
export function renderCheckoutContent(cartItems, totals) {
  const { subtotal, tax, grandTotal } = totals;
  const wrapper = document.createElement("div");
  wrapper.classList.add("checkout-layout");
  wrapper.innerHTML = `
        <div id="checkoutLeft">
          <div class="checkout-section">
            <div class="checkout-section__title">Delivery information</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First name</label>
                <input class="form-input" type="text" id="firstName" placeholder="Alice" />
                <span class="form-error" id="firstNameErr"></span>
              </div>
              <div class="form-group">
                <label class="form-label">Last name</label>
                <input class="form-input" type="text" id="lastName" placeholder="Johnson" />
                <span class="form-error" id="lastNameErr"></span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email address</label>
              <input class="form-input" type="email" id="email" placeholder="alice@example.com" />
              <span class="form-error" id="emailErr"></span>
            </div>
            <div class="form-group">
              <label class="form-label">Phone number</label>
              <input class="form-input" type="tel" id="phone" placeholder="+48 (555) 000-000" />
               <span class="form-error" id="phoneErr"></span>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Street</label>
                <input class="form-input" type="text" id="street" placeholder="123 Main street" />
                <span class="form-error" id="streetErr"></span>
              </div>
              <div class="form-group">
                <label class="form-label">House Number</label>
                <input class="form-input" type="text" id="house" placeholder="23H/43" />
                <span class="form-error" id="houseErr"></span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">City</label>
                <input class="form-input" type="text" id="city" placeholder="New York" />
                <span class="form-error" id="cityErr"></span>
              </div>
              <div class="form-group">
                <label class="form-label">ZIP code</label>
                <input class="form-input" type="text" id="zip" placeholder="10001" />
                <span class="form-error" id="zipErr"></span>
              </div>
            </div>
          </div>

          <div class="checkout-section">
            <div class="checkout-section__title">Payment method</div>
            <div class="payment-options">
              <div class="payment-option payment-option--selected" data-method="card">Credit card</div>
              <div class="payment-option" data-method="paypal">PayPal</div>
              <div class="payment-option" data-method="apple">Apple Pay</div>
            </div>
            <div id="cardFields">
              <div class="form-group">
                <label class="form-label">Card number</label>
                <input class="form-input" type="text" id="cardNum" placeholder="1234 5678 9012 3456" maxlength="19" />
                <span class="form-error" id="cardNumErr"></span>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Expiry</label>
                  <input class="form-input" type="text" id="expiry" placeholder="MM / YY" maxlength="7" />
                  <span class="form-error" id="expiryErr"></span>
                </div>
                <div class="form-group">
                  <label class="form-label">CVV</label>
                  <input class="form-input" type="text" id="cvv" placeholder="123" maxlength="3" />
                  <span class="form-error" id="cvvErr"></span>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Name on card</label>
                <input class="form-input" type="text" id="cardName" placeholder="Alice Johnson" />
                <span class="form-error" id="cardErr"></span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="order-summary">
            <div class="order-summary__title">Order summary</div>
            ${cartItems
              .map(
                (item) => `
              <div class="order-summary__item">
                <img class="order-summary__img" src="${item.image}" alt="${item.title}" />
                <div class="order-summary__info">
                  <div class="order-summary__name">${item.title}</div>
                  <div class="order-summary__qty">Qty: ${item.qty}</div>
                </div>
                <div class="order-summary__price">$${(item.price * item.qty).toFixed(2)}</div>
             </div>
            `,
              )
              .join("")}

            <div class="promo-row">
              <input class="promo-input" type="text" id="promoCode" placeholder="Promo code" />
              <button class="promo-btn" id="promoBtn">Apply</button>
            </div>
            <div class="promo-success" id="promoSuccess">Promo applied — 10% off!</div>

            <div class="order-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="total-row">
                <span>Tax (8%)</span>
                <span id="tax">$${tax.toFixed(2)}</span>
              </div>
              <div class="total-row total-row--discount" id="discountRow">
                <span>Discount</span>
                <span id="discountAmt"></span>
              </div>
              <div class="total-row total-row--grand">
                <span>Total</span>
                <span id="grandTotalEl">$${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button class="btn btn--primary btn--full" style="margin-top:16px" id="placeOrderBtn">
              Place order
            </button>
          </div>
        </div>
     `;
  return wrapper;
}

export function renderCheckout(cartItems, container, totals) {
  container.innerHTML = `  <div class="checkout-page">
      <div class="back-link" id="backLink">← Back to cart</div>
      </div>`;
  const checkoutWrapper = document.querySelector(".checkout-page");
  checkoutWrapper.appendChild(renderCheckoutSteps());
  checkoutWrapper.appendChild(renderCheckoutContent(cartItems, totals));
}
