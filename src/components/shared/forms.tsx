'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BecomeSellerForm, BecomeSellerFormType, CreateProductForm, CreateProductFormType, CreateReelForm, CreateReelFormType } from '@/lib/schema';
import { createProduct, getProductCategory } from "@/action/products";
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import { ImageUploader } from "./image-uploader"; // <- Make sure it's connected
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { CategorySelect } from './category-select';
import { createReel } from '@/action/reel';
import VideoInput from './video-uploader';
import { BussinessCategory, BussinessType, ProductCategory } from '@/lib/prisma';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ScrollArea } from '../ui/scroll-area';
import { becomeSeller, getBussinessCategory } from '@/action/user';
import { Checkbox } from '../ui/checkbox';
import { ToggleGroup } from '../ui/toggle-group';
import { Toggle } from '../ui/toggle';
import { Label } from '../ui/label';

export function CreateProductDialog() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const [category, setCategory] = useState<ProductCategory[]>([])
  const form = useForm<CreateProductFormType>({
    resolver: zodResolver(CreateProductForm),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
    }
  });


  useEffect(()=>{
    async function fetchCategory() {
      const categories = await getProductCategory()
      setCategory(categories.categories || [])
    }
    fetchCategory()
  })

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
      <DialogContent className="sm:max-w-[725px]  rounded-3xl grid md:grid-cols-2">
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
                        <Textarea placeholder="Enter your product description" {...field} className='resize-none overflow-y-auto h-20' />
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
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <CategorySelect onValueChange={(prev)=>field.onChange(prev)} categories={category} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
  const rounter  = useRouter()
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
      toast.success(result.success);
      setLoading(false);
      setOpen(false)
      redirect('/discover');
    }
  }

  return (
    <Dialog open={open} onOpenChange={(lastState)=>setOpen(lastState)} >
      <DialogTrigger asChild>
        <Button size={'sm'}  className='font-light cursor-pointer'>
          <ShoppingBag />
          Create a reel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] h-[80dvh]  rounded-3xl grid md:grid-cols-2">
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



