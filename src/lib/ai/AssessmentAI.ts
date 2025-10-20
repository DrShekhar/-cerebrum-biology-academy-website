/**
 * Assessment AI - Automated Question Generation and Evaluation System
 * Specialized for Biology assessments across NEET, CBSE, ICSE, IB curricula
 */

import { aiConfig } from './aiConfig'
import { AIGateway } from './gateway/AIGateway'
import { DistributedCacheManager } from '../cache/DistributedCacheManager'

export interface QuestionTemplate {
  id: string
  type: 'mcq' | 'short_answer' | 'long_answer' | 'diagram' | 'numerical' | 'assertion_reason'
  topic: string
  subtopic: string
  curriculum: string[]
  grade: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  examWeight: number
  timeAllocation: number // minutes
  tags: string[]
}

export interface GeneratedQuestion {
  id: string
  templateId: string
  type: QuestionTemplate['type']
  question: string
  options?: string[] // for MCQs
  correctAnswer: string
  explanation: string
  hints?: string[]
  difficulty: number // 1-10
  estimatedTime: number // minutes
  topic: string
  subtopic: string
  curriculum: string
  grade: string
  bloomsLevel: string
  diagramRequired?: boolean
  formulaUsed?: string[]
  commonMistakes: string[]
  markingScheme?: {
    totalMarks: number
    partialMarks: { criteria: string; marks: number }[]
  }
  metadata: {
    createdAt: Date
    aiProvider: string
    confidence: number
    reviewStatus: 'pending' | 'approved' | 'rejected'
    usageCount: number
  }
}

export interface StudentAnswer {
  id: string
  questionId: string
  studentId: string
  answer: string | string[] // string for text, array for MCQ selections
  submittedAt: Date
  timeSpent: number // seconds
  attempts: number
  confidence?: number // student's confidence 1-5
}

export interface AnswerEvaluation {
  id: string
  answerId: string
  questionId: string
  studentId: string
  score: number // 0-100
  maxScore: number
  isCorrect: boolean
  evaluation: {
    strengths: string[]
    weaknesses: string[]
    misconceptions: string[]
    improvements: string[]
    conceptualGaps: string[]
  }
  detailedFeedback: string
  partialCredits: {
    concept: number
    application: number
    reasoning: number
    presentation: number
  }
  nextSteps: {
    recommendedTopics: string[]
    practiceQuestions: string[]
    studyMaterials: string[]
    tutoring?: boolean
  }
  metadata: {
    evaluatedAt: Date
    aiProvider: string
    confidence: number
    humanReviewRequired: boolean
  }
}

export interface AssessmentSession {
  id: string
  studentId: string
  type: 'practice' | 'mock' | 'chapter_test' | 'full_test'
  curriculum: string
  grade: string
  topic?: string
  questions: GeneratedQuestion[]
  answers: StudentAnswer[]
  evaluations: AnswerEvaluation[]
  settings: {
    timeLimit: number // minutes
    questionsCount: number
    difficulty: 'mixed' | 'easy' | 'medium' | 'hard'
    includeNegativeMarking: boolean
    allowReview: boolean
    showAnswersImmediately: boolean
  }
  results: {
    totalScore: number
    maxScore: number
    percentage: number
    accuracy: number
    timeEfficiency: number
    topicWiseScore: Map<string, number>
    difficultyWiseScore: Map<string, number>
    rank?: number
    percentile?: number
  }
  analytics: {
    strengths: string[]
    weaknesses: string[]
    improvementAreas: string[]
    readinessScore: number // for exam readiness
    predictedScore: number // predicted exam score
    studyRecommendations: string[]
  }
  status: 'created' | 'in_progress' | 'completed' | 'evaluated'
  timestamps: {
    createdAt: Date
    startedAt?: Date
    completedAt?: Date
    evaluatedAt?: Date
  }
}

class AssessmentAI {
  private static instance: AssessmentAI
  private aiGateway: AIGateway
  private cache: DistributedCacheManager
  private questionTemplates: Map<string, QuestionTemplate> = new Map()
  private generatedQuestions: Map<string, GeneratedQuestion> = new Map()

  constructor() {
    this.aiGateway = new AIGateway()
    this.cache = new DistributedCacheManager()
    this.initializeQuestionTemplates()
  }

  static getInstance(): AssessmentAI {
    if (!AssessmentAI.instance) {
      AssessmentAI.instance = new AssessmentAI()
    }
    return AssessmentAI.instance
  }

