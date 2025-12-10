import { NextRequest, NextResponse } from 'next/server'
import { sendWhatsAppMessage } from '@/lib/interakt'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminPhone = process.env.ADMIN_PHONE || '+918826444334'

  const message = `🔔 *SEO REMINDER - Friday Tasks*

Hi Dr. Shekhar! Here's your SEO checklist for today:

✅ *1. Submit Sitemap*
Go to Google Search Console and submit:
cerebrumbiologyacademy.com/sitemap.xml

✅ *2. Request Indexing*
Request indexing for new pages:
• /neet-2026-exam-date
• /neet-2026-cutoff
• /neet-biology-syllabus-2026
• /neet-rank-predictor
• /neet-college-predictor
• /neet-biology-mcq

✅ *3. Build Backlinks*
• Share tools on NEET forums
• Post on Quora
• Share on social media

✅ *4. Monitor Rankings*
Check rankings for target keywords in Search Console

📊 Goal: 100K visits, 10K clicks/month

Good luck! 🚀`

  try {
    const result = await sendWhatsAppMessage({
      phone: adminPhone,
      message,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'SEO reminder sent successfully',
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending SEO reminder:', error)
    return NextResponse.json({ success: false, error: 'Failed to send reminder' }, { status: 500 })
  }
}
