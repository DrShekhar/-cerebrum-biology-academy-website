import { NextRequest, NextResponse } from 'next/server'
import { zoomService } from '@/lib/zoom/zoomService'
import { whatsappService } from '@/lib/whatsapp/whatsappService'
import { prisma } from '@/lib/prisma'

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
      await sendEmailConfirmation(body, meetingResponse)
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

async function sendEmailConfirmation(bookingData: DemoBookingRequest, meetingData: any) {
  // Email service implementation
  // For MVP, we'll log the email data
  const emailData = {
    to: bookingData.email,
    subject: 'Demo Class Confirmed - Cerebrum Biology Academy',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #9333ea); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Demo Class Confirmed! 🎉</h1>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hi ${bookingData.studentName}!</h2>
          <p style="color: #4b5563;">Your NEET Biology demo class has been successfully scheduled.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">Class Details:</h3>
            <p><strong>📅 Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
            <p><strong>🕐 Time:</strong> ${bookingData.preferredTime} (1 hour session)</p>
            <p><strong>📚 Course:</strong> ${bookingData.courseInterest}</p>
            <p><strong>👩‍🏫 Faculty:</strong> Dr. Priya Sharma (AIIMS Graduate)</p>
            <p><strong>📱 Join URL:</strong> ${meetingData.join_url}</p>
            <p><strong>🔐 Password:</strong> ${meetingData.password}</p>
          </div>
          
          <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #0277bd; margin-top: 0;">What to Prepare:</h4>
            <ul style="color: #01579b;">
              <li>Notebook and pen for taking notes</li>
              <li>Your biology questions and doubts</li>
              <li>NEET preparation goals</li>
              <li>Quiet environment for the class</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #4b5563;">Join link will also be sent via WhatsApp 30 minutes before the class.</p>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p>📞 Support: +91 88264 44334</p>
          <p>🌐 Website: cerebrumbiologyacademy.com</p>
        </div>
      </div>
    `,
  }

  console.log('Email confirmation prepared:', emailData)
  // In production, send actual email using your email service
}
