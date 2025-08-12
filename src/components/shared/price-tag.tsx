import { twMerge } from "tailwind-merge"
import { Badge } from "../ui/badge"

type PriceTagProps = {
    price: number
    className?: string
}

export function PriceTag({price, className}:PriceTagProps) {
    return(
        <Badge className={twMerge(`font-medium text-sm px-2 py-0.5 rounded-md text-black bg-emerald-200`,className)} >
            ${price.toLocaleString()}
        </Badge>
    )
}