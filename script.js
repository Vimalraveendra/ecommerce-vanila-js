import { ProductsPage } from "./src/pages/products.page.js";
import { CartPage } from "./src/pages/cart.page.js";
import {
  setCategory,
  setMaxPrice,
  setSearchText,
  setSortText,
} from "./src/features/products/product.store.js";
import {
  addToCart,
  decreaseQty,
  toggleCart,
} from "./src/features/cart/cart.store.js";

const dropdown = document.getElementById("categoryDropdown");
const trigger = dropdown.querySelector(".dropdown__trigger");
const menu = dropdown.querySelector(".dropdown__menu");
const selected = document.getElementById("selectedCategory");

document.addEventListener("DOMContentLoaded", () => {
  ProductsPage();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = e.target.dataset.id;
    addToCart(Number(id));
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

document.getElementById("priceRange").addEventListener("input", (e) => {
  setMaxPrice(Number(e.target.value));
  document.getElementById("priceLabel").textContent = e.target.value;
  ProductsPage();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-list__btn")) {
    const category = e.target.dataset.category;
    setCategory(category);
    ProductsPage();
  }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  setSearchText(e.target.value);
  ProductsPage();
});

// open/close dropdown
trigger.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

menu.addEventListener("click", (e) => {
  const value = e.target.dataset.value;
  if (!value) return;
  setSortText(value);
  selected.textContent = e.target.textContent;
  dropdown.classList.remove("open");
  ProductsPage();
});

document.querySelector(".cart-overlay").addEventListener("click", (e) => {
  const cartItem = e.target.closest(".cart-item");
  if (!cartItem) return;
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("cart-item__btn--increase")) {
    addToCart(id);
  }
  if (e.target.classList.contains("cart-item__btn--decrease")) {
    decreaseQty(id);
  }
  CartPage();
  ProductsPage();
});
