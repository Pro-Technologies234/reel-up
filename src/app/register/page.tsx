import { redirectIfAuthenticated } from '@/lib/login-required';
import { RegisterForm } from '@/components/shared/register-form';

export default async function Register() {
  await redirectIfAuthenticated()
  return (
    <div className='h-dvh w-full flex bg-gradient-to-br from-blue-100 to-emerald-100 items-center justify-center'>
      <RegisterForm/>
    </div>
  );
}
