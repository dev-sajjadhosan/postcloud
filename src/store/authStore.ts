import { ensureUserProfile } from '@/lib/ensureUserProfile'
import { auth, githubProvider, googleProvider } from '@/lib/firebase'
import { getUserProfile } from '@/lib/firestore'
import { UserProfile } from '@/types/type'
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
  dbuser: UserProfile | null

  loading: boolean
  stateLoading: boolean
  isCreate: boolean

  setLoading: (val: boolean) => void
  setStateLoading: (val: boolean) => void
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
  dbuser: null,

  loading: true,
  stateLoading: false,
  isCreate: false,

  setLoading: (val) => {
    set({ loading: val })
  },

  setStateLoading: (val) => {
    set({ stateLoading: val })
  },
  setIsCreate: (val) => {
    set({ isCreate: val })
  },

  popupGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      await ensureUserProfile(user)

      toast.success('Logged in with Google ✅')
      set({ user: user })
    } catch (err) {
      console.error('Google login error:', err)
      toast.error('Google login failed ❌')
    }
  },

  popupGithub: async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const user = result.user

      await ensureUserProfile(user)

      toast.success('Logged in with GitHub ✅')
      set({ user: user })
    } catch (err) {
      console.error('GitHub login error:', err)
      toast.error('GitHub login failed ❌')
    }
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
      await ensureUserProfile(userCredential?.user)
      toast.success('Login Confirm.')

      set({ user: userCredential.user, loading: false })
    } catch (err) {
      console.log('Something wrong when logIN: ', err)
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (fireUser) => {
      if (fireUser) {
        // get Firestore profile
        const dbUserData = await getUserProfile(fireUser.uid)
        const dbUser: UserProfile | null = dbUserData
          ? {
              name: dbUserData.name ?? '',
              username: dbUserData.username ?? '',
              bio: dbUserData.bio ?? '',
              ...dbUserData,
            }
          : null

        set({
          user: fireUser,
          dbuser: dbUser, // 🔥 add your custom profile here
          loading: false,
        })
      } else {
        set({
          user: null,
          dbuser: null,
          loading: false,
        })
      }
    })
  },
}))
