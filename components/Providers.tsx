'use client';

import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>{children}</CartProvider>
    </CurrencyProvider>
  );
}
