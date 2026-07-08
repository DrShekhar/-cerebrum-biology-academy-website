import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withRateLimit } from '@/lib/auth/middleware'
import { upsertLead } from '@/lib/leads/upsertLead'
import { normalizePhone } from '@/lib/leads/phone'
import {
  ensureDefaultScholarshipTest,
  isWindowOpen,
  newToken,
  CLASS_LEVELS,
} from '@/lib/scholarship/scholarshipTest'

export const dynamic = 'force-dynamic'

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  classLevel: z.enum(CLASS_LEVELS),
  city: z.string().trim().max(80).optional().or(z.literal('')),
})

/**
 * POST /api/scholarship/register — public registration for the scholarship
 * test. Creates a token-keyed registration (no account needed) and promotes
 * the registrant into the CRM as a lead. Re-registering with the same phone
 * resumes the existing (incomplete) attempt instead of creating a duplicate.
 */
async function handlePOST(request: NextRequest) {
  try {
    const parsed = registerSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Please check your details and try again.' },
        { status: 400 }
      )
    }
    const { name, phone, email, classLevel, city } = parsed.data

    const test = await ensureDefaultScholarshipTest()
    if (!test.isActive || !isWindowOpen(test)) {
      return NextResponse.json(
        { success: false, error: 'Registrations are closed right now. Please check back soon.' },
        { status: 400 }
      )
    }

    const last10 = normalizePhone(phone).slice(-10)

    // One live attempt per phone per test: resume an incomplete registration.
    const existing = await prisma.scholarship_registrations.findFirst({
      where: { testId: test.id, phone: { endsWith: last10 } },
      orderBy: { createdAt: 'desc' },
    })
    if (existing && existing.status !== 'COMPLETED') {
      return NextResponse.json({
        success: true,
        data: { token: existing.token, resumed: true, testName: test.name },
      })
    }
    if (existing && existing.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        data: { token: existing.token, completed: true, testName: test.name },
      })
    }

    // CRM promotion first (never-throw) so we can stamp leadId on the row.
    const leadResult = await upsertLead({
      name,
      phone,
      email: email || null,
      courseInterest: 'NEET Biology (Scholarship Test)',
      source: 'scholarship-test',
      message: `Registered for ${test.name} — ${classLevel}${city ? `, ${city}` : ''}`,
    })

    const registration = await prisma.scholarship_registrations.create({
      data: {
        testId: test.id,
        token: newToken(),
        studentName: name,
        phone: normalizePhone(phone),
        email: email || null,
        classLevel,
        city: city || null,
        leadId: leadResult?.leadId || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: { token: registration.token, resumed: false, testName: test.name },
    })
  } catch (error) {
    console.error('[scholarship/register] failed:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}

export const POST = withRateLimit(15, 60000, handlePOST)
