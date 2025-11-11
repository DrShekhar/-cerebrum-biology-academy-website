'use client'

import React, { useState, useEffect, useRef } from 'react'
import BrowserSecurityManager, { SecurityEvent } from '../../lib/security/browserSecurity'
import BehavioralAnalyzer, { BehavioralProfile } from '../../lib/security/behavioralAnalysis'
import SessionIntegrityManager from '../../lib/security/sessionIntegrity'
import QuestionSecurityManager from '../../lib/security/questionSecurity'
import MobileSecurityManager, { MobileSecurityEvent } from '../../lib/security/mobileSecurity'
import { SimpleQuestion, TestResponse } from '../../types/simpleTest'

interface SecureTestProps {
  testId: string
  userId: string
  userName: string
  questions: SimpleQuestion[]
  timeLimit: number // minutes
  onTestComplete: (results: TestResults) => void
  onSecurityViolation: (violation: SecurityViolation) => void
}

interface TestResults {
  responses: TestResponse[]
  score: number
  timeSpent: number
  securityReport: SecurityReport
}

interface SecurityViolation {
  type: 'browser' | 'behavioral' | 'session' | 'mobile'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  action: 'continue' | 'warn' | 'terminate'
  timestamp: number
}

interface SecurityReport {
  sessionId: string
  browserSecurity: any
  behavioralAnalysis: BehavioralProfile
  sessionIntegrity: any
  mobileSecurity?: any
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical'
  totalViolations: number
  recommendations: string[]
}

