import { PROMO_CODES } from "./checkout.config.js";

export const calculateTotals = ({
  cartTotal,
  discount = 0,
  taxRate = 0.08,
}) => {
  const discountedAmount = cartTotal * discount;
  const discountedSubTotal = cartTotal - discountedAmount;
  const tax = discountedSubTotal * taxRate;
  const grandTotal = discountedSubTotal + tax;
  return {
    subtotal: cartTotal,
    tax,
    discount: discountedAmount,
    grandTotal,
  };
};

export function validatePromoCode(code) {
  return PROMO_CODES.includes(code);
}
