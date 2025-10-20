'use client'

import { useState, useEffect } from 'react'

export interface UserPreferences {
  // Academic Information
  currentClass?: '11' | '12' | 'dropper' | 'foundation'
  targetExam?: 'neet' | 'aiims' | 'jipmer' | 'state-cet' | 'multiple'
  currentScore?: number
  targetScore?: number
  weakSubjects?: string[]
  strongSubjects?: string[]

  // Learning Preferences
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  preferredLanguage?: 'english' | 'hindi' | 'mixed'
  studyTime?: 'morning' | 'afternoon' | 'evening' | 'night' | 'flexible'
  sessionDuration?: '30min' | '45min' | '60min' | '90min' | '120min'

  // Geographic & Practical
  location?: {
    city?: string
    state?: string
    country?: string
    timezone?: string
    pincode?: string
  }

  // Course Preferences
  preferredMode?: 'online' | 'offline' | 'hybrid'
  budgetRange?: 'budget' | 'standard' | 'premium' | 'flexible'
  startDate?: 'immediate' | 'next-month' | 'after-boards' | 'flexible'
  selectedLearningPath?: string
  weeklyStudyHours?: number

  // Behavioral Data
  visitCount?: number
  pagesVisited?: string[]
  timeSpent?: number
  lastVisit?: string
  deviceType?: 'mobile' | 'tablet' | 'desktop'
  referralSource?: string

  // Engagement History
  formsSubmitted?: string[]
  demosBooked?: number
  callsRequested?: number
  materialsDownloaded?: string[]
  videosWatched?: string[]

  // Personalization Flags
  showPersonalizedContent?: boolean
  allowLocationTracking?: boolean
  allowAnalytics?: boolean
  marketingOptIn?: boolean

  // International Features
  preferredCurrency?: 'INR' | 'USD' | 'GBP' | 'AUD' | 'CAD' | 'EUR' | 'SGD' | 'AED'
  countryCode?: string
  selectedTimezone?: string
  paymentProvider?: string
  languagePreference?: string[]

  // Contact Information
  name?: string
  email?: string
  phone?: string
}

export interface PersonalizationContext {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => void
  resetPreferences: () => void
  getRecommendations: () => CourseRecommendation[]
  getPersonalizedContent: (contentType: string) => any
  trackBehavior: (action: string, data?: any) => void
}

export interface CourseRecommendation {
  courseId: string
  courseName: string
  match: number // 0-100
  reasons: string[]
  priority: 'high' | 'medium' | 'low'
  customMessage?: string
}

class UserPreferenceManager {
  private static STORAGE_KEY = 'cerebrum_user_preferences'
  private static BEHAVIOR_KEY = 'cerebrum_user_behavior'

