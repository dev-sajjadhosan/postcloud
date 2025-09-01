import { authStore } from '@/store/authStore'

export default function UpdateProfile() {
  const { user, isCreate, setIsCreate } = authStore()
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-4xl">Update Profile</h3>
      </div>
    </>
  )
}
