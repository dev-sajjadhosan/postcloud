import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'

export async function ensureUserProfile(user: User) {
  const profileRef = doc(db, 'users', user.uid)
  const snap = await getDoc(profileRef)

  const loginInfo = {
    lastLogin: serverTimestamp(),
    lastLoginDate: new Date().toLocaleDateString(),
    lastLoginTime: new Date().toLocaleTimeString(),
    device: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
  }

  if (!snap.exists()) {
    // First time → create profile
    await setDoc(profileRef, {
      name: user.displayName || '',
      email: user.email,
      photoURL: user.photoURL || '/default.png',
      username: user.email?.split('@')[0],
      createdAt: serverTimestamp(),
      ...loginInfo,
    })
  } else {
    // Already exists → just update login info
    await updateDoc(profileRef, loginInfo)
  }
}
