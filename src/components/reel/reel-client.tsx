'use client'
import { Reel } from "@/lib/prisma"
import { Button } from "../ui/button"
import { ChevronDown, ChevronUp, DivideCircle, Heart, Plus, Share, VolumeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Reels } from "@/action/reel"
import { ReelLikeBtn } from "../shared/like-btn"


export interface ReelCardProps  {
  reel: Reels[0];
};

export function ReelCard({ reel }: ReelCardProps) {
    
  return (
    <div className="w-full h-full shrink-0 relative rounded-3xl overflow-hidden shadow-lg bg-black flex flex-col">

        <video
            src={reel.url}
            playsInline
            autoPlay
            loop
            muted
            className="object-cover w-full h-full flex-grow"
        />
        
      <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-transparent to-transparent text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-red-600 tracking-widest text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Reel
          </div>
          <span className="text-xs opacity-70">July 30, 2025</span>
        </div>
        <h3 className="text-lg font-semibold">@{reel.name}</h3>
        <p className="text-sm opacity-80 max-w-md truncate">
          {reel.caption}
        </p>
      </div>

      {/* Right-side vertical controls */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-center gap-6">
        <ProfileCover reel={reel || undefined} />
        <ReelLikeBtn reel={reel} />
        <Button
          size={"icon"}
          className="rounded-full p-4 bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition"
          aria-label="Share"
        >
          <Share size={24} />
        </Button>
        <Button
          size={"icon"}
          className="rounded-full p-4 bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition"
          aria-label="Mute"
        >
          <VolumeOff size={24} />
        </Button>
      </div>
    </div>
  );
}



export const ProfileCover = ({reel}:{reel: Reels[0]})=> {
    return (
        <div className=" h-15 w-15 rounded-2xl relative" >
            {/* <div className="absolute inset-0 outline-4 outline-red-500 outline-offset-3 rounded-2xl animate-pulse" >
            </div> */}
            <Avatar className=" rounded-2xl w-full h-full overflow-hidden" >
                <AvatarImage src={reel.createdBy.avatarUrl || "https://github.com/shadcn.png"} className="object-cover w-full h-full" />
                <AvatarFallback  className="uppercase bg-white rounded-2xl text-black" >P</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-3 w-full flex justify-center" >
                <Button size={'icon'} className="rounded-xl cursor-pointer text-white h-5 w-5  bg-yellow-300 text-black" >
                    <Plus size={5}  />
                </Button>
            </div>
        </div>
    )
}

type ReelLoaderProps = {
  reels: Reels;
};





export function ReelLoader({ reels }: ReelLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideUp = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const slideDown = () => {
    setCurrentIndex((prev) => (prev < reels.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="h-full grid grid-cols-12">
      <div className="col-span-11 md:rounded-4xl relative overflow-hidden bg-zinc-950">
        {/* Sliding container with fixed height */}
        <div
          className="flex flex-col transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
            height: `${reels.length * 25}%`,
          }}
        >
          {reels.map((reel,indx) => (
            <div
              key={reel.id}
              className="h-full shrink-0 flex justify-center items-center"
            >
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
      

      {/* Buttons to control sliding */}
      <div className="flex flex-col justify-center items-center gap-4 px-2">
        <Button
          size={"icon"}
          className="rounded-xl  cursor-pointer backdrop-blur-xl"
          onClick={slideUp}
          disabled={currentIndex === 0}
        >
          <ChevronUp />
        </Button>
        <Button
          size={"icon"}
          className="rounded-xl  cursor-pointer backdrop-blur-xl"
          onClick={slideDown}
          disabled={currentIndex === reels.length - 1}
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
