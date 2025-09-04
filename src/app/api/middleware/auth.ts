import { adminAuth } from '@/lib/firebaseAdmin'
import { getAuth } from 'firebase/auth'

export async function verify(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split('Bearer ')[1]
    if (!token) throw new Error('No token provided!')

    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken.udi
  } catch (err) {
    console.error('Auth Error: ', err)
    throw new Error('Unauthorize')
  }
}
