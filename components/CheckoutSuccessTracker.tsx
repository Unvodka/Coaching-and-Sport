'use client';

import { useEffect } from 'react';
import { trackPurchase } from '@/components/Analytics';

interface Props {
  value: number;
  transactionId?: string;
}

export default function CheckoutSuccessTracker({ value, transactionId }: Props) {
  useEffect(() => {
    trackPurchase(value, 'EUR', transactionId);
  }, [value, transactionId]);

  return null;
}
