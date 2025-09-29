/**
 * Biology Tutor Engine - 24/7 AI-Powered Biology Expert
 * Specialized for NEET, CBSE, ICSE, IB Biology curriculum support
 */

import { aiConfig } from './aiConfig'
import { AIGateway } from './gateway/AIGateway'
import { DistributedCacheManager } from '../cache/DistributedCacheManager'

export interface BiologyQuery {
  id: string
  studentId: string
  question: string
  topic?: string
  subtopic?: string
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  grade: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  queryType: 'concept' | 'problem' | 'diagram' | 'memory' | 'application'
  context?: {
    previousQuestions: string[]
    currentChapter?: string
    examDate?: Date
    weakTopics?: string[]
  }
  timestamp: Date
}

export interface BiologyResponse {
  id: string
  queryId: string
  answer: string
  explanation: string
  visualAids?: {
    diagrams: string[]
    flowcharts: string[]
    mnemonics: string[]
  }
  relatedTopics: string[]
  practiceQuestions: string[]
  studyTips: string[]
  examRelevance: {
    importance: 'high' | 'medium' | 'low'
    examWeight: number
    frequencyInExams: number
    yearlyTrends: string[]
  }
  followUpSuggestions: string[]
  estimatedStudyTime: number // minutes
  difficulty: number // 1-10
  confidence: number // AI confidence 0-1
  sources: string[]
  timestamp: Date
}

export interface BiologyKnowledgeBase {
  topics: Map<string, TopicDetails>
  concepts: Map<string, ConceptDetails>
  examPatterns: Map<string, ExamPattern>
  commonMistakes: Map<string, string[]>
  mnemonics: Map<string, string>
  diagrams: Map<string, DiagramData>
}

interface TopicDetails {
  name: string
  curriculum: string[]
  grade: string[]
  prerequisites: string[]
  subtopics: string[]
  importanceScore: number
  examFrequency: number
  averageDifficulty: number
  commonQuestions: string[]
  keyPoints: string[]
  diagrams: string[]
  realWorldApplications: string[]
}

interface ConceptDetails {
  name: string
  definition: string
  explanation: string
  examples: string[]
  analogies: string[]
  commonMistakes: string[]
  mnemonics: string[]
  relatedConcepts: string[]
  practiceQuestions: string[]
  difficulty: number
}

interface ExamPattern {
  exam: string
  topicWeights: Map<string, number>
  questionTypes: Map<string, number>
  difficultyDistribution: Map<string, number>
  trendingTopics: string[]
  frequentlyAsked: string[]
}

interface DiagramData {
  title: string
  description: string
  components: string[]
  labels: string[]
  processes: string[]
  mnemonics: string[]
  examRelevance: number
}

class BiologyTutorEngine {
  private static instance: BiologyTutorEngine
  private aiGateway: AIGateway
  private cache: DistributedCacheManager
  private knowledgeBase: BiologyKnowledgeBase
  private responseHistory: Map<string, BiologyResponse[]> = new Map()

  constructor() {
    this.aiGateway = new AIGateway()
    this.cache = new DistributedCacheManager()
    this.knowledgeBase = this.initializeKnowledgeBase()
  }

  static getInstance(): BiologyTutorEngine {
    if (!BiologyTutorEngine.instance) {
      BiologyTutorEngine.instance = new BiologyTutorEngine()
    }
    return BiologyTutorEngine.instance
  }

