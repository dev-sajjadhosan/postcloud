import { auth, githubProvider, googleProvider } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { toast } from 'sonner'
import { create } from 'zustand'

interface AuthStoreProps {
  user: User | null
  loading: boolean
  isCreate: boolean

  setLoading: (val: boolean) => void
  setIsCreate: (val: boolean) => void

  popupGoogle: () => Promise<void>
  popupGithub: () => Promise<void>

  logOut: () => Promise<void>
  deleteAccount: () => Promise<void>

  updateProfile: (name: string, picture: string) => Promise<void>
  createAccount: (email: string, password: string) => Promise<User>
  loginAccount: (email: string, password: string) => Promise<void>
  initAuth: () => void
}

export const authStore = create<AuthStoreProps>((set, get) => ({
  user: null,
  loading: true,
  isCreate: false,

  setLoading: (val) => {
    set({ loading: val })
  },

  setIsCreate: (val) => {
    set({ isCreate: val })
  },

  popupGoogle: async () => {
    await signInWithPopup(auth, googleProvider)
  },

  popupGithub: async () => {
    await signInWithPopup(auth, githubProvider)
  },

  updateProfile: async (name: string, picture: string) => {
    try {
      const user = get().user
      if (!user) throw new Error('No user login!')

      await updateProfile(user, {
        displayName: name,
        photoURL: picture,
      })

      set({
        user: { ...user, displayName: name, photoURL: picture } as User,
        isCreate: true,
      })
    } catch (err) {
      console.error('Something wrong when Update Profile: ', err)
    }
  },

  logOut: async () => {
    await signOut(auth)
  },

  deleteAccount: async () => {
    try {
      const user = get().user
      if (!user) throw new Error('No user log in.')

      await deleteUser(user)
    } catch (err) {
      console.error('Something wrong when Delete Account: ', err)
    }
  },

  createAccount: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user

      toast.success('Created Account.')
      set({ user, loading: false })

      // ✅ Return the user so you can call getIdToken() later
      return user
    } catch (err) {
      console.log('Something wrong when create account: ', err)
      throw err
    }
  },

  loginAccount: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      //   console.log('LogIN user: ', userCredential.user)
      toast.success('Login Confirm.')

      set({ user: userCredential.user, loading: false })
    } catch (err) {
      console.log('Something wrong when logIN: ', err)
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, (fireUser) => {
      console.log('User Gated from Firebase:::: ', fireUser)

      set({
        user: fireUser,
        loading: false,
      })
    })
  },
}))
