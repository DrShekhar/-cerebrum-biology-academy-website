'use client'

import { memo } from 'react'
import Link from 'next/link'
import {
  Target,
  BookOpen,
  FileText,
  ArrowRight,
  Atom,
  Dna,
  FlaskConical,
  Microscope,
} from 'lucide-react'

const StatCard = ({
  value,
  label,
  icon: Icon,
  gradient,
  delay,
}: {
  value: string
  label: string
  icon: React.ElementType
  gradient: string
  delay: number
}) => (
  <div
    className="group relative animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center overflow-hidden hover:-translate-y-2 transition-transform duration-300">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
      <div className={`inline-flex p-3 rounded-xl mb-3 ${gradient}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
      <div className="text-sm text-amber-200/80 font-medium uppercase tracking-wider">{label}</div>
    </div>
  </div>
)

const FeaturePill = ({ text, delay }: { text: string; delay: number }) => (
  <div
    className="px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-full text-amber-100 text-sm font-medium cursor-default transition-all duration-300 hover:bg-amber-500/20 hover:scale-105 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {text}
  </div>
)

export const MCQPromoBanner = memo(function MCQPromoBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated gradient mesh background - CSS only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-amber-500/20 via-transparent to-orange-500/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-orange-500/15 via-transparent to-amber-500/15 animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 px-5 py-2.5 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-amber-200 text-sm font-semibold tracking-wide uppercase">
              Free Practice Tool • No Login Required
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
            Master NEET Biology
          </h2>
          <div className="relative inline-block">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              7000+ Free MCQs
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-center mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Practice NCERT-aligned questions, solve Previous Year Questions, and elevate your
          preparation with our comprehensive question bank.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <StatCard
            value="7000+"
            label="Questions"
            icon={Atom}
            delay={300}
            gradient="bg-gradient-to-br from-amber-500 to-yellow-600"
          />
          <StatCard
            value="10+"
            label="Topics"
            icon={Dna}
            delay={400}
            gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatCard
            value="6 Years"
            label="PYQs"
            icon={FlaskConical}
            delay={500}
            gradient="bg-gradient-to-br from-yellow-500 to-amber-500"
          />
          <StatCard
            value="100%"
            label="Free Forever"
            icon={Microscope}
            delay={600}
            gradient="bg-green-600"
          />
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <Link
            href="/neet-biology-mcq"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 text-white">
              <Target className="w-5 h-5" />
              Start Free MCQ Practice
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/neet-biology-mcq?isNcertBased=true"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-amber-500/30 rounded-2xl font-semibold text-amber-100 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            NCERT Based MCQs
          </Link>

          <Link
            href="/neet-biology-mcq?isPYQOnly=true"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl font-semibold text-orange-100 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            NEET PYQs (2018-2024)
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          <FeaturePill text="Chapter-wise Practice" delay={600} />
          <FeaturePill text="Detailed Explanations" delay={700} />
          <FeaturePill text="Diagram Questions" delay={800} />
          <FeaturePill text="Topic Filters" delay={900} />
          <FeaturePill text="Progress Tracking" delay={1000} />
        </div>
      </div>

      {/* Bottom decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </section>
  )
})
