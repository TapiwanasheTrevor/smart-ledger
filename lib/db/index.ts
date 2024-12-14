import { agentOperations } from './operations/agent-operations';
import { transactionOperations } from './operations/transaction-operations';

export const dbOperations = {
  ...agentOperations,
  ...transactionOperations,
};