'use client';

import { openDB, DBSchema } from 'idb';
import { Agent, Transaction } from '@/types';

interface BrokerageDB extends DBSchema {
  agents: {
    key: string;
    value: Agent;
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-agent': string };
  };
}

const dbPromise = openDB<BrokerageDB>('brokerage-db', 1, {
  upgrade(db) {
    const agentStore = db.createObjectStore('agents', { keyPath: 'id' });
    
    const transactionStore = db.createObjectStore('transactions', { keyPath: 'id' });
    transactionStore.createIndex('by-agent', 'agentId');

    // Add initial data
    const initialAgents: Agent[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1234567890',
        balance: 15000,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1234567891',
        balance: 25000,
      },
    ];

    const initialTransactions: Transaction[] = [
      {
        id: '1',
        agentId: '1',
        amount: 5000,
        type: 'deposit',
        channel: 'Orange Money',
        timestamp: '2024-03-20T10:30:00Z',
        status: 'completed',
        description: 'Client deposit via Orange Money',
      },
      {
        id: '2',
        agentId: '1',
        amount: 2000,
        type: 'withdrawal',
        channel: 'PayPal',
        timestamp: '2024-03-19T15:45:00Z',
        status: 'completed',
        description: 'Client withdrawal through PayPal',
      },
      {
        id: '3',
        agentId: '2',
        amount: 10000,
        type: 'deposit',
        channel: 'Visa',
        timestamp: '2024-03-18T09:15:00Z',
        status: 'completed',
        description: 'Large client deposit',
      },
    ];

    initialAgents.forEach(agent => agentStore.put(agent));
    initialTransactions.forEach(transaction => transactionStore.put(transaction));
  },
});

export const dbOperations = {
  // Agent operations
  getAgents: async (): Promise<Agent[]> => {
    const db = await dbPromise;
    return db.getAll('agents');
  },

  getAgentById: async (id: string): Promise<Agent | undefined> => {
    const db = await dbPromise;
    return db.get('agents', id);
  },

  updateAgentBalance: async (id: string, amount: number, type: 'deposit' | 'withdrawal') => {
    const db = await dbPromise;
    const agent = await db.get('agents', id);
    if (!agent) return;

    const modifier = type === 'deposit' ? 1 : -1;
    agent.balance += amount * modifier;
    
    return db.put('agents', agent);
  },

  // Transaction operations
  getTransactions: async (): Promise<Transaction[]> => {
    const db = await dbPromise;
    const transactions = await db.getAll('transactions');
    return transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  getTransactionsByAgentId: async (agentId: string): Promise<Transaction[]> => {
    const db = await dbPromise;
    const transactions = await db.getAllFromIndex('transactions', 'by-agent', agentId);
    return transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  addTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const db = await dbPromise;
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