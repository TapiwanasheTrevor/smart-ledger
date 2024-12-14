'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TransactionForm } from './transaction-form';
import { Agent } from '@/types';

interface AddTransactionButtonProps {
  agent: Agent;
  onTransactionAdded: () => void;
}

export function AddTransactionButton({ agent, onTransactionAdded }: AddTransactionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onTransactionAdded();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction for {agent.name}</DialogTitle>
        </DialogHeader>
        <TransactionForm agent={agent} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}