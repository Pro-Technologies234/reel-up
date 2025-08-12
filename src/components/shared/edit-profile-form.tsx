'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '@/action/auth';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Simplified Zod Schema for Username Only
const UsernameForm = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long")
});
type UsernameFormType = z.infer<typeof UsernameForm>;

export function EditProfileForm() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useActionState(updateUserProfile, undefined);

  const form = useForm<UsernameFormType>({
    resolver: zodResolver(UsernameForm),
    defaultValues: {
      username: ''
    }
  });

  async function handleSubmit(data: UsernameFormType) {
    setLoading(true);
    React.startTransition(() => {
      dispatch(data);
    });
  }

  useEffect(() => {
    if (state?.error) {
      setLoading(false);
      toast.error(state.error, { duration: 4000 });
    } else if (state?.success) {
      setLoading(false);
      toast.success(state.success, { duration: 4000 });
    }
  }, [state?.error, state?.success]);

  return (
    <div className="rounded-4xl w-100 flex flex-col gap-2 bg-zinc-50/50 shadow-xl shadow-blue-200 p-2">
      <div className='w-full h-full bg-white p-5 rounded-3xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex flex-col h-full justify-between">
            <h1 className='text-4xl font-medium'>Edit Username</h1>
            <div className='space-y-5 h-full flex flex-col justify-between'>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl p-6 cursor-pointer">
                {loading && <Loader2 className='animate-spin' />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
