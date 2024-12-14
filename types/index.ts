export type PaymentChannel = 'Orange Money' | 'PayPal' | 'Visa' | 'Mastercard';

export type TransactionType = 'deposit' | 'withdrawal';

export interface Transaction {
  id: string;
  agentId: string;
  amount: number;
  type: TransactionType;
  channel: PaymentChannel;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
}