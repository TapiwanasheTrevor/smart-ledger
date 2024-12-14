'use client';

import { openDB } from 'idb';
import { BrokerageDB } from './schema';
import { initialAgents, initialTransactions } from './initial-data';

let dbPromise: ReturnType<typeof openDB<BrokerageDB>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<BrokerageDB>('brokerage-db', 1, {
      upgrade(db) {
        const agentStore = db.createObjectStore('agents', { keyPath: 'id' });
        const transactionStore = db.createObjectStore('transactions', { keyPath: 'id' });
        transactionStore.createIndex('by-agent', 'agentId');

        initialAgents.forEach(agent => agentStore.put(agent));
        initialTransactions.forEach(transaction => transactionStore.put(transaction));
      },
    });
  }
  return dbPromise;
};