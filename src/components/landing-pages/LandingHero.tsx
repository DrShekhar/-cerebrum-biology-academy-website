'use client'

import { ArrowRight, Phone, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface LandingHeroProps {
  h1: string
  subheadline: string
  highlightedBadge?: string
  ctaPrimary?: string
  ctaSecondary?: string
  trustBadges?: string[]
  backgroundGradient?: string
}

export function LandingHero({
  h1,
  subheadline,
  highlightedBadge,
  ctaPrimary = 'Book Free Demo Class',
  ctaSecondary = 'Call Now',
  trustBadges = ['15+ Years Experience', '10,000+ Students', '98% Results'],
  backgroundGradient = 'from-slate-900 to-slate-800',
}: LandingHeroProps) {
  const phoneNumber = '918826444334'
  const displayPhone = '+91-88264-44334'

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${backgroundGradient} py-16 md:py-24 lg:py-28`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Highlighted Badge */}
          {highlightedBadge && (
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm animate-fadeInUp"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium text-white/90">{highlightedBadge}</span>
            </div>
          )}

          {/* H1 Headline */}
          <h1
            className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl animate-fadeInUp"
          >
            {h1}
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-xl animate-fadeInUp"
          >
            {subheadline}
          </p>

          {/* Trust Badges */}
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-4 animate-fadeInUp"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-white/90">{badge}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fadeInUp"
          >
            <Link
              href="#demo-form"
              onClick={() => {
                const element = document.getElementById('demo-form')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-10 py-5 text-xl font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:bg-yellow-400 hover:shadow-2xl"
            >
              {ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              {ctaSecondary}
            </a>
          </div>

          {/* Quick Contact */}
          <div
            className="mt-8 flex flex-col items-center justify-center gap-2 text-white/70 sm:flex-row animate-fadeInUp"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm">Questions? Call us:</span>
            <a href={`tel:${phoneNumber}`} className="font-semibold text-white hover:underline">
              {displayPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
