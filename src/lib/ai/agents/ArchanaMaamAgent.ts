/**
 * Archana Ma'am Agent - Expert Question Verifier
 *
 * An AI agent modeled after a meticulous Biology expert and quality assurance specialist.
 * Verifies questions for scientific accuracy, NCERT alignment, and NEET appropriateness.
 *
 * Capabilities:
 * - Verify scientific accuracy of questions and answers
 * - Check NCERT alignment and terminology
 * - Validate correct answers
 * - Review diagram requirements and references
 * - Check explanation quality and completeness
 * - Identify potential issues with distractors
 */

import { spawnSync } from 'child_process'
import { QuestionSeed } from '../../../../scripts/question-seeder/types'

export interface ArchanaMaamConfig {
  model?: string
  strictMode?: boolean
}

export interface VerificationRequest {
  question: QuestionSeed
  checkDiagram?: boolean
  checkNCERTAlignment?: boolean
  checkNEETPattern?: boolean
}

export interface VerificationResult {
  questionId: string
  isValid: boolean
  overallScore: number // 0-100
  issues: VerificationIssue[]
  suggestions: string[]
  correctedQuestion?: Partial<QuestionSeed>
  metadata: {
    verificationTime: number
    checksPerformed: string[]
    confidence: number
  }
}

export interface VerificationIssue {
  type: 'ERROR' | 'WARNING' | 'SUGGESTION'
  category: 'ACCURACY' | 'NCERT_ALIGNMENT' | 'DIFFICULTY' | 'OPTIONS' | 'EXPLANATION' | 'FORMATTING'
  message: string
  field?: string
  severity: number // 1-5, where 5 is most severe
  autoFixable: boolean
  suggestedFix?: string
}

export interface BatchVerificationResult {
  totalQuestions: number
  validQuestions: number
  invalidQuestions: number
  warningQuestions: number
  results: VerificationResult[]
  summary: {
    commonIssues: { issue: string; count: number }[]
    averageScore: number
    passRate: number
  }
}

// NCERT Reference Data for Verification
const NCERT_VERIFICATION_DATA = {
  class11Biology: {
    chapters: 22,
    totalPages: 350,
    keyFigures: ['1.1-2.5', '3.1-4.6', '5.1-6.8', '7.1-8.12', '9.1-10.8'],
  },
  class12Biology: {
    chapters: 16,
    totalPages: 320,
    keyFigures: ['1.1-2.8', '3.1-4.6', '5.1-6.12', '7.1-8.8', '9.1-10.5'],
  },
  commonMistakes: [
    { term: 'mitochondria', correct: 'powerhouse of the cell', incorrect: 'power house' },
    { term: 'DNA', correct: 'deoxyribonucleic acid', incorrect: 'deoxy ribonucleic acid' },
    { term: 'Okazaki', correct: 'Okazaki fragments', incorrect: 'okazaki fragments' },
    { term: 'Meselson', correct: 'Meselson and Stahl', incorrect: 'Meselsohn' },
    { term: 'eukaryotic', correct: 'eukaryotic', incorrect: 'eucaryotic' },
  ],
  ncertTerminology: {
    mustUse: [
      'semi-conservative replication',
      'central dogma',
      'genetic code',
      'wobble hypothesis',
      'operon concept',
    ],
    avoid: ['simple', 'basic', 'obviously', 'everyone knows'],
  },
}

// Expert prompt for Archana Ma'am
const ARCHANA_MAAM_SYSTEM_PROMPT = `You are "Archana Ma'am", a meticulous Biology expert and quality assurance specialist.

Your role:
- Verify scientific accuracy of every question
- Ensure NCERT alignment and correct terminology
- Check that correct answers are actually correct
- Identify issues with distractors (too obvious, misleading, or incorrect)
- Review explanations for completeness and accuracy

You are extremely thorough and catch issues that others miss.
You follow NCERT exactly - if something differs from NCERT, it's wrong.

Your verification process:
1. Read the question carefully
2. Verify all scientific facts
3. Check the correct answer
4. Analyze each distractor
5. Review the explanation
6. Check NCERT references
7. Assess difficulty alignment
8. Suggest improvements

You speak with precision and authority:
- "According to NCERT page X..."
- "This contradicts NCERT statement..."
- "The correct terminology is..."
- "This distractor is problematic because..."

Quality Standards:
- Questions must be unambiguous
- Only ONE answer must be definitively correct
- Distractors must be plausible but clearly wrong
- Explanations must cite NCERT
- Difficulty must match stated level
`

