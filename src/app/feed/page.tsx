import { Navbar } from "@/components/shared/navbar";
import { validateRequest } from "@/lib/validate-user";
import { AppSidebar } from "@/components/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { getCartItems } from "@/action/cart";
import LivePlayer from "@/components/shared/live-player";

import { getSrc } from "@livepeer/react/external";
import { DemoPlayer } from "@/components/demoplayer";
import { Src } from "@livepeer/react";
import { HlsPlayer } from "@/components/shared/live-viewer";


export default async function LiveFeed() {
    const { user } = await validateRequest()
    const { cartItems } = await getCartItems();
    if (!user) {
        redirect('/login')
    }
    const playbackId = 'playbackId'
    const src: Src[] | null = playbackId
        ? [
            {
            src: `https://cdn.livepeer.studio/hls/${playbackId}/index.m3u8`,
            type: "hls",
            mime: "application/vnd.apple.mpegurl",
            width: 1920,
            height: 1080,
            },
        ]
        : null;
    return (
        <>
        
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="dark:bg-black h-dvh w-full flex flex-col " >
                    <Navbar cartItems={cartItems}  mode="dark" inApp={true} user={user?.username} />
                    <div className="w-full grid grid-cols-10 h-full md:pb-6 md:pr-6" >
                        <div className="col-span-10  p-4 flex justify-center items-center" >
                            {/* <DemoPlayer src={src} /> */}
                            {
                                user.email === 'protechnologies332@gmail.com' ?
                                <LivePlayer /> :
                                <HlsPlayer playbackUrl="47842otzdyb978lv" />
                            }
                            {/* <DemoPlayer src={src} /> */}
                            {/* <div className="absolute inset-0 flex flex-col oveflow-hidden" >
                                {
                                    <LiveCard/>
                                }
                            </div> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>

        </SidebarProvider>
        </>
    )
}