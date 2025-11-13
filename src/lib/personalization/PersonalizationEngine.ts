// Comprehensive Personalization Engine for Course Recommendations
// Analyzes student profile and generates personalized course suggestions with match percentages

export interface StudentProfile {
  // Basic Information
  currentClass: '9th' | '10th' | '11th' | '12th' | 'Dropper'
  targetExam: 'NEET' | 'AIIMS' | 'JIPMER' | 'StateNEET' | 'Multiple'

  // Academic Performance
  academicPerformance: {
    overallPercentage?: number // Current/Previous class percentage
    biologyScore?: number // Biology specific score (0-100)
    previousNEETScore?: number // If dropper, previous NEET score
    consistentPerformer: boolean // Consistent vs fluctuating performance
    improvementTrend: 'improving' | 'stable' | 'declining'
  }

  // Learning Style Assessment
  learningStyle: {
    primary: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    secondary?: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    preferredPace: 'fast' | 'moderate' | 'slow'
    attentionSpan: 'short' | 'medium' | 'long' // <30min, 30-60min, >60min
    interactionPreference: 'independent' | 'collaborative' | 'guided'
  }

  // Time Constraints
  timeAvailability: {
    weeklyStudyHours: number // Total hours available per week
    dailySessionPreference: number // Preferred hours per day
    weekendAvailability: boolean
    flexibleSchedule: boolean
    peakPerformanceTime: 'morning' | 'afternoon' | 'evening' | 'night'
    examTimeline: number // Months until target exam
  }

  // Geographic & Delivery Preferences
  location: {
    city: string
    state: string
    pincode?: string
    isMetroCity: boolean
    internetQuality: 'excellent' | 'good' | 'average' | 'poor'
    deliveryPreference: 'online' | 'offline' | 'hybrid' | 'flexible'
    travelConstraints?: string // Any travel limitations
  }

  // Previous Coaching Experience
  coachingHistory: {
    hasPreviousExperience: boolean
    previousInstitutes?: string[]
    satisfactionLevel?: 'very-satisfied' | 'satisfied' | 'neutral' | 'dissatisfied'
    reasonForChange?: string
    preferredTeachingStyle: 'traditional' | 'modern' | 'mixed'
    batchSizePreference: 'small' | 'medium' | 'large' | 'no-preference'
  }

  // Biology Specific Assessment
  biologyWeakAreas: {
    botany: {
      morphology: 'weak' | 'average' | 'strong'
      anatomy: 'weak' | 'average' | 'strong'
      physiology: 'weak' | 'average' | 'strong'
      reproduction: 'weak' | 'average' | 'strong'
      ecology: 'weak' | 'average' | 'strong'
    }
    zoology: {
      humanPhysiology: 'weak' | 'average' | 'strong'
      animalKingdom: 'weak' | 'average' | 'strong'
      evolution: 'weak' | 'average' | 'strong'
      animalBehavior: 'weak' | 'average' | 'strong'
    }
    cellBiology: {
      cellStructure: 'weak' | 'average' | 'strong'
      biomolecules: 'weak' | 'average' | 'strong'
      genetics: 'weak' | 'average' | 'strong'
      molecularBiology: 'weak' | 'average' | 'strong'
    }
    generalTopics: {
      biotechnology: 'weak' | 'average' | 'strong'
      environmentalBiology: 'weak' | 'average' | 'strong'
      practicalBiology: 'weak' | 'average' | 'strong'
    }
  }

  // Additional Preferences
  preferences: {
    budget: {
      range: 'budget' | 'standard' | 'premium'
      maxAmount?: number
    }
    supportNeeds: {
      parentalInvolvement: boolean
      doubtClearingImportance: 'low' | 'medium' | 'high'
      mentorshipNeeds: 'low' | 'medium' | 'high'
      careerGuidance: boolean
    }
    motivationFactors: string[] // What motivates the student
  }
}

export interface CourseRecommendation {
  courseId: string
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  matchPercentage: number
  confidenceLevel: 'high' | 'medium' | 'low'

