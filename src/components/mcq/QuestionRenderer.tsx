'use client'

import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'
import { QuestionCard } from './QuestionCard'
import { AssertionReasonCard } from './AssertionReasonCard'
import { StatementBasedCard } from './StatementBasedCard'
import { MatchFollowingCard } from './MatchFollowingCard'
import { CountingTypeCard } from './CountingTypeCard'
import { SequenceOrderCard } from './SequenceOrderCard'
import { MTFCard } from './MTFCard'
import { DataInterpretationCard } from './DataInterpretationCard'
import { ExperimentalDesignCard } from './ExperimentalDesignCard'

interface QuestionRendererProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: string, timeSpent: number) => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
  onSkip?: () => void
  onReportError?: (questionId: string) => void
  freeUserId?: string | null
}

export default function QuestionRenderer(props: QuestionRendererProps) {
  const { question } = props

  switch (question.type) {
    case 'ASSERTION_REASON':
      return <AssertionReasonCard {...props} />
    case 'STATEMENT_BASED':
      return <StatementBasedCard {...props} />
    case 'MATCH_FOLLOWING':
      return <MatchFollowingCard {...props} />
    case 'COUNTING_TYPE':
      return <CountingTypeCard {...props} />
    case 'SEQUENCE_ORDER':
      return <SequenceOrderCard {...props} />
    case 'MTF':
      return <MTFCard {...props} />
    case 'DATA_INTERPRETATION':
      return <DataInterpretationCard {...props} />
    case 'EXPERIMENTAL_DESIGN':
      return <ExperimentalDesignCard {...props} />
    default:
      return <QuestionCard {...props} />
  }
}
