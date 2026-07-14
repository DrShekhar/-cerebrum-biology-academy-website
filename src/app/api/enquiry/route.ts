import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { emailService } from '@/lib/email/emailService'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { upsertLead } from '@/lib/leads/upsertLead'

// Accept any string with 8-15 digits after stripping non-digits (some
// countries, e.g. Singapore, use 8-digit numbers). Examples that pass:
// 8826444334, +91 88264 44334, +1 555 123 4567, +65 8123 4567.
const phoneSchema = z
  .string()
  .refine((val) => val.replace(/\D/g, '').length >= 8 && val.replace(/\D/g, '').length <= 15, {
    message: 'Please enter a valid phone number (8–15 digits, with or without country code)',
  })

const enquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: phoneSchema,
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  area: z.string().optional(),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
  source: z.string().default('website'),
  pageUrl: z.string().optional(),
})

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const rateLimit = rateLimitStore.get(clientIp)

    if (rateLimit && rateLimit.resetTime > now) {
      if (rateLimit.count >= 5) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
      rateLimit.count++
    } else {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now + 15 * 60 * 1000, // 15 minutes
      })
    }

    const rawData = await request.json()

    // Validate input
    const validationResult = enquirySchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Normalise phone. Indian numbers (with/without +91/91/0 prefix) collapse
    // to bare 10 digits so existing follow-up tooling keeps working; other
    // countries keep their full digit string (incl. country code) so the
    // admin's callback/WhatsApp link reaches them.
    const allDigits = data.phone.replace(/\D/g, '')
    const isIndian = /^(91)?[6-9]\d{9}$/.test(allDigits) || /^0[6-9]\d{9}$/.test(allDigits)
    const cleanPhone = isIndian ? allDigits.slice(-10) : allDigits

    // Get device type from user agent
    const userAgent = request.headers.get('user-agent') || ''
    const deviceType = userAgent.toLowerCase().includes('mobile') ? 'MOBILE' : 'DESKTOP'

    // Create enquiry in content_leads table
    const enquiry = await prisma.content_leads.create({
      data: {
        id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email || undefined,
        whatsappNumber: cleanPhone,
        source: data.source,
        city: data.area || undefined,
        interestedIn: data.message || undefined,
        landingPage: data.pageUrl || undefined,
        deviceType: deviceType,
        updatedAt: new Date(),
      },
    })

    // ALSO drop the lead into the CRM (leads pipeline) — additive, deduped by
    // phone, never blocks this response. The content_leads row above and the
    // WhatsApp handoff below are unchanged.
    void upsertLead({
      name: data.name,
      phone: cleanPhone,
      email: data.email,
      courseInterest: data.area ? `Biology coaching — ${data.area}` : undefined,
      source: data.source || `enquiry:${data.pageUrl || 'website'}`,
      message: data.message,
    }).catch(() => {})

    // Build the pre-filled WhatsApp message addressed to admin.
    // After the client redirects to this URL, the lead's own WhatsApp opens
    // with this text composed for them — they tap Send, message lands on
    // the admin number. Zero dependency on Interakt or any third-party API.
    const whatsappUrl = buildAdminWhatsAppUrl({
      name: data.name,
      phone: cleanPhone,
      email: data.email,
      area: data.area,
      message: data.message,
      source: data.source,
      pageUrl: data.pageUrl,
    })

    // Backup notification — email the admin so leads land in two places.
    // Fire-and-forget (don't block the user response if email is slow/fails).
    void sendAdminEmail({
      name: data.name,
      phone: cleanPhone,
      email: data.email,
      area: data.area,
      message: data.message,
      source: data.source,
      pageUrl: data.pageUrl,
      enquiryId: enquiry.id,
    })

    return NextResponse.json(
      {
        success: true,
        enquiryId: enquiry.id,
        whatsappUrl,
        message: 'Thank you! Opening WhatsApp to confirm — please tap Send.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Enquiry submission error:', error)

    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}

