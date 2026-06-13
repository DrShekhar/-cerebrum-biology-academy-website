'use client'

import { useState, useCallback } from 'react'
import { load } from '@cashfreepayments/cashfree-js'

interface CashfreePaymentProps {
  amount: number
  currency?: string
  enrollmentId?: string
  studentName: string
  email: string
  phone: string
  notes?: Record<string, string>
  onSuccess: (data: { orderId: string; status: string }) => void
  onError: (error: string) => void
  buttonText?: string
  buttonClassName?: string
  disabled?: boolean
}

export function CashfreePayment({
  amount,
  currency = 'INR',
  enrollmentId,
  studentName,
  email,
  phone,
  notes,
  onSuccess,
  onError,
  buttonText = 'Pay Now',
  buttonClassName,
  disabled = false,
}: CashfreePaymentProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = useCallback(async () => {
    setLoading(true)

    try {
      const orderRes = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          enrollmentId,
          studentName,
          email,
          phone,
          notes,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderData.success || !orderData.paymentSessionId) {
        onError(orderData.error || 'Failed to create order')
        setLoading(false)
        return
      }

      const cashfree = await load({
        mode: orderData.environment === 'production' ? 'production' : 'sandbox',
      })

      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: '_modal' as const,
      }

      const result = await cashfree.checkout(checkoutOptions)

      if (result.error) {
        console.error('Cashfree checkout error:', result.error)
        onError(result.error.message || 'Payment was cancelled or failed')
        setLoading(false)
        return
      }

      if (result.paymentDetails) {
        const verifyRes = await fetch('/api/payments/cashfree/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderData.orderId }),
        })

        const verifyData = await verifyRes.json()

        if (verifyData.success && verifyData.status === 'COMPLETED') {
          onSuccess({ orderId: orderData.orderId, status: 'COMPLETED' })
        } else if (verifyData.status === 'PENDING') {
          onSuccess({ orderId: orderData.orderId, status: 'PENDING' })
        } else {
          onError(verifyData.message || 'Payment verification failed')
        }
      }

      if (result.redirect) {
        console.log('Payment redirected — will verify on return')
      }
    } catch (err) {
      console.error('Payment error:', err)
      onError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [amount, currency, enrollmentId, studentName, email, phone, notes, onSuccess, onError])

  const defaultClassName =
    'w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled || loading}
      className={buttonClassName || defaultClassName}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        buttonText
      )}
    </button>
  )
}
