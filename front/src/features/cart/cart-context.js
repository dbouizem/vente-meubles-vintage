import { createContext } from 'react';

export const CartContext = createContext({ panier: [], setPanier: () => {} });
export const DiscountContext = createContext(10);
