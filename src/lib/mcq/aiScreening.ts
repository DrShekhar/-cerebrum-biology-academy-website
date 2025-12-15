/**
 * AI Pre-screening Module for Community Question Validation
 * Uses Claude API to validate question quality, accuracy, and NEET relevance
 */

import Anthropic from '@anthropic-ai/sdk'

export interface AIScreeningResult {
  overallScore: number
  recommendation: 'APPROVE' | 'REVIEW' | 'REJECT'
  analysis: {
    accuracy: { score: number; issues: string[] }
    clarity: { score: number; issues: string[] }
    relevance: { score: number; issues: string[] }
    optionQuality: { score: number; issues: string[] }
    explanationQuality: { score: number; issues: string[] }
  }
  suggestedImprovements: string[]
  duplicateWarning: string | null
  correctedAnswer: string | null
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface QuestionToScreen {
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic: string
  subtopic?: string
  difficulty?: string
  isPYQ?: boolean
  pyqYear?: number
}

const NEET_BIOLOGY_TOPICS = [
  'Cell Biology',
  'Genetics',
  'Evolution',
  'Ecology',
  'Human Physiology',
  'Plant Physiology',
  'Reproduction',
  'Biotechnology',
  'Biodiversity',
  'Structural Organization',
  'Biomolecules',
  'Animal Kingdom',
  'Plant Kingdom',
  'Microbes',
  'Health and Disease',
]

export async function screenQuestion(questionData: QuestionToScreen): Promise<AIScreeningResult> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const systemPrompt = `You are an expert NEET Biology question evaluator with deep knowledge of NCERT curriculum and NEET exam patterns. Your job is to evaluate community-submitted MCQ questions for:

1. **Scientific Accuracy**: Is the marked answer scientifically correct? Are all facts accurate according to NCERT and standard biology textbooks?
2. **Question Clarity**: Is the question clear, unambiguous, and well-written?
3. **NEET Relevance**: Is this question relevant to NEET Biology syllabus? Is the difficulty appropriate?
4. **Option Quality**: Are all 4 options distinct, plausible, and free from obvious hints? Are distractors reasonable?
5. **Explanation Quality**: Is the explanation educational, accurate, and helpful for students?

You must be strict about scientific accuracy. If the marked answer is incorrect, flag it immediately.

NEET Biology Topics for reference: ${NEET_BIOLOGY_TOPICS.join(', ')}`

  const userPrompt = `Evaluate this NEET Biology MCQ question:

**Question:** ${questionData.question}

**Options:**
A) ${questionData.options[0]}
B) ${questionData.options[1]}
C) ${questionData.options[2]}
D) ${questionData.options[3]}

**Marked Correct Answer:** ${questionData.correctAnswer}

**Explanation Provided:** ${questionData.explanation || 'No explanation provided'}

**Topic:** ${questionData.topic}
${questionData.subtopic ? `**Subtopic:** ${questionData.subtopic}` : ''}
${questionData.difficulty ? `**Difficulty:** ${questionData.difficulty}` : ''}
${questionData.isPYQ ? `**This is claimed to be a Previous Year Question from ${questionData.pyqYear}**` : ''}

Provide your evaluation in the following JSON format (and nothing else):
{
  "overallScore": <0-100>,
  "recommendation": "<APPROVE|REVIEW|REJECT>",
  "analysis": {
    "accuracy": {"score": <0-100>, "issues": ["<issue1>", "<issue2>"]},
    "clarity": {"score": <0-100>, "issues": ["<issue1>"]},
    "relevance": {"score": <0-100>, "issues": []},
    "optionQuality": {"score": <0-100>, "issues": []},
    "explanationQuality": {"score": <0-100>, "issues": []}
  },
  "suggestedImprovements": ["<suggestion1>", "<suggestion2>"],
  "duplicateWarning": null or "<warning message if question seems generic/common>",
  "correctedAnswer": null or "<A|B|C|D if marked answer is wrong>",
  "confidenceLevel": "<HIGH|MEDIUM|LOW>"
}

Scoring Guidelines:
- 85+ = APPROVE (good quality, ready for review)
- 60-84 = REVIEW (needs human review)
- Below 60 = REJECT (significant issues)

Be especially strict on accuracy. If the marked answer is incorrect, set accuracy score to 0 and recommendation to REJECT.`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      temperature: 0.1,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response as JSON')
    }

    const result = JSON.parse(jsonMatch[0]) as AIScreeningResult

    if (!result.overallScore || !result.recommendation || !result.analysis) {
      throw new Error('Invalid AI screening response structure')
    }

    return result
  } catch (error) {
    console.error('AI Screening Error:', error)

    return {
      overallScore: 50,
      recommendation: 'REVIEW',
      analysis: {
        accuracy: { score: 50, issues: ['AI screening failed - manual review required'] },
        clarity: { score: 50, issues: [] },
        relevance: { score: 50, issues: [] },
        optionQuality: { score: 50, issues: [] },
        explanationQuality: { score: 50, issues: [] },
      },
      suggestedImprovements: ['AI screening encountered an error. Please review manually.'],
      duplicateWarning: null,
      correctedAnswer: null,
      confidenceLevel: 'LOW',
    }
  }
}

