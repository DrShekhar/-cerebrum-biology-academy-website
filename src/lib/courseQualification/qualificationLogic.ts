// Smart Course Qualification Logic System
// Progressive question flow with decision tree mapping

export interface QualificationQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'range' | 'scale'
  options?: QualificationOption[]
  required: boolean
  order: number
  dependsOn?: string
  showIf?: (answers: QualificationAnswers) => boolean
}

export interface QualificationOption {
  value: string
  label: string
  description?: string
  icon?: string
  weight?: number
}

export interface QualificationAnswers {
  [questionId: string]: string | string[] | number
}

export interface CourseRecommendation {
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  matchScore: number
  reasoning: string[]
  alternativeOptions?: {
    seriesId: string
    planId: string
    reason: string
  }[]
}

// Progressive Question Flow
export const QUALIFICATION_QUESTIONS: QualificationQuestion[] = [
  // Question 1: Current Class (Foundation Filter)
  {
    id: 'current_class',
    question: 'What is your current academic class?',
    type: 'single',
    required: true,
    order: 1,
    options: [
      {
        value: '9th',
        label: 'Class 9th',
        description: 'Early foundation building phase',
        icon: '🌱',
        weight: 1,
      },
      {
        value: '10th',
        label: 'Class 10th',
        description: 'Board exam preparation with NEET foundation',
        icon: '📚',
        weight: 1,
      },
      {
        value: '11th',
        label: 'Class 11th',
        description: 'Critical NEET foundation year',
        icon: '🎯',
        weight: 1,
      },
      {
        value: '12th',
        label: 'Class 12th',
        description: 'Final preparation and board exams',
        icon: '🚀',
        weight: 1,
      },
      {
        value: 'Dropper',
        label: 'Dropper/Repeater',
        description: 'Second attempt with focused preparation',
        icon: '🔥',
        weight: 1,
      },
    ],
  },

  // Question 2: Academic Goals (Priority Filter)
  {
    id: 'academic_goals',
    question: 'What are your primary academic objectives?',
    type: 'single',
    required: true,
    order: 2,
    options: [
      {
        value: 'neet_only',
        label: 'NEET Only',
        description: 'Exclusive focus on NEET preparation',
        icon: '🎯',
        weight: 3,
      },
      {
        value: 'board_neet',
        label: 'Board + NEET',
        description: 'Balance between board exams and NEET',
        icon: '⚖️',
        weight: 2,
      },
      {
        value: 'board_primary',
        label: 'Board Primary + NEET Foundation',
        description: 'Board exams priority with NEET basics',
        icon: '📖',
        weight: 1,
      },
    ],
  },

  // Question 3: Learning Preference (Teaching Style Filter)
  {
    id: 'batch_preference',
    question: 'What learning environment do you prefer?',
    type: 'single',
    required: true,
    order: 3,
    options: [
      {
        value: 'small_batch',
        label: 'Small Batch (10-15 students)',
        description: 'Personalized attention and interaction',
        icon: '👥',
        weight: 3,
      },
      {
        value: 'medium_batch',
        label: 'Medium Batch (20-25 students)',
        description: 'Balanced interaction and peer learning',
        icon: '🎓',
        weight: 2,
      },
      {
        value: 'large_batch',
        label: 'Large Batch (25+ students)',
        description: 'Cost-effective with structured learning',
        icon: '🏛️',
        weight: 1,
      },
    ],
  },

  // Question 4: Budget Range (Economic Filter)
  {
    id: 'budget_range',
    question: 'What is your comfortable budget range for the complete course?',
    type: 'single',
    required: true,
    order: 4,
    options: [
      {
        value: 'premium',
        label: '₹1,00,000 - ₹1,50,000',
        description: 'Premium coaching with all features',
        icon: '💎',
        weight: 3,
      },
      {
        value: 'standard',
        label: '₹60,000 - ₹1,00,000',
        description: 'Quality coaching with good features',
        icon: '⭐',
        weight: 2,
      },
      {
        value: 'budget',
        label: '₹40,000 - ₹60,000',
        description: 'Affordable quality coaching',
        icon: '💰',
        weight: 1,
      },
    ],
  },

  // Question 5: Study Time Availability (Intensity Filter)
  {
    id: 'study_hours',
    question: 'How many hours per week can you dedicate to this course?',
    type: 'single',
    required: true,
    order: 5,
    options: [
      {
        value: 'intensive',
        label: '15+ hours/week',
        description: 'Full commitment to NEET preparation',
        icon: '🔥',
        weight: 3,
      },
      {
        value: 'moderate',
        label: '8-15 hours/week',
        description: 'Balanced approach with other commitments',
        icon: '⚖️',
        weight: 2,
      },
      {
        value: 'light',
        label: 'Under 8 hours/week',
        description: 'Limited time with focused learning',
        icon: '⏰',
        weight: 1,
      },
    ],
  },

  // Question 6: Previous NEET Experience (Dropper-specific)
  {
    id: 'previous_attempt',
    question: 'What was your previous NEET experience?',
    type: 'single',
    required: true,
    order: 6,
    dependsOn: 'current_class',
    showIf: (answers) => answers.current_class === 'Dropper',
    options: [
      {
        value: 'first_attempt',
        label: 'First attempt, need improvement',
        description: 'Appeared but need better strategy',
        icon: '📈',
        weight: 2,
      },
      {
        value: 'multiple_attempts',
        label: 'Multiple attempts',
        description: 'Experienced but need intensive support',
        icon: '🎯',
        weight: 3,
      },
      {
        value: 'gap_year',
        label: 'Took gap, fresh start',
        description: 'Ready for intensive preparation',
        icon: '🚀',
        weight: 2,
      },
    ],
  },

  // Question 7: Weakness Areas (Performance Filter)
  {
    id: 'weak_subjects',
    question: 'Which Biology topics do you find most challenging?',
    type: 'multiple',
    required: false,
    order: 7,
    options: [
      {
        value: 'botany',
        label: 'Botany',
        description: 'Plant biology and classification',
        icon: '🌿',
      },
      {
        value: 'zoology',
        label: 'Zoology',
        description: 'Animal biology and physiology',
        icon: '🦎',
      },
      {
        value: 'genetics',
        label: 'Genetics & Evolution',
        description: 'Molecular biology and inheritance',
        icon: '🧬',
      },
      {
        value: 'ecology',
        label: 'Ecology & Environment',
        description: 'Environmental biology',
        icon: '🌍',
      },
    ],
  },
]

