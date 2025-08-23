import { User } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Heart, ShoppingBag, Users } from "lucide-react";
import { Button } from "../ui/button";
import { FollowBtn } from "../products/product-client";

type sellerCardProps = {
    seller: User
}

export function SellerCard({seller}:sellerCardProps) {
    return(
        <div className="relative dark:hover:bg-zinc-800/50  dark:hover:outline outline-zinc-800 flex dark:text-white  w-full  justify-between p-2 items-end bg-zinc-100  gap-2 dark:bg-zinc-900 rounded-3xl p-2 overflow-hidden" >
            <div className="flex gap-4" >
                <Avatar className="h-24 w-24 rounded-2xl overflow-hidden" >
                    <AvatarImage src={ seller?.avatarUrl || "https://github.com/shadcn.png"} className="object-cover w-full h-full" />
                    <AvatarFallback  className="uppercase bg-emerald-800 text-white" >{seller?.username?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full" >
                    <span className="text-lg font-medium" >
                        {seller.username}
                    </span>
                    <div className="flex gap-2" >
                        <div className="flex dark:bg-black/20 bg-white rounded-full px-3 py-0.5 backdrop-blur-lg gap-0.5 items-center" >
                            <Heart size={15} />
                            <span className="text-sm" >
                                2k
                            </span>
                        </div>
                        <div className="flex dark:bg-black/20 bg-white rounded-full px-3 py-0.5 backdrop-blur-lg gap-0.5 items-center" >
                            <Users size={15} />
                            <span className="text-sm" >
                                2k
                            </span>
                        </div>
                        <div className="flex dark:bg-black/20 bg-white rounded-full px-3 py-0.5 backdrop-blur-lg gap-0.5 items-center" >
                            <ShoppingBag size={15} />
                            <span className="text-sm" >
                                2k
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm" >
                            {seller.bio}
                        </p>
                    </div>
                </div>
            </div>
            <FollowBtn user={seller} />
        </div>
    )
}