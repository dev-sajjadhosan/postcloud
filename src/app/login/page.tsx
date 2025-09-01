import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  AtSign,
  Github,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export default function Login() {
  return (
    <>
      <div className="flex flex-row-reverse items-center justify-between h-screen">
        <Card className="bg-transparent! border-0 mx-auto">
          <CardContent className="w-lg p-10">
            <div className="flex flex-col gap-1 items-center justify-center">
              <Image src={'/icon.png'} width={55} height={55} alt="postCloud" />
              <h1 className="text-3xl font-light mb-4">Welcome Back</h1>
            </div>

            <form className="flex flex-col gap-3.5 mt-15">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="your@email.com" />
              <Button>Sign in</Button>
            </form>
            <Separator className="w-xs my-3.5" orientation="horizontal" />
            <div className="grid grid-cols-2 gap-2.5">
              <Button variant={'outline'}>
                <AtSign /> with Google
              </Button>
              <Button variant={'outline'}>
                <Github /> with Github
              </Button>
            </div>
            <div className="flex items-center justify-end mt-1">
              <Label className="text-primary/50">
                Don&apos;t have account ?
              </Label>
              <Link href={'/register'}>
                <Button variant={'link'} className="text-[#e96080]">
                  Sign up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col items-center justify-center w-2xl h-full bg-[#e96080] ">
          <Image
            width={300}
            height={300}
            src={'/login.svg'}
            alt="PostCloud-Login"
          />
        </div>
      </div>
    </>
  )
}
