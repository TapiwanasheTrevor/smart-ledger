'use client';

import { Transaction } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return <DataTable columns={columns} data={transactions} />;
}