  matchFactors: {
    academicFit: number // 0-100
    learningStyleFit: number // 0-100
    timeConstraintsFit: number // 0-100
    deliveryPreferenceFit: number // 0-100
    experienceAlignment: number // 0-100
    contentRelevance: number // 0-100
    budgetFit: number // 0-100
  }

  recommendations: {
    primary: string // Main recommendation reason
    strengths: string[] // Why this course fits well
    considerations: string[] // Things to consider
    personalizedFeatures: string[] // Features most relevant to this student
  }

  predictedOutcomes: {
    successProbability: number // 0-100
    expectedImprovement: number // Expected score improvement
    timeToTarget: number // Months to achieve target
    riskFactors: string[] // Potential challenges
  }
}

// Course database with detailed information
interface CourseData {
  id: string
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  name: string

  characteristics: {
    batchSize: number
    weeklyHours: number
    teachingStyle: 'traditional' | 'modern' | 'mixed'
    interactionLevel: 'high' | 'medium' | 'low'
    pace: 'fast' | 'moderate' | 'slow'
    supportLevel: 'high' | 'medium' | 'low'
  }

  delivery: {
    format: 'online' | 'offline' | 'hybrid'
    liveClasses: number
    recordedContent: number
    practicalSessions: number
    flexibilityScore: number // 0-100
  }

  content: {
    syllabusCompletion: number // Percentage of NEET syllabus
    biologyFocus: {
      botanyWeightage: number
      zoologyWeightage: number
      cellBiologyWeightage: number
      practicalWeightage: number
    }
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
    assessmentFrequency: 'weekly' | 'biweekly' | 'monthly'
  }

  requirements: {
    minimumCommitment: number // Hours per week
    prerequisites?: string[]
    targetAudience: string[]
  }

  pricing: {
    totalFee: number
    category: 'budget' | 'standard' | 'premium'
  }

  outcomes: {
    averageImprovement: number
    successRate: number
    typicalTimeline: number // Months
  }
}

// Mock course database
const COURSE_DATABASE: CourseData[] = [
  {
    id: 'pinnacle-a',
    seriesId: 'pinnacle',
    planId: 'A',
    name: 'Pinnacle Comprehensive',
    characteristics: {
      batchSize: 12,
      weeklyHours: 18,
      teachingStyle: 'mixed',
      interactionLevel: 'high',
      pace: 'fast',
      supportLevel: 'high',
    },
    delivery: {
      format: 'hybrid',
      liveClasses: 300,
      recordedContent: 500,
      practicalSessions: 50,
      flexibilityScore: 85,
    },
    content: {
      syllabusCompletion: 100,
      biologyFocus: {
        botanyWeightage: 50,
        zoologyWeightage: 40,
        cellBiologyWeightage: 8,
        practicalWeightage: 2,
      },
      difficultyLevel: 'advanced',
      assessmentFrequency: 'weekly',
    },
    requirements: {
      minimumCommitment: 15,
      prerequisites: ['Above 85% in previous class'],
      targetAudience: ['High achievers', 'AIIMS aspirants', 'Top rank seekers'],
    },
    pricing: {
      totalFee: 150000,
      category: 'premium',
    },
    outcomes: {
      averageImprovement: 45,
      successRate: 98.5,
      typicalTimeline: 24,
    },
  },
  {
    id: 'ascent-b',
    seriesId: 'ascent',
    planId: 'B',
    name: 'Ascent Focused',
    characteristics: {
      batchSize: 25,
      weeklyHours: 12,
      teachingStyle: 'modern',
      interactionLevel: 'medium',
      pace: 'moderate',
      supportLevel: 'medium',
    },
    delivery: {
      format: 'hybrid',
      liveClasses: 250,
      recordedContent: 400,
      practicalSessions: 35,
      flexibilityScore: 75,
    },
    content: {
      syllabusCompletion: 95,
      biologyFocus: {
        botanyWeightage: 45,
        zoologyWeightage: 45,
        cellBiologyWeightage: 8,
        practicalWeightage: 2,
      },
      difficultyLevel: 'intermediate',
      assessmentFrequency: 'biweekly',
    },
    requirements: {
      minimumCommitment: 10,
      targetAudience: [
        'Balanced learners',
        'Government medical aspirants',
        'Consistent performers',
      ],
    },
    pricing: {
      totalFee: 76000,
      category: 'standard',
    },
    outcomes: {
      averageImprovement: 35,
      successRate: 94.2,
      typicalTimeline: 20,
    },
  },
  {
    id: 'pursuit-c',
    seriesId: 'pursuit',
    planId: 'C',
    name: 'Pursuit Foundation',
    characteristics: {
      batchSize: 35,
      weeklyHours: 8,
      teachingStyle: 'traditional',
      interactionLevel: 'low',
      pace: 'slow',
      supportLevel: 'medium',
    },
    delivery: {
      format: 'online',
      liveClasses: 200,
      recordedContent: 300,
      practicalSessions: 25,
      flexibilityScore: 90,
    },
    content: {
      syllabusCompletion: 85,
      biologyFocus: {
        botanyWeightage: 40,
        zoologyWeightage: 40,
        cellBiologyWeightage: 15,
        practicalWeightage: 5,
      },
      difficultyLevel: 'beginner',
      assessmentFrequency: 'monthly',
    },
    requirements: {
      minimumCommitment: 6,
      targetAudience: ['Foundation builders', 'Budget conscious', 'Slow learners'],
    },
    pricing: {
      totalFee: 48000,
      category: 'budget',
    },
    outcomes: {
      averageImprovement: 25,
      successRate: 89.7,
      typicalTimeline: 18,
    },
  },
  // Add more courses as needed
]

