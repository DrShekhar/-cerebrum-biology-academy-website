import { OMRAnswerKeyStatus } from '@/generated/prisma'
import {
  AnswerOption,
  SubmittedAnswers,
  SectionConfig,
  SectionResult,
  QuestionResult,
  CalculationResult,
  AnswerKey,
} from './types'
import { MARKS_CONFIG } from './constants'

export function calculateOMRResult(
  submittedAnswers: SubmittedAnswers,
  answerKeys: AnswerKey[],
  sections: SectionConfig[],
  totalQuestions: number,
  useVerifiedKey: boolean,
  marksConfig: {
    correct: number
    wrong: number
    unattempted: number
  } = MARKS_CONFIG
): CalculationResult {
  const filteredKeys = useVerifiedKey
    ? answerKeys.filter((k) => k.keyStatus === OMRAnswerKeyStatus.VERIFIED)
    : answerKeys

  const keyMap = new Map<number, AnswerKey>()
  filteredKeys.forEach((key) => {
    keyMap.set(key.questionNo, key)
  })

  const questionResults: QuestionResult[] = []
  const sectionResults: Record<string, SectionResult> = {}

  sections.forEach((section) => {
    sectionResults[section.name] = {
      total: section.end - section.start + 1,
      attempted: 0,
      correct: 0,
      wrong: 0,
      unattempted: 0,
      marks: 0,
      maxMarks: (section.end - section.start + 1) * marksConfig.correct,
      percentage: 0,
    }
  })

  let totalCorrect = 0
  let totalWrong = 0
  let totalUnattempted = 0
  let totalAttempted = 0
  let marksObtained = 0

  for (let qNo = 1; qNo <= totalQuestions; qNo++) {
    const studentAnswer = (submittedAnswers[qNo.toString()] || null) as AnswerOption
    const answerKey = keyMap.get(qNo)
    const correctAnswer = answerKey?.correctAnswer || 'X'

    const section = sections.find((s) => qNo >= s.start && qNo <= s.end)
    const sectionName = section?.name || 'Unknown'

    let isCorrect = false
    let marks = 0

    if (!studentAnswer) {
      totalUnattempted++
      marks = marksConfig.unattempted
      if (sectionResults[sectionName]) {
        sectionResults[sectionName].unattempted++
      }
    } else {
      totalAttempted++
      if (sectionResults[sectionName]) {
        sectionResults[sectionName].attempted++
      }

      if (correctAnswer === 'BONUS') {
        isCorrect = true
        marks = marksConfig.correct
        totalCorrect++
        if (sectionResults[sectionName]) {
          sectionResults[sectionName].correct++
        }
      } else if (studentAnswer === correctAnswer) {
        isCorrect = true
        marks = marksConfig.correct
        totalCorrect++
        if (sectionResults[sectionName]) {
          sectionResults[sectionName].correct++
        }
      } else {
        marks = marksConfig.wrong
        totalWrong++
        if (sectionResults[sectionName]) {
          sectionResults[sectionName].wrong++
        }
      }
    }

    marksObtained += marks
    if (sectionResults[sectionName]) {
      sectionResults[sectionName].marks += marks
    }

    questionResults.push({
      questionNo: qNo,
      section: sectionName,
      studentAnswer,
      correctAnswer,
      isCorrect,
      marks,
      explanation: answerKey?.explanation || undefined,
      topic: answerKey?.topic || undefined,
    })
  }

  Object.keys(sectionResults).forEach((sectionName) => {
    const sr = sectionResults[sectionName]
    sr.percentage = sr.maxMarks > 0 ? (sr.marks / sr.maxMarks) * 100 : 0
  })

  const maxMarks = totalQuestions * marksConfig.correct
  const percentage = maxMarks > 0 ? (marksObtained / maxMarks) * 100 : 0

  return {
    totalQuestions,
    totalAttempted,
    totalCorrect,
    totalWrong,
    totalUnattempted,
    marksObtained,
    maxMarks,
    percentage: Math.round(percentage * 100) / 100,
    sectionResults,
    questionResults,
  }
}

export function getIncorrectQuestions(result: CalculationResult): QuestionResult[] {
  return result.questionResults.filter((q) => q.studentAnswer !== null && !q.isCorrect)
}

export function getUnattemptedQuestions(result: CalculationResult): QuestionResult[] {
  return result.questionResults.filter((q) => q.studentAnswer === null)
}

export function getSectionWiseAnalysis(result: CalculationResult): {
  section: string
  correct: number
  wrong: number
  unattempted: number
  percentage: number
}[] {
  return Object.entries(result.sectionResults).map(([section, data]) => ({
    section,
    correct: data.correct,
    wrong: data.wrong,
    unattempted: data.unattempted,
    percentage: Math.round(data.percentage * 100) / 100,
  }))
}
