// Progressive profiling service for returning visitors
export interface UserProfile {
  id: string
  visitCount: number
  firstVisit: string
  lastVisit: string
  preferences: {
    class: '11' | '12' | 'dropper' | 'foundation' | null
    location: string | null
    subjects: string[]
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | null
    studyTime: 'morning' | 'afternoon' | 'evening' | 'night' | null
    targetScore: number | null
    currentLevel: 'beginner' | 'intermediate' | 'advanced' | null
  }
  behavior: {
    pagesVisited: string[]
    timeOnSite: number[]
    ctaClicked: string[]
    videosWatched: string[]
    downloadedResources: string[]
    testsTaken: string[]
    topicsViewed: string[]
  }
  engagement: {
    emailProvided: boolean
    phoneProvided: boolean
    demoBooked: boolean
    courseEnrolled: boolean
    whatsappOptIn: boolean
    newsletterSubscribed: boolean
  }
  demographics: {
    age: number | null
    gender: 'male' | 'female' | 'other' | null
    schoolType: 'cbse' | 'icse' | 'state' | 'international' | null
    parentIncome: 'low' | 'middle' | 'high' | null
    coachingHistory: boolean | null
  }
  interests: {
    topics: string[]
    examTypes: string[]
    careerGoals: string[]
    medicalColleges: string[]
  }
  contentPersonalization: {
    preferredContentType: 'video' | 'text' | 'interactive' | 'mixed' | null
    difficultyLevel: 'basic' | 'moderate' | 'challenging' | null
    languagePreference: 'english' | 'hindi' | 'regional' | null
    notificationPreference: 'email' | 'sms' | 'whatsapp' | 'push' | null
  }
}

export class UserProfileService {
  private static readonly STORAGE_KEY = 'cerebrum_user_profile'
  private static readonly TRACKING_KEY = 'cerebrum_tracking_consent'

  // Initialize or get existing profile
  static getProfile(): UserProfile {
    if (typeof window === 'undefined') {
      return this.createDefaultProfile()
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const profile = JSON.parse(stored)
        // Update visit info
        profile.visitCount = (profile.visitCount || 0) + 1
        profile.lastVisit = new Date().toISOString()
        this.saveProfile(profile)
        return profile
      }
    } catch (error) {
      console.warn('Error loading user profile:', error)
    }