// Decision Tree Algorithm
export class CourseQualificationEngine {
  private answers: QualificationAnswers = {}

  constructor(answers: QualificationAnswers) {
    this.answers = answers
  }

  // Main recommendation algorithm
  generateRecommendation(): CourseRecommendation {
    const scores = this.calculateSeriesScores()
    const bestMatch = this.getBestMatch(scores)
    const reasoning = this.generateReasoning(bestMatch, scores)
    const alternatives = this.generateAlternatives(bestMatch, scores)

    return {
      seriesId: bestMatch.series as 'pinnacle' | 'ascent' | 'pursuit',
      planId: bestMatch.plan as 'A' | 'B' | 'C',
      matchScore: bestMatch.score,
      reasoning,
      alternativeOptions: alternatives,
    }
  }

  // Calculate compatibility scores for each series
  private calculateSeriesScores() {
    const currentClass = this.answers.current_class as string
    const academicGoals = this.answers.academic_goals as string
    const batchPref = this.answers.batch_preference as string
    const budgetRange = this.answers.budget_range as string
    const studyHours = this.answers.study_hours as string

    const scores = {
      pinnacle: { A: 0, B: 0, C: 0 },
      ascent: { A: 0, B: 0, C: 0 },
      pursuit: { A: 0, B: 0, C: 0 },
    }

    // Academic Goals Weight (40% of decision)
    if (academicGoals === 'neet_only') {
      scores.pinnacle.A += 40
      scores.pinnacle.B += 35
      scores.ascent.A += 35
      scores.ascent.B += 40
    } else if (academicGoals === 'board_neet') {
      scores.ascent.B += 40
      scores.ascent.C += 35
      scores.pursuit.A += 30
      scores.pursuit.B += 35
    } else {
      scores.pursuit.B += 40
      scores.pursuit.C += 35
      scores.ascent.C += 30
    }

    // Budget Range Weight (30% of decision)
    if (budgetRange === 'premium') {
      scores.pinnacle.A += 30
      scores.pinnacle.B += 25
      scores.ascent.A += 20
    } else if (budgetRange === 'standard') {
      scores.ascent.A += 30
      scores.ascent.B += 30
      scores.pinnacle.C += 20
      scores.pursuit.A += 15
    } else {
      scores.pursuit.A += 30
      scores.pursuit.B += 30
      scores.pursuit.C += 25
      scores.ascent.C += 20
    }

    // Batch Preference Weight (20% of decision)
    if (batchPref === 'small_batch') {
      scores.pinnacle.A += 20
      scores.pinnacle.B += 15
      scores.ascent.A += 10
    } else if (batchPref === 'medium_batch') {
      scores.ascent.A += 20
      scores.ascent.B += 20
      scores.pinnacle.C += 15
    } else {
      scores.pursuit.A += 20
      scores.pursuit.B += 20
      scores.ascent.C += 15
    }

    // Study Hours Weight (10% of decision)
    if (studyHours === 'intensive') {
      scores.pinnacle.A += 10
      scores.ascent.A += 8
    } else if (studyHours === 'moderate') {
      scores.ascent.B += 10
      scores.pinnacle.B += 8
      scores.pursuit.A += 6
    } else {
      scores.pursuit.B += 10
      scores.pursuit.C += 8
    }

    // Class-specific adjustments
    this.applyClassSpecificAdjustments(scores, currentClass)

    // Dropper-specific adjustments
    if (currentClass === 'Dropper') {
      this.applyDropperAdjustments(scores)
    }

    return scores
  }

