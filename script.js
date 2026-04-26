import { ProductsPage } from "./src/pages/products.page.js";
import { CartPage } from "./src/pages/cart.page.js";
import {
  getProductById,
  setProducts,
} from "./src/features/products/product.store.js";
import {
  addToCart,
  decreaseQty,
  toggleCart,
  getCartItems,
} from "./src/features/cart/cart.store.js";
import { showToast } from "./utils.js";
import { router } from "./router.js";
import { fetchProducts } from "./src/features/products/product.api.js";
import { getCartCount } from "./src/features/cart/cart.service.js";

function renderCartCount() {
  const cartItems = getCartItems();
  const count = getCartCount(cartItems);
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  setProducts(products);
  renderCartCount();
  router();
});
window.addEventListener("hashchange", router);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    const product = getProductById(id);
    addToCart(id);
    showToast(`${product.title} added to cart`);
    renderCartCount();
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
  const path = window.location.hash.slice(1);
  if (path.startsWith("/products/")) {
    CartPage();
  } else {
    CartPage();
    ProductsPage();
  }
});
