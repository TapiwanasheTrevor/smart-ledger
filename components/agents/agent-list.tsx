'use client';

import { Agent } from '@/types';
import { AgentCard } from './agent-card';

interface AgentListProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onAgentSelect: (id: string | null) => void;
}

export function AgentList({ agents, selectedAgentId, onAgentSelect }: AgentListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isSelected={agent.id === selectedAgentId}
            onClick={() => onAgentSelect(
              agent.id === selectedAgentId ? null : agent.id
            )}
          />
        ))}
      </div>
    </div>
  );
}