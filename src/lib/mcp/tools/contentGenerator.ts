/**
 * Content Generator Agent - AI-Powered Biology Content Creation
 * Generates questions, explanations, and educational content
 * Adaptive difficulty based on student performance
 */

import { Anthropic } from '@anthropic-ai/sdk'
import Redis from 'ioredis'
import type { EducationalAgent, StudentQuery, AgentResponse, NEETCurriculum } from '../types'
import { AgentType, AgentCapability, DifficultyLevel, ExamType } from '../types'

interface AgentConfig {
  anthropic: Anthropic
  redis: Redis
  securityManager: any
  auditLogger: any
}

interface GeneratedQuestion {
  id: string
  type: 'mcq' | 'short_answer' | 'long_answer' | 'assertion_reason'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: DifficultyLevel
  topic: string
  subtopic: string
  neetWeightage: number
  estimatedTime: number // seconds
  keywords: string[]
}

interface ContentRequest {
  type: 'question' | 'explanation' | 'summary' | 'mnemonics' | 'diagram'
  topic: string
  difficulty: DifficultyLevel
  examType: ExamType
  count?: number
  format?: string
  studentLevel?: string
  previousPerformance?: any
}

/**
 * ContentGeneratorAgent creates personalized Biology educational content
 * Features: NEET-aligned questions, adaptive difficulty, detailed explanations
 */
export class ContentGeneratorAgent implements EducationalAgent {
  public readonly id = 'content-generator-agent'
  public readonly name = 'Cerebrum Content Generator'
  public readonly type = AgentType.CONTENT_GENERATOR
  public readonly capabilities = [
    AgentCapability.QUESTION_GENERATION,
    AgentCapability.CURRICULUM_MAPPING,
    AgentCapability.PERSONALIZATION,
  ]
  public isActive = true

  private anthropic: Anthropic
  private redis: Redis
  private securityManager: any
  private auditLogger: any

  // NEET Biology Curriculum Database
  private neetCurriculum: NEETCurriculum
  private questionBank: Map<string, GeneratedQuestion[]> = new Map()
  private topicDifficulty: Map<string, DifficultyLevel> = new Map()
  private studentPerformance: Map<string, any> = new Map()

  // Content templates
  private questionTemplates = {
    mcq: [
      'Multiple choice question with 4 options',
      'Assertion-Reason type question',
      'Statement-based MCQ with multiple correct answers',
      'Diagram-based identification question',
    ],
    shortAnswer: [
      'Define and explain the concept',
      'Compare and contrast two concepts',
      'Explain the process step-by-step',
      'Describe the significance/importance',
    ],
    longAnswer: [
      'Detailed explanation with examples',
      'Process description with diagrams',
      'Comparative analysis',
      'Application-based discussion',
    ],
  }

  constructor(config: AgentConfig) {
    this.anthropic = config.anthropic
    this.redis = config.redis
    this.securityManager = config.securityManager
    this.auditLogger = config.auditLogger

    this.initializeNEETCurriculum()
    this.loadQuestionBank()
    this.loadStudentPerformance()
  }

