import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendTemplateMessage, notifyCounselorOfNewLead } from '@/lib/interakt'
import { logger } from '@/lib/utils/logger'
import { upsertLeadCore } from '@/lib/leads/upsertLead'
import { notifyStaff } from '@/lib/staff/notify'
import { authenticateStaff } from '@/lib/auth/staff-auth'

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
          id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          updatedAt: new Date(),
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          email: personalInfo.email,
          phone: formattedPhone,
          role: 'STUDENT',
        },
      })
      logger.info('Created new user for admission application', { userId: user.id })
    }

    // Create lead for counselor follow-up — real leads schema (the previous
    // name/status/course/preferredDate/notes field set does not exist on the
    // model and threw, 500-ing every admission submission).
    // Canonical CRM write (dedup by phone, phoneNormalized stamped). Failure
    // never blocks the admission submission itself.
    let lead: { id: string; assignedToId: string } | null = null
    try {
      const result = await upsertLeadCore(prisma, {
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        phone: formattedPhone,
        email: personalInfo.email,
        courseInterest: `Admission — ${courseSelection.selectedBatch}`,
        source: 'admission-form',
        priority: 'HOT',
        skipTask: true,
      })
      lead = { id: result.leadId, assignedToId: result.assignedToId }
    } catch (leadError) {
      logger.warn('Admission CRM lead upsert failed (non-blocking)', {
        error: leadError instanceof Error ? leadError.message : 'Unknown error',
      })
    }

    if (lead) {
      // Lead-side enrichment (note + follow-up task + counselor bell). ALL of
      // this is non-blocking: it must never throw out of here and 500 the POST,
      // because the frontend only opens the WhatsApp handoff to 918826444334 on
      // a 2xx. This is an admission form (the hottest intent), so the assigned
      // counselor gets a real task on their board + an in-app bell — previously
      // it landed with skipTask and no bell (Interakt notify no-ops w/o keys).
      try {
        const leadRef = lead
        await prisma.notes.create({
          data: {
            id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            leadId: leadRef.id,
            content: `Admission application details:\n${JSON.stringify(
              {
                personalInfo: {
                  dateOfBirth: personalInfo.dateOfBirth,
                  address: personalInfo.address,
                  city: personalInfo.city,
                  state: personalInfo.state,
                  pincode: personalInfo.pincode,
                },
                academicDetails,
                courseSelection,
              },
              null,
              2
            )}`,
            createdById: leadRef.assignedToId,
            updatedAt: new Date(),
          },
        })

        await prisma.tasks.create({
          data: {
            id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            title: `🎓 Admission application — ${personalInfo.firstName} ${personalInfo.lastName}`,
            description: `Admission form submitted (HOT). Batch: ${batchNames[courseSelection.selectedBatch] || courseSelection.selectedBatch}.
Phone: ${formattedPhone}
Email: ${personalInfo.email}
City: ${personalInfo.city}

⚡ Call within 30 minutes to close the enrollment.`,
            type: 'FOLLOW_UP_CALL',
            priority: 'HIGH',
            dueDate: new Date(Date.now() + 30 * 60 * 1000),
            status: 'PENDING',
            leadId: leadRef.id,
            assignedToId: leadRef.assignedToId,
            createdById: leadRef.assignedToId,
            isAutoGenerated: true,
            triggerEvent: 'admission_application',
            updatedAt: new Date(),
          },
        })

        await notifyStaff({
          userIds: [leadRef.assignedToId],
          type: 'LEAD_ASSIGNED',
          title: 'New admission application',
          body: `${personalInfo.firstName} ${personalInfo.lastName} · ${batchNames[courseSelection.selectedBatch] || courseSelection.selectedBatch}`,
          href: `/counselor/leads/${leadRef.id}`,
          leadId: leadRef.id,
        })
      } catch (enrichError) {
        logger.warn('Admission lead enrichment failed (non-blocking)', {
          error: enrichError instanceof Error ? enrichError.message : 'Unknown error',
        })
      }
    }

    logger.info('Created admission lead', { leadId: lead?.id, userId: user.id })

    // Get course pricing
    const amount = batchPrices[courseSelection.selectedBatch] || 85000
    const batchName = batchNames[courseSelection.selectedBatch] || courseSelection.selectedBatch

    // Create pending enrollment
    const enrollment = await prisma.enrollments.create({
      data: {
        id: `enr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
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
      applicationId: lead?.id ?? null,
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
    // Returns lead PII by id — staff only. No public caller (the form uses POST
    // and hands off to WhatsApp client-side), so gating this leaks nothing that
    // was legitimately consumed.
    const authResult = await authenticateStaff()
    if ('error' in authResult) return authResult.error

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
        name: lead.studentName,
        email: lead.email,
        phone: lead.phone,
        course: lead.courseInterest,
        status: lead.stage,
        createdAt: lead.createdAt,
      },
    })
  } catch (error) {
    logger.error('Get application error', { error })
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}
