'use client'
import { Heart, Loader2, Share, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import {  likeProduct, Products } from "@/action/products";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { likeReel, Reels } from "@/action/reel";
import { validateRequest } from "@/lib/validate-user";


type LikeBtnProps = {
    product: Products[0] 
}

export function ProductLikeBtn({ product }: LikeBtnProps) {
    const router = useRouter()
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        async function fetchUser() {
            const { user } = await validateRequest()
            if (user) {
            setIsLiked(product.likes.some(like => like.userId === user.id))
        }
    }
        setLikes(product.likes.length ?? 0)
        fetchUser() 
    }, [product])


    async function setLike() {
        setIsLoading(true)
        const { error, like } = await likeProduct(product.id)
        if (like != null) {
            setIsLiked(like)
            router.refresh()
        } else if (error) {
            toast.error(error)
        }
        setIsLoading(false)
    }

    return (
        <Button
            onClick={setLike}
            className={`group dark:bg-zinc-950 bg-zinc-50 dark:hover:bg-black hover:bg-white ${
                isLiked ? 'text-yellow-300' : 'dark:text-white text-black'
            } cursor-pointer z-10 backdrop-blur-xl rounded-xl`}
        >
            <span className="mt-1">{likes}</span>
            <Separator orientation="vertical" className="not-dark:bg-white/10" />
            {isLoading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <Heart
                    className={isLiked ? 'fill-yellow-300' : 'hover:fill-yellow-300 fill-transparent'}
                />
            )}
        </Button>
    )
}


type ReelLikeBtnProps = {
  reel: {
    id: string
    likes: { userId: string }[] // array of users who liked
  }
  currentUserId?: string
}

export function ReelLikeBtn({ reel, currentUserId }: ReelLikeBtnProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [likes, setLikes] = useState(reel.likes.length)


    useEffect(() => {
        async function fetchUser() {
            const { user } = await validateRequest()
            if (user) {
            setIsLiked(reel.likes.some(like => like.userId === user.id))
            }
        }
    fetchUser()
    }, [reel])


  useEffect(() => {
    setIsLiked(reel.likes.some(like => like.userId === currentUserId))
    setLikes(reel.likes.length)
  }, [reel, currentUserId])

  async function setLike() {
    setIsLoading(true)
    const { error, liked } = await likeReel(reel.id)

    if (liked != null) {
      setIsLiked(liked)
      setLikes(prev => liked ? prev + 1 : prev - 1)
    } else if (error) {
      toast.error(error)
    }

    setIsLoading(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        size={"icon"}
        onClick={setLike}
        className={`group ${isLiked
          ? "bg-yellow-300 hover:bg-yellow-400 text-black"
          : "bg-zinc-950 hover:bg-black text-white"
        } cursor-pointer z-10 backdrop-blur-xl rounded-xl`}
        aria-label="Like"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Heart
            className={isLiked ? "fill-black" : ""}
            fill={isLiked ? "currentColor" : "none"}
          />
        )}
      </Button>
      <span className="text-white">{likes}</span>
    </div>
  )
}