export class PersonalizationEngine {
  private profile: StudentProfile
  private courses: CourseData[]

  constructor(profile: StudentProfile, courses: CourseData[] = COURSE_DATABASE) {
    this.profile = profile
    this.courses = courses
  }

  // Main recommendation generation method
  generateRecommendations(): CourseRecommendation[] {
    const recommendations = this.courses.map((course) => this.evaluateCourse(course))

    // Sort by match percentage (descending)
    return recommendations
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .map((rec) => ({
        ...rec,
        confidenceLevel: this.determineConfidenceLevel(rec.matchPercentage),
      }))
  }

  // Evaluate individual course fit
  private evaluateCourse(course: CourseData): CourseRecommendation {
    const matchFactors = {
      academicFit: this.calculateAcademicFit(course),
      learningStyleFit: this.calculateLearningStyleFit(course),
      timeConstraintsFit: this.calculateTimeConstraintsFit(course),
      deliveryPreferenceFit: this.calculateDeliveryPreferenceFit(course),
      experienceAlignment: this.calculateExperienceAlignment(course),
      contentRelevance: this.calculateContentRelevance(course),
      budgetFit: this.calculateBudgetFit(course),
    }

    // Weighted average calculation
    const weights = {
      academicFit: 0.2,
      learningStyleFit: 0.15,
      timeConstraintsFit: 0.15,
      deliveryPreferenceFit: 0.15,
      experienceAlignment: 0.1,
      contentRelevance: 0.15,
      budgetFit: 0.1,
    }

    const matchPercentage = Object.entries(matchFactors).reduce(
      (total, [factor, score]) => total + score * weights[factor as keyof typeof weights],
      0
    )

    return {
      courseId: course.id,
      seriesId: course.seriesId,
      planId: course.planId,
      matchPercentage: Math.round(matchPercentage),
      confidenceLevel: 'medium', // Will be updated
      matchFactors,
      recommendations: this.generateRecommendationText(course, matchFactors),
      predictedOutcomes: this.calculatePredictedOutcomes(course, matchFactors),
    }
  }

