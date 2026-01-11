import { NextRequest, NextResponse } from 'next/server'

interface FailureAnalysisLead {
  name: string
  phone: string
  email: string
  previousScore: string
  source: string
  timestamp: string
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: FailureAnalysisLead = await request.json()

    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.previousScore) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/[^\d]/g, '').slice(-10))) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate NEET score
    const score = parseInt(data.previousScore)
    if (isNaN(score) || score < 0 || score > 720) {
      return NextResponse.json(
        { error: 'Invalid NEET score. Must be between 0 and 720' },
        { status: 400 }
      )
    }

    // Generate lead ID
    const leadId = `FA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Prepare lead data for storage
    const leadData = {
      id: leadId,
      ...data,
      score: score,
      createdAt: new Date().toISOString(),
      status: 'new',
      type: 'failure_analysis',
      priority: score < 200 ? 'high' : score < 400 ? 'medium' : 'low',
    }

    // In a real application, you would:
    // 1. Save to database (Prisma/MongoDB/etc.)
    // 2. Send to CRM (Salesforce/HubSpot/etc.)
    // 3. Trigger email notifications
    // 4. Send WhatsApp messages

    console.log('New failure analysis lead:', leadData)

    // Simulate database save
    // await prisma.lead.create({ data: leadData })

    // Send immediate WhatsApp message with failure analysis report
    await sendWhatsAppAnalysis(data)

    // Send email confirmation
    await sendEmailConfirmation(data)

    // Trigger CRM integration
    await integrateToCRM(leadData)

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Your failure analysis report will be sent to your WhatsApp within 2 minutes',
    })
  } catch (error) {
    console.error('Error processing failure analysis lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Simulate WhatsApp integration
async function sendWhatsAppAnalysis(data: FailureAnalysisLead) {
  const score = parseInt(data.previousScore)
  let analysis = ''

  if (score < 200) {
    analysis = `🎯 *Failure Analysis for ${data.name}*\n\n*Current Score: ${score}/720*\n*Target Improvement: +400-500 marks*\n\n*Key Issues Identified:*\n• Weak foundation in all subjects\n• Biology knowledge gaps (50% marks lost)\n• Problem-solving approach needs work\n• Time management issues\n\n*Recommended Action:*\n✅ Join our Foundation Plus program\n✅ Focus on Biology (360/720 marks)\n✅ Small batch coaching (max 15 students)\n✅ Daily doubt clearing sessions\n\n*Success Probability: 85%* with proper guidance\n\nReply *ENROLL* to book free counseling session.`
  } else if (score < 400) {
    analysis = `🎯 *Failure Analysis for ${data.name}*\n\n*Current Score: ${score}/720*\n*Target Improvement: +250-350 marks*\n\n*Key Issues Identified:*\n• Biology concepts need strengthening\n• Physics problem-solving gaps\n• Chemistry numerical weaknesses\n• Exam pressure management\n\n*Recommended Action:*\n✅ Join our Advanced Achiever program\n✅ Focus on Biology mastery\n✅ Personal mentor support\n✅ Regular mock tests\n\n*Success Probability: 90%* with focused approach\n\nReply *COUNSELING* to speak with our expert.`
  } else {
    analysis = `🎯 *Failure Analysis for ${data.name}*\n\n*Current Score: ${score}/720*\n*Target Improvement: +150-250 marks*\n\n*Key Issues Identified:*\n• Minor knowledge gaps\n• Exam strategy issues\n• Confidence and mindset\n• Final revision approach\n\n*Recommended Action:*\n✅ Join our Elite Ranker program\n✅ Advanced problem solving\n✅ Psychological support\n✅ Individual attention\n\n*Success Probability: 95%* with right strategy\n\nReply *BOOK* to schedule personalized session.`
  }

  // In real implementation, integrate with WhatsApp Business API
  console.log('WhatsApp analysis to be sent:', analysis)

  return true
}

// Simulate email confirmation
async function sendEmailConfirmation(data: FailureAnalysisLead) {
  const emailContent = {
    to: data.email,
    subject: 'Your NEET Failure Analysis Report - Cerebrum Biology Academy',
    html: `
      <h2>Dear ${data.name},</h2>
      <p>Thank you for requesting your NEET failure analysis report.</p>
      <p><strong>Your Previous Score:</strong> ${data.previousScore}/720</p>
      <p>Our detailed analysis and personalized success plan has been sent to your WhatsApp number: ${data.phone}</p>
      <p>Our counselor will call you within 2 hours to discuss your roadmap to success.</p>
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Check your WhatsApp for detailed analysis</li>
        <li>Book a free counseling session</li>
        <li>Join our specialized repeater program</li>
      </ul>
      <p>For immediate assistance, call: +91 88264 44334</p>
      <p>Best regards,<br>Team Cerebrum Biology Academy</p>
    `,
  }

  console.log('Email confirmation to be sent:', emailContent)
  return true
}

// Simulate CRM integration
async function integrateToCRM(leadData: any) {
  // In real implementation, integrate with:
  // - Salesforce
  // - HubSpot
  // - Zoho CRM
  // - Freshworks

  // CRM integration ready
  return true
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
  )
}
