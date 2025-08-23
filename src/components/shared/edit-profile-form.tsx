'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '@/action/auth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { User } from '@/lib/prisma';
import { UpdateProfileForm, UpdateProfileFormType } from '@/lib/schema';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { getUser } from '@/action/user';
import { Scrypt } from 'lucia';
import { uploadImage } from '@/action/utils';
import { ProfileUploader } from './profile-image-upload';
import { redirect, useRouter } from 'next/navigation';

export function EditProfileForm({userId}:{userId: string}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useActionState(updateUserProfile, undefined)
  const [image,setImage] = useState('')

  const form = useForm<UpdateProfileFormType>({
    resolver: zodResolver(UpdateProfileForm),
    defaultValues: {
      userName: '',
      password: '',
      bio: '',
      avatarUrl: ''
    }
  });

  useEffect(()=>{
    async function fetchUser() {
      const { user } = await getUser(userId)
      form.reset(
        {
          userName: user?.username ?? '',
          password:  '',
          bio: user?.bio ?? '',
          avatarUrl: user?.avatarUrl ?? '',
        }
      )
      user?.avatarUrl &&
        setImage( user.avatarUrl)
    }
    fetchUser()
  },[userId])
  
  useEffect(()=>{
    form.setValue('avatarUrl', image)
  },[image])




  async function handleSubmit(data: UpdateProfileFormType) {
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
      router.push('/settings/profile')
    }
  }, [state?.error, state?.success]);


  
  return (
    <div >
      <div className='w-full h-[85dvh] text-black dark:text-white bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-4 border   p-5 rounded-3xl'>
        <div>
          <h1 className='text-2xl font-medium' >Edit Profile</h1>
          <p>This information will be displayed on your public profile.</p>
        </div>
        <Separator/>
        <div className="grid grid-cols-3 items-center">
          <div>
            <h2 className="text-lg">Profile Picture</h2>
          </div>

          <div className="col-span-2 flex items-center gap-4">
            <ProfileUploader image={image} setImage={(img)=>setImage(img || '')} />
          </div>
        </div>

        <Separator/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 ">
            <div className='space-y-5 h-full flex flex-col justify-between'>
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className='grid grid-cols-3' >
                    <FormLabel>Username</FormLabel>
                    <FormControl className='col-span-2' >
                      <Input placeholder="Enter your new username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='grid grid-cols-3' >
                    <FormLabel>Password</FormLabel>
                    <FormControl className='col-span-2' >
                      <Input placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className='grid grid-cols-3' >
                    <FormLabel>Bio</FormLabel>
                    <FormControl className='col-span-2' >
                      <Textarea placeholder="Enter your new bio" {...field} className='resize-none overflow-y-auto h-20' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-full flex gap-2 justify-end ' >
                <Button  type="submit" className="text-black rounded-lg bg-yellow-400 hover:bg-yellow-300 cursor-pointer">
                  {loading && <Loader2 className='animate-spin' />}
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
