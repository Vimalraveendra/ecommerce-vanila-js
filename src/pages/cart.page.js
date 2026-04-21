import {
  getCartItems,
  getCartTotal,
  getCartCount,
} from "../features/cart/cart.store.js";
import { renderCart } from "../features/cart/cart.ui.js";

export function CartPage() {
  const container = document.getElementById("cartItems");
  const cartItems = getCartItems();
  renderCart(cartItems, container);
  const count = getCartCount();
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
  const total = document.getElementById("cartTotal");
  total.textContent = `$${getCartTotal().toFixed(2)}`;
}
