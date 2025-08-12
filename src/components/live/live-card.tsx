import Image from "next/image"
import demoImg from '@/assets/images/2151917682.jpg'
import { Button } from "../ui/button"
import { ChevronDown, ChevronUp, Heart, Plus, Share, VolumeOff } from "lucide-react"

export function LiveCard()  {
    return (
    <div className="w-full h-full shrink-0 relative " >
        <div className="absolute bottom-0 w-full bg-gradient-to-b from transparent space-y-4 via-transparent to-black/20 z-1 p-2 not-md:pb-5 md:p-5 lg:p-10" >
            <div className="flex" >
                <div className="bg-red-500 text-white text-sm px-4 rounded-md py-0.5" >
                    <span>LIVE</span>
                </div>
            </div >
            <div className="flex flex-col gap-1 text-white" >
                <h2 className="text-xl font-semibold ">@Henry Toy Shop <span className="text-xs font-medium tracking-wider text-white/70 ml-2">July, 30 2025</span></h2>
                <p className="text-xs md:text-sm tracking-wider md:w-md pr-8" >Blind Boxes, Open Toys and More! Labubu, Pop Mart, Bearbricks!</p>
            </div>
        </div>
        <div className="absolute right-6 h-full flex flex-col justify-center items-center gap-10" >

            <ProfileCover/>
            <div className=" flex flex-col justify-center  items-center gap-2" >
                <Button size={'icon'} className="rounded-full p-6 bg-black/20 text-white cursor-pointer backdrop-blur-xl" >
                    <Heart/>
                </Button>
                <Button size={'icon'} className="rounded-full p-6 bg-black/20 text-white cursor-pointer backdrop-blur-xl" >
                    <Share/>
                </Button>
                <Button size={'icon'} className="rounded-full p-6 bg-black/20 text-white cursor-pointer backdrop-blur-xl" >
                    <VolumeOff/>
                </Button>
            </div>
            <div className=" flex flex-col justify-center items-center gap-2" >
                <Button size={'icon'} className="rounded-xl p-6 bg-black/80 text-white cursor-pointer backdrop-blur-xl" >
                    <ChevronUp/>
                </Button>
                <Button size={'icon'} className="rounded-xl p-6 bg-black/80 text-white cursor-pointer backdrop-blur-xl" >
                    <ChevronDown/>
                </Button>
            </div>
        </div>
        <video src="/videos/woman-live.mp4" playsInline autoPlay loop className="object-cover w-full h-full " >
        </video>
        {/* <Image src={demoImg} alt="demoImg.png" className="object-cover w-full h-full overflow-hidden" /> */}
    </div>
    )
}

export const ProfileCover = ()=> {
    return (
        <div className="bg-white h-15 w-15 rounded-full relative" >
            <div className="absolute inset-0 outline-4 outline-red-500 outline-offset-2 rounded-full animate-pulse" >
            </div>
            <div className="absolute -bottom-3 w-full flex justify-center" >
                <Button size={'icon'} className="rounded-full cursor-pointer text-white h-5 w-5  bg-emerald-300 text-black" >
                    <Plus size={5}  />
                </Button>
            </div>
        </div>
    )
}