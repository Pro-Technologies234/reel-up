import Image, { StaticImageData } from 'next/image'
import { MapPin } from "lucide-react";

interface TestimonialProps {
    name: string
    quote: string
    img: StaticImageData
    reverse?: boolean
    location?: string
}

export function TestimonialCard({ name, quote, img, location, reverse = false }: TestimonialProps) {
    return (
        <div className={`w-full grid grid-cols-9 gap-8 ${reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`overflow-hidden shadow-xl shadow-gray-200 relative h-65 col-span-3 rounded-3xl ${reverse ? 'order-2' : 'order-1'}`}>
                <Image src={img} alt='testimonial' className='object-cover w-full h-full' />
                <div className={`absolute flex items-center bg-white bottom-4 ${ reverse ? 'right-4' : 'left-4'} px-2.5 gap-1 p-1 rounded-full `} >
                    <MapPin size={'20'}/>
                    <span className='text-xs font-medium' >
                        {location}
                    </span>
                </div>
            </div>
            <div className={`col-span-6 flex flex-col justify-between p-4 ${reverse ? 'order-1' : 'order-2'}`}>
                <div>
                    <h2 className='text-2xl font-semibold tracking-wider leading-snug'>
                        {quote}
                    </h2>
                </div>
                <div className='flex justify-between' >
                    <span>
                        {name}
                    </span>

                </div>
            </div>
        </div>
    )
}