  private initializeQuestionTemplates(): void {
    // Cell Biology Templates
    this.questionTemplates.set('cell-bio-mcq-basic', {
      id: 'cell-bio-mcq-basic',
      type: 'mcq',
      topic: 'Cell Biology',
      subtopic: 'Cell Structure',
      curriculum: ['NEET', 'CBSE', 'ICSE'],
      grade: ['11', '12'],
      difficulty: 'easy',
      bloomsLevel: 'remember',
      examWeight: 4,
      timeAllocation: 1,
      tags: ['organelles', 'cell-membrane', 'nucleus'],
    })

    this.questionTemplates.set('genetics-numerical-hard', {
      id: 'genetics-numerical-hard',
      type: 'numerical',
      topic: 'Genetics',
      subtopic: 'Population Genetics',
      curriculum: ['NEET', 'IB'],
      grade: ['12'],
      difficulty: 'hard',
      bloomsLevel: 'apply',
      examWeight: 4,
      timeAllocation: 5,
      tags: ['hardy-weinberg', 'allele-frequency', 'calculations'],
    })

    // Add more templates for different topics and types
  }

  async generateQuestions(params: {
    count: number
    curriculum: string
    grade: string
    topics?: string[]
    difficulty?: 'mixed' | 'easy' | 'medium' | 'hard'
    types?: QuestionTemplate['type'][]
    timeLimit?: number
  }): Promise<GeneratedQuestion[]> {
    const cacheKey = `questions_${JSON.stringify(params)}`
    const cached = await this.cache.get(cacheKey)

    if (cached) {
      return JSON.parse(cached)
    }

    const questions: GeneratedQuestion[] = []

    for (let i = 0; i < params.count; i++) {
      try {
        const question = await this.generateSingleQuestion({
          curriculum: params.curriculum,
          grade: params.grade,
          topics: params.topics,
          difficulty: params.difficulty,
          types: params.types,
        })

        if (question) {
          questions.push(question)
        }
      } catch (error) {
        console.error(`Error generating question ${i + 1}:`, error)
      }
    }

    // Cache for 1 hour
    await this.cache.set(cacheKey, JSON.stringify(questions), 3600)

    return questions
  }

  private async generateSingleQuestion(params: {
    curriculum: string
    grade: string
    topics?: string[]
    difficulty?: 'mixed' | 'easy' | 'medium' | 'hard'
    types?: QuestionTemplate['type'][]
  }): Promise<GeneratedQuestion | null> {
    // Select appropriate template
    const template = this.selectQuestionTemplate(params)
    if (!template) return null

    // Generate question using AI
    const aiPrompt = this.buildQuestionGenerationPrompt(template, params)

    try {
      const response = await this.aiGateway.generateResponse({
        prompt: aiPrompt,
        provider: aiConfig.getBestProvider(),
        model: 'default',
        temperature: 0.8,
        maxTokens: 1500,
      })

      const parsedQuestion = this.parseAIResponse(response, template)
      return parsedQuestion
    } catch (error) {
      console.error('AI question generation failed:', error)
      return null
    }
  }

  private selectQuestionTemplate(params: any): QuestionTemplate | null {
    const availableTemplates = Array.from(this.questionTemplates.values()).filter((template) => {
      return (
        template.curriculum.includes(params.curriculum) && template.grade.includes(params.grade)
      )
    })

    if (availableTemplates.length === 0) return null

    // Randomly select template with weighted selection based on exam importance
    const totalWeight = availableTemplates.reduce((sum, t) => sum + t.examWeight, 0)
    const random = Math.random() * totalWeight

    let weightSum = 0
    for (const template of availableTemplates) {
      weightSum += template.examWeight
      if (random <= weightSum) {
        return template
      }
    }

    return availableTemplates[0]
  }

  private buildQuestionGenerationPrompt(template: QuestionTemplate, params: any): string {
    return `
You are an expert Biology teacher creating ${template.curriculum} ${template.grade} questions.

Generate a ${template.type} question with these specifications:
- Topic: ${template.topic}
- Subtopic: ${template.subtopic}
- Difficulty: ${template.difficulty}
- Bloom's Level: ${template.bloomsLevel}
- Time allocation: ${template.timeAllocation} minutes
- Curriculum: ${template.curriculum.join(', ')}

Requirements:
1. Question must be original and unique
2. Align with ${template.curriculum} syllabus
3. Appropriate for Grade ${template.grade} students
4. Clear, unambiguous language
5. Scientifically accurate
6. Exam-relevant

${
  template.type === 'mcq'
    ? `
Format as MCQ with:
- Clear question stem
- 4 options (A, B, C, D)
- Only one correct answer
- Plausible distractors
- Avoid "all of the above" or "none of the above"
`
    : ''
}

${
  template.type === 'short_answer'
    ? `
Format as short answer (2-3 marks):
- Clear question
- Expected answer length: 50-100 words
- Specific marking points
`
    : ''
}

${
  template.type === 'diagram'
    ? `
Format as diagram-based question:
- Clear instructions for diagram
- Specific labeling requirements
- Related concept questions
`
    : ''
}

Provide response in JSON format:
{
  "question": "string",
  "options": ["A", "B", "C", "D"], // only for MCQ
  "correctAnswer": "string",
  "explanation": "string",
  "hints": ["string"],
  "commonMistakes": ["string"],
  "formulaUsed": ["string"], // if applicable
  "diagramRequired": boolean,
  "estimatedTime": number,
  "difficulty": number, // 1-10
  "markingScheme": {
    "totalMarks": number,
    "partialMarks": [{"criteria": "string", "marks": number}]
  }
}
`
  }

