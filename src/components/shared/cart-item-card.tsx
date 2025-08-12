'use client'

import { DropdownMenuItem } from "../ui/dropdown-menu"
import { PriceTag } from "./price-tag"
import { AddToCart } from "./add-cart-item"
import { Products } from "@/action/products"
import { ImageViewer } from "../products/product-client"

interface CartItemCardProps {
    cartItem: Products[0]['cartItems'][0]
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
    return (
        <DropdownMenuItem onSelect={(e)=>{e.preventDefault()}} className="rounded-lg grid grid-cols-3 border" >
            <ImageViewer img={{url: cartItem.product.images[0].url}} className="rounded-xl" />
            <div className="col-span-2 p-2 space-y-1" >
                <h2 className="text-sm" >{cartItem.product.name}</h2>
                <p className="text-xs line-clamp-1" >{cartItem.product.description}</p>
                <div className="flex gap-4 justify-between items-center" > 
                    <PriceTag price={cartItem.product.price} />
                    <AddToCart productId={cartItem.product.id} cartItem={cartItem} />
                </div>
            </div>
        </DropdownMenuItem>
    )
}
