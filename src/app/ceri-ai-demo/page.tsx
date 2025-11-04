'use client'

import { MobileChatInterface } from '@/components/ceri-ai/mobile/MobileChatInterface'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CeriAIDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ceri AI Demo
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Info Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Welcome to Ceri AI - Your NEET Biology Tutor
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                Experience the next generation of AI-powered learning with:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    <strong>Real-time Streaming:</strong> Get instant responses as AI thinks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    <strong>LaTeX Math Rendering:</strong> Beautiful formulas like $E = mc^2$ or
                    $\Delta G = \Delta H - T\Delta S$
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    <strong>Mobile-First Design:</strong> Perfect experience on phones, tablets, and
                    desktops
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    <strong>Smart Caching:</strong> Lightning-fast responses for common questions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Questions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Try asking Ceri AI:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <p className="text-sm sm:text-base text-gray-700">
                "Explain the Krebs cycle with chemical equations"
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <p className="text-sm sm:text-base text-gray-700">
                "What is the difference between mitosis and meiosis?"
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-sm sm:text-base text-gray-700">
                "Show me the formula for photosynthesis using LaTeX"
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
              <p className="text-sm sm:text-base text-gray-700">
                "Explain DNA replication in simple terms"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface - Full Height Container */}
      <div className="max-w-7xl mx-auto px-4 pb-6 sm:px-6 lg:px-8">
        <div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: '600px' }}
        >
          <MobileChatInterface />
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
          <p className="text-base sm:text-lg">
            Start your NEET Biology preparation journey with Ceri AI today!
          </p>
        </div>
      </div>
    </div>
  )
}
