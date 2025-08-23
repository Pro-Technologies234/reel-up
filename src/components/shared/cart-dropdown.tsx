'use client'

import { ShoppingCart } from "lucide-react"; 
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CartItemCard } from "./cart-item-card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { Products } from "@/action/products";
import { ScrollArea } from "../ui/scroll-area";



type CartDropdownProps = {
    cartItems: Products[0]['cartItems'];
};

export function CartDropdown({ cartItems }: CartDropdownProps) {
    const [itemCount,setItemCount] = useState(0)
    const [totalCost,setTotalCost] = useState(0)
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.amount, 0)
        const cost = cartItems.reduce((sum, item) => sum + item.amount * item.product.price, 0)
        setItemCount(total)
        setTotalCost(cost)
    }, [cartItems])

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'outline'} className="cursor-pointer relative" >
                    <ShoppingCart />
                    {
                        itemCount > 0 &&
                    <Badge variant={'destructive'} className="absolute -top-2 -right-2 bg-emerald-500 dark:bg-emerald-500 " >
                        { itemCount }
                    </Badge>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`rounded-3xl p-2 gap-2 w-[100vw]  md:w-100 max-h-[80vh] space-y-2 ${itemCount < 1 && 'min-h-50'} `} >
                    {
                        cartItems.length > 0 ? (
                            <> {

                                    cartItems.map((item) => (
                                        <CartItemCard key={item.id} cartItem={item} />
                                    ))
                                }
                                <Button className="cursor-pointer rounded-xl dark:bg-white bg-black w-full " >
                                    Pay ${totalCost.toLocaleString()}
                                </Button>
                            </>
                        ) : (
                            <p className="p-2 text-sm text-center text-gray-500">No items in cart</p>
                        )
                    }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
