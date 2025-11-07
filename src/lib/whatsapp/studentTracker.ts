/**
 * Student Tracking and Rate Limiting Service
 * Manages student interactions, progress, and daily question limits
 */

interface StudentInteraction {
  messageId: string
  question: string
  response: any
  timestamp: string
  type: string
}

interface StudentProfile {
  phoneNumber: string
  name: string
  joinDate: string
  totalQuestions: number
  questionsToday: number
  lastQuestionTime: string
  conversationHistory: StudentInteraction[]
  preferredLanguage: 'english' | 'hindi' | 'hinglish'
  neetYear?: string
  studyTopics: string[]
  weakAreas: string[]
  strongAreas: string[]
  subscriptionType: 'free' | 'premium'
  dailyLimit: number
}

interface MessageStatus {
  messageId: string
  status: string
  recipientId: string
  timestamp: string
}

export class StudentTracker {
  private students: Map<string, StudentProfile> = new Map()
  private dailyQuestionCounts: Map<string, { date: string; count: number }> = new Map()

  constructor() {
    // Load existing data from storage
    this.loadStudentData()
  }

  /**
   * Check if student can ask another question (rate limiting)
   */
  async checkRateLimit(phoneNumber: string): Promise<boolean> {
    const student = await this.getOrCreateStudent(phoneNumber)
    const today = new Date().toISOString().split('T')[0]

    // Reset count if it's a new day
    const dailyCount = this.dailyQuestionCounts.get(phoneNumber)
    if (!dailyCount || dailyCount.date !== today) {
      this.dailyQuestionCounts.set(phoneNumber, { date: today, count: 0 })
      student.questionsToday = 0
    }

    // Check against daily limit
    const currentCount = this.dailyQuestionCounts.get(phoneNumber)?.count || 0
    const canAsk = currentCount < student.dailyLimit

    console.log(
      `📊 Rate limit check for ${phoneNumber}: ${currentCount}/${student.dailyLimit} questions today`
    )

    return canAsk
  }

  /**
   * Log a student interaction
   */
  async logInteraction(phoneNumber: string, interaction: StudentInteraction): Promise<void> {
    try {
      const student = await this.getOrCreateStudent(phoneNumber)

      // Add interaction to history
      student.conversationHistory.unshift(interaction)

      // Keep only last 20 interactions
      student.conversationHistory = student.conversationHistory.slice(0, 20)

      // Update counters
      student.totalQuestions++
      student.questionsToday++
      student.lastQuestionTime = interaction.timestamp

      // Update daily count
      const today = new Date().toISOString().split('T')[0]
      const dailyCount = this.dailyQuestionCounts.get(phoneNumber) || { date: today, count: 0 }
      dailyCount.count++
      this.dailyQuestionCounts.set(phoneNumber, dailyCount)

      // Analyze and update student profile
      await this.updateStudentProfile(phoneNumber, interaction)

      // Save to persistent storage
      await this.saveStudentData(phoneNumber, student)

      console.log(`📝 Logged interaction for ${student.name}: Question #${student.totalQuestions}`)
    } catch (error) {
      console.error('❌ Failed to log interaction:', error)
    }
  }

  /**
   * Get conversation history for context
   */
  async getConversationHistory(
    phoneNumber: string,
    limit: number = 5
  ): Promise<StudentInteraction[]> {
    const student = await this.getOrCreateStudent(phoneNumber)
    return student.conversationHistory.slice(0, limit)
  }

  /**
   * Update message delivery status
   */
  async updateMessageStatus(status: MessageStatus): Promise<void> {
    try {
      // Find student by recipient ID (phone number)
      const student = this.students.get(status.recipientId)
      if (student) {
        // Find the interaction with this message ID
        const interaction = student.conversationHistory.find(
          (interaction) => interaction.messageId === status.messageId
        )

        if (interaction) {
          // Add status tracking (you could extend the interaction interface)
          console.log(`📊 Message ${status.messageId} ${status.status} for ${student.name}`)
        }
      }
    } catch (error) {
      console.error('❌ Failed to update message status:', error)
    }
  }

  /**
   * Get or create student profile
   */
  private async getOrCreateStudent(phoneNumber: string): Promise<StudentProfile> {
    if (this.students.has(phoneNumber)) {
      return this.students.get(phoneNumber)!
    }

    // Create new student profile
    const newStudent: StudentProfile = {
      phoneNumber,
      name: 'Student',
      joinDate: new Date().toISOString(),
      totalQuestions: 0,
      questionsToday: 0,
      lastQuestionTime: '',
      conversationHistory: [],
      preferredLanguage: 'english',
      studyTopics: [],
      weakAreas: [],
      strongAreas: [],
      subscriptionType: 'free',
      dailyLimit: 50, // Free users get 50 questions per day
    }

    this.students.set(phoneNumber, newStudent)
    await this.saveStudentData(phoneNumber, newStudent)

    console.log(`👋 Created new student profile for ${phoneNumber}`)
    return newStudent
  }

