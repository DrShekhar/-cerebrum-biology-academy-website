/**
 * AI-Powered Question Generator Service
 * Generates customized Biology test papers using OpenAI GPT-4
 */

interface QuestionGenerationRequest {
  topics: string[]
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  grade: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed'
  questionCount: number
  questionTypes: ('MCQ' | 'SHORT_ANSWER' | 'DIAGRAM' | 'TRUE_FALSE')[]
  timeLimit?: number // in minutes
}

interface GeneratedQuestion {
  id: string
  topic: string
  subtopic?: string
  type: 'MCQ' | 'SHORT_ANSWER' | 'DIAGRAM' | 'TRUE_FALSE'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  options?: string[] // for MCQ
  correctAnswer: string
  explanation: string
  marks: number
  estimatedTime: number // in seconds
  tags: string[]
}

interface TestPaper {
  id: string
  title: string
  questions: GeneratedQuestion[]
  totalMarks: number
  estimatedTime: number
  instructions: string[]
  createdAt: Date
}

class QuestionGeneratorService {
  private apiKey: string
  private baseURL = 'https://api.openai.com/v1/chat/completions'

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
  }

  /**
   * Generate a complete test paper with AI-generated questions
   */
  async generateTestPaper(request: QuestionGenerationRequest): Promise<TestPaper> {
    try {
      const questions = await this.generateQuestions(request)

      const testPaper: TestPaper = {
        id: this.generateId(),
        title: this.generateTitle(request),
        questions,
        totalMarks: questions.reduce((total, q) => total + q.marks, 0),
        estimatedTime: request.timeLimit
          ? request.timeLimit * 60
          : questions.reduce((total, q) => total + q.estimatedTime, 0),
        instructions: this.generateInstructions(request),
        createdAt: new Date(),
      }

      return testPaper
    } catch (error) {
      console.error('Test paper generation failed:', error)
      throw new Error('Failed to generate test paper')
    }
  }

  /**
   * Generate individual questions using OpenAI
   */
  private async generateQuestions(
    request: QuestionGenerationRequest
  ): Promise<GeneratedQuestion[]> {
    const questionsPerTopic = Math.ceil(request.questionCount / request.topics.length)
    const allQuestions: GeneratedQuestion[] = []

    for (const topic of request.topics) {
      const topicQuestions = await this.generateQuestionsForTopic({
        ...request,
        topics: [topic],
        questionCount: questionsPerTopic,
      })
      allQuestions.push(...topicQuestions)
    }

    // Shuffle and limit to requested count
    const shuffled = this.shuffleArray(allQuestions)
    return shuffled.slice(0, request.questionCount)
  }

  /**
   * Generate questions for a specific topic
   */
  private async generateQuestionsForTopic(
    request: QuestionGenerationRequest
  ): Promise<GeneratedQuestion[]> {
    const prompt = this.buildPrompt(request)

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert Biology teacher and question paper setter. Generate high-quality, curriculum-specific Biology questions with accurate answers and detailed explanations.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedContent = data.choices[0]?.message?.content

    return this.parseGeneratedQuestions(generatedContent, request)
  }

  /**
   * Build the prompt for question generation
   */
  private buildPrompt(request: QuestionGenerationRequest): string {
    const topic = request.topics[0]
    const difficulty =
      request.difficulty === 'Mixed'
        ? 'varying difficulty levels'
        : request.difficulty.toLowerCase()

    return `
Generate ${request.questionCount} Biology questions for the topic "${topic}" with the following specifications:

**Curriculum:** ${request.curriculum}
**Grade/Class:** ${request.grade}
**Difficulty:** ${difficulty}
**Question Types:** ${request.questionTypes.join(', ')}

**Requirements:**
1. Questions must be accurate and curriculum-specific
2. Include detailed explanations for all answers
3. For MCQs, provide 4 options with one clearly correct answer
4. Ensure questions test conceptual understanding, not just memorization
5. Include relevant diagrams or processes where applicable
6. Questions should be exam-pattern appropriate for ${request.curriculum}

**Output Format (JSON):**
{
  "questions": [
    {
      "type": "MCQ|SHORT_ANSWER|DIAGRAM|TRUE_FALSE",
      "difficulty": "Easy|Medium|Hard",
      "question": "Question text here",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"], // Only for MCQ
      "correctAnswer": "Correct answer here",
      "explanation": "Detailed explanation with reasoning",
      "marks": 1-4,
      "estimatedTime": 60-300, // seconds
      "subtopic": "Specific subtopic if applicable",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}

**Topics to focus on for ${topic}:**
${this.getTopicDetails(topic, request.curriculum)}

Generate questions that help students understand core concepts and prepare effectively for their ${request.curriculum} examinations.
    `
  }

  /**
   * Parse AI-generated content into structured questions
   */
  private parseGeneratedQuestions(
    content: string,
    request: QuestionGenerationRequest
  ): GeneratedQuestion[] {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }

      const parsed = JSON.parse(jsonMatch[0])
      const questions: GeneratedQuestion[] = []

      for (const q of parsed.questions || []) {
        questions.push({
          id: this.generateId(),
          topic: request.topics[0],
          subtopic: q.subtopic,
          type: q.type,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          marks: q.marks || 1,
          estimatedTime: q.estimatedTime || 120,
          tags: q.tags || [],
        })
      }

      return questions
    } catch (error) {
      console.error('Failed to parse generated questions:', error)
      // Fallback: return sample questions
      return this.getFallbackQuestions(request)
    }
  }

  /**
   * Get topic-specific details for better question generation
   */
  private getTopicDetails(topic: string, curriculum: string): string {
    const topicDetails: Record<string, string> = {
      'Cell Biology': `
- Cell structure and organelles
- Cell membrane transport
- Cell division (mitosis, meiosis)
- Cell respiration and photosynthesis
- Enzyme kinetics and regulation`,

      Genetics: `
- Mendel's laws of inheritance
- Genetic crosses and pedigree analysis
- DNA structure and replication
- Transcription and translation
- Genetic disorders and mutations`,

      'Human Physiology': `
- Digestive system and nutrition
- Respiratory system and gas exchange
- Circulatory system and blood
- Nervous system and coordination
- Excretory system and homeostasis`,

      'Plant Physiology': `
- Photosynthesis and respiration
- Water and mineral transport
- Plant hormones and growth
- Reproduction in flowering plants
- Plant responses to environment`,

      Evolution: `
- Darwin's theory of evolution
- Natural selection and adaptation
- Evidence for evolution
- Human evolution
- Speciation and biodiversity`,

      Ecology: `
- Ecosystem structure and function
- Food chains and energy flow
- Biogeochemical cycles
- Population dynamics
- Environmental conservation`,
    }

    return topicDetails[topic] || `Key concepts and principles related to ${topic}`
  }

  /**
   * Generate fallback questions when AI fails
   */
  private getFallbackQuestions(request: QuestionGenerationRequest): GeneratedQuestion[] {
    const topic = request.topics[0]

    return [
      {
        id: this.generateId(),
        topic,
        type: 'MCQ',
        difficulty: 'Medium',
        question: `Which of the following is a key characteristic of ${topic}?`,
        options: [
          'A) Option 1 (placeholder)',
          'B) Option 2 (placeholder)',
          'C) Option 3 (placeholder)',
          'D) Option 4 (placeholder)',
        ],
        correctAnswer: 'A) Option 1 (placeholder)',
        explanation:
          'This is a placeholder question. Please regenerate the test for better questions.',
        marks: 1,
        estimatedTime: 120,
        tags: [topic.toLowerCase().replace(' ', '-')],
      },
    ]
  }

  /**
   * Generate test title based on configuration
   */
  private generateTitle(request: QuestionGenerationRequest): string {
    const topicsStr =
      request.topics.length === 1 ? request.topics[0] : `${request.topics.length} Topics`

    return `${topicsStr} Test - ${request.difficulty} Level (${request.curriculum})`
  }

  /**
   * Generate test instructions
   */
  private generateInstructions(request: QuestionGenerationRequest): string[] {
    return [
      `This test contains ${request.questionCount} questions covering: ${request.topics.join(', ')}`,
      `Difficulty Level: ${request.difficulty}`,
      `Curriculum: ${request.curriculum}`,
      request.timeLimit ? `Time Limit: ${request.timeLimit} minutes` : 'No time limit',
      'Read each question carefully before answering',
      'For MCQs, select the most appropriate option',
      'Explanations will be shown after test submission',
      'You can review and change answers before final submission',
    ]
  }

  /**
   * Utility functions
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}

// Singleton instance
export const questionGenerator = new QuestionGeneratorService()

// Export types
export type { QuestionGenerationRequest, GeneratedQuestion, TestPaper }