  private initializeKnowledgeBase(): BiologyKnowledgeBase {
    return {
      topics: new Map([
        ['cell-biology', {
          name: 'Cell Biology',
          curriculum: ['NEET', 'CBSE', 'ICSE', 'IB'],
          grade: ['11', '12'],
          prerequisites: ['basic-chemistry'],
          subtopics: ['cell-structure', 'cell-division', 'cell-cycle', 'biomolecules'],
          importanceScore: 9.5,
          examFrequency: 95,
          averageDifficulty: 7.2,
          commonQuestions: [
            'Difference between prokaryotic and eukaryotic cells',
            'Phases of mitosis and meiosis',
            'Structure and function of cell organelles'
          ],
          keyPoints: [
            'Cell is the basic unit of life',
            'Mitochondria is powerhouse of cell',
            'DNA replication occurs in S phase'
          ],
          diagrams: ['cell-structure', 'mitosis-phases', 'meiosis-stages'],
          realWorldApplications: ['Cancer research', 'Genetic engineering', 'Stem cell therapy']
        }],
        ['genetics', {
          name: 'Genetics',
          curriculum: ['NEET', 'CBSE', 'ICSE', 'IB'],
          grade: ['12'],
          prerequisites: ['cell-biology', 'molecular-biology'],
          subtopics: ['mendelian-genetics', 'molecular-genetics', 'population-genetics'],
          importanceScore: 9.8,
          examFrequency: 98,
          averageDifficulty: 8.5,
          commonQuestions: [
            'Monohybrid and dihybrid crosses',
            'DNA replication mechanism',
            'Gene expression and regulation'
          ],
          keyPoints: [
            'Genes determine traits',
            'DNA is double helix structure',
            'Central dogma: DNA → RNA → Protein'
          ],
          diagrams: ['dna-structure', 'replication-fork', 'transcription-translation'],
          realWorldApplications: ['Genetic counseling', 'Gene therapy', 'GMO crops']
        }]
      ]),
      concepts: new Map(),
      examPatterns: new Map(),
      commonMistakes: new Map(),
      mnemonics: new Map(),
      diagrams: new Map()
    }
  }

  async resolveDoubt(query: BiologyQuery): Promise<BiologyResponse> {
    try {
      // Check cache first for similar queries
      const cacheKey = this.generateCacheKey(query)
      const cachedResponse = await this.cache.get(cacheKey)

      if (cachedResponse) {
        console.log('🎯 Returning cached biology response')
        return JSON.parse(cachedResponse)
      }

      // Analyze query and determine best approach
      const analysisResult = await this.analyzeQuery(query)

      // Generate comprehensive response
      const response = await this.generateBiologyResponse(query, analysisResult)

      // Cache the response
      await this.cache.set(cacheKey, JSON.stringify(response), 3600) // 1 hour cache

      // Store in history for learning
      this.addToHistory(query.studentId, response)

      return response

    } catch (error) {
      console.error('❌ Biology tutor error:', error)
      return this.generateFallbackResponse(query)
    }
  }

  private async analyzeQuery(query: BiologyQuery): Promise<any> {
    const analysisPrompt = `
    Analyze this Biology student query:

    Question: "${query.question}"
    Topic: ${query.topic || 'Unknown'}
    Curriculum: ${query.curriculum}
    Grade: ${query.grade}
    Difficulty: ${query.difficulty}
    Query Type: ${query.queryType}

    Provide analysis in JSON format:
    {
      "topicIdentified": "string",
      "subtopicsInvolved": ["string"],
      "difficultyLevel": 1-10,
      "queryIntent": "concept_clarification | problem_solving | exam_preparation | diagram_explanation",
      "responseStrategy": "detailed_explanation | step_by_step | visual_aid | mnemonic",
      "examRelevance": "high | medium | low",
      "prerequisites": ["string"],
      "timeEstimate": number
    }
    `

    const analysisResult = await this.aiGateway.generateResponse({
      prompt: analysisPrompt,
      provider: 'anthropic',
      model: 'fast',
      temperature: 0.3,
      maxTokens: 1000
    })

    try {
      return JSON.parse(analysisResult)
    } catch {
      return {
        topicIdentified: query.topic || 'general',
        difficultyLevel: 5,
        queryIntent: 'concept_clarification',
        responseStrategy: 'detailed_explanation',
        examRelevance: 'medium',
        timeEstimate: 15
      }
    }
  }

