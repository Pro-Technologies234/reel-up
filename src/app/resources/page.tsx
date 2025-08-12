import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import resources from '@/assets/images/resources/2149386544.jpg'
import resources2 from '@/assets/images/resources/2149652145.jpg'
import resources3 from '@/assets/images/resources/19964897_6194504.jpg'
import resources4 from '@/assets/images/resources/40360.jpg'
import resources5 from '@/assets/images/resources/update.jpg'
import { ResourcesCard } from '@/components/shared/ResourceCard'

const resourceSections = [
  {
    title: "Creator Guides",
    description: [
      "Building a standout portfolio",
      "How to get featured on Discover",
      "Maximizing engagement with your Reels",
      "Monetizing your content on ReelUp"
    ],
    img: resources
  },
  {
    title: "Video Tutorials",
    description: [
      "Editing tips",
      "Shooting high-quality mobile videos",
      "Branding & personal style",
      "Growth hacks for social reach"
    ],
    img: resources2
  },
  {
    title: "Case Studies",
    description: [
      "Success stories with deep dives",
      "How 'Creator A' went from 1k to 100k views in 3 months",
      "Breakdown of viral content strategies"
    ],
    img: resources3
  },
  {
    title: "Freebies & Templates",
    description: [
      "Social media post templates",
      "Video editing LUTs/presets",
      "Portfolio mockups"
    ],
    img: resources4
  },
  {
    title: "Platform News & Updates",
    description: [
      "Announcements for new features",
      "Tips for using newly released tools",
      "Creator community updates"
    ],
    img: resources5
  }
];

export default function Resources() {
    return(
        <div className='bg-white text-black' >
        <Navbar/>
        <section className='w-full flex flex-col items-center max-w-6xl m-auto px-20 pt-20' >  
            <h1 className=" text-3xl leading-snug uppercase  md:text-4xl px-4 md:px-8 lg:px-10 tracking-wider lg:text-5xl text-center mt-4">
                Level Up Your Creator Journey
            </h1>
            <p className="text-center md:w-md lg:w-lg not-md:text-xs not-lg:text-sm mt-2">
                Discover tips, guides, and resources to help you grow your audience, enhance your content, and succeed with ReelUp.
            </p>
        </section>
        <section className='w-full items-center grid md:grid-cols-2 space-y-20 gap-x-8 py-1  m-auto p-4 md:p-10' >  
            {
                resourceSections.map((resource,indx)=>(
                    <ResourcesCard key={indx} 
                        name={resource.title}
                        description={resource.description} 
                        img={resource.img} 
                        reverse={indx % 2 !== 0}
                     />
                ))
            }
        </section>
        <Footer/>
        </div>
    )
}



