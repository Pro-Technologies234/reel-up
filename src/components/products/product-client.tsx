'use client'
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Bookmark, Loader2, UserPlus } from "lucide-react";
import { addWishlist } from "@/action/wishlist";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Products } from "@/action/products";
import { useRouter } from "next/navigation";
import { checkFollowing, follow } from "@/action/user";

type ImageSetterProps = {
  setCurrentImg: (url: string) => void;  // function that accepts a string and returns void
  image: { url: string };                 // you probably also need this
  currentImg: string;
};

export const ImageSetter = ({ setCurrentImg, image, currentImg }: ImageSetterProps) => {
  return (
    <div
      onClick={() => setCurrentImg(image.url)}
      className={`bg-black cursor-pointer relative overflow-hidden rounded-xl ${
        image.url === currentImg ? 'outline-yellow-400 outline-offset-2 outline-2' : ''
      }`}
    >
      <Image
        src={image.url}
        alt="Product Image"
        fill
        className="object-cover hover:opacity-80"
      />
    </div>
  );
};

type ImageViewerProps = {
  img: {url: string, alt?: string}
  className?: string
}

export const ImageViewer = ({img, className}:ImageViewerProps)=> {
  return (
      <div className= {`${twMerge("bg-black w-full relative overflow-hidden h-full rounded-2xl", className)}`} >
          <Image
              src={img.url}
              alt={img?.alt + '.png' || 'img.png'}
              fill
              className="object-cover"
          />
      </div>
  )
}


type WishlistBtnProps = {
  wishlist: { productId: string }[]
  productId: string
}

export const WishlistBtn = ({ wishlist, productId }: WishlistBtnProps) => {
  const router = useRouter()
  // Check if already in wishlist using `.some()`
  const [inWishlist, setInWishlist] = useState(
    wishlist?.some(item => item.productId === productId) || false
  )
  const [isLoading, setIsLoading] = useState(false)

  async function setWishlist() {
    setIsLoading(true)
    const { wishlisted, error } = await addWishlist(productId)

    if (error) {
      toast.error(error)
    } else {
      setInWishlist(wishlisted || false)
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
      <Button
          size={'icon'}
          onClick={setWishlist}
          className={`group dark:bg-zinc-950 bg-zinc-50 dark:hover:bg-black hover:bg-white ${
              inWishlist ? 'text-black dark:text-white' : 'dark:text-white text-black'
          } cursor-pointer z-10 backdrop-blur-xl rounded-xl`}
      >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Bookmark
          className={inWishlist ? 'fill-black dark:fill-white' : ' fill-transparent'}
          fill={inWishlist ? 'currentColor' : 'none'}
        />
      )}
    </Button>
  )
}

type FolowProps = {
  user: Products[0]["createdBy"]
}


export const FollowBtn = ({user}:FolowProps)=>{
  const [following,setFollowing] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    async function fetchFollower() {
      const { isFollowing } = await checkFollowing(user.id)
      setFollowing(isFollowing || false)
      router.refresh()
    }
    fetchFollower()
  },[])

  async function followUser() {
    const { success, error } = await follow(user.id)
    if(success) {
      toast.success(success)
    } else {
      toast.error(error)
    }
  }
  return(
    <Button onClick={()=>followUser()} size={'sm'} className="cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-black rounded-xl" >
      <UserPlus/>
      {
        following ? 
        'Unfollow' :
        'Follow'
      }
    </Button>
  )
}