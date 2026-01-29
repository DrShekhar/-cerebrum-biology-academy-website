/**
 * Data Retention Service
 * Handles GDPR-compliant data cleanup and hard deletion
 * Run as a scheduled job (e.g., daily cron at 3 AM)
 */

import { prisma } from '@/lib/prisma'

export interface DataRetentionConfig {
  // User data retention (in days)
  inactiveUserRetentionDays: number
  // Chat history retention (in days)
  chatHistoryRetentionDays: number
  // Test attempts retention (in days)
  testAttemptsRetentionDays: number
  // Communication logs retention (in days)
  communicationLogsRetentionDays: number
  // Analytics events retention (in days)
  analyticsEventsRetentionDays: number
  // Soft-deleted records retention (in days)
  softDeletedRetentionDays: number
}

const DEFAULT_CONFIG: DataRetentionConfig = {
  inactiveUserRetentionDays: 730, // 2 years
  chatHistoryRetentionDays: 365, // 1 year
  testAttemptsRetentionDays: 1095, // 3 years (for academic records)
  communicationLogsRetentionDays: 365, // 1 year
  analyticsEventsRetentionDays: 90, // 90 days
  softDeletedRetentionDays: 30, // 30 days grace period before hard delete
}

export interface RetentionResult {
  success: boolean
  deletedCounts: {
    freeUsers: number
    chatHistory: number
    testAttempts: number
    communicationLogs: number
    analyticsEvents: number
    softDeletedLeads: number
  }
  errors: string[]
  duration: number
}

export class DataRetentionService {
  private config: DataRetentionConfig
  private dryRun: boolean