  /**
   * Analyze interaction and update student profile
   */
  private async updateStudentProfile(
    phoneNumber: string,
    interaction: StudentInteraction
  ): Promise<void> {
    const student = this.students.get(phoneNumber)
    if (!student) return

    try {
      // Extract biology topics from question
      const topics = this.extractBiologyTopics(interaction.question)
      for (const topic of topics) {
        if (!student.studyTopics.includes(topic)) {
          student.studyTopics.push(topic)
        }
      }

      // Detect preferred language
      const detectedLanguage = this.detectLanguage(interaction.question)
      if (detectedLanguage && detectedLanguage !== student.preferredLanguage) {
        student.preferredLanguage = detectedLanguage
        console.log(`🗣️  Updated preferred language for ${student.name}: ${detectedLanguage}`)
      }

      // Analyze difficulty patterns to identify weak/strong areas
      if (interaction.response?.difficulty) {
        const topic = interaction.response.topic
        if (interaction.response.difficulty === 'basic' && topics.length > 0) {
          // Student asking basic questions about a topic - might be a weak area
          if (!student.weakAreas.includes(topic)) {
            student.weakAreas.push(topic)
          }
        } else if (interaction.response.difficulty === 'advanced') {
          // Student asking advanced questions - might be a strong area
          if (!student.strongAreas.includes(topic)) {
            student.strongAreas.push(topic)
          }
        }
      }

      // Keep arrays reasonable size
      student.studyTopics = student.studyTopics.slice(0, 15)
      student.weakAreas = student.weakAreas.slice(0, 10)
      student.strongAreas = student.strongAreas.slice(0, 10)
    } catch (error) {
      console.error('❌ Failed to update student profile:', error)
    }
  }

