'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  MessageSquare,
  Image,
  Mic,
  FileQuestion,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface TestResult {
  name: string
  status: 'pending' | 'running' | 'success' | 'error'
  response?: string
  error?: string
  duration?: number
  metadata?: any
}

export default function AITestPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Unified Chat API', status: 'pending' },
    { name: 'Question Generator', status: 'pending' },
    { name: 'Image Analysis (Claude)', status: 'pending' },
    { name: 'Voice Processing', status: 'pending' },
    { name: 'Provider Health Check', status: 'pending' },
    { name: 'Cache Performance', status: 'pending' },
  ])

  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'completed'>('idle')
  const [selectedProvider, setSelectedProvider] = useState<'anthropic' | 'openai' | 'google'>(
    'anthropic'
  )

  const updateTestStatus = (index: number, update: Partial<TestResult>) => {
    setTests((prev) => prev.map((test, i) => (i === index ? { ...test, ...update } : test)))
  }

  const runTest = async (index: number, testFunction: () => Promise<any>) => {
    updateTestStatus(index, { status: 'running' })
    const startTime = Date.now()

    try {
      const result = await testFunction()
      const duration = Date.now() - startTime

      updateTestStatus(index, {
        status: 'success',
        response: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
        duration,
        metadata: result,
      })
    } catch (error) {
      const duration = Date.now() - startTime
      updateTestStatus(index, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        duration,
      })
    }
  }

  const testUnifiedChat = async () => {
    const response = await fetch('/api/ai/unified-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is photosynthesis? Explain it briefly.',
        context: {
          subject: 'Biology',
          studentLevel: 'class-11',
          language: 'english',
        },
        options: {
          provider: selectedProvider,
          model: 'default',
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }

  const testQuestionGenerator = async () => {
    const response = await fetch('/api/ai/question-generator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topics: ['Cell Biology', 'Photosynthesis'],
        curriculum: 'NEET',
        grade: 'class-11',
        difficulty: 'Medium',
        questionCount: 3,
        questionTypes: ['MCQ', 'SHORT_ANSWER'],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }

  const testImageAnalysis = async () => {
    // Create a test image blob (1x1 pixel)
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    ctx!.fillStyle = 'green'
    ctx!.fillRect(0, 0, 1, 1)

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('image', blob!, 'test-image.png')

        const response = await fetch('/api/claudechat/analyze-biology-image', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        resolve(await response.json())
      })
    })
  }

  const testVoiceProcessing = async () => {
    const response = await fetch('/api/claudechat/voice-explanation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Explain the process of mitosis',
        language: 'english',
        voice: 'female',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }

  const testProviderHealth = async () => {
    const response = await fetch('/api/ai/unified-chat', {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }

  const testCachePerformance = async () => {
    // Test same request twice to check caching
    const request = {
      message: 'What is DNA?',
      context: { subject: 'Biology', studentLevel: 'class-11', language: 'english' },
      options: { provider: selectedProvider },
    }

    const startTime1 = Date.now()
    const response1 = await fetch('/api/ai/unified-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const time1 = Date.now() - startTime1

    if (!response1.ok) throw new Error('First request failed')

    const startTime2 = Date.now()
    const response2 = await fetch('/api/ai/unified-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const time2 = Date.now() - startTime2

    if (!response2.ok) throw new Error('Second request failed')

    const result1 = await response1.json()
    const result2 = await response2.json()

    return {
      firstRequestTime: time1,
      secondRequestTime: time2,
      speedImprovement: `${Math.round((1 - time2 / time1) * 100)}%`,
      cached: result2.metadata?.cached || false,
    }
  }

  const runAllTests = async () => {
    setOverallStatus('running')

    const testFunctions = [
      testUnifiedChat,
      testQuestionGenerator,
      testImageAnalysis,
      testVoiceProcessing,
      testProviderHealth,
      testCachePerformance,
    ]

    for (let i = 0; i < testFunctions.length; i++) {
      await runTest(i, testFunctions[i])
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    setOverallStatus('completed')
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />
      case 'running':
        return (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'running':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Running
          </Badge>
        )
      case 'success':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Success
          </Badge>
        )
      case 'error':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Error
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Integration Test Suite</h1>
          <p className="text-gray-600">
            Test all AI features and integrations for Cerebrum Biology Academy
          </p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Test Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">AI Provider:</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  disabled={overallStatus === 'running'}
                >
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="openai">OpenAI GPT-4</option>
                  <option value="google">Google AI</option>
                </select>
              </div>
              <Button
                onClick={runAllTests}
                disabled={overallStatus === 'running'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {overallStatus === 'running' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Run All Tests
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tests.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${test.status === 'error' ? 'border-red-200' : test.status === 'success' ? 'border-green-200' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      {getStatusIcon(test.status)}
                      <span>{test.name}</span>
                    </CardTitle>
                    {getStatusBadge(test.status)}
                  </div>
                  {test.duration && (
                    <p className="text-sm text-gray-600">Completed in {test.duration}ms</p>
                  )}
                </CardHeader>
                <CardContent>
                  {test.error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Error</p>
                          <p className="text-sm text-red-700">{test.error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {test.response && (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Response:</p>
                      <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                        {test.response.length > 200
                          ? test.response.substring(0, 200) + '...'
                          : test.response}
                      </pre>
                    </div>
                  )}

                  {test.metadata && test.name === 'Cache Performance' && (
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>First Request:</span>
                        <span>{test.metadata.firstRequestTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Second Request:</span>
                        <span>{test.metadata.secondRequestTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Speed Improvement:</span>
                        <span className="text-green-600">{test.metadata.speedImprovement}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        {overallStatus === 'completed' && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Test Suite Complete!</h3>
                <p className="text-blue-700">
                  {tests.filter((t) => t.status === 'success').length} of {tests.length} tests
                  passed
                </p>
                {tests.every((t) => t.status === 'success') && (
                  <p className="text-green-700 font-medium mt-2">
                    🎉 All AI integrations are working perfectly!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
