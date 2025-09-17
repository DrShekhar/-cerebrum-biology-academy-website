import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Main Loading Spinner */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>

          {/* Inner Ring */}
          <div
            className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-primary-400 rounded-full animate-spin"
            style={{
              animation: 'spin 1s linear infinite reverse',
            }}
          ></div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">Preparing your NEET Biology content</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-sm text-gray-500 italic">
            "Success in NEET comes to those who prepare with dedication and persistence."
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  )
}
