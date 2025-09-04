// hooks/useAxios.ts
'use client'

import { useState, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import { auth } from '@/lib/firebase'

export const useAxios = (baseURL = '/api') => {
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance>()

  useEffect(() => {
    const instance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    })

    // Add interceptor to attach Firebase token
    instance.interceptors.request.use(async (config) => {
      const user = auth.currentUser
      if (user && config.headers) {
        const token = await user.getIdToken()
        // TS-safe way to set Authorization
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })

    setAxiosInstance(instance)
  }, [baseURL])

  return axiosInstance
}
