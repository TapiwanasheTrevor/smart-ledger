import { DBSchema } from 'idb';
import { Agent, Transaction } from '@/types';

export interface BrokerageDB extends DBSchema {
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