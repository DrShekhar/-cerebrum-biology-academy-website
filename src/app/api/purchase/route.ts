import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hashPassword } from '@/lib/auth'

// Validation schema
const purchaseSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  planType: z.enum(['FULL', 'QUARTERLY', 'MONTHLY']),
  amount: z.number().positive('Amount must be positive'),

  // User information (required if not authenticated)
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().min(10, 'Valid phone number is required').optional(),
  name: z.string().min(2, 'Name is required').optional(),

  // Additional metadata
  planName: z.string().optional(),
  courseName: z.string().optional(),
})

type PurchaseRequestBody = z.infer<typeof purchaseSchema>

export async function POST(request: NextRequest) {
  try {
    const body: PurchaseRequestBody = await request.json()

    // Validate input
    const validatedData = purchaseSchema.parse(body)

    // Check if user is authenticated
    const session = await auth()
    let userId: string

    if (session?.user?.id) {
      // Use authenticated user
      userId = session.user.id
      console.log('Purchase initiated by authenticated user:', userId)
    } else {
      // Guest checkout - require email, phone, and name
      if (!validatedData.email || !validatedData.phone || !validatedData.name) {
        return NextResponse.json(
          {
            success: false,
            error: 'Email, phone, and name are required for guest checkout',
            requiresAuth: true,
          },
          { status: 400 }
        )
      }

      // Find or create user account
      let user = await prisma.users.findFirst({
        where: {
          OR: [{ email: validatedData.email }, { phone: validatedData.phone }],
        },
      })

      if (!user) {
        // Create new user account with temporary password
        const tempPassword = Math.random().toString(36).slice(-12)
        const passwordHash = await hashPassword(tempPassword)

        user = await prisma.users.create({
          data: {
            email: validatedData.email,
            phone: validatedData.phone,
            name: validatedData.name,
            passwordHash,
            role: 'STUDENT',
          },
        })

        console.log('Created new user account for guest checkout:', user.id)
      } else {
        console.log('Found existing user for guest checkout:', user.id)
      }

      userId = user.id
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: validatedData.courseId },
    })

    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    // Check if user already has an active enrollment for this course
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: validatedData.courseId,
        },
      },
    })

    if (existingEnrollment && existingEnrollment.status === 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          error: 'You are already enrolled in this course',
          enrollmentId: existingEnrollment.id,
        },
        { status: 400 }
      )
    }

    // Verify Razorpay credentials
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

    const amountInPaise = Math.round(validatedData.amount * 100)

    // Create enrollment and payment records in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create or update enrollment
      let enrollment = existingEnrollment

      if (!enrollment) {
        enrollment = await tx.enrollment.create({
          data: {
            userId,
            courseId: validatedData.courseId,
            status: 'PENDING',
            totalFees: amountInPaise,
            paidAmount: 0,
            pendingAmount: amountInPaise,
            paymentPlan: validatedData.planType,
            currentProgress: 0,
          },
        })
      } else {
        // Update existing enrollment if it was cancelled or suspended
        enrollment = await tx.enrollment.update({
          where: { id: enrollment.id },
          data: {
            status: 'PENDING',
            totalFees: amountInPaise,
            pendingAmount: amountInPaise,
            paymentPlan: validatedData.planType,
          },
        })
      }

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${enrollment.id}_${Date.now()}`,
        notes: {
          enrollmentId: enrollment.id,
          userId,
          courseId: validatedData.courseId,
          courseName: validatedData.courseName || course.name,
          planType: validatedData.planType,
          planName: validatedData.planName || validatedData.planType,
        },
      })

      // Create payment record
      const payment = await tx.payments.create({
        data: {
          userId,
          enrollmentId: enrollment.id,
          amount: amountInPaise,
          currency: 'INR',
          status: 'PENDING',
          paymentMethod: 'RAZORPAY_UPI', // Will be updated based on actual method used
          razorpayOrderId: razorpayOrder.id,
        },
      })

      console.log('Created enrollment and payment:', {
        enrollmentId: enrollment.id,
        paymentId: payment.id,
        razorpayOrderId: razorpayOrder.id,
      })

      return {
        enrollment,
        payment,
        razorpayOrder,
      }
    })

    // Return order details for Razorpay checkout
    return NextResponse.json({
      success: true,
      enrollmentId: result.enrollment.id,
      paymentId: result.payment.id,
      order: {
        id: result.razorpayOrder.id,
        entity: result.razorpayOrder.entity,
        amount: result.razorpayOrder.amount,
        currency: result.razorpayOrder.currency,
        receipt: result.razorpayOrder.receipt,
        status: result.razorpayOrder.status,
        created_at: result.razorpayOrder.created_at,
      },
      user: {
        email: validatedData.email || session?.user?.email || '',
        phone: validatedData.phone || session?.user?.profile?.phone || '',
        name: validatedData.name || session?.user?.name || '',
      },
    })
  } catch (error) {
    console.error('Purchase API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Purchase failed',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check purchase eligibility
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId parameter' }, { status: 400 })
    }

    // Check if user is authenticated
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({
        eligible: true,
        message: 'Guest checkout available',
        requiresAuth: false,
      })
    }

    // Check for existing enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      include: {
        course: true,
      },
    })

    if (enrollment && enrollment.status === 'ACTIVE') {
      return NextResponse.json({
        eligible: false,
        message: 'Already enrolled in this course',
        enrollment: {
          id: enrollment.id,
          status: enrollment.status,
          enrollmentDate: enrollment.enrollmentDate,
          courseName: enrollment.course.name,
        },
      })
    }

    return NextResponse.json({
      eligible: true,
      message: 'Eligible for enrollment',
      hasExistingEnrollment: !!enrollment,
      existingStatus: enrollment?.status,
    })
  } catch (error) {
    console.error('Purchase eligibility check error:', error)
    return NextResponse.json({ error: 'Failed to check eligibility' }, { status: 500 })
  }
}
