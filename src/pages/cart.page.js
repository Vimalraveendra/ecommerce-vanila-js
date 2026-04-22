import { getCartItems } from "../features/cart/cart.store.js";
import { getCartCount, getCartTotal } from "../features/cart/cart.service.js";
import { renderCart } from "../features/cart/cart.ui.js";

export function CartPage() {
  const container = document.getElementById("cartItems");
  const cartItems = getCartItems();
  renderCart(cartItems, container);
  const count = getCartCount(cartItems);
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
  const total = document.getElementById("cartTotal");
  total.textContent = `$${getCartTotal(cartItems).toFixed(2)}`;
}
