// /api/user/route.ts
import { NextResponse } from 'next/server'
import { adminDB } from '@/lib/firebaseAdmin'
import { verify } from '@/app/api/middleware/auth'

export async function POST(req: Request) {
  try {
    const uid = await verify(req)
    const data = await req.json()
    await adminDB.collection('users').doc(uid).set(data)

    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 401 })
  }
}

export async function GET(req: Request) {
  return NextResponse.json({ message: 'POST only route, please send JSON' })
}
