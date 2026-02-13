'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircle, Phone, MessageCircle, ArrowRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

function PurchaseFailedContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const reason = searchParams.get('reason')

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Failed</h1>
        <p className="text-slate-600 mb-6">
          We were unable to process your payment. Don&apos;t worry — no amount has been deducted from
          your account.
        </p>

        {orderId && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm text-slate-600">
            <p>
              Order ID: <span className="font-mono font-medium">{orderId}</span>
            </p>
            {reason && (
              <p className="mt-1">
                Reason: <span className="capitalize">{reason.replace(/_/g, ' ')}</span>
              </p>
            )}
          </div>
        )}

        <div className="space-y-3 mb-8">
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Link>

          <button
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'payment-failed',
                message: `Hi, my payment failed. Order ID: ${orderId || 'N/A'}. Can you help me complete my enrollment?`,
                campaign: 'payment-recovery',
              })
            }
            className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Get Help on WhatsApp
          </button>
        </div>

        <div className="border-t border-slate-200 pt-6 space-y-3 text-sm text-slate-500">
          <p className="font-medium text-slate-700">Common reasons for payment failure:</p>
          <ul className="text-left space-y-1">
            <li>- Insufficient balance in your account</li>
            <li>- Bank server temporarily unavailable</li>
            <li>- Incorrect card details or expired card</li>
            <li>- Transaction declined by your bank</li>
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <a href="tel:+918826444334" className="flex items-center gap-1 text-blue-600 hover:underline">
            <Phone className="w-4 h-4" />
            Call Support
          </a>
          <Link href="/admissions" className="flex items-center gap-1 text-blue-600 hover:underline">
            <ArrowRight className="w-4 h-4" />
            Back to Admissions
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PurchaseFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <PurchaseFailedContent />
    </Suspense>
  )
}
