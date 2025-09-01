import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock DB (replace with real DB like Prisma, MongoDB, etc.)
const mockUsers: any[] = [] // example: { email, passwordHash, verified }

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Find user in DB
    const user = mockUsers.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.verified) {
      return NextResponse.json({ error: "Email not verified" }, { status: 403 })
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate login token (valid 7 days)
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({ success: true, token })
  } catch (err: any) {
    console.error("Login error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
