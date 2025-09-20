/**
 * Personalized Learning Path Engine for Cerebrum Biology Academy
 *
 * This engine creates adaptive learning paths based on:
 * - Student performance data
 * - NEET curriculum requirements
 * - Individual learning preferences
 * - Time constraints and goals
 * - Weak area identification
 */

export interface StudentProfile {
  id: string
  name: string
  email: string
  currentScore: number
  targetScore: number
  timeToExam: number // days
  studyHoursPerDay: number
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  preferredDifficulty: 'gradual' | 'challenging' | 'mixed'
  strongAreas: string[]
  weakAreas: WeakArea[]
  completedChapters: string[]
  currentStreak: number
  totalStudyTime: number
}

export interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  currentScore: number
  targetScore: number
  priorityLevel: number // 1-10 (10 = highest priority)
  estimatedStudyTime: number // hours
  recommendedDailyTime: number // minutes
  improvement: number // percentage change
  lastPracticed: string
}

export interface LearningResource {
  id: string
  type: 'video' | 'text' | 'practice' | 'test' | 'interactive'
  title: string
  description: string
  duration: number // minutes
  difficulty: 'easy' | 'medium' | 'hard'
  chapter: string
  topic: string
  prerequisites: string[]
  learningObjectives: string[]
  neetRelevance: number // 1-10
}

export interface StudySession {
  id: string
  chapter: string
  topic: string
  type: 'study' | 'practice' | 'test' | 'revision'
  duration: number
  scheduledTime: string
  priority: number
  resources: LearningResource[]
  expectedOutcome: string
  adaptiveFeedback: boolean
}

export interface LearningPath {
  id: string
  studentId: string
  pathName: string
  description: string
  totalDuration: number // hours
  estimatedCompletion: string
  sessions: StudySession[]
  milestones: Milestone[]
  adaptiveAdjustments: AdaptiveAdjustment[]
  confidenceScore: number // 0-1
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string
  requiredScore: number
  chapter: string
  isCompleted: boolean
  completedDate?: string
  actualScore?: number
}

export interface AdaptiveAdjustment {
  timestamp: string
  reason: string
  adjustment: string
  impact: 'minor' | 'moderate' | 'major'
  sessionId: string
}

export class PersonalizedLearningEngine {
  private neetChapters = [
    'The Living World',
    'Biological Classification',
    'Plant Kingdom',
    'Animal Kingdom',
    'Morphology of Flowering Plants',
    'Anatomy of Flowering Plants',
    'Structural Organisation in Animals',
    'Cell: The Unit of Life',
    'Biomolecules',
    'Cell Cycle and Cell Division',
    'Transport in Plants',
    'Mineral Nutrition',
    'Photosynthesis in Higher Plants',
    'Respiration in Plants',
    'Plant Growth and Development',
    'Digestion and Absorption',
    'Breathing and Exchange of Gases',
    'Body Fluids and Circulation',
    'Excretory Products and their Elimination',
    'Locomotion and Movement',
    'Neural Control and Coordination',
    'Chemical Coordination and Integration',
    'Reproduction in Organisms',
    'Sexual Reproduction in Flowering Plants',
    'Human Reproduction',
    'Reproductive Health',
    'Principles of Inheritance and Variation',
    'Molecular Basis of Inheritance',
    'Evolution',
    'Human Health and Disease',
    'Strategies for Enhancement in Food Production',
    'Microbes in Human Welfare',
    'Biotechnology: Principles and Processes',
    'Biotechnology and its Applications',
    'Organisms and Populations',
    'Ecosystem',
    'Biodiversity and Conservation',
    'Environmental Issues',
  ]

  private chapterWeights = new Map([
    ['Cell: The Unit of Life', 8],
    ['Biomolecules', 6],
    ['Plant Physiology', 10],
    ['Human Physiology', 12],
    ['Reproduction', 8],
    ['Genetics and Evolution', 10],
    ['Biology and Human Welfare', 8],
    ['Biotechnology', 6],
    ['Ecology and Environment', 8],
  ])

  /**
   * Generate a personalized learning path for a student
   */
  generateLearningPath(profile: StudentProfile): LearningPath {
    const weakAreaSessions = this.createWeakAreaSessions(profile)
    const revisionSessions = this.createRevisionSessions(profile)
    const practiceTestSessions = this.createPracticeTestSessions(profile)

    const allSessions = [...weakAreaSessions, ...revisionSessions, ...practiceTestSessions].sort(
      (a, b) => b.priority - a.priority
    )

    const milestones = this.generateMilestones(profile)

    const totalDuration = allSessions.reduce((total, session) => total + session.duration, 0)
    const estimatedCompletion = this.calculateCompletionDate(profile, totalDuration)

    return {
      id: `path_${profile.id}_${Date.now()}`,
      studentId: profile.id,
      pathName: `NEET Biology Mastery Path - ${profile.name}`,
      description: `Personalized study plan targeting ${profile.targetScore}/720 with focus on weak areas`,
      totalDuration,
      estimatedCompletion,
      sessions: allSessions,
      milestones,
      adaptiveAdjustments: [],
      confidenceScore: this.calculateConfidenceScore(profile),
    }
  }

