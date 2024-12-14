'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Agent, PaymentChannel, TransactionType } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { dbOperations } from '@/lib/db';

const transactionSchema = z.object({
  type: z.enum(['deposit', 'withdrawal']),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  channel: z.enum(['Orange Money', 'PayPal', 'Visa', 'Mastercard']),
  description: z.string().min(1, 'Description is required'),
});

interface TransactionFormProps {
  agent: Agent;
  onSuccess: () => void;
}

export function TransactionForm({ agent, onSuccess }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'deposit',
      amount: '',
      channel: 'Orange Money',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    setIsSubmitting(true);
    try {
      const transaction = {
        amount: parseFloat(values.amount),
        agentId: agent.id,
        timestamp: new Date().toISOString(),
        status: 'completed' as const,
        type: values.type as TransactionType,
        channel: values.channel as PaymentChannel,
        description: values.description,
      };

      await dbOperations.addTransaction(transaction);
      
      toast({
        title: 'Success',
        description: `${values.type} of ${values.amount} added successfully`,
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add transaction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const transactionTypes: TransactionType[] = ['deposit', 'withdrawal'];
  const paymentChannels: PaymentChannel[] = ['Orange Money', 'PayPal', 'Visa', 'Mastercard'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Channel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentChannels.map((channel) => (
                    <SelectItem key={channel} value={channel}>
                      {channel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter transaction details"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </Button>
      </form>
    </Form>
  );
}