'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  GraduationCap,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

function formatCourseName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Neet', 'NEET')
    .replace('Class ', 'Class ')
}

function buildWhatsAppMessage(course: string | null, referrer: string | null): string {
  if (course) {
    const courseName = formatCourseName(course)
    return `Hi! I want to enroll in the *${courseName}* program at Cerebrum Biology Academy. Please share the admission details, fee structure, and available batch timings.`
  }
  return `Hi! I want to enroll at Cerebrum Biology Academy. Please share the admission details and available courses.`
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export default function EnrollmentPageClient() {
  const searchParams = useSearchParams()
  const course = searchParams.get('course')
  const referrer = searchParams.get('ref')
  const [redirecting, setRedirecting] = useState(false)

  const courseName = course ? formatCourseName(course) : null
  const message = buildWhatsAppMessage(course, referrer)
  const whatsappUrl = buildWhatsAppUrl(message)

  useEffect(() => {
    setRedirecting(true)
    const timer = setTimeout(() => {
      window.location.href = whatsappUrl
    }, 2000)
    return () => clearTimeout(timer)
  }, [whatsappUrl])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <MessageCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {courseName ? `Enroll in ${courseName}` : 'Enroll at Cerebrum Biology Academy'}
          </h1>
          <p className="text-gray-600 text-lg">
            {redirecting
              ? 'Redirecting you to WhatsApp...'
              : 'Connect with our admissions team instantly on WhatsApp'}
          </p>
        </div>

        {courseName && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Selected Course</h2>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span className="text-gray-900 font-semibold text-lg">{courseName}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Starts</div>
                <div className="text-sm font-bold text-gray-900">April 2026</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Batch Size</div>
                <div className="text-sm font-bold text-gray-900">12-25</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <ShieldCheck className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Guarantee</div>
                <div className="text-sm font-bold text-gray-900">15-Day</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <a
            href={whatsappUrl}
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp to Enroll
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href={`tel:${CONTACT_INFO.phone.primary}`}
            className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
          >
            <Phone className="w-6 h-6" />
            Call Now: {CONTACT_INFO.phone.display.primary}
          </a>

          <Link
            href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology.%20Please%20share%20available%20timings." target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl text-lg transition-colors border-2 border-gray-200"
          >
            Book Free Demo Class First
          </Link>
        </div>

        <div className="mt-10 space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Instant response from our admissions team</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Get fee details, EMI options, and batch timings</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>15-day money-back guarantee on all courses</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>98% success rate | AIIMS faculty | 15,000+ students</span>
          </div>
        </div>
      </div>
    </div>
  )
}