  // Academic performance fit calculation
  private calculateAcademicFit(course: CourseData): number {
    let score = 50 // Base score

    const { academicPerformance } = this.profile

    // Overall percentage alignment
    if (academicPerformance.overallPercentage !== undefined) {
      if (
        course.requirements.prerequisites?.includes('Above 85%') &&
        academicPerformance.overallPercentage >= 85
      ) {
        score += 25
      } else if (
        course.requirements.prerequisites?.includes('Above 75%') &&
        academicPerformance.overallPercentage >= 75
      ) {
        score += 20
      } else if (academicPerformance.overallPercentage >= 60) {
        score += 15
      }
    }

    // Biology specific score
    if (academicPerformance.biologyScore !== undefined) {
      if (academicPerformance.biologyScore >= 85) {
        score += course.content.difficultyLevel === 'advanced' ? 20 : 10
      } else if (academicPerformance.biologyScore >= 70) {
        score += course.content.difficultyLevel === 'intermediate' ? 20 : 15
      } else {
        score += course.content.difficultyLevel === 'beginner' ? 20 : 5
      }
    }

    // Improvement trend consideration
    switch (academicPerformance.improvementTrend) {
      case 'improving':
        score += course.characteristics.pace === 'fast' ? 15 : 10
        break
      case 'stable':
        score += course.characteristics.pace === 'moderate' ? 15 : 8
        break
      case 'declining':
        score += course.characteristics.supportLevel === 'high' ? 15 : 5
        break
    }

    // Previous NEET score (for droppers)
    if (this.profile.currentClass === 'Dropper' && academicPerformance.previousNEETScore) {
      if (academicPerformance.previousNEETScore >= 500) {
        score += course.seriesId === 'pinnacle' ? 15 : 5
      } else if (academicPerformance.previousNEETScore >= 400) {
        score += course.seriesId === 'ascent' ? 15 : 8
      } else {
        score += course.seriesId === 'pursuit' ? 15 : 3
      }
    }

    return Math.min(100, Math.max(0, score))
  }

  // Learning style fit calculation
  private calculateLearningStyleFit(course: CourseData): number {
    let score = 40 // Base score

    const { learningStyle } = this.profile

    // Primary learning style alignment
    switch (learningStyle.primary) {
      case 'visual':
        score += course.delivery.recordedContent > 300 ? 20 : 10
        score += (course.content.biologyFocus.practicalWeightage || 0) > 3 ? 10 : 5
        break
      case 'auditory':
        score += course.delivery.liveClasses > 200 ? 20 : 10
        score += course.characteristics.interactionLevel === 'high' ? 15 : 5
        break
      case 'kinesthetic':
        score += course.delivery.practicalSessions > 30 ? 25 : 10
        score += (course.content.biologyFocus.practicalWeightage || 0) > 5 ? 15 : 5
        break
      case 'reading':
        score += course.delivery.recordedContent > 250 ? 15 : 10
        score += course.characteristics.pace === 'moderate' ? 10 : 5
        break
    }

    // Pace preference alignment
    if (learningStyle.preferredPace === course.characteristics.pace) {
      score += 15
    } else if (
      (learningStyle.preferredPace === 'moderate' && course.characteristics.pace === 'fast') ||
      (learningStyle.preferredPace === 'fast' && course.characteristics.pace === 'moderate')
    ) {
      score += 10
    }

    // Attention span consideration
    switch (learningStyle.attentionSpan) {
      case 'short':
        score += course.delivery.flexibilityScore > 80 ? 15 : 5
        break
      case 'medium':
        score += 10
        break
      case 'long':
        score += course.characteristics.weeklyHours > 12 ? 15 : 10
        break
    }

    // Interaction preference
    switch (learningStyle.interactionPreference) {
      case 'independent':
        score += course.delivery.format === 'online' ? 15 : 5
        break
      case 'collaborative':
        score +=
          course.characteristics.batchSize <= 30 &&
          course.characteristics.interactionLevel === 'high'
            ? 20
            : 8
        break
      case 'guided':
        score += course.characteristics.supportLevel === 'high' ? 20 : 10
        break
    }

    return Math.min(100, Math.max(0, score))
  }

