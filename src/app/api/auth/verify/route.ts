import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }

    // TODO: Update user in DB -> verified: true
    // e.g. await db.user.update({ where: { email: decoded.email }, data: { verified: true } })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?verified=success`)
  } catch (err) {
    console.error("Verify error:", err)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
  }
}
