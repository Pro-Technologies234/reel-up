'use client';

import { addCartItem, removeCartItem } from "@/action/cart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Products } from "@/action/products";
import { useRouter } from "next/navigation";

type AddCartProps = {
  cartItem: Products[0]['cartItems'][0];
  productId: string
};

export function AddToCart({ cartItem, productId }: AddCartProps) {
  const [itemAmount, setItemAmount] = useState(0);
  const router = useRouter()

  // ✅ Fetch current cart amount (only once or when dialog opens)
  useEffect(() => {
    setItemAmount(cartItem?.amount || itemAmount);
  }, [cartItem?.amount]); // or include additional deps like "dialogOpen" if needed

  
  async function addToCart() {
    
    const { success, error } = await addCartItem(productId);
    if (success) {
      toast.success(success);
      router.refresh()
      setItemAmount((prev) => prev + 1);
    } else if (error) {
      toast.error(error);
    }
  }

  async function removeFromCart() {
    const { success, error } = await removeCartItem(productId);
    if (success) {
      toast.success(success);
      router.refresh()
      setItemAmount((prev) => Math.max(0, prev - 1));
    } else if (error) {
      toast.error(error);
    }
  }

  return (
    <div className="space-x-2 flex items-center">
      <button
        onClick={removeFromCart}
        disabled={itemAmount === 0}
        className="bg-zinc-200 dark:bg-zinc-800 p-1 disabled:opacity-50 border border-gray-400 dark:border-gray-600 text-black dark:text-white cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-300 rounded-md"
      >
        <Minus size={15} />
      </button>
      <span className="text-md">{itemAmount}</span>
      <button
        onClick={addToCart}
        className="bg-yellow-300 p-1 text-black dark:text-black cursor-pointer dark:hover:bg-yellow-400 hover:bg-zinc-300 rounded-md"
      >
        <Plus size={15} className="text-black" />
      </button>
    </div>
  );
}
