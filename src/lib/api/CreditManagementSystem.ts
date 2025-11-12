/**
 * Credit Management System
 * Tracks per-student API usage, implements fair usage policies
 * Handles subscription tiers and billing
 */

import Redis from 'ioredis'
import { getRedisClient } from '@/lib/cache/redis'

interface StudentCredits {
  userId: string
  name: string
  tier: 'free' | 'basic' | 'premium' | 'unlimited'
  dailyAllowance: number
  monthlyAllowance: number
  currentDailyUsage: number
  currentMonthlyUsage: number
  lastResetDate: string
  totalLifetimeUsage: number
  joinDate: Date
  isActive: boolean
}

interface CreditTransaction {
  id: string
  userId: string
  type: 'usage' | 'purchase' | 'bonus' | 'refund'
  amount: number
  cost: number
  description: string
  provider: 'claude' | 'gpt4' | 'gpt3.5' | 'dalle' | 'other'
  timestamp: Date
  metadata?: any
}

interface TierLimits {
  name: string
  dailyQuestions: number
  monthlyQuestions: number
  aiProviders: string[]
  visualGeneration: boolean
  collaborativeRooms: boolean
  prioritySupport: boolean
  monthlyPrice: number
  features: string[]
}

interface UsageAnalytics {
  userId: string
  totalQuestions: number
  averageQuestionsPerDay: number
  topTopics: Array<{ topic: string; count: number }>
  preferredProviders: Array<{ provider: string; percentage: number }>
  costEfficiency: number
  engagementScore: number
  learningProgress: number
}

interface BillingAlert {
  type: 'approaching_limit' | 'limit_exceeded' | 'upgrade_suggested' | 'cost_warning'
  severity: 'info' | 'warning' | 'critical'
  message: string
  actionRequired: boolean
  suggestedTier?: string
}

export class CreditManagementSystem {
  private redis: Redis
  private tierLimits: Map<string, TierLimits>
  private pricePerCredit = 0.001 // $0.001 per credit

  constructor() {
    this.redis = getRedisClient(process.env.REDIS_URL) as any
    this.initializeTierLimits()
    this.startDailyResetTask()
    this.startMonthlyResetTask()
  }

  /**
   * Check if student has sufficient credits for request
   */
  async checkCreditsAvailable(
    userId: string,
    estimatedCost: number,
    requestType: string
  ): Promise<{
    allowed: boolean
    reason?: string
    remaining: number
    suggestedAction?: string
  }> {
    const studentCredits = await this.getStudentCredits(userId)
    const tierLimit = this.tierLimits.get(studentCredits.tier)!

    // Check daily limit
    if (studentCredits.currentDailyUsage >= tierLimit.dailyQuestions) {
      return {
        allowed: false,
        reason: 'Daily question limit exceeded',
        remaining: 0,
        suggestedAction:
          tierLimit.monthlyPrice > 0 ? 'Upgrade to get more daily questions' : 'Try again tomorrow',
      }
    }

    // Check monthly limit
    if (studentCredits.currentMonthlyUsage >= tierLimit.monthlyQuestions) {
      return {
        allowed: false,
        reason: 'Monthly question limit exceeded',
        remaining: 0,
        suggestedAction: 'Upgrade to premium for unlimited questions',
      }
    }

    // Check feature availability
    if (requestType === 'visual_generation' && !tierLimit.visualGeneration) {
      return {
        allowed: false,
        reason: 'Visual generation not available in your tier',
        remaining: studentCredits.currentDailyUsage,
        suggestedAction: 'Upgrade to access AI-generated diagrams',
      }
    }

    return {
      allowed: true,
      remaining: Math.min(
        tierLimit.dailyQuestions - studentCredits.currentDailyUsage,
        tierLimit.monthlyQuestions - studentCredits.currentMonthlyUsage
      ),
    }
  }

  /**
   * Deduct credits after successful API call
   */
  async deductCredits(
    userId: string,
    tokensUsed: number,
    actualCost: number,
    provider: string,
    description: string
  ): Promise<CreditTransaction> {
    const transaction: CreditTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      type: 'usage',
      amount: 1, // 1 question = 1 credit
      cost: actualCost,
      description,
      provider: provider as any,
      timestamp: new Date(),
    }

    // Update student usage
    await this.updateStudentUsage(userId, 1, actualCost)

    // Store transaction
    await this.storeTransaction(transaction)

    // Check for billing alerts
    await this.checkBillingAlerts(userId)

