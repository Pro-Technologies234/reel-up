'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const currentPath = usePathname()
    const navigation = [
        {name: 'Products', link: '/'},
        {name: 'Customer Stories', link: '/'},
        {name: 'Resources', link: '/'},
        {name: 'Pricing', link: '/'},
    ]

    return(
        <div className="w-full max-w-7xl flex m-auto justify-between items-center h-15 px-4" >
            <div>
                <h1 className="font-semibold text-2xl" >RealUp</h1>
            </div>
            <nav className="flex gap-4 not-md:hidden text-sm items-center" >
                {
                    navigation.map((nav,id)=>(
                        <Link key={id} href={nav.link} className=" hover:text-black text-zinc-800 transition-colors" >
                            {nav.name}
                        </Link>
                    ))
                }
            </nav>
            <div className="flex gap-4 items-center" >
                <Button variant={'ghost'} className="cursor-pointer " >
                    Book A Demo
                </Button>
                <Button className="cursor-pointer rounded-full" >
                    Get Started
                </Button>
            </div>

        </div>
    )
}