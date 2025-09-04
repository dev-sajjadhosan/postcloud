import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from '@/lib/firestore'
import { NextResponse } from 'next/server'

// Get single user data by uid
export async function GET(
  req: Request,
  { params }: { params: { uid: string } },
) {
  try {
    const user = await getUserProfile(params.uid)
    return NextResponse.json(user)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown Error'
    return NextResponse.json({ error: msg })
  }
}

//update profile single user by uid
export async function PUT(
  req: Request,
  { params }: { params: { uid: string } },
) {
  try {
    const data = await req.json()
    await updateUserProfile(params.uid, data)
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown Error'
    return NextResponse.json({ error: msg })
  }
}

// Delete profile by user uid
export async function DELETE(
  req: Request,
  { params }: { params: { uid: string } },
) {
  try {
    await deleteUserProfile(params.uid)
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg })
  }
}
