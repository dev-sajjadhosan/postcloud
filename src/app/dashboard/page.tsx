'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { authStore } from '@/store/authStore'
import { IconSquareRoundedPlus } from '@tabler/icons-react'
import Link from 'next/link'

// app/dashboard/page.tsx
export default function DashboardPage() {
  const { dbuser } = authStore()

  return (
    <>
      {[]?.length <= 0 ? (
        <div className="flex items-center justify-center h-full">
          <Card className="w-xl h-60 bg-transparent! border-0">
            <CardContent className="flex flex-col gap-1.5 items-center justify-center h-full text-center">
              <h3 className="text-4xl">No Project</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                odio consequatur nostrum architecto in sequi, voluptatum ab?
              </p>
              <Link href={'create-new'}>
                <Button size={'sm'} className="mt-5">
                  <IconSquareRoundedPlus /> Create One
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="p-5">Dashboard</div>
      )}
    </>
  )
}