  static getPreferences(): UserPreferences {
    if (typeof window === 'undefined') return {}

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading user preferences:', error)
      return {}
    }
  }

  static updatePreferences(updates: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences()
    const updated = { ...current, ...updates }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Error saving user preferences:', error)
      }
    }

    return updated
  }

  static trackBehavior(action: string, data?: any): void {
    if (typeof window === 'undefined') return

    const behavior = {
      action,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
    }

    try {
      const existing = localStorage.getItem(this.BEHAVIOR_KEY)
      const behaviors = existing ? JSON.parse(existing) : []
      behaviors.push(behavior)

      // Keep only last 100 behaviors to prevent storage bloat
      if (behaviors.length > 100) {
        behaviors.splice(0, behaviors.length - 100)
      }

      localStorage.setItem(this.BEHAVIOR_KEY, JSON.stringify(behaviors))
    } catch (error) {
      console.error('Error tracking user behavior:', error)
    }
  }

  static getBehaviorData(): any[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(this.BEHAVIOR_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading behavior data:', error)
      return []
    }
  }

  static generateRecommendations(preferences: UserPreferences): CourseRecommendation[] {
    const recommendations: CourseRecommendation[] = []

    // Class-based recommendations
    if (preferences.currentClass) {
      switch (preferences.currentClass) {
        case '11':
          recommendations.push({
            courseId: 'class-11-foundation',
            courseName: 'Class 11th NEET Biology Foundation',
            match: 95,
            reasons: ['Perfect for your current class', 'Strong foundation building'],
            priority: 'high',
            customMessage: 'Build a strong foundation for NEET success!',
          })
          break
        case '12':
          recommendations.push({
            courseId: 'class-12-intensive',
            courseName: 'Class 12th NEET Biology Intensive',
            match: 90,
            reasons: ['Aligned with your current studies', 'Board + NEET preparation'],
            priority: 'high',
            customMessage: 'Ace both boards and NEET this year!',
          })
          break
        case 'dropper':
          recommendations.push({
            courseId: 'neet-dropper-program',
            courseName: 'NEET Dropper Program',
            match: 98,
            reasons: ['Specifically designed for droppers', 'Intensive preparation'],
            priority: 'high',
            customMessage: 'Transform your preparation and achieve your target!',
          })
          break
      }
    }

    // Score-based recommendations
    if (preferences.currentScore && preferences.targetScore) {
      const improvement = preferences.targetScore - preferences.currentScore
      if (improvement > 100) {
        recommendations.push({
          courseId: 'intensive-crash-course',
          courseName: 'Intensive Biology Crash Course',
          match: 85,
          reasons: ['Rapid score improvement focus', 'High-yield topic coverage'],
          priority: 'medium',
          customMessage: `Boost your score by ${improvement} points!`,
        })
      }
    }

    // Location-based recommendations
    if (preferences.location?.city) {
      const city = preferences.location.city.toLowerCase()
      if (['delhi', 'gurgaon', 'noida', 'faridabad'].includes(city)) {
        recommendations.push({
          courseId: 'delhi-ncr-classroom',
          courseName: 'Delhi NCR Classroom Program',
          match: 80,
          reasons: ['Local classroom availability', 'In-person interaction'],
          priority: 'medium',
        })
      }
    }

    // Budget-based recommendations
    if (preferences.budgetRange) {
      switch (preferences.budgetRange) {
        case 'budget':
          recommendations.push({
            courseId: 'foundation-online',
            courseName: 'Online Foundation Course',
            match: 75,
            reasons: ['Budget-friendly option', 'Complete curriculum coverage'],
            priority: 'medium',
          })
          break
        case 'premium':
          recommendations.push({
            courseId: 'premium-mentorship',
            courseName: 'Premium 1-on-1 Mentorship',
            match: 95,
            reasons: ['Personalized attention', 'Fastest results'],
            priority: 'high',
          })
          break
      }
    }

    return recommendations.sort((a, b) => b.match - a.match)
  }

  static getPersonalizedContent(contentType: string, preferences: UserPreferences): any {
    switch (contentType) {
      case 'hero_message':
        return this.getPersonalizedHeroMessage(preferences)
      case 'course_highlights':
        return this.getPersonalizedCourseHighlights(preferences)
      case 'success_stories':
        return this.getPersonalizedSuccessStories(preferences)
      case 'study_tips':
        return this.getPersonalizedStudyTips(preferences)
      default:
        return null
    }
  }

  private static getPersonalizedHeroMessage(preferences: UserPreferences): string {
    if (preferences.currentClass === 'dropper') {
      return 'Ready to crack NEET this year? Join our proven dropper program!'
    }
    if (preferences.targetScore && preferences.targetScore > 600) {
      return 'Aiming for top medical colleges? Our premium program guarantees 330+ in Biology!'
    }
    if (preferences.location?.city?.toLowerCase().includes('delhi')) {
      return "Delhi's #1 NEET Biology coaching now available in your area!"
    }
    return "Transform your NEET preparation with India's most trusted Biology academy!"
  }

  private static getPersonalizedCourseHighlights(preferences: UserPreferences): string[] {
    const highlights = []

    if (preferences.preferredMode === 'online') {
      highlights.push('100% Live Online Classes')
      highlights.push('Interactive Digital Whiteboard')
    }
    if (preferences.learningStyle === 'visual') {
      highlights.push('Visual Learning Modules')
      highlights.push('Animated Concept Videos')
    }
    if (preferences.weakSubjects?.includes('biology')) {
      highlights.push('Special Biology Foundation Program')
      highlights.push('Extra Doubt Sessions')
    }

    return highlights
  }

  private static getPersonalizedSuccessStories(preferences: UserPreferences): any[] {
    // Return success stories filtered by similar student profiles
    return []
  }

  private static getPersonalizedStudyTips(preferences: UserPreferences): string[] {
    const tips = []

    if (preferences.studyTime === 'morning') {
      tips.push('Morning study sessions are perfect for Biology - your brain is fresh!')
    }
    if (preferences.sessionDuration === '60min') {
      tips.push('60-minute focused sessions are ideal for concept mastery')
    }

    return tips
  }
}

export { UserPreferenceManager }

export function usePersonalization(): PersonalizationContext {
  const [preferences, setPreferences] = useState<UserPreferences>({})

  useEffect(() => {
    const stored = UserPreferenceManager.getPreferences()
    setPreferences(stored)

    // Track page visit
    UserPreferenceManager.trackBehavior('page_visit', {
      path: window.location.pathname,
      referrer: document.referrer,
    })
  }, [])

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const updated = UserPreferenceManager.updatePreferences(updates)
    setPreferences(updated)

    UserPreferenceManager.trackBehavior('preferences_updated', updates)
  }

  const resetPreferences = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(UserPreferenceManager['STORAGE_KEY'])
      localStorage.removeItem(UserPreferenceManager['BEHAVIOR_KEY'])
    }
    setPreferences({})
  }

  const getRecommendations = (): CourseRecommendation[] => {
    return UserPreferenceManager.generateRecommendations(preferences)
  }

  const getPersonalizedContent = (contentType: string): any => {
    return UserPreferenceManager.getPersonalizedContent(contentType, preferences)
  }

  const trackBehavior = (action: string, data?: any): void => {
    UserPreferenceManager.trackBehavior(action, data)
  }

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    getRecommendations,
    getPersonalizedContent,
    trackBehavior,
  }
}
