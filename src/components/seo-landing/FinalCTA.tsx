'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, BookOpen, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { SEOLandingContent } from '@/data/seo-landing/types'

interface FinalCTAProps {
  cta: SEOLandingContent['cta']
  contactButtons?: SEOLandingContent['contactButtons']
}

export function FinalCTA({ cta, contactButtons }: FinalCTAProps) {
  const whatsappLink = contactButtons?.whatsapp
    ? `https://wa.me/${contactButtons.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(contactButtons.whatsapp.message)}`
    : null

  const phoneNumber = contactButtons?.phone || '+919876543210'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="cta-dots" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Floating Orbs */}
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{cta.subtitle}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={cta.primaryButton.link}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
            >
              {cta.primaryButton.text}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {cta.secondaryButton && (
              <Link
                href={cta.secondaryButton.link}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
              >
                <Calendar className="h-5 w-5" />
                {cta.secondaryButton.text}
              </Link>
            )}

            {cta.tertiaryButton && (
              <Link
                href={cta.tertiaryButton.link}
                className="inline-flex items-center gap-2 rounded-full border-2 border-green-400/50 bg-green-600/20 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-green-400/70 hover:bg-green-600/30"
              >
                <BookOpen className="h-5 w-5" />
                {cta.tertiaryButton.text}
              </Link>
            )}
          </div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="h-4 w-4" />
              Call: {phoneNumber.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3')}
            </a>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-green-600/30"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            )}

            <span className="text-white/70">
              New batches starting <span className="font-semibold text-white">January 2025</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
