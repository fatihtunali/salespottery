'use client';

import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>{children}</CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
