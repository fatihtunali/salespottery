'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyWithRate } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyWithRate;
  currencies: CurrencyWithRate[];
  setCurrency: (currency: CurrencyWithRate) => void;
  loading: boolean;
}

const defaultCurrency: CurrencyWithRate = {
  code: 'EUR',
  name: 'Euro',
  symbol: '€',
  rate: 1.0,
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  currencies: [],
  setCurrency: () => {},
  loading: true,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyWithRate>(defaultCurrency);
  const [currencies, setCurrencies] = useState<CurrencyWithRate[]>([]);
  const [loading, setLoading] = useState(true);

  // Load currencies from API on mount
  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      const response = await fetch('/api/currencies');
      const data = await response.json();

      if (data.currencies) {
        setCurrencies(data.currencies);

        // Try to load saved currency preference
        const savedCurrencyCode = localStorage.getItem('selected_currency');
        if (savedCurrencyCode) {
          const savedCurrency = data.currencies.find(
            (c: CurrencyWithRate) => c.code === savedCurrencyCode
          );
          if (savedCurrency) {
            setCurrencyState(savedCurrency);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load currencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const setCurrency = (newCurrency: CurrencyWithRate) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('selected_currency', newCurrency.code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, currencies, setCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
