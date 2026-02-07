import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendTemplateMessage, notifyCounselorOfNewLead } from '@/lib/interakt'
import { logger } from '@/lib/utils/logger'

const AdmissionApplicationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    dateOfBirth: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
  }),
  academicDetails: z.object({
    class10Marks: z.string(),
    class10Board: z.string(),
    class12Marks: z.string(),
    class12Board: z.string(),
    previousNEETScore: z.string().optional(),
    previousNEETYear: z.string().optional(),
  }),
  courseSelection: z.object({
    selectedBatch: z.string(),
    preferredTiming: z.string(),
    paymentPlan: z.string(),
  }),
})

const batchPrices: Record<string, number> = {
  foundation: 120000,
  target: 85000,
  dropper: 75000,
  crash: 45000,
}

const batchNames: Record<string, string> = {
  foundation: 'Foundation Batch (Class 11th)',
  target: 'Target Batch (Class 12th)',
  dropper: 'Dropper Batch',
  crash: 'Crash Course',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AdmissionApplicationSchema.parse(body)

    const { personalInfo, academicDetails, courseSelection } = validatedData

    // Format phone number
    let formattedPhone = personalInfo.phone.replace(/[\s\-\(\)]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    // Check if user exists or create new
    let user = await prisma.users.findFirst({
      where: {
        OR: [{ email: personalInfo.email }, { phone: formattedPhone }],
      },
    })

    if (!user) {
      user = await prisma.users.create({
        data: {
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          email: personalInfo.email,
          phone: formattedPhone,
          role: 'STUDENT',
        },
      })
      logger.info('Created new user for admission application', { userId: user.id })
    }

    // Create lead for counselor follow-up
    const lead = await prisma.leads.create({
      data: {
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        email: personalInfo.email,
        phone: formattedPhone,
        source: 'ADMISSION_FORM',
        status: 'NEW',
        course: courseSelection.selectedBatch,
        preferredDate: new Date(),
        notes: JSON.stringify({
          personalInfo: {
            dateOfBirth: personalInfo.dateOfBirth,
            address: personalInfo.address,
            city: personalInfo.city,
            state: personalInfo.state,
            pincode: personalInfo.pincode,
          },
          academicDetails,
          courseSelection,
        }),
      },
    })

    logger.info('Created admission lead', { leadId: lead.id, userId: user.id })

    // Get course pricing
    const amount = batchPrices[courseSelection.selectedBatch] || 85000
    const batchName = batchNames[courseSelection.selectedBatch] || courseSelection.selectedBatch

    // Create pending enrollment
    const enrollment = await prisma.enrollments.create({
      data: {
        userId: user.id,
        courseId: courseSelection.selectedBatch,
        status: 'PENDING',
        totalFees: amount * 100,
        paidAmount: 0,
        pendingAmount: amount * 100,
        paymentPlan: courseSelection.paymentPlan === 'full' ? 'FULL' : 'QUARTERLY',
      },
    })

    logger.info('Created pending enrollment', { enrollmentId: enrollment.id })

    // Send WhatsApp confirmation to student
    try {
      await sendTemplateMessage({
        phone: formattedPhone,
        templateName: 'demo_confirmation',
        bodyValues: [personalInfo.firstName, batchName, 'Our counselor will call you shortly'],
      })
      logger.info('Sent WhatsApp confirmation to student', { phone: formattedPhone })
    } catch (whatsappError) {
      logger.error('Failed to send WhatsApp confirmation', { error: whatsappError })
    }

    // Send notification to counselor
    try {
      await notifyCounselorOfNewLead({
        counselorPhone: '+918826444334',
        leadName: `${personalInfo.firstName} ${personalInfo.lastName}`,
        leadPhone: formattedPhone,
        courseInterest: batchName,
        initialMessage: `New admission application from ${personalInfo.city}`,
        source: 'Admission Form',
      })
      logger.info('Sent counselor notification')
    } catch (counselorNotifyError) {
      logger.error('Failed to notify counselor', { error: counselorNotifyError })
    }

    return NextResponse.json({
      success: true,
      applicationId: lead.id,
      enrollmentId: enrollment.id,
      userId: user.id,
      message: 'Application submitted successfully. Our counselor will contact you shortly.',
    })
  } catch (error) {
    logger.error('Admission application error', { error })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid application data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to submit application',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const applicationId = searchParams.get('id')

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    const lead = await prisma.leads.findUnique({
      where: { id: applicationId },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    return NextResponse.json({
      application: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        course: lead.course,
        status: lead.status,
        createdAt: lead.createdAt,
      },
    })
  } catch (error) {
    logger.error('Get application error', { error })
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}
