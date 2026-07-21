import {
  classifyConsentMessage,
  isPhoneOptedOut,
  shouldSuppressAutomatedWhatsApp,
  cancelPendingSequencesForPhone,
} from '@/lib/whatsapp/optOut'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    whatsapp_opt_outs: { findUnique: jest.fn(), upsert: jest.fn(), deleteMany: jest.fn() },
    whatsapp_messages: { findFirst: jest.fn() },
    followup_queue: { updateMany: jest.fn() },
  },
}))

const optOutFindUnique = prisma.whatsapp_opt_outs.findUnique as jest.Mock
const msgFindFirst = prisma.whatsapp_messages.findFirst as jest.Mock
const queueUpdateMany = prisma.followup_queue.updateMany as jest.Mock

describe('classifyConsentMessage', () => {
  it('detects STOP keywords (case/space-insensitive, exact)', () => {
    expect(classifyConsentMessage('STOP')).toBe('STOP')
    expect(classifyConsentMessage('  unsubscribe ')).toBe('STOP')
    expect(classifyConsentMessage('Opt-Out')).toBe('STOP')
  })

  it('detects START keywords', () => {
    expect(classifyConsentMessage('start')).toBe('START')
    expect(classifyConsentMessage('SUBSCRIBE')).toBe('START')
  })

  it('does not misread a normal sentence containing "stop"', () => {
    expect(classifyConsentMessage('please tell me when to stop studying')).toBeNull()
    expect(classifyConsentMessage('')).toBeNull()
    expect(classifyConsentMessage(null)).toBeNull()
  })
})

describe('isPhoneOptedOut', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation()
  })

  it('normalizes to last-10 and returns true when a row exists', async () => {
    optOutFindUnique.mockResolvedValueOnce({ phone: '8826444334' })
    expect(await isPhoneOptedOut('+91 88264 44334')).toBe(true)
    expect(optOutFindUnique).toHaveBeenCalledWith({
      where: { phone: '8826444334' },
      select: { phone: true },
    })
  })

  it('fails open (false) when the table is not migrated yet (P2021)', async () => {
    optOutFindUnique.mockRejectedValueOnce({ code: 'P2021' })
    expect(await isPhoneOptedOut('+918826444334')).toBe(false)
  })
})

describe('shouldSuppressAutomatedWhatsApp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation()
  })

  it('suppresses when opted out', async () => {
    optOutFindUnique.mockResolvedValueOnce({ phone: '8826444334' })
    expect(await shouldSuppressAutomatedWhatsApp('+918826444334')).toEqual({
      suppress: true,
      reason: 'opted_out',
    })
    expect(msgFindFirst).not.toHaveBeenCalled()
  })

  it('suppresses when the lead has an inbound reply (stop-on-reply)', async () => {
    optOutFindUnique.mockResolvedValueOnce(null)
    msgFindFirst.mockResolvedValueOnce({ id: 'wam_1' })
    expect(await shouldSuppressAutomatedWhatsApp('+918826444334')).toEqual({
      suppress: true,
      reason: 'replied',
    })
  })

  it('does not suppress when neither opted out nor replied', async () => {
    optOutFindUnique.mockResolvedValueOnce(null)
    msgFindFirst.mockResolvedValueOnce(null)
    expect(await shouldSuppressAutomatedWhatsApp('+918826444334')).toEqual({ suppress: false })
  })
})

describe('cancelPendingSequencesForPhone', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation()
  })

  it('cancels PENDING drip rows for the last-10 phone and returns the count', async () => {
    queueUpdateMany.mockResolvedValueOnce({ count: 3 })
    const n = await cancelPendingSequencesForPhone('+918826444334')
    expect(n).toBe(3)
    expect(queueUpdateMany).toHaveBeenCalledWith({
      where: { status: 'PENDING', leads: { phone: { endsWith: '8826444334' } } },
      data: expect.objectContaining({ status: 'CANCELLED' }),
    })
  })

  it('returns 0 (never throws) on error', async () => {
    queueUpdateMany.mockRejectedValueOnce(new Error('db down'))
    await expect(cancelPendingSequencesForPhone('+918826444334')).resolves.toBe(0)
  })
})
