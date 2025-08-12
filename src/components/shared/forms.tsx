'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductForm, CreateProductFormType, CreateReelForm, CreateReelFormType } from '@/lib/schema';
import { createProduct } from "@/action/products";
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { ImageUploader } from "./image-uploader"; // <- Make sure it's connected
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { CategorySelect } from './category-select';
import { createReel } from '@/action/reel';
import VideoInput from './video-uploader';

export function CreateProductDialog() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const form = useForm<CreateProductFormType>({
    resolver: zodResolver(CreateProductForm),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    }
  });

  async function onSubmit(data: CreateProductFormType) {
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);

    const payload = {
      ...data,
      description: data.description ?? "",  // Ensure description is never undefined
      images,
    };


    const result = await createProduct(null, payload);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success(result.success!);
      setLoading(false);
      setOpen(false)
      redirect('/discover');
    }
  }

  return (
    <Dialog open={open} onOpenChange={(lastState)=>setOpen(lastState)} >
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'outline'} className='cursor-pointer'>
          <ShoppingBag />
          Create a Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]  rounded-3xl grid md:grid-cols-2">
        <ImageUploader images={images} setImages={setImages} />
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create a new product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your product name" {...field} />
                      </FormControl>
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
                        <Input placeholder="Enter your product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} 
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} 
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <CategorySelect  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading} className='cursor-pointer' >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export function CreateReelDialog() {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const form = useForm<CreateReelFormType>({
    resolver: zodResolver(CreateReelForm),
    defaultValues: {
      name: '',
      caption: '',
    }
  });

  async function onSubmit(data: CreateReelFormType) {
    if (!video) {
      toast.error("Please upload a video.");
      return;
    }

    setLoading(true);

    const payload = {
      ...data,
      caption: data.caption ?? "",  // Ensure description is never undefined
      video,
    };


    const result = await createReel(null, payload);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success(result.success!);
      setLoading(false);
      setOpen(false)
      redirect('/shop');
    }
  }

  return (
    <Dialog open={open} onOpenChange={(lastState)=>setOpen(lastState)} >
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'outline'} className='cursor-pointer'>
          <ShoppingBag />
          Create a reel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]  rounded-3xl grid md:grid-cols-2">
        {/* <ImageUploader images={images} setImages={setImages} /> */}
        <VideoInput setVideo={(prev)=>setVideo(prev || '')} />
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create a new reel</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} 
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <CategorySelect  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading} className='cursor-pointer' >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
