import { prisma } from '@/lib/prisma'
import { WhatsAppBusinessService } from '@/lib/integrations/whatsappBusinessService'
import { emailService } from '@/lib/email/emailService'
import { logger } from '@/lib/utils/logger'

/**
 * Send the student their enrollment-confirmation WhatsApp + email directly.
 *
 * Replaces the old pattern where payment routes did a server-to-server fetch to
 * /api/notifications/{whatsapp,email} WITHOUT cookies — those routes are (rightly)
 * staff-gated, so every call 401'd and the student got nothing. Calling the
 * underlying services here keeps the routes locked down while making the
 * confirmation actually fire. Best-effort + never throws (never blocks payment
 * verification); no-ops cleanly when a channel's env keys are unset.
 */
export async function sendEnrollmentConfirmation(params: {
  userId: string
  courseId: string
}): Promise<void> {
  try {
    const [user, course] = await Promise.all([
      prisma.users.findUnique({
        where: { id: params.userId },
        select: { name: true, email: true, phone: true },
      }),
      prisma.courses.findUnique({ where: { id: params.courseId }, select: { name: true } }),
    ])
    if (!user) return

    const courseName = course?.name || 'your course'
    const firstName = (user.name || 'there').split(' ')[0]

    // WhatsApp
    if (user.phone && WhatsAppBusinessService.isConfigured()) {
      const to = user.phone.replace(/\D/g, '')
      const msg =
        `✅ Enrollment confirmed!\n\n` +
        `Hi ${firstName}, your enrollment in *${courseName}* at Cerebrum Biology Academy is now active. ` +
        `Sign in to your dashboard to start learning. Welcome aboard! 🎉`
      await WhatsAppBusinessService.sendTextMessage(
        to.startsWith('91') || to.length > 10 ? to : `91${to}`,
        msg
      ).catch((err) => logger.error('Enrollment confirmation WhatsApp failed', { error: err }))
    }

    // Email
    if (user.email) {
      await emailService
        .send({
          to: user.email,
          subject: `Enrolment confirmed — ${courseName}`,
          html:
            `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto">` +
            `<h2 style="color:#15803d">Welcome to Cerebrum Biology Academy 🎉</h2>` +
            `<p>Hi ${firstName},</p>` +
            `<p>Your enrolment in <strong>${courseName}</strong> is confirmed and your access is active. ` +
            `Sign in to your dashboard to start learning.</p>` +
            `<p>See you in class,<br/>Team Cerebrum Biology Academy</p></div>`,
        })
        .catch((err) => logger.error('Enrollment confirmation email failed', { error: err }))
    }
  } catch (error) {
    logger.error('sendEnrollmentConfirmation failed', { error })
  }
}
