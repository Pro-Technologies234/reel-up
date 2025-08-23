// /shop/page.tsx
import { redirect } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { validateRequest } from "@/lib/validate-user";
import { fetchProducts, getProductCategory } from "@/action/products";
import { ProductCard } from "@/components/products/product-card";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getCartItems } from "@/action/cart";
import { CategoryButtons } from "@/components/shared/category-btns";
import { getUser } from "@/action/user";


interface ShopPageProps {
  searchParams: Promise< {
    category?: string
    search?: string
  }>
}

export default async function Shop({ searchParams }: ShopPageProps) {

const params = await searchParams;
const category = params?.category ?? "";
const search = params?.search ?? "";

const { user } = await validateRequest();
if (!user) {
  redirect("/login");
}

// destructure correctly so userInfo is the actual User object
const { user: userInfo } = await getUser(user.id);

const { cartItems } = await getCartItems();
const { categories } = await getProductCategory();
const products = await fetchProducts(category, search);

return (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <div className="dark:bg-black h-dvh w-full flex flex-col">
        <Navbar 
          mode="dark" 
          inApp={true} 
          user={userInfo} 
          cartItems={cartItems} 
        />
        <div className="w-full h-[90%] relative">
          <CategoryButtons categories={categories || []} />
          <ScrollArea className="h-full w-full dark:bg-zinc-950 bg-zinc-50 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-16 overflow-y-auto">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
);

}
