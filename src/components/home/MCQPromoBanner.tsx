'use client'

import { memo, useEffect, useState } from 'react'
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
import { motion } from 'framer-motion'

const FloatingParticle = ({
  delay,
  duration,
  x,
  y,
  size,
}: {
  delay: number
  duration: number
  x: string
  y: string
  size: number
}) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

const StatCard = ({
  value,
  label,
  icon: Icon,
  delay,
  gradient,
}: {
  value: string
  label: string
  icon: React.ElementType
  delay: number
  gradient: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
      <div className={`inline-flex p-3 rounded-xl mb-3 ${gradient}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
      <div className="text-sm text-amber-200/80 font-medium uppercase tracking-wider">{label}</div>
    </div>
  </motion.div>
)

const FeaturePill = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
    className="px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-full text-amber-100 text-sm font-medium cursor-default transition-all duration-300"
  >
    {text}
  </motion.div>
)

export const MCQPromoBanner = memo(function MCQPromoBanner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-amber-500/20 via-transparent to-orange-500/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-orange-500/15 via-transparent to-amber-500/15 animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticle delay={0} duration={4} x="10%" y="20%" size={8} />
          <FloatingParticle delay={1} duration={5} x="85%" y="15%" size={6} />
          <FloatingParticle delay={2} duration={4.5} x="70%" y="70%" size={10} />
          <FloatingParticle delay={0.5} duration={5.5} x="20%" y="80%" size={7} />
          <FloatingParticle delay={1.5} duration={4} x="50%" y="10%" size={5} />
          <FloatingParticle delay={3} duration={6} x="90%" y="60%" size={8} />
          <FloatingParticle delay={2.5} duration={4.5} x="5%" y="50%" size={6} />
        </div>
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 px-5 py-2.5 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-amber-200 text-sm font-semibold tracking-wide uppercase">
              Free Practice Tool • No Login Required
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
            Master NEET Biology
          </h2>
          <div className="relative inline-block">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              7000+ Free MCQs
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-center mb-12 leading-relaxed"
        >
          Practice NCERT-aligned questions, solve Previous Year Questions, and elevate your
          preparation with our comprehensive question bank.
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <StatCard
            value="7000+"
            label="Questions"
            icon={Atom}
            delay={0.3}
            gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          />
          <StatCard
            value="10+"
            label="Topics"
            icon={Dna}
            delay={0.4}
            gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatCard
            value="6 Years"
            label="PYQs"
            icon={FlaskConical}
            delay={0.5}
            gradient="bg-gradient-to-br from-yellow-500 to-amber-500"
          />
          <StatCard
            value="100%"
            label="Free Forever"
            icon={Microscope}
            delay={0.6}
            gradient="bg-green-600"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12"
        >
          <Link
            href="/neet-biology-mcq"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_-20%,white,transparent_70%)]" />
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
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-amber-500/10 to-orange-500/10 transition-opacity duration-300" />
          </Link>

          <Link
            href="/neet-biology-mcq?isPYQOnly=true"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl font-semibold text-orange-100 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            NEET PYQs (2018-2024)
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/10 to-amber-500/10 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          <FeaturePill text="Chapter-wise Practice" delay={0.6} />
          <FeaturePill text="Detailed Explanations" delay={0.7} />
          <FeaturePill text="Diagram Questions" delay={0.8} />
          <FeaturePill text="Topic Filters" delay={0.9} />
          <FeaturePill text="Progress Tracking" delay={1.0} />
        </motion.div>
      </div>

      {/* Bottom decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </section>
  )
})
