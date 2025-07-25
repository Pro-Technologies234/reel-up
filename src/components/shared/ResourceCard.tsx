import Image, { StaticImageData } from 'next/image'

interface ResourcesProps {
    name: string
    description: string[]
    img: StaticImageData
    reverse?: boolean
}

export function ResourcesCard({ name, description, img, reverse = false }: ResourcesProps) {
    return (
        <div className={`w-full h-[80dvh] grid grid-rows-9 gap-8 ${reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`overflow-hidden relative  row-span-7 rounded-3xl ${reverse ? 'md:order-2' : 'order-1'}`}>
                <Image src={img} alt='testimonial' className='object-cover w-full h-full' />
            </div>
            <div className={`row-span-2 flex flex-col  p-4 ${reverse ? 'order-1' : 'order-2'}`}>
                <div className='flex justify-between' >
                    <h3 className='text-2xl font-semibold tracking-wider leading-snug'>
                        {name}
                    </h3>
                </div>
                <ul>
                    {description.map((desc,indx)=>(
                        <li key={indx} className='text-sm list-disc ml-4 leading-tight'>
                            {desc}
                        </li>
                    )
                    )}
                </ul>
            </div>
        </div>
    )
}