export function BecomeSellerDialog() {
  const [loading,setLoading] = useState(false)
  const [categories,setCategories] = useState<BussinessCategory[]>([])

  useEffect(()=>{
    async function fetchCategory() {
      const categories = await getBussinessCategory()
      setCategories(categories)
    }
    fetchCategory()
  },[])

  const form = useForm<BecomeSellerFormType>({
    resolver: zodResolver(BecomeSellerForm),
    defaultValues:{
      bussinessName: '',
      bussinessEmail: '',
      phoneNumber: '',
      bussinessType: BussinessType.INDIVIDUAL,
      bussinessAddress: '',
      bussinessRegistrationNumber: '',
      bussinessCategory: [],
      terms: false
    }
  })


  async function onSubmit(data: BecomeSellerFormType) {
    if (!form.getValues('terms')) {
      return toast.error('Please accept our terms to continue')
    }
    setLoading(true)
    const payload = {
      ...data
    }
    const result = await becomeSeller(null, payload)

    if (result.success) {
      toast.success(result.success)
    } else (
      toast.error(result.error)
    )
    setLoading(false)

  }
  

  return(
    <Dialog   >
      <DialogTrigger asChild >
          <Button size={'sm'} className={`cursor-pointer tracking-wider not-md:hidden rounded-xl bg-yellow-300 text-black hover:bg-yellow-400 px-6`}>
            Become a seller
          </Button>        
      </DialogTrigger>
      <DialogContent >
        <ScrollArea  className='max-h-[80dvh] h-full p-2 ' >
          <DialogHeader>
            <DialogTitle>
              Become a ReelUp Seller
            </DialogTitle>
            <DialogDescription>
              Join our platform to showcase your products and reach a wider audience. As a seller, you can create listings, manage your inventory, and connect with potential buyers.
            </DialogDescription>
          </DialogHeader>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-2 py-6' >
              <FormField  
                control={form.control}
                name='bussinessName'
                render={({ field })=>(
                  <FormItem>
                    <FormLabel>
                      Bussiness Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your bussiness name' {...field}  />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                  />
              <FormField  
                control={form.control}
                name='bussinessEmail'
                render={({ field })=>(
                  <FormItem>
                    <FormLabel>
                      Bussiness Email
                    </FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Enter your bussiness email if any' {...field}  />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                  />
              <FormField  
                control={form.control}
                name='phoneNumber'
                render={({ field })=>(
                  <FormItem>
                    <FormLabel>
                      Bussiness Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input type='tel' placeholder='Enter your bussiness phone number' {...field}  />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                  />
              <FormField
                control={form.control}
                name="bussinessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Business Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4 mt-2"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={BussinessType.INDIVIDUAL} id="individual" className='hidden' />
                          </FormControl>
                          <FormLabel
                            htmlFor="individual"
                            className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition 
                              ${
                                field.value === BussinessType.INDIVIDUAL
                                  ? "bg-yellow-400 text-black"
                                  : "border-muted hover:bg-muted/30"
                              }`}
                          >
                            Individual
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={BussinessType.COMPANY} id="company" className='hidden' />
                          </FormControl>
                          <FormLabel
                            htmlFor="company"
                            className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition 
                              ${
                                field.value === BussinessType.COMPANY
                                  ? "bg-yellow-400 text-black"
                                  : "border-muted hover:bg-muted/30"
                              }`}
                          >
                            Company
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-sm" />
                  </FormItem>
                )}
              />
              <FormField  
                control={form.control}
                name='bussinessAddress'
                render={({ field })=>(
                  <FormItem>
                    <FormLabel>
                      Bussiness Address
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter your addresss if any' {...field} className='resize-none overfow-y-auto max-h-18' />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                  />
              <FormField  
                control={form.control}
                name='bussinessRegistrationNumber'
                render={({ field })=>(
                  <FormItem>
                    <FormLabel>
                      Bussiness Registration Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your bussiness registration number if any.' {...field}  />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                  />
              <FormField
                control={form.control}
                name="bussinessCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Business Category</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        value={field.value || []} // 👈 important fallback to []
                        onValueChange={(vals)=> {
                          console.log(vals)
                          field.onChange(vals)
                        }}
                        className="flex flex-wrap gap-2 mt-2"
                      >
                      {
                        categories.map((category) => (
                            <FormItem key={category.name} >
                              <FormControl>
                                  <Toggle
                                    value={category.name}
                                    size="sm"
                                    id={category.name}
                                    className="cursor-pointer data-[state=on]:bg-yellow-400 data-[state=on]:text-black rounded-lg font-medium border px-3 h-6 text-xs transition"
                                  >
                                    {category.name}
                                  </Toggle>
                              </FormControl>
                            </FormItem>
                            ))
                        }
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-sm" />
                  </FormItem>
                )}
              />
              <Label className="has-[[aria-checked=true]]:text-yellow-300 hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-zinc-600 has-[[aria-checked=true]]:bg-zinc-50 dark:has-[[aria-checked=true]]:border-zinc-800 dark:has-[[aria-checked=true]]:bg-zinc-950">
                <Checkbox
                  id="toggle-2"
                  onCheckedChange={()=>form.setValue('terms', !form.getValues('terms'))}
                  className="data-[state=checked]:border-yellow-300 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black dark:data-[state=checked]:border-yellow-300 dark:data-[state=checked]:bg-yellow-400"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    Terms & Conditions for Sellers
                  </p>
                  <p className="text-muted-foreground text-xs">
                    By becoming a seller, you agree to our terms and conditions. Please read them carefully before proceeding.
                  </p>
                </div>
              </Label>
                {/* <BussinessCategorySelect/> */}
            <Button size={'sm'} className={`cursor-pointer tracking-wider not-md:hidden rounded-xl bg-yellow-300 text-black hover:bg-yellow-400 px-6`}>
              {
                loading &&
                <Loader2 className='animate-spin' />
              }
              Become a seller
            </Button>        
            </form>
          </Form>
        <DialogFooter className='flex items-center py-2' >
          <DialogClose asChild >
            <Button size={'sm'} >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>

  )
}