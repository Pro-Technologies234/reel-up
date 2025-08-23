'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { AddToCart } from "../shared/add-cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Products } from "@/action/products";
import { FollowBtn, ImageSetter, ImageViewer } from "./product-client";
import { ProductLikeBtn } from "../shared/like-btn";
import { WishlistBtn } from "./product-client";
import { PriceTag } from "../shared/price-tag";

type ProductInfoProps = {
    product: Products[0]
}

export function ProductInfoDialog({ product }: ProductInfoProps) {
    const [currentImg, setCurrentImg] = useState('')

    useEffect(() => {
        if (product.images && product.images.length > 0) {
            setCurrentImg(product.images[0].url);
        }
    }, [product.images]);
  return (
    <Dialog>
      <DialogTrigger asChild>
            <button className="absolute inset-0 z-1 cursor-pointer " >
            </button>
      </DialogTrigger>
      <DialogContent className="w-[80dvw] sm:max-w-4xl flex flex-col md:grid grid-cols-2  sm:w-full rounded-3xl">
        <div className="h-70 md:h-100 grid grid-rows-8 gap-3 relative" >
            <ImageViewer img={{url: currentImg }} className="row-span-6 "  />
                <div className="absolute top-2 flex items-center gap-2 right-2 z-1" >
                    <WishlistBtn wishlist={product.wishlist} productId={product.id} />
                    <ProductLikeBtn product={product} />
                </div>
            <div className="grid grid-cols-4 gap-2 row-span-2" >
                {
                    product.images?.map((image)=>(
                        <ImageSetter key={image.id} setCurrentImg={setCurrentImg} currentImg={currentImg} image={{url: image.url}} />
                    ))
                }
            </div>
        </div>
        <div className="flex flex-col justify-between" >
            <div className="space-y-3" >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-medium" >{product.name}</DialogTitle>
                        <ScrollArea className="bg-zinc-100 dark:bg-zinc-900 h-20 md:h-25 w-full p-2 rounded-md" >
                            <DialogDescription className="text-xs leading-tight font-mono text-left" >
                                {product.description}
                            </DialogDescription>
                        </ScrollArea>
                    <div className="space-x-4 flex items-center" >
                        <PriceTag price={product.price} />
                        {/* <AddToCart  product={product}/> */}
                    </div>
                </DialogHeader>
                <div>
                    <span className="text-sm" >
                            Posted at: {product.createdAt.toDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-2" >
                        <Avatar className="w-15 h-15 rounded-xl z-1" >
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="uppercase rounded-xl" >{product.createdBy?.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col" >
                            <span>{product.createdBy?.username}</span>
                            <div className="flex items-center gap-2" >
                                <FollowBtn user={product.createdBy} />
                                <AddToCart productId={product.id} cartItem={product['cartItems'][0]} />
                                {/* <Button size={'sm'} >
                                    <MessageCircleMoreIcon/>
                                    Message
                                </Button>
                                <Button size={'sm'} >
                                    <Share/>
                                    Share 
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter className="sm:justify-end not-md:mt-4">
            <DialogClose asChild>
                <Button type="button">
                Close
                </Button>
            </DialogClose>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
