
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
import { WishlistBtn } from "./product-client";



export interface ProductCardProps {
    product: Products[0]
}

export async function ProductCard({product}: ProductCardProps) {
    
    return(
        <div className="h-76 dark:text-white group group-hover:shadow-black/50 relative rounded-3xl dark:bg-zinc-900/50 bg-zinc-100/50 bg- border grid grid-rows-3 dark:border-zinc-800 border-zinc-200 shadow-xl shadow-black/10 dark:shadow-black/20  p-2" >
            <ProductInfoDialog product={product} />
            <div className="dark:bg-black bg-white rounded-2xl rounded-b-3xl row-span-2 overflow-hidden relative" >
                    <Avatar className="absolute top-2 left-2 rounded-lg z-1" >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="uppercase" >{product.createdBy?.username[0]}</AvatarFallback>
                    </Avatar>
                    <Image
                    src={product.images?.[0]?.url ?? default_img}
                    alt="Product Image"
                    fill
                    className="object-cover"
                    />
                    <span className="font-medium text-sm px-2 py-0.5 rounded-md text-black absolute top-2 right-2  bg-emerald-200" >
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
            <div className="p-2  pr-0 flex gap-0.5 flex-col justify-between" >
                <div>
                    <div className="flex justify-between " >
                        <h3 className=" truncate " >{product.name}</h3>
                    </div>
                    <p className="text-xs font-light tracking-wider line-clamp-2" >{product.description}</p>
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

