import {
  renderProductNotFound,
  renderProductDetails,
} from "../features/product-details/product-details.ui.js";
import { CartPage } from "../pages/cart.page.js";
import { addToCart } from "../features/cart/cart.store.js";
import { showToast } from "../../utils.js";

export function ProductDetailsPage({ id }) {
  const container = document.getElementById("main");
  if (!id) {
    renderProductNotFound(container);
    return;
  }
  const product = getProductById(Number(id));
  renderProductDetails(product, container);

  const qtyIncBtn = document.getElementById("qtyIncrease");
  const qtyDecBtn = document.getElementById("qtyDecrease");
  let qty = 1;

  // DECREASE QTY OF PRODUCTS
  qtyDecBtn.addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      document.getElementById("qtyNum").textContent = qty;
    }
  });
  // INCREASE QTY OF PRODUCTS
  qtyIncBtn.addEventListener("click", () => {
    if (qty < 5) {
      qty++;
      document.getElementById("qtyNum").textContent = qty;
    }
  });

  // ADD PRODUCT TO CART
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(Number(id), qty);
    CartPage();
    showToast(`${product.title.slice(0, 30)}... added to cart`);
  });
}
