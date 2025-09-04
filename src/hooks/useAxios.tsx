import axios from 'axios'
import { auth } from '@/lib/firebase'

export const useAxios = () => {
  const instance = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use(async (config) => {
    const user = auth.currentUser
    if (user && config.headers) {
      const token = await user.getIdToken()
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

  return instance
}
