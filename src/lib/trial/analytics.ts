import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export interface TrialEventData {
  eventName: string
  freeUserId: string
  properties?: Record<string, any>
}

export async function trackTrialEvent(data: TrialEventData): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        eventType: 'trial',
        eventName: data.eventName,
        userId: data.freeUserId,
        properties: {
          ...data.properties,
          timestamp: new Date().toISOString(),
        },
      },
    })
  } catch (error) {
    console.error('Failed to track trial event:', error)
  }
}

export const TrialEvents = {
  TRIAL_STARTED: 'trial_started',
  TRIAL_EXPIRED: 'trial_expired',
  TRIAL_EXTENDED: 'trial_extended',
  TRIAL_UPGRADED: 'trial_upgraded',
  TRIAL_ABANDONED: 'trial_abandoned',
  TEST_TAKEN: 'trial_test_taken',
  TEST_LIMIT_REACHED: 'trial_test_limit_reached',
  UPGRADE_CTA_CLICKED: 'trial_upgrade_cta_clicked',
  EXTENSION_REQUESTED: 'trial_extension_requested',
  CONTACT_SUBMITTED: 'trial_contact_submitted',
  BANNER_DISMISSED: 'trial_banner_dismissed',
  MODAL_OPENED: 'trial_modal_opened',
  MODAL_CLOSED: 'trial_modal_closed',
} as const

export type TrialEvent = (typeof TrialEvents)[keyof typeof TrialEvents]
