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

  // BACK TO PRODUCTS
  document.getElementById("backLink").addEventListener("click", () => {
    navigate("/");
  });

  /* =====PAYMENT SECTION=====*/
  // SELECT PAYMENT METHOD
  let selectedMethod = "card";
  const options = document.querySelectorAll(".payment-option");
  const cardFields = document.getElementById("cardFields");
  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".payment-option");
    if (!opt) return;
    //remove previous selection
    options.forEach((o) =>
      o.classList.toggle("payment-option--selected", o === opt),
    );
    selectedMethod = opt.dataset.method;

    cardFields.style.display = selectedMethod === "card" ? "block" : "none";
  });

  // HANDLE CARD NUMBER
  document.getElementById("cardNum").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    e.target.value = v.match(/.{1,4}/g)?.join(" ") || v;
  });

  // HANDLE EXPIRY DATE
  document.getElementById("expiry").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 2) v = v.slice(0, 2) + " / " + v.slice(2);
    e.target.value = v;
  });

  // HANDLE CVV NUMBER
  document.getElementById("cvv").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    e.target.value = v;
  });
}
