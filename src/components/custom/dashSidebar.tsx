'use client'

import * as React from 'react'
import {
  IconBook,
  IconChartBar,
  IconCloudCog,
  IconCloudUpload,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/custom/nav-main'
import { NavSecondary } from '@/components/custom/nav-secondary'
import { NavUser } from '@/components/custom/nav-user'
import { authStore } from '@/store/authStore'
import { Separator } from '@/components/ui/separator'
import TooltipBtn from '@/components/custom/toolBtn'
import { Button } from '@/components/ui/button'

const data = {
  navMain: [
    {
      title: 'Documentation',
      url: '/documentation',
      icon: IconBook,
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Create New',
      url: '/dashboard/create-new',
      icon: IconCloudCog,
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: IconChartBar,
    },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: IconFolder,
    },
  ],

  navSecondary: [
    {
      title: 'Settings',
      url: '/dashboard/setting',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '/dashboard/get-help',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
}

export function DashSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = authStore()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <SidebarTrigger />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
