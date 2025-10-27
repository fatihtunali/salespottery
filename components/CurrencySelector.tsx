'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function CurrencySelector() {
  const { currency, currencies, setCurrency, loading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading || currencies.length === 0) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600">
        <span>{currency.symbol} {currency.code}</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span>{currency.symbol} {currency.code}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                curr.code === currency.code
                  ? 'bg-amber-50 text-amber-900 font-medium'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{curr.symbol} {curr.code}</span>
                <span className="text-xs text-gray-500">{curr.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
