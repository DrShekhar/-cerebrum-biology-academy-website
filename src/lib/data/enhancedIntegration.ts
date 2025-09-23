/**
 * Enhanced Data Integration System
 * Complete integration with real-time updates, AI recommendations, and advanced analytics
 */

import { z } from 'zod'

// Enhanced schemas with Zod validation
export const UserPersonalitySchema = z.object({
  type: z.enum(['achiever', 'explorer', 'socializer', 'killer', 'balanced']),
  confidence: z.number().min(0).max(100),
  traits: z.array(z.string()),
  preferences: z.object({
    learningStyle: z.enum(['visual', 'auditory', 'kinesthetic', 'reading']),
    pace: z.enum(['fast', 'medium', 'slow']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    features: z.array(z.string()),
  }),
  updatedAt: z.string(),
})

export const SmartFiltersSchema = z.object({
  budget: z.tuple([z.number(), z.number()]),
  difficulty: z.array(z.string()),
  features: z.array(z.string()),
  duration: z.array(z.string()),
  rating: z.number().min(0).max(5),
  aiPersonalized: z.boolean(),
  showOnlyRecommended: z.boolean(),
})

export const UserInteractionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  type: z.enum(['view', 'hover', 'click', 'search', 'filter', 'select', 'purchase']),
  target: z.string(),
  metadata: z.record(z.unknown()),
  timestamp: z.string(),
  duration: z.number().optional(),
})

export const AIRecommendationSchema = z.object({
  courseId: z.string(),
  planId: z.string().optional(),
  confidence: z.number().min(0).max(100),
  reasons: z.array(z.string()),
  personalityMatch: z.number().min(0).max(100),
  successPrediction: z.number().min(0).max(100),
  generatedAt: z.string(),
})

// Types
export type UserPersonality = z.infer<typeof UserPersonalitySchema>
export type SmartFilters = z.infer<typeof SmartFiltersSchema>
export type UserInteraction = z.infer<typeof UserInteractionSchema>
export type AIRecommendation = z.infer<typeof AIRecommendationSchema>

// Enhanced Data Integration Service
export class EnhancedDataIntegration {
  private static instance: EnhancedDataIntegration
  private userSessions = new Map<string, any>()
  private realTimeListeners = new Set<(data: any) => void>()

  static getInstance(): EnhancedDataIntegration {
    if (!this.instance) {
      this.instance = new EnhancedDataIntegration()
    }
    return this.instance
  }

  // User Personality Analysis
  async analyzeUserPersonality(interactions: UserInteraction[]): Promise<UserPersonality> {
    const traits = this.extractTraits(interactions)
    const type = this.determinePersonalityType(traits)

    return {
      type,
      confidence: this.calculateConfidence(interactions),
      traits,
      preferences: this.extractPreferences(interactions),
      updatedAt: new Date().toISOString(),
    }
  }

  private extractTraits(interactions: UserInteraction[]): string[] {
    const traits = new Set<string>()

    // Analyze interaction patterns
    const viewTime = interactions.reduce((sum, i) => sum + (i.duration || 0), 0)
    const clickRate = interactions.filter((i) => i.type === 'click').length / interactions.length

    if (viewTime > 300) traits.add('thorough')
    if (clickRate > 0.3) traits.add('decisive')
    if (interactions.some((i) => i.type === 'search')) traits.add('goal-oriented')
    if (interactions.some((i) => i.metadata.premium === true)) traits.add('quality-focused')

    return Array.from(traits)
  }

  private determinePersonalityType(
    traits: string[]
  ): 'achiever' | 'explorer' | 'socializer' | 'killer' | 'balanced' {
    if (traits.includes('goal-oriented') && traits.includes('decisive')) return 'achiever'
    if (traits.includes('thorough') && !traits.includes('decisive')) return 'explorer'
    if (traits.includes('quality-focused')) return 'socializer'
    return 'balanced'
  }

  private calculateConfidence(interactions: UserInteraction[]): number {
    // More interactions = higher confidence in personality analysis
    return Math.min(95, interactions.length * 10)
  }

  private extractPreferences(interactions: UserInteraction[]): UserPersonality['preferences'] {
    const hasVideoInteractions = interactions.some((i) => i.metadata.type === 'video')
    const hasDetailedViews = interactions.some((i) => i.duration && i.duration > 60)
    const premiumInteractions = interactions.filter((i) => i.metadata.premium === true).length

    return {
      learningStyle: hasVideoInteractions ? 'visual' : hasDetailedViews ? 'reading' : 'visual',
      pace: interactions.length > 20 ? 'fast' : interactions.length > 10 ? 'medium' : 'slow',
      difficulty:
        premiumInteractions > 5
          ? 'advanced'
          : premiumInteractions > 2
            ? 'intermediate'
            : 'beginner',
      features: this.extractFeaturePreferences(interactions),
    }
  }