  private async generateBiologyResponse(query: BiologyQuery, analysis: any): Promise<BiologyResponse> {
    const systemPrompt = `You are Dr. Bio, an expert Biology teacher specializing in ${query.curriculum} curriculum for Grade ${query.grade}.

    Student Profile:
    - Curriculum: ${query.curriculum}
    - Grade: ${query.grade}
    - Question Type: ${query.queryType}
    - Difficulty Level: ${query.difficulty}

    Your expertise:
    - 15+ years teaching Biology
    - 94.2% NEET success rate
    - Expert in visual learning and mnemonics
    - Known for making complex concepts simple

    Guidelines:
    1. Always start with a brief, clear answer
    2. Provide detailed explanation with examples
    3. Use analogies and real-world connections
    4. Include mnemonics for memory topics
    5. Suggest practice questions
    6. Mention exam relevance and tips
    7. Use encouraging, student-friendly tone
    8. Break complex topics into digestible parts
    `

    const userPrompt = `
    Student Question: "${query.question}"

    Context:
    - Topic: ${query.topic || 'General Biology'}
    - Previous questions: ${query.context?.previousQuestions?.join(', ') || 'None'}
    - Current chapter: ${query.context?.currentChapter || 'Unknown'}
    - Weak topics: ${query.context?.weakTopics?.join(', ') || 'None'}

    Please provide a comprehensive response that includes:
    1. Direct answer to the question
    2. Detailed explanation with examples
    3. Visual descriptions of any diagrams needed
    4. Memory techniques or mnemonics
    5. Related topics to explore
    6. Practice questions for reinforcement
    7. Study tips specific to this topic
    8. Exam preparation guidance
    9. Common mistakes to avoid
    10. Real-world applications

    Format your response to be student-friendly and engaging.
    `

    const aiResponse = await this.aiGateway.generateResponse({
      prompt: `${systemPrompt}\n\n${userPrompt}`,
      provider: aiConfig.getBestProvider(),
      model: 'default',
      temperature: 0.7,
      maxTokens: 2000
    })

    // Parse and structure the response
    const response: BiologyResponse = {
      id: `bio_response_${Date.now()}`,
      queryId: query.id,
      answer: this.extractAnswer(aiResponse),
      explanation: this.extractExplanation(aiResponse),
      visualAids: {
        diagrams: this.extractDiagrams(query.topic || ''),
        flowcharts: this.extractFlowcharts(query.topic || ''),
        mnemonics: this.extractMnemonics(aiResponse)
      },
      relatedTopics: this.getRelatedTopics(query.topic || ''),
      practiceQuestions: this.generatePracticeQuestions(query),
      studyTips: this.extractStudyTips(aiResponse),
      examRelevance: {
        importance: analysis.examRelevance || 'medium',
        examWeight: this.getExamWeight(query.topic || '', query.curriculum),
        frequencyInExams: this.getExamFrequency(query.topic || '', query.curriculum),
        yearlyTrends: []
      },
      followUpSuggestions: this.generateFollowUpSuggestions(query, analysis),
      estimatedStudyTime: analysis.timeEstimate || 15,
      difficulty: analysis.difficultyLevel || 5,
      confidence: 0.85,
      sources: ['NCERT', 'Campbell Biology', 'Lehninger Biochemistry'],
      timestamp: new Date()
    }

    return response
  }

  private generateCacheKey(query: BiologyQuery): string {
    return `bio_query_${query.curriculum}_${query.grade}_${query.topic}_${Buffer.from(query.question).toString('base64').substring(0, 20)}`
  }

  private extractAnswer(aiResponse: string): string {
    const lines = aiResponse.split('\n')
    return lines.find(line => line.trim() && !line.startsWith('#'))?.trim() || aiResponse.substring(0, 200)
  }

  private extractExplanation(aiResponse: string): string {
    return aiResponse
  }

  private extractDiagrams(topic: string): string[] {
    const topicData = this.knowledgeBase.topics.get(topic.toLowerCase())
    return topicData?.diagrams || []
  }

  private extractFlowcharts(topic: string): string[] {
    // Map topics to relevant flowcharts
    const flowchartMap: Record<string, string[]> = {
      'cell-division': ['mitosis-flowchart', 'meiosis-flowchart'],
      'photosynthesis': ['light-reaction-flowchart', 'calvin-cycle-flowchart'],
      'respiration': ['glycolysis-flowchart', 'krebs-cycle-flowchart']
    }
    return flowchartMap[topic.toLowerCase()] || []
  }

  private extractMnemonics(aiResponse: string): string[] {
    const mnemonics: string[] = []
    const lines = aiResponse.split('\n')

    for (const line of lines) {
      if (line.toLowerCase().includes('mnemonic') || line.toLowerCase().includes('remember')) {
        mnemonics.push(line.trim())
      }
    }

    return mnemonics
  }

  private getRelatedTopics(topic: string): string[] {
    const topicData = this.knowledgeBase.topics.get(topic.toLowerCase())
    return topicData?.subtopics || []
  }

