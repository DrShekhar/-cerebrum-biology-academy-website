'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { MockTest, TestResponse } from '@/types/mockTest'
import { Button } from '@/components/ui/Button'
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  RotateCcw,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Flag,
  CheckCircle,
  Circle,
  AlertTriangle,
  Smartphone,
} from 'lucide-react'
interface MobileTestInterfaceProps {
  test: MockTest
  userClass: 'class-11' | 'class-12' | 'dropper'
  onTestComplete: (responses: TestResponse[], timeTaken: number) => void
  onTestExit: () => void
}

interface LocalQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
  negativeMarks: number
  subject: string
  topic: string
  imageUrl?: string
}

interface SwipeGesture {
  deltaX: number
  velocity: number
}

export function MobileTestInterface({
  test,
  userClass,
  onTestComplete,
  onTestExit,
}: MobileTestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60) // Convert to seconds
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showQuestionPalette, setShowQuestionPalette] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const questionRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | undefined>(undefined)

  // Mock questions - in real implementation, this would come from props
  const questions: LocalQuestion[] = []
  const currentQuestion = questions[currentQuestionIndex]

  // Touch and gesture handling
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  // Initialize test
  useEffect(() => {
    if (!testStarted) {
      startTimeRef.current = Date.now()
      setTestStarted(true)
    }
  }, [testStarted])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else {
      handleSubmitTest()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeRemaining])

  // Shake gesture detection
  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity
      if (acceleration) {
        const totalAcceleration = Math.sqrt(
          Math.pow(acceleration.x || 0, 2) +
            Math.pow(acceleration.y || 0, 2) +
            Math.pow(acceleration.z || 0, 2)
        )

        if (totalAcceleration > 20) {
          handleShakeToClear()
        }
      }
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion)
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleDeviceMotion)
      }
    }
  }, [currentQuestionIndex])

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)

    if (isVerticalSwipe) return // Ignore vertical swipes

    if (isLeftSwipe && currentQuestionIndex < questions.length - 1) {
      handleNextQuestion()
    }
    if (isRightSwipe && currentQuestionIndex > 0) {
      handlePreviousQuestion()
    }
  }, [touchStart, touchEnd, currentQuestionIndex, questions.length])

  // Pan gesture for Framer Motion
  const handlePan = useCallback(
    (event: any, info: PanInfo) => {
      const { offset, velocity } = info

      if (Math.abs(offset.x) > 100 && Math.abs(velocity.x) > 500) {
        if (offset.x > 0 && currentQuestionIndex > 0) {
          handlePreviousQuestion()
        } else if (offset.x < 0 && currentQuestionIndex < questions.length - 1) {
          handleNextQuestion()
        }
      }
    },
    [currentQuestionIndex, questions.length]
  )

  const handleShakeToClear = () => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
      setIsShaking(true)
      const newAnswers = { ...selectedAnswers }
      delete newAnswers[currentQuestionIndex]
      setSelectedAnswers(newAnswers)

      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50])
      }

      setTimeout(() => setIsShaking(false), 300)
    }
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }))

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions)
    if (flaggedQuestions.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex)
    } else {
      newFlagged.add(currentQuestionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const handleSubmitTest = () => {
    const responses: TestResponse[] = questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: selectedAnswers[index]?.toString(),
      isCorrect: selectedAnswers[index] === question.correctAnswer,
      timeTaken: 0, // Would track individual question time in real implementation
      isMarkedForReview: flaggedQuestions.has(index),
      confidence: 'medium' as const,
    }))

    const totalTime = test.duration * 60 - timeRemaining
    onTestComplete(responses, totalTime)
  }

  const toggleFullScreen = async () => {
    try {
      if (!isFullScreen) {
        await document.documentElement.requestFullscreen()
        setIsFullScreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullScreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getQuestionStatus = (index: number) => {
    if (selectedAnswers[index] !== undefined) return 'answered'
    if (flaggedQuestions.has(index)) return 'flagged'
    if (index === currentQuestionIndex) return 'current'
    return 'unanswered'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-600 text-white'
      case 'flagged':
        return 'bg-yellow-500 text-white'
      case 'current':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Questions Available</h2>
          <p className="text-gray-600 mb-4">This test doesn't have any questions configured.</p>
          <Button onClick={onTestExit}>Back to Tests</Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`mobile-test-interface min-h-screen bg-white flex flex-col ${isFullScreen ? 'fullscreen' : ''}`}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(true)}
            className="touch-target"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="text-sm font-medium text-gray-900">
            Q {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Timer */}
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-1" />
            {formatTime(timeRemaining)}
          </div>

          {/* Fullscreen Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleFullScreen} className="touch-target">
            {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Question Content */}
      <div
        ref={questionRef}
        className="flex-1 p-4 pb-20 overflow-y-auto animate-fadeInUp"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPan={handlePan}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
      >
        {/* Question */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {currentQuestion.marks} marks
              </span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                {currentQuestion.difficulty}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFlagQuestion}
              className={`touch-target ${flaggedQuestions.has(currentQuestionIndex) ? 'text-yellow-600' : 'text-gray-400'}`}
            >
              <Flag className="w-5 h-5" />
            </Button>
          </div>

          <h2 className="text-lg font-medium text-gray-900 leading-relaxed mb-4">
            {currentQuestion.question}
          </h2>

          {currentQuestion.imageUrl && (
            <div className="mb-4 relative">
              <Image
                src={currentQuestion.imageUrl}
                alt="Question illustration"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-sm"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 touch-target ripple-effect ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    {!isSelected && <Circle className="w-4 h-4 text-gray-300" />}
                  </div>
                  <span className="text-base">{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Swipe Hint */}
        <div className="text-center text-gray-400 text-sm">
          <Smartphone className="w-4 h-4 inline mr-1" />
          Swipe left/right to navigate • Shake to clear answer
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className="bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="touch-target-large"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </Button>

          <Button
            variant="ghost"
            onClick={() => setShowQuestionPalette(true)}
            className="touch-target px-4 py-2"
          >
            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((i) => {
                const status = getQuestionStatus(currentQuestionIndex + i - 2)
                return <div key={i} className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
              })}
            </div>
          </Button>

          <Button
            variant={currentQuestionIndex === questions.length - 1 ? 'primary' : 'outline'}
            onClick={
              currentQuestionIndex === questions.length - 1 ? handleSubmitTest : handleNextQuestion
            }
            className="touch-target-large"
          >
            {currentQuestionIndex === questions.length - 1 ? (
              <>
                Submit
                <CheckCircle className="w-5 h-5 ml-1" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </div>
      </footer>

      {/* Side Menu */}
{showMenu && (
          <div
            className="fixed inset-0 z-50 animate-fadeInUp"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMenu(false)}
            />
            <div
              className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl animate-fadeInUp"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Test Menu</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowMenu(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      handleShakeToClear()
                      setShowMenu(false)
                    }}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Clear Current Answer
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setAudioEnabled(!audioEnabled)
                      setShowMenu(false)
                    }}
                  >
                    {audioEnabled ? (
                      <Volume2 className="w-5 h-5 mr-2" />
                    ) : (
                      <VolumeX className="w-5 h-5 mr-2" />
                    )}
                    {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setShowQuestionPalette(true)
                      setShowMenu(false)
                    }}
                  >
                    <Menu className="w-5 h-5 mr-2" />
                    Question Palette
                  </Button>

                  <hr className="my-4" />

                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to exit the test? Your progress will be lost.'
                        )
                      ) {
                        onTestExit()
                      }
                    }}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Exit Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
{/* Question Palette */}
{showQuestionPalette && (
          <div
            className="fixed inset-0 z-50 animate-fadeInUp"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowQuestionPalette(false)}
            />
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-96 overflow-y-auto animate-fadeInUp"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Question Palette</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowQuestionPalette(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {questions.map((_, index) => {
                    const status = getQuestionStatus(index)
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentQuestionIndex(index)
                          setShowQuestionPalette(false)
                        }}
                        className={`aspect-square rounded-lg text-sm font-medium touch-target transition-all ${getStatusColor(status)}`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-green-600 mr-2" />
                    Answered
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-yellow-500 mr-2" />
                    Flagged
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-blue-500 mr-2" />
                    Current
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-gray-200 mr-2" />
                    Unanswered
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
</div>
  )
}
