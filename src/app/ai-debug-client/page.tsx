'use client'

// Client-Side AI Debugging Test Page
// Demonstrates the enhanced client-side debugging system

import React, { useState } from 'react'
import { useAIDebug, useDebugLog } from '@/hooks/useAIDebug'
import AIDebugConsole from '@/components/debug/AIDebugConsole'

export default function ClientDebugTestPage() {
  const [message, setMessage] = useState('What is cellular respiration?')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const { isEnabled, activeRequests, trackAIRequest, logDebug } = useAIDebug({
    monitorComponent: 'ClientDebugTestPage',
    autoEnable: true,
    logLevel: 'detailed',
  })

  const debugLog = useDebugLog('ClientDebugTestPage')

  const handleTestRequest = async () => {
    setLoading(true)
    setResponse('')

    try {
      debugLog('Starting AI request test', { message })

      const result = await trackAIRequest(
        async () => {
          const response = await fetch('/api/ai/unified-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message,
              context: {
                subject: 'Biology',
                studentLevel: 'class-12',
                language: 'english',
              },
              options: {
                provider: 'anthropic',
                model: 'fast',
              },
            }),
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          return await response.json()
        },
        {
          subject: 'Biology',
          studentLevel: 'class-12',
          provider: 'anthropic',
        }
      )

      setResponse(result.message || 'No response received')
      debugLog('AI request completed successfully', {
        responseLength: result.message?.length,
        provider: result.metadata?.provider,
        tokens: result.metadata?.tokensUsed,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResponse(`Error: ${errorMessage}`)
      debugLog('AI request failed', { error: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTests = async () => {
    debugLog('Running quick test suite')

    const tests = [
      { message: 'What is photosynthesis?', provider: 'anthropic' },
      { message: 'Explain DNA structure', provider: 'google' },
      { message: 'Define mitosis', provider: 'anthropic' },
    ]

    for (const test of tests) {
      try {
        await trackAIRequest(
          async () => {
            const response = await fetch('/api/ai/unified-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                message: test.message,
                context: {
                  subject: 'Biology',
                  studentLevel: 'class-11',
                  language: 'english',
                },
                options: {
                  provider: test.provider,
                  model: 'fast',
                },
              }),
            })
            return await response.json()
          },
          {
            subject: 'Biology',
            studentLevel: 'class-11',
            provider: test.provider,
          }
        )
      } catch (error) {
        debugLog('Test failed', { test, error })
      }
    }

    debugLog('Quick test suite completed')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 Client-Side AI Debugging System
          </h1>
          <p className="text-gray-600">
            Test and monitor AI requests with enhanced client-side debugging capabilities.
          </p>
        </div>

        {/* Debug Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Debug Status</div>
              <div
                className={`text-lg font-semibold ${isEnabled ? 'text-green-600' : 'text-red-600'}`}
              >
                {isEnabled ? '✅ Enabled' : '❌ Disabled'}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Active Requests</div>
              <div
                className={`text-lg font-semibold ${activeRequests > 0 ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {activeRequests} requests
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Console Available</div>
              <div className="text-lg font-semibold text-green-600">✅ aiDebug.*</div>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test AI Requests</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your biology question..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleTestRequest}
                disabled={loading || !message.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Testing...' : 'Send Test Request'}
              </button>

              <button
                onClick={handleQuickTests}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Run Quick Tests
              </button>
            </div>
          </div>
        </div>

        {/* Response Display */}
        {response && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Response</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-800">{response}</pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🛠️ How to Use</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900">1. Enable Debugging</h3>
              <p>
                Open browser console and run:{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">aiDebug.enable()</code>
              </p>
              <p>Or use the debug console in the bottom-right corner</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">2. Make AI Requests</h3>
              <p>Click "Send Test Request" or "Run Quick Tests" to see debugging in action</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">3. Monitor Performance</h3>
              <p>Watch the console for detailed logs including:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Request/response timing</li>
                <li>Token usage and costs</li>
                <li>Provider performance</li>
                <li>Error analysis</li>
                <li>Educational context tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">4. Console Commands</h3>
              <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                <div>aiDebug.enable('verbose') // Enable with detailed logging</div>
                <div>aiDebug.disable() // Disable debugging</div>
                <div>aiDebug.logs() // View all logged requests</div>
                <div>aiDebug.stats() // Performance statistics</div>
                <div>aiDebug.clear() // Clear debug logs</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">5. LocalStorage Control</h3>
              <p>
                Enable persistent debugging:{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  localStorage.setItem('DEBUG_AI', 'true')
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Debug Console */}
      <AIDebugConsole position="bottom-right" defaultOpen={false} showOnlyInDevelopment={false} />
    </div>
  )
}