    return this.createDefaultProfile()
  }

  // Create new profile for first-time visitor
  private static createDefaultProfile(): UserProfile {
    const profile: UserProfile = {
      id: this.generateUserId(),
      visitCount: 1,
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      preferences: {
        class: null,
        location: null,
        subjects: [],
        learningStyle: null,
        studyTime: null,
        targetScore: null,
        currentLevel: null,
      },
      behavior: {
        pagesVisited: [window?.location?.pathname || '/'],
        timeOnSite: [],
        ctaClicked: [],
        videosWatched: [],
        downloadedResources: [],
        testsTaken: [],
        topicsViewed: [],
      },
      engagement: {
        emailProvided: false,
        phoneProvided: false,
        demoBooked: false,
        courseEnrolled: false,
        whatsappOptIn: false,
        newsletterSubscribed: false,
      },
      demographics: {
        age: null,
        gender: null,
        schoolType: null,
        parentIncome: null,
        coachingHistory: null,
      },
      interests: {
        topics: [],
        examTypes: [],
        careerGoals: [],
        medicalColleges: [],
      },
      contentPersonalization: {
        preferredContentType: null,
        difficultyLevel: null,
        languagePreference: null,
        notificationPreference: null,
      },
    }

    this.saveProfile(profile)
    return profile
  }

  // Save profile to localStorage
  static saveProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile))
    } catch (error) {
      console.warn('Error saving user profile:', error)
    }
  }

  // Update specific preference
  static updatePreference<K extends keyof UserProfile['preferences']>(
    key: K,
    value: UserProfile['preferences'][K]
  ): void {
    const profile = this.getProfile()
    profile.preferences[key] = value
    this.saveProfile(profile)
  }

  // Track page visit
  static trackPageVisit(path: string, timeSpent?: number): void {
    const profile = this.getProfile()

    if (!profile.behavior.pagesVisited.includes(path)) {
      profile.behavior.pagesVisited.push(path)
    }

    if (timeSpent) {
      profile.behavior.timeOnSite.push(timeSpent)
    }

    this.saveProfile(profile)
  }

  // Track CTA click
  static trackCTAClick(ctaId: string, context?: string): void {
    const profile = this.getProfile()
    const ctaData = context ? `${ctaId}:${context}` : ctaId

    profile.behavior.ctaClicked.push(ctaData)
    this.saveProfile(profile)
  }

  // Track video engagement
  static trackVideoWatch(videoId: string, duration?: number): void {
    const profile = this.getProfile()
    const videoData = duration ? `${videoId}:${duration}` : videoId

    profile.behavior.videosWatched.push(videoData)
    this.saveProfile(profile)
  }

  // Track resource download
  static trackResourceDownload(resourceId: string, resourceType: string): void {
    const profile = this.getProfile()
    profile.behavior.downloadedResources.push(`${resourceType}:${resourceId}`)
    this.saveProfile(profile)
  }

  // Update engagement status
  static updateEngagement<K extends keyof UserProfile['engagement']>(
    key: K,
    value: UserProfile['engagement'][K]
  ): void {
    const profile = this.getProfile()
    profile.engagement[key] = value
    this.saveProfile(profile)
  }

  // Update demographics
  static updateDemographics(updates: Partial<UserProfile['demographics']>): void {
    const profile = this.getProfile()
    profile.demographics = { ...profile.demographics, ...updates }
    this.saveProfile(profile)
  }

  // Add interest
  static addInterest(category: keyof UserProfile['interests'], value: string): void {
    const profile = this.getProfile()
    if (!profile.interests[category].includes(value)) {
      profile.interests[category].push(value)
      this.saveProfile(profile)
    }
  }

  // Get personalized recommendations
  static getRecommendations(): {
    courses: string[]
    content: string[]
    nextActions: string[]
    urgencyLevel: 'low' | 'medium' | 'high'
  } {
    const profile = this.getProfile()
    const recommendations = {
      courses: [] as string[],
      content: [] as string[],
      nextActions: [] as string[],
      urgencyLevel: 'medium' as 'low' | 'medium' | 'high',
    }

    // Course recommendations based on class preference
    if (profile.preferences.class === '12') {
      recommendations.courses.push('Intensive NEET Biology', 'Board + NEET Combo')
      recommendations.urgencyLevel = 'high'
    } else if (profile.preferences.class === 'dropper') {
      recommendations.courses.push('1-Year Dropper Program', 'Crash Course Biology')
      recommendations.urgencyLevel = 'high'
    } else if (profile.preferences.class === '11') {
      recommendations.courses.push('Foundation Biology', '2-Year NEET Program')
      recommendations.urgencyLevel = 'medium'
    }

    // Content recommendations based on behavior
    if (profile.behavior.videosWatched.length > 3) {
      recommendations.content.push('Advanced Video Lectures', 'Live Interactive Sessions')
    }

    if (profile.behavior.downloadedResources.length > 2) {
      recommendations.content.push('Premium Study Materials', 'Practice Test Series')
    }

    // Next actions based on engagement
    if (!profile.engagement.emailProvided) {
      recommendations.nextActions.push('Get Free Study Materials')
    } else if (!profile.engagement.demoBooked) {
      recommendations.nextActions.push('Book Free Demo Class')
    } else if (!profile.engagement.courseEnrolled) {
      recommendations.nextActions.push('Enroll in Course')
    }

    return recommendations
  }

  // Get user segment for targeted marketing
  static getUserSegment(): string {
    const profile = this.getProfile()

    // High-intent users
    if (profile.engagement.demoBooked || profile.behavior.ctaClicked.length > 3) {
      return 'high-intent'
    }

    // Engaged visitors
    if (profile.visitCount > 3 || profile.behavior.timeOnSite.reduce((a, b) => a + b, 0) > 300) {
      return 'engaged'
    }

    // Class-specific segments
    if (profile.preferences.class === '12' || profile.preferences.class === 'dropper') {
      return 'urgent-neet'
    }

    // New visitors
    if (profile.visitCount === 1) {
      return 'new-visitor'
    }

    return 'general'
  }

  // Progressive profiling questions based on current data
  static getNextProfilingQuestion(): {
    question: string
    options: string[]
    category: string
    priority: number
  } | null {
    const profile = this.getProfile()

    // Priority 1: Class identification
    if (!profile.preferences.class) {
      return {
        question: 'Which class are you currently in?',
        options: ['Class 11', 'Class 12', 'Dropper/Gap Year', 'Foundation (9th/10th)'],
        category: 'class',
        priority: 1,
      }
    }

    // Priority 2: Target score
    if (!profile.preferences.targetScore && profile.preferences.class) {
      return {
        question: "What's your target NEET score?",
        options: ['600+', '550-600', '500-550', '450-500', 'Not sure'],
        category: 'target',
        priority: 2,
      }
    }

    // Priority 3: Current level
    if (!profile.preferences.currentLevel) {
      return {
        question: 'How would you rate your current Biology knowledge?',
        options: ['Beginner', 'Intermediate', 'Advanced'],
        category: 'level',
        priority: 3,
      }
    }

    // Priority 4: Learning style
    if (!profile.preferences.learningStyle) {
      return {
        question: "What's your preferred learning style?",
        options: [
          'Visual (videos, diagrams)',
          'Reading (notes, books)',
          'Interactive (discussions)',
          'Mixed approach',
        ],
        category: 'learning',
        priority: 4,
      }
    }

    return null
  }

  // Generate unique user ID
  private static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Check if tracking consent is given
  static hasTrackingConsent(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(this.TRACKING_KEY) === 'true'
  }

  // Set tracking consent
  static setTrackingConsent(consent: boolean): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TRACKING_KEY, consent.toString())
  }

  // Export profile data (GDPR compliance)
  static exportProfileData(): string {
    const profile = this.getProfile()
    return JSON.stringify(profile, null, 2)
  }

  // Delete profile data (GDPR compliance)
  static deleteProfileData(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.TRACKING_KEY)
  }
}