    return transaction
  }

  /**
   * Add bonus credits (referrals, achievements, etc.)
   */
  async addBonusCredits(
    userId: string,
    amount: number,
    reason: string
  ): Promise<CreditTransaction> {
    const transaction: CreditTransaction = {
      id: `bonus_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      type: 'bonus',
      amount,
      cost: 0,
      description: `Bonus credits: ${reason}`,
      provider: 'other',
      timestamp: new Date(),
    }

    // Add to daily allowance (temporary boost)
    const studentCredits = await this.getStudentCredits(userId)
    const updatedCredits = {
      ...studentCredits,
      dailyAllowance: studentCredits.dailyAllowance + amount,
    }

    await this.saveStudentCredits(updatedCredits)
    await this.storeTransaction(transaction)

    console.log(`🎁 Added ${amount} bonus credits to ${userId}: ${reason}`)
    return transaction
  }

  /**
   * Upgrade student tier
   */
  async upgradeStudentTier(userId: string, newTier: string): Promise<StudentCredits> {
    const studentCredits = await this.getStudentCredits(userId)
    const newTierLimits = this.tierLimits.get(newTier)

    if (!newTierLimits) {
      throw new Error(`Invalid tier: ${newTier}`)
    }

    const upgradedCredits: StudentCredits = {
      ...studentCredits,
      tier: newTier as any,
      dailyAllowance: newTierLimits.dailyQuestions,
      monthlyAllowance: newTierLimits.monthlyQuestions,
    }

    await this.saveStudentCredits(upgradedCredits)

    // Log upgrade transaction
    const transaction: CreditTransaction = {
      id: `upgrade_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      type: 'purchase',
      amount: 0,
      cost: newTierLimits.monthlyPrice,
      description: `Upgraded to ${newTier} tier`,
      provider: 'other',
      timestamp: new Date(),
      metadata: {
        previousTier: studentCredits.tier,
        newTier,
      },
    }

    await this.storeTransaction(transaction)

    console.log(`🚀 Upgraded ${userId} to ${newTier} tier`)
    return upgradedCredits
  }

  /**
   * Get comprehensive usage analytics
   */
  async getUsageAnalytics(userId: string): Promise<UsageAnalytics> {
    const transactions = await this.getUserTransactions(userId, 30) // Last 30 days
    const studentCredits = await this.getStudentCredits(userId)

    const totalQuestions = transactions.filter((t) => t.type === 'usage').length
    const averageQuestionsPerDay = totalQuestions / 30

    // Analyze top topics from transaction descriptions
    const topicCounts: Record<string, number> = {}
    transactions.forEach((t) => {
      if (t.description.includes('biology'))
        topicCounts['Biology'] = (topicCounts['Biology'] || 0) + 1
      if (t.description.includes('chemistry'))
        topicCounts['Chemistry'] = (topicCounts['Chemistry'] || 0) + 1
      if (t.description.includes('physics'))
        topicCounts['Physics'] = (topicCounts['Physics'] || 0) + 1
      if (t.description.includes('neet'))
        topicCounts['NEET Prep'] = (topicCounts['NEET Prep'] || 0) + 1
    })

    const topTopics = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Analyze provider preferences
    const providerCounts: Record<string, number> = {}
    transactions.forEach((t) => {
      providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1
    })

    const totalProviderUsage = Object.values(providerCounts).reduce((sum, count) => sum + count, 0)
    const preferredProviders = Object.entries(providerCounts)
      .map(([provider, count]) => ({
        provider,
        percentage: totalProviderUsage > 0 ? (count / totalProviderUsage) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)

    // Calculate efficiency and engagement scores
    const totalCost = transactions.reduce((sum, t) => sum + t.cost, 0)
    const costEfficiency = totalQuestions > 0 ? totalCost / totalQuestions : 0

    const engagementScore = Math.min(100, (averageQuestionsPerDay / 10) * 100) // Max engagement at 10 questions/day
    const learningProgress = this.calculateLearningProgress(transactions)

    return {
      userId,
      totalQuestions,
      averageQuestionsPerDay,
      topTopics,
      preferredProviders,
      costEfficiency,
      engagementScore,
      learningProgress,
    }
  }

  /**
   * Get student credit status
   */
  async getStudentCredits(userId: string): Promise<StudentCredits> {
    const cached = await this.redis.get(`credits:${userId}`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Default free tier for new students
    const defaultCredits: StudentCredits = {
      userId,
      name: 'Student',
      tier: 'free',
      dailyAllowance: 5,
      monthlyAllowance: 100,
      currentDailyUsage: 0,
      currentMonthlyUsage: 0,
      lastResetDate: new Date().toISOString().split('T')[0],
      totalLifetimeUsage: 0,
      joinDate: new Date(),
      isActive: true,
    }

    await this.saveStudentCredits(defaultCredits)
    return defaultCredits
  }

  /**
   * Get tier comparison for upgrade suggestions
   */
  getTierComparison(): TierLimits[] {
    return Array.from(this.tierLimits.values())
  }

  /**
   * Generate billing alerts based on usage patterns
   */
  async generateBillingAlerts(userId: string): Promise<BillingAlert[]> {
    const studentCredits = await this.getStudentCredits(userId)
    const tierLimit = this.tierLimits.get(studentCredits.tier)!
    const alerts: BillingAlert[] = []

    // Approaching daily limit
    if (studentCredits.currentDailyUsage >= tierLimit.dailyQuestions * 0.8) {
      alerts.push({
        type: 'approaching_limit',
        severity: 'warning',
        message: `You've used ${studentCredits.currentDailyUsage}/${tierLimit.dailyQuestions} daily questions`,
        actionRequired: false,
      })
    }

    // Daily limit exceeded
    if (studentCredits.currentDailyUsage >= tierLimit.dailyQuestions) {
      alerts.push({
        type: 'limit_exceeded',
        severity: 'critical',
        message: 'Daily question limit reached. Upgrade for more questions!',
        actionRequired: true,
        suggestedTier: studentCredits.tier === 'free' ? 'basic' : 'premium',
      })
    }

    // Upgrade suggestion based on usage patterns
    if (
      studentCredits.currentDailyUsage >= tierLimit.dailyQuestions * 0.9 &&
      studentCredits.tier === 'free'
    ) {
      alerts.push({
        type: 'upgrade_suggested',
        severity: 'info',
        message: "You're a power user! Upgrade to Basic for 20 daily questions",
        actionRequired: false,
        suggestedTier: 'basic',
      })
    }

    return alerts
  }

  // Private helper methods

  private async updateStudentUsage(userId: string, credits: number, cost: number): Promise<void> {
    const studentCredits = await this.getStudentCredits(userId)

    const updated: StudentCredits = {
      ...studentCredits,
      currentDailyUsage: studentCredits.currentDailyUsage + credits,
      currentMonthlyUsage: studentCredits.currentMonthlyUsage + credits,
      totalLifetimeUsage: studentCredits.totalLifetimeUsage + credits,
    }

    await this.saveStudentCredits(updated)
  }

  private async saveStudentCredits(credits: StudentCredits): Promise<void> {
    await this.redis.setex(
      `credits:${credits.userId}`,
      86400, // 24 hours cache
      JSON.stringify(credits)
    )

    // Also store in persistent storage
    await this.redis.hset('all_credits', credits.userId, JSON.stringify(credits))
  }

  private async storeTransaction(transaction: CreditTransaction): Promise<void> {
    // Store individual transaction
    await this.redis.setex(
      `transaction:${transaction.id}`,
      2592000, // 30 days
      JSON.stringify(transaction)
    )

    // Add to user's transaction list
    await this.redis.lpush(`transactions:${transaction.userId}`, transaction.id)
    await this.redis.expire(`transactions:${transaction.userId}`, 2592000)

    // Update daily stats
    const today = new Date().toISOString().split('T')[0]
    await this.redis.hincrby(`daily_usage:${today}`, transaction.userId, transaction.amount)
    await this.redis.hincrby(
      `daily_cost:${today}`,
      transaction.userId,
      Math.round(transaction.cost * 10000)
    )
  }

  private async getUserTransactions(userId: string, days: number): Promise<CreditTransaction[]> {
    const transactionIds = await this.redis.lrange(`transactions:${userId}`, 0, days * 10) // Approximate
    const transactions: CreditTransaction[] = []

    for (const id of transactionIds) {
      const data = await this.redis.get(`transaction:${id}`)
      if (data) {
        transactions.push(JSON.parse(data))
      }
    }

    return transactions.filter((t) => {
      const daysDiff = (Date.now() - new Date(t.timestamp).getTime()) / (1000 * 60 * 60 * 24)
      return daysDiff <= days
    })
  }

  private async checkBillingAlerts(userId: string): Promise<void> {
    const alerts = await this.generateBillingAlerts(userId)

    for (const alert of alerts) {
      if (alert.severity === 'critical') {
        await this.sendBillingNotification(userId, alert)
      }
    }
  }

  private async sendBillingNotification(userId: string, alert: BillingAlert): Promise<void> {
    // Store notification for dashboard
    await this.redis.setex(`notification:${userId}:${Date.now()}`, 86400, JSON.stringify(alert))

    console.log(`📢 Billing alert for ${userId}: ${alert.message}`)
  }

  private calculateLearningProgress(transactions: CreditTransaction[]): number {
    // Simple progress calculation based on consistency and variety
    const dailyUsage = new Set(
      transactions.map((t) => new Date(t.timestamp).toISOString().split('T')[0])
    ).size

    const topicVariety = new Set(
      transactions
        .map((t) => t.description.toLowerCase())
        .filter(
          (desc) =>
            desc.includes('biology') || desc.includes('chemistry') || desc.includes('physics')
        )
    ).size

    // Progress score: consistency (daily usage) + variety (topic diversity)
    return Math.min(100, dailyUsage * 3 + topicVariety * 5)
  }

  private initializeTierLimits(): void {
    this.tierLimits = new Map([
      [
        'free',
        {
          name: 'Free',
          dailyQuestions: 5,
          monthlyQuestions: 100,
          aiProviders: ['gpt3.5'],
          visualGeneration: false,
          collaborativeRooms: false,
          prioritySupport: false,
          monthlyPrice: 0,
          features: [
            '5 questions per day',
            'Basic AI responses',
            'Text-only content',
            'Community support',
          ],
        },
      ],
      [
        'basic',
        {
          name: 'Basic',
          dailyQuestions: 20,
          monthlyQuestions: 500,
          aiProviders: ['gpt3.5', 'claude'],
          visualGeneration: false,
          collaborativeRooms: true,
          prioritySupport: false,
          monthlyPrice: 299, // ₹299
          features: [
            '20 questions per day',
            'Claude + GPT-3.5',
            'Collaborative study rooms',
            'Email support',
          ],
        },
      ],
      [
        'premium',
        {
          name: 'Premium',
          dailyQuestions: 100,
          monthlyQuestions: 2000,
          aiProviders: ['gpt3.5', 'gpt4', 'claude'],
          visualGeneration: true,
          collaborativeRooms: true,
          prioritySupport: true,
          monthlyPrice: 999, // ₹999
          features: [
            '100 questions per day',
            'All AI providers (Claude, GPT-4)',
            'AI-generated diagrams',
            'Priority support',
            'Advanced analytics',
          ],
        },
      ],
      [
        'unlimited',
        {
          name: 'Unlimited',
          dailyQuestions: 1000,
          monthlyQuestions: 10000,
          aiProviders: ['gpt3.5', 'gpt4', 'claude', 'dalle'],
          visualGeneration: true,
          collaborativeRooms: true,
          prioritySupport: true,
          monthlyPrice: 2499, // ₹2499
          features: [
            'Unlimited questions',
            'All AI providers + DALL-E',
            'Custom study plans',
            'One-on-one tutoring',
            'API access',
          ],
        },
      ],
    ])
  }

  private startDailyResetTask(): void {
    // Reset daily usage at midnight IST
    const now = new Date()
    const nextMidnight = new Date(now)
    nextMidnight.setDate(now.getDate() + 1)
    nextMidnight.setHours(0, 0, 0, 0)

    const msUntilMidnight = nextMidnight.getTime() - now.getTime()

    setTimeout(() => {
      this.resetDailyUsage()
      // Set interval for daily resets
      setInterval(() => this.resetDailyUsage(), 24 * 60 * 60 * 1000)
    }, msUntilMidnight)
  }

  private startMonthlyResetTask(): void {
    // Reset monthly usage on the 1st of each month
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const msUntilNextMonth = nextMonth.getTime() - now.getTime()

    setTimeout(() => {
      this.resetMonthlyUsage()
      // Set interval for monthly resets (check daily, reset when month changes)
      setInterval(
        () => {
          const today = new Date()
          if (today.getDate() === 1) {
            this.resetMonthlyUsage()
          }
        },
        24 * 60 * 60 * 1000
      )
    }, msUntilNextMonth)
  }

  private async resetDailyUsage(): Promise<void> {
    console.log('🔄 Resetting daily usage for all students...')

    const allUserIds = await this.redis.hkeys('all_credits')

    for (const userId of allUserIds) {
      const credits = await this.getStudentCredits(userId)
      const updated: StudentCredits = {
        ...credits,
        currentDailyUsage: 0,
        lastResetDate: new Date().toISOString().split('T')[0],
      }
      await this.saveStudentCredits(updated)
    }

    console.log(`✅ Reset daily usage for ${allUserIds.length} students`)
  }

  private async resetMonthlyUsage(): Promise<void> {
    console.log('🔄 Resetting monthly usage for all students...')

    const allUserIds = await this.redis.hkeys('all_credits')

    for (const userId of allUserIds) {
      const credits = await this.getStudentCredits(userId)
      const updated: StudentCredits = {
        ...credits,
        currentMonthlyUsage: 0,
      }
      await this.saveStudentCredits(updated)
    }

    console.log(`✅ Reset monthly usage for ${allUserIds.length} students`)
  }
}