  // Apply class-specific scoring adjustments
  private applyClassSpecificAdjustments(scores: any, currentClass: string) {
    switch (currentClass) {
      case '9th':
      case '10th':
        // Early classes benefit from structured, long-term programs
        scores.ascent.B += 5
        scores.pursuit.B += 5
        scores.pinnacle.B += 3
        break

      case '11th':
        // Critical year - all options viable but Ascent most popular
        scores.ascent.A += 5
        scores.ascent.B += 8
        scores.pinnacle.A += 3
        break

      case '12th':
        // Final year - intensive preparation needed
        scores.pinnacle.A += 8
        scores.ascent.A += 10
        scores.ascent.B += 5
        break

      case 'Dropper':
        // Need intensive, focused preparation
        scores.pinnacle.A += 10
        scores.ascent.A += 8
        scores.pursuit.A += 3
        break
    }
  }

  // Apply dropper-specific adjustments
  private applyDropperAdjustments(scores: any) {
    const previousAttempt = this.answers.previous_attempt as string

    if (previousAttempt === 'multiple_attempts') {
      // Need maximum support for multiple attempt students
      scores.pinnacle.A += 15
      scores.pinnacle.B += 8
    } else if (previousAttempt === 'first_attempt') {
      // Good foundation, need refinement
      scores.ascent.A += 10
      scores.pinnacle.B += 8
    } else if (previousAttempt === 'gap_year') {
      // Fresh start, flexible options
      scores.ascent.A += 8
      scores.ascent.B += 10
    }
  }

  // Find the best matching course and plan
  private getBestMatch(scores: any): { series: string; plan: string; score: number } {
    let bestMatch = { series: 'ascent', plan: 'B', score: 0 }

    for (const series in scores) {
      for (const plan in scores[series]) {
        if (scores[series][plan] > bestMatch.score) {
          bestMatch = {
            series: series as any,
            plan: plan as any,
            score: scores[series][plan],
          }
        }
      }
    }

    return bestMatch
  }

