import { useState } from 'react'
import { toast } from 'sonner'

export const useImgBB = () => {
  const [loading, setLoading] = useState(false)

  const uploadImage = async (file: File) => {
    try {
      if (!file) return null
      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      setLoading(false)

      if (data.success) return data.data.url
      toast.error('Failed to upload image')
      return null
    } catch (err) {
      setLoading(false)
      toast.error('Something went wrong with image upload')
      return null
    }
  }

  return { uploadImage, loading }
}
