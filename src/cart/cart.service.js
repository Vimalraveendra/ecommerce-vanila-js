export const updateCartTotal = (cartStore) => {
  return cartStore.cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
};
export const updateCartCount = (cartStore) => {
  return cartStore.cartItems.reduce((sum, item) => sum + item.qty, 0);
};
