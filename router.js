import { ProductsPage } from "./src/pages/products.page.js";
import { ProductDetailsPage } from "./src/pages/product-details.page.js";
import { CheckoutPage } from "./src/pages/checkout.page.js";
import { OrderConfirmationPage } from "./src/pages/order-confirmation.page.js";

export function router() {
  const path = window.location.hash.slice(1) || "/";
  const id = path.startsWith("/products/") && path.split("/")[2];

  const routes = [
    {
      match: (path) => path === "/",
      view: () => ProductsPage(),
    },
    {
      match: (path) => path.startsWith("/products/"),
      view: () => ProductDetailsPage({ id }),
    },
    {
      match: (path) => path === "/checkout",
      view: () => CheckoutPage(),
    },
    {
      match: (path) => path === "/order-confirmation",
      view: () => OrderConfirmationPage(),
    },
  ];

  for (let route of routes) {
    if (route.match(path)) {
      return route.view();
    }
  }
}

export function navigate(path) {
  window.location.hash = path;
}
