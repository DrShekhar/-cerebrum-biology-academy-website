import { NextRequest, NextResponse } from 'next/server'
import { zoomService } from '@/lib/zoom/zoomService'
import { whatsappService } from '@/lib/whatsapp/whatsappService'

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
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoBookingRequest = await request.json()

    // Validate required fields
    const requiredFields = [
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

    // Store booking data (in production, this would go to your database)
    const bookingData = {
      id: `demo_${Date.now()}`,
      ...body,
      zoomMeetingId: meetingResponse.id,
      joinUrl: meetingResponse.join_url,
      startUrl: meetingResponse.start_url,
      password: meetingResponse.password,
      scheduledAt: new Date(meetingResponse.start_time),
      status: 'scheduled',
      createdAt: new Date(),
      notificationsSent: {
        whatsapp: false,
        email: false,
      },
    }

    // Send immediate WhatsApp confirmation
    try {
      await whatsappService.sendDemoBookingConfirmation(
        body.phone,
        body.studentName,
        new Date(meetingResponse.start_time)
      )
      bookingData.notificationsSent.whatsapp = true
    } catch (error) {
      console.error('WhatsApp confirmation failed:', error)
    }

    // Send email confirmation (implement email service)
    try {
      await sendEmailConfirmation(body, meetingResponse)
      bookingData.notificationsSent.email = true
    } catch (error) {
      console.error('Email confirmation failed:', error)
    }

    // Log successful booking
    console.log('Demo booking successful:', {
      studentName: body.studentName,
      email: body.email,
      phone: body.phone,
      meetingId: meetingResponse.id,
      scheduledTime: meetingResponse.start_time,
    })

    return NextResponse.json({
      success: true,
      message: 'Demo class booked successfully!',
      booking: {
        id: bookingData.id,
        meetingId: meetingResponse.id,
        scheduledTime: meetingResponse.start_time,
        joinUrl: meetingResponse.join_url,
        password: meetingResponse.password,
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
