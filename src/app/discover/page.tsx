import { Navbar } from "@/components/shared/navbar";
import { LiveCard } from "@/components/live/live-card";
import { validateRequest } from "@/lib/validate-user";
import { AppSidebar } from "@/components/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { getCartItems } from "@/action/cart";
import { ReelCard, ReelLoader } from "@/components/reel/reel-client";
import { fetchReels } from "@/action/reel";

export default async function Discover() {
    const { user } = await validateRequest()
    const { cartItems } = await getCartItems();
    const  reels  = await fetchReels();
    if (!user) {
        redirect('/login')
    }
    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <div className="dark:bg-black h-dvh w-full flex flex-col " >
                <Navbar cartItems={cartItems}  mode="dark" inApp={true} user={user?.username} />
                <div className="h-[90vh] p-4" >
                    <ReelLoader reels={reels} />
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
    )
}