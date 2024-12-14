import { Agent, Transaction } from '@/types';

export const agents: Agent[] = [
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

export const transactions: Transaction[] = [
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