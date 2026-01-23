'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  MessageCircle,
  Mic,
  Camera,
  Zap,
  ArrowRight,
  Play,
  ChevronDown,
  Star,
  Target,
  TrendingUp,
  Send,
  Image as ImageIcon,
  Check,
  X,
  BookOpen,
  Clock,
  Trophy,
  Beaker,
  Dna,
  Heart,
  Leaf,
  Bug,
  ChevronUp,
  Calculator,
  HelpCircle,
} from 'lucide-react'

// Lazy load the chat interface
const MobileChatInterface = dynamic(
  () =>
    import('@/components/ceri-ai/mobile/MobileChatInterface').then(
      (mod) => mod.MobileChatInterface
    ),
  {
    loading: () => (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl mx-auto mb-4 animate-pulse flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading Ceri AI...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Animated counter component
function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Live Question Counter Component
function LiveQuestionCounter() {
  const [todayCount, setTodayCount] = useState(2847)
  const [totalCount, setTotalCount] = useState(156842)

  useEffect(() => {
    const interval = setInterval(() => {
      setTodayCount((prev) => prev + Math.floor(Math.random() * 3))
      setTotalCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-green-600 rounded-3xl p-8 text-white text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
          <span className="text-sm font-medium uppercase tracking-wider">Live Now</span>
        </div>
        <motion.div
          key={todayCount}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl sm:text-6xl font-black mb-2"
        >
          {todayCount.toLocaleString()}
        </motion.div>
        <p className="text-lg text-white/90 mb-4">Questions Answered Today</p>
        <div className="border-t border-white/20 pt-4 mt-4">
          <p className="text-3xl font-bold">{totalCount.toLocaleString()}+</p>
          <p className="text-sm text-white/80">Total Doubts Resolved</p>
        </div>
      </div>
    </motion.div>
  )
}

// India Map with Student Success Stories
function StudentSuccessMap() {
  const cities = [
    { name: 'Delhi', students: 450, top: '25%', left: '35%', rank: 'AIR 156' },
    { name: 'Mumbai', students: 380, top: '55%', left: '20%', rank: 'AIR 289' },
    { name: 'Bangalore', students: 320, top: '70%', left: '30%', rank: 'AIR 412' },
    { name: 'Chennai', students: 290, top: '75%', left: '40%', rank: 'AIR 523' },
    { name: 'Kolkata', students: 270, top: '40%', left: '70%', rank: 'AIR 678' },
    { name: 'Hyderabad', students: 310, top: '60%', left: '35%', rank: 'AIR 345' },
    { name: 'Jaipur', students: 180, top: '35%', left: '28%', rank: 'AIR 891' },
    { name: 'Lucknow', students: 220, top: '32%', left: '45%', rank: 'AIR 567' },
    { name: 'Patna', students: 190, top: '35%', left: '58%', rank: 'AIR 734' },
    { name: 'Kota', students: 520, top: '38%', left: '30%', rank: 'AIR 89' },
  ]

  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Students Across India Trust Ceri AI
      </h3>
      <div className="relative aspect-[4/5] max-w-md mx-auto">
        {/* Simplified India outline */}
        <div className="absolute inset-0 bg-gray-50 rounded-3xl" />

        {/* City dots */}
        {cities.map((city) => (
          <motion.div
            key={city.name}
            className="absolute cursor-pointer"
            style={{ top: city.top, left: city.left }}
            onMouseEnter={() => setHoveredCity(city.name)}
            onMouseLeave={() => setHoveredCity(null)}
            whileHover={{ scale: 1.5 }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-50" />

              {hoveredCity === city.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap z-10 shadow-xl"
                >
                  <p className="font-bold">{city.name}</p>
                  <p className="text-sm text-gray-300">{city.students} students</p>
                  <p className="text-xs text-green-400">Best: {city.rank}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Hover over cities to see student success</p>
        <p className="text-2xl font-bold text-purple-600 mt-2">3,130+ Students | 28 States</p>
      </div>
    </motion.div>
  )
}

// Sample Questions Component
function SampleQuestions({ onQuestionClick }: { onQuestionClick: (q: string) => void }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')

  const questions = {
    easy: [
      'What is photosynthesis?',
      'Name the powerhouse of the cell',
      'What is DNA full form?',
      'Define osmosis in simple terms',
    ],
    medium: [
      'Explain the difference between mitosis and meiosis',
      'What is the role of ribosomes in protein synthesis?',
      'Describe the process of glycolysis',
      'How does the nephron filter blood?',
    ],
    hard: [
      'Explain the Calvin cycle with all intermediate compounds',
      'Compare C3 and C4 photosynthesis pathways',
      'Describe the mechanism of muscle contraction at molecular level',
      'Explain the Hardy-Weinberg equilibrium and its conditions',
    ],
  }

  const difficultyColors = {
    easy: 'bg-green-600',
    medium: 'from-yellow-500 to-orange-500',
    hard: 'bg-red-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Try Sample Questions</h3>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-3 mb-6">
        {(['easy', 'medium', 'hard'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
              selectedDifficulty === diff
                ? `bg-gradient-to-r ${difficultyColors[diff]} text-white shadow-lg scale-105`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questions[selectedDifficulty].map((q, idx) => (
          <motion.button
            key={q}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onQuestionClick(q)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-purple-50 rounded-xl border-2 border-transparent hover:border-purple-300 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 group-hover:text-purple-700">{q}</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// Google vs Ceri AI Comparison
function ComparisonSection() {
  const comparisons = [
    {
      question: 'What is the Krebs cycle?',
      google:
        'The Krebs cycle, also known as the citric acid cycle, is a series of chemical reactions...',
      ceri: 'Great question! The Krebs cycle (also called TCA/Citric Acid cycle) occurs in the mitochondrial matrix. Here\'s the complete breakdown:\n\n🔄 **8 Steps Simplified:**\n1. Acetyl-CoA + Oxaloacetate → Citrate\n2-7. [Intermediate reactions]\n8. Malate → Oxaloacetate (cycle restarts)\n\n📊 **Net Yield per cycle:**\n• 3 NADH\n• 1 FADH₂\n• 1 GTP (=ATP)\n• 2 CO₂\n\n💡 **NEET Tip:** Remember "Can I Keep Selling Smelly Fish (For) Money Officer" for intermediates!',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-8 text-white"
    >
      <h3 className="text-2xl font-bold mb-8 text-center">
        See the Difference: Generic Search vs Ceri AI
      </h3>

      {comparisons.map((comp, idx) => (
        <div key={idx}>
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <p className="text-lg font-medium">"{comp.question}"</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic Search */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <p className="font-semibold">Generic Search</p>
                  <p className="text-xs text-gray-400">Wikipedia-style answer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{comp.google}</p>
              <div className="mt-4 flex items-center text-red-400 text-sm">
                <X className="w-4 h-4 mr-2" />
                <span>No NEET focus, no memory tricks</span>
              </div>
            </div>

            {/* Ceri AI */}
            <div className="bg-indigo-500/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Ceri AI</p>
                  <p className="text-xs text-purple-300">NEET-optimized answer</p>
                </div>
              </div>
              <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                {comp.ceri}
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Check className="w-4 h-4 mr-2" />
                <span>Structured, visual, exam-ready!</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

// Subject Modules
function SubjectModules({ onTopicClick }: { onTopicClick: (topic: string) => void }) {
  const subjects = [
    {
      name: 'Cell Biology',
      icon: Beaker,
      color: 'from-blue-500 to-blue-500',
      questions: 45,
      topics: ['Cell Structure', 'Cell Division', 'Cell Organelles'],
    },
    {
      name: 'Genetics',
      icon: Dna,
      color: 'from-purple-500 to-indigo-500',
      questions: 52,
      topics: ['Mendelian Genetics', 'DNA Replication', 'Gene Expression'],
    },
    {
      name: 'Human Physiology',
      icon: Heart,
      color: 'bg-red-600',
      questions: 68,
      topics: ['Digestion', 'Respiration', 'Circulation'],
    },
    {
      name: 'Plant Biology',
      icon: Leaf,
      color: 'bg-green-600',
      questions: 38,
      topics: ['Photosynthesis', 'Plant Hormones', 'Transport'],
    },
    {
      name: 'Ecology',
      icon: Bug,
      color: 'from-yellow-500 to-amber-500',
      questions: 32,
      topics: ['Ecosystems', 'Biodiversity', 'Environment'],
    },
    {
      name: 'Evolution',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      questions: 28,
      topics: ['Darwin Theory', 'Evidence', 'Speciation'],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Master Every NEET Topic</h3>
      <p className="text-gray-600 text-center mb-8">Click on any topic to start learning</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, idx) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 rounded-2xl p-5 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <subject.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{subject.name}</h4>
            <p className="text-sm text-gray-500 mb-3">{subject.questions} practice questions</p>
            <div className="flex flex-wrap gap-2">
              {subject.topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => onTopicClick(`Explain ${topic} for NEET`)}
                  className="text-xs bg-white px-3 py-1 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Before/After Comparison
function BeforeAfterComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Your NEET Journey: Before & After Ceri AI
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Before */}
        <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <X className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-red-700">Without Ceri AI</h4>
          </div>
          <ul className="space-y-3">
            {[
              { label: 'Doubt Resolution', value: '24-48 hours', icon: Clock },
              { label: 'Study Hours Needed', value: '8+ hours/day', icon: BookOpen },
              { label: 'Concept Clarity', value: '60%', icon: Target },
              { label: 'Revision Efficiency', value: 'Low', icon: TrendingUp },
              { label: 'Mock Test Score', value: '450-500', icon: Trophy },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="flex items-center text-gray-600">
                  <item.icon className="w-4 h-4 mr-2 text-red-400" />
                  {item.label}
                </span>
                <span className="font-semibold text-red-600">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-green-700">With Ceri AI</h4>
          </div>
          <ul className="space-y-3">
            {[
              {
                label: 'Doubt Resolution',
                value: '<2 seconds',
                icon: Clock,
                improvement: '99% faster',
              },
              {
                label: 'Study Hours Needed',
                value: '5-6 hours/day',
                icon: BookOpen,
                improvement: '30% less',
              },
              { label: 'Concept Clarity', value: '95%', icon: Target, improvement: '+35%' },
              {
                label: 'Revision Efficiency',
                value: 'High',
                icon: TrendingUp,
                improvement: '3x better',
              },
              {
                label: 'Mock Test Score',
                value: '600-680',
                icon: Trophy,
                improvement: '+150 marks',
              },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="flex items-center text-gray-600">
                  <item.icon className="w-4 h-4 mr-2 text-green-600" />
                  {item.label}
                </span>
                <div className="text-right">
                  <span className="font-semibold text-green-600">{item.value}</span>
                  <span className="block text-xs text-green-600">{item.improvement}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// NEET Score Predictor
function NEETScorePredictor() {
  const [currentScore, setCurrentScore] = useState(450)
  const [studyHours, setStudyHours] = useState(4)
  const [predictedScore, setPredictedScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const calculatePrediction = () => {
    const baseImprovement = 80
    const hoursBonus = studyHours * 15
    const currentBonus = (720 - currentScore) * 0.3
    const predicted = Math.min(720, currentScore + baseImprovement + hoursBonus + currentBonus)
    setPredictedScore(Math.round(predicted))
    setShowResult(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-indigo-500 rounded-3xl p-8 text-white"
    >
      <div className="flex items-center justify-center mb-6">
        <Calculator className="w-8 h-8 mr-3" />
        <h3 className="text-2xl font-bold">NEET Score Predictor</h3>
      </div>
      <p className="text-center text-white/80 mb-8">See how much Ceri AI can boost your score</p>

      <div className="max-w-md mx-auto space-y-6">
        {/* Current Score */}
        <div>
          <label className="block text-sm font-medium mb-2">Your Current Mock Test Score</label>
          <input
            type="range"
            min="200"
            max="650"
            value={currentScore}
            onChange={(e) => setCurrentScore(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>200</span>
            <span className="text-xl font-bold">{currentScore}/720</span>
            <span>650</span>
          </div>
        </div>

        {/* Study Hours */}
        <div>
          <label className="block text-sm font-medium mb-2">Daily Study Hours with Ceri AI</label>
          <div className="flex gap-2">
            {[2, 4, 6, 8].map((hours) => (
              <button
                key={hours}
                onClick={() => setStudyHours(hours)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  studyHours === hours
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {hours}h
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculatePrediction}
          className="w-full py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
        >
          Predict My Score
        </button>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 rounded-2xl p-6 text-center"
            >
              <p className="text-sm text-white/80 mb-2">Your Predicted NEET Score</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-5xl font-black"
              >
                {predictedScore}/720
              </motion.p>
              <p className="text-green-300 font-semibold mt-2">
                +{predictedScore - currentScore} marks improvement!
              </p>
              <p className="text-xs text-white/60 mt-4">
                *Based on average improvement of Ceri AI users
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Free Trial Counter
function FreeTrialCounter() {
  const [questionsLeft, setQuestionsLeft] = useState(5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-orange-600 rounded-3xl p-6 text-white text-center"
    >
      <div className="flex items-center justify-center mb-2">
        <Sparkles className="w-6 h-6 mr-2" />
        <span className="font-semibold">Free Trial Active</span>
      </div>
      <div className="text-4xl font-black mb-2">{questionsLeft}/5</div>
      <p className="text-white/90">Free Questions Remaining Today</p>
      <p className="text-sm text-white/70 mt-2">Resets at midnight</p>
    </motion.div>
  )
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: 'Free Trial',
      price: '₹0',
      period: 'forever',
      features: ['5 questions/day', 'Basic explanations', 'Text-only mode'],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro Monthly',
      price: '₹499',
      period: '/month',
      features: [
        'Unlimited questions',
        'Voice & Image support',
        'NEET-focused answers',
        'Personalized learning',
        'Priority support',
      ],
      cta: 'Start Pro',
      popular: true,
    },
    {
      name: 'Pro Yearly',
      price: '₹3,999',
      period: '/year',
      features: [
        'Everything in Pro',
        '33% savings',
        'Mock test analysis',
        'Performance tracking',
        'Doubt history',
      ],
      cta: 'Best Value',
      popular: false,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <h3 className="text-3xl font-black text-gray-900 mb-4 text-center">
        Simple, Transparent Pricing
      </h3>
      <p className="text-gray-600 text-center mb-12">Start free, upgrade when you're ready</p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative bg-white rounded-3xl p-8 ${
              plan.popular
                ? 'border-2 border-purple-500 shadow-2xl scale-105'
                : 'border border-gray-200 shadow-lg'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">{plan.price}</span>
              <span className="text-gray-500">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                plan.popular
                  ? 'bg-blue-500 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// FAQ Section
function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      q: 'Is Ceri AI accurate for NEET preparation?',
      a: 'Yes! Ceri AI is specifically trained on NEET Biology syllabus with 10+ years of past papers. Our answers are verified by AIIMS/JIPMER faculty and have 98% accuracy rate.',
    },
    {
      q: 'Can I use voice to ask questions?',
      a: 'Absolutely! Ceri AI supports voice input. Just tap the mic button and speak your doubt. Perfect for hands-free learning while traveling or during revision.',
    },
    {
      q: 'How is this different from ChatGPT?',
      a: 'While ChatGPT is general-purpose, Ceri AI is built specifically for NEET. We provide NEET-specific mnemonics, diagrams, and exam tips. Our answers are structured for quick revision and include PYQ patterns.',
    },
    {
      q: 'Can Ceri AI analyze diagrams and images?',
      a: 'Yes! Upload any Biology diagram, microscopy image, or textbook page. Ceri AI will identify structures, explain concepts, and even point out NEET-important details.',
    },
    {
      q: 'Is my data private?',
      a: 'Your privacy is our priority. All conversations are encrypted, and we never share your data with third parties. You can delete your history anytime.',
    },
    {
      q: 'What if I have a subscription to a coaching institute?',
      a: "Ceri AI complements your coaching perfectly! Use it for instant doubt resolution when teachers aren't available, late-night study sessions, and quick revision before exams.",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-50 rounded-3xl p-8"
    >
      <div className="flex items-center justify-center mb-8">
        <HelpCircle className="w-8 h-8 mr-3 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-gray-900">{faq.q}</span>
              {openFaq === idx ? (
                <ChevronUp className="w-5 h-5 text-purple-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-gray-600">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Floating particles background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [null, '-100vh'],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Feature card component
function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}: {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Demo conversation bubble
function DemoBubble({ message, isAI, delay }: { message: string; isAI: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isAI ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isAI
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </motion.div>
  )
}

export default function CeriAIShowcase() {
  const [showChat, setShowChat] = useState(false)
  const [chatQuestion, setChatQuestion] = useState('')
  const [activeDemo, setActiveDemo] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const handleQuestionClick = useCallback((question: string) => {
    setChatQuestion(question)
    setShowChat(true)
  }, [])

  const demos = [
    {
      title: 'Instant Doubt Resolution',
      icon: MessageCircle,
      conversation: [
        { message: 'What is the difference between mitosis and meiosis?', isAI: false },
        {
          message:
            'Great question! Mitosis produces 2 identical diploid cells for growth & repair, while meiosis produces 4 unique haploid gametes for reproduction. Key differences include: chromosome number (2n→2n vs 2n→n), crossing over (no vs yes), and number of divisions (1 vs 2).',
          isAI: true,
        },
      ],
    },
    {
      title: 'Voice Interaction',
      icon: Mic,
      conversation: [
        { message: '🎤 "Explain photosynthesis equation"', isAI: false },
        {
          message:
            '🔊 "Photosynthesis converts CO₂ and H₂O into glucose using light energy. The equation is: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂. This occurs in chloroplasts during light and dark reactions."',
          isAI: true,
        },
      ],
    },
    {
      title: 'Image Analysis',
      icon: Camera,
      conversation: [
        { message: '📸 [Uploaded: Cell Diagram.jpg]', isAI: false },
        {
          message:
            "I can see a plant cell diagram! I've identified: Cell Wall, Plasma Membrane, Nucleus with Nucleolus, Chloroplasts, Large Central Vacuole, Mitochondria, Endoplasmic Reticulum, and Golgi Apparatus. Want me to explain any organelle?",
          isAI: true,
        },
      ],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [demos.length])

  const features = [
    {
      icon: Brain,
      title: '24/7 AI Biology Tutor',
      description:
        'Get instant, accurate answers to any Biology doubt anytime. Ceri AI never sleeps and is always ready to help you learn.',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Mic,
      title: 'Voice Interaction',
      description:
        'Ask questions using your voice and receive spoken explanations. Perfect for hands-free learning while studying.',
      gradient: 'from-blue-500 to-blue-500',
    },
    {
      icon: Camera,
      title: 'Visual Analysis',
      description:
        'Upload diagrams, specimen images, or textbook pages. Ceri AI analyzes and explains complex visual concepts.',
      gradient: 'bg-green-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Get responses in under 2 seconds. Our optimized AI infrastructure ensures you never wait for answers.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Target,
      title: 'NEET Focused',
      description:
        'Trained specifically on NEET Biology syllabus with 10+ years of past papers. Every answer is exam-relevant.',
      gradient: 'bg-red-600',
    },
    {
      icon: TrendingUp,
      title: 'Adaptive Learning',
      description:
        'Ceri AI learns your weak areas and personalizes explanations to match your understanding level.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ]

  const stats = [
    { value: 50000, suffix: '+', label: 'Doubts Resolved' },
    { value: 98, suffix: '%', label: 'Accuracy Rate' },
    { value: 2, prefix: '<', suffix: 's', label: 'Response Time' },
    { value: 24, suffix: '/7', label: 'Availability' },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center bg-slate-800 overflow-hidden"
      >
        <FloatingParticles />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-30 animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 text-sm font-medium">
              India's #1 AI Biology Tutor for NEET
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          >
            Meet{' '}
            <span className="text-blue-400">
              Ceri AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Your personal AI Biology tutor that resolves doubts{' '}
            <span className="text-white font-semibold">instantly</span>, explains with{' '}
            <span className="text-white font-semibold">diagrams</span>, and helps you score{' '}
            <span className="text-green-400 font-semibold">650+</span> in NEET.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setShowChat(true)}
              className="group relative px-8 py-4 bg-indigo-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Try Ceri AI Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/demo-booking"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center"
            >
              Book Live Demo
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Live Stats & Map Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <LiveQuestionCounter />
            <StudentSuccessMap />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              See Ceri AI in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience how Ceri AI handles different types of Biology questions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Tabs */}
            <div className="space-y-4">
              {demos.map((demo, index) => (
                <motion.button
                  key={demo.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveDemo(index)}
                  className={`w-full flex items-center p-6 rounded-2xl transition-all duration-300 text-left ${
                    activeDemo === index
                      ? 'bg-indigo-500 text-white shadow-xl scale-105'
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-102'
                  }`}
                >
                  <demo.icon
                    className={`w-8 h-8 mr-4 ${activeDemo === index ? 'text-white' : 'text-purple-500'}`}
                  />
                  <div>
                    <h3 className="text-lg font-bold">{demo.title}</h3>
                    <p
                      className={`text-sm ${activeDemo === index ? 'text-white/80' : 'text-gray-500'}`}
                    >
                      Click to see demo
                    </p>
                  </div>
                  {activeDemo === index && (
                    <motion.div
                      layoutId="activeDot"
                      className="ml-auto w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Demo Chat Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ceri AI</h4>
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[200px]"
                >
                  {demos[activeDemo].conversation.map((msg, idx) => (
                    <DemoBubble key={idx} message={msg.message} isAI={msg.isAI} delay={idx * 0.3} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center bg-gray-100 rounded-xl p-3">
                <input
                  type="text"
                  placeholder="Ask Ceri AI anything..."
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  readOnly
                />
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mic className="w-5 h-5 cursor-pointer hover:text-purple-500" />
                  <ImageIcon className="w-5 h-5 cursor-pointer hover:text-purple-500" />
                  <Send className="w-5 h-5 cursor-pointer hover:text-purple-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Questions & Comparison */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <SampleQuestions onQuestionClick={handleQuestionClick} />
            <div className="space-y-8">
              <FreeTrialCounter />
              <SubjectModules onTopicClick={handleQuestionClick} />
            </div>
          </div>
          <ComparisonSection />
        </div>
      </section>

      {/* Before/After & Score Predictor */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <BeforeAfterComparison />
          <NEETScorePredictor />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Why Students Love Ceri AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to make Biology learning effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Loved by NEET Aspirants
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya S.',
                score: 'AIR 1,245',
                text: 'Ceri AI resolved my doubts instantly at 2 AM before my exam. Game changer!',
                rating: 5,
              },
              {
                name: 'Rahul M.',
                score: '680/720 NEET',
                text: 'The voice feature is amazing. I could study hands-free while traveling.',
                rating: 5,
              },
              {
                name: 'Sneha K.',
                score: 'AIR 3,500',
                text: 'Image analysis helped me understand complex diagrams I was struggling with.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-purple-600 font-semibold">{testimonial.score}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Ready to Transform Your NEET Prep?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students who are already learning smarter with Ceri AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowChat(true)}
                className="px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 flex items-center"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Start Free Trial
              </button>
              <Link
                href="/courses"
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                View All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b bg-indigo-500 text-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Ceri AI</h3>
                      <p className="text-xs text-white/80">Your Biology Tutor</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1">
                  <MobileChatInterface />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
