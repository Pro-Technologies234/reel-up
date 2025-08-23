'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ModeToggle } from "./mode-toggle";
import { CartDropdown } from "./cart-dropdown";
import { CreatePopover } from "./create-popover";
import { Products } from "@/action/products";
import { SearchBar } from "./search-bar";
import { User } from "@/lib/prisma";
import { BecomeSellerDialog } from "./forms";

type NavbarProps = {
  mode?: 'light' | 'dark'; // optional, default is 'light'
  inApp?: boolean
  user?: User | undefined
  cartItems?: Products[0]['cartItems'] | any;
};

export function Navbar({ mode = 'light', inApp, user, cartItems }: NavbarProps) {
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const navigation = [
    { name: 'Products', link: '/products' },
    { name: 'Customer Stories', link: '/customer_stories' },
    { name: 'Resources', link: '/resources' },
    { name: 'Pricing', link: '/pricing' },
  ];

  // Define text color based on mode
  const textColor =
    mode === 'dark' ? 'text-white hover:text-gray-300 ' : 'text-zinc-800 hover:text-black';


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };
  return (
    !inApp ? 
    (    
    <div className="w-full absolute z-10 top-0 max-w-7xl flex m-auto  justify-between items-center h-15 px-4">
      <div>
        <Link href={'/'}>
          <h1 className={`font-semibold text-2xl ${textColor}`}>RealUp</h1>
        </Link>
      </div>

      <nav className="flex gap-4 not-md:hidden text-sm items-center">
        {navigation.map((nav, id) => (
          <Link key={id} href={nav.link} className={`${textColor} ${currentPath === nav.link && 'font-medium '} transition-colors`}>
            {nav.name}
          </Link>
        ))}
      </nav>
        
      <div className="flex gap-4 items-center">
        <Button variant={'link'} className={`cursor-pointer rounded-full ${ mode === 'dark' ? 'text-white' : '' }`}>
          Book A Demo
        </Button>
        <Link href={'/register'} >
          <Button className={`cursor-pointer  rounded-full ${ mode === 'dark' ? 'text-white bg-black' : 'dark:bg-black text-white' }`}>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
    ) : (

    <div className="w-full  z-10  flex m-auto  justify-between items-center h-15 px-4 md:pl-4 md:pr-20">
      <div className="flex items-center gap-2 text-black dark:text-white px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
          />
        <div>
          <Link href={'/'}>
            <h1 className={`font-semibold text-2xl `}>RealUp</h1>
          </Link>
        </div>
      </div>
        <div className="flex gap-4  text-sm items-center">
          <SearchBar/>
        </div>
      <div className="flex gap-4 items-center">
        {
          !user?.isSeller &&
          <BecomeSellerDialog/>
        }
        {/* <Link href={'/'} >
          <Button size={'sm'} className={`cursor-pointer not-md:hidden rounded-full bg-yellow-400 text-black hover:bg-yellow-300 px-6`}>
            Become a Seller
          </Button>
        </Link> */}{
          user?.isSeller &&
          <CreatePopover/>
        }
        <ModeToggle/>
        <CartDropdown cartItems={cartItems} />
        <Link href={'/settings/profile'} >
          <Avatar className=" rounded-lg" >
            <AvatarImage src={ user?.avatarUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback  className="uppercase bg-emerald-800 text-white" >{user?.username?.[0]}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
    )
  );
}
