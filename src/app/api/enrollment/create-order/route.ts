import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

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
  amount: number
  installmentAmount: number
  totalAmount: number
  wantsCounselor: boolean
}

export async function POST(request: NextRequest) {
  try {
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
      amount,
      installmentAmount,
      totalAmount,
      wantsCounselor,
    } = body

    if (!studentName || !email || !phone || !classLevel || !tier || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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

    // If no course found, create a placeholder course
    if (!course) {
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
          totalFees: totalAmount,
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
        totalFees: totalAmount,
        paidAmount: 0,
        pendingAmount: totalAmount,
        paymentPlan: paymentPlanMap[paymentPlan] || 'FULL',
        updatedAt: new Date(),
      },
    })

    // Create Razorpay order for the first installment amount
    const orderOptions = {
      amount: installmentAmount * 100, // Convert to paise
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
        paymentPlan,
        totalAmount: totalAmount.toString(),
        installmentAmount: installmentAmount.toString(),
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
        amount: installmentAmount * 100, // Store in paise
        currency: 'INR',
        status: 'PENDING',
        paymentMethod: 'RAZORPAY_UPI',
        razorpayOrderId: order.id,
        installmentNumber: 1,
        totalInstallments:
          paymentPlan === 'lumpSum' ? 1 : paymentPlan === 'twoInstallments' ? 2 : 3,
        updatedAt: new Date(),
      },
    })

    console.log('Enrollment order created:', {
      orderId: order.id,
      enrollmentId: enrollment.id,
      userId: user.id,
      amount: installmentAmount,
      timestamp: new Date().toISOString(),
    })

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
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
