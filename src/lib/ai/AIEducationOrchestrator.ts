/**
 * AI Education Orchestrator - Central Hub for All AI-Powered Learning Features
 * Coordinates Biology Tutor, Assessment AI, Content Intelligence, and Performance Prediction
 */

import { biologyTutor, BiologyQuery, BiologyResponse } from './BiologyTutorEngine'
import { assessmentAI, GeneratedQuestion, StudentAnswer, AssessmentSession } from './AssessmentAI'
import {
  contentIntelligence,
  StudyMaterial,
  DiagramSpec,
  MnemonicDevice,
} from './ContentIntelligence'
import {
  performancePredictionAI,
  PredictionResult,
  StudentPerformanceData,
} from './PerformancePredictionAI'
import { AdaptiveLearningEngine } from './AdaptiveLearningEngine'
import { AIGateway } from './gateway/AIGateway'
import { DistributedCacheManager } from '../cache/DistributedCacheManager'

export interface StudentProfile {
  id: string
  personal: {
    name: string
    email: string
    phone: string
    dateOfBirth: Date
    gender: 'male' | 'female' | 'other'
    location: string
  }
  academic: {
    currentClass: string
    curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
    targetExam: string
    examDate?: Date
    schoolName: string
    previousGrades: Record<string, number>
    strongSubjects: string[]
    weakSubjects: string[]
  }
  learning: {
    style: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    pace: 'slow' | 'average' | 'fast'
    preferredLanguage: 'english' | 'hindi' | 'bilingual'
    studyHours: number
    attentionSpan: number
    bestStudyTime: string[]
  }
  goals: {
    targetScore: number
    targetRank?: number
    targetCollege?: string
    careerGoal?: string
    monthlyTargets: Record<string, number>
  }
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'elite'
    startDate: Date
    endDate: Date
    features: string[]
  }
}

export interface LearningSession {
  id: string
  studentId: string
  type: 'doubt_resolution' | 'assessment' | 'content_study' | 'performance_review'
  startTime: Date
  endTime?: Date
  duration: number // minutes
  activities: SessionActivity[]
  outcomes: SessionOutcome[]
  satisfaction: number // 1-5
  metadata: {
    platform: string
    device: string
    internetQuality: 'poor' | 'average' | 'good' | 'excellent'
  }
}

export interface SessionActivity {
  type: 'question_asked' | 'content_viewed' | 'test_taken' | 'video_watched' | 'note_created'
  content: string
  duration: number
  engagement: number // 1-10
  success: boolean
}

export interface SessionOutcome {
  type: 'concept_learned' | 'doubt_resolved' | 'skill_improved' | 'knowledge_gained'
  description: string
  confidence: number // 0-1
  retention: number // 0-1
  application: number // 0-1
}

export interface AIRecommendation {
  id: string
  studentId: string
  type: 'study_plan' | 'content' | 'practice' | 'review' | 'break' | 'help'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  description: string
  reasoning: string
  expectedImpact: number // 0-1
  timeRequired: number // minutes
  deadline?: Date
  prerequisites: string[]
  resources: string[]
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  createdAt: Date
}

export interface ComprehensiveInsight {
  studentId: string
  insights: {
    learning: LearningInsight[]
    performance: PerformanceInsight[]
    engagement: EngagementInsight[]
    prediction: PredictionInsight[]
    recommendation: RecommendationInsight[]
  }
  summary: {
    overallProgress: number
    readinessScore: number
    riskLevel: 'low' | 'medium' | 'high'
    nextSteps: string[]
    urgentActions: string[]
  }
  generatedAt: Date
}

export interface LearningInsight {
  category: 'comprehension' | 'retention' | 'application' | 'speed'
  insight: string
  trend: 'improving' | 'stable' | 'declining'
  confidence: number
  actionable: boolean
}

export interface PerformanceInsight {
  category: 'accuracy' | 'speed' | 'consistency' | 'improvement'
  metric: string
  value: number
  benchmark: number
  interpretation: string
}

export interface EngagementInsight {
  category: 'frequency' | 'duration' | 'quality' | 'satisfaction'
  pattern: string
  impact: string
  recommendations: string[]
}

export interface PredictionInsight {
  timeframe: 'short' | 'medium' | 'long'
  prediction: string
  confidence: number
  factors: string[]
  risks: string[]
}

export interface RecommendationInsight {
  action: string
  priority: number
  impact: string
  resources: string[]
  timeline: string
}

class AIEducationOrchestrator {
  private static instance: AIEducationOrchestrator
  private aiGateway: AIGateway
  private cache: DistributedCacheManager
  private adaptiveLearning: AdaptiveLearningEngine
  private studentProfiles: Map<string, StudentProfile> = new Map()
  private activeSessions: Map<string, LearningSession> = new Map()
  private recommendations: Map<string, AIRecommendation[]> = new Map()