  // Time constraints fit calculation
  private calculateTimeConstraintsFit(course: CourseData): number {
    let score = 30 // Base score

    const { timeAvailability } = this.profile

    // Weekly hours alignment
    const hoursDifference = Math.abs(
      course.characteristics.weeklyHours - timeAvailability.weeklyStudyHours
    )
    if (hoursDifference === 0) {
      score += 30
    } else if (hoursDifference <= 2) {
      score += 25
    } else if (hoursDifference <= 5) {
      score += 15
    } else if (hoursDifference <= 8) {
      score += 5
    }

    // Flexibility needs
    if (!timeAvailability.flexibleSchedule) {
      score += course.delivery.flexibilityScore > 70 ? 20 : -10
    }

    // Weekend availability
    if (!timeAvailability.weekendAvailability) {
      score += course.delivery.format === 'online' ? 10 : -5
    }

    // Exam timeline pressure
    const timelinePressure = 24 / timeAvailability.examTimeline // Higher means more pressure
    if (timelinePressure > 2) {
      score += course.characteristics.pace === 'fast' ? 15 : -5
    } else if (timelinePressure < 1) {
      score += course.characteristics.pace === 'slow' ? 15 : 5
    }

    // Course timeline fit
    if (course.outcomes.typicalTimeline <= timeAvailability.examTimeline) {
      score += 10
    } else {
      score -= Math.min(20, (course.outcomes.typicalTimeline - timeAvailability.examTimeline) * 2)
    }

    return Math.min(100, Math.max(0, score))
  }

  // Delivery preference fit calculation
  private calculateDeliveryPreferenceFit(course: CourseData): number {
    let score = 20 // Base score

    const { location } = this.profile

    // Primary delivery preference
    switch (location.deliveryPreference) {
      case 'online':
        score +=
          course.delivery.format === 'online' ? 40 : course.delivery.format === 'hybrid' ? 25 : 0
        break
      case 'offline':
        score +=
          course.delivery.format === 'offline' ? 40 : course.delivery.format === 'hybrid' ? 25 : 10
        break
      case 'hybrid':
        score += course.delivery.format === 'hybrid' ? 40 : 20
        break
      case 'flexible':
        score += course.delivery.flexibilityScore
        break
    }

    // Internet quality consideration
    if (location.deliveryPreference !== 'offline') {
      switch (location.internetQuality) {
        case 'excellent':
          score += course.delivery.liveClasses > 200 ? 20 : 15
          break
        case 'good':
          score += 15
          break
        case 'average':
          score += course.delivery.recordedContent > course.delivery.liveClasses ? 10 : 5
          break
        case 'poor':
          score += course.delivery.format === 'online' ? -20 : 0
          break
      }
    }

    // Location-based adjustments
    if (!location.isMetroCity && course.delivery.format === 'offline') {
      score -= 15 // Offline might not be available
    }

    return Math.min(100, Math.max(0, score))
  }

  // Previous experience alignment calculation
  private calculateExperienceAlignment(course: CourseData): number {
    let score = 50 // Base score

    const { coachingHistory } = this.profile

    if (!coachingHistory.hasPreviousExperience) {
      // First-time students
      score += course.characteristics.supportLevel === 'high' ? 15 : 5
      score += course.content.difficultyLevel === 'beginner' ? 10 : 0
    } else {
      // Students with previous experience
      if (coachingHistory.satisfactionLevel) {
        switch (coachingHistory.satisfactionLevel) {
          case 'very-satisfied':
            score += 20 // Any course should work
            break
          case 'satisfied':
            score += 15
            break
          case 'neutral':
            score += course.characteristics.teachingStyle === 'modern' ? 15 : 5
            break
          case 'dissatisfied':
            score += course.characteristics.teachingStyle !== 'traditional' ? 20 : 0
            break
        }
      }

      // Teaching style preference
      if (coachingHistory.preferredTeachingStyle === course.characteristics.teachingStyle) {
        score += 15
      } else if (coachingHistory.preferredTeachingStyle === 'mixed') {
        score += 10
      }

      // Batch size preference
      switch (coachingHistory.batchSizePreference) {
        case 'small':
          score += course.characteristics.batchSize <= 20 ? 20 : 0
          break
        case 'medium':
          score +=
            course.characteristics.batchSize <= 30 && course.characteristics.batchSize > 15
              ? 20
              : 10
          break
        case 'large':
          score += course.characteristics.batchSize > 25 ? 20 : 10
          break
        case 'no-preference':
          score += 10
          break
      }
    }

    return Math.min(100, Math.max(0, score))
  }

