import { getProducts } from "../products/product.store.js";
import { loadCartItems, saveCartItems } from "./cart.service.js";

export const cartStore = {
  cartItems: loadCartItems(),
  isCartOpen: false,
};
export const getCartItems = () => {
  return [...cartStore.cartItems];
};

export const addToCart = (id) => {
  const existingCartProduct = cartStore.cartItems.find(
    (item) => item.id === id,
  );
  if (existingCartProduct) {
    existingCartProduct.qty++;
  } else {
    const product = getProducts().find((p) => p.id === id);
    cartStore.cartItems.push({ ...product, qty: 1 });
  }
  saveCartItems(cartStore.cartItems);
};

export const removeFromCart = (id) => {
  cartStore.cartItems = cartStore.cartItems.filter((item) => item.id !== id);
};

export const decreaseQty = (id) => {
  const item = cartStore.cartItems.find((item) => item.id === id);
  if (item && item.qty > 1) {
    item.qty--;
  } else {
    removeFromCart(id);
  }
  saveCartItems(cartStore.cartItems);
};

export const toggleCart = () => {
  return (cartStore.isCartOpen = !cartStore.isCartOpen);
};

export const inCartItem = (id) =>
  cartStore.cartItems.find((item) => item.id === id);
