import { ProductsPage } from "./src/pages/products.page.js";
import { CartPage } from "./src/pages/cart.page.js";
import { getProductById } from "./src/features/products/product.store.js";
import {
  addToCart,
  decreaseQty,
  toggleCart,
} from "./src/features/cart/cart.store.js";
import { showToast } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  ProductsPage();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    const product = getProductById(id);
    addToCart(id);
    showToast(`${product.title} added to cart`);
    ProductsPage();
  }
});

const handleCartToggle = () => {
  const isCartOpen = toggleCart();
  document.getElementById("cartOverlay").classList.toggle("open", isCartOpen);
  document.getElementById("backdrop").classList.toggle("open", isCartOpen);
  CartPage();
};
document.getElementById("cartBtn").addEventListener("click", handleCartToggle);
document
  .getElementById("closeCart")
  .addEventListener("click", handleCartToggle);
document.getElementById("backdrop").addEventListener("click", handleCartToggle);

document.querySelector(".cart-overlay").addEventListener("click", (e) => {
  const cartItem = e.target.closest(".cart-item");
  if (!cartItem) return;
  const id = Number(e.target.dataset.id);
  const product = getProductById(id);
  if (e.target.classList.contains("cart-item__btn--increase")) {
    addToCart(id);
    showToast(`${product.title} added to cart`);
  }
  if (e.target.classList.contains("cart-item__btn--decrease")) {
    decreaseQty(id);
    showToast(`${product.title} removed from cart`);
  }
  CartPage();
  ProductsPage();
});
