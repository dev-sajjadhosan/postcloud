'use client'

import TooltipBtn from '@/components/custom/toolBtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { genPass } from '@/lib/utils'
import { UserProfile } from '@/types/type'
import { CheckCircle, CloudUpload, Dices, Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form'

type PasswordProps = {
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  setValue: (
    name: string,
    value: string | number,
    options?: Record<string, unknown>,
  ) => void
  password: string
  handleRegister: (data: UserProfile) => void
}

export default function Password({
  register,
  handleSubmit,
  setValue,
  password,
  handleRegister,
}: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

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
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="p-11">
        <h3 className="text-lg text-center">Set Your Password</h3>
        <div className="flex flex-col gap-2 mt-5">
          <Label>
            Password{' '}
            <Badge className="text-xs font-normal" variant={'secondary'}>
              {password?.length}
            </Badge>
          </Label>
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
    </>
  )
}