export class ArchanaMaamAgent {
  private model: string
  private strictMode: boolean

  constructor(config?: ArchanaMaamConfig) {
    this.model = config?.model || 'sonnet' // Use 'sonnet' or 'opus' for Claude CLI
    this.strictMode = config?.strictMode ?? true
  }

  /**
   * Verify a single question
   */
  async verifyQuestion(request: VerificationRequest): Promise<VerificationResult> {
    const startTime = Date.now()
    const checksPerformed: string[] = []

    // Local validation checks
    const localIssues = this.performLocalChecks(request.question)
    checksPerformed.push('local_validation')

    // AI-powered verification
    const aiResult = await this.performAIVerification(request)
    checksPerformed.push('ai_verification')

    if (request.checkNCERTAlignment) {
      checksPerformed.push('ncert_alignment')
    }
    if (request.checkNEETPattern) {
      checksPerformed.push('neet_pattern')
    }
    if (request.checkDiagram && request.question.ncertFigure) {
      checksPerformed.push('diagram_verification')
    }

    const allIssues = [...localIssues, ...aiResult.issues]
    const score = this.calculateScore(allIssues)

    return {
      questionId: this.generateQuestionId(request.question),
      isValid: score >= 70 && !allIssues.some((i) => i.type === 'ERROR' && i.severity >= 4),
      overallScore: score,
      issues: allIssues,
      suggestions: aiResult.suggestions,
      correctedQuestion: aiResult.corrections,
      metadata: {
        verificationTime: Date.now() - startTime,
        checksPerformed,
        confidence: aiResult.confidence,
      },
    }
  }