  private extractFeaturePreferences(interactions: UserInteraction[]): string[] {
    const features = new Set<string>()

    interactions.forEach((interaction) => {
      if (interaction.metadata.features) {
        ;(interaction.metadata.features as string[]).forEach((f) => features.add(f))
      }
    })

    return Array.from(features).slice(0, 5) // Top 5 preferred features
  }

  // AI Recommendation Engine
  async generateRecommendations(
    userId: string,
    personality: UserPersonality,
    filters: SmartFilters,
    courseData: any[]
  ): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = []

    for (const course of courseData) {
      const personalityMatch = this.calculatePersonalityMatch(personality, course)
      const successPrediction = this.predictSuccess(personality, course)
      const confidence = (personalityMatch + successPrediction) / 2

      if (confidence > 60) {
        // Only recommend if confidence > 60%
        recommendations.push({
          courseId: course.id,
          planId: this.recommendBestPlan(personality, course.plans),
          confidence,
          reasons: this.generateReasons(personality, course),
          personalityMatch,
          successPrediction,
          generatedAt: new Date().toISOString(),
        })
      }
    }

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 3) // Top 3 recommendations
  }

  private calculatePersonalityMatch(personality: UserPersonality, course: any): number {
    let match = 50 // Base score

    // Course difficulty alignment
    if (personality.preferences.difficulty === course.difficulty.toLowerCase()) {
      match += 20
    }

    // Feature preferences alignment
    const courseFeatures = course.plans.flatMap((p: any) => p.features)
    const matchingFeatures = personality.preferences.features.filter((pref) =>
      courseFeatures.some((f: string) => f.toLowerCase().includes(pref.toLowerCase()))
    )
    match += matchingFeatures.length * 5

    // Personality type specific bonuses
    if (personality.type === 'achiever' && course.series === 'Pinnacle') match += 15
    if (personality.type === 'explorer' && course.preview.sampleLessons.length > 3) match += 10
    if (personality.type === 'socializer' && course.preview.testimonials.length > 2) match += 10

    return Math.min(100, match)
  }

  private predictSuccess(personality: UserPersonality, course: any): number {
    let prediction = 60 // Base prediction

    // Historical success rates
    if (course.completionRate > 90) prediction += 15
    if (course.rating > 4.8) prediction += 10

    // Personality fit
    if (personality.traits.includes('thorough') && course.duration.includes('Month'))
      prediction += 10
    if (personality.traits.includes('decisive') && course.series === 'Intensive') prediction += 10

    return Math.min(100, prediction)
  }

  private recommendBestPlan(personality: UserPersonality, plans: any[]): string {
    // Recommend based on personality and preferences
    if (personality.type === 'achiever') return 'A' // Premium plan
    if (personality.preferences.difficulty === 'advanced') return 'A'
    if (personality.preferences.difficulty === 'beginner') return 'C'
    return 'B' // Balanced choice
  }

  private generateReasons(personality: UserPersonality, course: any): string[] {
    const reasons: string[] = []

    if (course.rating > 4.8) reasons.push('Highly rated by students')
    if (course.completionRate > 90) reasons.push('Excellent completion rate')
    if (personality.type === 'achiever' && course.series === 'Pinnacle') {
      reasons.push('Matches your achievement-oriented personality')
    }
    if (personality.traits.includes('quality-focused')) {
      reasons.push('Premium quality instruction')
    }

    return reasons.slice(0, 4) // Top 4 reasons
  }

  // Real-time Analytics
  trackInteraction(interaction: UserInteraction): void {
    // Validate interaction
    const validated = UserInteractionSchema.parse(interaction)

    // Store in session
    const sessionData = this.userSessions.get(validated.sessionId) || {
      interactions: [],
      startTime: Date.now(),
      lastActivity: Date.now(),
    }

    sessionData.interactions.push(validated)
    sessionData.lastActivity = Date.now()
    this.userSessions.set(validated.sessionId, sessionData)

    // Trigger real-time updates
    this.notifyListeners({
      type: 'interaction',
      data: validated,
      sessionData,
    })

    // Auto-analyze personality if enough data
    if (sessionData.interactions.length % 5 === 0) {
      this.analyzeAndUpdatePersonality(validated.sessionId)
    }
  }

  private async analyzeAndUpdatePersonality(sessionId: string): Promise<void> {
    const sessionData = this.userSessions.get(sessionId)
    if (!sessionData || sessionData.interactions.length < 5) return

    try {
      const personality = await this.analyzeUserPersonality(sessionData.interactions)

      // Update session with personality data
      sessionData.personality = personality
      this.userSessions.set(sessionId, sessionData)

      // Notify listeners of personality update
      this.notifyListeners({
        type: 'personality_update',
        data: personality,
        sessionId,
      })
    } catch (error) {
      console.error('Error analyzing personality:', error)
    }
  }

  // Real-time listeners
  addRealTimeListener(callback: (data: any) => void): () => void {
    this.realTimeListeners.add(callback)
    return () => this.realTimeListeners.delete(callback)
  }

  private notifyListeners(data: any): void {
    this.realTimeListeners.forEach((listener) => {
      try {
        listener(data)
      } catch (error) {
        console.error('Error in real-time listener:', error)
      }
    })
  }

  // Session Management
  getSessionData(sessionId: string): any {
    return this.userSessions.get(sessionId)
  }

  getUserPersonality(sessionId: string): UserPersonality | null {
    const sessionData = this.userSessions.get(sessionId)
    return sessionData?.personality || null
  }

  // Performance Analytics
  getPerformanceMetrics(): any {
    return {
      activeSessions: this.userSessions.size,
      totalInteractions: Array.from(this.userSessions.values()).reduce(
        (sum, session) => sum + session.interactions.length,
        0
      ),
      averageSessionDuration: this.calculateAverageSessionDuration(),
      topInteractionTypes: this.getTopInteractionTypes(),
      personalityDistribution: this.getPersonalityDistribution(),
    }
  }

  private calculateAverageSessionDuration(): number {
    const sessions = Array.from(this.userSessions.values())
    if (sessions.length === 0) return 0

    const totalDuration = sessions.reduce(
      (sum, session) => sum + (session.lastActivity - session.startTime),
      0
    )

    return totalDuration / sessions.length
  }

  private getTopInteractionTypes(): Record<string, number> {
    const types: Record<string, number> = {}

    Array.from(this.userSessions.values()).forEach((session) => {
      session.interactions.forEach((interaction: UserInteraction) => {
        types[interaction.type] = (types[interaction.type] || 0) + 1
      })
    })

    return types
  }

  private getPersonalityDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {}

    Array.from(this.userSessions.values()).forEach((session) => {
      if (session.personality) {
        const type = session.personality.type
        distribution[type] = (distribution[type] || 0) + 1
      }
    })

    return distribution
  }

  // Cleanup inactive sessions
  cleanupInactiveSessions(maxAge: number = 3600000): void {
    // 1 hour default
    const now = Date.now()

    for (const [sessionId, sessionData] of this.userSessions.entries()) {
      if (now - sessionData.lastActivity > maxAge) {
        this.userSessions.delete(sessionId)
      }
    }
  }
}

