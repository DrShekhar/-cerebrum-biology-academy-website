import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { prisma } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID
const jwtSecret = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json()

    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: 'Phone number and verification code are required' },
        { status: 400 }
      )
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error('Missing Twilio credentials')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const client = twilio(accountSid, authToken)

    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      })

    if (verificationCheck.status !== 'approved') {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    let user = await prisma.users.findFirst({
      where: { phone: phoneNumber },
    })

    if (!user) {
      user = await prisma.users.create({
        data: {
          phone: phoneNumber,
          role: 'STUDENT',
          emailVerified: new Date(),
        },
      })
    }

    const token = sign(
      {
        userId: user.id,
        phone: user.phone,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    })
  } catch (error: any) {
    console.error('Error verifying WhatsApp OTP:', error)

    return NextResponse.json(
      {
        error: 'Failed to verify OTP',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
