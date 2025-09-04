import { verify } from '@/app/api/middleware/auth'
import { addApiKey, getApiKeys } from '@/lib/firestore'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const uid = await verify(req)
    const { key } = await req.json()
    await addApiKey(uid, key)
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg })
  }
}

export async function GET(req: Request) {
  try {
    const uid = await verify(req)
    const keys = await getApiKeys(uid)
    return NextResponse.json(keys)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg })
  }
}
