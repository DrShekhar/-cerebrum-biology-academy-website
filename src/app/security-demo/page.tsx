'use client'

import React, { useState } from 'react'
import SecurityMonitoringDashboard from '../../components/security/SecurityMonitoringDashboard'
import SecureTestEnvironment from '../../components/security/SecureTestEnvironment'
import { SimpleQuestion } from '../../types/simpleTest'

interface SecurityAlert {
  id: string
  type: 'security' | 'behavioral' | 'session' | 'question'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  userId: string
  userName?: string
  sessionId: string
  timestamp: number
  isRead: boolean
  isResolved: boolean
  metadata: any
}

interface SecurityViolation {
  type: 'browser' | 'behavioral' | 'session' | 'mobile'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  action: 'continue' | 'warn' | 'terminate'
  timestamp: number
}

export default function SecurityDemoPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'test'>('dashboard')
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [terminatedSessions, setTerminatedSessions] = useState<string[]>([])

  // Sample test questions for demo
  const sampleQuestions: SimpleQuestion[] = [
    {
      id: '1',
      question: 'Which of the following is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
      correctAnswer: 1,
      explanation:
        'Mitochondria are known as the powerhouse of the cell because they produce ATP through cellular respiration.',
      subject: 'biology',
      topic: 'Cell Biology',
      difficulty: 'easy',
      marks: 4,
    },
    {
      id: '2',
      question: 'What is the process by which plants make their own food?',
      options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Reproduction'],
      correctAnswer: 1,
      explanation:
        'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.',
      subject: 'biology',
      topic: 'Plant Biology',
      difficulty: 'easy',
      marks: 4,
    },
    {
      id: '3',
      question: 'Which enzyme is responsible for breaking down proteins in the stomach?',
      options: ['Amylase', 'Lipase', 'Pepsin', 'Trypsin'],
      correctAnswer: 2,
      explanation:
        'Pepsin is the main enzyme in the stomach that breaks down proteins into smaller peptides.',
      subject: 'biology',
      topic: 'Digestive System',
      difficulty: 'medium',
      marks: 4,
    },
  ]

  const handleAlert = (alert: SecurityAlert) => {
    setAlerts((prev) => [alert, ...prev])
  }

  const handleSessionTerminate = (sessionId: string, reason: string) => {
    setTerminatedSessions((prev) => [...prev, sessionId])

    const alert: SecurityAlert = {
      id: `alert_${Date.now()}`,
      type: 'security',
      severity: 'critical',
      title: 'Session Terminated',
      description: reason,
      userId: 'demo_user',
      userName: 'Demo User',
      sessionId,
      timestamp: Date.now(),
      isRead: false,
      isResolved: true,
      metadata: { reason },
    }

    handleAlert(alert)
  }

  const handleTestComplete = (results: any) => {
    console.log('Test completed with results:', results)
    alert(`Test completed! Score: ${results.score}. Security report generated.`)
    setCurrentView('dashboard')
  }

  const handleSecurityViolation = (violation: SecurityViolation) => {
    const alert: SecurityAlert = {
      id: `violation_${Date.now()}`,
      type: 'security',
      severity: violation.severity,
      title: `${violation.type} Security Violation`,
      description: violation.description,
      userId: 'demo_user',
      userName: 'Demo User',
      sessionId: 'demo_session',
      timestamp: violation.timestamp,
      isRead: false,
      isResolved: violation.action === 'terminate',
      metadata: { action: violation.action },
    }

    handleAlert(alert)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NEET Biology Test Security Demo</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive anti-cheating and test integrity demonstration
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Security Dashboard
              </button>
              <button
                onClick={() => setCurrentView('test')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentView === 'test'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Take Secure Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {currentView === 'dashboard' ? (
        <div>
          {/* Overview Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Anti-Cheating Security Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Browser Security</h3>
                  <p className="text-sm text-gray-600">
                    Fullscreen enforcement, tab monitoring, developer tools blocking
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Behavioral Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Mouse tracking, typing patterns, answer timing analysis
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Session Integrity</h3>
                  <p className="text-sm text-gray-600">
                    Device fingerprinting, IP validation, encrypted sessions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Mobile Security</h3>
                  <p className="text-sm text-gray-600">
                    App switching detection, screenshot prevention, orientation locks
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🔍 Detection Capabilities
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tab switching and window focus changes</li>
                  <li>• Copy/paste attempts and keyboard shortcuts</li>
                  <li>• Developer tools access and console usage</li>
                  <li>• Screenshot attempts and screen recording</li>
                  <li>• Mouse movement patterns and click behavior</li>
                  <li>• Typing speed and rhythm analysis</li>
                  <li>• Answer timing and pattern irregularities</li>
                  <li>• Device fingerprint changes</li>
                  <li>• IP address and location validation</li>
                  <li>• Mobile app switching and multitasking</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Real-time Actions</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Immediate violation alerts and warnings</li>
                  <li>• Progressive penalty system</li>
                  <li>• Automatic test termination for critical violations</li>
                  <li>• Session encryption and validation</li>
                  <li>• Rate limiting and abuse prevention</li>
                  <li>• Question randomization and shuffling</li>
                  <li>• Server-side answer validation</li>
                  <li>• Behavioral anomaly detection</li>
                  <li>• Risk scoring and profiling</li>
                  <li>• Comprehensive audit logging</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Dashboard */}
          <SecurityMonitoringDashboard
            onAlert={handleAlert}
            onSessionTerminate={handleSessionTerminate}
          />
        </div>
      ) : (
        <SecureTestEnvironment
          testId="demo_test_001"
          userId="demo_user_123"
          userName="Demo Student"
          questions={sampleQuestions}
          timeLimit={30} // 30 minutes
          onTestComplete={handleTestComplete}
          onSecurityViolation={handleSecurityViolation}
        />
      )}

      {/* Alert Summary */}
      {alerts.length > 0 && currentView === 'dashboard' && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h4 className="font-medium text-gray-900 mb-2">Recent Alerts</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className={`text-xs p-2 rounded ${
                  alert.severity === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : alert.severity === 'high'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                <div className="font-medium">{alert.title}</div>
                <div className="truncate">{alert.description}</div>
              </div>
            ))}
          </div>
          {alerts.length > 3 && (
            <div className="text-xs text-gray-500 mt-2">+{alerts.length - 3} more alerts</div>
          )}
        </div>
      )}
    </div>
  )
}
