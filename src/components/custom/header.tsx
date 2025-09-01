import ProfilePopover from '@/components/custom/profilePop'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-5xl sticky top-5 mx-auto flex justify-between items-center py-2 px-5 rounded-xl bg-secondary text-primary">
      <div className="flex items-center gap-0.5">
        <Image src="/icon.png" width={30} height={30} alt="PostCloud icon" />
        <h1 className="text-lg font-light font-gor">PostCloud</h1>
      </div>

      <nav className="space-x-1.5">
        <Button className="px-5!">Log in</Button>
      </nav>
      <nav className="flex items-center gap-3">
        <Button className="px-5!" variant={'secondary'}>
          Dashboard
        </Button>

        <ProfilePopover />
      </nav>
    </header>
  )
}
