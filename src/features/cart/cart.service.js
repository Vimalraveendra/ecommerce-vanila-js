export const getCartTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
};
export const getCartCount = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
};