  // Content relevance calculation based on weak areas
  private calculateContentRelevance(course: CourseData): number {
    let score = 30 // Base score

    const { biologyWeakAreas } = this.profile

    // Calculate weak areas count
    let totalWeakAreas = 0
    let relevantContent = 0

    // Botany weak areas
    Object.values(biologyWeakAreas.botany).forEach((level) => {
      if (level === 'weak') {
        totalWeakAreas++
        relevantContent += (course.content.biologyFocus.botanyWeightage || 0) * 0.2 // 20% per weak area in botany
      }
    })

    // Zoology weak areas
    Object.values(biologyWeakAreas.zoology).forEach((level) => {
      if (level === 'weak') {
        totalWeakAreas++
        relevantContent += (course.content.biologyFocus.zoologyWeightage || 0) * 0.25 // 25% per weak area in zoology
      }
    })

    // Cell Biology weak areas
    Object.values(biologyWeakAreas.cellBiology).forEach((level) => {
      if (level === 'weak') {
        totalWeakAreas++
        relevantContent += (course.content.biologyFocus.cellBiologyWeightage || 0) * 0.25 // 25% per weak area in cell biology
      }
    })

    // General topics weak areas
    Object.values(biologyWeakAreas.generalTopics).forEach((level) => {
      if (level === 'weak') {
        totalWeakAreas++
        relevantContent += (course.content.biologyFocus.practicalWeightage || 0) * 0.3 // 30% per weak area in general
      }
    })

    // Score based on content relevance to weak areas
    if (totalWeakAreas > 0) {
      score += Math.min(50, (relevantContent / totalWeakAreas) * 2)
    } else {
      // No specific weak areas, general content coverage is good
      score += course.content.syllabusCompletion > 90 ? 30 : 20
    }

    // Difficulty level alignment
    const weakAreasPercentage = (totalWeakAreas / 15) * 100 // Assuming 15 total areas
    if (weakAreasPercentage > 50) {
      score += course.content.difficultyLevel === 'beginner' ? 20 : 5
    } else if (weakAreasPercentage > 25) {
      score += course.content.difficultyLevel === 'intermediate' ? 20 : 10
    } else {
      score += course.content.difficultyLevel === 'advanced' ? 20 : 15
    }

    return Math.min(100, Math.max(0, score))
  }

  // Budget fit calculation
  private calculateBudgetFit(course: CourseData): number {
    let score = 50 // Base score

    const { budget } = this.profile.preferences

    // Category alignment
    if (budget.range === course.pricing.category) {
      score += 30
    } else if (
      (budget.range === 'standard' && course.pricing.category === 'budget') ||
      (budget.range === 'premium' && course.pricing.category === 'standard')
    ) {
      score += 20
    }

    // Specific amount check
    if (budget.maxAmount !== undefined) {
      if (course.pricing.totalFee <= budget.maxAmount) {
        score += 20
      } else {
        const overBudgetPercentage =
          ((course.pricing.totalFee - budget.maxAmount) / budget.maxAmount) * 100
        score -= Math.min(40, overBudgetPercentage)
      }
    }

    return Math.min(100, Math.max(0, score))
  }

