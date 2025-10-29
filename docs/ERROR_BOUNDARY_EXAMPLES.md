# Error Boundary - Practical Examples

This document provides real-world examples of how to implement error boundaries in the Cerebrum Biology Academy website.

---

## Table of Contents

1. [Payment Flow Examples](#payment-flow-examples)
2. [Data Fetching Examples](#data-fetching-examples)
3. [Form Submission Examples](#form-submission-examples)
4. [Third-Party Integration Examples](#third-party-integration-examples)
5. [Admin Panel Examples](#admin-panel-examples)
6. [Complex Component Examples](#complex-component-examples)

---

## Payment Flow Examples

### Example 1: Razorpay Payment Component

```tsx
// src/components/payment/RazorpayCheckout.tsx
'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/errors'
import { logError } from '@/lib/errors'

export function RazorpayCheckout({ courseId, amount }) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment order')
      }

      const order = await response.json()
      // Initialize Razorpay...
    } catch (error) {
      logError(error, {
        page: 'payment',
        component: 'RazorpayCheckout',
        action: 'create-order',
        severity: 'critical',
      })
      throw error // Re-throw to be caught by error boundary
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="payment-container">
      <button onClick={handlePayment} disabled={isProcessing} className="payment-button">
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}

// Usage in page
export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>

      <ErrorBoundary
        context={{
          page: 'checkout',
          component: 'RazorpayCheckout',
        }}
        severity="critical"
        onError={(error) => {
          // Track payment error to analytics
          analytics.track('payment_error', {
            error: error.message,
            timestamp: new Date().toISOString(),
          })
        }}
        fallback={(error, reset) => (
          <div className="payment-error">
            <h2>Payment Error</h2>
            <p>We couldn't process your payment. Please try again.</p>
            <div className="error-actions">
              <button onClick={reset}>Retry Payment</button>
              <a href="tel:+918826444334">Call Support</a>
            </div>
            <p className="error-note">No charges were made to your account.</p>
          </div>
        )}
      >
        <RazorpayCheckout courseId="neet-2024" amount={25000} />
      </ErrorBoundary>
    </div>
  )
}
```

### Example 2: Payment Status Verification

```tsx
// src/components/payment/PaymentVerification.tsx
'use client'

import { useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/errors'

function PaymentVerificationContent({ orderId }) {
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    async function verifyPayment() {
      try {
        const response = await fetch(`/api/payments/verify/${orderId}`)

        if (!response.ok) {
          throw new Error('Payment verification failed')
        }

        const data = await response.json()
        setStatus(data.status)
      } catch (error) {
        throw error // Will be caught by error boundary
      }
    }

    verifyPayment()
  }, [orderId])

  if (status === 'verifying') {
    return <div>Verifying your payment...</div>
  }

  return <div>Payment {status}</div>
}

export function PaymentVerification({ orderId }) {
  return (
    <ErrorBoundary
      context={{
        page: 'payment-verification',
        component: 'PaymentVerification',
        action: 'verify-payment',
      }}
      severity="critical"
      fallback={(error, reset) => (
        <div>
          <h3>Verification Error</h3>
          <p>We're having trouble verifying your payment.</p>
          <p>Don't worry - if payment was successful, you'll receive confirmation shortly.</p>
          <button onClick={reset}>Check Again</button>
          <a href="/contact">Contact Support</a>
        </div>
      )}
    >
      <PaymentVerificationContent orderId={orderId} />
    </ErrorBoundary>
  )
}
```

---

## Data Fetching Examples

### Example 3: Course List with Error Handling

```tsx
// src/components/courses/CourseList.tsx
'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/errors'
import useSWR from 'swr'

function CourseListContent() {
  const { data, error } = useSWR('/api/courses/enhanced', fetcher)

  if (error) {
    throw error // Will be caught by error boundary
  }

  if (!data) {
    return <CourseListSkeleton />
  }

  return (
    <div className="course-grid">
      {data.courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export function CourseList() {
  return (
    <ErrorBoundary
      context={{
        page: 'courses',
        component: 'CourseList',
      }}
      severity="high"
      showDetails={false}
      fallback={(error, reset) => (
        <div className="course-error">
          <h3>Unable to Load Courses</h3>
          <p>We're having trouble loading the course catalog.</p>
          <button onClick={reset}>Try Again</button>
          <a href="/demo">Try a Free Demo Instead</a>
        </div>
      )}
    >
      <Suspense fallback={<CourseListSkeleton />}>
        <CourseListContent />
      </Suspense>
    </ErrorBoundary>
  )
}
```

### Example 4: Student Dashboard Data

```tsx
// src/app/dashboard/student/DashboardContent.tsx
'use client'

import { ErrorBoundary } from '@/components/errors'

function EnrollmentSection() {
  const enrollments = useEnrollments()

  if (enrollments.error) {
    throw new Error('Failed to load enrollments')
  }

  return <EnrollmentCards enrollments={enrollments.data} />
}

function ProgressSection() {
  const progress = useProgress()

  if (progress.error) {
    throw new Error('Failed to load progress')
  }

  return <ProgressCharts data={progress.data} />
}

function TestResultsSection() {
  const results = useTestResults()

  if (results.error) {
    throw new Error('Failed to load test results')
  }

  return <TestResultsTable results={results.data} />
}

export function DashboardContent() {
  return (
    <div className="dashboard-layout">
      {/* Each section has its own error boundary */}
      <ErrorBoundary
        context={{ component: 'EnrollmentSection' }}
        fallback={() => (
          <div className="section-error">
            <p>Unable to load enrollments</p>
            <button onClick={() => window.location.reload()}>Refresh</button>
          </div>
        )}
      >
        <EnrollmentSection />
      </ErrorBoundary>

      <ErrorBoundary
        context={{ component: 'ProgressSection' }}
        fallback={() => (
          <div className="section-error">
            <p>Unable to load progress</p>
          </div>
        )}
      >
        <ProgressSection />
      </ErrorBoundary>

      <ErrorBoundary
        context={{ component: 'TestResultsSection' }}
        fallback={() => (
          <div className="section-error">
            <p>Unable to load test results</p>
          </div>
        )}
      >
        <TestResultsSection />
      </ErrorBoundary>
    </div>
  )
}
```

---

## Form Submission Examples

### Example 5: Demo Booking Form

```tsx
// src/components/booking/DemoBookingForm.tsx
'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/errors'
import { logError } from '@/lib/errors'

function DemoBookingFormContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to book demo')
      }

      const result = await response.json()
      // Success handling...
    } catch (error) {
      logError(error, {
        page: 'demo-booking',
        component: 'DemoBookingForm',
        action: 'submit-booking',
        severity: 'high',
      })
      setSubmitError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitError) {
    throw submitError // Will be caught by error boundary
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Demo'}
      </button>
    </form>
  )
}

export function DemoBookingForm() {
  return (
    <ErrorBoundary
      context={{
        page: 'demo-booking',
        component: 'DemoBookingForm',
      }}
      severity="high"
      fallback={(error, reset) => (
        <div className="booking-error">
          <h3>Booking Failed</h3>
          <p>We couldn't complete your demo booking.</p>
          <div className="error-actions">
            <button onClick={reset}>Try Again</button>
            <a href="tel:+918826444334">Call to Book</a>
            <a href="https://wa.me/918826444334">WhatsApp Us</a>
          </div>
        </div>
      )}
    >
      <DemoBookingFormContent />
    </ErrorBoundary>
  )
}
```

---

## Third-Party Integration Examples

### Example 6: WhatsApp Integration

```tsx
// src/components/communication/WhatsAppButton.tsx
'use client'

import { ErrorBoundary } from '@/components/errors'

function WhatsAppButtonContent({ phoneNumber, message }) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // This might fail if WhatsApp is not available
    window.open(url, '_blank')
  }

  return (
    <button onClick={handleClick} className="whatsapp-button">
      Contact on WhatsApp
    </button>
  )
}

export function WhatsAppButton({ phoneNumber, message }) {
  return (
    <ErrorBoundary
      context={{
        component: 'WhatsAppButton',
        action: 'whatsapp-redirect',
      }}
      severity="low"
      fallback={() => (
        <div className="contact-alternatives">
          <p>WhatsApp is not available</p>
          <a href={`tel:${phoneNumber}`}>Call Instead</a>
          <a href="/contact">Email Us</a>
        </div>
      )}
    >
      <WhatsAppButtonContent phoneNumber={phoneNumber} message={message} />
    </ErrorBoundary>
  )
}
```

### Example 7: AI Chat Integration

```tsx
// src/components/ai/ClaudeChatWidget.tsx
'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/errors'

function ClaudeChatContent() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/claudechat/unified-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('AI chat failed')
      }

      const data = await response.json()
      setMessages([...messages, { role: 'user', content: input }, data])
      setInput('')
    } catch (error) {
      throw error // Will be caught by error boundary
    }
  }

  return <div className="chat-widget">{/* Chat UI */}</div>
}

export function ClaudeChatWidget() {
  return (
    <ErrorBoundary
      context={{
        component: 'ClaudeChatWidget',
        action: 'ai-chat',
      }}
      severity="normal"
      fallback={(error, reset) => (
        <div className="chat-error">
          <h4>AI Chat Unavailable</h4>
          <p>The AI assistant is temporarily unavailable.</p>
          <button onClick={reset}>Retry</button>
          <a href="/contact">Contact Human Support</a>
        </div>
      )}
    >
      <ClaudeChatContent />
    </ErrorBoundary>
  )
}
```

---

## Admin Panel Examples

### Example 8: Admin Data Table

```tsx
// src/app/admin/students/StudentsTable.tsx
'use client'

import { ErrorBoundary } from '@/components/errors'
import useSWR from 'swr'

function StudentsTableContent() {
  const { data, error } = useSWR('/api/admin/students', fetcher)

  if (error) {
    throw error
  }

  if (!data) {
    return <TableSkeleton />
  }

  return <table className="admin-table">{/* Table content */}</table>
}

export function StudentsTable() {
  return (
    <ErrorBoundary
      context={{
        page: 'admin',
        component: 'StudentsTable',
      }}
      severity="critical"
      onError={(error) => {
        // Alert admin team
        fetch('/api/admin/alerts', {
          method: 'POST',
          body: JSON.stringify({
            type: 'critical_error',
            component: 'StudentsTable',
            error: error.message,
          }),
        })
      }}
      fallback={(error, reset) => (
        <div className="admin-error">
          <h3>⚠️ Critical Error</h3>
          <p>Failed to load student data</p>
          <div className="admin-actions">
            <button onClick={reset}>Reload Data</button>
            <button onClick={() => window.location.reload()}>Full Refresh</button>
            <a href="/admin/system-status">Check System Status</a>
          </div>
          <div className="error-details">
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      )}
    >
      <StudentsTableContent />
    </ErrorBoundary>
  )
}
```

---

## Complex Component Examples

### Example 9: Video Player Component

```tsx
// src/components/media/VideoPlayer.tsx
'use client'

import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/errors'

function VideoPlayerContent({ videoUrl, courseId }) {
  const [player, setPlayer] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Initialize video player
    try {
      const playerInstance = initializePlayer(videoUrl)
      setPlayer(playerInstance)

      playerInstance.on('error', (err) => {
        setError(new Error(`Video playback error: ${err.message}`))
      })
    } catch (err) {
      setError(err)
    }

    return () => {
      player?.destroy()
    }
  }, [videoUrl])

  if (error) {
    throw error // Will be caught by error boundary
  }

  return <div className="video-container" id="video-player" />
}

export function VideoPlayer({ videoUrl, courseId }) {
  return (
    <ErrorBoundary
      context={{
        page: 'course-video',
        component: 'VideoPlayer',
        action: 'video-playback',
      }}
      severity="high"
      fallback={(error, reset) => (
        <div className="video-error">
          <div className="error-icon">🎥</div>
          <h3>Video Playback Error</h3>
          <p>We're having trouble playing this video.</p>
          <div className="troubleshooting">
            <h4>Try these steps:</h4>
            <ul>
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Try a different browser</li>
              <li>Clear your browser cache</li>
            </ul>
          </div>
          <div className="video-actions">
            <button onClick={reset}>Retry Video</button>
            <button onClick={() => window.location.reload()}>Reload Page</button>
            <a href={`/courses/${courseId}/materials`}>View Study Materials Instead</a>
          </div>
        </div>
      )}
    >
      <VideoPlayerContent videoUrl={videoUrl} courseId={courseId} />
    </ErrorBoundary>
  )
}
```

### Example 10: File Upload Component

```tsx
// src/components/upload/FileUpload.tsx
'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/errors'
import { logError } from '@/lib/errors'

function FileUploadContent({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const handleUpload = async (file) => {
    setUploading(true)
    setUploadError(null)

    try {
      // Validate file
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit')
      }

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      onUploadComplete(result)
    } catch (error) {
      logError(error, {
        component: 'FileUpload',
        action: 'file-upload',
        severity: 'normal',
      })
      setUploadError(error)
    } finally {
      setUploading(false)
    }
  }

  if (uploadError) {
    throw uploadError
  }

  return (
    <div className="upload-container">
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} />
      {uploading && <div>Uploading...</div>}
    </div>
  )
}

export function FileUpload({ onUploadComplete }) {
  return (
    <ErrorBoundary
      context={{
        component: 'FileUpload',
        action: 'file-upload',
      }}
      severity="normal"
      fallback={(error, reset) => (
        <div className="upload-error">
          <h4>Upload Failed</h4>
          <p>{error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    >
      <FileUploadContent onUploadComplete={onUploadComplete} />
    </ErrorBoundary>
  )
}
```

---

## Complete Page Example

### Example 11: Course Purchase Page

```tsx
// src/app/purchase/[courseId]/page.tsx
'use client'

import { ErrorBoundary } from '@/components/errors'

// Individual sections with their own error boundaries
function CourseInfo({ courseId }) {
  const course = useCourse(courseId)

  if (course.error) throw course.error

  return <div>{/* Course details */}</div>
}

function PricingInfo({ courseId }) {
  const pricing = usePricing(courseId)

  if (pricing.error) throw pricing.error

  return <div>{/* Pricing details */}</div>
}

function PaymentForm({ courseId }) {
  return <div>{/* Payment form */}</div>
}

export default function PurchasePage({ params }) {
  const { courseId } = params

  return (
    <div className="purchase-page">
      <h1>Complete Your Purchase</h1>

      {/* Course info can fail independently */}
      <ErrorBoundary
        context={{
          page: 'purchase',
          component: 'CourseInfo',
        }}
        fallback={() => (
          <div className="section-error">
            <p>Unable to load course details</p>
          </div>
        )}
      >
        <CourseInfo courseId={courseId} />
      </ErrorBoundary>

      {/* Pricing info can fail independently */}
      <ErrorBoundary
        context={{
          page: 'purchase',
          component: 'PricingInfo',
        }}
        fallback={() => (
          <div className="section-error">
            <p>Unable to load pricing</p>
            <a href="/contact">Contact for pricing</a>
          </div>
        )}
      >
        <PricingInfo courseId={courseId} />
      </ErrorBoundary>

      {/* Payment form has critical error handling */}
      <ErrorBoundary
        context={{
          page: 'purchase',
          component: 'PaymentForm',
        }}
        severity="critical"
        fallback={(error, reset) => (
          <div className="payment-error-critical">
            <h2>Payment System Error</h2>
            <p>We're unable to process payments at the moment.</p>
            <div className="error-actions">
              <button onClick={reset}>Try Again</button>
              <a href="tel:+918826444334">Call to Complete Purchase</a>
              <a href="/contact">Email Us</a>
            </div>
          </div>
        )}
      >
        <PaymentForm courseId={courseId} />
      </ErrorBoundary>
    </div>
  )
}
```

---

## Summary

These examples demonstrate:

1. **Different severity levels** for different error types
2. **Context-specific error handling** with appropriate fallbacks
3. **User-friendly recovery options** for each scenario
4. **Independent error boundaries** for sections that can fail separately
5. **Critical error handling** for payment and auth flows
6. **Graceful degradation** with alternative actions
7. **Error logging** with appropriate context
8. **Custom fallback UIs** for different use cases

Use these patterns as templates for implementing error boundaries throughout your application.