  private generatePracticeQuestions(query: BiologyQuery): string[] {
    const baseQuestions = [
      `What are the key features of ${query.topic}?`,
      `Explain the significance of ${query.topic} in Biology.`,
      `Compare and contrast different aspects of ${query.topic}.`,
      `What are the practical applications of ${query.topic}?`
    ]

    return baseQuestions.map(q => q.replace('${query.topic}', query.topic || 'this concept'))
  }

  private extractStudyTips(aiResponse: string): string[] {
    const tips: string[] = []
    const lines = aiResponse.split('\n')

    for (const line of lines) {
      if (line.toLowerCase().includes('tip') || line.toLowerCase().includes('study') || line.toLowerCase().includes('remember')) {
        tips.push(line.trim())
      }
    }

    return tips.length > 0 ? tips : [
      'Create visual diagrams to understand the concept',
      'Practice with past year questions',
      'Make flashcards for key terms',
      'Teach the concept to someone else'
    ]
  }

  private getExamWeight(topic: string, curriculum: string): number {
    const weights: Record<string, Record<string, number>> = {
      'NEET': {
        'cell-biology': 15,
        'genetics': 20,
        'ecology': 10,
        'human-physiology': 25
      },
      'CBSE': {
        'cell-biology': 12,
        'genetics': 18,
        'ecology': 15,
        'human-physiology': 20
      }
    }

    return weights[curriculum]?.[topic.toLowerCase()] || 10
  }

  private getExamFrequency(topic: string, curriculum: string): number {
    const topicData = this.knowledgeBase.topics.get(topic.toLowerCase())
    return topicData?.examFrequency || 50
  }

  private generateFollowUpSuggestions(query: BiologyQuery, analysis: any): string[] {
    return [
      'Would you like me to explain any diagrams related to this topic?',
      'Do you want practice questions on this concept?',
      'Should I explain the exam pattern for this topic?',
      'Would you like mnemonics to remember key points?',
      'Do you need help with related mathematical calculations?'
    ]
  }

  private addToHistory(studentId: string, response: BiologyResponse): void {
    if (!this.responseHistory.has(studentId)) {
      this.responseHistory.set(studentId, [])
    }

    const history = this.responseHistory.get(studentId)!
    history.push(response)

    // Keep only last 50 responses
    if (history.length > 50) {
      history.splice(0, history.length - 50)
    }
  }

  private generateFallbackResponse(query: BiologyQuery): BiologyResponse {
    return {
      id: `fallback_${Date.now()}`,
      queryId: query.id,
      answer: "I'm having trouble processing your question right now. Let me help you in a different way.",
      explanation: "Please try rephrasing your question or contact our human tutors for immediate assistance.",
      relatedTopics: [],
      practiceQuestions: [],
      studyTips: [
        'Try breaking down complex questions into smaller parts',
        'Use specific Biology terminology in your questions',
        'Mention the chapter or topic you\'re studying'
      ],
      examRelevance: {
        importance: 'medium',
        examWeight: 10,
        frequencyInExams: 50,
        yearlyTrends: []
      },
      followUpSuggestions: [
        'Can you rephrase your question?',
        'Would you like to speak with a human tutor?',
        'Do you want to explore related topics?'
      ],
      estimatedStudyTime: 10,
      difficulty: 5,
      confidence: 0.5,
      sources: [],
      timestamp: new Date()
    }
  }

  // Performance tracking methods
  async getStudentProgress(studentId: string): Promise<any> {
    const history = this.responseHistory.get(studentId) || []

    return {
      totalQueries: history.length,
      topicsExplored: [...new Set(history.map(r => r.queryId))],
      averageDifficulty: history.reduce((sum, r) => sum + r.difficulty, 0) / history.length,
      strongTopics: [],
      weakTopics: [],
      recommendedStudyTime: 30,
      progressScore: 0.75
    }
  }

  async generateStudyPlan(studentId: string, targetExam: string, timeframe: number): Promise<any> {
    const progress = await this.getStudentProgress(studentId)

    return {
      studentId,
      targetExam,
      duration: timeframe,
      dailyStudyTime: 2, // hours
      weeklyPlan: [],
      monthlyGoals: [],
      practiceSchedule: [],
      revisionPlan: [],
      mockTestSchedule: []
    }
  }
}

export const biologyTutor = BiologyTutorEngine.getInstance()
export default biologyTutor