'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!orderId) {
      setStatus('failed')
      setMessage('No order ID found')
      return
    }

    async function verifyPayment() {
      try {
        const res = await fetch('/api/payments/cashfree/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        })
        const data = await res.json()

        if (data.success && data.status === 'COMPLETED') {
          setStatus('success')
          setMessage('Your payment was successful! Your enrollment is now active.')
        } else if (data.status === 'PENDING') {
          setStatus('pending')
          setMessage('Your payment is being processed. You will receive a confirmation shortly.')
        } else {
          setStatus('failed')
          setMessage(data.message || 'Payment could not be verified.')
        }
      } catch {
        setStatus('failed')
        setMessage('Unable to verify payment. Please contact support.')
      }
    }

    verifyPayment()
  }, [orderId])

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
            <h1 className="text-xl font-bold text-slate-900">Verifying Payment...</h1>
            <p className="text-slate-600 mt-2">Please wait while we confirm your payment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
            <p className="text-slate-600 mt-2">{message}</p>
            <p className="text-sm text-slate-500 mt-1">Order ID: {orderId}</p>
            <Link
              href="/student/dashboard"
              className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Go to Dashboard
            </Link>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-yellow-700">Payment Processing</h1>
            <p className="text-slate-600 mt-2">{message}</p>
            <p className="text-sm text-slate-500 mt-1">Order ID: {orderId}</p>
            <Link
              href="/"
              className="mt-6 inline-block bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Back to Home
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-700">Payment Failed</h1>
            <p className="text-slate-600 mt-2">{message}</p>
            {orderId && <p className="text-sm text-slate-500 mt-1">Order ID: {orderId}</p>}
            <div className="mt-6 flex gap-3 justify-center">
              <Link
                href="/"
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition"
              >
                Back to Home
              </Link>
              <a
                href="https://wa.me/918826444334?text=Hi%20—%20I%20had%20a%20payment%20issue.%20Order%20ID%3A%20"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Support
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
