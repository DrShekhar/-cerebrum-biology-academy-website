import { prisma } from '@/lib/prisma'
import logger from '@/lib/utils'

export async function cleanupExpiredOTPs() {
  try {
    const now = new Date()

    const [whatsappDeleted, otpDeleted] = await Promise.all([
      prisma.whatsapp_otp.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: now } },
            { verified: true, createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
          ],
        },
      }),
      prisma.otp_verifications.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: now } },
            { verified: true, createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
          ],
        },
      }),
    ])

    const totalDeleted = whatsappDeleted.count + otpDeleted.count

    if (totalDeleted > 0) {
      logger.info('OTP cleanup completed', {
        type: 'otp_cleanup',
        whatsappDeleted: whatsappDeleted.count,
        otpDeleted: otpDeleted.count,
        totalDeleted,
      })
    }

    return totalDeleted
  } catch (error) {
    logger.error('OTP cleanup failed', error as Error, {
      type: 'otp_cleanup_error',
    })
    throw error
  }
}

export async function getOTPStats() {
  try {
    const now = new Date()

    const [whatsappStats, otpStats] = await Promise.all([
      prisma.whatsapp_otp.groupBy({
        by: ['verified'],
        where: {
          expiresAt: { gte: now },
        },
        _count: true,
      }),
      prisma.otp_verifications.groupBy({
        by: ['verified'],
        where: {
          expiresAt: { gte: now },
        },
        _count: true,
      }),
    ])

    const stats = {
      whatsapp: {
        total: whatsappStats.reduce((sum, s) => sum + s._count, 0),
        verified: whatsappStats.find((s) => s.verified)?._count || 0,
        pending: whatsappStats.find((s) => !s.verified)?._count || 0,
      },
      sms: {
        total: otpStats.reduce((sum, s) => sum + s._count, 0),
        verified: otpStats.find((s) => s.verified)?._count || 0,
        pending: otpStats.find((s) => !s.verified)?._count || 0,
      },
    }

    return stats
  } catch (error) {
    logger.error('Failed to get OTP stats', error as Error)
    throw error
  }
}

export async function scheduleOTPCleanup(intervalMinutes: number = 60) {
  logger.info('OTP cleanup scheduler started', {
    intervalMinutes,
  })

  setInterval(
    async () => {
      await cleanupExpiredOTPs()
    },
    intervalMinutes * 60 * 1000
  )

  await cleanupExpiredOTPs()
}