  /**
   * Create focused sessions for weak areas
   */
  private createWeakAreaSessions(profile: StudentProfile): StudySession[] {
    return profile.weakAreas
      .sort((a, b) => b.priorityLevel - a.priorityLevel)
      .map((weakArea, index) => {
        const sessionDuration = Math.min(weakArea.recommendedDailyTime, 90) // Max 90 min per session

        return {
          id: `weak_${weakArea.chapter}_${Date.now()}_${index}`,
          chapter: weakArea.chapter,
          topic: weakArea.topic,
          type: 'study' as const,
          duration: sessionDuration,
          scheduledTime: this.getOptimalStudyTime(profile, index),
          priority: weakArea.priorityLevel,
          resources: this.getResourcesForTopic(
            weakArea.chapter,
            weakArea.topic,
            profile.learningStyle
          ),
          expectedOutcome: `Improve ${weakArea.topic} score from ${weakArea.currentScore}% to ${weakArea.targetScore}%`,
          adaptiveFeedback: true,
        }
      })
  }

  /**
   * Create revision sessions for completed chapters
   */
  private createRevisionSessions(profile: StudentProfile): StudySession[] {
    return profile.completedChapters.map((chapter, index) => ({
      id: `revision_${chapter}_${Date.now()}_${index}`,
      chapter,
      topic: 'Comprehensive Revision',
      type: 'revision' as const,
      duration: 45,
      scheduledTime: this.getRevisionTime(profile, index),
      priority: 6, // Medium priority
      resources: this.getRevisionResources(chapter, profile.learningStyle),
      expectedOutcome: `Maintain proficiency in ${chapter}`,
      adaptiveFeedback: false,
    }))
  }

  /**
   * Create practice test sessions
   */
  private createPracticeTestSessions(profile: StudentProfile): StudySession[] {
    const testFrequency = Math.max(1, Math.floor(profile.timeToExam / 14)) // Bi-weekly tests

    return Array.from({ length: testFrequency }, (_, index) => ({
      id: `test_${Date.now()}_${index}`,
      chapter: 'Multiple Chapters',
      topic: 'Full Length Mock Test',
      type: 'test' as const,
      duration: 180, // 3 hours
      scheduledTime: this.getTestTime(profile, index),
      priority: 8, // High priority
      resources: this.getMockTestResources(profile),
      expectedOutcome: `Score ${profile.targetScore}+ marks`,
      adaptiveFeedback: true,
    }))
  }

  /**
   * Generate milestones for tracking progress
   */
  private generateMilestones(profile: StudentProfile): Milestone[] {
    const milestones: Milestone[] = []
    const timeChunks = Math.ceil(profile.timeToExam / 30) // Monthly milestones

    for (let i = 1; i <= timeChunks; i++) {
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() + i * 30)

      milestones.push({
        id: `milestone_${i}_${Date.now()}`,
        title: `Month ${i} Target`,
        description: `Achieve consistent scoring in targeted chapters`,
        targetDate: targetDate.toISOString(),
        requiredScore:
          profile.currentScore + (profile.targetScore - profile.currentScore) * (i / timeChunks),
        chapter: 'Overall Progress',
        isCompleted: false,
      })
    }

