'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

function JoinDemoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [status, setStatus] = useState<'form' | 'loading' | 'joining' | 'error'>('form')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    meetingNumber: searchParams.get('m') || '',
    password: searchParams.get('pwd') || '',
    userName: '',
    userEmail: '',
  })

  // Check if SDK is configured
  const [sdkConfigured, setSdkConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/zoom/signature')
      .then((res) => res.json())
      .then((data) => setSdkConfigured(data.configured))
      .catch(() => setSdkConfigured(false))
  }, [])

  const joinMeeting = useCallback(async () => {
    if (!formData.meetingNumber || !formData.userName) {
      setError('Please fill in all required fields')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      // Get signature from server
      const signatureRes = await fetch('/api/zoom/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: formData.meetingNumber,
          role: 0, // Attendee
        }),
      })

      const signatureData = await signatureRes.json()

      if (!signatureData.success) {
        throw new Error(signatureData.error || 'Failed to get signature')
      }

      setStatus('joining')

      // Dynamically import Zoom SDK (client-side only)
      const ZoomMtgEmbedded = (await import('@zoom/meetingsdk/embedded')).default

      const client = ZoomMtgEmbedded.createClient()

      // Get or create the meeting container
      let meetingContainer = document.getElementById('meetingSDKElement')
      if (!meetingContainer) {
        meetingContainer = document.createElement('div')
        meetingContainer.id = 'meetingSDKElement'
        meetingContainer.style.position = 'fixed'
        meetingContainer.style.top = '0'
        meetingContainer.style.left = '0'
        meetingContainer.style.width = '100%'
        meetingContainer.style.height = '100%'
        meetingContainer.style.zIndex = '9999'
        document.body.appendChild(meetingContainer)
      }

      await client.init({
        zoomAppRoot: meetingContainer,
        language: 'en-US',
        patchJsMedia: true,
        leaveOnPageUnload: true,
      })

      await client.join({
        signature: signatureData.signature,
        sdkKey: signatureData.sdkKey,
        meetingNumber: signatureData.meetingNumber,
        password: formData.password,
        userName: formData.userName,
        userEmail: formData.userEmail || undefined,
      })

      setStatus('joining')
    } catch (err) {
      console.error('Join meeting error:', err)
      setError(err instanceof Error ? err.message : 'Failed to join meeting')
      setStatus('error')
    }
  }, [formData])

  if (sdkConfigured === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (sdkConfigured === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div
          className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl animate-fadeInUp"
        >
          <div className="mb-4 text-6xl">🎥</div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Meeting Room Coming Soon</h1>
          <p className="mb-6 text-gray-600">
            Our integrated video classroom is being set up. For now, please use the Zoom link sent
            to your WhatsApp/Email to join the demo class.
          </p>
          <div className="space-y-3">
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'demo-join-fallback',
                  message: WHATSAPP_MESSAGES.demo,
                  campaign: 'demo-join',
                })
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 cursor-pointer"
            >
              <span>📱</span> Contact on WhatsApp
            </button>
            <button
              onClick={() => router.push('/demo')}
              className="w-full rounded-lg border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Book a Demo Class
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl animate-fadeInUp"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 text-5xl">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900">Join Demo Class</h1>
          <p className="text-gray-600">Cerebrum Biology Academy</p>
        </div>

        {status === 'error' && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">Error joining meeting</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => setStatus('form')}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'loading' || status === 'joining' ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700">
              {status === 'loading' ? 'Preparing meeting room...' : 'Joining meeting...'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please allow camera and microphone access when prompted
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              joinMeeting()
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Meeting ID *</label>
              <input
                type="text"
                value={formData.meetingNumber}
                onChange={(e) => setFormData({ ...formData, meetingNumber: e.target.value })}
                placeholder="Enter meeting ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter meeting password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Your Name *</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Join Demo Class
            </button>
          </form>
        )}

        {/* Help Section */}
        <div className="mt-6 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">Need help joining?</p>
          <button
            onClick={async () => {
              await trackAndOpenWhatsApp({
                source: 'demo-join-help',
                message: WHATSAPP_MESSAGES.demo,
                campaign: 'demo-join',
              })
            }}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 cursor-pointer"
          >
            <span>📱</span> WhatsApp: +91 88264 44334
          </button>
        </div>
      </div>

      {/* Hidden container for Zoom SDK */}
      <div id="meetingSDKElement" className="hidden"></div>
    </div>
  )
}

export default function JoinDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="animate-pulse text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <JoinDemoContent />
    </Suspense>
  )
}
