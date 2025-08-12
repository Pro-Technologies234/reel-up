'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../../action/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm, LoginFormType, RegistrationForm, RegistrationFormType } from '@/lib/schema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {toast} from "sonner"
import Image from 'next/image';
import img from '@/assets/images/7686.jpg'
import { redirectIfAuthenticated } from '@/lib/login-required';
export  function LoginAccountForm() {
  const [loading,setLoading] = useState(false)
  const [state, dispatch] = useActionState(loginUser, undefined)
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
    email: '',
    password: '',
    }
  })
  async function handleSubmit(data: LoginFormType){
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
      return redirect('/feed')
    } 
  }, [state?.error, state?.success])
  return (
      <div className="rounded-4xl w-200 h-120 grid grid-cols-2 bg-zinc-50/50  shadow-xl shadow-blue-200 p-2">
        <div className='w-full h-full bg-white relative p-5 rounded-l-3xl overflow-hidden'>
          <div className='absolute inset-0' >
            <Image src={img} alt='img.png' className='object-cover w-full h-full' />
          </div>
        </div>
        <div className='w-full h-full bg-white p-5 rounded-r-3xl'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex flex-col h-full justify-between">
              <h1 className='text-4xl font-medium'>Login to account</h1>
              <div className='space-y-5 h-full flex flex-col justify-center'>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Enter Passsword" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-xl p-6 cursor-pointer">
                    { 
                      loading && <Loader2 className='animate-spin' />
                    }
                  Login
                </Button>
                <span className='text-center text-sm'>
                  Don't have an account? <Link href={'/register'} className='font-medium text-blue-600'>Register</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
  );
}
