import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { rateLimit } from '@/lib/rateLimit'
import { validateUserSession } from '@/lib/auth/config'
import { notifyAdminFormSubmission } from '@/lib/notifications/adminLeadNotification'
import {
  getPricingForClass,
  type ClassLevel as PricingClassLevel,
  type CourseType as PricingCourseType,
  type TierLevel,
} from '@/data/pricing'

function getRazorpayInstance() {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured')
  }
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

interface EnrollmentOrderRequest {
  studentName: string
  email: string
  phone: string
  classLevel: string
  courseType: string
  tier: string
  batchId: string
  batchName: string
  paymentPlan: 'lumpSum' | 'twoInstallments' | 'threeInstallments'
  // Client-sent amounts are accepted for backward compatibility but NEVER
  // trusted — all prices are derived server-side from src/data/pricing.ts.
  amount?: number
  installmentAmount?: number
  totalAmount?: number
  wantsCounselor: boolean
}

const PAYMENT_PLANS = ['lumpSum', 'twoInstallments', 'threeInstallments'] as const

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 10,
      windowMs: 60 * 60 * 1000,
    })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many enrollment attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // SECURITY: Require authentication for enrollment order creation
    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required to create enrollment' },
        { status: 401 }
      )
    }

    const body: EnrollmentOrderRequest = await request.json()

    const {
      studentName,
      email,
      phone,
      classLevel,
      courseType,
      tier,
      batchId,
      batchName,
      paymentPlan,
      totalAmount,
      wantsCounselor,
    } = body

    if (!studentName || !email || !phone || !classLevel || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const phoneRegex = /^[+]?[\d\s-]{10,15}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    // SECURITY: Never trust client-sent amounts. Derive every price from the
    // canonical table — same math as the checkout UI (base + 18% GST, then
    // the installment split), so the charge always matches what was displayed.
    // Reject an unrecognized plan rather than silently defaulting to lumpSum,
    // which would charge the full amount a confused client never displayed.
    if (!PAYMENT_PLANS.includes(paymentPlan)) {
      return NextResponse.json({ error: 'Invalid payment plan' }, { status: 400 })
    }
    const planKey = paymentPlan
    const tierPricing = getPricingForClass(
      classLevel as PricingClassLevel,
      courseType as PricingCourseType
    )?.find((t) => t.tier === (tier as TierLevel))

    if (!tierPricing) {
      return NextResponse.json(
        { error: 'Invalid course, tier, or plan selection' },
        { status: 400 }
      )
    }

    const baseTotal = tierPricing.prices[planKey]
    const gst = Math.round(baseTotal * 0.18)
    const grandTotalRupees = baseTotal + gst
    const firstPaymentRupees =
      planKey === 'lumpSum'
        ? grandTotalRupees
        : planKey === 'twoInstallments'
          ? Math.round(grandTotalRupees * 0.5)
          : Math.round(grandTotalRupees * 0.4)

    if (totalAmount && Math.round(totalAmount) !== grandTotalRupees) {
      console.warn(
        `Enrollment order: client total ₹${totalAmount} != server total ₹${grandTotalRupees} for ${classLevel}/${courseType}/${tier}/${planKey} — using server total`
      )
    }

    // All course/enrollment money columns are stored in paise (Razorpay's unit).
    const totalAmountPaise = grandTotalRupees * 100

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay credentials not configured')
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 })
    }

    const razorpay = getRazorpayInstance()

    // Find or create user
    let user = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    })

    if (!user) {
      user = await prisma.users.create({
        data: {
          id: nanoid(),
          email,
          phone,
          name: studentName,
          role: 'STUDENT',
          updatedAt: new Date(),
        },
      })
    }

    // Find the course based on class level and course type
    const courseMapping: Record<string, { type: string; class: string }> = {
      'foundation-9': { type: 'FOUNDATION', class: 'CLASS_9' },
      'foundation-10': { type: 'FOUNDATION', class: 'CLASS_10' },
      'class-11': { type: 'CLASS_11', class: 'CLASS_11' },
      'class-12': { type: 'CLASS_12', class: 'CLASS_12' },
      dropper: { type: 'DROPPER', class: 'DROPPER' },
      '2-year': { type: 'NEET_COMPLETE', class: 'CLASS_11' },
    }

    const courseInfo = courseMapping[classLevel] || { type: 'CLASS_11', class: 'CLASS_11' }

    let course = await prisma.courses.findFirst({
      where: {
        type: courseInfo.type as
          | 'FOUNDATION'
          | 'CLASS_11'
          | 'CLASS_12'
          | 'DROPPER'
          | 'NEET_COMPLETE',
        class: courseInfo.class as 'CLASS_9' | 'CLASS_10' | 'CLASS_11' | 'CLASS_12' | 'DROPPER',
        isActive: true,
      },
    })

    // If no course found, create a placeholder course rather than blocking the
    // enrollment. Fees and tier are server-derived above, and the tier keyword
    // in the name keeps mapCourseToTier correct for these rows.
    if (!course) {
      console.warn(
        `Enrollment order: no active course for ${courseInfo.type}/${courseInfo.class} — creating placeholder`
      )
      course = await prisma.courses.create({
        data: {
          id: nanoid(),
          name: `${tier} - ${classLevel} - ${courseType || 'NEET'}`,
          type: courseInfo.type as
            | 'FOUNDATION'
            | 'CLASS_11'
            | 'CLASS_12'
            | 'DROPPER'
            | 'NEET_COMPLETE',
          class: courseInfo.class as 'CLASS_9' | 'CLASS_10' | 'CLASS_11' | 'CLASS_12' | 'DROPPER',
          duration: classLevel === '2-year' ? 24 : 12,
          totalFees: totalAmountPaise,
          isActive: true,
          updatedAt: new Date(),
        },
      })
    }

    // Map payment plan to enum
    const paymentPlanMap: Record<string, 'FULL' | 'QUARTERLY' | 'MONTHLY'> = {
      lumpSum: 'FULL',
      twoInstallments: 'QUARTERLY',
      threeInstallments: 'MONTHLY',
    }

    // Create enrollment with PENDING status
    const enrollment = await prisma.enrollments.create({
      data: {
        id: nanoid(),
        userId: user.id,
        courseId: course.id,
        status: 'PENDING',
        totalFees: totalAmountPaise,
        paidAmount: 0,
        pendingAmount: totalAmountPaise,
        paymentPlan: paymentPlanMap[planKey] || 'FULL',
        updatedAt: new Date(),
      },
    })

    // Create Razorpay order for the first installment amount. These notes are
    // set server-side and echoed back on the payment entity in the webhook —
    // notes.tier is what activates the student's coachingTier.
    const orderOptions = {
      amount: firstPaymentRupees * 100, // paise
      currency: 'INR',
      receipt: `enroll_${enrollment.id}_${Date.now()}`,
      notes: {
        enrollmentId: enrollment.id,
        userId: user.id,
        studentName,
        email,
        phone,
        classLevel,
        courseType: courseType || 'neet',
        tier,
        batchId,
        batchName,
        paymentPlan: planKey,
        totalAmount: grandTotalRupees.toString(),
        installmentAmount: firstPaymentRupees.toString(),
        wantsCounselor: wantsCounselor ? 'yes' : 'no',
      },
    }

    const order = await razorpay.orders.create(orderOptions)

    // Create payment record
    await prisma.payments.create({
      data: {
        id: nanoid(),
        userId: user.id,
        enrollmentId: enrollment.id,
        amount: firstPaymentRupees * 100, // Store in paise
        currency: 'INR',
        status: 'PENDING',
        paymentMethod: 'RAZORPAY_UPI',
        razorpayOrderId: order.id,
        installmentNumber: 1,
        totalInstallments: planKey === 'lumpSum' ? 1 : planKey === 'twoInstallments' ? 2 : 3,
        updatedAt: new Date(),
      },
    })

    notifyAdminFormSubmission('Enrollment Order Created', {
      Student: studentName,
      Email: email,
      Phone: phone,
      Class: classLevel,
      Tier: tier,
      Batch: batchName,
      'Payment Plan': planKey,
      'Installment Amount': `₹${firstPaymentRupees}`,
      'Total Amount': `₹${grandTotalRupees}`,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      orderId: order.id,
      enrollmentId: enrollment.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      prefill: {
        name: studentName,
        email,
        contact: phone,
      },
    })
  } catch (error) {
    console.error('Enrollment order creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create enrollment order',
        details: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
