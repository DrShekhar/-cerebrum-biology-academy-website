'use client'

import React, { useState, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import { X, Smartphone, QrCode, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { upiPaymentService } from '@/lib/payments/upiIntegration'
import { useIndianMobileOptimizations } from '@/lib/mobile/indianMobileOptimizations'
import Image from 'next/image'

interface UPIPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  courseId: string
  courseName: string
  studentEmail: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

interface PaymentState {
  stage: 'selection' | 'payment' | 'processing' | 'success' | 'error'
  transactionId: string
  selectedApp?: string
  error?: string
}

export function UPIPaymentModal({
  isOpen,
  onClose,
  amount,
  courseId,
  courseName,
  studentEmail,
  onSuccess,
  onError,
}: UPIPaymentModalProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    stage: 'selection',
    transactionId: '',
  })
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'bn'>('en')
  const [paymentUrl, setPaymentUrl] = useState<string>('')
  const [qrCode, setQrCode] = useState<string>('')
  const [showQR, setShowQR] = useState(false)

  const { isSlowNetwork } = useIndianMobileOptimizations()
  const availableUPIApps = upiPaymentService.getAllUPIApps()
  const instructions = upiPaymentService.getPaymentInstructions(language)

  useEffect(() => {
    if (isOpen && paymentState.stage === 'selection') {
      // Auto-detect preferred language based on browser settings
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.includes('hi')) setLanguage('hi')
      else if (browserLang.includes('ta')) setLanguage('ta')
      else if (browserLang.includes('bn')) setLanguage('bn')
    }
  }, [isOpen, paymentState.stage])

  const handleUPIAppSelection = async (appScheme: string) => {
    setPaymentState((prev) => ({ ...prev, selectedApp: appScheme, stage: 'payment' }))

    try {
      const result = await upiPaymentService.initiateUPIPayment(
        amount,
        courseId,
        studentEmail,
        appScheme
      )

      if (result.success) {
        setPaymentState((prev) => ({ ...prev, transactionId: result.transactionId }))
        setPaymentUrl(result.deepLink || result.paymentUrl || '')
        setQrCode(result.qrCode || '')

        // Track analytics
        upiPaymentService.trackUPIUsage(appScheme, amount)

        // Open UPI app
        const opened = upiPaymentService.openUPIApp(
          appScheme,
          result.deepLink || result.paymentUrl || ''
        )

        if (opened) {
          setPaymentState((prev) => ({ ...prev, stage: 'processing' }))
          startPaymentStatusCheck(result.transactionId)
        } else {
          setShowQR(true) // Fallback to QR code
        }
      } else {
        setPaymentState((prev) => ({
          ...prev,
          stage: 'error',
          error: 'Failed to initialize payment. Please try again.',
        }))
      }
    } catch (error) {
      setPaymentState((prev) => ({
        ...prev,
        stage: 'error',
        error: 'Network error. Please check your connection and try again.',
      }))
    }
  }

  const startPaymentStatusCheck = (transactionId: string) => {
    const checkStatus = async () => {
      try {
        const status = await upiPaymentService.checkPaymentStatus(transactionId)

        if (status.status === 'success') {
          setPaymentState((prev) => ({ ...prev, stage: 'success' }))
          onSuccess(transactionId)
        } else if (status.status === 'failed' || status.status === 'expired') {
          setPaymentState((prev) => ({
            ...prev,
            stage: 'error',
            error: 'Payment failed. Please try again.',
          }))
        } else {
          // Continue checking for 5 minutes
          setTimeout(checkStatus, 3000)
        }
      } catch (error) {
        setTimeout(checkStatus, 5000) // Retry with longer interval on error
      }
    }

    // Start checking after 5 seconds (allow time for user to complete payment)
    setTimeout(checkStatus, 5000)
  }

  const handleRetry = () => {
    setPaymentState({ stage: 'selection', transactionId: '' })
    setShowQR(false)
    setPaymentUrl('')
  }

  const handleManualCheck = () => {
    if (paymentState.transactionId) {
      setPaymentState((prev) => ({ ...prev, stage: 'processing' }))
      startPaymentStatusCheck(paymentState.transactionId)
    }
  }

  if (!isOpen) return null

  return (
<FocusTrap>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeInUp"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="upi-payment-modal-title"
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 id="upi-payment-modal-title" className="text-xl font-bold text-gray-900">
                  {paymentState.stage === 'success' ? 'Payment Successful!' : 'Pay with UPI'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  ₹{amount.toLocaleString('en-IN')} • {courseName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                aria-label="Close payment modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selector */}
            {paymentState.stage === 'selection' && (
              <div className="p-4 border-b">
                <div className="flex gap-2">
                  {[
                    { code: 'en', name: 'English' },
                    { code: 'hi', name: 'हिंदी' },
                    { code: 'ta', name: 'தமிழ்' },
                    { code: 'bn', name: 'বাংলা' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-colors touch-manipulation ${
                        language === lang.code
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {paymentState.stage === 'selection' && (
                <UPIAppSelection
                  apps={availableUPIApps}
                  onSelectApp={handleUPIAppSelection}
                  instructions={instructions}
                  isSlowNetwork={isSlowNetwork}
                />
              )}

              {paymentState.stage === 'payment' && (
                <PaymentProcessing
                  onShowQR={() => setShowQR(true)}
                  onRetry={handleRetry}
                  instructions={instructions}
                />
              )}

              {paymentState.stage === 'processing' && (
                <PaymentStatus
                  transactionId={paymentState.transactionId}
                  onRetry={handleRetry}
                  onManualCheck={handleManualCheck}
                  instructions={instructions}
                />
              )}

              {paymentState.stage === 'success' && (
                <PaymentSuccess
                  transactionId={paymentState.transactionId}
                  amount={amount}
                  courseName={courseName}
                />
              )}

              {paymentState.stage === 'error' && (
                <PaymentError
                  error={paymentState.error || 'Unknown error occurred'}
                  onRetry={handleRetry}
                  instructions={instructions}
                />
              )}

              {showQR && qrCode && (
                <QRCodeFallback
                  qrCode={qrCode}
                  paymentUrl={paymentUrl}
                  onClose={() => setShowQR(false)}
                />
              )}
            </div>
          </div>
        </div>
      </FocusTrap>
)
}

// Types for sub-components
interface UPIApp {
  scheme: string
  name: string
  icon: string
  isInstalled?: boolean
}

interface PaymentInstructions {
  title: string
  steps: string[]
  troubleshooting: string[]
}

// Sub-components for better organization

function UPIAppSelection({
  apps,
  onSelectApp,
  instructions,
  isSlowNetwork,
}: {
  apps: UPIApp[]
  onSelectApp: (scheme: string) => void
  instructions: PaymentInstructions
  isSlowNetwork: boolean
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{instructions.title}</h3>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-900 mb-2">How to pay:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          {instructions.steps.map((step, stepIndex) => (
            <li key={`step-${stepIndex}-${step.slice(0, 20)}`} className="flex">
              <span className="mr-2">{stepIndex + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* UPI Apps Grid */}
      <div className="grid grid-cols-2 gap-3">
        {apps.map((app) => (
          <button
            key={app.scheme}
            onClick={() => onSelectApp(app.scheme)}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 mobile-cta animate-fadeInUp"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2 relative">
                {!isSlowNetwork ? (
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <span className="font-medium text-sm">{app.name}</span>
              {app.isInstalled && <span className="text-xs text-green-600 mt-1">Installed</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function PaymentProcessing({
  onShowQR,
  onRetry,
}: {
  onShowQR: () => void
  onRetry: () => void
  instructions: PaymentInstructions
}) {
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 mx-auto mb-4 animate-fadeInUp"
      >
        <Loader2 className="w-16 h-16 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Opening UPI App...</h3>
      <p className="text-gray-600 mb-6">
        Please complete the payment in your UPI app and return here.
      </p>

      <div className="flex flex-col gap-3">
        <Button onClick={onShowQR} variant="outline" className="mobile-secondary-btn">
          <QrCode className="w-4 h-4 mr-2" />
          Show QR Code Instead
        </Button>
        <Button onClick={onRetry} variant="outline" className="mobile-secondary-btn">
          Try Different App
        </Button>
      </div>
    </div>
  )
}

function PaymentStatus({
  transactionId,
  onRetry,
  onManualCheck,
}: {
  transactionId: string
  onRetry: () => void
  onManualCheck: () => void
  instructions: PaymentInstructions
}) {
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 mx-auto mb-4 animate-fadeInUp"
      >
        <Loader2 className="w-16 h-16 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Checking Payment Status...</h3>
      <p className="text-gray-600 mb-2">
        We're verifying your payment. This usually takes a few seconds.
      </p>
      <p className="text-sm text-gray-500 mb-6">Transaction ID: {transactionId}</p>

      <div className="flex flex-col gap-3">
        <Button onClick={onManualCheck} className="mobile-cta">
          <CheckCircle className="w-4 h-4 mr-2" />
          I've Completed Payment
        </Button>
        <Button onClick={onRetry} variant="outline" className="mobile-secondary-btn">
          Start Over
        </Button>
      </div>
    </div>
  )
}

function PaymentSuccess({
  transactionId,
  amount,
  courseName,
}: {
  transactionId: string
  amount: number
  courseName: string
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 animate-fadeInUp">
        <CheckCircle className="w-16 h-16 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-4">
        ₹{amount.toLocaleString('en-IN')} paid for {courseName}
      </p>
      <div className="bg-green-50 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Transaction ID:</strong> {transactionId}
        </p>
        <p className="text-sm text-green-700 mt-2">
          You will receive a confirmation email shortly. Welcome to Cerebrum Biology Academy!
        </p>
      </div>
    </div>
  )
}

function PaymentError({
  error,
  onRetry,
  instructions,
}: {
  error: string
  onRetry: () => void
  instructions: PaymentInstructions
}) {
  return (
    <div className="text-center">
      <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-4">{error}</p>

      <div className="bg-red-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-red-900 mb-2">Troubleshooting:</h4>
        <ul className="text-sm text-red-800 space-y-1">
          {instructions.troubleshooting.map((tip, tipIndex) => (
            <li key={`tip-${tipIndex}-${tip.slice(0, 20)}`} className="flex">
              <span className="mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onRetry} className="mobile-cta">
        Try Again
      </Button>
    </div>
  )
}

function QRCodeFallback({
  qrCode,
  paymentUrl,
  onClose,
}: {
  qrCode: string
  paymentUrl: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-white z-10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Scan QR Code to Pay</h3>
        <button
          onClick={onClose}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-full touch-manipulation"
          aria-label="Close QR code"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
          {qrCode.startsWith('http') ? (
            <Image src={qrCode} alt="UPI QR Code" width={200} height={200} />
          ) : (
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Open any UPI app and scan this QR code to complete your payment
        </p>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 break-all">{paymentUrl}</p>
        </div>
      </div>
    </div>
  )
}
