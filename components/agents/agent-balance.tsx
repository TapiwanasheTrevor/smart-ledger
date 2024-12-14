'use client';

interface AgentBalanceProps {
  balance: number;
  currency?: string;
}

export function AgentBalance({ 
  balance, 
  currency = 'USD' 
}: AgentBalanceProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(balance);

  return (
    <div className="font-medium">{formatted}</div>
  );
}