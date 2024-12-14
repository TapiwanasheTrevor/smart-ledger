'use client';

import { Agent } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { AgentContact } from './agent-contact';
import { AgentBalance } from './agent-balance';

interface AgentCardProps {
  agent: Agent;
  isSelected?: boolean;
  onClick?: () => void;
}

export function AgentCard({ agent, isSelected, onClick }: AgentCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <AgentContact email={agent.email} phone={agent.phone} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <AgentBalance balance={agent.balance} />
        </div>
      </CardContent>
    </Card>
  );
}