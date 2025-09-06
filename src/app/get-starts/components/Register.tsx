import TooltipBtn from '@/components/custom/toolBtn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { authStore } from '@/store/authStore'
import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react'
import { ArrowBigRightDash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldValues,
} from 'react-hook-form'


interface RegisterProps {
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

export default function Register({
  register,
  handleSubmit,
  getValues,
}: RegisterProps) {
  const { popupGithub, popupGoogle, setFormTab } = authStore()
  return (
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
            <Link href={'/login'}>
              <span className="underline">Login</span>
            </Link>
          </p>
        </div>
      </div>
      <span className="h-80 w-[1px] bg-zinc-700 my-auto"></span>
      <Image width={490} height={490} alt="PostCloud" src={'/auth.svg'} />
    </>
  )
}
