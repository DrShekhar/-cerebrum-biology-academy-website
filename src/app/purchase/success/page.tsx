'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Mail,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  Users,
  Phone,
} from 'lucide-react'
import Link from 'next/link'

interface OrderDetails {
  orderId: string
  paymentId: string
  enrollmentId: string
  courseName: string
  amount: number
  paidAt: string
  batchName: string
  batchTiming: string
  studentName?: string
  email?: string
}

function PurchaseSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [whatsappSent, setWhatsappSent] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const orderId = searchParams.get('order_id')
  const paymentId = searchParams.get('payment_id')
  const enrollmentId = searchParams.get('enrollment_id')
  const batchName = searchParams.get('batch')
  const batchTiming = searchParams.get('timing')

  useEffect(() => {
    if (!orderId && !paymentId) {
      router.push('/admissions')
      return
    }

    const fetchOrderDetails = async () => {
      try {
        if (enrollmentId) {
          const response = await fetch(`/api/enrollment/verify?enrollmentId=${enrollmentId}`)
          if (response.ok) {
            const data = await response.json()
            setOrderDetails({
              orderId: orderId || '',
              paymentId: paymentId || '',
              enrollmentId: enrollmentId,
              courseName: data.enrollment?.course?.name || 'NEET Biology Course',
              amount: data.enrollment?.payments?.[0]?.amount || 0,
              paidAt: data.enrollment?.payments?.[0]?.completedAt || new Date().toISOString(),
              batchName: batchName ? decodeURIComponent(batchName) : 'Your Batch',
              batchTiming: batchTiming ? decodeURIComponent(batchTiming) : '',
              studentName: data.enrollment?.student?.name,
              email: data.enrollment?.student?.email,
            })

            triggerNotifications(data.enrollment?.student?.phone, data.enrollment?.student?.email)
          } else {
            setOrderDetails({
              orderId: orderId || '',
              paymentId: paymentId || '',
              enrollmentId: enrollmentId || '',
              courseName: 'NEET Biology Course',
              amount: 0,
              paidAt: new Date().toISOString(),
              batchName: batchName ? decodeURIComponent(batchName) : 'Your Batch',
              batchTiming: batchTiming ? decodeURIComponent(batchTiming) : '',
            })
          }
        } else {
          setOrderDetails({
            orderId: orderId || '',
            paymentId: paymentId || '',
            enrollmentId: '',
            courseName: 'NEET Biology Course',
            amount: 0,
            paidAt: new Date().toISOString(),
            batchName: batchName ? decodeURIComponent(batchName) : 'Your Batch',
            batchTiming: batchTiming ? decodeURIComponent(batchTiming) : '',
          })
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching order details:', error)
        setOrderDetails({
          orderId: orderId || '',
          paymentId: paymentId || '',
          enrollmentId: enrollmentId || '',
          courseName: 'NEET Biology Course',
          amount: 0,
          paidAt: new Date().toISOString(),
          batchName: batchName ? decodeURIComponent(batchName) : 'Your Batch',
          batchTiming: batchTiming ? decodeURIComponent(batchTiming) : '',
        })
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, paymentId, enrollmentId, batchName, batchTiming, router])

  const triggerNotifications = async (phone?: string, email?: string) => {
    try {
      if (phone) {
        const whatsappResponse = await fetch('/api/notifications/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone,
            enrollmentId,
            type: 'enrollment_confirmation',
          }),
        })
        setWhatsappSent(whatsappResponse.ok)
      }

      if (email) {
        const emailResponse = await fetch('/api/notifications/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            enrollmentId,
            type: 'enrollment_confirmation',
          }),
        })
        setEmailSent(emailResponse.ok)
      }
    } catch (error) {
      console.error('Notification error:', error)
    }
  }

  const handleDownloadReceipt = async () => {
    if (!orderId) return

    try {
      window.open(`/api/payments/receipt/${orderId}`, '_blank')
    } catch (error) {
      console.error('Receipt error:', error)
      alert('Failed to open receipt. Please contact support.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your enrollment details...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your order details. Please contact support.
          </p>
          <Link
            href="/admissions"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Admissions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Enrollment Successful!</h1>
          <p className="text-xl text-gray-600">
            Welcome to Cerebrum Biology Academy
            {orderDetails.studentName && (
              <span className="font-medium">, {orderDetails.studentName}</span>
            )}
          </p>
        </div>

        {(orderDetails.batchName || orderDetails.batchTiming) && (
          <div className="bg-blue-600 rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Your Batch Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-200" />
                  <span className="text-sm text-blue-200">Batch</span>
                </div>
                <p className="text-xl font-bold">{orderDetails.batchName}</p>
              </div>
              {orderDetails.batchTiming && (
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-200" />
                    <span className="text-sm text-blue-200">Class Timing</span>
                  </div>
                  <p className="text-xl font-bold">{orderDetails.batchTiming}</p>
                </div>
              )}
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <p className="text-blue-100 text-sm">
                <strong>Classes start soon!</strong> You'll receive a WhatsApp message with your
                class link and schedule details within 24 hours.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="space-y-4">
            {orderDetails.orderId && (
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-gray-900 text-sm">{orderDetails.orderId}</span>
              </div>
            )}
            {orderDetails.paymentId && (
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Payment ID</span>
                <span className="font-mono text-gray-900 text-sm">{orderDetails.paymentId}</span>
              </div>
            )}
            {orderDetails.enrollmentId && (
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Enrollment ID</span>
                <span className="font-mono text-gray-900 text-sm">{orderDetails.enrollmentId}</span>
              </div>
            )}
            {orderDetails.amount > 0 && (
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Amount Paid</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{(orderDetails.amount / 100).toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Date</span>
              <span className="text-gray-900">
                {new Date(orderDetails.paidAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/student/dashboard"
            className="block bg-green-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <BookOpen className="w-8 h-8" />
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold mb-2">Access Your Course</h3>
            <p className="text-green-100">Start learning immediately with full course access</p>
          </Link>

          <button
            onClick={handleDownloadReceipt}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-xl transition-all group text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <Download className="w-8 h-8 text-green-600" />
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Download Receipt</h3>
            <p className="text-gray-600">Get your payment receipt as PDF</p>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmation Status</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">WhatsApp Confirmation</h3>
                <p className="text-sm text-gray-600">
                  {whatsappSent
                    ? 'Confirmation sent! Check your WhatsApp for course access details.'
                    : 'You will receive batch details and class link on WhatsApp shortly.'}
                </p>
              </div>
              {whatsappSent && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  {emailSent
                    ? 'Welcome email sent! Check your inbox for login credentials.'
                    : 'You will receive a welcome email with your login credentials.'}
                </p>
              </div>
              {emailSent && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check WhatsApp</h3>
                <p className="text-purple-100">
                  You'll receive your class joining link and schedule within 24 hours
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Access Study Materials</h3>
                <p className="text-purple-100">
                  Login to your student dashboard to access notes, videos, and practice tests
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Attend Your First Class</h3>
                <p className="text-purple-100">
                  Join your batch on the scheduled day and time. Your journey to NEET success
                  begins!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help? Our support team is here for you!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Support
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call: +91 88264 44334
            </a>
            <a
              href="mailto:support@cerebrumbiologyacademy.com"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your enrollment details...</p>
          </div>
        </div>
      }
    >
      <PurchaseSuccessContent />
    </Suspense>
  )
}
