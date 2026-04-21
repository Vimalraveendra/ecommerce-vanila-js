import { getProducts } from "../products/product.store.js";
import { updateCartCount, updateCartTotal } from "./cart.service.js";

export const cartStore = {
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false,
};
export const getCartItems = () => {
  return [...cartStore.cartItems];
};

export const getCartTotal = () => {
  return cartStore.cartTotal;
};
export const getCartCount = () => {
  return cartStore.cartCount;
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
  cartStore.cartCount = updateCartCount(cartStore);
  cartStore.cartTotal = updateCartTotal(cartStore);
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
  cartStore.cartCount = updateCartCount(cartStore);
  cartStore.cartTotal = updateCartTotal(cartStore);
};

export const toggleCart = () => {
  return (cartStore.isCartOpen = !cartStore.isCartOpen);
};

export const inCartItem = (id) =>
  cartStore.cartItems.find((item) => item.id === id);