export function SecureTestEnvironment({
  testId,
  userId,
  userName,
  questions,
  timeLimit,
  onTestComplete,
  onSecurityViolation,
}: SecureTestProps) {
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<TestResponse[]>([])
  const [testStartTime] = useState(Date.now())
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60 * 1000)
  const [isTestActive, setIsTestActive] = useState(false)
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [securityMessage, setSecurityMessage] = useState('')

  // Security managers
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const browserSecurityRef = useRef<BrowserSecurityManager | null>(null)
  const behavioralAnalyzerRef = useRef<BehavioralAnalyzer | null>(null)
  const sessionManagerRef = useRef<SessionIntegrityManager | null>(null)
  const questionSecurityRef = useRef<QuestionSecurityManager | null>(null)
  const mobileSecurityRef = useRef<MobileSecurityManager | null>(null)

  // Security state
  const [securityStatus, setSecurityStatus] = useState<{
    browserActive: boolean
    behavioralActive: boolean
    sessionActive: boolean
    mobileActive: boolean
    violationCount: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
  }>({
    browserActive: false,
    behavioralActive: false,
    sessionActive: false,
    mobileActive: false,
    violationCount: 0,
    riskLevel: 'low',
  })

  // Current question state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isMarkedForReview, setIsMarkedForReview] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  /**
   * Initialize security systems
   */
  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        // Initialize browser security
        browserSecurityRef.current = new BrowserSecurityManager(
          sessionId,
          userId,
          {
            enforceFullscreen: true,
            allowTabSwitching: false,
            maxTabSwitches: 2,
            allowCopyPaste: false,
            allowRightClick: false,
            allowDevTools: false,
            autoTerminateOnViolation: false,
            warningThreshold: 5,
          },
          handleSecurityViolation
        )

        // Initialize behavioral analyzer
        behavioralAnalyzerRef.current = new BehavioralAnalyzer(
          userId,
          sessionId,
          handleSuspiciousActivity
        )

        // Initialize session manager
        sessionManagerRef.current = new SessionIntegrityManager(
          handleSessionViolation,
          handleSessionTerminated
        )

        // Initialize question security
        questionSecurityRef.current = new QuestionSecurityManager()

        // Initialize mobile security if on mobile
        if (isMobileDevice()) {
          mobileSecurityRef.current = new MobileSecurityManager(
            sessionId,
            userId,
            {
              allowAppSwitching: false,
              allowScreenRecording: false,
              allowScreenshots: false,
              lockOrientation: true,
              allowedOrientations: ['portrait'],
            },
            handleMobileViolation
          )
        }

        // Create secure session
        if (sessionManagerRef.current) {
          await sessionManagerRef.current.createSession(userId, testId, timeLimit)
        }

        // Create question pool
        if (questionSecurityRef.current) {
          await questionSecurityRef.current.createQuestionPool(testId, questions, {
            questionsPerUser: questions.length,
            shuffleOptions: true,
            timeBasedUnlock: false,
            questionTimeLimit: 300, // 5 minutes per question
          })
        }

        updateSecurityStatus()
      } catch (error) {
        console.error('Failed to initialize security systems:', error)
        alert('Security initialization failed. Please refresh and try again.')
      }
    }

    initializeSecurity()

    // Cleanup on unmount
    return () => {
      stopSecurity()
    }
  }, [])

  /**
   * Start the test and security monitoring
   */
  const startTest = async () => {
    try {
      // Start all security systems
      browserSecurityRef.current?.startMonitoring()
      behavioralAnalyzerRef.current?.startMonitoring()
      mobileSecurityRef.current?.startMonitoring()

      // Start test
      setIsTestActive(true)
      startQuestionTracking(0)

      updateSecurityStatus()
    } catch (error) {
      console.error('Failed to start test:', error)
      alert('Failed to start test. Please try again.')
    }
  }

  /**
   * Stop security monitoring
   */
  const stopSecurity = () => {
    browserSecurityRef.current?.stopMonitoring()
    behavioralAnalyzerRef.current?.stopMonitoring()
    mobileSecurityRef.current?.stopMonitoring()

    if (sessionManagerRef.current) {
      sessionManagerRef.current.terminateSession('Test completed')
    }

    updateSecurityStatus()
  }

  /**
   * Handle security violations
   */
  const handleSecurityViolation = (event: SecurityEvent) => {
    const violation: SecurityViolation = {
      type: 'browser',
      severity: event.severity,
      description: `${event.type}: ${JSON.stringify(event.details)}`,
      action: event.severity === 'critical' ? 'terminate' : 'warn',
      timestamp: event.timestamp,
    }

    processViolation(violation)
  }

  /**
   * Handle suspicious behavioral activity
   */
  const handleSuspiciousActivity = (activity: string, severity: 'low' | 'medium' | 'high') => {
    const violation: SecurityViolation = {
      type: 'behavioral',
      severity,
      description: activity,
      action: severity === 'high' ? 'warn' : 'continue',
      timestamp: Date.now(),
    }

    processViolation(violation)
  }

  /**
   * Handle session violations
   */
  const handleSessionViolation = (
    violation: string,
    severity: 'low' | 'medium' | 'high' | 'critical'
  ) => {
    const securityViolation: SecurityViolation = {
      type: 'session',
      severity,
      description: violation,
      action: severity === 'critical' ? 'terminate' : 'warn',
      timestamp: Date.now(),
    }

    processViolation(securityViolation)
  }

  /**
   * Handle session termination
   */
  const handleSessionTerminated = (reason: string) => {
    setSecurityMessage(`Test terminated: ${reason}`)
    forceCompleteTest()
  }

  /**
   * Handle mobile security violations
   */
  const handleMobileViolation = (event: MobileSecurityEvent) => {
    const violation: SecurityViolation = {
      type: 'mobile',
      severity: event.severity,
      description: `${event.type}: ${JSON.stringify(event.details)}`,
      action: event.severity === 'critical' ? 'terminate' : 'warn',
      timestamp: event.timestamp,
    }

    processViolation(violation)
  }

  /**
   * Process security violations
   */
  const processViolation = (violation: SecurityViolation) => {
    onSecurityViolation(violation)

    if (violation.action === 'terminate') {
      setSecurityMessage(`Test terminated due to security violation: ${violation.description}`)
      forceCompleteTest()
    } else if (violation.action === 'warn') {
      setSecurityMessage(`Security warning: ${violation.description}`)
      setShowSecurityWarning(true)
      setTimeout(() => setShowSecurityWarning(false), 5000)
    }

    updateSecurityStatus()
  }

  /**
   * Update security status display
   */
  const updateSecurityStatus = () => {
    const browserStatus = browserSecurityRef.current?.getSecurityStatus()
    const behavioralProfile = behavioralAnalyzerRef.current?.generateBehavioralProfile()
    const sessionStatus = sessionManagerRef.current?.getSessionStatus()
    const mobileStatus = mobileSecurityRef.current?.getMobileSecurityStatus()

    setSecurityStatus({
      browserActive: browserStatus?.isActive || false,
      behavioralActive: !!behavioralProfile,
      sessionActive: sessionStatus?.isActive || false,
      mobileActive: mobileStatus?.isActive || false,
      violationCount: (browserStatus?.violationCount || 0) + (mobileStatus?.violationCount || 0),
      riskLevel: browserStatus?.riskLevel || 'low',
    })
  }

  /**
   * Start tracking for a new question
   */
  const startQuestionTracking = (questionIndex: number) => {
    const question = questions[questionIndex]
    if (question) {
      behavioralAnalyzerRef.current?.startQuestionTracking(question.id)
      setQuestionStartTime(Date.now())
      setSelectedAnswer(null)
      setIsMarkedForReview(false)
    }
  }

  /**
   * Submit answer for current question
   */
  const submitAnswer = () => {
    const question = questions[currentQuestionIndex]
    if (!question) return

    const timeTaken = Date.now() - questionStartTime

    const response: TestResponse = {
      questionId: question.id,
      selectedAnswer,
      isMarkedForReview,
      timeTaken: timeTaken / 1000, // Convert to seconds
    }

    // Record with behavioral analyzer
    behavioralAnalyzerRef.current?.recordAnswer(
      question.id,
      selectedAnswer,
      false // Track if answer was changed
    )

    // Add to responses
    setResponses((prev) => [...prev, response])

    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      startQuestionTracking(currentQuestionIndex + 1)
    } else {
      completeTest()
    }
  }

  /**
   * Complete the test
   */
  const completeTest = () => {
    setIsTestActive(false)
    generateTestResults()
  }

  /**
   * Force complete test due to security violations
   */
  const forceCompleteTest = () => {
    setIsTestActive(false)
    generateTestResults()
  }

  /**
   * Generate final test results with security report
   */
  const generateTestResults = () => {
    const timeSpent = Date.now() - testStartTime

    // Calculate score
    const score = responses.reduce((total, response) => {
      const question = questions.find((q) => q.id === response.questionId)
      if (question && response.selectedAnswer === question.correctAnswer) {
        return total + question.marks
      }
      return total
    }, 0)

    // Generate security report
    const securityReport: SecurityReport = {
      sessionId,
      browserSecurity: browserSecurityRef.current?.generateSecurityReport(),
      behavioralAnalysis:
        behavioralAnalyzerRef.current?.generateBehavioralProfile() || ({} as BehavioralProfile),
      sessionIntegrity: sessionManagerRef.current?.generateSessionReport(),
      mobileSecurity: mobileSecurityRef.current?.generateMobileSecurityReport(),
      overallRiskLevel: calculateOverallRiskLevel(),
      totalViolations: securityStatus.violationCount,
      recommendations: generateSecurityRecommendations(),
    }

    const results: TestResults = {
      responses,
      score,
      timeSpent,
      securityReport,
    }

    stopSecurity()
    onTestComplete(results)
  }

  /**
   * Calculate overall risk level
   */
  const calculateOverallRiskLevel = (): 'low' | 'medium' | 'high' | 'critical' => {
    const browserStatus = browserSecurityRef.current?.getSecurityStatus()
    const behavioralProfile = behavioralAnalyzerRef.current?.generateBehavioralProfile()

    if (browserStatus?.riskLevel === 'critical' || !behavioralProfile?.isHuman) {
      return 'critical'
    }

    if (securityStatus.violationCount > 10) return 'high'
    if (securityStatus.violationCount > 5) return 'medium'
    return 'low'
  }

  /**
   * Generate security recommendations
   */
  const generateSecurityRecommendations = (): string[] => {
    const recommendations: string[] = []

    if (securityStatus.violationCount > 5) {
      recommendations.push('High number of security violations detected')
    }

    const behavioralProfile = behavioralAnalyzerRef.current?.generateBehavioralProfile()
    if (behavioralProfile && !behavioralProfile.isHuman) {
      recommendations.push('Non-human behavior patterns detected')
    }

    return recommendations
  }

  /**
   * Check if device is mobile
   */
  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  /**
   * Timer effect
   */
  useEffect(() => {
    if (!isTestActive) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          completeTest()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTestActive])

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!isTestActive && !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Secure Test Environment</h2>
          <p className="text-gray-600 mb-6">
            This test uses advanced security measures to ensure integrity. Please ensure you're in a
            quiet environment with stable internet.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <div>✓ Browser Security: Active</div>
            <div>✓ Behavioral Analysis: Active</div>
            <div>✓ Session Integrity: Active</div>
            {isMobileDevice() && <div>✓ Mobile Security: Active</div>}
          </div>
          <button
            onClick={startTest}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
          >
            Start Secure Test
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Security Warning Overlay */}
      {showSecurityWarning && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Security Warning</h3>
            <p className="text-gray-700">{securityMessage}</p>
          </div>
        </div>
      )}

      {/* Test Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">NEET Biology Test</h1>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Security Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${securityStatus.riskLevel === 'low' ? 'bg-green-500' : 'bg-red-500'}`}
                ></div>
                <span className="text-sm text-gray-600">Security: {securityStatus.riskLevel}</span>
              </div>
              {/* Timer */}
              <div className="text-lg font-mono text-gray-900">{formatTime(timeRemaining)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentQuestion && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      className="mr-3"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isMarkedForReview}
                    onChange={(e) => setIsMarkedForReview(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Mark for Review</span>
                </label>

                <div className="flex space-x-4">
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? 'Submit Test'
                      : 'Next Question'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Security Status Panel */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Security Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div
              className={`text-center p-2 rounded ${securityStatus.browserActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              Browser Security
            </div>
            <div
              className={`text-center p-2 rounded ${securityStatus.behavioralActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              Behavioral Analysis
            </div>
            <div
              className={`text-center p-2 rounded ${securityStatus.sessionActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              Session Integrity
            </div>
            {isMobileDevice() && (
              <div
                className={`text-center p-2 rounded ${securityStatus.mobileActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                Mobile Security
              </div>
            )}
          </div>
          {securityStatus.violationCount > 0 && (
            <div className="mt-2 text-xs text-red-600">
              {securityStatus.violationCount} security violation(s) detected
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SecureTestEnvironment
