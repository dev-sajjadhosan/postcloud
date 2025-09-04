import { getEmailLogs, logEmail } from '@/lib/firestore'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { uid, emailData } = req.json()
  await logEmail(uid, emailData)
  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const uid = searchParams.get('uid')

  if (!uid) return NextResponse.json({ error: 'Messing uid' }, { status: 400 })
  const logs = await getEmailLogs(uid)
  return NextResponse.json(logs)
}
