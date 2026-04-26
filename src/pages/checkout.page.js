import { navigate } from "../../router.js";
import { getCartItems } from "../features/cart/cart.store.js";
import {
  renderCheckout,
  renderEmptyCart,
} from "../features/checkout/checkout.ui.js";
import { getCartTotal } from "../features/cart/cart.service.js";
import { calculateTotals } from "../features/checkout/checkout.service.js";

export function CheckoutPage() {
  const container = document.getElementById("main");
  const cartItems = getCartItems();
  if (cartItems.length === 0) {
    renderEmptyCart(container);
    document.getElementById("shopBtn").addEventListener("click", () => {
      navigate("/");
    });
    return;
  }
  const cartTotal = getCartTotal(cartItems);
  const totals = calculateTotals({ cartTotal, discount: 0, taxRate: 0.08 });
  renderCheckout(cartItems, container, totals);
}
