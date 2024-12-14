'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { TransactionBadge } from './transaction-badge';
import { TransactionAmount } from './transaction-amount';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'timestamp',
    header: 'When',
    cell: ({ row }) => {
      const date = new Date(row.getValue('timestamp'));
      return formatDistanceToNow(date, { addSuffix: true });
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <TransactionBadge 
        type={row.getValue('type')} 
        variant="type" 
      />
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <TransactionAmount amount={parseFloat(row.getValue('amount'))} />
    ),
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => (
      <TransactionBadge 
        type={row.getValue('channel')} 
        variant="channel" 
      />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <TransactionBadge 
        type={row.getValue('status')} 
        variant="status" 
      />
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];