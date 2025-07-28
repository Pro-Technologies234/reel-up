import Link from "next/link";
import {  Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() { 
    return(
        <footer className="max-w-6xl w-full not-md:px-4 py-10 mt-10 m-auto" >
          <div className='flex flex-wrap justify-between' >
            <div className="flex flex-col gap-2 text-sm" >
              <span className="font-semibold text-sm" >Company</span>
              <Link href='/about'>
                About Us
              </Link>
              <Link href='/'>
                Case Studies
              </Link>
              <Link href='/'>
                Blogs
              </Link>
              <Link href='/'>
                Book a Demo
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm" >
              <span className="font-semibold text-smm" >Resources</span>
              <Link href='/'>
                Integrations
              </Link>
              <Link href='/'>
                Blogs
              </Link>
              <Link href='/'>
                Become a Partner
              </Link>
              <Link href='/'>
                Partners Directory
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm" >
              <span className="font-semibold text-sm" >Product</span>
              <Link href='/'>
                One Store SHoppable Videos
              </Link>
              <Link href='/'>
                Interactive & Quiz Videos
              </Link>
              <Link href='/'>
                Video Marketing
              </Link>
              <Link href='/'>
                Live Stream Shopping
              </Link>
            </div>
          </div>
          <div className="mt-10" >
            <div className='flex gap-4 items-center' >
              <h1 className="font-semibold" >ReelUp</h1>
              <Linkedin/>
              <Instagram/>
              <Facebook/>
              <Youtube/>
              <Twitter/>
            </div>
            <div>

            </div>
          </div>
          <div className="pt-10 flex justify-between" >
            <span>{new Date().getFullYear() }</span>
            <div className="flex gap-4 font-medium text-sm" >
              <Link href='/'>
                Privacy Policy
              </Link>
              <Link href='/'>
                Security
              </Link>
              <Link href='/'>
                Terms of Use
              </Link>
            </div>
          </div>
        </footer>
    )
}