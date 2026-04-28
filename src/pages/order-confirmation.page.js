import { getOrder } from "../features/order-confirmation/order-confirmation.store.js";
import { renderOrderConfirmation } from "../features/order-confirmation/order-confirmation.ui.js";
import { navigate } from "../../router.js";

export function OrderConfirmationPage() {
  const container = document.getElementById("main");
  const order = getOrder();
  renderOrderConfirmation(container, order.orderNum, order.total);

  document
    .getElementById("continueBtn")
    .addEventListener("click", () => navigate("/"));
}