// Global instance
export const enhancedDataIntegration = EnhancedDataIntegration.getInstance()

// Utility functions
export function validateSmartFilters(filters: unknown): SmartFilters {
  return SmartFiltersSchema.parse(filters)
}

export function createInteraction(
  type: UserInteraction['type'],
  target: string,
  metadata: Record<string, unknown> = {},
  userId = 'anonymous',
  sessionId = crypto.randomUUID()
): UserInteraction {
  return {
    id: crypto.randomUUID(),
    userId,
    sessionId,
    type,
    target,
    metadata,
    timestamp: new Date().toISOString(),
    duration: metadata.duration as number | undefined,
  }
}

// React Hook for enhanced data integration
export function useEnhancedDataIntegration(sessionId: string) {
  const integration = enhancedDataIntegration

  const trackInteraction = (
    type: UserInteraction['type'],
    target: string,
    metadata: Record<string, unknown> = {}
  ) => {
    const interaction = createInteraction(type, target, metadata, 'user', sessionId)
    integration.trackInteraction(interaction)
  }

  const getSessionData = () => integration.getSessionData(sessionId)
  const getUserPersonality = () => integration.getUserPersonality(sessionId)
  const getPerformanceMetrics = () => integration.getPerformanceMetrics()

  return {
    trackInteraction,
    getSessionData,
    getUserPersonality,
    getPerformanceMetrics,
    addRealTimeListener: integration.addRealTimeListener.bind(integration),
  }
}
