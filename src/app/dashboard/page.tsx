'use client'
import DeleteAccountAlert from '@/components/custom/deleteAccountAlert'
import Loader from '@/components/custom/Loader'
import { Button } from '@/components/ui/button'
import { authStore } from '@/store/authStore'
import Image from 'next/image'

export default function Dashboard() {
  const { dbuser, loading } = authStore()
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Image
              width={300}
              height={300}
              src={dbuser?.photoURL || '/default.png'}
              alt={dbuser?.displayName || 'postcloud'}
            />
            <h1 className="text-4xl">{dbuser?.displayName || dbuser?.name}</h1>
            <h3 className="text-sm">{dbuser?.email}</h3>
            <p className="text-sm mt-1.5 tracking-wide w-5xl text-center">
              {dbuser?.bio}
            </p>
            <div className="mt-5 space-x-5">
              <DeleteAccountAlert
                label="Logout"
                title="Are you absolutely sure?"
                description="This action cannot be undone."
                // action={}
              />
              <DeleteAccountAlert
                label="Delete Account"
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account
        and remove your data from our servers."
                contentClassnName="w-lg!"
                // action={}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
