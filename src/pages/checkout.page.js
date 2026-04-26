import { navigate } from "../../router.js";
import { getCartItems } from "../features/cart/cart.store.js";
import { renderEmptyCart } from "../features/checkout/checkout.ui.js";

export function CheckoutPage() {
  const container = document.getElementById("main");
  const cartItems = getCartItems();
  s;
  if (cartItems.length === 0) {
    renderEmptyCart(container);
    document.getElementById("shopBtn").addEventListener("click", () => {
      navigate("/");
    });
    return;
  }
}
