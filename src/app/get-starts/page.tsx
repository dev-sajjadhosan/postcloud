'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { authStore } from '@/store/authStore'
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function GetStart() {
  const { register, handleSubmit, reset } = useForm()
  const [tab, setTab] = useState(0)
  const [formTab, setFormTab] = useState(0)
  const { popupGithub, popupGoogle } = authStore()

    //  when i go to password tab then show a password com with input + btn ---- password status (strong status)



  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-6xl bg-zinc-900 p-13 rounded-xl flex gap-5">
          <div className="shrink-0 w-xs">
            <div className="flex flex-col gap-4.5 mt-7">
              <div
                onClick={popupGithub}
                className="p-5 rotate-z-5 flex gap-3 text-xl font-normal items-center justify-center bg-primary text-primary-foreground rounded-xl duration-200 cursor-pointer hover:bg-primary/75 hover:rotate-z-0 active:scale-95"
              >
                <IconBrandGithub strokeWidth={1} size={31} /> Github
              </div>
              <div
                onClick={popupGoogle}
                className="p-5 rotate-z-5 flex gap-3 text-xl font-normal items-center justify-center bg-primary text-primary-foreground rounded-xl duration-200 cursor-pointer hover:bg-primary/75 hover:rotate-z-0 active:scale-95"
              >
                <IconBrandGoogleFilled strokeWidth={1} size={31} /> Google
              </div>
              <Separator />
              <form className="flex flex-col gap-2 mt-5">
                <Label>Email</Label>
                <Input type="email" placeholder="write.your@email.com" />
              </form>
              <p className="text-sm font-light">
                Already have an account ? Login
              </p>
            </div>
          </div>
          <span className="h-80 w-[1px] bg-zinc-700 my-auto"></span>
          <Image width={490} height={490} alt="PostCloud" src={'/auth.svg'} />
        </div>
      </div>
    </>
  )
}