export async function batchScreenQuestions(
  questions: QuestionToScreen[]
): Promise<Map<number, AIScreeningResult>> {
  const results = new Map<number, AIScreeningResult>()

  for (let i = 0; i < questions.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = await screenQuestion(questions[i])
    results.set(i, result)
  }

  return results
}

export function getScreeningDecision(result: AIScreeningResult): {
  autoApprove: boolean
  autoReject: boolean
  needsReview: boolean
  reason: string
} {
  if (result.correctedAnswer) {
    return {
      autoApprove: false,
      autoReject: true,
      needsReview: false,
      reason: `Marked answer appears to be incorrect. Suggested correct answer: ${result.correctedAnswer}`,
    }
  }

  if (result.analysis.accuracy.score < 50) {
    return {
      autoApprove: false,
      autoReject: true,
      needsReview: false,
      reason: 'Scientific accuracy concerns: ' + result.analysis.accuracy.issues.join(', '),
    }
  }

  if (result.overallScore >= 90 && result.confidenceLevel === 'HIGH') {
    return {
      autoApprove: true,
      autoReject: false,
      needsReview: false,
      reason: 'High quality question meeting all criteria',
    }
  }

  if (result.overallScore < 50) {
    return {
      autoApprove: false,
      autoReject: true,
      needsReview: false,
      reason: result.suggestedImprovements.join(', '),
    }
  }

  return {
    autoApprove: false,
    autoReject: false,
    needsReview: true,
    reason: 'Requires manual review: ' + result.suggestedImprovements.slice(0, 2).join(', '),
  }
}

export function formatScreeningReport(result: AIScreeningResult): string {
  const lines = [
    `## AI Screening Report`,
    ``,
    `**Overall Score:** ${result.overallScore}/100`,
    `**Recommendation:** ${result.recommendation}`,
    `**Confidence:** ${result.confidenceLevel}`,
    ``,
    `### Analysis Breakdown`,
    `- Accuracy: ${result.analysis.accuracy.score}/100`,
    `- Clarity: ${result.analysis.clarity.score}/100`,
    `- NEET Relevance: ${result.analysis.relevance.score}/100`,
    `- Option Quality: ${result.analysis.optionQuality.score}/100`,
    `- Explanation: ${result.analysis.explanationQuality.score}/100`,
  ]

  if (result.correctedAnswer) {
    lines.push(
      ``,
      `### Correction Required`,
      `Suggested correct answer: **${result.correctedAnswer}**`
    )
  }

  if (result.suggestedImprovements.length > 0) {
    lines.push(``, `### Suggested Improvements`)
    result.suggestedImprovements.forEach((imp, i) => {
      lines.push(`${i + 1}. ${imp}`)
    })
  }

  const allIssues = [
    ...result.analysis.accuracy.issues,
    ...result.analysis.clarity.issues,
    ...result.analysis.relevance.issues,
    ...result.analysis.optionQuality.issues,
    ...result.analysis.explanationQuality.issues,
  ]

  if (allIssues.length > 0) {
    lines.push(``, `### Issues Found`)
    allIssues.forEach((issue) => {
      lines.push(`- ${issue}`)
    })
  }

  if (result.duplicateWarning) {
    lines.push(``, `### Duplicate Warning`, result.duplicateWarning)
  }

  return lines.join('\n')
}
