'use client'

import { MessageCircle, Phone, CheckCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface LeadFormProps {
  title?: string
  description?: string
  courseType: string
  formId?: string
}

export function LeadForm({
  title = 'Book Your Free Demo Class',
  description = 'Connect with us instantly — no waiting, no forms!',
  courseType,
  formId = 'demo-form',
}: LeadFormProps) {
  return (
    <section id={formId} className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-xl md:p-12 animate-fadeInUp">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-slate-600">{description}</p>
            </div>

            <div className="mt-8 space-y-4">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'lead-form',
                    message: `Hi, I'm interested in ${courseType}. I'd like to book a free demo class. Please share details about batches, fees, and schedule.`,
                    campaign: 'lead-form',
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-700 min-h-[56px] touch-manipulation"
              >
                <MessageCircle className="h-6 w-6" />
                WhatsApp Us Now
              </button>

              <a
                href="tel:+918826444334"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 min-h-[56px] touch-manipulation"
              >
                <Phone className="h-6 w-6" />
                Call: +91 88264 44334
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
              {[
                'AIIMS Faculty with 15+ years experience',
                'Small batches — max 15 students',
                '98% NEET success rate',
                'Free counseling session included',
              ].map((item) => (
                <div key={item} className="flex items-center text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
