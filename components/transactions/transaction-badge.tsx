'use client';

import { Badge } from '@/components/ui/badge';
import { TransactionType } from '@/types';

interface TransactionBadgeProps {
  type: TransactionType | string;
  variant?: 'type' | 'status' | 'channel';
}

export function TransactionBadge({ type, variant = 'type' }: TransactionBadgeProps) {
  const getVariant = () => {
    if (variant === 'type') {
      return type === 'deposit' ? 'default' : 'destructive';
    }
    if (variant === 'status') {
      return type === 'completed'
        ? 'success'
        : type === 'pending'
        ? 'warning'
        : 'destructive';
    }
    return 'outline';
  };

  return (
    <Badge variant={getVariant()}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
}