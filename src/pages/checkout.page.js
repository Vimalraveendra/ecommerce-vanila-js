import { navigate } from "../../router.js";
import { getCartItems, clearCart } from "../features/cart/cart.store.js";
import {
  renderCheckout,
  renderEmptyCart,
} from "../features/checkout/checkout.ui.js";
import { getCartTotal } from "../features/cart/cart.service.js";
import {
  calculateTotals,
  validatePromoCode,
} from "../features/checkout/checkout.service.js";
import {
  validateAddress,
  validatePayment,
} from "../features/checkout/checkout.validation.js";
import { CartPage } from "./cart.page.js";

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

  /* =====PROMO CODE SECTION=====*/

  document.getElementById("promoBtn").addEventListener("click", () => {
    if (promoApplied) return;
    const promoCodeEl = document.getElementById("promoCode");
    if (promoApplied) return;
    const code = promoCodeEl.value.trim().toUpperCase();
    const isValid = validatePromoCode(code);
    const promoSuccessEl = document.getElementById("promoSuccess");
    const promoErrorEl = document.getElementById("promoError");
    if (!isValid) {
      promoSuccessEl.style.display = "none";
      promoErrorEl.style.display = "block";
      promoErrorEl.textContent = "Invalid promo code";
      return;
    }
    const totalCal = calculateTotals({ cartTotal, discount: 0.1 });
    const { discount, tax, grandTotal } = totalCal;
    promoApplied = true;
    promoErrorEl.style.display = "none";
    promoSuccessEl.style.display = "block";
    promoCodeEl.disabled = true;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("discountRow").style.display = "flex";
    document.getElementById("discountAmt").textContent =
      `-$${discount.toFixed(2)}`;
    document.getElementById("grandTotalEl").textContent =
      `$${grandTotal.toFixed(2)}`;
  });

  /* =====PLACE ORDER SECTION=====*/

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", () => {
    if (!validateCheckout(selectedMethod)) return;
    placeOrderBtn.textContent = "Processing...";
    placeOrderBtn.disabled = true;
    document.getElementById("step2").className =
      "checkout-step checkout-step--done";
    document
      .getElementById("step2")
      .querySelector(".checkout-step__num").textContent = "✓";
    document.getElementById("step3").className =
      "checkout-step checkout-step--active";

    setTimeout(() => {
      clearCart();
      CartPage();
      navigate("/order-confirmation");
    }, 1500);
  });
}

/* =====VALIDATE CHECKOUT FIELDS=====*/
function validateCheckout(method) {
  let valid = true;
  const isAddressValid = validateAddress();
  let isPaymentValid = false;
  if (method === "card") isPaymentValid = validatePayment(method);
  if (!isAddressValid || !isPaymentValid) valid = false;
  return valid;
}
