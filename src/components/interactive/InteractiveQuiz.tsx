'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  CheckCircle,
  XCircle,
  Clock,
  Brain,
  Trophy,
  Target,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  researchReference?: string
}

interface QuizProps {
  questions: QuizQuestion[]
  title?: string
  timeLimit?: number
  showProgress?: boolean
  className?: string
}

export const InteractiveQuiz: React.FC<QuizProps> = ({
  questions,
  title = 'NEET Biology Quiz',
  timeLimit = 300, // 5 minutes
  showProgress = true,
  className,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  )
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    if (!quizStarted || isCompleted || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, isCompleted, timeRemaining])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setShowExplanation(false)
    } else {
      setIsCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setIsCompleted(false)
    setTimeRemaining(timeLimit)
    setShowExplanation(false)
    setQuizStarted(false)
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return score + 1
      }
      return score
    }, 0)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', message: 'Excellent!' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', message: 'Great work!' }
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', message: 'Good job!' }
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-500', message: 'Keep improving!' }
    return { grade: 'C', color: 'text-orange-500', message: 'Need more practice!' }
  }

  if (!quizStarted) {
    return (
      <div
        className={cn('bg-white rounded-3xl shadow-xl p-8 text-center', className)}
      >
        <div className="mb-8">
          <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-lg mb-6">
            Test your knowledge with {questions.length} carefully crafted questions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">Time Limit</div>
            <div className="text-blue-600">{formatTime(timeLimit)}</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">Questions</div>
            <div className="text-green-600">{questions.length} Total</div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6">
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">Difficulty</div>
            <div className="text-purple-600">NEET Level</div>
          </div>
        </div>

        <Button
          variant="primary"
          size="xl"
          onClick={() => setQuizStarted(true)}
          className="w-full md:w-auto"
        >
          <Brain className="w-5 h-5 mr-2" />
          Start Quiz Challenge
        </Button>
      </div>
    )
  }

  if (isCompleted) {
    const score = calculateScore()
    const { grade, color, message } = getScoreGrade(score, questions.length)
    const percentage = (score / questions.length) * 100

    return (
      <div
        className={cn('bg-white rounded-3xl shadow-xl p-8 text-center', className)}
      >
        <div className="mb-8">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-gray-700 font-medium">Correct Answers</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className={`text-3xl font-bold mb-2 ${color}`}>{grade}</div>
              <div className="text-gray-700 font-medium">Grade</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {percentage.toFixed(0)}%
              </div>
              <div className="text-gray-700 font-medium">Score</div>
            </div>
          </div>

          <div className={`text-xl font-semibold mb-6 ${color}`}>{message}</div>

          {percentage >= 80 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-6">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-yellow-800 font-semibold">Outstanding Performance!</div>
              <div className="text-yellow-700 text-sm">
                You've demonstrated excellent understanding of NEET Biology concepts
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={restartQuiz}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Quiz
          </Button>
          <Button variant="secondary" size="lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Review Concepts
          </Button>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== null
  const isCorrect = selectedAnswers[currentQuestion] === currentQ.correctAnswer

  return (
    <div className={cn('bg-white rounded-3xl shadow-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {showProgress && (
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full animate-fadeInUp"
            />
          </div>
        )}

        <div className="text-right text-sm opacity-90 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold',
                currentQ.difficulty === 'easy' && 'bg-green-100 text-green-800',
                currentQ.difficulty === 'medium' && 'bg-yellow-100 text-yellow-800',
                currentQ.difficulty === 'hard' && 'bg-red-100 text-red-800'
              )}
            >
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {currentQ.topic}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index
            const showResult = isAnswered
            const isCorrectOption = index === currentQ.correctAnswer

            return (
              <button
                key={index}
                className={cn(
                  'w-full p-4 text-left rounded-2xl border-2 transition-all duration-200',
                  !showResult && 'hover:border-blue-300 hover:bg-blue-50',
                  !showResult && isSelected && 'border-blue-500 bg-blue-50',
                  !showResult && !isSelected && 'border-gray-200 bg-gray-50',
                  showResult && isCorrectOption && 'border-green-600 bg-green-50',
                  showResult && isSelected && !isCorrectOption && 'border-red-500 bg-red-50',
                  showResult && !isSelected && !isCorrectOption && 'border-gray-200 bg-gray-50'
                )}
                onClick={() => !isAnswered && handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold',
                      !showResult && 'border-gray-300 text-gray-500',
                      showResult && isCorrectOption && 'border-green-600 bg-green-600 text-white',
                      showResult &&
                        isSelected &&
                        !isCorrectOption &&
                        'border-red-500 bg-red-500 text-white',
                      showResult &&
                        !isSelected &&
                        !isCorrectOption &&
                        'border-gray-300 text-gray-500'
                    )}
                  >
                    {showResult ? (
                      isCorrectOption ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
{showExplanation && (
            <div
              className="overflow-hidden animate-fadeInUp"
            >
              <div
                className={cn(
                  'rounded-2xl p-6 mb-6',
                  isCorrect
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span
                    className={cn('font-semibold', isCorrect ? 'text-green-800' : 'text-red-800')}
                  >
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{currentQ.explanation}</p>

                {currentQ.researchReference && (
                  <div className="text-sm text-blue-600 italic">
                    Reference: {currentQ.researchReference}
                  </div>
                )}
              </div>
            </div>
          )}
{/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedAnswers.filter((a) => a !== null).length} of {questions.length} answered
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="ml-auto"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Trophy className="w-5 h-5 mr-2" />
                Finish Quiz
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Sample quiz data for NEET Biology
export const sampleNEETQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which of the following is the primary function of ribosomes in a cell?',
    options: ['DNA replication', 'Protein synthesis', 'Lipid metabolism', 'Cellular respiration'],
    correctAnswer: 1,
    explanation:
      'Ribosomes are the cellular organelles responsible for protein synthesis. They translate mRNA into polypeptide chains by assembling amino acids in the correct sequence.',
    difficulty: 'medium',
    topic: 'Cell Biology',
    researchReference: 'Molecular Biology of the Cell, 6th Edition (2014)',
  },
  {
    id: '2',
    question: 'In which phase of meiosis does crossing over occur?',
    options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Prophase II'],
    correctAnswer: 0,
    explanation:
      'Crossing over occurs during Prophase I of meiosis, specifically during the pachytene stage. This process increases genetic diversity by allowing exchange of genetic material between homologous chromosomes.',
    difficulty: 'hard',
    topic: 'Genetics',
    researchReference: 'Nature Reviews Genetics (2023)',
  },
  {
    id: '3',
    question: 'What is the role of chlorophyll in photosynthesis?',
    options: [
      'Carbon dioxide fixation',
      'Light energy absorption',
      'Oxygen production',
      'Sugar transport',
    ],
    correctAnswer: 1,
    explanation:
      'Chlorophyll is the primary photosynthetic pigment that absorbs light energy, particularly red and blue wavelengths, and converts it into chemical energy during the light-dependent reactions of photosynthesis.',
    difficulty: 'easy',
    topic: 'Plant Physiology',
    researchReference: 'Plant Physiology, 6th Edition (2021)',
  },
]
