'use client'

/**
 * PayInstallmentButton — inline Razorpay checkout for a fee-plan installment.
 *
 * Order is created server-side with the installmentId so the amount is
 * validated against the installment's outstanding balance, and
 * /api/payments/verify completes the fee-plan ledger (installment PAID,
 * fee_payments row, fee_plans amounts, lead → ENROLLED when fully paid).
 * Previously the student portal displayed installments with no way to pay
 * them unless a counselor had generated an external payment link.
 */

import { useState } from 'react'
import { Loader2, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { showToast } from '@/lib/toast'

interface PayInstallmentButtonProps {
  installmentId: string
  /** Outstanding amount in rupees (installment amount minus any paidAmount). */
  amountDue: number
  courseName: string
  isOverdue?: boolean
  /** Called after a verified payment so the parent can refetch. */
  onPaid?: () => void
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function PayInstallmentButton({
  installmentId,
  amountDue,
  courseName,
  isOverdue = false,
  onPaid,
}: PayInstallmentButtonProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handlePay = async () => {
    setIsLoading(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Payment gateway failed to load. Please check your connection.')
      }

      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount: amountDue,
          currency: 'INR',
          installmentId,
          receipt: `inst_${installmentId.slice(-12)}_${Date.now()}`,
          notes: { type: 'installment', installmentId, course: courseName },
        }),
      })
      const orderData = await orderResponse.json()
      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cerebrum Biology Academy',
        description: `Installment — ${courseName}`,
        image: '/logo.png',
        order_id: orderData.id,
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(response),
            })
            const verifyData = await verifyResponse.json()
            if (verifyData.verified) {
              showToast.success('Payment successful! Your installment is marked paid.')
              onPaid?.()
            } else {
              showToast.error(
                'Payment could not be verified. If money was deducted, our team will reconcile it shortly.'
              )
            }
          } catch {
            showToast.error(
              'Payment verification failed. If money was deducted, our team will reconcile it shortly.'
            )
          } finally {
            setIsLoading(false)
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: { color: '#2563EB' },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
      })

      razorpay.on('payment.failed', (failure: unknown) => {
        const description =
          typeof failure === 'object' && failure !== null
            ? ((failure as { error?: { description?: string } }).error?.description ?? '')
            : ''
        showToast.error(description || 'Payment failed. Please try again.')
        setIsLoading(false)
      })

      razorpay.open()
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : 'Could not start payment')
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isOverdue ? 'destructive' : 'primary'}
      size="sm"
      className="w-full"
      onClick={handlePay}
      disabled={isLoading || amountDue <= 0}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4 mr-2" />
      )}
      {isOverdue ? 'Pay Now (Overdue)' : 'Pay Now'}
    </Button>
  )
}
