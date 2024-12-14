'use client';

interface TransactionAmountProps {
  amount: number;
  currency?: string;
}

export function TransactionAmount({ 
  amount, 
  currency = 'USD' 
}: TransactionAmountProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

  return <div className="font-medium">{formatted}</div>;
}