'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      // Redirect to home when online
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }

    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    window.location.reload()
  }

  if (isOnline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">कनेक्शन बहाल हो गया!</h1>
          <p className="text-gray-600 mb-4">Connection Restored! Redirecting...</p>
          <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Offline Icon */}
        <motion.div
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8 mx-auto"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">📵</span>
        </motion.div>

        {/* Hindi Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">इंटरनेट कनेक्शन नहीं है</h1>

        {/* English Subtitle */}
        <p className="text-xl text-gray-600 mb-6">No Internet Connection</p>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <p className="text-gray-700 mb-4">
            आपका इंटरनेट कनेक्शन बाधित है। कृपया अपना नेटवर्क कनेक्शन जांचें।
          </p>
          <p className="text-gray-600 text-sm">
            Your internet connection is interrupted. Please check your network connection.
          </p>
        </div>

        {/* Offline Features */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <span className="mr-2">💾</span>
            ऑफलाइन सुविधाएं • Offline Features
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Cached biology lessons • कैश्ड जीव विज्ञान पाठ
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Previous notes & progress • पिछले नोट्स और प्रगति
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Practice questions • अभ्यास प्रश्न
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <span className="mr-2">🔄</span>
            दोबारा कोशिश करें • Retry ({retryCount})
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            वापस जाएं • Go Back
          </button>
        </div>

        {/* Network Tips */}
        <div className="mt-8 text-left bg-amber-50 rounded-xl p-4">
          <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            नेटवर्क टिप्स • Network Tips
          </h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• WiFi को बंद करके मोबाइल डेटा आजमाएं</li>
            <li>• Try mobile data if WiFi isn't working</li>
            <li>• हवाई जहाज मोड को चालू करके बंद करें</li>
            <li>• Toggle airplane mode on/off</li>
            <li>• राउटर को रीस्टार्ट करें</li>
            <li>• Restart your router</li>
          </ul>
        </div>

        {/* Data Usage Warning for Indian Users */}
        <div className="mt-6 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <p>डेटा बचाने के लिए, ऑफलाइन मोड में कुछ सुविधाएं सीमित हो सकती हैं।</p>
          <p>To save data, some features may be limited in offline mode.</p>
        </div>

        {/* Auto-retry indicator */}
        <div className="mt-4 text-xs text-gray-400">
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mr-2"></div>
            स्वचालित रूप से कनेक्शन की जांच कर रहे हैं...
          </div>
          <div className="mt-1">Automatically checking for connection...</div>
        </div>
      </motion.div>
    </div>
  )
}
