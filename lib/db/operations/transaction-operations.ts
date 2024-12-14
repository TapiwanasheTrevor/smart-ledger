import { Transaction } from '@/types';
import { getDB } from '../connection';

export const transactionOperations = {
  getTransactions: async (): Promise<Transaction[]> => {
    const db = await getDB();
    const transactions = await db.getAll('transactions');
    return transactions.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  getTransactionsByAgentId: async (agentId: string): Promise<Transaction[]> => {
    const db = await getDB();
    const transactions = await db.getAllFromIndex('transactions', 'by-agent', agentId);
    return transactions.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  addTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const db = await getDB();
    const id = Math.random().toString(36).substr(2, 9);
    const newTransaction = { ...transaction, id };

    // Start a transaction with 'readwrite' mode
    const tx = await db.transaction(['transactions', 'agents'], 'readwrite');
    
    // Get the object stores
    const transactionStore = tx.objectStore('transactions');
    const agentsStore = tx.objectStore('agents');

    // Add the new transaction
    await transactionStore.add(newTransaction);

    // Retrieve the agent associated with the transaction
    const agent = await agentsStore.get(transaction.agentId);
    
    if (agent) {
      const modifier = transaction.type === 'deposit' ? 1 : -1;
      agent.balance += transaction.amount * modifier;

      // Update the agent's balance in the database
      await agentsStore.put(agent);
    }

    // Wait for the transaction to complete
    await tx.done;

    return newTransaction;
  },
};
