'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { convertAndFormatPrice } from '@/lib/currency';

interface PriceProps {
  amount: number;
  className?: string;
}

export default function Price({ amount, className = '' }: PriceProps) {
  const { currency } = useCurrency();

  return (
    <span className={className}>
      {convertAndFormatPrice(amount, currency)}
    </span>
  );
}
