import { Navbar } from "@/components/shared/navbar";
import { validateRequest } from "@/lib/validate-user";
import { AppSidebar } from "@/components/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { getCartItems } from "@/action/cart";
import { fetchReels } from "@/action/reel";
import { ContentFilterButtons } from "@/components/shared/content-filter-btn";
import { ReelViewer } from "@/components/shared/reel-viewer";
import { fetchProducts } from "@/action/products";
import { ProductCard } from "@/components/products/product-card";
import { getSellers, getUser } from "@/action/user";
import { ScrollArea } from "@/components/ui/scroll-area";

enum Filters {
    REELS,
    PRODUCTS,
    SELLERS,
}

interface SearchPageProps {
  searchParams?: {
    filter?: string;
    search?: string;
  };
}

export default async function Search({searchParams}:SearchPageProps) {
    const { user } = await validateRequest()
    const { cartItems } = await getCartItems();
    const  reels  = await fetchReels(searchParams?.search);
    const products = await fetchProducts(undefined,searchParams?.search);
    const sellers = await getSellers()
    if (!user) {
        redirect('/login')
    }

    const {user: userInfo} = await getUser(user.id)

    return (
    <SidebarProvider >
        <AppSidebar />
        <SidebarInset>
            <div className="dark:bg-black h-dvh w-full flex flex-col items-center " >
                <Navbar cartItems={cartItems}  mode="dark" inApp={true} user={userInfo} />
                <div className="max-w-7xl w-full h-[90dvh] md:grid lg:grid-cols-5 relative pt-1">
                    <ContentFilterButtons/>
                    {searchParams?.filter === "reels" && (
                    <ScrollArea className="col-span-4 h-[89dvh] ">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
                        {reels.map((reel) => (
                            <ReelViewer key={reel.id} reel={reel} />
                        ))}
                        </div>
                    </ScrollArea>
                    )}
                    {
                        searchParams?.filter === 'products' &&
                        <ScrollArea className="col-span-4 h-[89dvh] ">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
                                {
                                    products.map((product)=> (
                                        <ProductCard product={product} />
                                    ))
                                }
                            </div>
                        </ScrollArea>
                    }
                    {/* <div className="col-span-1 h-full" >
                        {
                            searchParams.filter === 'products' &&
                            <ScrollArea className="h-full w-full dark:bg-zinc-950 bg-zinc-50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-15 overflow-y-auto">
                                {
                                    products.map((product)=> (
                                        <ProductCard product={product} />
                                    ))
                                }
                            </ScrollArea>
                        }
                        {
                            !searchParams.filter &&
                            <ScrollArea className="w-full h-full p-4   overflow-y-auto  dark:bg-zinc-950 bg-zinc-50">
                                {
                                    sellers.length > 0 && (
                                        <>
                                            <div className="w-full gap-4 p-4 pt-15 space-y-2 overflow-y-auto">
                                                {
                                                    sellers.map((seller,indx)=> indx < 4 && (
                                                        <SellerCard key={seller.id} seller={seller} />
                                                    ))
                                                }
                                            </div>
                                            <div className="flex justify-center p-4" >
                                                <FilterBtn filter={{name: 'sellers', label: 'See More Sellers'}} />
                                            </div>
                                            <Separator/>
                                        </>
                                    )
                                }
                                {
                                    reels.length > 0 && (
                                        <>
                                            <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16 overflow-y-auto">
                                                {
                                                    reels.map((reel,indx)=> indx < 4 && (
                                                        <ReelViewer key={reel.id} reel={reel} />
                                                    ))
                                                }
                                            </div>
                                            <div className="flex justify-center p-4" >
                                                <FilterBtn filter={{name: 'reels', label: 'See More Reels'}} />
                                            </div>
                                            <Separator/>
                                        </>
                                    )
                                }
                                {
                                    products.length > 0 && (
                                        <>
                                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-15 overflow-y-auto">
                                            {
                                                products.map((product,indx)=> indx < 4 &&  (
                                                    <ProductCard key={product.id} product={product} />
                                                ))
                                            }
                                        </div>
                                        <div className="flex justify-center p-4" >
                                            <FilterBtn filter={{name: 'products', label: 'See More Products'}} />
                                        </div>
                                        </>
                                    )
                                }
                            </ScrollArea>
                        }
                    </div> */}
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
    )
}