  private parseAIResponse(response: string, template: QuestionTemplate): GeneratedQuestion | null {
    try {
      const parsed = JSON.parse(response)

      const question: GeneratedQuestion = {
        id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        templateId: template.id,
        type: template.type,
        question: parsed.question,
        options: parsed.options,
        correctAnswer: parsed.correctAnswer,
        explanation: parsed.explanation,
        hints: parsed.hints || [],
        difficulty: parsed.difficulty || 5,
        estimatedTime: parsed.estimatedTime || template.timeAllocation,
        topic: template.topic,
        subtopic: template.subtopic,
        curriculum: template.curriculum[0],
        grade: template.grade[0],
        bloomsLevel: template.bloomsLevel,
        diagramRequired: parsed.diagramRequired || false,
        formulaUsed: parsed.formulaUsed || [],
        commonMistakes: parsed.commonMistakes || [],
        markingScheme: parsed.markingScheme,
        metadata: {
          createdAt: new Date(),
          aiProvider: aiConfig.getBestProvider(),
          confidence: 0.8,
          reviewStatus: 'pending',
          usageCount: 0,
        },
      }

      // Store generated question
      this.generatedQuestions.set(question.id, question)

      return question
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return null
    }
  }

  async evaluateAnswer(
    answer: StudentAnswer,
    question: GeneratedQuestion
  ): Promise<AnswerEvaluation> {
    const cacheKey = `eval_${answer.questionId}_${Buffer.from(answer.answer.toString()).toString('base64').substring(0, 20)}`
    const cached = await this.cache.get(cacheKey)

    if (cached) {
      return JSON.parse(cached)
    }

    try {
      const evaluation = await this.performAIEvaluation(answer, question)

      // Cache evaluation for 24 hours
      await this.cache.set(cacheKey, JSON.stringify(evaluation), 86400)

      return evaluation
    } catch (error) {
      console.error('Answer evaluation failed:', error)
      return this.generateFallbackEvaluation(answer, question)
    }
  }

  private async performAIEvaluation(
    answer: StudentAnswer,
    question: GeneratedQuestion
  ): Promise<AnswerEvaluation> {
    const evaluationPrompt = `
You are an expert Biology teacher evaluating a student's answer.

Question: ${question.question}
${question.options ? `Options: ${question.options.join(', ')}` : ''}
Correct Answer: ${question.correctAnswer}
Student Answer: ${answer.answer}

Question Details:
- Topic: ${question.topic}
- Subtopic: ${question.subtopic}
- Difficulty: ${question.difficulty}/10
- Type: ${question.type}
- Curriculum: ${question.curriculum}
- Bloom's Level: ${question.bloomsLevel}

Evaluation Criteria:
1. Correctness of scientific facts
2. Completeness of answer
3. Use of appropriate terminology
4. Logical reasoning
5. Understanding of concepts

Provide detailed evaluation in JSON format:
{
  "score": number, // 0-100
  "isCorrect": boolean,
  "evaluation": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "misconceptions": ["string"],
    "improvements": ["string"],
    "conceptualGaps": ["string"]
  },
  "detailedFeedback": "string",
  "partialCredits": {
    "concept": number, // 0-25
    "application": number, // 0-25
    "reasoning": number, // 0-25
    "presentation": number // 0-25
  },
  "nextSteps": {
    "recommendedTopics": ["string"],
    "practiceQuestions": ["string"],
    "studyMaterials": ["string"],
    "tutoring": boolean
  }
}
`

    const response = await this.aiGateway.generateResponse({
      prompt: evaluationPrompt,
      provider: aiConfig.getBestProvider(),
      model: 'default',
      temperature: 0.3,
      maxTokens: 1500,
    })

    const parsed = JSON.parse(response)

    const evaluation: AnswerEvaluation = {
      id: `eval_${Date.now()}`,
      answerId: answer.id,
      questionId: question.id,
      studentId: answer.studentId,
      score: parsed.score,
      maxScore: question.markingScheme?.totalMarks || 100,
      isCorrect: parsed.isCorrect,
      evaluation: parsed.evaluation,
      detailedFeedback: parsed.detailedFeedback,
      partialCredits: parsed.partialCredits,
      nextSteps: parsed.nextSteps,
      metadata: {
        evaluatedAt: new Date(),
        aiProvider: aiConfig.getBestProvider(),
        confidence: 0.85,
        humanReviewRequired: parsed.score < 30 || parsed.score > 95, // Edge cases need human review
      },
    }

    return evaluation
  }

