'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { registerUser } from '../../action/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationForm, RegistrationFormType } from '@/lib/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {toast} from "sonner"

export function RegisterForm() {
  
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  const [state, dispatch] = useActionState(registerUser, undefined)
  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(RegistrationForm),
    defaultValues: {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    }
  })
  async function handleSubmit(data: RegistrationFormType){
    setLoading(true)
    React.startTransition(()=> {
      dispatch(data)
    })
  }
  useEffect(()=>{
    if(state?.error){
      setLoading(false)
      toast.error(state.error, {
        duration: 4000
      })
    } else if(state?.success){
      setLoading(false)
      toast.success(state.success, {
        duration: 4000
      })
      return redirect('/')
    } 
  }, [state?.error, state?.success])
  return (
      <div className="rounded-4xl w-100 flex flex-col gap-2 bg-zinc-50/50 shadow-xl shadow-blue-200 p-2">
        <div className='w-full h-full bg-white p-5 rounded-3xl'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex flex-col h-full justify-between">
              <h1 className='text-4xl font-medium'>Register</h1>
              <div className='space-y-5 h-full flex flex-col justify-between'>
                <FormField
                  control={form.control}
                  name="userName"
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Enter Passsword" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Re enter Passsword" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-xl p-6 cursor-pointer">
                    { 
                      loading && <Loader2 className='animate-spin' />
                    }
                  Register
                </Button>
                <span className='text-center text-sm'>
                  Already have an account? <Link href={'/login'} className='font-medium text-blue-600'>Login</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
  );
}
