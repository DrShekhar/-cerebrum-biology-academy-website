import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error('Missing Twilio credentials')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const client = twilio(accountSid, authToken)

    const verification = await client.verify.v2.services(verifyServiceSid).verifications.create({
      to: phoneNumber,
      channel: 'whatsapp',
    })

    console.log('OTP sent successfully:', verification.status)

    return NextResponse.json({
      success: true,
      status: verification.status,
      message: 'OTP sent successfully via WhatsApp',
    })
  } catch (error: any) {
    console.error('Error sending WhatsApp OTP:', error)

    return NextResponse.json(
      {
        error: 'Failed to send OTP',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
