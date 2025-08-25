'use client'
import { deleteReel, Reels } from "@/action/reel"
import { useEffect, useRef, useState, useCallback } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "../ui/button"
import { Eye, Heart, MoreHorizontal, Play, Share, Trash2, Volume2, VolumeOff } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ChevronUp, ChevronDown } from "lucide-react";
import { ProfileCover } from "../reel/reel-client"
import { ReelLikeBtn } from "./like-btn"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Switch } from "../ui/switch"

type ReelViewerProps = {
    reel: Reels[0]
}

export function ReelViewer({reel}:ReelViewerProps) {
    
    return(
        <div className="aspect-[9/13] space-y-2" >
            <Card className="relative w-full h-[90%] overflow-hidden rounded-lg md:rounded-xl">
                <CardContent className=" p-0 object-cover h-full w-full">
                    <video
                    src={reel.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    />
                </CardContent>
                <div className="absolute dark:bg-black/20 bg-white backdrop-blur-3xl bottom-2 left-2 flex gap-2 text-white rounded-lg p-1 px-2" >
                    <div className="flex gap-1 items-end " >
                        <Heart size={18} />
                        <span className="text-xs" >{reel.likes.length}</span>
                    </div>
                    <div className="flex gap-1 items-end " >
                        <Eye size={18} />
                        <span className="text-xs" >{reel.likes.length}</span>
                    </div>
                </div>
            </Card>
            <div>
                <div>
                    <p className="text-sm tracking-wider line-clamp-1" >
                        {reel.caption}
                    </p>
                </div>
                <div className="flex gap-2 text-shadow p-0.5 rounded-xl" >
                    <Avatar className="h-8 md:h-10 w-8 md:w-10 flex items-center justify-center uppercase bg-emerald-800 rounded-lg overflow-hidden" >
                        <AvatarImage src={ reel.createdBy?.avatarUrl || "https://github.com/shadcn.png"} className="object-cover w-full h-full" />
                        <AvatarFallback  className="text-white" >{reel.createdBy?.username?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col " >
                        <span className="text-sm" > 
                            {reel.createdBy.username}
                        </span>
                        <span className="text-xs" > 
                            {reel.createdAt.toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        // <div className="cursor-pointer h-70 dark:text-white group group-hover:shadow-black/50 relative rounded-xl dark:bg-zinc-900/50 bg-zinc-100/50 shadow-xl shadow-black/10 dark:shadow-black/20  overflow-hidden" >
        //     <div className="absolute inset-0 z-0 scale-120 " >
        //         <video src={reel.url} className="w-full h-full object-cover blur"  ></video>
        //     </div>
        //     <VideoViewer video={{url: reel.url}} />
        //     <div className="absolute bottom-2 left-2 flex gap-2  dark:bg-black bg-white backdrop-blur-3xl rounded-xl p-2" >
        //         <div className="flex gap-1 items-end " >
        //             <Heart size={15} />
        //             <span className="text-xs" >{reel.likes.length}</span>
        //         </div>
        //         <div className="flex gap-1 items-end " >
        //             <Eye size={15} />
        //             <span className="text-xs" >{reel.likes.length}</span>
        //         </div>
        //     </div>
        // </div>
    )
}

export const VideoViewer = ({video, className}:{video: {url: string, autoPlay?: boolean}, className?: string})=>{
    const videoElement = useRef<HTMLVideoElement>(null)

    return(
        <div onMouseEnter={()=>videoElement.current?.play()} onMouseLeave={()=>videoElement.current?.pause()} className={twMerge("overflow-hidden h-full w-full aspect-square rounded-xl relative", className)} >  
            <video ref={videoElement}  src={video.url} className="w-full h-full " loop  ></video>
        </div>

    )
}






export default function ReelScroller({reels, currentUserId}:{reels: Reels, currentUserId: string}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReel, setActiveReel] = useState<Reels[0]>(reels[0])
  const [muted,setMuted] = useState(false)
  const [autoPlay,setAutoPlay] = useState(false)

  // handle arrow keys (desktop)
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, reels.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // handle swipe (mobile)
  let touchStartY = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) {
      setActiveIndex((prev) => Math.min(prev + 1, reels.length - 1));
    } else if (touchEndY - touchStartY > 50) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col h-full dark:bg-zinc-900 bg-zinc-100 text-white sm:p-2">
      {/* Reel container */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${activeIndex * 100}%)`,
          }}
        >
          {reels.map((reel,indx) => (
            <ReelPlayer 
              onPlayNext={()=>setActiveIndex((prev) => Math.min(prev + 1, reels.length - 1))} 
              key={reel.id} 
              reel={reel} 
              active={activeIndex === indx} 
              muted={muted} 
              autoPlay={autoPlay}
              onActiveChange={setActiveReel} 
            />
          ))}
        </div>
        <div  className="z-1 h-full absolute right-3/11  -translate-y-2/3 flex flex-col items-center gap-6">
          <ProfileCover reel={activeReel} />
          <ReelLikeBtn reel={activeReel} currentUserId={currentUserId} />
          <Button
            size={"icon"}
            className="rounded-full p-4 bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition"
            aria-label="Share"
          >
            <Share size={24} />
          </Button>
          <Button
            size={"icon"}
            onClick={()=>setMuted(!muted)}
            className="rounded-full p-4 bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition"
            aria-label="Mute"
          >
            {
              muted ?
              <VolumeOff size={24} />
              :
              <Volume2 size={24} />
            }
          </Button>
          <ReelMorePopover 
            onChangeAutoplay={setAutoPlay}
           />
        </div>
        {/* Controls (desktop) */}
        <Button
          size={'icon'}
          className="cursor-pointer absolute top-1/3 not-sm:hidden right-4 text-white dark:bg-black rounded-full darkhover:bg-zinc-950"
          onClick={() =>
            setActiveIndex((prev) => Math.max(prev - 1, 0))
          }
        >
          <ChevronUp />
        </Button>
        <Button
          size={'icon'}
          className="cursor-pointer absolute bottom-1/3 not-sm:hidden right-4 text-white dark:bg-black rounded-full darkhover:bg-zinc-950"
          onClick={() =>
            setActiveIndex((prev) => Math.min(prev + 1, reels.length - 1))
          }
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}


export type  ReelPlayerProps = {
    reel: Reels[0]
    active: boolean
    muted: boolean
    autoPlay: boolean
    onPlayNext: ()=>void
    onActiveChange: (reel: Reels[0])=>void
}


export const ReelPlayer = ({ reel, active, muted, autoPlay, onPlayNext, onActiveChange }: ReelPlayerProps) => {
  const router = useRouter()
  const videoElement = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playTime, setPlayTime] = useState(0)
  const [maxPlayTime, setMaxPlayTime] = useState(0)

  // when video loads, get duration
  useEffect(() => {
    const video = videoElement.current
    if (!video) return

    const handleLoaded = () => setMaxPlayTime(video.duration || 0)
    const handleTimeUpdate = () => setPlayTime(video.currentTime)

    video.addEventListener("loadedmetadata", handleLoaded)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  useEffect(()=>{
    autoPlay &&
      onPlayNext()
  },[videoElement.current &&  playTime > videoElement.current.duration - 0.1])

  // handle play / pause depending on "active"
  useEffect(() => {
    const video = videoElement.current
    if (!video) return

    if (active) {
      if (video.paused) {
        video.play()
        video.currentTime = 0
        setIsPlaying(true)
      }
    } else {
      if (!video.paused) {
        video.pause()
        setIsPlaying(false)
      }
    }
    onActiveChange(reel)
  }, [active])

  function handlePlayPause() {
    if (!videoElement.current) return
    if (videoElement.current.paused) {
      videoElement.current.play()
      setIsPlaying(true)
    } else {
      videoElement.current.pause()
      setIsPlaying(false)
    }
  }


  async function deleteThisReel() {
    const result = await deleteReel(reel.id)
    
    if (result.success) {
      toast.success(result.success)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div
      
      className="h-full relative overflow-hidden flex items-center justify-center m-auto rounded-2xl sm:aspect-[9/16] dark:bg-black bg-white"
    >
      {/* <Button size={'icon'} variant={'destructive'} onClick={deleteThisReel} className="z-10 cursor-pointer absolute top-2 right-2" >
        <Trash2/>
      </Button> */}
      {/* Video */}
      <div className="absolute inset-0">
        <video
          ref={videoElement}
          src={reel.url}
          className="w-full h-full"
          loop
          playsInline
          muted={muted}
        />
      </div>

      {/* Play Icon Overlay */}
      <div onClick={handlePlayPause} className="z-10 w-full h-full flex items-center justify-center">
        {active && !isPlaying && (
          <div className="p-4 rounded-full">
            <Play />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        {
          active &&
          <VideoProgressBar
          playTime={playTime}
          maxPlayTime={videoElement.current ? videoElement.current?.duration : 0}
          onSeek={(time) => {
              if (videoElement.current) {
              videoElement.current.currentTime = time;
              }
          }}
          />
        }
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4" >
        <h4 className="text-sm" >
          {reel.caption}
        </h4>
      </div>
    </div>
  )
}



interface VideoProgressBarProps {
  playTime: number; // current time (seconds)
  maxPlayTime: number; // total duration (seconds)
  onSeek: (time: number) => void; // callback when user scrubs
}

export function VideoProgressBar({
  playTime,
  maxPlayTime,
  onSeek,
}: VideoProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progressPercent =
    maxPlayTime > 0 ? Math.min((playTime / maxPlayTime) * 100, 100) : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || maxPlayTime <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * maxPlayTime;
    onSeek(newTime);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !barRef.current || maxPlayTime <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const dragX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newTime = (dragX / rect.width) * maxPlayTime;
    onSeek(newTime);
  };

  return (
    <div
      ref={barRef}
      className="relative z-10 w-full h-1 bg-gray-400 rounded cursor-pointer"
      onClick={handleSeek}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleDrag}
    >
      {/* Progress fill */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-rose-500 to-rose-600 rounded"
        style={{ width: `${progressPercent}%` }}
      />

      {/* Thumb (draggable handle) */}
      <div
        className="absolute top-1 w-1 h-1 bg-white rounded-full -translate-y-1/2"
        style={{ left: `${progressPercent}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

interface PopoverMoreProps {
  onChangeAutoplay: (autoPlay: boolean)=> void
}

export const ReelMorePopover = ({onChangeAutoplay}:PopoverMoreProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size={'icon'} className="rounded-full" >
          <MoreHorizontal/>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-2 items-center" >
          <span>
            Autoplay
          </span>
          <Switch onCheckedChange={onChangeAutoplay} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
