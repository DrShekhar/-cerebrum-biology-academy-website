'use client'

import { useState } from 'react'
import { Send, MessageCircle, Loader2 } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface LeadFormProps {
  title?: string
  description?: string
  courseType: string
  formId?: string
}

export function LeadForm({
  title = 'Book Your Free Demo Class',
  description = 'Fill out the form below and we will get back to you within 24 hours.',
  courseType,
  formId = 'demo-form',
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    class: '',
    location: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const whatsappNumber = CONTACT_INFO.whatsapp.number
  const whatsappMessage = `Hi, I'm interested in ${courseType}. I'd like to book a free demo class.`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const submittedData = { ...formData }

    try {
      // Submit form data to API first (saves lead in DB)
      const response = await fetch('/api/leads/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...submittedData,
          course: courseType,
          source: 'landing-page',
        }),
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', class: '', location: '' })

      // Open WhatsApp with pre-filled message containing form data
      const classLabel = submittedData.class
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      const locationPart = submittedData.location ? ` from ${submittedData.location}` : ''
      const message = `Hi, I'm ${submittedData.name}${locationPart}. I'm interested in ${courseType} (${classLabel}). I'd like to book a free demo class. Please share details about batches, fees, and schedule.`

      await trackAndOpenWhatsApp({
        source: 'lead-form-submit',
        message,
        campaign: 'lead-form',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = async () => {
    await trackAndOpenWhatsApp({
      source: 'lead-form-whatsapp-button',
      message: whatsappMessage,
      campaign: 'lead-form',
    })
  }

  return (
    <section id={formId} className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-xl md:p-12 animate-fadeInUp">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-slate-600">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium text-slate-700">
                  Class / Target Exam *
                </label>
                <select
                  id="class"
                  required
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your class</option>
                  <option value="class-11">Class 11</option>
                  <option value="class-12">Class 12</option>
                  <option value="neet-2026">NEET 2026</option>
                  <option value="neet-2027">NEET 2027</option>
                  <option value="neet-dropper">NEET Dropper</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your area in Delhi NCR"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-100 p-4 text-center text-green-700">
                  Thank you! We'll contact you shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-yellow-800 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-yellow-700 hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Book Free Demo
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20BD5A] hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </button>
              </div>

              <p className="text-center text-sm text-slate-500">
                By submitting this form, you agree to receive communication from Cerebrum Biology
                Academy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
