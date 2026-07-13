import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../features/cart/CartContext';

function AppProviders({ children }) {
  return (
    <CartProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </CartProvider>
  );
}

export default AppProviders;
