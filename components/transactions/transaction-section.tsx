'use client';

import { Agent, Transaction } from '@/types';
import { TransactionsTable } from './transactions-table';
import { AddTransactionButton } from './add-transaction-button';

interface TransactionSectionProps {
  transactions: Transaction[];
  selectedAgent: Agent | undefined;
  onTransactionAdded: () => void;
}

export function TransactionSection({
  transactions,
  selectedAgent,
  onTransactionAdded,
}: TransactionSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {selectedAgent
            ? `Transactions for ${selectedAgent.name}`
            : 'All Transactions'}
        </h2>
        {selectedAgent && (
          <AddTransactionButton
            agent={selectedAgent}
            onTransactionAdded={onTransactionAdded}
          />
        )}
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}