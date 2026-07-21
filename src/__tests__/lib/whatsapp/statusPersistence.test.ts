import { persistWhatsAppDeliveryStatus } from '@/lib/whatsapp/statusPersistence'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    whatsapp_messages: { updateMany: jest.fn() },
    crm_communications: { updateMany: jest.fn() },
  },
}))

const msgUpdateMany = prisma.whatsapp_messages.updateMany as jest.Mock
const commUpdateMany = prisma.crm_communications.updateMany as jest.Mock

describe('persistWhatsAppDeliveryStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'warn').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
    msgUpdateMany.mockResolvedValue({ count: 1 })
    commUpdateMany.mockResolvedValue({ count: 1 })
  })

  it('marks both surfaces FAILED (only if not already FAILED)', async () => {
    await persistWhatsAppDeliveryStatus({
      providerMessageId: 'wamid.1',
      status: 'failed',
      errorMessage: 'Re-engagement message outside 24h window',
    })

    expect(msgUpdateMany).toHaveBeenCalledWith({
      where: { messageId: 'wamid.1', status: { not: 'FAILED' } },
      data: { status: 'FAILED' },
    })
    expect(commUpdateMany).toHaveBeenCalledWith({
      where: { whatsappMessageId: 'wamid.1', status: { not: 'FAILED' } },
      data: { status: 'FAILED' },
    })
  })

  it("treats Interakt 'undelivered' as FAILED", async () => {
    await persistWhatsAppDeliveryStatus({ providerMessageId: 'wamid.2', status: 'undelivered' })
    expect(msgUpdateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: 'FAILED' } })
    )
  })

  it('advances forward-only: delivered overwrites only PENDING/SENT', async () => {
    await persistWhatsAppDeliveryStatus({ providerMessageId: 'wamid.3', status: 'delivered' })
    expect(msgUpdateMany).toHaveBeenCalledWith({
      where: { messageId: 'wamid.3', status: { in: ['PENDING', 'SENT'] } },
      data: { status: 'DELIVERED' },
    })
  })

  it('read overwrites PENDING/SENT/DELIVERED (never FAILED)', async () => {
    await persistWhatsAppDeliveryStatus({ providerMessageId: 'wamid.4', status: 'read' })
    expect(msgUpdateMany).toHaveBeenCalledWith({
      where: { messageId: 'wamid.4', status: { in: ['PENDING', 'SENT', 'DELIVERED'] } },
      data: { status: 'READ' },
    })
  })

  it('no-ops on a missing message id', async () => {
    await persistWhatsAppDeliveryStatus({ providerMessageId: null, status: 'failed' })
    expect(msgUpdateMany).not.toHaveBeenCalled()
    expect(commUpdateMany).not.toHaveBeenCalled()
  })

  it('no-ops on an unknown status string', async () => {
    await persistWhatsAppDeliveryStatus({ providerMessageId: 'wamid.5', status: 'accepted' })
    expect(msgUpdateMany).not.toHaveBeenCalled()
  })

  it('never throws when a DB write rejects', async () => {
    msgUpdateMany.mockRejectedValueOnce(new Error('db down'))
    await expect(
      persistWhatsAppDeliveryStatus({ providerMessageId: 'wamid.6', status: 'failed' })
    ).resolves.toBeUndefined()
  })
})