  /**
   * Handle content generation requests
   */
  async handleRequest(query: StudentQuery): Promise<AgentResponse> {
    const startTime = Date.now()

    try {
      // Parse content request from query
      const contentRequest = this.parseContentRequest(query)

      // Log the content generation request
      await this.auditLogger.logAction('content_generation', {
        studentId: query.studentId,
        requestType: contentRequest.type,
        topic: contentRequest.topic,
        difficulty: contentRequest.difficulty,
        count: contentRequest.count,
      })

      let generatedContent: any
      let confidence: number

      switch (contentRequest.type) {
        case 'question':
          generatedContent = await this.generateQuestions(contentRequest, query.studentId)
          confidence = 0.92
          break
        case 'explanation':
          generatedContent = await this.generateExplanation(contentRequest)
          confidence = 0.88
          break
        case 'summary':
          generatedContent = await this.generateSummary(contentRequest)
          confidence = 0.85
          break
        case 'mnemonics':
          generatedContent = await this.generateMnemonics(contentRequest)
          confidence = 0.8
          break
        case 'diagram':
          generatedContent = await this.generateDiagramDescription(contentRequest)
          confidence = 0.75
          break
        default:
          generatedContent = await this.generateGeneralContent(contentRequest)
          confidence = 0.7
      }

      // Cache generated content
      await this.cacheGeneratedContent(contentRequest, generatedContent)

      // Update student performance tracking
      await this.updateStudentInteraction(query.studentId, contentRequest)

      const processingTime = Date.now() - startTime

      return {
        success: true,
        data: {
          content: generatedContent,
          contentType: contentRequest.type,
          topic: contentRequest.topic,
          difficulty: contentRequest.difficulty,
          examRelevance: this.getExamRelevance(contentRequest.topic),
          estimatedStudyTime: this.calculateStudyTime(generatedContent),
          relatedTopics: this.getRelatedTopics(contentRequest.topic),
          nextRecommendations: await this.getNextRecommendations(query.studentId, contentRequest),
        },
        message: `Generated ${contentRequest.type} content for ${contentRequest.topic}`,
        timestamp: new Date(),
        processingTime,
        agent: {
          id: this.id,
          name: this.name,
          type: this.type,
          version: '1.0.0',
        },
        confidence,
      }
    } catch (error) {
      console.error('Error in ContentGeneratorAgent:', error)

      await this.auditLogger.logError('content_generation_error', {
        studentId: query.studentId,
        query: query.query,
        error: error.message,
      })

      return {
        success: false,
        message:
          'I encountered an issue while generating content. Please try again with a more specific request.',
        timestamp: new Date(),
        processingTime: Date.now() - startTime,
        agent: {
          id: this.id,
          name: this.name,
          type: this.type,
          version: '1.0.0',
        },
        confidence: 0,
      }
    }
  }

