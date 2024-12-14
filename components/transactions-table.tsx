'use client';

import { Transaction } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Date',
    cell: ({ row }) => {
      return format(new Date(row.getValue('timestamp')), 'MMM dd, yyyy HH:mm');
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge
          variant={type === 'deposit' ? 'default' : 'destructive'}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'channel',
    header: 'Payment Channel',
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {row.getValue('channel')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'completed'
              ? 'success'
              : status === 'pending'
              ? 'warning'
              : 'destructive'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return <DataTable columns={columns} data={transactions} />;
}