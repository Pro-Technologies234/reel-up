import prod_1 from '@/assets/images/products/2151967470.jpg'
import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import schedule_img from '@/assets/images/home/Glove Photoshoot.jpeg'
import reels_img from '@/assets/images/home/download (6).jpeg'
import analytics_overview_img from '@/assets/images/home/Search Result.jpeg'
import { AppWindowMac, BarChart2, ChevronLeft, ChevronRight, Ellipsis, Minus,
    Plus, ShieldHalf, Upload } from "lucide-react";
import { Footer } from '@/components/shared/footer'

export default function Products() {
    return(
        <>
        <Navbar mode='dark' />
        <div className="w-full h-dvh text-white bg-gradient-to-b relative font-clashdisplay from-blue-100  to-white">
            <Image src={prod_1} alt='2151967470.jpg' className='object-cover w-full absolute rounded-2xl inset-0 h-full' />
            <main className='absolute inset-0 bg-gradient-to-b from-black/20 via-20% via-black/80 to-black/80 flex flex-col justify-center items-center' >
                <h1 className=" text-3xl leading-snug uppercase  md:text-4xl px-4 md:px-8 lg:px-10 tracking-wider lg:text-5xl text-center mt-4">
                    ReelUp offers powerful tools to help you create, showcase, and grow your digital presence.
                </h1>
                <div className="space-x-5 mt-5">

                </div>
            </main>
        </div>
        <section className='w-full  max-w-6xl m-auto p-20' >  
            <h2 className='text-3xl text-center uppercase font-semibold' >
                Creator Tools
            </h2>
            <div className='grid grid-cols-2 items-center' >
                <div className="">
                <div className="md:w-90 w-auto rounded-3xl bg-white p-3 relative">
                    {/* Top Bar Buttons */}
                    <div className="flex space-x-2 pb-4 p-2">
                    <div className="bg-neutral-400 p-1.5 rounded-full"></div>
                    <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                    <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                    </div>

                    {/* Main Grid Section */}
                    <div className="grid grid-cols-2 h-50 gap-2">
                    {/* Upload Schedule Image */}
                    <div className="bg-neutral-400 rounded-xl overflow-hidden">
                        <Image
                        src={schedule_img}
                        alt="schedule.png"
                        className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Reels Performance Image with Badge */}
                    <div className="bg-neutral-400 rounded-xl overflow-hidden relative">
                        <Image
                        src={reels_img}
                        alt="reels.png"
                        className="object-cover w-full h-full"
                        />
                        <div className="flex absolute top-2 right-2 items-center text-xs font-medium rounded-full overflow-hidden">
                        <span className="bg-green-500 p-0.5 px-2 text-white">
                            NEW
                        </span>
                        <span className="bg-white p-0.5 px-2">Metrics</span>
                        </div>
                    </div>
                    </div>

                    {/* Floating Collection Box */}
                    <div className="absolute w-45 space-y-2 not-md:hidden not-lg:-bottom-20 lg:-bottom-10 bg-white -right-10 md:-right-20 p-4 rounded-3xl shadow-md">
                    <span className="font-semibold text-xl">Manage Collections</span>
                    <p className="text-xs font-medium">
                        Organize your reels into smart collections
                    </p>
                    <Button
                        size={"sm"}
                        className="bg-blue-100 text-xs hover:bg-blue-100 text-black w-full rounded-full"
                    >
                        <Plus size={"15"} /> NEW COLLECTION
                    </Button>
                    </div>
                </div>
                </div>
                <div>
                    <h3 className='text-4xl' >
                        Schedule uploads, organize reels by collections, and track performance.
                    </h3>
                </div>
            </div>
        </section>
        <section className='w-full flex flex-col items-center max-w-6xl m-auto  p-20' >
            <h2 className='text-3xl text-center uppercase font-semibold' >
                Analytics Dashboard
            </h2>
            <h3 className='text-4xl text-center mt-5' >
                Understand your audience, track profile visits, and measure reel engagement.
            </h3>
            <div className="w-full max-w-screen-xl mx-auto mt-10 p-4 bg-neutral-950 rounded-2xl shadow-xl space-y-6">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <Ellipsis />
                </Button>
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <AppWindowMac />
                </Button>
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <ChevronLeft />
                </Button>
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <ChevronRight />
                </Button>
                </div>
                <div className="flex items-center space-x-3">
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <ShieldHalf />
                </Button>
                <div className="w-96 bg-neutral-800 py-2 rounded-lg px-4 text-white text-sm">
                    Search Dashboard...
                </div>
                </div>
                <div className="flex items-center space-x-3">
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <Upload />
                </Button>
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <Plus />
                </Button>
                <Button size={"icon"} className="bg-neutral-800 text-white">
                    <BarChart2 />
                </Button>
                </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Main Reel Analytics Panel */}
                <div className="col-span-2 bg-neutral-900 rounded-2xl overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                    <h2 className="text-white text-xl font-semibold">Reel Analytics Overview</h2>
                </div>
                <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 text-sm font-medium rounded-full overflow-hidden">
                    <span className="bg-green-500 p-1 px-2 text-white">ENGAGED</span>
                    <span className="bg-white p-1 px-2">7.8K</span>
                </div>
                <div className="h-full w-full relative">
                    <Image
                    src={analytics_overview_img}
                    alt="analytics.png"
                    className="object-cover w-full h-full opacity-70"
                    />
                    {/* Placeholder for Graph */}
                    <div className="absolute inset-0 flex justify-center items-center">
                    <span className="text-white text-3xl font-bold">Graph Area</span>
                    </div>
                </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="flex flex-col space-y-6">
                {/* Profile Visits Widget */}
                <div className="bg-neutral-900 rounded-2xl p-4">
                    <div className="flex justify-between items-center text-white mb-4">
                    <span className="text-sm font-semibold">Profile Visits</span>
                    <Button size={"icon"} className="bg-neutral-800 text-white">
                        <Minus />
                    </Button>
                    </div>
                    <div className="space-y-4">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                            <div className="bg-neutral-700 h-2 w-full rounded-full mb-1"></div>
                            <div className="bg-neutral-700 h-2 w-2/3 rounded-full"></div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Audience Widget */}
                <div className="bg-neutral-900 rounded-2xl p-4 relative">
                    <div className="flex justify-between items-center text-white mb-4">
                    <span className="text-sm font-semibold">Audience Insights</span>
                    <Button size={"icon"} className="bg-neutral-800 text-white">
                        <Minus />
                    </Button>
                    </div>
                    <div className="space-y-3">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                            <div className="bg-neutral-700 h-2 w-3/4 rounded-full mb-1"></div>
                            <div className="bg-neutral-700 h-2 w-1/2 rounded-full"></div>
                        </div>
                        </div>
                    ))}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-white text-black rounded-full text-xs">
                        View Detailed Insights
                    </Button>
                    </div>
                </div>
                </div>
            </div>
            </div>


        </section>
        <Footer/>
        </>
    )
}