  // Generate reasoning for the recommendation
  private generateReasoning(bestMatch: any, scores: any): string[] {
    const reasoning: string[] = []
    const { series, plan } = bestMatch

    const currentClass = this.answers.current_class as string
    const academicGoals = this.answers.academic_goals as string
    const budgetRange = this.answers.budget_range as string
    const batchPref = this.answers.batch_preference as string

    // Primary reasoning based on series
    if (series === 'pinnacle') {
      reasoning.push(
        '🎯 Pinnacle Series offers premium coaching with AIIMS faculty and personal mentoring'
      )
      reasoning.push('👑 Small batch sizes (10-15 students) ensure maximum individual attention')
    } else if (series === 'ascent') {
      reasoning.push('⭐ Ascent Series is our most popular choice with 94.2% NEET success rate')
      reasoning.push('🎯 Perfect balance of comprehensive coverage and affordable pricing')
    } else {
      reasoning.push('💰 Pursuit Series offers excellent value with complete NEET coverage')
      reasoning.push('🎓 Structured approach ideal for building strong fundamentals')
    }

    // Plan-specific reasoning
    if (plan === 'A') {
      reasoning.push('📚 Comprehensive Plan A includes all features with maximum study hours')
      reasoning.push('🔥 Ideal for students who can dedicate 15+ hours weekly')
    } else if (plan === 'B') {
      reasoning.push('⚖️ Focused Plan B offers optimal balance of coverage and time commitment')
      reasoning.push('✅ Most popular choice among successful NEET candidates')
    } else {
      reasoning.push('⏰ Foundation Plan C provides essential coverage in focused timeframe')
      reasoning.push('💡 Smart choice for balanced academic approach')
    }

    // Budget alignment
    if (budgetRange === 'premium' && series === 'pinnacle') {
      reasoning.push('💎 Matches your premium budget range with maximum value delivery')
    } else if (budgetRange === 'standard' && series === 'ascent') {
      reasoning.push('⭐ Perfect fit for your budget with proven track record')
    } else if (budgetRange === 'budget' && series === 'pursuit') {
      reasoning.push('💰 Excellent value within your budget range')
    }

    // Class-specific reasoning
    if (currentClass === 'Dropper') {
      reasoning.push('🚀 Specialized approach for second-attempt students with intensive support')
    } else if (currentClass === '12th') {
      reasoning.push('⚡ Final year intensive preparation with exam-focused strategy')
    } else if (currentClass === '11th') {
      reasoning.push('🎯 Critical foundation year coverage with systematic preparation')
    }

    return reasoning.slice(0, 4) // Limit to top 4 reasons
  }

  // Generate alternative recommendations
  private generateAlternatives(bestMatch: any, scores: any) {
    const alternatives: any[] = []
    const sortedOptions: any[] = []

    // Collect all options with scores
    for (const series in scores) {
      for (const plan in scores[series]) {
        if (series !== bestMatch.series || plan !== bestMatch.plan) {
          sortedOptions.push({
            seriesId: series,
            planId: plan,
            score: scores[series][plan],
          })
        }
      }
    }

    // Sort by score and take top 2
    sortedOptions.sort((a, b) => b.score - a.score)

    for (let i = 0; i < Math.min(2, sortedOptions.length); i++) {
      const option = sortedOptions[i]
      let reason = ''

      if (option.score > bestMatch.score * 0.8) {
        if (option.seriesId === 'pinnacle') {
          reason = 'Consider for premium features and smaller batch sizes'
        } else if (option.seriesId === 'pursuit') {
          reason = 'Consider for better budget optimization'
        } else {
          reason = 'Alternative with similar suitability'
        }

        alternatives.push({
          seriesId: option.seriesId,
          planId: option.planId,
          reason,
        })
      }
    }

    return alternatives
  }
}

// Helper function to get next question based on current answers
export function getNextQuestion(answers: QualificationAnswers): QualificationQuestion | null {
  const answeredQuestions = new Set(Object.keys(answers))

  for (const question of QUALIFICATION_QUESTIONS) {
    // Skip if already answered
    if (answeredQuestions.has(question.id)) {
      continue
    }

    // Check dependencies
    if (question.dependsOn && !answeredQuestions.has(question.dependsOn)) {
      continue
    }

    // Check conditional display
    if (question.showIf && !question.showIf(answers)) {
      continue
    }

    return question
  }

  return null // All applicable questions answered
}

// Validate if qualification is complete
export function isQualificationComplete(answers: QualificationAnswers): boolean {
  const requiredQuestions = QUALIFICATION_QUESTIONS.filter((q) => {
    if (!q.required) return false
    if (q.dependsOn && !answers[q.dependsOn]) return false
    if (q.showIf && !q.showIf(answers)) return false
    return true
  })

  return requiredQuestions.every((q) => answers[q.id] !== undefined)
}

// Get qualification progress percentage
export function getQualificationProgress(answers: QualificationAnswers): number {
  const applicableQuestions = QUALIFICATION_QUESTIONS.filter((q) => {
    if (q.dependsOn && !answers[q.dependsOn]) return false
    if (q.showIf && !q.showIf(answers)) return false
    return true
  })

  const answeredCount = applicableQuestions.filter((q) => answers[q.id] !== undefined).length
  return Math.round((answeredCount / applicableQuestions.length) * 100)
}
