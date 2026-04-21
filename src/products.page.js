import {
  setProducts,
  getFilters,
} from "../features/products/products.store.js";
import { getVisibleProducts } from "../features/products/products.service.js";
import {
  renderProducts,
  renderSidebar,
} from "../features/products/products.ui.js";
import { fetchProducts } from "../features/products/products.api.js";
import { getCartCount } from "../features/cart/cart.store.js";

export async function ProductsPage() {
  const products = await fetchProducts();
  setProducts(products);
  const filters = getFilters();
  const filteredProducts = getVisibleProducts(products, filters);
  const container = document.getElementById("productsGrid");
  renderProducts(filteredProducts, container);
  renderSidebar(products, filters.category);
  const count = getCartCount();
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
}
