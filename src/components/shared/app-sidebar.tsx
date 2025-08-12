"use client"

import * as React from "react"
import {
  Bookmark,
  Compass,
  Play,
  ShoppingBag,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SideLinks } from "@/components/shared/side-links"

// This is sample data.
const links = [{
    name: 'Live Feed',
    url: '/feed',
    icon: Play
},{
    name: 'Discover',
    url: '/discover',
    icon: Compass
},{
    name: 'Shop',
    url: '/shop',
    icon: ShoppingBag
},{
    name: 'Wishlist',
    url: '/wishlist',
    icon: Bookmark
}
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}  >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <SideLinks links={links} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
