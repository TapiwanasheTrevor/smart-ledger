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

    await db.transaction(['transactions', 'agents'], 'readwrite', async (tx) => {
      await tx.objectStore('transactions').add(newTransaction);
      const agent = await tx.objectStore('agents').get(transaction.agentId);
      
      if (agent) {
        const modifier = transaction.type === 'deposit' ? 1 : -1;
        agent.balance += transaction.amount * modifier;
        await tx.objectStore('agents').put(agent);
      }
    });

    return newTransaction;
  },
};