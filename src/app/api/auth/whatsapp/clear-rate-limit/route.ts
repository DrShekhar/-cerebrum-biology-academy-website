import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const result = await prisma.whatsapp_otp.deleteMany({})

    return NextResponse.json({
      success: true,
      message: `Cleared ${result.count} OTP records. Rate limit reset.`,
      count: result.count,
    })
  } catch (error: any) {
    console.error('Error clearing OTP records:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear rate limit records',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