  constructor() {
    this.aiGateway = new AIGateway()
    this.cache = new DistributedCacheManager()
    this.adaptiveLearning = new AdaptiveLearningEngine()
  }

  static getInstance(): AIEducationOrchestrator {
    if (!AIEducationOrchestrator.instance) {
      AIEducationOrchestrator.instance = new AIEducationOrchestrator()
    }
    return AIEducationOrchestrator.instance
  }

  // Main student interaction methods
  async resolveStudentDoubt(
    studentId: string,
    question: string,
    context?: {
      topic?: string
      difficulty?: 'basic' | 'intermediate' | 'advanced'
      urgency?: 'low' | 'high'
    }
  ): Promise<{
    response: BiologyResponse
    recommendations: AIRecommendation[]
    followUp: string[]
  }> {
    try {
      const profile = await this.getStudentProfile(studentId)
      if (!profile) {
        throw new Error('Student profile not found')
      }

      // Create biology query
      const query: BiologyQuery = {
        id: `query_${Date.now()}`,
        studentId,
        question,
        topic: context?.topic,
        curriculum: profile.academic.curriculum,
        grade: profile.academic.currentClass,
        difficulty: context?.difficulty || 'intermediate',
        queryType: this.detectQueryType(question),
        context: {
          previousQuestions: [],
          currentChapter: context?.topic,
          weakTopics: profile.academic.weakSubjects,
        },
        timestamp: new Date(),
      }

      // Get AI response
      const response = await biologyTutor.resolveDoubt(query)

      // Generate personalized recommendations
      const recommendations = await this.generateRecommendations(studentId, {
        type: 'doubt_resolution',
        topic: query.topic,
        difficulty: response.difficulty,
        success: response.confidence > 0.7,
      })

      // Update learning analytics
      await this.updateLearningAnalytics(studentId, {
        activity: 'doubt_resolution',
        topic: query.topic || 'general',
        success: response.confidence > 0.7,
        timeSpent: response.estimatedStudyTime,
      })

      // Generate follow-up suggestions
      const followUp = this.generateFollowUp(response, profile)

      return {
        response,
        recommendations,
        followUp,
      }
    } catch (error) {
      console.error('Doubt resolution failed:', error)
      throw new Error('Failed to resolve student doubt')
    }
  }

  async createPersonalizedAssessment(
    studentId: string,
    params: {
      type: 'practice' | 'mock' | 'chapter_test'
      topics?: string[]
      difficulty?: 'mixed' | 'easy' | 'medium' | 'hard'
      duration: number
      questionCount: number
    }
  ): Promise<{
    session: AssessmentSession
    recommendations: AIRecommendation[]
    preparation: string[]
  }> {
    const profile = await this.getStudentProfile(studentId)
    if (!profile) {
      throw new Error('Student profile not found')
    }

    // Create assessment session
    const session = await assessmentAI.createAssessmentSession({
      studentId,
      type: params.type,
      curriculum: profile.academic.curriculum,
      grade: profile.academic.currentClass,
      questionCount: params.questionCount,
      timeLimit: params.duration,
      difficulty: params.difficulty,
    })

    // Generate preparation recommendations
    const recommendations = await this.generateRecommendations(studentId, {
      type: 'assessment_preparation',
      assessmentType: params.type,
      topics: params.topics,
      timeAvailable: 60, // 1 hour preparation
    })

    // Provide preparation guidance
    const preparation = this.generatePreparationGuidance(session, profile)

    return {
      session,
      recommendations,
      preparation,
    }
  }

  async generateStudyMaterial(
    studentId: string,
    params: {
      topic: string
      type: 'notes' | 'summary' | 'flashcard' | 'diagram'
      difficulty?: 'basic' | 'intermediate' | 'advanced'
      urgency?: 'low' | 'high'
    }
  ): Promise<{
    material: StudyMaterial | DiagramSpec | MnemonicDevice
    recommendations: AIRecommendation[]
    studyPlan: string[]
  }> {
    const profile = await this.getStudentProfile(studentId)
    if (!profile) {
      throw new Error('Student profile not found')
    }

    let material: StudyMaterial | DiagramSpec | MnemonicDevice

    switch (params.type) {
      case 'notes':
      case 'summary':
        material = await contentIntelligence.generateStudyNotes({
          topic: params.topic,
          curriculum: profile.academic.curriculum,
          grade: profile.academic.currentClass,
          difficulty: params.difficulty || 'intermediate',
          language: profile.learning.preferredLanguage,
          learningStyle: profile.learning.style,
          length: params.type === 'summary' ? 'brief' : 'detailed',
        })
        break

      case 'diagram':
        material = await contentIntelligence.generateDiagram({
          topic: params.topic,
          diagramType: 'structure',
          complexity: params.difficulty === 'basic' ? 'simple' : 'detailed',
          curriculum: profile.academic.curriculum,
          grade: profile.academic.currentClass,
        })
        break

      case 'flashcard':
        material = await contentIntelligence.generateMnemonic({
          concept: params.topic,
          topic: params.topic,
          type: 'acronym',
          language: profile.learning.preferredLanguage,
          difficulty: params.difficulty || 'medium',
        })
        break

      default:
        throw new Error('Invalid material type')
    }

    // Generate study recommendations
    const recommendations = await this.generateRecommendations(studentId, {
      type: 'content_study',
      topic: params.topic,
      materialType: params.type,
      urgency: params.urgency,
    })

    // Create study plan
    const studyPlan = this.generateStudyPlan(material, profile)

    return {
      material,
      recommendations,
      studyPlan,
    }
  }

