import {
  setProducts,
  getFilters,
  setCategory,
  setMaxPrice,
  setSearchText,
  setSortText,
} from "../features/products/product.store.js";
import { getVisibleProducts } from "../features/products/products.service.js";
import {
  renderProducts,
  renderSidebar,
} from "../features/products/products.ui.js";

import { fetchProducts } from "../features/products/product.api.js";
import { getCartItems } from "../features/cart/cart.store.js";
import { getCartCount } from "../features/cart/cart.service.js";
import { navigate } from "../../router.js";

export async function ProductsPage() {
  const products = await fetchProducts();
  setProducts(products);
  const filters = getFilters();
  const filteredProducts = getVisibleProducts(products, filters);
  const container = document.getElementById("productsGrid");
  renderProducts(filteredProducts, container);
  renderSidebar(products, filters.category);
  const cartItems = getCartItems();
  const count = getCartCount(cartItems);
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";

  const dropdown = document.getElementById("categoryDropdown");
  const trigger = dropdown.querySelector(".dropdown__trigger");
  const menu = dropdown.querySelector(".dropdown__menu");
  const selected = document.getElementById("selectedCategory");

  const updateUIView = () => {
    const filteredProducts = getVisibleProducts(products, filters);
    renderProducts(filteredProducts, container);
  };

  // FILTER PRODUCTS BY CATEGORY
  document.getElementById("categoryFilters").addEventListener("click", (e) => {
    const category = e.target.dataset.category;
    setCategory(category);
    updateUIView();
    renderSidebar(products, filters);
  });

  // FILTER PRODUCTS BY PRICE RANGE
  document.getElementById("priceRange").addEventListener("input", (e) => {
    setMaxPrice(Number(e.target.value));
    document.getElementById("priceLabel").textContent = e.target.value;
    updateUIView();
  });

  // FILTER PRODUCTS BY SEARCH TEXT
  document.getElementById("searchInput").addEventListener("input", (e) => {
    setSearchText(e.target.value);
    updateUIView();
  });

  // // open/close dropdown
  trigger.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  // FILTER PRODUCTS BY DROPDOWN VALUES
  menu.addEventListener("click", (e) => {
    const value = e.target.dataset.value;
    if (!value) return;
    setSortText(value);
    updateUIView();
    selected.textContent = e.target.textContent;
    dropdown.classList.remove("open");
  });

  // NAVIGATE TO PRODUCT DETAILS
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".product-card__img");
    if (!img) return;
    const id = img.dataset.id;
    navigate(`/products/${id}`);
  });
}
