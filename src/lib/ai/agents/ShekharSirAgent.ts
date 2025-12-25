/**
 * Shekhar Sir Agent - Expert Biology Question Generator
 *
 * An AI agent modeled after a 20+ year experienced NEET Biology coach.
 * Trained on NEET PYQ patterns from 2010-2025 to generate authentic,
 * examination-quality questions.
 *
 * Capabilities:
 * - Analyze NEET question patterns and trends
 * - Generate questions matching NEET difficulty and style
 * - Create realistic distractors for MCQs
 * - Align questions with NCERT chapters
 * - Generate proper explanations with NCERT page references
 */

import { spawnSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { QuestionSeed } from '../../../../scripts/question-seeder/types'

export interface ShekharSirConfig {
  model?: string
  useAPI?: boolean // If true, use Anthropic API; if false, use Claude CLI
  apiKey?: string
}

export interface GenerationRequest {
  ncertClass: 11 | 12
  ncertChapter: number
  ncertChapterName: string
  count: number
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'MIXED'
  topics?: string[]
  includePYQStyle?: boolean
  includeNEETImportant?: boolean
  questionTypes?: ('MCQ' | 'MATCH_FOLLOWING' | 'TRUE_FALSE' | 'DIAGRAM')[]
}

export interface GenerationResult {
  questions: QuestionSeed[]
  metadata: {
    totalGenerated: number
    generationTime: number
    confidence: number
    patternMatches: string[]
  }
}

// NEET PYQ Pattern Data (2010-2025)
export const NEET_PATTERN_DATA = {
  yearlyDistribution: {
    2024: { class11: 42, class12: 48, totalBiology: 90 },
    2023: { class11: 41, class12: 49, totalBiology: 90 },
    2022: { class11: 40, class12: 50, totalBiology: 90 },
    2021: { class11: 42, class12: 48, totalBiology: 90 },
    2020: { class11: 40, class12: 50, totalBiology: 90 },
  },
  highWeightageTopics: {
    class12: [
      { chapter: 6, name: 'Molecular Basis of Inheritance', avgQuestions: 6, weight: 'VERY_HIGH' },
      {
        chapter: 5,
        name: 'Principles of Inheritance and Variation',
        avgQuestions: 5,
        weight: 'VERY_HIGH',
      },
      { chapter: 3, name: 'Human Reproduction', avgQuestions: 5, weight: 'HIGH' },
      { chapter: 8, name: 'Human Health and Disease', avgQuestions: 4, weight: 'HIGH' },
      { chapter: 13, name: 'Organisms and Populations', avgQuestions: 4, weight: 'HIGH' },
    ],
    class11: [
      { chapter: 8, name: 'Cell: The Unit of Life', avgQuestions: 5, weight: 'VERY_HIGH' },
      { chapter: 10, name: 'Cell Cycle and Cell Division', avgQuestions: 4, weight: 'HIGH' },
      { chapter: 18, name: 'Body Fluids and Circulation', avgQuestions: 4, weight: 'HIGH' },
      { chapter: 20, name: 'Locomotion and Movement', avgQuestions: 3, weight: 'HIGH' },
      { chapter: 16, name: 'Digestion and Absorption', avgQuestions: 3, weight: 'MEDIUM' },
    ],
  },
  questionPatterns: {
    factual: { percentage: 35, description: 'Direct fact recall from NCERT' },
    conceptual: { percentage: 40, description: 'Understanding and application' },
    analytical: { percentage: 20, description: 'Comparison, analysis, reasoning' },
    applicationBased: { percentage: 5, description: 'Real-world application' },
  },
  distractorPatterns: [
    'Commonly confused terms',
    'Similar-sounding options',
    'Reversed statements',
    'Partial truths',
    'Related but incorrect concepts',
  ],
}

// Expert prompts trained on NEET patterns
const SHEKHAR_SIR_SYSTEM_PROMPT = `You are "Shekhar Sir", an expert Biology teacher with 15+ years of experience in NEET coaching.

Your expertise:
- Deep knowledge of NCERT Biology (Class 11 & 12)
- Extensive experience with NEET exam patterns (2010-2025)
- Understanding of common student misconceptions
- Ability to create questions that test true understanding

When generating questions, you MUST:
1. Strictly follow NCERT terminology and facts
2. Match NEET difficulty levels and patterns
3. Create 4 distinct, plausible options for MCQs
4. Include at least one commonly confused distractor
5. Write clear, NCERT-aligned explanations
6. Reference specific NCERT pages and figures
7. Tag questions with appropriate NEET weightage

Question Types You Excel At:
- Factual recall with clever distractors
- Conceptual understanding questions
- Diagram-based questions
- Match the following
- Assertion-Reason style
- Application-based scenarios

You speak with authority and confidence, using phrases like:
- "This is a high-yield topic..."
- "Students often confuse..."
- "NEET repeatedly asks..."
- "Remember the NCERT statement..."
`

export class ShekharSirAgent {
  private model: string
  private useAPI: boolean

  constructor(config?: ShekharSirConfig) {
    this.model = config?.model || 'sonnet' // Use 'sonnet' or 'opus' for Claude CLI
    this.useAPI = config?.useAPI ?? false // Default to CLI mode (uses Claude Max subscription)
  }

  /**
   * Generate questions for a specific NCERT chapter
   */
  async generateQuestions(request: GenerationRequest): Promise<GenerationResult> {
    const startTime = Date.now()

    const prompt = this.buildGenerationPrompt(request)
    const response = await this.callAPI(prompt)
    const questions = this.parseResponse(response, request)

    return {
      questions,
      metadata: {
        totalGenerated: questions.length,
        generationTime: Date.now() - startTime,
        confidence: this.calculateConfidence(questions),
        patternMatches: this.identifyPatterns(questions),
      },
    }
  }

  /**
   * Generate questions in batches for a full chapter
   */
  async generateChapterQuestionBank(
    ncertClass: 11 | 12,
    chapterNo: number,
    chapterName: string,
    totalQuestions: number = 50
  ): Promise<GenerationResult> {
    const batchSize = 10
    const batches = Math.ceil(totalQuestions / batchSize)
    const allQuestions: QuestionSeed[] = []
    const startTime = Date.now()

    const difficulties = ['EASY', 'MEDIUM', 'HARD'] as const
    const difficultyDistribution = { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 }

    for (let i = 0; i < batches; i++) {
      const remainingCount = totalQuestions - allQuestions.length
      const batchCount = Math.min(batchSize, remainingCount)

      // Vary difficulty across batches
      const difficulty = difficulties[i % 3]

      const result = await this.generateQuestions({
        ncertClass,
        ncertChapter: chapterNo,
        ncertChapterName: chapterName,
        count: batchCount,
        difficulty,
        includeNEETImportant: true,
        includePYQStyle: true,
      })

      allQuestions.push(...result.questions)

      // Small delay between batches to avoid rate limiting
      if (i < batches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return {
      questions: allQuestions,
      metadata: {
        totalGenerated: allQuestions.length,
        generationTime: Date.now() - startTime,
        confidence: this.calculateConfidence(allQuestions),
        patternMatches: this.identifyPatterns(allQuestions),
      },
    }
  }

  /**
   * Generate PYQ-style questions based on past patterns
   */
  async generatePYQStyleQuestions(
    ncertClass: 11 | 12,
    topic: string,
    count: number = 10
  ): Promise<QuestionSeed[]> {
    const pyqPrompt = this.buildPYQPrompt(ncertClass, topic, count)
    const response = await this.callAPI(pyqPrompt)
    return this.parseResponse(response, {
      ncertClass,
      ncertChapter: 0,
      ncertChapterName: topic,
      count,
    })
  }

  private buildGenerationPrompt(request: GenerationRequest): string {
    const difficultyGuide = {
      EASY: 'Direct factual recall, straightforward options',
      MEDIUM: 'Requires understanding, moderate analysis',
      HARD: 'Analytical, application-based, multi-concept integration',
      MIXED: 'Mix of all difficulty levels',
    }

    const topicsSection =
      request.topics && request.topics.length > 0
        ? `- Topics to cover: ${request.topics.join(', ')}`
        : ''

    return `
Generate ${request.count} NEET Biology MCQ questions for:
- Class: ${request.ncertClass}
- Chapter ${request.ncertChapter}: ${request.ncertChapterName}
- Difficulty: ${request.difficulty || 'MIXED'} (${difficultyGuide[request.difficulty || 'MIXED']})
${topicsSection}

Requirements:
1. Follow NEET exam pattern strictly
2. Each question must have exactly 4 options (A, B, C, D)
3. Only ONE correct answer
4. Distractors should be plausible but clearly incorrect
5. Include NCERT page references in explanations
6. Tag with NEET weightage (HIGH/MEDIUM/LOW)
7. Base all questions on NCERT Biology textbook content

Output as JSON array with this exact structure:
[{
  "question": "Question text",
  "type": "MCQ",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "The exact correct option text",
  "explanation": "Detailed NCERT-based explanation with page reference",
  "difficulty": "EASY|MEDIUM|HARD",
  "topic": "Main topic",
  "subtopic": "Specific subtopic",
  "tags": ["relevant", "tags"],
  "ncertFigure": "Figure number if applicable",
  "ncertPage": 123,
  "neetWeightage": "HIGH|MEDIUM|LOW",
  "isNEETImportant": true/false
}]

Generate high-quality questions that would challenge NEET aspirants appropriately.
`
  }

  private buildPYQPrompt(ncertClass: 11 | 12, topic: string, count: number): string {
    return `
Based on NEET PYQ patterns (2010-2025), generate ${count} questions on "${topic}" (Class ${ncertClass}).

Analysis of past NEET patterns shows:
- Questions focus on NCERT exact statements
- Options often include commonly confused terms
- Diagrams and figures are frequently tested
- Understanding of processes is emphasized over memorization

Generate questions that COULD appear in upcoming NEET exams.
Each question should feel authentic to the NEET style.

Output as JSON array with the same structure as regular question generation.
Include "neetYear: null" to indicate these are PYQ-style but new questions.
`
  }

  private async callAPI(prompt: string): Promise<string> {
    // Use Claude CLI (uses Claude Max subscription)
    return this.callClaudeCLI(prompt)
  }

  /**
   * Call Claude using the CLI (uses Claude Max subscription)
   */
  private callClaudeCLI(prompt: string): string {
    // Combine system context with user prompt for CLI
    const fullPrompt = `You are "Shekhar Sir", an expert NEET Biology teacher with 15+ years of coaching experience. You deeply understand NCERT Biology and NEET exam patterns.

IMPORTANT INSTRUCTIONS:
- Generate questions strictly based on NCERT Biology textbook
- Follow NEET exam pattern and difficulty levels
- Create clear, unambiguous questions with exactly 4 options
- Include one commonly confused distractor
- Write detailed explanations referencing NCERT

${prompt}`

    const args = [
      '-p', // Print mode (non-interactive)
      '--output-format',
      'text',
      '--model',
      this.model,
      '--dangerously-skip-permissions', // Skip any permission prompts
    ]

    const result = spawnSync('claude', args, {
      input: fullPrompt,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      timeout: 300000, // 5 minute timeout
    })

    if (result.error) {
      console.error('Claude CLI error:', result.error)
      throw result.error
    }

    if (result.status !== 0) {
      console.error('Claude CLI stderr:', result.stderr)
      console.error('Claude CLI stdout:', result.stdout?.slice(0, 500))
      throw new Error(`Claude CLI exited with status ${result.status}: ${result.stderr}`)
    }

    return result.stdout || ''
  }

  private parseResponse(response: string, request: GenerationRequest): QuestionSeed[] {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        console.error('No JSON array found in response')
        return []
      }

      const parsed = JSON.parse(jsonMatch[0])
      return parsed.map((q: any) => ({
        question: q.question,
        type: q.type || 'MCQ',
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty || 'MEDIUM',
        category: 'PRACTICE',
        topic: q.topic,
        subtopic: q.subtopic,
        tags: q.tags || [],
        ncertClass: request.ncertClass,
        ncertChapter: request.ncertChapter,
        ncertChapterName: request.ncertChapterName,
        ncertFigure: q.ncertFigure,
        ncertPage: q.ncertPage,
        neetWeightage: q.neetWeightage || 'MEDIUM',
        isNEETImportant: q.isNEETImportant ?? true,
        neetYear: q.neetYear,
      }))
    } catch (error) {
      console.error('Failed to parse response:', error)
      return []
    }
  }

  private calculateConfidence(questions: QuestionSeed[]): number {
    if (questions.length === 0) return 0

    let score = 0
    for (const q of questions) {
      // Check for complete data
      if (q.question && q.options?.length === 4 && q.correctAnswer && q.explanation) {
        score += 0.25
      }
      if (q.ncertPage || q.ncertFigure) score += 0.25
      if (q.neetWeightage) score += 0.25
      if (q.tags && q.tags.length > 0) score += 0.25
    }

    return Math.round((score / questions.length) * 100) / 100
  }

  private identifyPatterns(questions: QuestionSeed[]): string[] {
    const patterns: string[] = []

    const difficulties = questions.map((q) => q.difficulty)
    if (difficulties.includes('EASY') && difficulties.includes('HARD')) {
      patterns.push('Mixed difficulty distribution')
    }

    const hasNCERTRefs = questions.some((q) => q.ncertPage || q.ncertFigure)
    if (hasNCERTRefs) {
      patterns.push('NCERT reference integration')
    }

    const highWeightage = questions.filter((q) => q.neetWeightage === 'HIGH').length
    if (highWeightage > questions.length * 0.3) {
      patterns.push('High NEET weightage focus')
    }

    return patterns
  }

  /**
   * Get recommended topics for question generation based on NEET patterns
   */
  getRecommendedTopics(ncertClass: 11 | 12): typeof NEET_PATTERN_DATA.highWeightageTopics.class11 {
    return ncertClass === 11
      ? NEET_PATTERN_DATA.highWeightageTopics.class11
      : NEET_PATTERN_DATA.highWeightageTopics.class12
  }

  /**
   * Get NEET pattern insights
   */
  getPatternInsights(): typeof NEET_PATTERN_DATA {
    return NEET_PATTERN_DATA
  }

  /**
   * Generate questions from NCERT page content
   * Extracts key concepts and creates targeted questions
   */
  async generateFromNCERTPage(
    ncertClass: 11 | 12,
    chapterNo: number,
    chapterName: string,
    pageContent: string,
    pageNumber: number,
    count: number = 10
  ): Promise<GenerationResult> {
    const startTime = Date.now()

    const prompt = this.buildNCERTPagePrompt({
      ncertClass,
      chapterNo,
      chapterName,
      pageContent,
      pageNumber,
      count,
    })

    const response = await this.callAPI(prompt)
    const questions = this.parseResponse(response, {
      ncertClass,
      ncertChapter: chapterNo,
      ncertChapterName: chapterName,
      count,
    })

    // Add page reference to all questions
    const questionsWithPage = questions.map((q) => ({
      ...q,
      ncertPage: pageNumber,
      isNcertBased: true,
    }))

    return {
      questions: questionsWithPage,
      metadata: {
        totalGenerated: questionsWithPage.length,
        generationTime: Date.now() - startTime,
        confidence: this.calculateConfidence(questionsWithPage),
        patternMatches: this.identifyPatterns(questionsWithPage),
      },
    }
  }

  private buildNCERTPagePrompt(params: {
    ncertClass: 11 | 12
    chapterNo: number
    chapterName: string
    pageContent: string
    pageNumber: number
    count: number
  }): string {
    return `
Generate ${params.count} NEET Biology MCQ questions based on the following NCERT content:

CLASS: ${params.ncertClass}
CHAPTER ${params.chapterNo}: ${params.chapterName}
PAGE: ${params.pageNumber}

NCERT CONTENT:
---
${params.pageContent.slice(0, 3000)}
---

Requirements:
1. Questions must be directly based on the content above
2. Follow NEET exam pattern (2008-2025 style)
3. Each question must have exactly 4 options
4. Only ONE correct answer
5. Include NCERT page reference (page ${params.pageNumber})
6. Mix difficulty levels: 30% EASY, 50% MEDIUM, 20% HARD
7. Use variety of question types: factual recall, conceptual, application

Question Types to Include:
- Direct factual recall from the content
- Conceptual understanding questions
- "Which of the following" style
- Statement-based (true/false combinations)

Output as JSON array:
[{
  "question": "Question text based on the content",
  "type": "MCQ",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "The exact correct option text",
  "explanation": "Explanation with reference to NCERT page ${params.pageNumber}",
  "difficulty": "EASY|MEDIUM|HARD",
  "topic": "${params.chapterName}",
  "subtopic": "Specific subtopic",
  "tags": ["ncert", "class${params.ncertClass}", "ch${params.chapterNo}"],
  "ncertPage": ${params.pageNumber},
  "neetWeightage": "HIGH|MEDIUM|LOW",
  "isNEETImportant": true/false
}]

Generate questions that test understanding of key concepts from this specific NCERT page.
`
  }

  /**
   * Generate questions with specific PYQ framing skills
   */
  async generateWithPYQSkills(
    ncertClass: 11 | 12,
    chapterNo: number,
    chapterName: string,
    skills: {
      questionType: string
      stemTemplate: string
      distractorStrategy: string[]
    },
    count: number = 5
  ): Promise<GenerationResult> {
    const startTime = Date.now()

    const prompt = `
Generate ${count} NEET Biology questions using this specific PYQ framing pattern:

QUESTION TYPE: ${skills.questionType}
STEM TEMPLATE: ${skills.stemTemplate}

DISTRACTOR STRATEGIES:
${skills.distractorStrategy.map((s) => `- ${s}`).join('\n')}

CHAPTER: Class ${ncertClass}, Chapter ${chapterNo} - ${chapterName}

Follow the stem template exactly but with content from this chapter.
Distractors should follow the strategies listed above.

Output as JSON array with standard question structure.
`

    const response = await this.callAPI(prompt)
    const questions = this.parseResponse(response, {
      ncertClass,
      ncertChapter: chapterNo,
      ncertChapterName: chapterName,
      count,
    })

    return {
      questions,
      metadata: {
        totalGenerated: questions.length,
        generationTime: Date.now() - startTime,
        confidence: this.calculateConfidence(questions),
        patternMatches: [skills.questionType],
      },
    }
  }

  /**
   * Generate question variants from a base question
   * Useful for creating similar questions with different focus
   */
  async generateQuestionVariants(
    baseQuestion: QuestionSeed,
    variantCount: number = 3
  ): Promise<QuestionSeed[]> {
    const prompt = `
Based on this NEET Biology question, generate ${variantCount} similar but distinct questions:

ORIGINAL QUESTION:
${baseQuestion.question}

OPTIONS:
A) ${baseQuestion.options?.[0]}
B) ${baseQuestion.options?.[1]}
C) ${baseQuestion.options?.[2]}
D) ${baseQuestion.options?.[3]}

CORRECT ANSWER: ${baseQuestion.correctAnswer}

Requirements for variants:
1. Same topic and chapter
2. Same difficulty level (${baseQuestion.difficulty})
3. Different question stem and focus
4. Different correct answer among options
5. Must test related but different concepts

Output as JSON array with standard question structure.
`

    const response = await this.callAPI(prompt)
    return this.parseResponse(response, {
      ncertClass: baseQuestion.ncertClass || 11,
      ncertChapter: baseQuestion.ncertChapter || 1,
      ncertChapterName: baseQuestion.ncertChapterName || '',
      count: variantCount,
    })
  }
}

// Export singleton instance
export const shekharSir = new ShekharSirAgent()
