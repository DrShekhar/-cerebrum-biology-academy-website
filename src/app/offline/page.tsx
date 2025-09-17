'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  WifiOff,
  BookOpen,
  Clock,
  RefreshCw,
  Download,
  CheckCircle,
  AlertCircle,
  Smartphone,
} from 'lucide-react'

export default function OfflinePage() {
  useEffect(() => {
    document.title = 'Offline - Cerebrum Biology Academy'

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'You are currently offline. Some features are still available for your NEET preparation.'
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full mx-auto text-center border-2 border-blue-200 shadow-xl">
        <CardHeader className="pb-6">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <WifiOff className="w-10 h-10 text-blue-600" />
          </div>

          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">You're Offline</CardTitle>

          <p className="text-lg text-gray-600">
            No internet connection, but your NEET preparation continues!
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Offline Features Available */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Available Offline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">Cached Study Materials</h4>
                <p className="text-sm text-green-600 mt-1">
                  Access previously viewed notes and diagrams
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">Offline Mock Tests</h4>
                <p className="text-sm text-green-600 mt-1">Take downloaded practice tests</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Download className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">Downloaded Videos</h4>
                <p className="text-sm text-green-600 mt-1">Watch previously downloaded lectures</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Smartphone className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">PWA Features</h4>
                <p className="text-sm text-green-600 mt-1">Full app experience offline</p>
              </div>
            </div>
          </div>

          {/* Limited Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              Limited While Offline
            </h3>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• Live classes and real-time interactions</li>
                <li>• New content downloads and updates</li>
                <li>• Payment processing and enrollments</li>
                <li>• WhatsApp support and live chat</li>
                <li>• Latest announcements and notifications</li>
              </ul>
            </div>
          </div>

          {/* Offline Study Tips */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📚 Offline Study Tips for NEET Biology
            </h3>
            <div className="text-sm text-blue-800 space-y-2 text-left">
              <p>• Review your downloaded notes and diagrams</p>
              <p>• Practice with offline mock tests</p>
              <p>• Watch downloaded video lectures</p>
              <p>• Work on biology diagrams and flowcharts</p>
              <p>• Revise formulas and important concepts</p>
              <p>• Plan your study schedule for when you're back online</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.ready.then((registration) => {
                    if (registration.sync) {
                      registration.sync.register('retry-connection')
                    }
                  })
                }
              }}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Retry Connection
            </Button>
          </div>

          {/* Connection Status */}
          <div className="text-sm text-gray-500">
            <p>
              We'll automatically reconnect you when your internet is back.
              <br />
              Your progress will be saved and synced.
            </p>
          </div>
        </CardContent>
      </Card>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Check for connection and auto-redirect
            function checkConnection() {
              if (navigator.onLine) {
                window.location.href = '/'
              }
            }

            // Check every 5 seconds
            setInterval(checkConnection, 5000)

            // Listen for online event
            window.addEventListener('online', checkConnection)

            // Check immediately
            checkConnection()
          `,
        }}
      />
    </div>
  )
}
