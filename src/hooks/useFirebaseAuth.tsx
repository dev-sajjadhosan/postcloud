'use client'

import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useFirebaseAuth() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  async function loginWithGithub() {
    const provider = new GithubAuthProvider()
    await signInWithPopup(auth, provider)
  }

  async function loginWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function createUserWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
  }

  async function CreateViaSendLink(email: string) {
    const actionCodeSetting = {
      url: process.env.NEXT_PUBLIC_APP_URL + '/profile-ready',
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSetting)
      window.localStorage.setItem('emailForSignIn', email)
      toast.warning('Check your email for the sign-in link.')
    } catch (error) {
      toast.error('Error sending email link')
      console.error('Error sending email link', error)
    }
  }

  return {
    user,
    loginWithGoogle,
    loginWithGithub,
    logout,
    loginWithEmail,
    createUserWithEmail,
    CreateViaSendLink
  }
}
