'use client';

import { Agent } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, Wallet } from 'lucide-react';

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
        <CardDescription className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {agent.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {agent.phone}
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(agent.balance)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}