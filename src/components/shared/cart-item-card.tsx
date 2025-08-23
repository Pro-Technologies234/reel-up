'use client'

import { DropdownMenuItem } from "../ui/dropdown-menu"
import { PriceTag } from "./price-tag"
import { AddToCart } from "./add-cart-item"
import { Products } from "@/action/products"
import { ImageViewer } from "../products/product-client"
import { DeleteCartItemBtn } from "./delete-cart-item"

interface CartItemCardProps {
    cartItem: Products[0]['cartItems'][0]
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
    return (
        <DropdownMenuItem onSelect={(e)=>{e.preventDefault()}} className="relative rounded-2xl grid grid-cols-3 border" >
            <ImageViewer img={{url: cartItem.product.images[0].url}} className="rounded-xl" />
            <PriceTag price={cartItem.product.price} className="absolute top-3 left-3 text-xs" />
            <div className="col-span-2 p-2 space-y-1" >
                <h2 className="text-sm" >{cartItem.product.name}</h2>
                <p className="text-xs line-clamp-1" >{cartItem.product.description}</p>
                <div className="flex gap-4 justify-between items-center" > 
                    <PriceTag price={cartItem.product.price * cartItem.amount} />
                    <AddToCart productId={cartItem.product.id} cartItem={cartItem} />
                </div>
            </div>
            <DeleteCartItemBtn cartItem={cartItem} />
        </DropdownMenuItem>
    )
}
