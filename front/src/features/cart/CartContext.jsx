import { useEffect, useState } from 'react';
import { CartContext, DiscountContext } from './cart-context';

const CART_STORAGE_KEY = 'panier';

export function CartProvider({ children }) {
  const [panier, setPanier] = useState(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) return [];

    try {
      return JSON.parse(storedCart);
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(panier));
  }, [panier]);

  return (
    <CartContext.Provider value={{ panier, setPanier }}>
      <DiscountContext.Provider value={10}>{children}</DiscountContext.Provider>
    </CartContext.Provider>
  );
}
