import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { validateUserSession } from '@/lib/auth/config'
import { rateLimit } from '@/lib/rateLimit'

const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'AED', 'SGD'] as const
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

const CURRENCY_MULTIPLIERS: Record<SupportedCurrency, number> = {
  INR: 100,
  USD: 100,
  EUR: 100,
  GBP: 100,
  AUD: 100,
  CAD: 100,
  AED: 100,
  SGD: 100,
}

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  AED: 'د.إ',
  SGD: 'S$',
}

// Maximum coupon discount percentage (50% = 5000 basis points)
const MAX_COUPON_DISCOUNT_PERCENT = 50

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Rate limit order creation to prevent abuse (10 orders per hour per IP)
    const rateLimitResult = await rateLimit(request, { maxRequests: 10, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many order creation requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    // SECURITY: Validate user session before creating payment orders
    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { success: false, error: 'Authentication required to create payment orders' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { amount, currency = 'INR', receipt, notes, enrollmentId, userId, couponCode, courseId } = body

    // SECURITY: Verify the userId matches the authenticated user (prevent creating orders for others)
    if (userId && userId !== session.userId) {
      return NextResponse.json(
        { success: false, error: 'Cannot create payment order for another user' },
        { status: 403 }
      )
    }

    // Use authenticated user's ID if not provided
    const authenticatedUserId = userId || session.userId

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 })
    }

    // SECURITY: Validate payment amount against enrollment's expected amount
    // This prevents clients from manipulating the payment amount
    if (enrollmentId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: { course: true },
      })

      if (!enrollment) {
        return NextResponse.json(
          { success: false, error: 'Enrollment not found' },
          { status: 404 }
        )
      }

      // Verify enrollment belongs to the authenticated user
      if (enrollment.userId !== authenticatedUserId) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: enrollment does not belong to you' },
          { status: 403 }
        )
      }

      // Calculate expected payment amount (pending amount or course price for new enrollments)
      const expectedAmount = enrollment.pendingAmount > 0
        ? enrollment.pendingAmount
        : enrollment.course?.price || 0

      // Allow a small tolerance (1%) to account for rounding
      const tolerance = expectedAmount * 0.01
      if (Math.abs(amount - expectedAmount) > tolerance && expectedAmount > 0) {
        console.warn(`[Payment] Amount mismatch: received ${amount}, expected ${expectedAmount} for enrollment ${enrollmentId}`)
        return NextResponse.json(
          { success: false, error: 'Payment amount does not match expected amount. Please refresh and try again.' },
          { status: 400 }
        )
      }
    }

    // SECURITY: Validate coupon code on server side (never trust client-provided discount)
    let validatedDiscount = 0
    let validatedCouponCode: string | null = null
    let couponId: string | null = null

    if (couponCode && typeof couponCode === 'string') {
      try {
        const coupon = await prisma.coupons.findUnique({
          where: { code: couponCode.toUpperCase().trim() },
        })

        if (!coupon) {
          return NextResponse.json(
            { success: false, error: 'Invalid coupon code' },
            { status: 400 }
          )
        }

        const now = new Date()

        // Check if coupon is active
        if (!coupon.isActive) {
          return NextResponse.json(
            { success: false, error: 'This coupon is no longer active' },
            { status: 400 }
          )
        }

        // Check if coupon is expired
        if (coupon.expiresAt && coupon.expiresAt < now) {
          return NextResponse.json(
            { success: false, error: 'This coupon has expired' },
            { status: 400 }
          )
        }

        // Check if coupon has started
        if (coupon.startsAt && coupon.startsAt > now) {
          return NextResponse.json(
            { success: false, error: 'This coupon is not yet active' },
            { status: 400 }
          )
        }

        // Check usage limits
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
          return NextResponse.json(
            { success: false, error: 'This coupon has reached its usage limit' },
            { status: 400 }
          )
        }

        // Check per-user usage limit
        if (coupon.maxUsesPerUser) {
          const userUsageCount = await prisma.coupon_redemptions.count({
            where: {
              couponId: coupon.id,
              userId: authenticatedUserId,
            },
          })
          if (userUsageCount >= coupon.maxUsesPerUser) {
            return NextResponse.json(
              { success: false, error: 'You have already used this coupon the maximum number of times' },
              { status: 400 }
            )
          }
        }

        // Check minimum order amount
        if (coupon.minOrderAmount && amount < coupon.minOrderAmount) {
          return NextResponse.json(
            { success: false, error: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}` },
            { status: 400 }
          )
        }

        // Check if coupon is restricted to specific courses
        if (coupon.applicableCourseIds && coupon.applicableCourseIds.length > 0) {
          if (!courseId || !coupon.applicableCourseIds.includes(courseId)) {
            return NextResponse.json(
              { success: false, error: 'This coupon is not applicable to this course' },
              { status: 400 }
            )
          }
        }

        // Calculate discount (capped at MAX_COUPON_DISCOUNT_PERCENT)
        validatedDiscount = Math.min(coupon.discountPercent, MAX_COUPON_DISCOUNT_PERCENT)
        validatedCouponCode = coupon.code
        couponId = coupon.id

        console.log(`[Payment] Valid coupon: ${coupon.code}, discount: ${validatedDiscount}%`)
      } catch (couponError) {
        console.error('[Payment] Coupon validation error:', couponError)
        return NextResponse.json(
          { success: false, error: 'Error validating coupon' },
          { status: 500 }
        )
      }
    }

    // Apply discount to amount
    const discountAmount = validatedDiscount > 0 ? Math.floor(amount * validatedDiscount / 100) : 0
    const finalAmount = amount - discountAmount

    const normalizedCurrency = currency.toUpperCase() as SupportedCurrency
    if (!SUPPORTED_CURRENCIES.includes(normalizedCurrency)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported currency: ${currency}. Supported: ${SUPPORTED_CURRENCIES.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Razorpay credentials not configured')
      return NextResponse.json(
        { success: false, error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })

    const multiplier = CURRENCY_MULTIPLIERS[normalizedCurrency]
    const amountInSmallestUnit = Math.round(finalAmount * multiplier)

    const order = await razorpay.orders.create({
      amount: amountInSmallestUnit,
      currency: normalizedCurrency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        ...notes,
        originalCurrency: normalizedCurrency,
        originalAmount: amount.toString(),
        discountAmount: discountAmount.toString(),
        finalAmount: finalAmount.toString(),
        couponCode: validatedCouponCode || undefined,
      },
    })

    if (enrollmentId && authenticatedUserId) {
      await prisma.payments.create({
        data: {
          id: `pay_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`,
          userId: authenticatedUserId,
          enrollmentId,
          amount: amountInSmallestUnit,
          currency: normalizedCurrency,
          razorpayOrderId: order.id,
          status: 'PENDING',
          paymentMethod: 'RAZORPAY',
          updatedAt: new Date(),
        },
      })

      // Record coupon redemption if coupon was used
      if (couponId && validatedCouponCode) {
        await prisma.$transaction([
          // Increment coupon usage count
          prisma.coupons.update({
            where: { id: couponId },
            data: { usedCount: { increment: 1 } },
          }),
          // Create redemption record
          prisma.coupon_redemptions.create({
            data: {
              id: `redemption_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`,
              couponId,
              userId: authenticatedUserId,
              orderId: order.id,
              discountAmount: discountAmount,
              originalAmount: amount,
              finalAmount: finalAmount,
            },
          }),
        ])
      }
    }

    console.log(`Razorpay order created: ${order.id} (${normalizedCurrency} ${finalAmount}${validatedCouponCode ? ` with coupon ${validatedCouponCode}` : ''})`)

    return NextResponse.json({
      success: true,
      id: order.id,
      entity: order.entity,
      amount: order.amount,
      amountDisplay: finalAmount,
      originalAmount: amount,
      discountAmount: discountAmount,
      discountPercent: validatedDiscount,
      couponCode: validatedCouponCode,
      currency: order.currency,
      currencySymbol: CURRENCY_SYMBOLS[normalizedCurrency],
      receipt: order.receipt,
      status: order.status,
      created_at: order.created_at,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    currencies: SUPPORTED_CURRENCIES.map((code) => ({
      code,
      symbol: CURRENCY_SYMBOLS[code],
      name: getCurrencyName(code),
    })),
  })
}

function getCurrencyName(code: SupportedCurrency): string {
  const names: Record<SupportedCurrency, string> = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    AED: 'UAE Dirham',
    SGD: 'Singapore Dollar',
  }
  return names[code]
}
