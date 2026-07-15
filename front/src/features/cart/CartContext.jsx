import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext, DiscountContext } from './cart-context';

const CART_STORAGE_KEY = 'panier';
const normalizeStock = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 1;
};

const normalizeCart = (items) => {
  if (!Array.isArray(items)) return [];

  return Object.values(
    items.reduce((cart, item) => {
      const id = Number(item?.id);
      if (!Number.isInteger(id) || id < 1) return cart;
      const stock = normalizeStock(item.stock);
      const quantity = Math.min(stock, Math.max(1, Number.parseInt(item.quantity, 10) || 1));

      if (cart[id]) {
        cart[id].quantity = Math.min(stock, cart[id].quantity + quantity);
      } else {
        cart[id] = { ...item, id, stock, quantity };
      }
      return cart;
    }, {}),
  );
};

export function CartProvider({ children }) {
  const [panier, setPanier] = useState(() => {
    try {
      return normalizeCart(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'));
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(panier));
  }, [panier]);

  const addItem = useCallback((product) => {
    setPanier((current) => {
      const existing = current.find((item) => item.id === Number(product.id));
      const stock = normalizeStock(product.stock);
      if (existing) {
        return current.map((item) =>
          item.id === existing.id
            ? { ...item, stock, quantity: Math.min(stock, item.quantity + 1) }
            : item,
        );
      }
      return [...current, { ...product, id: Number(product.id), stock, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setPanier((current) =>
      current.map((item) =>
        item.id === Number(id)
          ? { ...item, quantity: Math.min(item.stock, Math.max(1, Number(quantity) || 1)) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id) => {
    setPanier((current) => current.filter((item) => item.id !== Number(id)));
  }, []);

  const clearCart = useCallback(() => setPanier([]), []);
  const itemCount = panier.reduce((total, item) => total + item.quantity, 0);
  const subtotal = panier.reduce(
    (total, item) => total + (Number.parseFloat(item.prix) || 0) * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({ panier, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal }),
    [addItem, clearCart, itemCount, panier, removeItem, subtotal, updateQuantity],
  );

  return (
    <CartContext.Provider value={value}>
      <DiscountContext.Provider value={10}>{children}</DiscountContext.Provider>
    </CartContext.Provider>
  );
}
