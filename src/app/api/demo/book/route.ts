import { NextRequest, NextResponse } from 'next/server'
import { zoomService } from '@/lib/zoom/zoomService'
import { whatsappService } from '@/lib/whatsapp/whatsappService'
import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email/emailService'
import { emailTemplates } from '@/lib/email/templates'

interface DemoBookingRequest {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  courseInterest: string
  studentClass: string
  previousKnowledge: string
  specificTopics?: string[]
  parentName?: string
  parentPhone?: string
  hearAboutUs?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoBookingRequest = await request.json()

    // Validate required fields
    const requiredFields: (keyof DemoBookingRequest)[] = [
      'studentName',
      'email',
      'phone',
      'preferredDate',
      'preferredTime',
      'courseInterest',
    ]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate date (must be future date)
    const selectedDate = new Date(body.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate <= today) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demo date must be in the future',
        },
        { status: 400 }
      )
    }

    // Check if slot is available
    const availableSlots = await zoomService.getAvailableSlots(selectedDate)
    if (!availableSlots.includes(body.preferredTime)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Selected time slot is not available',
        },
        { status: 400 }
      )
    }

    // Create Zoom meeting
    const meetingResponse = await zoomService.createDemoMeeting({
      studentName: body.studentName,
      email: body.email,
      phone: body.phone,
      preferredDate: selectedDate,
      preferredTime: body.preferredTime,
      courseInterest: body.courseInterest,
      studentClass: body.studentClass,
      previousKnowledge: body.previousKnowledge,
      specificTopics: body.specificTopics || [],
    })

    if (!meetingResponse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create demo meeting. Please try again.',
        },
        { status: 500 }
      )
    }

    // Step 1: Get or create first available counselor (for round-robin assignment)
    let assignedCounselor = await prisma.user.findFirst({
      where: { role: 'COUNSELOR' },
      orderBy: { createdAt: 'asc' },
    })

    // If no counselor exists, create a default one for testing
    if (!assignedCounselor) {
      console.warn('No counselor found, creating default counselor for testing')
      assignedCounselor = await prisma.user.create({
        data: {
          email: 'counselor@cerebrumbiologyacademy.com',
          name: 'Default Counselor',
          role: 'COUNSELOR',
          phone: '+919876543210',
        },
      })
    }

    // Step 2: Save DemoBooking to database
    const demoBooking = await prisma.demoBooking.create({
      data: {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        studentClass: body.studentClass as any,
        preferredDate: body.preferredDate,
        preferredTime: body.preferredTime,
        message: body.previousKnowledge,
        status: 'CONFIRMED',
        source: body.hearAboutUs || 'Website',
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        assignedTo: assignedCounselor.id,
        notificationsSent: {
          whatsapp: false,
          email: false,
        },
      },
    })

    // Step 3: Auto-create Lead from DemoBooking
    const lead = await prisma.lead.create({
      data: {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        courseInterest: body.courseInterest,
        stage: 'DEMO_SCHEDULED',
        priority: 'HOT',
        source: body.hearAboutUs || 'Website - Demo Booking',
        assignedToId: assignedCounselor.id,
        demoBookingId: demoBooking.id,
        nextFollowUpAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      },
    })

    // Step 4: Create initial follow-up task for counselor
    const followUpDate = new Date()
    followUpDate.setHours(followUpDate.getHours() + 2) // Follow up in 2 hours

    await prisma.task.create({
      data: {
        title: `Follow up on demo booking - ${body.studentName}`,
        description: `New demo class booked for ${body.studentName} (${body.courseInterest}). Demo scheduled for ${body.preferredDate} at ${body.preferredTime}. Please call to confirm attendance.`,
        type: 'FOLLOW_UP_CALL',
        priority: 'HIGH',
        dueDate: followUpDate,
        status: 'PENDING',
        leadId: lead.id,
        assignedToId: assignedCounselor.id,
        createdById: assignedCounselor.id,
        isAutoGenerated: true,
        triggerEvent: 'demo_booking_created',
      },
    })

    // Step 5: Log activity for audit trail
    await prisma.activity.create({
      data: {
        userId: assignedCounselor.id,
        leadId: lead.id,
        action: 'DEMO_BOOKED',
        description: `Demo booking created for ${body.studentName} via website. Scheduled for ${body.preferredDate} at ${body.preferredTime}.`,
        metadata: {
          demoBookingId: demoBooking.id,
          source: body.hearAboutUs || 'Website',
          utmSource: body.utmSource,
          utmMedium: body.utmMedium,
          utmCampaign: body.utmCampaign,
        },
      },
    })

    // Step 6: Send immediate WhatsApp confirmation to student
    let whatsappSent = false
    try {
      await whatsappService.sendDemoBookingConfirmation(
        body.phone,
        body.studentName,
        new Date(meetingResponse.start_time)
      )
      whatsappSent = true

      // Update notification status
      await prisma.demoBooking.update({
        where: { id: demoBooking.id },
        data: {
          notificationsSent: {
            whatsapp: true,
            email: false,
          },
        },
      })
    } catch (error) {
      console.error('WhatsApp confirmation to student failed:', error)
    }

    // Step 7: Send email confirmation to student
    let emailSent = false
    try {
      await sendEmailConfirmation(body, meetingResponse, assignedCounselor.name)
      emailSent = true

      // Update notification status
      await prisma.demoBooking.update({
        where: { id: demoBooking.id },
        data: {
          notificationsSent: {
            whatsapp: whatsappSent,
            email: true,
          },
        },
      })
    } catch (error) {
      console.error('Email confirmation to student failed:', error)
    }

    // Log successful booking and lead creation
    console.log('Demo booking successful with auto-lead creation:', {
      demoBookingId: demoBooking.id,
      leadId: lead.id,
      studentName: body.studentName,
      assignedTo: assignedCounselor.name,
      email: body.email,
      phone: body.phone,
      meetingId: meetingResponse.id,
      scheduledTime: meetingResponse.start_time,
      notifications: {
        whatsapp: whatsappSent,
        email: emailSent,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Demo class booked successfully! Our counselor will contact you shortly.',
      booking: {
        id: demoBooking.id,
        leadId: lead.id,
        meetingId: meetingResponse.id,
        scheduledTime: meetingResponse.start_time,
        joinUrl: meetingResponse.join_url,
        password: meetingResponse.password,
        assignedCounselor: assignedCounselor.name,
      },
    })
  } catch (error) {
    console.error('Demo booking error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const selectedDate = new Date(date)
    const availableSlots = await zoomService.getAvailableSlots(selectedDate)

    return NextResponse.json({
      success: true,
      availableSlots,
      date: selectedDate.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch available slots' },
      { status: 500 }
    )
  }
}

async function sendEmailConfirmation(
  bookingData: DemoBookingRequest,
  meetingData: any,
  counselorName: string
) {
  const result = await emailService.send({
    to: bookingData.email,
    subject: 'Demo Class Confirmed - Cerebrum Biology Academy',
    html: emailTemplates.demoConfirmation({
      studentName: bookingData.studentName,
      demoDate: new Date(bookingData.preferredDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      demoTime: bookingData.preferredTime,
      meetingLink: meetingData.join_url,
      meetingPassword: meetingData.password,
      counselorName: counselorName,
    }),
  })

  if (result.success) {
    console.log(`✅ Demo confirmation email sent to ${bookingData.email} via ${result.provider}`)
  } else {
    console.error(
      `❌ Failed to send demo confirmation email to ${bookingData.email}:`,
      result.error
    )
    throw new Error(result.error || 'Failed to send email')
  }
}