  /**
   * Extract biology topics from question text
   */
  private extractBiologyTopics(question: string): string[] {
    const topicKeywords = {
      'Cell Biology': ['cell', 'nucleus', 'cytoplasm', 'mitochondria', 'chloroplast', 'membrane'],
      Genetics: ['dna', 'rna', 'gene', 'chromosome', 'heredity', 'mutation', 'allele'],
      'Plant Biology': ['photosynthesis', 'plant', 'leaf', 'root', 'stem', 'flower', 'chlorophyll'],
      'Human Biology': ['human', 'heart', 'brain', 'blood', 'organ', 'system', 'anatomy'],
      'Animal Biology': ['animal', 'vertebrate', 'invertebrate', 'mammal', 'bird', 'fish'],
      Ecology: ['ecosystem', 'environment', 'biodiversity', 'food chain', 'habitat'],
      Evolution: ['evolution', 'natural selection', 'adaptation', 'species', 'darwin'],
      Reproduction: ['reproduction', 'fertilization', 'gamete', 'embryo', 'development'],
      Physiology: ['respiration', 'circulation', 'digestion', 'excretion', 'nervous system'],
      Microbiology: ['bacteria', 'virus', 'microorganism', 'pathogen', 'immunity'],
    }

    const lowerQuestion = question.toLowerCase()
    const detectedTopics: string[] = []

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        detectedTopics.push(topic)
      }
    }

    return detectedTopics
  }

  /**
   * Detect language from question text
   */
  private detectLanguage(question: string): 'english' | 'hindi' | 'hinglish' | null {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /[a-zA-Z]/

    const hasHindi = hindiPattern.test(question)
    const hasEnglish = englishPattern.test(question)

    if (hasHindi && hasEnglish) {
      return 'hinglish'
    } else if (hasHindi) {
      return 'hindi'
    } else if (hasEnglish) {
      return 'english'
    }

    return null
  }

  /**
   * Get student analytics
   */
  async getStudentAnalytics(phoneNumber: string): Promise<{
    profile: StudentProfile
    weeklyActivity: number[]
    topTopics: Array<{ topic: string; count: number }>
    averageQuestionsPerDay: number
    streakDays: number
  }> {
    const student = await this.getOrCreateStudent(phoneNumber)

    // Calculate weekly activity (last 7 days)
    const weeklyActivity = this.calculateWeeklyActivity(student.conversationHistory)

    // Get top studied topics
    const topTopics = this.getTopStudiedTopics(student.conversationHistory)

    // Calculate average questions per day
    const daysSinceJoin = Math.max(
      1,
      Math.floor((Date.now() - new Date(student.joinDate).getTime()) / (1000 * 60 * 60 * 24))
    )
    const averageQuestionsPerDay = student.totalQuestions / daysSinceJoin

    // Calculate streak (consecutive days with questions)
    const streakDays = this.calculateStudyStreak(student.conversationHistory)

    return {
      profile: student,
      weeklyActivity,
      topTopics,
      averageQuestionsPerDay,
      streakDays,
    }
  }

  private calculateWeeklyActivity(history: StudentInteraction[]): number[] {
    const last7Days = Array(7).fill(0)
    const today = new Date()

    for (const interaction of history) {
      const interactionDate = new Date(interaction.timestamp)
      const daysAgo = Math.floor(
        (today.getTime() - interactionDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysAgo >= 0 && daysAgo < 7) {
        last7Days[6 - daysAgo]++
      }
    }

    return last7Days
  }

  private getTopStudiedTopics(
    history: StudentInteraction[]
  ): Array<{ topic: string; count: number }> {
    const topicCounts: Map<string, number> = new Map()

    for (const interaction of history) {
      const topics = this.extractBiologyTopics(interaction.question)
      for (const topic of topics) {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
      }
    }

    return Array.from(topicCounts.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  private calculateStudyStreak(history: StudentInteraction[]): number {
    if (history.length === 0) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const currentDate = new Date(today)
    let streak = 0

    while (streak < 365) {
      // Max 365 day streak to prevent infinite loops
      const dateStr = currentDate.toISOString().split('T')[0]
      const hasQuestionThisDay = history.some((interaction) => {
        const interactionDate = new Date(interaction.timestamp).toISOString().split('T')[0]
        return interactionDate === dateStr
      })

      if (hasQuestionThisDay) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  /**
   * Save student data to persistent storage
   */
  private async saveStudentData(phoneNumber: string, student: StudentProfile): Promise<void> {
    try {
      // In a real implementation, this would save to a database
      // For now, we'll use in-memory storage with periodic backups
      console.log(`💾 Saved data for student ${phoneNumber}`)
    } catch (error) {
      console.error('❌ Failed to save student data:', error)
    }
  }

  /**
   * Load student data from persistent storage
   */
  private async loadStudentData(): Promise<void> {
    try {
      // In a real implementation, this would load from a database
      console.log('📂 Loaded student data from storage')
    } catch (error) {
      console.error('❌ Failed to load student data:', error)
    }
  }

  /**
   * Upgrade student to premium (unlimited questions)
   */
  async upgradeStudentToPremium(phoneNumber: string): Promise<void> {
    const student = await this.getOrCreateStudent(phoneNumber)
    student.subscriptionType = 'premium'
    student.dailyLimit = 999 // Effectively unlimited

    await this.saveStudentData(phoneNumber, student)
    console.log(`⭐ Upgraded ${student.name} to premium subscription`)
  }

  /**
   * Get students who need engagement (haven't asked questions recently)
   */
  async getInactiveStudents(daysSinceLastQuestion: number = 3): Promise<StudentProfile[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysSinceLastQuestion)

    const inactiveStudents: StudentProfile[] = []

    for (const student of this.students.values()) {
      if (student.lastQuestionTime) {
        const lastQuestionDate = new Date(student.lastQuestionTime)
        if (lastQuestionDate < cutoffDate) {
          inactiveStudents.push(student)
        }
      }
    }

    return inactiveStudents
  }

  /**
   * Generate personalized study recommendations
   */
  async getStudyRecommendations(phoneNumber: string): Promise<{
    recommendedTopics: string[]
    focusAreas: string[]
    motivationalMessage: string
  }> {
    const analytics = await this.getStudentAnalytics(phoneNumber)
    const { profile, topTopics } = analytics

    // Recommend topics they haven't studied much
    const allBiologyTopics = [
      'Cell Biology',
      'Genetics',
      'Plant Biology',
      'Human Biology',
      'Animal Biology',
      'Ecology',
      'Evolution',
      'Reproduction',
      'Physiology',
      'Microbiology',
    ]

    const studiedTopics = topTopics.map((t) => t.topic)
    const recommendedTopics = allBiologyTopics
      .filter((topic) => !studiedTopics.includes(topic))
      .slice(0, 3)

    // Focus on weak areas
    const focusAreas = profile.weakAreas.slice(0, 3)

    // Generate motivational message
    const totalQuestions = profile.totalQuestions
    let motivationalMessage = `🎯 Great progress, ${profile.name}! You've asked ${totalQuestions} questions so far. `

    if (analytics.streakDays > 0) {
      motivationalMessage += `🔥 You're on a ${analytics.streakDays}-day study streak! `
    }

    if (totalQuestions < 10) {
      motivationalMessage += 'Keep asking questions to build your NEET Biology foundation! 📚'
    } else if (totalQuestions < 50) {
      motivationalMessage += "You're building good study habits. Keep it up! 💪"
    } else {
      motivationalMessage += "You're a dedicated NEET aspirant! Your hard work will pay off! 🌟"
    }

    return {
      recommendedTopics,
      focusAreas,
      motivationalMessage,
    }
  }
}
