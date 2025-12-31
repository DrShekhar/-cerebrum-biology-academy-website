'use client'

// Visual AI Debug Console Component
// Provides a beautiful UI for monitoring AI requests and performance

import React, { useState, useEffect } from 'react'
import { useAIDebug } from '@/hooks/useAIDebug'

export interface AIDebugConsoleProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  defaultOpen?: boolean
  showOnlyInDevelopment?: boolean
}

export default function AIDebugConsole({
  position = 'bottom-right',
  defaultOpen = false,
  showOnlyInDevelopment = true,
}: AIDebugConsoleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeTab, setActiveTab] = useState<'logs' | 'stats' | 'config'>('logs')
  const { isEnabled, logs, stats, activeRequests, enable, disable, getLogs, getStats, clearLogs } =
    useAIDebug()

  // Update data periodically
  useEffect(() => {
    if (isOpen && isEnabled) {
      const interval = setInterval(() => {
        getLogs()
        getStats()
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isOpen, isEnabled, getLogs, getStats])

  // Hide in production if specified
  if (showOnlyInDevelopment && process.env.NODE_ENV === 'production') {
    return null
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-mono`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isEnabled ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-600 text-gray-200 shadow-md'}
          ${activeRequests > 0 ? 'animate-pulse' : ''}
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
      >
        🤖 AI Debug {activeRequests > 0 && `(${activeRequests})`}
      </button>

      {/* Debug Console */}
      {isOpen && (
        <div className="mt-2 w-96 bg-gray-900 text-green-400 rounded-lg shadow-2xl border border-gray-700 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">AI Debug Console</span>
              {isEnabled && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Controls */}
          <div className="p-3 border-b border-gray-700 space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => enable('detailed')}
                disabled={isEnabled}
                className={`
                  px-2 py-1 text-xs rounded transition-colors
                  ${
                    isEnabled
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }
                `}
              >
                Enable
              </button>
              <button
                onClick={disable}
                disabled={!isEnabled}
                className={`
                  px-2 py-1 text-xs rounded transition-colors
                  ${
                    !isEnabled
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }
                `}
              >
                Disable
              </button>
              <button
                onClick={clearLogs}
                className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1">
              {(['logs', 'stats', 'config'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-2 py-1 text-xs rounded transition-colors capitalize
                    ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-3 overflow-y-auto max-h-64">
            {!isEnabled ? (
              <div className="text-center text-gray-500 text-sm py-4">
                Enable debugging to see AI request logs and performance metrics
              </div>
            ) : (
              <>
                {/* Logs Tab */}
                {activeTab === 'logs' && (
                  <div className="space-y-2">
                    {logs.length === 0 ? (
                      <div className="text-gray-500 text-sm text-center py-2">
                        No AI requests logged yet
                      </div>
                    ) : (
                      logs.slice(0, 10).map((log) => (
                        <div
                          key={log.id}
                          className={`
                            p-2 rounded text-xs border-l-2
                            ${
                              log.type === 'request'
                                ? 'bg-blue-900/30 border-blue-500'
                                : log.type === 'response'
                                  ? 'bg-green-900/30 border-green-600'
                                  : 'bg-red-900/30 border-red-500'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">
                              {log.type === 'request'
                                ? '🔄'
                                : log.type === 'response'
                                  ? '✅'
                                  : '❌'}
                              {log.id.slice(-6)}
                            </span>
                            <span className="text-gray-400">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>

                          {log.duration && (
                            <div className="text-yellow-400">⏱️ {log.duration}ms</div>
                          )}

                          {log.tokens && (
                            <div className="text-purple-400">
                              🪙 {log.tokens.input + log.tokens.output} tokens
                              {log.tokens.cost && ` ($${log.tokens.cost.toFixed(4)})`}
                            </div>
                          )}

                          {log.context?.subject && (
                            <div className="text-blue-400">
                              🎓 {log.context.subject} - {log.context.studentLevel}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                  <div className="space-y-3">
                    {stats ? (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-gray-800 p-2 rounded">
                            <div className="text-gray-400">Total Requests</div>
                            <div className="text-lg font-bold text-green-400">
                              {stats.totalRequests}
                            </div>
                          </div>
                          <div className="bg-gray-800 p-2 rounded">
                            <div className="text-gray-400">Success Rate</div>
                            <div className="text-lg font-bold text-blue-400">
                              {stats.successRate}
                            </div>
                          </div>
                          <div className="bg-gray-800 p-2 rounded">
                            <div className="text-gray-400">Avg Duration</div>
                            <div className="text-lg font-bold text-yellow-400">
                              {stats.avgDuration}
                            </div>
                          </div>
                          <div className="bg-gray-800 p-2 rounded">
                            <div className="text-gray-400">Total Cost</div>
                            <div className="text-lg font-bold text-purple-400">
                              {stats.totalCost}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded text-xs">
                          <div className="text-gray-400 mb-1">Total Tokens</div>
                          <div className="text-lg font-bold text-blue-400">
                            {stats.totalTokens?.toLocaleString() || 0}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm text-center py-2">
                        No statistics available yet
                      </div>
                    )}
                  </div>
                )}

                {/* Config Tab */}
                {activeTab === 'config' && (
                  <div className="space-y-3 text-xs">
                    <div className="space-y-2">
                      <div className="text-gray-400">Debug Status</div>
                      <div
                        className={`font-semibold ${isEnabled ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-gray-400">Console Shortcuts</div>
                      <div className="bg-gray-800 p-2 rounded font-mono text-xs">
                        <div>aiDebug.enable()</div>
                        <div>aiDebug.disable()</div>
                        <div>aiDebug.logs()</div>
                        <div>aiDebug.stats()</div>
                        <div>aiDebug.clear()</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-gray-400">LocalStorage</div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div>DEBUG_AI: {localStorage.getItem('DEBUG_AI') || 'false'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
