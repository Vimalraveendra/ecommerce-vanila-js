let STORAGE_KEY = "order";

export const saveOrder = (order) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
};

export const loadOrder = () => {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { orderNum: 0, total: 0 };
};
