'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  ChevronDown,
  Star,
  BookOpen,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Cpu,
  Layers,
  Send,
  Volume2,
  Image as ImageIcon,
} from 'lucide-react'

// Lazy load the chat interface
const MobileChatInterface = dynamic(
  () =>
    import('@/components/ceri-ai/mobile/MobileChatInterface').then(
      (mod) => mod.MobileChatInterface
    ),
  {
    loading: () => (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 animate-pulse flex items-center justify-center">
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
      {count}
      {suffix}
    </span>
  )
}

// Floating particles background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
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
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
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
  const [activeDemo, setActiveDemo] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

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
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Mic,
      title: 'Voice Interaction',
      description:
        'Ask questions using your voice and receive spoken explanations. Perfect for hands-free learning while studying.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Camera,
      title: 'Visual Analysis',
      description:
        'Upload diagrams, specimen images, or textbook pages. Ceri AI analyzes and explains complex visual concepts.',
      gradient: 'from-green-500 to-emerald-500',
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
      gradient: 'from-red-500 to-pink-500',
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
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
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
              Powered by Advanced AI Technology
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ceri AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            The most advanced AI-powered Biology tutor designed exclusively for{' '}
            <span className="text-white font-semibold">NEET aspirants</span>. Get instant answers,
            visual explanations, and personalized learning 24/7.
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
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center"
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
            {stats.map((stat, index) => (
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

      {/* Interactive Demo Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl scale-105'
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ceri AI</h4>
                  <div className="flex items-center text-sm text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
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

      {/* Features Grid */}
      <section className="py-24 bg-white">
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

      {/* Technology Stack */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Enterprise-grade AI infrastructure built for educational excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Cpu,
                title: 'Multi-Model AI',
                desc: 'GPT-4, Claude, Gemini with intelligent routing',
              },
              { icon: Zap, title: 'Edge Computing', desc: '<2s response time, 99.9% uptime' },
              {
                icon: Shield,
                title: 'Secure & Private',
                desc: 'End-to-end encryption, GDPR compliant',
              },
              {
                icon: Globe,
                title: 'Multi-Language',
                desc: 'English, Hindi, and regional support',
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                <p className="text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
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
                className="bg-white rounded-2xl p-8 shadow-xl"
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

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
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
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
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
                    ✕
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
