import { Navbar } from "@/components/shared/navbar";
import { validateRequest } from "@/lib/validate-user";

import { fetchProducts, getProductCategory } from "@/action/products";
import { ProductCard} from "@/components/products/product-card";
import { AppSidebar } from "@/components/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { getCartItems } from "@/action/cart";
import { fetchWishlists } from "@/action/wishlist";


export default async function Wishlist() {
    const { user } = await validateRequest()
    if (!user) {
        redirect('/login')
    }
    const wishlists = await fetchWishlists();
    const { cartItems } = await getCartItems();
    
    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <div className="dark:bg-black h-dvh w-full flex flex-col">
                <Navbar mode="dark" inApp={true} user={user?.username} cartItems={cartItems} />
                <div className="w-full h-[90%]  relative ">
                    <ScrollArea className="h-full w-full dark:bg-zinc-950 bg-zinc-50 grid grid-cols-4 gap-4 p-4 pt-15 overflow-y-auto">
                        {
                            wishlists.map((wishlist, index) => (
                                <ProductCard key={index} product={wishlist.product} />
                            ))

                        }
                    </ScrollArea>
                    {/* <CartDropdown cartItems={cartItems} /> */}
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
    );
}
