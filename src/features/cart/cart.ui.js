export function renderCartItem(item) {
  return `
         <div class="cart-item">
            <div class="cart-item__img">
              <img src="${item.image}" alt="${item.title}">
            </div>
          <div class="cart-item__info">
            <div class="cart-item__title">${item.title}</div>
            <div class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <div class="cart-item__qty">
            <button class="cart-item__btn cart-item__btn--decrease" data-id="${item.id}">−</button>
            <span class="cart-item__count">${item.qty}</span>
            <button class="cart-item__btn cart-item__btn--increase" data-id="${item.id}" >+</button>
          </div>
        </div>`;
}

export function renderEmptyCart() {
  return '<div class="empty-cart">Your cart is empty.<br>Add some products to get started.</div>';
}

export function renderCart(cartItems, container) {
  if (cartItems.length === 0) {
    container.innerHTML = renderEmptyCart();
    return;
  } else {
    container.innerHTML = cartItems
      .map((item) => renderCartItem(item))
      .join("");
  }
}