  // Generate recommendation text
  private generateRecommendationText(course: CourseData, matchFactors: any): any {
    const strengths = []
    const considerations = []
    const personalizedFeatures = []

    // Analyze strong match factors
    Object.entries(matchFactors).forEach(([factor, score]) => {
      const numScore = Number(score)
      if (numScore >= 80) {
        switch (factor) {
          case 'academicFit':
            strengths.push('Excellent alignment with your academic performance level')
            break
          case 'learningStyleFit':
            strengths.push('Perfect match for your preferred learning style')
            personalizedFeatures.push('Customized content delivery for your learning preferences')
            break
          case 'timeConstraintsFit':
            strengths.push('Schedule perfectly matches your available study time')
            break
          case 'deliveryPreferenceFit':
            strengths.push('Delivery format aligns with your location and preferences')
            break
          case 'contentRelevance':
            strengths.push('Content specifically addresses your weak areas in biology')
            personalizedFeatures.push('Focused attention on your challenging topics')
            break
        }
      } else if (numScore < 60) {
        switch (factor) {
          case 'academicFit':
            considerations.push('Course difficulty may not match your current performance level')
            break
          case 'timeConstraintsFit':
            considerations.push('Time commitment may be challenging with your schedule')
            break
          case 'budgetFit':
            considerations.push('Course fee exceeds your preferred budget range')
            break
        }
      }
    })

    // Generate primary recommendation
    let primary = ''
    if (matchFactors.academicFit >= 85 && matchFactors.learningStyleFit >= 85) {
      primary = 'Highly recommended based on perfect academic and learning style alignment'
    } else if (matchFactors.contentRelevance >= 85) {
      primary = 'Strongly recommended for addressing your specific weak areas in biology'
    } else if (matchFactors.timeConstraintsFit >= 85) {
      primary = 'Good fit considering your time availability and schedule preferences'
    } else {
      primary = 'Reasonable option with some adjustments needed for optimal fit'
    }

    return {
      primary,
      strengths,
      considerations,
      personalizedFeatures,
    }
  }

  // Calculate predicted outcomes
  private calculatePredictedOutcomes(course: CourseData, matchFactors: any): any {
    const avgMatchScore =
      Object.values(matchFactors).reduce((a: number, b: unknown) => a + Number(b), 0) /
      Object.keys(matchFactors).length

    // Success probability based on match percentage and course success rate
    const successProbability = Math.min(100, (course.outcomes.successRate * avgMatchScore) / 100)

    // Expected improvement
    let expectedImprovement = course.outcomes.averageImprovement
    if (Number(matchFactors.contentRelevance) > 80) expectedImprovement *= 1.2
    if (Number(matchFactors.learningStyleFit) > 80) expectedImprovement *= 1.1
    if (Number(matchFactors.academicFit) < 60) expectedImprovement *= 0.8

    // Time to target
    let timeToTarget = course.outcomes.typicalTimeline
    if (Number(matchFactors.timeConstraintsFit) < 60) timeToTarget *= 1.2
    if (this.profile.academicPerformance.improvementTrend === 'improving') timeToTarget *= 0.9

    // Risk factors
    const riskFactors = []
    if (Number(matchFactors.budgetFit) < 60)
      riskFactors.push('Budget constraints may affect commitment')
    if (Number(matchFactors.timeConstraintsFit) < 60)
      riskFactors.push('Time management challenges possible')
    if (Number(matchFactors.academicFit) < 70)
      riskFactors.push('Academic level mismatch may slow progress')
    if (Number(matchFactors.deliveryPreferenceFit) < 60)
      riskFactors.push('Delivery format may not be optimal')

    return {
      successProbability: Math.round(successProbability),
      expectedImprovement: Math.round(expectedImprovement),
      timeToTarget: Math.round(timeToTarget),
      riskFactors,
    }
  }

  // Determine confidence level
  private determineConfidenceLevel(matchPercentage: number): 'high' | 'medium' | 'low' {
    if (matchPercentage >= 85) return 'high'
    if (matchPercentage >= 70) return 'medium'
    return 'low'
  }

  // Get top recommendation with detailed explanation
  getTopRecommendation(): CourseRecommendation | null {
    const recommendations = this.generateRecommendations()
    return recommendations.length > 0 ? recommendations[0] : null
  }

  // Get recommendations by confidence level
  getRecommendationsByConfidence(level: 'high' | 'medium' | 'low'): CourseRecommendation[] {
    return this.generateRecommendations().filter((rec) => rec.confidenceLevel === level)
  }

  // Get alternative recommendations (exclude top pick)
  getAlternativeRecommendations(count: number = 2): CourseRecommendation[] {
    const recommendations = this.generateRecommendations()
    return recommendations.slice(1, count + 1)
  }
}

// Utility functions for profile analysis

