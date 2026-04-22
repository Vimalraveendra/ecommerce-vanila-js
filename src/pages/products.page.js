import { setProducts, getFilters } from "../features/products/product.store.js";
import { getVisibleProducts } from "../features/products/products.service.js";
import {
  renderProducts,
  renderSidebar,
} from "../features/products/products.ui.js";

import { fetchProducts } from "../features/products/product.api.js";
import { getCartItems } from "../features/cart/cart.store.js";
import { getCartCount } from "../features/cart/cart.service.js";

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
}
