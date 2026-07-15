import { createContext } from 'react';

export const CartContext = createContext({
  panier: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});
export const DiscountContext = createContext(10);
