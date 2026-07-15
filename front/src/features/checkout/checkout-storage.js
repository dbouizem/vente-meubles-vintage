const CHECKOUT_KEY = 'checkout';

export const loadCheckout = () => {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_KEY) || '{}');
  } catch {
    return {};
  }
};

export const saveCheckout = (data) => {
  const next = { ...loadCheckout(), ...data };
  sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(next));
  return next;
};

export const clearCheckout = () => sessionStorage.removeItem(CHECKOUT_KEY);
