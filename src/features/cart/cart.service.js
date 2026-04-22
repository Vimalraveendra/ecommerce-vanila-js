const STORAGE_KEY = "cartItems";

export const loadCartItems = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCartItems = (cartItems) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
};

export const getCartTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
};
export const getCartCount = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
};
