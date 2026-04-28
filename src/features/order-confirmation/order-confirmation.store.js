import { loadOrder, saveOrder } from "./order-confirmation.service.js";

export const orderStore = {
  order: loadOrder(),
};

export const setOrder = (total) => {
  const orderNum = Math.floor(100000 + Math.random() * 900000);

  orderStore.order = { orderNum: orderNum, total };
  saveOrder(orderStore.order);
};

export const getOrder = () => {
  return orderStore.order;
};
