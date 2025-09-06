'use client'

import Loader from '@/components/custom/Loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAxios } from '@/hooks/useAxios'
import { useImgBB } from '@/hooks/useImgbb'
import { authStore } from '@/store/authStore'
import { UserProfile } from '@/types/type'
import { ImagePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function UpdateProfile() {
  const { user, updateProfile, stateLoading, setStateLoading, deleteAccount } =
    authStore()
  const { register, handleSubmit, reset, watch } = useForm<UserProfile>()
  const { uploadImage, loading } = useImgBB()
  const [preview, setPreview] = useState<string | null>(null)

  const axios = useAxios()
  const router = useRouter()
  const watchPicture = watch('picture')

  useEffect(() => {
    if (watchPicture && watchPicture.length > 0) {
      const file = watchPicture[0]
      setPreview(URL.createObjectURL(file))
    }
  }, [watchPicture])

  const handleUserUpdate = async (e: UserProfile) => {
    try {
      setStateLoading(true)
      let url = null
      const file = e.picture?.[0]
      if (file) url = await uploadImage(file)
      const data = {
        uid: user?.uid,
        name: e.name,
        email: user?.email,
        username: e.username,
        bio: e.bio,
        photoURL: url || user?.photoURL,
        createDate: new Date().toLocaleDateString(),
        createTime: new Date().toLocaleTimeString(),
      }
      await updateProfile(data?.name, data.photoURL)
      const dbRes = await axios.post('/user', data)

      if (dbRes.data?.success) {
        toast.success('Profile updated successfully!')
        reset()
        setPreview(null)
      } else {
        await deleteAccount()
        toast.warning('Something wrong! Please try later.')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(msg)
    } finally {
      setStateLoading(false)
    }
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <h3 className="text-xl text-center">Update Your Profile</h3>
        <form
          className="flex items-center gap-15 mt-5 w-full"
          onSubmit={handleSubmit(handleUserUpdate)}
        >
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-64 h-64 bg-accent">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <AvatarImage src={preview || '/default.png'} alt="avatar" />
                  <AvatarFallback className="text-[9rem] text-accent-foreground text-center">
                    ?
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <Label
              htmlFor="user_picture"
              className="bg-secondary text-secondary-foreground w-fit px-4 py-2 rounded-lg text-xs font-medium duration-150 hover:bg-secondary/70 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <ImagePlus size={19} />
              Select Picture
              <input
                {...register('picture')}
                type="file"
                id="user_picture"
                name="picture"
                accept="image/*"
                hidden
              />
            </Label>
          </div>
          <div className="flex flex-col gap-5 w-sm">
            <div className="flex flex-col gap-2.5">
              <Label>Your Name</Label>
              <Input
                type="text"
                placeholder="yourname"
                {...register('name', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Your UserName</Label>
              <Input
                type="text"
                placeholder="yourname"
                {...register('username', { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                placeholder="Write your bio"
                rows={5}
                {...register('bio', { required: true })}
              />
            </div>
            <Button type="submit" disabled={stateLoading}>
              {stateLoading ? (
                <>
                  <Loader /> Uploading...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