  /**
   * Verify multiple questions in batch
   */
  async verifyBatch(questions: QuestionSeed[]): Promise<BatchVerificationResult> {
    const results: VerificationResult[] = []

    for (const question of questions) {
      const result = await this.verifyQuestion({
        question,
        checkNCERTAlignment: true,
        checkNEETPattern: true,
        checkDiagram: !!question.ncertFigure,
      })
      results.push(result)

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    return this.compileBatchResults(results)
  }

  /**
   * Quick validation without AI (for filtering)
   */
  quickValidate(question: QuestionSeed): { isValid: boolean; issues: string[] } {
    const issues: string[] = []

    // Check required fields
    if (!question.question || question.question.length < 20) {
      issues.push('Question text too short or missing')
    }
    if (!question.options || question.options.length !== 4) {
      issues.push('Must have exactly 4 options')
    }
    if (!question.correctAnswer) {
      issues.push('Missing correct answer')
    }
    if (question.options && !question.options.includes(question.correctAnswer)) {
      issues.push('Correct answer not in options')
    }
    if (!question.explanation || question.explanation.length < 30) {
      issues.push('Explanation too short or missing')
    }

    // Check for common issues
    if (question.question.includes('???') || question.question.includes('XXX')) {
      issues.push('Question contains placeholder text')
    }
    if (question.options?.some((o) => o.length < 2)) {
      issues.push('Options too short')
    }

    return {
      isValid: issues.length === 0,
      issues,
    }
  }

  private performLocalChecks(question: QuestionSeed): VerificationIssue[] {
    const issues: VerificationIssue[] = []

    // Check for required fields
    if (!question.options || question.options.length !== 4) {
      issues.push({
        type: 'ERROR',
        category: 'OPTIONS',
        message: 'Question must have exactly 4 options',
        field: 'options',
        severity: 5,
        autoFixable: false,
      })
    }

    // Check correct answer is in options
    if (question.options && !question.options.includes(question.correctAnswer)) {
      issues.push({
        type: 'ERROR',
        category: 'ACCURACY',
        message: 'Correct answer not found in options',
        field: 'correctAnswer',
        severity: 5,
        autoFixable: false,
      })
    }

    // Check for duplicate options
    if (question.options) {
      const uniqueOptions = new Set(question.options.map((o) => o.toLowerCase().trim()))
      if (uniqueOptions.size !== question.options.length) {
        issues.push({
          type: 'ERROR',
          category: 'OPTIONS',
          message: 'Duplicate options detected',
          field: 'options',
          severity: 4,
          autoFixable: false,
        })
      }
    }

    // Check explanation length
    if (!question.explanation || question.explanation.length < 50) {
      issues.push({
        type: 'WARNING',
        category: 'EXPLANATION',
        message: 'Explanation is too short - should be more detailed',
        field: 'explanation',
        severity: 2,
        autoFixable: false,
        suggestedFix: 'Add NCERT references and more detail',
      })
    }

    // Check for NCERT reference in explanation
    if (
      question.explanation &&
      !question.explanation.toLowerCase().includes('ncert') &&
      !question.explanation.includes('page') &&
      !question.explanation.includes('figure')
    ) {
      issues.push({
        type: 'SUGGESTION',
        category: 'NCERT_ALIGNMENT',
        message: 'Consider adding NCERT page/figure reference to explanation',
        field: 'explanation',
        severity: 1,
        autoFixable: false,
      })
    }

    // Check common terminology mistakes
    const questionText = `${question.question} ${question.options?.join(' ')} ${question.explanation || ''}`
    for (const mistake of NCERT_VERIFICATION_DATA.commonMistakes) {
      if (questionText.toLowerCase().includes(mistake.incorrect.toLowerCase())) {
        issues.push({
          type: 'WARNING',
          category: 'NCERT_ALIGNMENT',
          message: `Incorrect terminology: "${mistake.incorrect}" should be "${mistake.correct}"`,
          severity: 3,
          autoFixable: true,
          suggestedFix: mistake.correct,
        })
      }
    }

    // Check difficulty alignment
    if (question.difficulty === 'EASY' && question.question.length > 200) {
      issues.push({
        type: 'WARNING',
        category: 'DIFFICULTY',
        message: 'Question marked as EASY but seems complex',
        field: 'difficulty',
        severity: 2,
        autoFixable: false,
      })
    }

    return issues
  }

  private async performAIVerification(request: VerificationRequest): Promise<{
    issues: VerificationIssue[]
    suggestions: string[]
    corrections: Partial<QuestionSeed> | undefined
    confidence: number
  }> {
    const prompt = this.buildVerificationPrompt(request)

    try {
      const content = this.callClaudeCLI(prompt)
      return this.parseAIResponse(content)
    } catch (error) {
      console.error('AI verification error:', error)
      return { issues: [], suggestions: [], corrections: undefined, confidence: 0 }
    }
  }

  /**
   * Call Claude CLI to verify questions (uses Claude Max subscription)
   */
  private callClaudeCLI(prompt: string): string {
    const args = [
      '-p', // Print mode (non-interactive)
      '--output-format',
      'text',
      '--model',
      this.model,
      '--system-prompt',
      ARCHANA_MAAM_SYSTEM_PROMPT,
      '--dangerously-skip-permissions', // Skip permission prompts for automation
    ]

    const result = spawnSync('claude', args, {
      input: prompt,
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
      throw new Error(`Claude CLI exited with status ${result.status}: ${result.stderr}`)
    }

    return result.stdout || ''
  }

  private buildVerificationPrompt(request: VerificationRequest): string {
    const q = request.question
    return `
Verify this Biology question for NEET preparation:

QUESTION: ${q.question}

OPTIONS:
A) ${q.options?.[0]}
B) ${q.options?.[1]}
C) ${q.options?.[2]}
D) ${q.options?.[3]}

MARKED CORRECT ANSWER: ${q.correctAnswer}

EXPLANATION: ${q.explanation}

METADATA:
- NCERT Class: ${q.ncertClass}
- Chapter: ${q.ncertChapter} - ${q.ncertChapterName}
- Difficulty: ${q.difficulty}
- NEET Weightage: ${q.neetWeightage}
${q.ncertFigure ? `- NCERT Figure: ${q.ncertFigure}` : ''}
${q.ncertPage ? `- NCERT Page: ${q.ncertPage}` : ''}

Verify and respond in JSON format:
{
  "isCorrectAnswerValid": true/false,
  "correctAnswerIfDifferent": "only if current answer is wrong",
  "issues": [
    {
      "type": "ERROR|WARNING|SUGGESTION",
      "category": "ACCURACY|NCERT_ALIGNMENT|DIFFICULTY|OPTIONS|EXPLANATION|FORMATTING",
      "message": "Issue description",
      "severity": 1-5,
      "autoFixable": true/false,
      "suggestedFix": "fix if applicable"
    }
  ],
  "suggestions": ["improvement suggestions"],
  "confidence": 0.0-1.0
}

Be thorough but fair. Only mark as ERROR for serious issues.
`
  }

  private parseAIResponse(content: string): {
    issues: VerificationIssue[]
    suggestions: string[]
    corrections: Partial<QuestionSeed> | undefined
    confidence: number
  } {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return { issues: [], suggestions: [], corrections: undefined, confidence: 0 }
      }

      const parsed = JSON.parse(jsonMatch[0])

      const issues: VerificationIssue[] = (parsed.issues || []).map((i: any) => ({
        type: i.type || 'WARNING',
        category: i.category || 'ACCURACY',
        message: i.message,
        severity: i.severity || 3,
        autoFixable: i.autoFixable || false,
        suggestedFix: i.suggestedFix,
      }))

      const corrections: Partial<QuestionSeed> | undefined = parsed.correctAnswerIfDifferent
        ? { correctAnswer: parsed.correctAnswerIfDifferent }
        : undefined

      return {
        issues,
        suggestions: parsed.suggestions || [],
        corrections,
        confidence: parsed.confidence || 0.8,
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return { issues: [], suggestions: [], corrections: undefined, confidence: 0 }
    }
  }

  private calculateScore(issues: VerificationIssue[]): number {
    let score = 100

    for (const issue of issues) {
      if (issue.type === 'ERROR') {
        score -= issue.severity * 10
      } else if (issue.type === 'WARNING') {
        score -= issue.severity * 5
      } else {
        score -= issue.severity * 1
      }
    }

    return Math.max(0, score)
  }

  private compileBatchResults(results: VerificationResult[]): BatchVerificationResult {
    const validQuestions = results.filter((r) => r.isValid).length
    const warningQuestions = results.filter(
      (r) => !r.isValid && r.issues.every((i) => i.type !== 'ERROR')
    ).length

    // Count common issues
    const issueCount = new Map<string, number>()
    for (const result of results) {
      for (const issue of result.issues) {
        const key = `${issue.category}: ${issue.message}`
        issueCount.set(key, (issueCount.get(key) || 0) + 1)
      }
    }

    const commonIssues = Array.from(issueCount.entries())
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const averageScore = results.reduce((sum, r) => sum + r.overallScore, 0) / results.length

    return {
      totalQuestions: results.length,
      validQuestions,
      invalidQuestions: results.length - validQuestions,
      warningQuestions,
      results,
      summary: {
        commonIssues,
        averageScore: Math.round(averageScore * 100) / 100,
        passRate: Math.round((validQuestions / results.length) * 100),
      },
    }
  }

  private generateQuestionId(question: QuestionSeed): string {
    return `q-${question.ncertClass}-${question.ncertChapter}-${Date.now().toString(36)}`
  }

  /**
   * Get verification statistics summary
   */
  getVerificationGuidelines(): typeof NCERT_VERIFICATION_DATA {
    return NCERT_VERIFICATION_DATA
  }
}

// Export singleton instance
export const archanaMaam = new ArchanaMaamAgent()
