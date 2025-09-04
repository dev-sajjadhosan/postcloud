import { createUserProfile } from '@/lib/firestore'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { uid, data } = await req.json()
    await createUserProfile(uid, data)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
