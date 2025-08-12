'use client';

import { LoginAccountForm } from '@/components/shared/login-form';
import { redirectIfAuthenticated } from '@/lib/login-required';
export default async function Login() {
  // const user
  // await redirectIfAuthenticated()
  return (
    <div className='h-dvh w-full flex bg-gradient-to-br from-blue-100 to-emerald-100 items-center justify-center'>
      <LoginAccountForm/>
    </div>
  );
}
