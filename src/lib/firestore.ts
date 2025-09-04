// lib/firestore.ts
import { EmailLog, UserProfile } from '@/types/type'
import { db } from './firebase'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

// ---------------- USERS ----------------

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>,
) {
  await updateDoc(doc(db, 'users', uid), data)
}

export async function deleteUserProfile(uid: string) {
  await deleteDoc(doc(db, 'users', uid))
}

// ---------------- API KEYS ----------------
export async function addApiKey(uid: string, key: string) {
  await addDoc(collection(db, 'users', uid, 'apiKeys'), {
    key,
    status: 'active',
    createdAt: serverTimestamp(),
  })
}

export async function getApiKeys(uid: string) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'apiKeys'))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// ---------------- EMAIL LOGS ----------------
export async function logEmail(uid: string, emailData: EmailLog) {
  await addDoc(collection(db, 'users', uid, 'emailLogs'), {
    ...emailData,
    createdAt: serverTimestamp(),
  })
}

export async function getEmailLogs(uid: string) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'emailLogs'))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
