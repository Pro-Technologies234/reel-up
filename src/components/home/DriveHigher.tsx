
import sell_img2 from '@/assets/images/home/download (6).jpeg'


import { Button } from "../ui/button";
import Image from "next/image";
export function DriveHigher() {
    return (
        <section className="flex flex-col items-center py-20  w-full bg-fuchsia-200 mt-20 px-4">
          <h2 className="text-3xl md:text-5xl w-full md:w-xl lg:w-2xl lg:text-6xl text-center mt-4">
            Drive Higher Click Rates With
            Awesome Features
          </h2>
          <div className="flex justify-center w-full not-md:overflow-x-auto md:overflow-visible whitespace-nowrap gap-2 mt-10">
            <Button variant={'ghost'} className='bg-white text-black border rounded-full' >Coupons</Button>
            <Button variant={'ghost'} className='bg-transparent text-black border border-black rounded-full' >Polls</Button>
            <Button variant={'ghost'} className='bg-transparent text-black border border-black rounded-full' >Question & Answers</Button>
            <Button variant={'ghost'} className='bg-transparent text-black border border-black rounded-full' >Product Cards</Button>
            <Button variant={'ghost'} className='bg-transparent text-black border border-black rounded-full' >Pins</Button>
            <Button variant={'ghost'} className='bg-transparent text-black border border-black rounded-full' >Comments</Button>
          </div>
          <div className="md:grid max-w-6xl gap-40 not-md:space-y-10 m-auto md:grid-cols-2 justify-center items-center mt-20 " >
              <div  >
                <div className="md:w-100 bg-purple-400/50 relative rounded-3xl p-4" >  
                  <div className="flex space-x-2 pb-4 p-2 ">
                    <div className="bg-white/90 p-1.5 rounded-full"></div>
                    <div className="bg-white/50 p-1.5 rounded-full"></div>
                    <div className="bg-white/30 p-1.5 rounded-full"></div>
                  </div>
                  <div className="flex space-x-2 pb-4 p-2 ">
                    <div className="bg-white/80 p-1.5 w-20 rounded-full"></div>
                    <div className="bg-white/50 p-1.5 w-10 rounded-full"></div>
                    <div className="bg-white/30 p-1.5 w-10 rounded-full"></div>
                    <div className="bg-white/30 p-1.5 w-10 rounded-full"></div>
                    <div className="bg-white/30 p-1.5 w-10 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 h-40 pb-4 p-2 ">
                    <div className='bg-white/50 rounded-sm' >   
                    </div>
                    <div className='space-y-2' >   
                      <div className="flex gap-2" >
                        <div className='bg-white/50 shadow-xl shadow-black/50 rounded-sm p-4' >   
                        </div>
                        <div className='bg-white/50 shadow-xl shadow-black/50 rounded-sm p-4' >   
                        </div>
                        <div className='bg-white/50 shadow-xl shadow-black/50 rounded-sm p-4' >   
                        </div>
                        <div className='bg-white/50 shadow-xl shadow-black/50 rounded-sm p-4' >   
                        </div>
                      </div>
                      <div className="flex flex-col gap-2" >
                        <div className='bg-white/50 rounded-full p-2 w-15' >   
                        </div>
                        <div className='bg-white/50 rounded-full p-2 w-15' >   
                        </div>
      
                      </div>
                    </div>
                  </div>
                  <div className='absolute w-35 h-60 rounded-xl overflow-hidden -right-2 md:-right-10 not-md:-top-15 md:top-10 bg-white' >
                    <Image src={sell_img2} alt="img.png" className="object-cover w-full h-full" />
                    <div className='absolute bottom-0 left-0 right-0 rounded-xl space-y-1 bg-white p-2' >
                      <div className="flex gap-1" >
                        <div className="overflow-hidden h-8 w-10 rounded-sm" >
                          <Image src={sell_img2} alt="img.png" className="object-cover w-full  h-full" />
                        </div>
                        <div>
                          <span className="text-xs font-medium  line-clamp-1" >Pondi's Hydra Light</span>
                          <span className="text-xs font-medium  line-clamp-1" >$1500 USD</span>

                        </div>
                      </div>
                      <Button size={'sm'} className='w-full rounded-full bg-black p-1 text-xs' >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2" >
                <h3 className="text-2xl font-medium" >
                  Let users swipe through videos to <br />
                  find the products they love.
                </h3>
                <p className="not-md:text-xs" >
                  Ideal for: UGO Videos, Influencers Video, Video <br />
                  Reviews, and more...
                </p>
                <div className="space-x-5 mt-8"  >
                  <Button size={'lg'} className="text-xs rounded-full bg-black" >
                    View Live Demo
                  </Button>
                  <Button size={'lg'} variant={'ghost'} className="text-xs rounded-full bg-white text-black" >
                    Get Started --- For Free!
                  </Button>
                </div>
                
              </div>
          </div>
        </section>
    )
}