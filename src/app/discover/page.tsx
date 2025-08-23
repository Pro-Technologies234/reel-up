import { Navbar } from "@/components/shared/navbar";
import { validateRequest } from "@/lib/validate-user";
import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { getCartItems } from "@/action/cart";
import { fetchReels } from "@/action/reel";
import ReelScroller from "@/components/shared/reel-viewer";
import { getUser } from "@/action/user";

export default async function Discover() {
  const { user } = await validateRequest();
  const { cartItems } = await getCartItems();
  const reels = await fetchReels();

  if (!user) {
    redirect("/login");
  }

  const { user: userInfo } = await getUser(user.id);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="dark:bg-black h-dvh w-full flex flex-col">
          {/* Navbar fixed at top */}
          <div className="shrink-0">
            <Navbar
              cartItems={cartItems}
              mode="dark"
              inApp={true}
              user={userInfo}
            />
          </div>

          {/* Fullscreen reel scroll area */}
          <div className="flex-1 w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
            <ReelScroller reels={reels} />
            {/* {reels.map((reel) => (
              <div
                key={reel.id}
                className="h-dvh w-full flex items-center justify-center snap-start"
              >
                <ReelViewer reel={reel} />
              </div>
            ))} */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