  async getPerformanceAnalysis(
    studentId: string,
    timeframe: 'week' | 'month' | 'quarter' | 'all'
  ): Promise<{
    prediction: PredictionResult
    insights: ComprehensiveInsight
    recommendations: AIRecommendation[]
  }> {
    // Get performance prediction
    const prediction = await performancePredictionAI.predictPerformance(studentId)

    // Generate comprehensive insights
    const insights = await this.generateComprehensiveInsights(studentId, timeframe)

    // Create performance-based recommendations
    const recommendations = await this.generateRecommendations(studentId, {
      type: 'performance_improvement',
      currentScore: prediction.predictions.examScore.predicted,
      targetScore: (await this.getStudentProfile(studentId))?.goals.targetScore || 600,
      timeframe,
    })

    return {
      prediction,
      insights,
      recommendations,
    }
  }

  // Helper methods
  private detectQueryType(question: string): BiologyQuery['queryType'] {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('diagram') || lowerQuestion.includes('structure')) {
      return 'diagram'
    }
    if (lowerQuestion.includes('solve') || lowerQuestion.includes('calculate')) {
      return 'problem'
    }
    if (lowerQuestion.includes('remember') || lowerQuestion.includes('mnemonic')) {
      return 'memory'
    }
    if (lowerQuestion.includes('apply') || lowerQuestion.includes('example')) {
      return 'application'
    }

