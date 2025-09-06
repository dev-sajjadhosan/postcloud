'use client'

import TooltipBtn from '@/components/custom/toolBtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { genPass } from '@/lib/utils'
import { authStore } from '@/store/authStore'
import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react'
import {
  ArrowBigRightDash,
  CheckCircle,
  CloudUpload,
  Dices,
  Eye,
  EyeClosed,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function GetStart() {
  const [formTab, setFormTab] = useState(1)
  const { popupGithub, popupGoogle } = authStore()
  const { register, handleSubmit, getValues, setValue, watch } = useForm()
  const password = watch('password', '')
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = (data: any) => {
    console.log('Register:', data)
  }

  // ✅ Password conditions
  const conditions = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains lowercase (a-z)', valid: /[a-z]/.test(password) },
    { label: 'Contains uppercase (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'Contains number (0-9)', valid: /\d/.test(password) },
    {
      label: 'Contains special character',
      valid: /[!@#$%^&*,.?]/.test(password),
    },
  ]

  const allValid = conditions.every((c) => c.valid)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-6xl bg-zinc-900 p-10 rounded-xl flex gap-5 duration-200">
        {formTab === 0 ? (
          // --- Step 1: Email Tab ---
          <>
            <div className="shrink-0 w-xs">
              <div className="flex flex-col gap-4 mt-7">
                <div
                  onClick={popupGithub}
                  className="p-5 flex gap-3 text-xl font-normal items-center justify-center bg-primary text-primary-foreground rounded-xl cursor-pointer hover:bg-primary/75 active:scale-95"
                >
                  <IconBrandGithub strokeWidth={1} size={31} /> Github
                </div>
                <div
                  onClick={popupGoogle}
                  className="p-5 flex gap-3 text-xl font-normal items-center justify-center bg-primary text-primary-foreground rounded-xl cursor-pointer hover:bg-primary/75 active:scale-95"
                >
                  <IconBrandGoogleFilled strokeWidth={1} size={31} /> Google
                </div>
                <Separator />
                <form
                  className="flex flex-col gap-2 mt-5"
                  onSubmit={handleSubmit(() => setFormTab(1))}
                >
                  <Label>Email</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="email"
                      placeholder="write.your@email.com"
                      {...register('email', { required: true })}
                      required
                    />
                    <TooltipBtn
                      label="Next"
                      icon={<ArrowBigRightDash />}
                      variant="default"
                      action={() => {
                        const email = getValues('email')
                        if (email) setFormTab(1)
                      }}
                    />
                  </div>
                </form>
                <p className="text-sm font-light">
                  Already have an account?{' '}
                  <span className="underline">Login</span>
                </p>
              </div>
            </div>
            <span className="h-80 w-[1px] bg-zinc-700 my-auto"></span>
            <Image width={490} height={490} alt="PostCloud" src={'/auth.svg'} />
          </>
        ) : (
          // --- Step 2: Password Tab ---
          <form onSubmit={handleSubmit(handleRegister)} className="p-11">
            <h3 className="text-lg text-center">Set Your Password</h3>
            <div className="flex flex-col gap-2 mt-5">
              <Label>Password <Badge className='text-xs font-normal' variant={'secondary'}>{password?.length}</Badge></Label>
              <div className="flex items-center gap-1.5 mt-2 bg-neutral-900 px-3 py-1 border border-neutral-700 rounded-md">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="yourPass12@#"
                  {...register('password', { required: true })}
                  required
                  className="bg-transparent! border-0 focus-visible:ring-0"
                />

                <TooltipBtn
                  label={showPassword ? 'Hide' : 'Show'}
                  icon={showPassword ? <EyeClosed /> : <Eye />}
                  action={() => setShowPassword(!showPassword)}
                />
                <TooltipBtn
                  label="Generate Password"
                  icon={<Dices />}
                  variant="secondary"
                  action={() =>
                    setValue('password', genPass(), { shouldValidate: true })
                  }
                />
              </div>

              {!allValid ? (
                <>
                  <p className="text-sm font-normal text-muted-foreground mt-2.5">
                    Your Password Status
                  </p>
                  <ul className="grid grid-cols-2 gap-2.5 text-sm">
                    {conditions.map((c, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2.5 text-muted-foreground `}
                      >
                        <CheckCircle
                          size={17}
                          className={`${
                            c.valid ? 'text-green-600' : 'text-red-600'
                          }`}
                        />{' '}
                        {c.label}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Button type="submit" className="mt-2.5 mx-auto">
                  Create
                  <CloudUpload />
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
