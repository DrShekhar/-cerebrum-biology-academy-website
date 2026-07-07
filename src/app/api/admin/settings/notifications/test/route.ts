import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const testSchema = z.object({ channel: z.enum(['email', 'whatsapp']) })

/**
 * POST /api/admin/settings/notifications/test — actually send a test message
 * to the calling admin (their own email/phone). Missing credentials return an
 * honest 503 naming the exact env var, never a fake success.
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const parsed = testSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid channel' }, { status: 400 })
    }

    const admin = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { email: true, phone: true, name: true },
    })

    if (parsed.data.channel === 'email') {
      if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
          { success: false, error: 'Email is not configured — set RESEND_API_KEY' },
          { status: 503 }
        )
      }
      if (!admin?.email) {
        return NextResponse.json(
          { success: false, error: 'Your admin account has no email address' },
          { status: 400 }
        )
      }
      const { emailService } = await import('@/lib/email/emailService')
      const result = await emailService.send({
        to: admin.email,
        subject: 'Cerebrum test notification',
        html: `<p>Hi ${admin.name || 'Admin'},</p><p>This is a test notification from the admin settings page. Email sending works. ✅</p>`,
      })
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: `Email send failed: ${result.error || 'unknown error'}` },
          { status: 502 }
        )
      }
      return NextResponse.json({ success: true, message: `Test email sent to ${admin.email}` })
    }

    // whatsapp
    const { WhatsAppBusinessService } = await import('@/lib/integrations/whatsappBusinessService')
    if (!WhatsAppBusinessService.isConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'WhatsApp is not configured — set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID',
        },
        { status: 503 }
      )
    }
    if (!admin?.phone) {
      return NextResponse.json(
        { success: false, error: 'Your admin account has no phone number' },
        { status: 400 }
      )
    }
    const result = await WhatsAppBusinessService.sendTextMessage(
      admin.phone,
      `Hi ${admin.name || 'Admin'} — this is a test notification from the Cerebrum admin settings page. WhatsApp sending works. ✅`
    )
    if (result?.skipped || result?.error) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp send failed — check credentials' },
        { status: 502 }
      )
    }
    return NextResponse.json({ success: true, message: `Test WhatsApp sent to ${admin.phone}` })
  } catch (error) {
    console.error('[admin/settings/notifications/test] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to send test' }, { status: 500 })
  }
}