  /**
   * Generate NEET-style Biology questions with adaptive difficulty
   */
  private async generateQuestions(
    request: ContentRequest,
    studentId: string
  ): Promise<GeneratedQuestion[]> {
    const studentPerformance = this.studentPerformance.get(studentId)
    const adaptedDifficulty = this.adaptDifficultyBasedOnPerformance(
      request.difficulty,
      studentPerformance
    )

    const prompt = `
Generate ${request.count || 5} high-quality NEET Biology questions for:

Topic: ${request.topic}
Difficulty Level: ${adaptedDifficulty}
Exam Type: ${request.examType}
Student Level: ${request.studentLevel || 'Class 12'}

Requirements:
1. Follow NEET question pattern exactly
2. Include Multiple Choice Questions (4 options each)
3. Cover different aspects of the topic
4. Progressive difficulty within the set
5. Include at least one application-based question
6. Provide detailed explanations for each answer

For each question, provide:
- Question stem (clear and concise)
- Four options (a, b, c, d)
- Correct answer with letter
- Detailed explanation (100-150 words)
- Topic relevance to NEET
- Estimated solving time
- Keywords/concepts tested

Question types to include:
- Conceptual understanding (40%)
- Application-based (30%)
- Factual recall (20%)
- Analytical/reasoning (10%)

Make questions that test deep understanding, not just memorization.

Format each question as:
Q1. [Question stem]
(a) Option A
(b) Option B
(c) Option C
(d) Option D

Answer: (correct letter)
Explanation: [detailed explanation]
NEET Relevance: [importance and frequency]
Time: [estimated seconds]
Keywords: [key concepts]

---
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        const questions = this.parseGeneratedQuestions(content.text, request)

        // Store questions in bank for future use
        this.storeQuestionsInBank(request.topic, questions)

        return questions
      }
    } catch (error) {
      console.error('Error generating questions:', error)
    }

    // Fallback questions
    return this.getFallbackQuestions(request)
  }

  /**
   * Generate detailed explanations for Biology concepts
   */
  private async generateExplanation(request: ContentRequest): Promise<any> {
    const prompt = `
Create a comprehensive explanation for the Biology topic: ${request.topic}

Target audience: NEET aspirants (${request.studentLevel || 'Class 12'})
Difficulty level: ${request.difficulty}
Exam focus: ${request.examType}

Structure the explanation as:

1. CONCEPT OVERVIEW (2-3 lines)
   - Brief definition
   - Why it's important for NEET

2. DETAILED EXPLANATION
   - Step-by-step breakdown
   - Use simple language with scientific terms
   - Include relevant examples
   - Mention real-life applications

3. KEY POINTS TO REMEMBER
   - Bullet points of crucial facts
   - Memory aids/mnemonics if applicable
   - Common misconceptions to avoid

4. NEET EXAM PERSPECTIVE
   - Typical question patterns
   - Weightage and frequency
   - Important sub-topics for revision

5. PRACTICE TIPS
   - How to approach questions on this topic
   - Related topics to study together
   - Recommended study time

6. QUICK REVISION NOTES
   - One-liner facts
   - Important values/formulas
   - Diagram references

Make it engaging and easy to understand. Use examples that students can relate to.
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        return {
          explanation: content.text,
          readingTime: Math.ceil(content.text.length / 200), // words per minute
          keyPoints: this.extractKeyPoints(content.text),
          relatedConcepts: this.getRelatedTopics(request.topic),
          practiceQuestions: await this.generateQuickQuestions(request.topic, 3),
        }
      }
    } catch (error) {
      console.error('Error generating explanation:', error)
    }

    return {
      explanation: `Here's what you need to know about ${request.topic}...`,
      readingTime: 5,
      keyPoints: [],
      relatedConcepts: [],
      practiceQuestions: [],
    }
  }

  /**
   * Generate topic summaries for quick revision
   */
  private async generateSummary(request: ContentRequest): Promise<any> {
    const prompt = `
Create a concise summary for NEET Biology topic: ${request.topic}

Requirements:
- One-page summary (300-400 words)
- Bullet points for easy scanning
- Include all NEET-relevant information
- Highlight high-weightage sub-topics
- Add memory tricks where applicable

Format:
📚 TOPIC: ${request.topic}
🎯 NEET WEIGHTAGE: [marks/importance]

🔑 KEY CONCEPTS:
• [Point 1]
• [Point 2]
• [Point 3]

💡 IMPORTANT FACTS:
• [Fact 1]
• [Fact 2]

🧠 MEMORY TRICKS:
• [Mnemonic/trick 1]

📊 EXAM PATTERN:
• Question types
• Difficulty level
• Common mistakes

⚡ QUICK REVISION:
• [One-liner 1]
• [One-liner 2]

Make it perfect for last-minute revision before NEET.
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        return {
          summary: content.text,
          wordCount: content.text.split(' ').length,
          readingTime: Math.ceil(content.text.split(' ').length / 200),
          keyFacts: this.extractKeyFacts(content.text),
          memoryTricks: this.extractMemoryTricks(content.text),
          revisionTime: 5, // minutes
        }
      }
    } catch (error) {
      console.error('Error generating summary:', error)
    }

    return {
      summary: `Summary for ${request.topic}`,
      wordCount: 0,
      readingTime: 0,
      keyFacts: [],
      memoryTricks: [],
      revisionTime: 5,
    }
  }

  /**
   * Generate memory aids and mnemonics
   */
  private async generateMnemonics(request: ContentRequest): Promise<any> {
    const prompt = `
Create effective memory aids for NEET Biology topic: ${request.topic}

Generate:
1. ACRONYM-BASED MNEMONICS
   - For lists, sequences, classifications
   - Easy to remember phrases

2. VISUAL MEMORY AIDS
   - Associations with familiar objects
   - Story-based memory techniques

3. RHYMES AND PHRASES
   - Catchy phrases for facts
   - Number associations

4. CONCEPT CONNECTIONS
   - Link to already known concepts
   - Analogies with everyday life

5. PATTERN RECOGNITION
   - Logical sequences
   - Categorization tricks

Make them fun, memorable, and scientifically accurate.
Focus on high-weightage information for NEET.

Example format:
🧠 MNEMONIC: "King Philip Came Over For Good Soup"
📚 HELPS REMEMBER: Taxonomic hierarchy (Kingdom, Phylum, Class, Order, Family, Genus, Species)
💡 USAGE TIP: [How to use it effectively]
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1200,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        return {
          mnemonics: content.text,
          memoryAids: this.parseMnemonics(content.text),
          effectiveness: 'high',
          practiceMethod: 'Repeat 3 times daily for 1 week',
        }
      }
    } catch (error) {
      console.error('Error generating mnemonics:', error)
    }

    return {
      mnemonics: `Memory aids for ${request.topic}`,
      memoryAids: [],
      effectiveness: 'medium',
      practiceMethod: 'Regular practice',
    }
  }

  /**
   * Generate diagram descriptions and explanations
   */
  private async generateDiagramDescription(request: ContentRequest): Promise<any> {
    const prompt = `
Create detailed diagram descriptions for Biology topic: ${request.topic}

For each important diagram:

1. DIAGRAM TITLE
2. COMPONENTS IDENTIFICATION
   - Label each part clearly
   - Explain the function of each component

3. PROCESS FLOW (if applicable)
   - Step-by-step explanation
   - Arrows and connections meaning

4. NEET RELEVANCE
   - How this diagram appears in questions
   - What students typically get wrong

5. DRAWING TIPS
   - How to draw/remember the diagram
   - Key features to never miss

6. RELATED DIAGRAMS
   - Connections to other topics
   - Comparative diagrams

Focus on diagrams that frequently appear in NEET questions.
Make descriptions clear enough for students to visualize without seeing the actual diagram.
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        return {
          descriptions: content.text,
          diagramCount: this.countDiagrams(content.text),
          complexity: request.difficulty,
          studyTime: 15, // minutes to understand
          practiceNeeded: true,
        }
      }
    } catch (error) {
      console.error('Error generating diagram descriptions:', error)
    }

    return {
      descriptions: `Diagram explanations for ${request.topic}`,
      diagramCount: 0,
      complexity: request.difficulty,
      studyTime: 10,
      practiceNeeded: true,
    }
  }

  /**
   * Generate general educational content
   */
  private async generateGeneralContent(request: ContentRequest): Promise<any> {
    return {
      content: `Educational content for ${request.topic}`,
      type: 'general',
      difficulty: request.difficulty,
      studyTime: 20,
    }
  }

  // Helper methods

  private parseContentRequest(query: StudentQuery): ContentRequest {
    const text = query.query.toLowerCase()

    // Determine content type
    let type: ContentRequest['type'] = 'explanation'
    if (text.includes('question') || text.includes('mcq') || text.includes('practice')) {
      type = 'question'
    } else if (text.includes('summary') || text.includes('revision')) {
      type = 'summary'
    } else if (text.includes('mnemonic') || text.includes('remember') || text.includes('trick')) {
      type = 'mnemonics'
    } else if (text.includes('diagram') || text.includes('draw') || text.includes('label')) {
      type = 'diagram'
    }

    // Extract topic
    const topic = query.context.topic?.name || this.extractTopicFromQuery(query.query)

    // Extract count
    const countMatch = query.query.match(/(\d+)\s*(?:question|mcq|problem)/i)
    const count = countMatch ? parseInt(countMatch[1]) : 5

    return {
      type,
      topic,
      difficulty: query.context.difficulty || DifficultyLevel.INTERMEDIATE,
      examType: query.context.examType || ExamType.NEET,
      count,
      studentLevel: query.context.studentLevel,
    }
  }

  private extractTopicFromQuery(query: string): string {
    // Simple topic extraction - can be enhanced with NLP
    const commonTopics = [
      'photosynthesis',
      'respiration',
      'digestion',
      'circulation',
      'nervous system',
      'hormones',
      'reproduction',
      'genetics',
      'evolution',
      'ecology',
      'cell division',
      'protein synthesis',
    ]

    for (const topic of commonTopics) {
      if (query.toLowerCase().includes(topic)) {
        return topic
      }
    }

    return 'general biology'
  }

  private adaptDifficultyBasedOnPerformance(
    requestedDifficulty: DifficultyLevel,
    performance: any
  ): DifficultyLevel {
    if (!performance) return requestedDifficulty

    const accuracyRate = performance.overallAccuracy || 70

    if (accuracyRate > 85) {
      // High performer - can handle advanced content
      return requestedDifficulty === DifficultyLevel.BASIC
        ? DifficultyLevel.INTERMEDIATE
        : DifficultyLevel.ADVANCED
    } else if (accuracyRate < 60) {
      // Struggling student - provide easier content
      return DifficultyLevel.BASIC
    }

    return requestedDifficulty
  }

  private parseGeneratedQuestions(text: string, request: ContentRequest): GeneratedQuestion[] {
    // Parse AI-generated questions into structured format
    const questions: GeneratedQuestion[] = []
    const questionBlocks = text.split('---').filter((block) => block.trim())

    questionBlocks.forEach((block, index) => {
      const question = this.parseQuestionBlock(block, index, request)
      if (question) {
        questions.push(question)
      }
    })

    return questions
  }

  private parseQuestionBlock(
    block: string,
    index: number,
    request: ContentRequest
  ): GeneratedQuestion | null {
    try {
      // Extract question components using regex
      const questionMatch = block.match(/Q\d+\.\s*([\s\S]+?)(?=\(a\))/)
      const optionsMatch = block.match(
        /\(a\)\s*([\s\S]+?)\n\(b\)\s*([\s\S]+?)\n\(c\)\s*([\s\S]+?)\n\(d\)\s*([\s\S]+?)(?=Answer:)/
      )
      const answerMatch = block.match(/Answer:\s*\(([abcd])\)/)
      const explanationMatch = block.match(
        /Explanation:\s*([\s\S]+?)(?=NEET Relevance:|Time:|Keywords:|$)/
      )

      if (!questionMatch || !optionsMatch || !answerMatch) {
        return null
      }

      return {
        id: `q_${Date.now()}_${index}`,
        type: 'mcq',
        question: questionMatch[1].trim(),
        options: [
          optionsMatch[1].trim(),
          optionsMatch[2].trim(),
          optionsMatch[3].trim(),
          optionsMatch[4].trim(),
        ],
        correctAnswer: answerMatch[1],
        explanation: explanationMatch ? explanationMatch[1].trim() : '',
        difficulty: request.difficulty,
        topic: request.topic,
        subtopic: '',
        neetWeightage: 8, // Default weightage
        estimatedTime: 60, // Default 60 seconds
        keywords: [],
      }
    } catch (error) {
      console.error('Error parsing question block:', error)
      return null
    }
  }

  private getFallbackQuestions(request: ContentRequest): GeneratedQuestion[] {
    return [
      {
        id: `fallback_${Date.now()}`,
        type: 'mcq',
        question: `Which of the following is most important for understanding ${request.topic}?`,
        options: [
          'Basic concept understanding',
          'Memorizing all facts',
          'Practice with examples',
          'All of the above',
        ],
        correctAnswer: 'd',
        explanation: `Understanding ${request.topic} requires a combination of conceptual clarity, factual knowledge, and practical application.`,
        difficulty: request.difficulty,
        topic: request.topic,
        subtopic: 'general',
        neetWeightage: 5,
        estimatedTime: 45,
        keywords: [request.topic],
      },
    ]
  }

  private async generateQuickQuestions(topic: string, count: number): Promise<any[]> {
    // Generate quick practice questions
    return []
  }

  private extractKeyPoints(text: string): string[] {
    const lines = text.split('\n')
    return lines
      .filter((line) => line.trim().startsWith('•') || line.trim().startsWith('-'))
      .map((line) => line.replace(/^[•-]\s*/, '').trim())
      .slice(0, 10) // Top 10 key points
  }

  private extractKeyFacts(text: string): string[] {
    return this.extractKeyPoints(text)
  }

  private extractMemoryTricks(text: string): string[] {
    const lines = text.split('\n')
    return lines
      .filter(
        (line) =>
          line.toLowerCase().includes('mnemonic') ||
          line.toLowerCase().includes('remember') ||
          line.toLowerCase().includes('trick')
      )
      .map((line) => line.trim())
      .slice(0, 5)
  }

  private parseMnemonics(text: string): any[] {
    // Parse structured mnemonics from text
    return []
  }

  private countDiagrams(text: string): number {
    const diagramKeywords = ['diagram', 'figure', 'illustration', 'chart']
    return diagramKeywords.reduce((count, keyword) => {
      const matches = text.toLowerCase().match(new RegExp(keyword, 'g'))
      return count + (matches ? matches.length : 0)
    }, 0)
  }

  private storeQuestionsInBank(topic: string, questions: GeneratedQuestion[]): void {
    const existing = this.questionBank.get(topic) || []
    this.questionBank.set(topic, [...existing, ...questions])
  }

  private getExamRelevance(topic: string): any {
    return {
      neetWeightage: 8,
      frequency: 'high',
      difficulty: 'moderate',
      expectedQuestions: 2,
    }
  }

  private calculateStudyTime(content: any): number {
    // Calculate estimated study time in minutes
    if (typeof content === 'string') {
      return Math.ceil(content.length / 1000) // Rough estimate
    }
    return 15 // Default 15 minutes
  }

  private getRelatedTopics(topic: string): string[] {
    // Topic relationship mapping
    const relationships: Record<string, string[]> = {
      photosynthesis: ['respiration', 'chloroplast', 'plant physiology'],
      respiration: ['photosynthesis', 'mitochondria', 'energy metabolism'],
      genetics: ['heredity', 'dna', 'protein synthesis', 'evolution'],
      // Add more relationships
    }

    return relationships[topic.toLowerCase()] || []
  }

  private async getNextRecommendations(
    studentId: string,
    request: ContentRequest
  ): Promise<string[]> {
    const performance = this.studentPerformance.get(studentId)

    const recommendations = [
      `Practice more questions on ${request.topic}`,
      'Review related concepts',
      'Take a topic-specific mock test',
    ]

    if (performance && performance.overallAccuracy < 70) {
      recommendations.unshift('Focus on basic concept building')
    }

    return recommendations
  }

  private async cacheGeneratedContent(request: ContentRequest, content: any): Promise<void> {
    const cacheKey = `content:${request.type}:${Buffer.from(request.topic).toString('base64')}`
    await this.redis.setex(
      cacheKey,
      3600,
      JSON.stringify({
        content,
        generated: new Date(),
        request,
      })
    )
  }

  private async updateStudentInteraction(
    studentId: string,
    request: ContentRequest
  ): Promise<void> {
    const key = `student_interaction:${studentId}`
    const interactions = await this.redis.get(key)
    const data = interactions ? JSON.parse(interactions) : { requests: [] }

    data.requests.push({
      type: request.type,
      topic: request.topic,
      timestamp: new Date(),
    })

    // Keep only last 50 interactions
    if (data.requests.length > 50) {
      data.requests = data.requests.slice(-50)
    }

    await this.redis.setex(key, 86400, JSON.stringify(data)) // 24 hours
  }

  private initializeNEETCurriculum(): void {
    // Initialize NEET curriculum data
    this.neetCurriculum = {
      totalMarks: 720,
      biologyMarks: 360,
      totalQuestions: 200,
      biologyQuestions: 90,
      units: [],
      syllabus: {
        class11Topics: [],
        class12Topics: [],
        deletedTopics: [],
        addedTopics: [],
        lastUpdated: new Date(),
      },
    }
  }

  private async loadQuestionBank(): Promise<void> {
    // Load existing question bank from Redis
    try {
      const keys = await this.redis.keys('question_bank:*')
      for (const key of keys) {
        const topic = key.split(':')[1]
        const questions = await this.redis.get(key)
        if (questions) {
          this.questionBank.set(topic, JSON.parse(questions))
        }
      }
    } catch (error) {
      console.error('Error loading question bank:', error)
    }
  }

  private async loadStudentPerformance(): Promise<void> {
    // Load student performance data
    try {
      const keys = await this.redis.keys('student_performance:*')
      for (const key of keys) {
        const studentId = key.split(':')[1]
        const performance = await this.redis.get(key)
        if (performance) {
          this.studentPerformance.set(studentId, JSON.parse(performance))
        }
      }
    } catch (error) {
      console.error('Error loading student performance:', error)
    }
  }
}
