import { Agent } from '@/types';
import { getDB } from '../connection';

export const agentOperations = {
  getAgents: async (): Promise<Agent[]> => {
    const db = await getDB();
    return db.getAll('agents');
  },

  getAgentById: async (id: string): Promise<Agent | undefined> => {
    const db = await getDB();
    return db.get('agents', id);
  },

  updateAgentBalance: async (id: string, amount: number, type: 'deposit' | 'withdrawal') => {
    const db = await getDB();
    const agent = await db.get('agents', id);
    if (!agent) return;

    const modifier = type === 'deposit' ? 1 : -1;
    agent.balance += amount * modifier;
    
    return db.put('agents', agent);
  },
};