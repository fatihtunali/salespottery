// Currency conversion utilities

export interface CurrencyWithRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

/**
 * Convert price from EUR (base currency) to target currency
 * @param priceEUR Price in EUR (base currency)
 * @param targetRate Exchange rate for target currency
 * @returns Converted price
 */
export function convertPrice(priceEUR: number, targetRate: number): number {
  return priceEUR * targetRate;
}

/**
 * Format price with currency symbol
 * @param price Price amount
 * @param currency Currency object with symbol and code
 * @param locale Optional locale for formatting (default: 'en-US')
 * @returns Formatted price string
 */
export function formatPrice(
  price: number,
  currency: { symbol: string; code: string },
  locale: string = 'en-US'
): string {
  // For Turkish Lira, use Turkish locale
  if (currency.code === 'TRY') {
    locale = 'tr-TR';
  } else if (currency.code === 'EUR') {
    locale = 'de-DE'; // Euro format
  } else if (currency.code === 'GBP') {
    locale = 'en-GB'; // British format
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Convert and format price in one step
 * @param priceEUR Price in EUR
 * @param currency Currency with rate and symbol
 * @param locale Optional locale
 * @returns Formatted price in target currency
 */
export function convertAndFormatPrice(
  priceEUR: number,
  currency: CurrencyWithRate,
  locale?: string
): string {
  const convertedPrice = convertPrice(priceEUR, currency.rate);
  return formatPrice(convertedPrice, currency, locale);
}

/**
 * Get currency symbol by code
 */
export function getCurrencySymbol(code: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    TRY: '₺',
  };
  return symbols[code] || code;
}

/**
 * Parse currency code from localStorage
 */
export function getSavedCurrency(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('selected_currency');
}

/**
 * Save currency code to localStorage
 */
export function saveCurrency(code: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('selected_currency', code);
}