// Build a wa.me URL pre-filled with lead details so the prospect's tap
// of "Send" delivers the message directly to the admin's WhatsApp.
function buildAdminWhatsAppUrl(lead: {
  name: string
  phone: string
  email?: string | null
  area?: string | null
  message?: string | null
  source: string
  pageUrl?: string | null
}): string {
  const adminNumber = CONTACT_INFO.whatsapp.number // 918826444334
  const text =
    `🆕 NEW LEAD from cerebrumbiologyacademy.com\n\n` +
    `👤 Name: ${lead.name}\n` +
    `📞 Phone: ${lead.phone}\n` +
    `📧 Email: ${lead.email || '—'}\n` +
    `📍 Area: ${lead.area || '—'}\n` +
    `💬 Interest: ${lead.message || '—'}\n` +
    `🌐 Source: ${lead.source}\n` +
    `📄 Page: ${lead.pageUrl || '—'}\n\n` +
    `(Sent from the enquiry form — please call me back.)`
  return `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`
}

// Email backup to admin. Uses the existing emailService (Resend / SendGrid)
// already wired up in src/lib/email/emailService. Best-effort; logged.
async function sendAdminEmail(lead: {
  name: string
  phone: string
  email?: string | null
  area?: string | null
  message?: string | null
  source: string
  pageUrl?: string | null
  enquiryId: string
}): Promise<void> {
  const adminEmail = process.env.ADMIN_LEAD_EMAIL || 'shekharcsingh57@gmail.com'
  // 10-digit phones are Indian (normalised upstream); anything longer already
  // carries its own country code.
  const dialPhone = lead.phone.length === 10 ? `91${lead.phone}` : lead.phone
  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #15803d; margin: 0 0 16px;">🆕 New Lead — Cerebrum Biology Academy</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #475569; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.phone)}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Email</td><td style="padding: 8px 0;">${escapeHtml(lead.email || '—')}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Area</td><td style="padding: 8px 0;">${escapeHtml(lead.area || '—')}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569; vertical-align: top;">Message</td><td style="padding: 8px 0;">${escapeHtml(lead.message || '—')}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Source</td><td style="padding: 8px 0;">${escapeHtml(lead.source)}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Page</td><td style="padding: 8px 0;"><a href="${escapeHtml(lead.pageUrl || '#')}" style="color: #2563eb;">${escapeHtml(lead.pageUrl || '—')}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Lead ID</td><td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${escapeHtml(lead.enquiryId)}</td></tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
        <a href="tel:+${escapeHtml(dialPhone)}" style="display: inline-block; padding: 10px 16px; background: #15803d; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">📞 Call Now</a>
        <a href="https://wa.me/${escapeHtml(dialPhone)}" style="display: inline-block; padding: 10px 16px; background: #25d366; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; margin-left: 8px;">💬 WhatsApp</a>
      </div>
    </div>
  `
  const text =
    `NEW LEAD — Cerebrum Biology Academy\n\n` +
    `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || '—'}\n` +
    `Area: ${lead.area || '—'}\nMessage: ${lead.message || '—'}\nSource: ${lead.source}\n` +
    `Page: ${lead.pageUrl || '—'}\nLead ID: ${lead.enquiryId}\n\n` +
    `Call: +${dialPhone}\nWhatsApp: https://wa.me/${dialPhone}\n`

  try {
    await emailService.send({
      to: adminEmail,
      from: 'leads@cerebrumbiologyacademy.com',
      subject: `🆕 New lead: ${lead.name} (${lead.phone}) — ${lead.source}`,
      html,
      text,
    })
  } catch (error) {
    // Don't surface email failures to the user — the wa.me redirect is the
    // primary channel and the DB record always exists. Just log.
    console.error('❌ Admin lead email failed (lead still saved to DB):', error)
  }
}

function escapeHtml(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
