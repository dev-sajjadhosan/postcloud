'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import {
  AtSign,
  Github,
  Settings2,
  MousePointerClick,
  Rocket,
  Eye,
  EyeClosed,
} from 'lucide-react'
import TooltipBtn from '@/components/custom/toolBtn'

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
  const { register, handleSubmit, getValues, reset } =
    useForm<RegisterFormData>()
  const { user, createAccount, popupGoogle, popupGithub } = authStore()
  const router = useRouter()

  const [tab, setTab] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [loading, setLoading] = useState(false)

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) router.push('/update-profile')
  }, [user, router])
  // Handle email/password signup + API key generation
  const createHandleSubmit = async (e: RegisterFormData) => {
    const email = e.email
    const password = e.password
    try {
      setLoading(true)
      const newUser = await createAccount(email, password) // returns Firebase user

      // Get Firebase ID token
      const idToken = await newUser.getIdToken()

      // Generate API key automatically
      const key = crypto.randomUUID()
      const res = await fetch('/api/apikeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ key }),
      })
      const data = await res.json()
      if (!data.success)
        throw new Error(data.error || 'Failed to create API key')

      console.log('Register data: ',data)
      toast.success('Account created and API key generated!')
      reset()
      setTab(0)
      router.push('/update-profile')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
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
                    if (getValues('email') === '') {
                      toast.error('Please enter your email first')
                      return
                    }
                    setTab(1)
                  }}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <Label htmlFor="password">Password</Label>
                <Card className="flex-row items-center py-0 px-2 rounded-md">
                  <Input
                    className="bg-transparent! border-0"
                    type={isShow ? 'text' : 'password'}
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
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </>
            )}
          </form>

          <Separator className="w-xs my-3.5" orientation="horizontal" />
          <div className="grid grid-cols-2 gap-2.5">
            <Button variant={'outline'} onClick={popupGoogle}>
              <AtSign /> with Google
            </Button>
            <Button variant={'outline'} onClick={popupGithub}>
              <Github /> with Github
            </Button>
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
                <h3>{l.title}</h3>
                <p className="text-xs font-light w-xs">{l.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
