import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Footer } from '@/components/shared/footer'
import creator from '@/assets/images/2151917682.jpg'
import creator2 from '@/assets/images/7686.jpg'
import creator3 from '@/assets/images/215013805.jpg'

import testimonial from '@/assets/images/testimonials/2148574874.jpg'
import testimonial2 from '@/assets/images/testimonials/42573.jpg'
import testimonial3 from '@/assets/images/testimonials/33687.jpg'
import { TestimonialCard } from '@/components/shared/testimonialCard'
const testimonials = [
  {
    name: "Maya Thompson — Digital Artist",
    quote: "With ReelUp, I launched my portfolio in minutes. I landed two freelance gigs the first week!",
    img: testimonial,
    tools: ["Portfolio", "Discover"],
    location: "New York, USA"
  },
  {
    name: "Daniel Jordan — Filmmaker & Editor",
    quote: "I used to rely on Instagram alone. With ReelUp, I have a professional space to showcase my work and track who’s engaging with it.",
    img: testimonial2,
    tools: ["Portfolio", "Analytics"],
    location: "Lagos, Nigeria"
  },
  {
    name: "Leila Moreau — UX Designer",
    quote: "Sharing my work used to be messy. ReelUp let me organize my projects beautifully and send a single link to potential clients.",
    img: testimonial3,
    tools: ["Portfolio", "Analytics"],
    location: "Paris, France"
  }
];


export default function CustomerStories() {
    return(
        <>
        <Navbar/>
        <section className='w-full flex flex-col items-center max-w-6xl m-auto p-20' >  
            <h1 className=" text-3xl leading-snug uppercase  md:text-4xl px-4 md:px-8 lg:px-10 tracking-wider lg:text-5xl text-center mt-4">
                Real Creators. Real Results.
            </h1>
            <p className="text-center md:w-md lg:w-lg not-md:text-xs not-lg:text-sm mt-2">
                See how ReelUp is helping creators around the world build their brand, grow their audience, and land opportunities — all in one place.
            </p>
            <div className='mt-10 flex justify-center' >
                <div className='w-80 h-100 rounded-2xl -rotate-12 translate-y-35 -z-1 overflow-hidden' >
                    <Image src={creator} alt='creator.png' className='object-cover w-full h-full' />
                </div>
                <div className='w-80 h-120 rounded-2xl overflow-hidden' >
                    <Image src={creator2} alt='creator.png' className='object-cover w-full h-full' />
                </div>
                <div className='w-80 h-100 rounded-2xl rotate-12 translate-y-35 overflow-hidden' >
                    <Image src={creator3} alt='creator.png' className='object-cover w-full h-full' />
                </div>
            </div>
        </section>
        <section className='w-full items-center space-y-20 max-w-6xl m-auto p-4 md:p-20  lg:p-30' >  
            {
                testimonials.map((test,indx)=>(
                    <TestimonialCard key={indx} 
                        name={test.name}
                        quote={test.quote} 
                        img={test.img} 
                        reverse={indx % 2 !== 0}
                        location={test.location}
                     />
                ))
            }
        </section>
        <section className='w-full flex flex-col items-center space-y-5 max-w-6xl m-auto p-4 md:p-20  lg:p-30' >  
            <h2 className='font-medium text-2xl md:text-3xl not-md:text-center lg:text-4xl' >
                Ready to become the next success story?
            </h2>
            <Button variant={'ghost'} size={'lg'}  className="bg-green-300 cursor-pointer rounded-full" >
                Try Reelup -- For Free!
            </Button>
        </section>
        <Footer/>
        </>
    )
}