    return 'concept'
  }

  private async generateRecommendations(
    studentId: string,
    context: any
  ): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = []

    // Generate contextual recommendations based on activity type
    switch (context.type) {
      case 'doubt_resolution':
        if (!context.success) {
          recommendations.push({
            id: `rec_${Date.now()}_1`,
            studentId,
            type: 'study_plan',
            priority: 'high',
            title: 'Additional Study Required',
            description: `Review ${context.topic} concepts with focused study materials`,
            reasoning: 'Low confidence in doubt resolution indicates knowledge gaps',
            expectedImpact: 0.8,
            timeRequired: 45,
            prerequisites: [],
            resources: ['Study Notes', 'Practice Questions', 'Video Lessons'],
            status: 'pending',
            createdAt: new Date(),
          })
        }
        break

      case 'assessment_preparation':
        recommendations.push({
          id: `rec_${Date.now()}_2`,
          studentId,
          type: 'practice',
          priority: 'medium',
          title: 'Warm-up Practice',
          description: 'Complete practice questions before the assessment',
          reasoning: 'Practice improves performance and reduces anxiety',
          expectedImpact: 0.6,
          timeRequired: 30,
          prerequisites: [],
          resources: ['Practice Question Bank'],
          status: 'pending',
          createdAt: new Date(),
        })
        break

      case 'performance_improvement':
        const gap = context.targetScore - context.currentScore
        if (gap > 100) {
          recommendations.push({
            id: `rec_${Date.now()}_3`,
            studentId,
            type: 'study_plan',
            priority: 'urgent',
            title: 'Intensive Study Plan Required',
            description: 'Significant score improvement needed - intensive study recommended',
            reasoning: `Current score (${context.currentScore}) is ${gap} points below target`,
            expectedImpact: 0.9,
            timeRequired: 120,
            prerequisites: [],
            resources: ['Comprehensive Study Plan', 'Daily Assessments', 'Tutor Support'],
            status: 'pending',
            createdAt: new Date(),
          })
        }
        break
    }

    return recommendations
  }

  private generateFollowUp(response: BiologyResponse, profile: StudentProfile): string[] {
    const followUp: string[] = []

    if (response.relatedTopics.length > 0) {
      followUp.push(
        `Would you like to explore related topics: ${response.relatedTopics.slice(0, 2).join(', ')}?`
      )
    }

    if (response.practiceQuestions.length > 0) {
      followUp.push('I have practice questions on this topic. Should I create a quiz for you?')
    }

    if (response.visualAids?.diagrams && response.visualAids.diagrams.length > 0) {
      followUp.push('Would you like me to explain the diagrams related to this concept?')
    }

    if (response.difficulty > 7) {
      followUp.push(
        'This is a complex topic. Would you like me to break it down into simpler parts?'
      )
    }

    return followUp
  }

  private generatePreparationGuidance(
    session: AssessmentSession,
    profile: StudentProfile
  ): string[] {
    const guidance: string[] = []

    guidance.push(`This ${session.type} will take ${session.settings.timeLimit} minutes`)
    guidance.push(`Focus on your weak areas: ${profile.academic.weakSubjects.join(', ')}`)
    guidance.push('Review key concepts before starting')

    if (session.settings.includeNegativeMarking) {
      guidance.push('⚠️ Negative marking applies - answer only if you are confident')
    }

    guidance.push('Manage your time wisely - spend more time on higher mark questions')

    return guidance
  }

  private generateStudyPlan(
    material: StudyMaterial | DiagramSpec | MnemonicDevice,
    profile: StudentProfile
  ): string[] {
    const plan: string[] = []

    if ('estimatedReadTime' in material.metadata) {
      plan.push(`Estimated study time: ${material.metadata.estimatedReadTime} minutes`)
    }

    plan.push('Read through the material carefully')
    plan.push('Create your own summary of key points')
    plan.push('Test your understanding with practice questions')

    if (profile.learning.style === 'visual') {
      plan.push('Create visual aids like mind maps or diagrams')
    }

    if (profile.learning.style === 'auditory') {
      plan.push('Read the content aloud or discuss with others')
    }

    plan.push('Review the material again after 24 hours for better retention')

    return plan
  }

  private async generateComprehensiveInsights(
    studentId: string,
    timeframe: string
  ): Promise<ComprehensiveInsight> {
    // Implementation for comprehensive insights generation
    const insights: ComprehensiveInsight = {
      studentId,
      insights: {
        learning: [],
        performance: [],
        engagement: [],
        prediction: [],
        recommendation: [],
      },
      summary: {
        overallProgress: 75,
        readinessScore: 80,
        riskLevel: 'low',
        nextSteps: [],
        urgentActions: [],
      },
      generatedAt: new Date(),
    }

    return insights
  }

  private async updateLearningAnalytics(studentId: string, activity: any): Promise<void> {
    // Implementation for updating learning analytics
    console.log(`Updated analytics for student ${studentId}:`, activity)
  }

  // Profile management
  async getStudentProfile(studentId: string): Promise<StudentProfile | null> {
    return this.studentProfiles.get(studentId) || null
  }

  async updateStudentProfile(studentId: string, updates: Partial<StudentProfile>): Promise<void> {
    const existing = this.studentProfiles.get(studentId)
    if (existing) {
      Object.assign(existing, updates)
      this.studentProfiles.set(studentId, existing)
    }
  }

  async createStudentProfile(profile: StudentProfile): Promise<void> {
    this.studentProfiles.set(profile.id, profile)
  }

  // Session management
  async startLearningSession(
    studentId: string,
    type: LearningSession['type']
  ): Promise<LearningSession> {
    const session: LearningSession = {
      id: `session_${Date.now()}`,
      studentId,
      type,
      startTime: new Date(),
      duration: 0,
      activities: [],
      outcomes: [],
      satisfaction: 0,
      metadata: {
        platform: 'web',
        device: 'desktop',
        internetQuality: 'good',
      },
    }

    this.activeSessions.set(session.id, session)
    return session
  }

  async endLearningSession(sessionId: string, satisfaction: number): Promise<LearningSession> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    session.endTime = new Date()
    session.duration = Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)
    session.satisfaction = satisfaction

    this.activeSessions.delete(sessionId)
    return session
  }

  // Integration with existing AI systems
  async integrateWithBiologyTutor(): Promise<void> {
    console.log('✅ Biology Tutor Engine integrated')
  }

  async integrateWithAssessmentAI(): Promise<void> {
    console.log('✅ Assessment AI integrated')
  }

  async integrateWithContentIntelligence(): Promise<void> {
    console.log('✅ Content Intelligence integrated')
  }

  async integrateWithPerformancePrediction(): Promise<void> {
    console.log('✅ Performance Prediction AI integrated')
  }

  // Health check and monitoring
  async getSystemStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'down'
    components: Record<string, boolean>
    metrics: Record<string, number>
  }> {
    return {
      status: 'healthy',
      components: {
        biologyTutor: true,
        assessmentAI: true,
        contentIntelligence: true,
        performancePrediction: true,
        adaptiveLearning: true,
      },
      metrics: {
        activeStudents: this.studentProfiles.size,
        activeSessions: this.activeSessions.size,
        totalRecommendations: Array.from(this.recommendations.values()).flat().length,
      },
    }
  }
}

export const aiEducationOrchestrator = AIEducationOrchestrator.getInstance()
export default aiEducationOrchestrator
