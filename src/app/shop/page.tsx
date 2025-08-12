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


export default async function Shop() {
    const { user } = await validateRequest()
    if (!user) {
        redirect('/login')
    }
    const products = await fetchProducts();
    const { cartItems } = await getCartItems();
    const { categories } = await getProductCategory()
    
    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <div className="dark:bg-black h-dvh w-full flex flex-col">
                <Navbar mode="dark" inApp={true} user={user?.username} cartItems={cartItems} />
                <div className="w-full h-[90%]  relative ">
                    <div className="absolute top-2 left-2 rounded-lg flex backdrop-blur-xl gap-2 p-1.5  z-2" >
                        {
                            categories?.map((category)=>(
                                <Button size={'sm'} variant={'outline'}  key={category.id} className="cursor-pointer bg-white dark:bg-black dark:hover:bg-black hover:bg-white  text-black dark:text-white tracking-wider rounded-md" >
                                    {category.name}
                                </Button>
                            ))
                        }
                    </div>
                    <ScrollArea className="h-full w-full dark:bg-zinc-950 bg-zinc-50 grid grid-cols-4 gap-4 p-4 pt-15 overflow-y-auto">
                        {
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
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
