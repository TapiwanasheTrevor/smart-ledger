'use client';

import { useState, useEffect } from 'react';
import { Agent, Transaction } from '@/types';
import { AgentList } from '@/components/agents/agent-list';
import { TransactionSection } from '@/components/transactions/transaction-section';
import { dbOperations } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedAgents, loadedTransactions] = await Promise.all([
          dbOperations.getAgents(),
          dbOperations.getTransactions(),
        ]);
        setAgents(loadedAgents);
        setTransactions(loadedTransactions);
      } catch (error) {
        toast({
          title: 'Error loading data',
          description: 'Please refresh the page to try again',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [toast]);

  const handleTransactionAdded = async () => {
    try {
      const [updatedAgents, updatedTransactions] = await Promise.all([
        dbOperations.getAgents(),
        dbOperations.getTransactions(),
      ]);
      setAgents(updatedAgents);
      setTransactions(updatedTransactions);
    } catch (error) {
      toast({
        title: 'Error refreshing data',
        description: 'Please refresh the page to see the latest changes',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);
  const filteredTransactions = selectedAgentId
    ? transactions.filter((t) => t.agentId === selectedAgentId)
    : transactions;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Brokerage Service Management</h1>
      
      <AgentList
        agents={agents}
        selectedAgentId={selectedAgentId}
        onAgentSelect={setSelectedAgentId}
      />

      <TransactionSection
        transactions={filteredTransactions}
        selectedAgent={selectedAgent}
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
}