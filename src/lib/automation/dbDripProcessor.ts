/**
 * DB-driven drip processor (smart-CRM wave 4) — makes the counselor
 * drip-sequences UI real. Until now drip_sequences/drip_sequence_steps were
 * CRUD-only: the UI saved rows no processor ever read (actual drips were
 * hardcoded in whatsappDripService).
 *
 * For every ACTIVE sequence: leads sitting in the sequence's triggerStage get
 * each step at anchor + delayHours, where the anchor is when the lead ENTERED
 * that stage (stage_changed activity; falls back to lead.createdAt for
 * NEW_LEAD / legacy rows). stopOnStageChange is implicit — leads that moved
 * on no longer match triggerStage and simply stop receiving steps.
 *
 * Dedup marker = an activities row (action 'drip_step_sent', metadata.stepId)
 * written BEFORE the send attempt — a crash can under-send, never spam.
 * WhatsApp sends no-op honestly until provider keys exist; EMAIL steps send
 * via emailService when the lead has an email.
 */

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendWhatsAppMessage, isInteraktConfigured } from '@/lib/interakt'
import { isMetaWhatsAppConfigured } from '@/lib/whatsapp/metaSender'
import { logger } from '@/lib/utils/logger'
import { LeadStage } from '@/generated/prisma'

const MAX_SENDS_PER_RUN = 50

const personalize = (body: string, lead: { studentName: string; courseInterest: string }) =>
  body
    .replace(/\{\{\s*name\s*\}\}/gi, lead.studentName.split(' ')[0] || 'there')
    .replace(/\{\{\s*course\s*\}\}/gi, lead.courseInterest || 'our NEET Biology program')

export async function processDbDripSequences(): Promise<{ sent: number; skipped: number }> {
  let sent = 0
  let skipped = 0
  try {
    const sequences = await prisma.drip_sequences.findMany({
      where: { isActive: true },
      include: { steps: { orderBy: { order: 'asc' } } },
    })
    if (sequences.length === 0) return { sent, skipped }

    // Channel availability up front: while a channel is unconfigured its
    // steps are left entirely untouched (no marker, no consumption) so the
    // sequence delivers in full once keys are added.
    const whatsappReady = isMetaWhatsAppConfigured() || isInteraktConfigured()
    const emailReady = Boolean(process.env.RESEND_API_KEY)
    if (!whatsappReady && !emailReady) return { sent, skipped }

    const validStages = new Set<string>(Object.values(LeadStage))
    const now = Date.now()

    for (const seq of sequences) {
      try {
        if (seq.steps.length === 0) continue
        if (!validStages.has(seq.triggerStage)) {
          logger.warn('drip sequence has invalid triggerStage — skipped', {
            service: 'db-drip',
            sequenceId: seq.id,
            triggerStage: seq.triggerStage,
          })
          continue
        }
        const maxDelayMs = Math.max(...seq.steps.map((s) => s.delayHours)) * 3600_000

        const leads = await prisma.leads.findMany({
          where: {
            stage: seq.triggerStage as LeadStage,
            // Only leads that could still have a due step (bounded window).
            updatedAt: { gte: new Date(now - maxDelayMs - 7 * 24 * 3600_000) },
          },
          select: {
            id: true,
            studentName: true,
            phone: true,
            email: true,
            courseInterest: true,
            createdAt: true,
            assignedToId: true,
          },
          take: 200,
        })

        for (const lead of leads) {
          // activities.userId is a required FK — an unassigned lead would send
          // then crash on the dedup marker and re-send every cron run.
          if (!lead.assignedToId) continue
          if (sent >= MAX_SENDS_PER_RUN) return { sent, skipped }

          // Anchor: when the lead entered the trigger stage.
          const stageEntry = await prisma.activities.findFirst({
            where: {
              leadId: lead.id,
              action: 'stage_changed',
              description: { endsWith: seq.triggerStage.replace(/_/g, ' ') },
            },
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true },
          })
          const anchor = (stageEntry?.createdAt || lead.createdAt).getTime()

          const sentMarkers = await prisma.activities.findMany({
            where: { leadId: lead.id, action: 'drip_step_sent' },
            select: { metadata: true },
          })
          const sentStepIds = new Set(
            sentMarkers
              .map((m) => (m.metadata as { stepId?: string } | null)?.stepId)
              .filter(Boolean)
          )

          for (const step of seq.steps) {
            if (sentStepIds.has(step.id)) continue
            if (anchor + step.delayHours * 3600_000 > now) break // later steps not due either

            // Unready channel → leave the step unconsumed for a later run.
            if (step.channel === 'EMAIL' ? !emailReady : !whatsappReady) continue

            const body = personalize(step.body, lead)
            let delivered = false
            if (step.channel === 'EMAIL') {
              if (lead.email) {
                try {
                  const { emailService } = await import('@/lib/email/emailService')
                  const result = await emailService.send({
                    to: lead.email,
                    subject: seq.name,
                    html: `<p>${body.replace(/\n/g, '<br/>')}</p>`,
                  })
                  delivered = !!result.success
                } catch {
                  delivered = false
                }
              }
            } else {
              const result = await sendWhatsAppMessage({ phone: lead.phone, message: body })
              delivered = !!result.success
            }

            // Marker AFTER the attempt (records the outcome). A hard provider
            // failure consumes the step (no retry-spam loops on bad numbers);
            // a crash between send and marker can duplicate ONE step at most.
            await prisma.activities.create({
              data: {
                id: randomUUID(),
                leadId: lead.id,
                userId: lead.assignedToId,
                action: 'drip_step_sent',
                description: `Drip "${seq.name}" step ${step.order + 1} (${step.channel})${delivered ? '' : ' — send failed'}`,
                metadata: {
                  sequenceId: seq.id,
                  stepId: step.id,
                  order: step.order,
                  delivered,
                },
              },
            })

            if (delivered) {
              sent++
              await prisma.crm_communications
                .create({
                  data: {
                    id: randomUUID(),
                    leadId: lead.id,
                    type: step.channel === 'EMAIL' ? 'EMAIL' : 'WHATSAPP',
                    direction: 'OUTBOUND',
                    message: body.slice(0, 1000),
                    status: 'SENT',
                    sentById: lead.assignedToId,
                  },
                })
                .catch(() => {})
            } else {
              skipped++
            }
          }
        }
      } catch (seqError) {
        logger.error('drip sequence failed — continuing with others', {
          service: 'db-drip',
          sequenceId: seq.id,
          error: seqError instanceof Error ? seqError.message : String(seqError),
        })
      }
    }
  } catch (error) {
    logger.error('DB drip processor failed', {
      service: 'db-drip',
      error: error instanceof Error ? error.message : String(error),
    })
  }
  return { sent, skipped }
}