export function analyzeStudentProfile(profile: StudentProfile): {
  profileCompleteness: number
  missingDataPoints: string[]
  strengthAreas: string[]
  recommendationReadiness: 'ready' | 'partial' | 'insufficient'
} {
  let completeness = 0
  const missingDataPoints = []
  const strengthAreas = []

  // Check each section for completeness
  const sections = [
    { key: 'academicPerformance', weight: 20 },
    { key: 'learningStyle', weight: 15 },
    { key: 'timeAvailability', weight: 15 },
    { key: 'location', weight: 15 },
    { key: 'coachingHistory', weight: 10 },
    { key: 'biologyWeakAreas', weight: 15 },
    { key: 'preferences', weight: 10 },
  ]

  sections.forEach((section) => {
    const sectionData = profile[section.key as keyof StudentProfile] as any
    if (sectionData && typeof sectionData === 'object') {
      const filledFields = Object.values(sectionData).filter(
        (value) => value !== undefined && value !== null && value !== ''
      ).length
      const totalFields = Object.keys(sectionData).length
      const sectionCompleteness = (filledFields / totalFields) * section.weight

      completeness += sectionCompleteness

      if (sectionCompleteness >= section.weight * 0.8) {
        strengthAreas.push(section.key)
      } else if (sectionCompleteness < section.weight * 0.3) {
        missingDataPoints.push(section.key)
      }
    } else if (!sectionData) {
      missingDataPoints.push(section.key)
    }
  })

  let recommendationReadiness: 'ready' | 'partial' | 'insufficient' = 'insufficient'
  if (completeness >= 80) recommendationReadiness = 'ready'
  else if (completeness >= 50) recommendationReadiness = 'partial'

  return {
    profileCompleteness: Math.round(completeness),
    missingDataPoints,
    strengthAreas,
    recommendationReadiness,
  }
}

export function generateQuickProfile(basicInfo: {
  currentClass: string
  overallPercentage?: number
  weeklyHours: number
  budget: string
  deliveryPreference: string
}): StudentProfile {
  return {
    currentClass: basicInfo.currentClass as any,
    targetExam: 'NEET',
    academicPerformance: {
      overallPercentage: basicInfo.overallPercentage,
      consistentPerformer: true,
      improvementTrend: 'stable',
    },
    learningStyle: {
      primary: 'visual',
      preferredPace: 'moderate',
      attentionSpan: 'medium',
      interactionPreference: 'collaborative',
    },
    timeAvailability: {
      weeklyStudyHours: basicInfo.weeklyHours,
      dailySessionPreference: Math.round(basicInfo.weeklyHours / 7),
      weekendAvailability: true,
      flexibleSchedule: true,
      peakPerformanceTime: 'evening',
      examTimeline: 12,
    },
    location: {
      city: 'Unknown',
      state: 'Unknown',
      isMetroCity: false,
      internetQuality: 'good',
      deliveryPreference: basicInfo.deliveryPreference as any,
    },
    coachingHistory: {
      hasPreviousExperience: false,
      preferredTeachingStyle: 'mixed',
      batchSizePreference: 'medium',
    },
    biologyWeakAreas: {
      botany: {
        morphology: 'average',
        anatomy: 'average',
        physiology: 'average',
        reproduction: 'average',
        ecology: 'average',
      },
      zoology: {
        humanPhysiology: 'average',
        animalKingdom: 'average',
        evolution: 'average',
        animalBehavior: 'average',
      },
      cellBiology: {
        cellStructure: 'average',
        biomolecules: 'average',
        genetics: 'average',
        molecularBiology: 'average',
      },
      generalTopics: {
        biotechnology: 'average',
        environmentalBiology: 'average',
        practicalBiology: 'average',
      },
    },
    preferences: {
      budget: {
        range: basicInfo.budget as any,
      },
      supportNeeds: {
        parentalInvolvement: true,
        doubtClearingImportance: 'medium',
        mentorshipNeeds: 'medium',
        careerGuidance: true,
      },
      motivationFactors: ['Career goals', 'Academic achievement'],
    },
  }
}
