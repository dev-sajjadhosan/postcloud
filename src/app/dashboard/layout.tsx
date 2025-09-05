// app/dashboard/layout.tsx
'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { DashSidebar } from '@/components/custom/dashSidebar'
import { DashHeader } from '@/components/custom/dashHeader'
import { authStore } from '@/store/authStore'
import Loader from '@/components/custom/Loader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading } = authStore()

//   if (loading) return <Loader />

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <DashSidebar variant="inset" />
      <SidebarInset>
        {/* <DashHeader /> */}
        <div className="h-full">
          {children} {/* 🔥 Here your nested dashboard pages will show */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
