import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

function generateReferralCode(email: string, name: string): string {
  const namePart = name
    .split(' ')[0]
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .substring(0, 4)

  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase()

  return `${namePart}${randomPart}`
}

export async function POST(request: NextRequest) {
  try {
    const { userId, email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    const existingCode = await prisma.referral_codes.findFirst({
      where: { userEmail: email },
    })

    if (existingCode) {
      return NextResponse.json({
        success: true,
        code: existingCode.code,
        discount: existingCode.discount,
        uses: existingCode.uses,
        maxUses: existingCode.maxUses,
        message: 'Your existing referral code',
      })
    }

    let code = generateReferralCode(email, name)
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      const codeExists = await prisma.referral_codes.findUnique({
        where: { code },
      })

      if (!codeExists) {
        break
      }

      code = generateReferralCode(email, name)
      attempts++
    }

    if (attempts === maxAttempts) {
      return NextResponse.json(
        { error: 'Failed to generate unique referral code' },
        { status: 500 }
      )
    }

    const referralCode = await prisma.referral_codes.create({
      data: {
        code,
        userId: userId || null,
        userEmail: email,
        discount: 500,
        maxUses: 10,
      },
    })


    return NextResponse.json({
      success: true,
      code: referralCode.code,
      discount: referralCode.discount,
      uses: referralCode.uses,
      maxUses: referralCode.maxUses,
      message: 'Referral code generated successfully',
    })
  } catch (error) {
    console.error('Referral code generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate referral code',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
    }

    const referralCode = await prisma.referral_codes.findFirst({
      where: { userEmail: email },
      include: {
        redemptions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!referralCode) {
      return NextResponse.json(
        {
          success: false,
          message: 'No referral code found for this email',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      code: referralCode.code,
      discount: referralCode.discount,
      uses: referralCode.uses,
      maxUses: referralCode.maxUses,
      redemptions: referralCode.redemptions,
      totalEarnings: referralCode.uses * referralCode.discount,
    })
  } catch (error) {
    console.error('Fetch referral code error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch referral code',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
