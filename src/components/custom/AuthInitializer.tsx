'use client'

import { authStore } from '@/store/authStore'
import { useEffect } from 'react'

export default function AuthInitializer() {
  const initAuth = authStore(state => state.initAuth)
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return null
}