  private generateFallbackEvaluation(
    answer: StudentAnswer,
    question: GeneratedQuestion
  ): AnswerEvaluation {
    // Basic evaluation for when AI fails
    const isCorrect =
      answer.answer.toString().toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

    return {
      id: `eval_fallback_${Date.now()}`,
      answerId: answer.id,
      questionId: question.id,
      studentId: answer.studentId,
      score: isCorrect ? 100 : 0,
      maxScore: 100,
      isCorrect,
      evaluation: {
        strengths: isCorrect ? ['Correct answer provided'] : [],
        weaknesses: isCorrect ? [] : ['Answer does not match expected response'],
        misconceptions: [],
        improvements: isCorrect ? [] : ['Review the concept and try again'],
        conceptualGaps: [],
      },
      detailedFeedback: isCorrect
        ? 'Well done! Your answer is correct.'
        : 'Your answer is incorrect. Please review the concept and try again.',
      partialCredits: {
        concept: isCorrect ? 25 : 0,
        application: isCorrect ? 25 : 0,
        reasoning: isCorrect ? 25 : 0,
        presentation: isCorrect ? 25 : 0,
      },
      nextSteps: {
        recommendedTopics: isCorrect ? [] : [question.topic],
        practiceQuestions: [],
        studyMaterials: [],
        tutoring: !isCorrect,
      },
      metadata: {
        evaluatedAt: new Date(),
        aiProvider: 'fallback',
        confidence: 0.5,
        humanReviewRequired: true,
      },
    }
  }

  async createAssessmentSession(params: {
    studentId: string
    type: AssessmentSession['type']
    curriculum: string
    grade: string
    topic?: string
    questionCount: number
    timeLimit: number
    difficulty?: 'mixed' | 'easy' | 'medium' | 'hard'
  }): Promise<AssessmentSession> {
    // Generate questions for the session
    const questions = await this.generateQuestions({
      count: params.questionCount,
      curriculum: params.curriculum,
      grade: params.grade,
      topics: params.topic ? [params.topic] : undefined,
      difficulty: params.difficulty || 'mixed',
      timeLimit: params.timeLimit,
    })

    const session: AssessmentSession = {
      id: `session_${Date.now()}`,
      studentId: params.studentId,
      type: params.type,
      curriculum: params.curriculum,
      grade: params.grade,
      topic: params.topic,
      questions,
      answers: [],
      evaluations: [],
      settings: {
        timeLimit: params.timeLimit,
        questionsCount: params.questionCount,
        difficulty: params.difficulty || 'mixed',
        includeNegativeMarking: params.type === 'mock' || params.type === 'full_test',
        allowReview: params.type === 'practice',
        showAnswersImmediately: params.type === 'practice',
      },
      results: {
        totalScore: 0,
        maxScore: questions.reduce((sum, q) => sum + (q.markingScheme?.totalMarks || 100), 0),
        percentage: 0,
        accuracy: 0,
        timeEfficiency: 0,
        topicWiseScore: new Map(),
        difficultyWiseScore: new Map(),
      },
      analytics: {
        strengths: [],
        weaknesses: [],
        improvementAreas: [],
        readinessScore: 0,
        predictedScore: 0,
        studyRecommendations: [],
      },
      status: 'created',
      timestamps: {
        createdAt: new Date(),
      },
    }

    return session
  }

  async evaluateSession(sessionId: string): Promise<AssessmentSession> {
    // Implementation for evaluating a complete assessment session
    // This would include comprehensive analytics and performance predictions

    // Placeholder implementation
    const session = {} as AssessmentSession
    return session
  }

  // Performance analytics methods
  async getStudentPerformanceAnalytics(
    studentId: string,
    timeframe: 'week' | 'month' | 'all'
  ): Promise<any> {
    // Implementation for comprehensive performance analytics
    return {
      overallProgress: 0.75,
      strongTopics: [],
      weakTopics: [],
      improvementTrends: [],
      readinessScore: 0.8,
      predictions: {},
    }
  }

  async generatePersonalizedStudyPlan(
    studentId: string,
    targetExam: string,
    timeframe: number
  ): Promise<any> {
    // Implementation for AI-generated personalized study plans
    return {
      dailySchedule: {},
      weeklyGoals: [],
      practiceSchedule: [],
      revisionPlan: {},
    }
  }
}

export const assessmentAI = AssessmentAI.getInstance()
export default assessmentAI
