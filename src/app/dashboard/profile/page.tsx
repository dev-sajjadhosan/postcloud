'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authStore } from '@/store/authStore'
import { IconTransitionRightFilled, IconTrashFilled } from '@tabler/icons-react'

export default function Profile() {
  const { dbuser } = authStore()
  return (
    <div className="p-9 flex flex-col items-center justify-between h-full">
      <div className="flex items-center gap-5 justify-between">
        <Avatar className="w-70 h-70 border">
          <AvatarImage src={dbuser?.photoURL} alt={dbuser?.displayName} />
          <AvatarFallback>MH</AvatarFallback>
        </Avatar>
        <div className="text-left space-y-1">
          <h1 className="text-2xl font-medium">{dbuser?.name}</h1>
          <p className="text-sm text-muted-foreground">{dbuser?.email}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {dbuser?.bio.slice(0, 250)}
          </p>
        </div>
      </div>
      <div className="mt-9 grid grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full!">
            <CardContent></CardContent>
          </Card>
        ))}
      </div>
      <footer className="flex items-center justify-end w-full">
        <div className="flex items-center gap-5">
          <Button variant={'secondary'}>
            Logout <IconTransitionRightFilled />{' '}
          </Button>
          <Button>
            Delete account
            <IconTrashFilled />
          </Button>
        </div>
      </footer>
    </div>
  )
}
