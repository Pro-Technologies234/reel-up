import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { deleteCartItem } from "@/action/cart"
import { Products } from "@/action/products"
import { useRouter } from "next/navigation"

type Props = {
    cartItem: Products[0]['cartItems'][0]
}

export const DeleteCartItemBtn = ({cartItem}:Props)=>{
    const router = useRouter()
    async function deleteItem() {
        await deleteCartItem(cartItem.id)
        router.refresh()
    }

    return(
        <Button variant={'ghost'} onClick={deleteItem} size={'icon'} className="group z-10 cursor-pointer  absolute top-0 right-0" >
            <Trash2 className="group-hover:text-red-500" />
        </Button>
    )
}