import { ArrowRight, Dot } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import img from '@/assets/images/Poppy & Ludivine I - Louise Carrasco.jpeg'
import sell_img2 from '@/assets/images/home/download (6).jpeg'
import sell_img5 from '@/assets/images/home/Search Result.jpeg'
import Link from "next/link";

export function OurBlogs() {
    return (
        <section className="max-w-6xl flex flex-col items-center p-4 md:p-10 lg:p-20  w-full m-auto">
          <span className="p-1.5 px-2.5 rounded-full border border-black text-xs text-center">
            OUR BLOGS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
            The Latest Story From <br />
            Our Blog
          </h2>

          <div className="mt-10 max-w-6xl w-full grid md:grid-cols-3 gap-8">
            <div className="space-y-2" >
              <div className="overflow-hidden h-50 rounded-2xl" >
                <Image src={sell_img5} alt="img.png" />
              </div>
              <div className='flex items-center text-xs' >
                <span  >
                  SEP, 24 2024
                </span>
                <Dot/>
                <span>
                  7 MIN READ
                </span>
              </div>
              <div className="font-medium" >
                <h3>
                  Why we love webflow (And You <br/> 
                  Should, Too!)
                </h3>
              </div>
              <div className="w-full border " >

              </div>
              <div className="flex items-center justify-between" >
                <span>Read More</span>
                <ArrowRight size={'20'} />
              </div>
            </div>
            <div className="space-y-2" >
              <div className="overflow-hidden h-50 rounded-2xl" >
                <Image src={sell_img2} alt="img.png" />
              </div>
              <div className='flex items-center text-xs' >
                <span  >
                  SEP, 24 2024
                </span>
                <Dot/>
                <span>
                  7 MIN READ
                </span>
              </div>
              <div className="font-medium" >
                <h3>
                  Why we love webflow (And You <br/> 
                  Should, Too!)
                </h3>
              </div>
              <div className="w-full border " >

              </div>
              <div className="flex items-center justify-between" >
                <span>Read More</span>
                <ArrowRight size={'20'} />
              </div>
            </div>
            <div className="space-y-2" >
              <div className="overflow-hidden h-50 rounded-2xl" >
                <Image src={img} alt="img.png" />
              </div>
              <div className='flex items-center text-xs' >
                <span  >
                  SEP, 24 2024
                </span>
                <Dot/>
                <span>
                  7 MIN READ
                </span>
              </div>
              <div className="font-medium" >
                <h3>
                  Why we love webflow (And You <br/> 
                  Should, Too!)
                </h3>
              </div>
              <div className="w-full border " >

              </div>
              <div className="flex items-center justify-between" >
                <span>Read More</span>
                <ArrowRight size={'20'} />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10" >
            <Link href={'/blogs'} >
              <Button variant={'ghost'} size={'lg'}  className="bg-green-300 cursor-pointer rounded-full" >
                See All Blogs
              </Button>
            </Link>
          </div>
        </section>
    )
}