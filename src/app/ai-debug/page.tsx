'use client'

import { useState } from 'react'

export default function AIDebugPage() {
  const [debugData, setDebugData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const debugRequest = async (provider: string, message: string, model: string) => {
    console.log('═══ REQUEST DEBUG ═══')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Provider:', provider)
    console.log('Model:', model)
    console.log('Message:', message)

    const startTime = Date.now()
    setLoading(true)

    try {
      const response = await fetch('/api/ai/unified-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context: {
            subject: 'Biology',
            studentLevel: 'class-11',
            language: 'english',
          },
          options: {
            provider,
            model,
          },
        }),
      })

      const data = await response.json()
      const endTime = Date.now()

      const debugInfo = {
        ...data,
        debug: {
          requestTime: `${endTime - startTime}ms`,
          httpStatus: response.status,
          timestamp: new Date().toISOString(),
          provider,
          model,
          message,
        },
      }

      console.log('═══ RESPONSE DEBUG ═══')
      console.log('Response Time:', `${endTime - startTime}ms`)
      console.log('HTTP Status:', response.status)
      console.log('Success:', data.success)
      console.log('Provider Used:', data.metadata?.provider)
      console.log('Model Used:', data.metadata?.model)
      console.log('Token Usage:', data.metadata?.tokensUsed)
      console.log('Cost:', data.metadata?.cost)
      console.log('Full Response:', data)

      setDebugData(debugInfo)
    } catch (error) {
      console.error('═══ ERROR DEBUG ═══')
      console.error('Full Error:', error)

      setDebugData({
        success: false,
        error: error.message,
        debug: {
          requestTime: `${Date.now() - startTime}ms`,
          timestamp: new Date().toISOString(),
          provider,
          model,
          message,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">🔍 AI Debug Console</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => debugRequest('anthropic', 'Test message', 'fast')}
          disabled={loading}
          className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          🔮 Test Anthropic (Fast)
        </button>

        <button
          onClick={() => debugRequest('google', 'Test message', 'default')}
          disabled={loading}
          className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          🔍 Test Google AI
        </button>

        <button
          onClick={() => debugRequest('openai', 'Test message', 'fast')}
          disabled={loading}
          className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          🤖 Test OpenAI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => debugRequest('anthropic', 'What is photosynthesis?', 'premium')}
          disabled={loading}
          className="bg-purple-800 text-white p-4 rounded-lg hover:bg-purple-900 disabled:opacity-50"
        >
          🧬 Anthropic Biology Test
        </button>

        <button
          onClick={() => debugRequest('google', 'Explain cell division', 'premium')}
          disabled={loading}
          className="bg-blue-800 text-white p-4 rounded-lg hover:bg-blue-900 disabled:opacity-50"
        >
          🧫 Google AI Biology Test
        </button>

        <button
          onClick={() => debugRequest(null, 'Auto-select best provider', 'default')}
          disabled={loading}
          className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          ⚡ Auto Provider Test
        </button>
      </div>

      {loading && (
        <div className="text-center p-4">
          <div className="animate-spin text-4xl">🔄</div>
          <p>Testing AI connection...</p>
        </div>
      )}

      {debugData && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">📊 Debug Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold text-green-600">✅ Request Info</h3>
              <p>
                <strong>Provider:</strong> {debugData.debug?.provider || 'Auto'}
              </p>
              <p>
                <strong>Model:</strong> {debugData.debug?.model}
              </p>
              <p>
                <strong>Request Time:</strong> {debugData.debug?.requestTime}
              </p>
              <p>
                <strong>HTTP Status:</strong> {debugData.debug?.httpStatus}
              </p>
            </div>

            <div className="bg-white p-4 rounded">
              <h3 className="font-bold text-blue-600">🤖 Response Info</h3>
              <p>
                <strong>Success:</strong> {debugData.success ? '✅ Yes' : '❌ No'}
              </p>
              <p>
                <strong>Provider Used:</strong> {debugData.metadata?.provider}
              </p>
              <p>
                <strong>Model Used:</strong> {debugData.metadata?.model}
              </p>
              <p>
                <strong>Response Time:</strong> {debugData.metadata?.responseTime}ms
              </p>
            </div>
          </div>

          {debugData.metadata && (
            <div className="bg-white p-4 rounded mb-4">
              <h3 className="font-bold text-purple-600">💰 Usage Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Input Tokens</p>
                  <p className="font-bold">{debugData.metadata.tokensUsed?.input}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Output Tokens</p>
                  <p className="font-bold">{debugData.metadata.tokensUsed?.output}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="font-bold">${debugData.metadata.cost?.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cached</p>
                  <p className="font-bold">{debugData.metadata.cached ? '✅' : '❌'}</p>
                </div>
              </div>
            </div>
          )}

          {debugData.message && (
            <div className="bg-white p-4 rounded mb-4">
              <h3 className="font-bold text-green-600">📝 AI Response</h3>
              <div className="bg-gray-50 p-3 rounded mt-2 max-h-64 overflow-y-auto">
                <p className="whitespace-pre-wrap">{debugData.message}</p>
              </div>
            </div>
          )}

          {debugData.error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded mb-4">
              <h3 className="font-bold text-red-600">❌ Error Details</h3>
              <p className="text-red-700">{debugData.error}</p>
            </div>
          )}

          <details className="bg-white p-4 rounded">
            <summary className="font-bold cursor-pointer">🔍 Raw Response Data</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}
