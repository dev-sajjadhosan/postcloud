'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import {
  Settings2,
  MousePointerClick,
  // ShieldCheck,
  // BarChart3,
  // Mail,
  Rocket,
  AtSign,
  Github,
  Eye,
  EyeClosed,
} from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState } from 'react'
import TooltipBtn from '@/components/custom/toolBtn'
import { authStore } from '@/store/authStore'
import { redirect } from 'next/navigation'

const features = [
  {
    icon: <Settings2 className="w-5 h-5" />,
    title: 'Quick Setup',
    description: 'Connect your Gmail in minutes and start sending instantly.',
  },
  {
    icon: <MousePointerClick className="w-5 h-5" />,
    title: 'Easy to Use',
    description: 'Simple, plug-and-play API for developers and teams.',
  },
  //   {
  //     icon: <ShieldCheck className="w-5 h-5" />,
  //     title: 'Secure Access',
  //     description:
  //       'Encrypted credentials and safe authentication for peace of mind.',
  //   },
  //   {
  //     icon: <BarChart3 className="w-5 h-5" />,
  //     title: 'Smart Analytics',
  //     description:
  //       'Track email delivery, opens, and clicks with real-time insights.',
  //   },
  //   {
  //     icon: <Mail className="w-5 h-5" />,
  //     title: 'Custom Templates',
  //     description: 'Save time with branded, reusable email templates.',
  //   },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: 'Reliable Delivery',
    description: 'Optimized for inbox placement, not spam folders.',
  },
]

type RegisterFormData = {
  email: string
  password: string
}

export default function Register() {
  const { register, handleSubmit, reset, getValues } =
    useForm<RegisterFormData>()
  const { user, createAccount } = authStore()

  const [tab, setTab] = useState(0)
  const [isShow, setIsShow] = useState(false)

  const createHandleSubmit = async (e: { email: string; password: string }) => {
    const email = e.email
    const pass = e.password
    await createAccount(email, pass)
    reset()
    if (user) {
      redirect('/update-profile')
    }
  }

  return (
    <>
      <div className="flex justify-between h-screen">
        <Card className="bg-transparent! border-0 mx-auto">
          <CardContent className="w-xl p-10">
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image src={'/icon.png'} width={55} height={55} alt="postCloud" />
              <h1 className="text-3xl font-light mb-5">
                Welcome To Post
                <span className="bg-[#e96080] text-primary-foreground font-bold rounded-sm px-1">
                  Cloud
                </span>
              </h1>
            </div>

            <form
              className="flex flex-col gap-3.5 mt-15"
              onSubmit={handleSubmit(createHandleSubmit)}
            >
              {tab === 0 ? (
                <>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    required
                    {...register('email', { required: true })}
                    placeholder="your@email.com"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setTab(1)
                      if (getValues('email') === '') {
                        toast.error('Please enter your email first')
                        setTab(0)
                      }
                    }}
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <Label htmlFor="email">Password</Label>
                  <Card className="flex-row items-center py-0 px-2 rounded-md">
                    <Input
                      className="bg-transparent! border-0"
                      type={isShow ? 'text' : 'password'}
                      // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...register('password', { required: true })}
                      placeholder="password$0123"
                    />
                    <TooltipBtn
                      label={isShow ? 'Hide' : 'Show'}
                      icon={isShow ? <EyeClosed /> : <Eye />}
                      action={() => setIsShow(!isShow)}
                    />
                  </Card>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant={'secondary'}
                      onClick={() => setTab(0)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Create Account
                    </Button>
                  </div>
                </>
              )}
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
            <div className="flex items-center justify-end mt-3">
              <Label className="text-primary/50">Have an account ?</Label>
              <Link href={'/login'}>
                <Button variant={'link'} className="ml-2 text-[#e96080]">
                  Sign in
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col items-center justify-center w-2xl h-full bg-[#e96080] ">
          <ul className="flex flex-col gap-3">
            {features.map((l, i) => (
              <li key={i} className="flex items-center gap-3">
                <Card className="bg-secondary w-15 h-15 p-0 items-center justify-center">
                  {l.icon}
                </Card>
                <div className="flex flex-col gap-0.5">
                  <h3 className=""> {l.title}</h3>
                  <p className="text-xs font-light w-xs">{l.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
