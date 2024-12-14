'use client';

import { Mail, Phone } from 'lucide-react';

interface AgentContactProps {
  email: string;
  phone: string;
}

export function AgentContact({ email, phone }: AgentContactProps) {
  return (
    <span className="flex flex-col gap-2">
      <span className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        {email}
      </span>
      <span className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        {phone}
      </span>
    </span>
  );
}