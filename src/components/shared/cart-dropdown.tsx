'use client'

import { ShoppingCart } from "lucide-react"; 
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CartItemCard } from "./cart-item-card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { Products } from "@/action/products";



type CartDropdownProps = {
    cartItems: Products[0]['cartItems'];
};

export function CartDropdown({ cartItems }: CartDropdownProps) {
    const [itemCount,setItemCount] = useState(0)
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.amount, 0)
        setItemCount(total)
    }, [cartItems])

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'outline'} className="cursor-pointer relative" >
                    <ShoppingCart />
                    <Badge variant={'destructive'} className="absolute -top-2 -right-2 bg-emerald-500 dark:bg-emerald-500 " >
                        { itemCount }
                    </Badge>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl gap-2 w-100 max-h-xl space-y-1 h-full" >
                    {
                    cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItemCard key={item.id} cartItem={item} />
                        ))
                    ) : (
                        <p className="p-2 text-sm text-center text-gray-500">No items in cart</p>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
