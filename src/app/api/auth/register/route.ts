import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // TODO: Save user to DB here with "verified: false"
    // e.g. await db.user.create({ email, password: hashedPass, verified: false })

    // Generate verification token (valid 15 minutes)
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`

    await transporter.sendMail({
      from: `"PostCloud" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Verify your PostCloud account",
      html: `
        <h2>Welcome to PostCloud 🚀</h2>
        <p>Please verify your email to activate your account:</p>
        <a href="${verifyUrl}" style="padding:10px 20px;background:#1D4ED8;color:#fff;text-decoration:none;border-radius:6px">Verify Account</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    })

    return NextResponse.json({ success: true, message: "Verification email sent" })
  } catch (err) {
    console.error("Register error:", err)
    const errorMessage = err instanceof Error ? err.message : "Internal server error"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}