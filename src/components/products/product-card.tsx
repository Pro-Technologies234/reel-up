
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  ProductImage, Product } from "@/lib/prisma";
import Image from "next/image";
import default_img from '@/assets/images/home/40019.jpg'
import { twMerge } from "tailwind-merge";
import { getUser } from "@/action/user";
import { ProductInfoDialog } from "./product-dialog";
import { Button } from "../ui/button";
import { Bookmark, ThumbsUp } from "lucide-react";
import { ProductLikeBtn } from "../shared/like-btn";
import { Products } from "@/action/products";
import { ImageViewer, WishlistBtn } from "./product-client";



export interface ProductCardProps {
    product: Products[0]
}

export async function ProductCard({product}: ProductCardProps) {
    
    return(
        <div className="not-md:relative md:aspect-[9/10] h-35 md:h-auto dark:text-white group group-hover:shadow-black/50 relative rounded-2xl md:rounded-3xl dark:bg-zinc-900/50 bg-zinc-100/50 bg- border grid md:grid-rows-3 not-md:grid-cols-3 dark:border-zinc-800 border-zinc-200 shadow-xl shadow-black/10 dark:shadow-black/20  p-2" >
            <ProductInfoDialog product={product} />
            <div className="dark:bg-black bg-white rounded-xl md:rounded-2xl md:rounded-b-3xl  md:row-span-2 overflow-hidden md:relative" >
                    <ImageViewer img={{url: product.images?.[0]?.url , alt: product.name }}  />
                    <span className="font-medium text-xs md:text-sm px-2 py-0.5 rounded-md text-black absolute not-md:bottom-4 not-md:left-4 md:top-2 md:right-2  bg-emerald-200" >
                        ${product.price.toLocaleString()}
                    </span>
                    <div className="absolute bottom-2  flex items-center gap-2 right-2 z-1" >
                        <WishlistBtn
                                wishlist={product.wishlist} // [{ productId: '123' }, { productId: '456' }]
                                productId={product.id}   // '123'
                            />
                        <ProductLikeBtn product={product} />
                    </div>
            </div>
            <div className="p-2 not-md:col-span-2  pr-0 flex gap-0.5 flex-col justify-between" >
                <div>
                    <div className="flex justify-between " >
                        <h3 className=" truncate w-[90%] " >{product.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-tight line-clamp-2" >{product.description}</p>
                </div>
                <div className="text-yellow-400 items-center flex px- z-1 gap-1" >
                    {
                        product.cartItems[0] &&
                        <div className="px-2 bg-yellow-300 text-sm font-medium text-black rounded-lg" >
                            <span>
                                {  product.cartItems[0].amount } in cart
                            </span>
                        </div>
                    }
                    {/* <h3>{user?.username}</h3>
                    {
                        [1,1,1,1,1].map((i,indx)=>(
                            <Star key={indx} size={'15'} stroke="none" fill="currentColor" />
                        ))
                        
                    } */}

                </div>
            </div>
        </div>
    )
}

