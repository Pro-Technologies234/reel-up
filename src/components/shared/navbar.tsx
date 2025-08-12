'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Search} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ModeToggle } from "./mode-toggle";
import { CartDropdown } from "./cart-dropdown";
import { CreatePopover } from "./create-popover";
import { Products } from "@/action/products";

type NavbarProps = {
  mode?: 'light' | 'dark'; // optional, default is 'light'
  inApp?: boolean
  user?: string 
  cartItems?: Products[0]['cartItems'] | any;
};

export function Navbar({ mode = 'light', inApp, user, cartItems }: NavbarProps) {
  const currentPath = usePathname();
  const navigation = [
    { name: 'Products', link: '/products' },
    { name: 'Customer Stories', link: '/customer_stories' },
    { name: 'Resources', link: '/resources' },
    { name: 'Pricing', link: '/pricing' },
  ];

  // Define text color based on mode
  const textColor =
    mode === 'dark' ? 'text-white hover:text-gray-300 ' : 'text-zinc-800 hover:text-black';

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
          <Button className={`cursor-pointer rounded-full ${ mode === 'dark' ? 'text-white' : '' }`}>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
    ) : (

    <div className="w-full  z-10  max-w-7xl flex m-auto  justify-between items-center h-15 pl-4 pr-20">
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

      <div className="flex gap-4 not-md:hidden text-sm items-center">
        <div className="w-100  flex items-center dark:bg-zinc-950 bg-zinc-50 dark:text-white px-2 rounded-lg border dark:border-zinc-800 border-zinc-200" >
          <Search size={'20'} />
          <input placeholder="Search" className="p-2 focus:outline-none w-full" />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {/* <Link href={'/'} >
          <Button size={'sm'} className={`cursor-pointer not-md:hidden rounded-full bg-yellow-400 text-black hover:bg-yellow-300 px-6`}>
            Become a Seller
          </Button>
        </Link> */}
        <CreatePopover/>
        <ModeToggle/>
        <CartDropdown cartItems={cartItems} />
        <Link href={'/settings/profile'} >
          <Avatar className=" rounded-lg" >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback  className="uppercase bg-emerald-800 text-white" >{user?.[0]}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
    )
  );
}
