'use client'

import dynamic from 'next/dynamic'

const NeomorphismClaudeChatBoard = dynamic(
  () => import('@/components/claudechat/NeomorphismClaudeChatBoard'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-gray-600">Loading ClaudeChat Board...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Metadata moved to layout.tsx for client component

export default function ClaudeChatPage() {
  return (
    <main className="min-h-screen">
      <NeomorphismClaudeChatBoard />
    </main>
  )
}