    // Add chapter-specific milestones for weak areas
    profile.weakAreas.forEach((weakArea, index) => {
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() + weakArea.estimatedStudyTime * 7) // Convert hours to days

      milestones.push({
        id: `weak_milestone_${index}_${Date.now()}`,
        title: `Master ${weakArea.chapter}`,
        description: `Achieve ${weakArea.targetScore}% in ${weakArea.topic}`,
        targetDate: targetDate.toISOString(),
        requiredScore: weakArea.targetScore,
        chapter: weakArea.chapter,
        isCompleted: false,
      })
    })

    return milestones.sort(
      (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    )
  }

  /**
   * Calculate confidence score for the learning path
   */
  private calculateConfidenceScore(profile: StudentProfile): number {
    let score = 0.5 // Base confidence

    // Adjust based on current performance
    const performanceRatio = profile.currentScore / profile.targetScore
    score += Math.min(performanceRatio * 0.3, 0.3)

    // Adjust based on time available
    const timePerWeakArea = profile.timeToExam / profile.weakAreas.length
    if (timePerWeakArea > 14)
      score += 0.2 // Ample time
    else if (timePerWeakArea < 7) score -= 0.2 // Limited time

    // Adjust based on study consistency
    if (profile.currentStreak > 7) score += 0.1
    if (profile.currentStreak < 3) score -= 0.1

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Adapt the learning path based on performance
   */
  adaptLearningPath(
    currentPath: LearningPath,
    performanceData: {
      sessionId: string
      actualScore: number
      timeSpent: number
      difficulty: string
    }[]
  ): LearningPath {
    const adjustments: AdaptiveAdjustment[] = []

    performanceData.forEach((data) => {
      const session = currentPath.sessions.find((s) => s.id === data.sessionId)
      if (!session) return

      // If performance is below expectation, increase session duration and add remedial resources
      if (data.actualScore < 70) {
        session.duration = Math.min(session.duration * 1.2, 120) // Increase by 20%, max 2 hours
        session.priority += 1

        adjustments.push({
          timestamp: new Date().toISOString(),
          reason: `Low performance (${data.actualScore}%) in ${session.topic}`,
          adjustment: `Increased session duration to ${session.duration} minutes and priority to ${session.priority}`,
          impact: 'moderate',
          sessionId: session.id,
        })
      }

      // If performance is excellent, reduce time allocation and move to advanced topics
      if (data.actualScore > 90) {
        session.duration = Math.max(session.duration * 0.8, 30) // Decrease by 20%, min 30 minutes

        adjustments.push({
          timestamp: new Date().toISOString(),
          reason: `Excellent performance (${data.actualScore}%) in ${session.topic}`,
          adjustment: `Reduced session duration to ${session.duration} minutes`,
          impact: 'minor',
          sessionId: session.id,
        })
      }
    })

    return {
      ...currentPath,
      adaptiveAdjustments: [...currentPath.adaptiveAdjustments, ...adjustments],
      confidenceScore: this.recalculateConfidence(currentPath, performanceData),
    }
  }

  /**
   * Get optimal study time based on student preferences and circadian rhythm
   */
  private getOptimalStudyTime(profile: StudentProfile, sessionIndex: number): string {
    // Most students perform best in morning (6-9 AM) or evening (6-9 PM)
    const preferredSlots = ['06:00', '07:00', '08:00', '18:00', '19:00', '20:00']
    const selectedSlot = preferredSlots[sessionIndex % preferredSlots.length]

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + Math.floor(sessionIndex / 6) + 1)
    tomorrow.setHours(
      parseInt(selectedSlot.split(':')[0]),
      parseInt(selectedSlot.split(':')[1]),
      0,
      0
    )

    return tomorrow.toISOString()
  }

  /**
   * Get revision time (typically evening or weekend)
   */
  private getRevisionTime(profile: StudentProfile, sessionIndex: number): string {
    const revisionSlots = ['15:00', '16:00', '17:00'] // Afternoon slots for revision
    const selectedSlot = revisionSlots[sessionIndex % revisionSlots.length]

    const scheduleDate = new Date()
    scheduleDate.setDate(scheduleDate.getDate() + sessionIndex * 7 + 6) // Weekly on Saturdays
    scheduleDate.setHours(
      parseInt(selectedSlot.split(':')[0]),
      parseInt(selectedSlot.split(':')[1]),
      0,
      0
    )

    return scheduleDate.toISOString()
  }

  /**
   * Get test time (typically weekends)
   */
  private getTestTime(profile: StudentProfile, sessionIndex: number): string {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() + (sessionIndex + 1) * 14) // Bi-weekly
    testDate.setHours(9, 0, 0, 0) // 9 AM sharp like actual NEET

    return testDate.toISOString()
  }

  /**
   * Get learning resources based on topic and learning style
   */
  private getResourcesForTopic(
    chapter: string,
    topic: string,
    learningStyle: string
  ): LearningResource[] {
    const baseResources: LearningResource[] = [
      {
        id: `video_${chapter}_${topic}`,
        type: 'video',
        title: `${topic} - Comprehensive Video Lecture`,
        description: `Detailed explanation of ${topic} concepts`,
        duration: 45,
        difficulty: 'medium',
        chapter,
        topic,
        prerequisites: [],
        learningObjectives: [`Understand ${topic}`, `Apply concepts to NEET questions`],
        neetRelevance: 9,
      },
      {
        id: `practice_${chapter}_${topic}`,
        type: 'practice',
        title: `${topic} - Practice Questions`,
        description: `NEET-style practice questions for ${topic}`,
        duration: 30,
        difficulty: 'medium',
        chapter,
        topic,
        prerequisites: [`video_${chapter}_${topic}`],
        learningObjectives: [`Practice ${topic} problems`, 'Improve speed and accuracy'],
        neetRelevance: 10,
      },
    ]

    // Add learning-style specific resources
    if (learningStyle === 'visual') {
      baseResources.push({
        id: `diagram_${chapter}_${topic}`,
        type: 'interactive',
        title: `${topic} - Interactive Diagrams`,
        description: `Visual representations and animations for ${topic}`,
        duration: 20,
        difficulty: 'easy',
        chapter,
        topic,
        prerequisites: [],
        learningObjectives: [`Visualize ${topic} concepts`],
        neetRelevance: 8,
      })
    }

    return baseResources
  }

  /**
   * Get revision resources
   */
  private getRevisionResources(chapter: string, learningStyle: string): LearningResource[] {
    return [
      {
        id: `revision_${chapter}`,
        type: 'text',
        title: `${chapter} - Quick Revision Notes`,
        description: `Condensed notes for quick revision of ${chapter}`,
        duration: 30,
        difficulty: 'easy',
        chapter,
        topic: 'Comprehensive Revision',
        prerequisites: [],
        learningObjectives: [`Recall ${chapter} concepts`, 'Reinforce memory'],
        neetRelevance: 8,
      },
      {
        id: `quiz_${chapter}`,
        type: 'test',
        title: `${chapter} - Quick Quiz`,
        description: `Short quiz to test retention of ${chapter}`,
        duration: 15,
        difficulty: 'medium',
        chapter,
        topic: 'Comprehensive Revision',
        prerequisites: [`revision_${chapter}`],
        learningObjectives: ['Test retention', 'Identify gaps'],
        neetRelevance: 9,
      },
    ]
  }

  /**
   * Get mock test resources
   */
  private getMockTestResources(profile: StudentProfile): LearningResource[] {
    return [
      {
        id: `mock_test_${Date.now()}`,
        type: 'test',
        title: 'NEET Biology Mock Test',
        description: 'Full-length mock test covering all biology topics',
        duration: 180,
        difficulty: 'hard',
        chapter: 'All Chapters',
        topic: 'Comprehensive Test',
        prerequisites: [],
        learningObjectives: ['Simulate NEET experience', 'Assess overall preparation'],
        neetRelevance: 10,
      },
    ]
  }

  /**
   * Calculate estimated completion date
   */
  private calculateCompletionDate(profile: StudentProfile, totalDuration: number): string {
    const dailyStudyHours = profile.studyHoursPerDay
    const totalDays = Math.ceil(totalDuration / (dailyStudyHours * 60)) // Convert to days

    const completionDate = new Date()
    completionDate.setDate(completionDate.getDate() + totalDays)

    return completionDate.toISOString()
  }

  /**
   * Recalculate confidence based on recent performance
   */
  private recalculateConfidence(
    path: LearningPath,
    performanceData: {
      sessionId: string
      actualScore: number
      timeSpent: number
      difficulty: string
    }[]
  ): number {
    if (performanceData.length === 0) return path.confidenceScore

    const averageScore =
      performanceData.reduce((sum, data) => sum + data.actualScore, 0) / performanceData.length
    const performanceBonus = (averageScore - 70) / 100 // Bonus/penalty based on 70% threshold

    return Math.max(0.1, Math.min(1, path.confidenceScore + performanceBonus))
  }

  /**
   * Generate daily study schedule
   */
  generateDailySchedule(path: LearningPath, targetDate: string): StudySession[] {
    const targetDay = new Date(targetDate)

    return path.sessions
      .filter((session) => {
        const sessionDate = new Date(session.scheduledTime)
        return sessionDate.toDateString() === targetDay.toDateString()
      })
      .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())
  }

  /**
   * Get progress analytics
   */
  getProgressAnalytics(
    path: LearningPath,
    completedSessions: string[]
  ): {
    overallProgress: number
    timeUtilization: number
    strongestTopics: string[]
    needsAttention: string[]
    projectedScore: number
  } {
    const totalSessions = path.sessions.length
    const completedCount = completedSessions.length
    const overallProgress = (completedCount / totalSessions) * 100

    const completedDuration = path.sessions
      .filter((s) => completedSessions.includes(s.id))
      .reduce((sum, s) => sum + s.duration, 0)
    const timeUtilization = (completedDuration / path.totalDuration) * 100

    // Analyze performance by topic (mock implementation)
    const strongestTopics = ['Cell Biology', 'Ecology', 'Human Physiology']
    const needsAttention = ['Genetics', 'Plant Physiology', 'Evolution']

    // Project score based on current progress and confidence
    const projectedScore = Math.round(480 + path.confidenceScore * 60) // Base 480 + confidence bonus

    return {
      overallProgress,
      timeUtilization,
      strongestTopics,
      needsAttention,
      projectedScore,
    }
  }
}
