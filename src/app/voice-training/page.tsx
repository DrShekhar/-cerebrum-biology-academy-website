'use client'

import dynamic from 'next/dynamic'

const VoiceTrainingStudio = dynamic(() => import('@/components/voice/VoiceTrainingStudio'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <div className="w-8 h-8 bg-white rounded-full" />
        </div>
        <p className="text-gray-600">Loading Voice Training Studio...</p>
      </div>
    </div>
  ),
  ssr: false,
})

// Metadata moved to layout.tsx for client component

export default function VoiceTrainingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <VoiceTrainingStudio />
    </main>
  )
}
