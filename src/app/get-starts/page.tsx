'use client'

import Password from '@/app/get-starts/components/password'
import Register from '@/app/get-starts/components/Register'
import UpdateProfile from '@/app/get-starts/components/updateProfile'
import { authStore } from '@/store/authStore'
import { UserProfile } from '@/types/type'
import { useForm } from 'react-hook-form'

export default function GetStart() {
  const { formTab } = authStore()
  const { register, handleSubmit, getValues, setValue, watch } = useForm()
  const password = watch('password', '')

  const handleRegister = (data: UserProfile) => {
    console.log('Register:', data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl bg-zinc-900 p-10 rounded-xl flex gap-5 duration-200">
        {formTab === 0 ? (
          // --- Step 1: Email Tab ---
          <Register
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
          />
        ) : formTab === 1 ? (
          // --- Step 2: Password Tab ---
          <Password
            register={register}
            handleSubmit={handleSubmit}
            setValue={setValue}
            password={password}
            handleRegister={handleRegister}
          />
        ) : (
          <UpdateProfile />
        )}
      </div>
    </div>
  )
}