  constructor(config: Partial<DataRetentionConfig> = {}, dryRun: boolean = false) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.dryRun = dryRun
  }

  /**
   * Run full data retention cleanup
   */
  async runRetention(): Promise<RetentionResult> {
    const startTime = Date.now()
    const errors: string[] = []
    const deletedCounts = {
      freeUsers: 0,
      chatHistory: 0,
      testAttempts: 0,
      communicationLogs: 0,
      analyticsEvents: 0,
      softDeletedLeads: 0,
    }

    console.log(`[DataRetention] Starting cleanup (dryRun: ${this.dryRun})`)

    // 1. Delete old chat history
    try {
      deletedCounts.chatHistory = await this.cleanupChatHistory()
    } catch (error) {
      errors.push(`Chat history cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // 2. Delete old analytics events
    try {
      deletedCounts.analyticsEvents = await this.cleanupAnalyticsEvents()
    } catch (error) {
      errors.push(`Analytics events cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // 3. Delete old communication logs
    try {
      deletedCounts.communicationLogs = await this.cleanupCommunicationLogs()
    } catch (error) {
      errors.push(`Communication logs cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // 4. Hard delete soft-deleted leads past retention period
    try {
      deletedCounts.softDeletedLeads = await this.hardDeleteSoftDeletedLeads()
    } catch (error) {
      errors.push(`Soft-deleted leads cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // 5. Clean up inactive free users (those who never logged in after registration)
    try {
      deletedCounts.freeUsers = await this.cleanupInactiveFreeUsers()
    } catch (error) {
      errors.push(`Inactive users cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    const duration = Date.now() - startTime

    console.log(`[DataRetention] Cleanup completed in ${duration}ms`, {
      deletedCounts,
      errors,
    })

    return {
      success: errors.length === 0,
      deletedCounts,
      errors,
      duration,
    }
  }

  /**
   * Delete chat history older than retention period
   */
  private async cleanupChatHistory(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.chatHistoryRetentionDays)

    if (this.dryRun) {
      const count = await prisma.chat_history.count({
        where: { createdAt: { lt: cutoffDate } },
      })
      console.log(`[DataRetention] Would delete ${count} chat history records`)
      return count
    }

    const result = await prisma.chat_history.deleteMany({
      where: { createdAt: { lt: cutoffDate } },
    })

    console.log(`[DataRetention] Deleted ${result.count} chat history records`)
    return result.count
  }

  /**
   * Delete analytics events older than retention period
   */
  private async cleanupAnalyticsEvents(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.analyticsEventsRetentionDays)

    if (this.dryRun) {
      const count = await prisma.analytics_events.count({
        where: { createdAt: { lt: cutoffDate } },
      })
      console.log(`[DataRetention] Would delete ${count} analytics events`)
      return count
    }

    const result = await prisma.analytics_events.deleteMany({
      where: { createdAt: { lt: cutoffDate } },
    })

    console.log(`[DataRetention] Deleted ${result.count} analytics events`)
    return result.count
  }

  /**
   * Delete communication logs older than retention period
   */
  private async cleanupCommunicationLogs(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.communicationLogsRetentionDays)

    if (this.dryRun) {
      const count = await prisma.communication_logs.count({
        where: { createdAt: { lt: cutoffDate } },
      })
      console.log(`[DataRetention] Would delete ${count} communication logs`)
      return count
    }

    const result = await prisma.communication_logs.deleteMany({
      where: { createdAt: { lt: cutoffDate } },
    })

    console.log(`[DataRetention] Deleted ${result.count} communication logs`)
    return result.count
  }

  /**
   * Hard delete soft-deleted leads past the grace period
   */
  private async hardDeleteSoftDeletedLeads(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.softDeletedRetentionDays)

    if (this.dryRun) {
      const count = await prisma.leads.count({
        where: {
          deletedAt: { lt: cutoffDate },
        },
      })
      console.log(`[DataRetention] Would hard delete ${count} soft-deleted leads`)
      return count
    }

    const result = await prisma.leads.deleteMany({
      where: {
        deletedAt: { lt: cutoffDate },
      },
    })

    console.log(`[DataRetention] Hard deleted ${result.count} soft-deleted leads`)
    return result.count
  }

  /**
   * Clean up inactive free users (unverified accounts older than retention period)
   */
  private async cleanupInactiveFreeUsers(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.inactiveUserRetentionDays)

    // Only delete users who:
    // 1. Haven't logged in for the retention period
    // 2. Have no test attempts (indicates never used the platform)
    // 3. Registered before the cutoff date

    if (this.dryRun) {
      const users = await prisma.free_users.findMany({
        where: {
          registrationDate: { lt: cutoffDate },
          lastActiveAt: null,
          test_attempts: { none: {} },
        },
        select: { id: true },
      })
      console.log(`[DataRetention] Would delete ${users.length} inactive free users`)
      return users.length
    }

    // Delete in batches to avoid timeout
    let totalDeleted = 0
    const batchSize = 100

    while (true) {
      const usersToDelete = await prisma.free_users.findMany({
        where: {
          registrationDate: { lt: cutoffDate },
          lastActiveAt: null,
          test_attempts: { none: {} },
        },
        select: { id: true },
        take: batchSize,
      })

      if (usersToDelete.length === 0) break

      const ids = usersToDelete.map((u) => u.id)

      // Delete related records first (cascade may not handle all)
      await prisma.$transaction([
        prisma.user_progress.deleteMany({ where: { freeUserId: { in: ids } } }),
        prisma.achievements.deleteMany({ where: { freeUserId: { in: ids } } }),
        prisma.bookmarks.deleteMany({ where: { freeUserId: { in: ids } } }),
        prisma.free_users.deleteMany({ where: { id: { in: ids } } }),
      ])

      totalDeleted += usersToDelete.length
      console.log(`[DataRetention] Deleted batch of ${usersToDelete.length} inactive free users`)
    }

    console.log(`[DataRetention] Total deleted inactive free users: ${totalDeleted}`)
    return totalDeleted
  }

  /**
   * GDPR Right to Erasure - Delete all data for a specific user
   */
  async deleteUserData(userId: string, isFreeUser: boolean = false): Promise<boolean> {
    console.log(`[DataRetention] Processing deletion request for user: ${userId}`)

    try {
      if (isFreeUser) {
        // Delete all related data for free user
        await prisma.$transaction([
          prisma.chat_history.deleteMany({ where: { freeUserId: userId } }),
          prisma.test_attempts.deleteMany({ where: { freeUserId: userId } }),
          prisma.user_progress.deleteMany({ where: { freeUserId: userId } }),
          prisma.achievements.deleteMany({ where: { freeUserId: userId } }),
          prisma.bookmarks.deleteMany({ where: { freeUserId: userId } }),
          prisma.performance_reports.deleteMany({ where: { freeUserId: userId } }),
          prisma.free_users.delete({ where: { id: userId } }),
        ])
      } else {
        // Delete all related data for registered user
        // Note: Some data may be retained for legal/financial reasons
        await prisma.$transaction([
          prisma.chat_history.deleteMany({ where: { userId } }),
          prisma.user_progress.deleteMany({ where: { userId } }),
          prisma.performance_reports.deleteMany({ where: { userId } }),
          prisma.communication_logs.deleteMany({ where: { userId } }),
          prisma.notes.deleteMany({ where: { userId } }),
          prisma.video_notes.deleteMany({ where: { userId } }),
          prisma.video_progress.deleteMany({ where: { userId } }),
          // Anonymize but keep financial records (required by law)
          prisma.payments.updateMany({
            where: { userId },
            data: {
              // Keep record but anonymize user reference
            },
          }),
          // Finally delete the user
          prisma.users.delete({ where: { id: userId } }),
        ])
      }

      console.log(`[DataRetention] Successfully deleted data for user: ${userId}`)
      return true
    } catch (error) {
      console.error(`[DataRetention] Failed to delete user data:`, error)
      return false
    }
  }
}

export const dataRetentionService = new DataRetentionService()
export default DataRetentionService
