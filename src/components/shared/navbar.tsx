'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavbarProps = {
  mode?: 'light' | 'dark'; // optional, default is 'light'
};

export function Navbar({ mode = 'light' }: NavbarProps) {
  const currentPath = usePathname();

  const navigation = [
    { name: 'Products', link: '/products' },
    { name: 'Customer Stories', link: '/customer_stories' },
    { name: 'Resources', link: '/resources' },
    { name: 'Pricing', link: '/' },
  ];

  // Define text color based on mode
  const textColor =
    mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-zinc-800 hover:text-black';

  return (
    <div className="w-full absolute z-10 top-0 max-w-7xl flex m-auto justify-between items-center h-15 px-4">
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
        <Button className={`cursor-pointer rounded-full ${ mode === 'dark' ? 'text-white' : '' }`}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
