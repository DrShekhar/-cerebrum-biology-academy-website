'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  CheckCircle,
  Star,
  Play,
  Calendar,
  Brain,
  Zap,
  Trophy,
  ArrowRight,
  AlertCircle,
  Flame,
  RefreshCw,
  Shield,
  Heart,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function DropperPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_dropper', {
        event_category: 'conversion',
        event_label: 'dropper_landing_page',
        value: 1,
      })
    }
  }

  const dropperAdvantages = [
    {
      title: 'Complete Focus on NEET',
      description:
        'No board exam pressure - 100% dedicated NEET preparation with intensive coaching',
      icon: Target,
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Weakness Analysis & Fixing',
      description:
        'Identify and strengthen weak areas from previous attempt with personalized approach',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Advanced Problem Solving',
      description: 'Master the toughest NEET questions with advanced techniques and shortcuts',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Mental Conditioning',
      description: 'Build unshakeable confidence and exam temperament for NEET success',
      icon: Shield,
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  const successStories = [
    {
      name: 'Rohit Agarwal',
      firstAttempt: 420,
      secondAttempt: 610,
      improvement: 190,
      college: 'Government Medical College Kota',
      story: 'From feeling hopeless after first attempt to securing government college',
    },
    {
      name: 'Shubham Rai',
      firstAttempt: 475,
      secondAttempt: 605,
      improvement: 130,
      college: 'BHU Varanasi',
      story: 'Third attempt success after two failures - never gave up spirit',
    },
    {
      name: 'Vikash Singh',
      firstAttempt: 490,
      secondAttempt: 628,
      improvement: 138,
      college: 'CMC Vellore',
      story: 'Strategic preparation in dropper year led to dream college',
    },
  ]

  const dropperProgram = [
    {
      phase: 'Phase 1: Foundation Rebuilding',
      duration: '2 months',
      focus: 'Complete revision of Class 11 & 12 concepts with clarity',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      phase: 'Phase 2: Advanced Practice',
      duration: '4 months',
      focus: 'Intensive problem solving and previous year questions mastery',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      phase: 'Phase 3: Test Series & Fine-tuning',
      duration: '3 months',
      focus: 'Full-length mocks, weak area strengthening, and exam strategy',
      icon: Target,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      phase: 'Phase 4: Final Sprint',
      duration: '1 month',
      focus: 'Last-minute revision, confidence building, and mental preparation',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const successMetrics = [
    { label: '78.4%', sublabel: 'Dropper Success Rate', icon: Trophy },
    { label: '156+', sublabel: 'Avg Improvement', icon: TrendingUp },
    { label: '89.2%', sublabel: 'Score 550+ Marks', icon: Star },
    { label: '1.8K+', sublabel: 'Dropper Selections', icon: Users },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Motivational & Urgent */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Motivation Banner */}
        <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center">
              <Heart className="w-5 h-5 mr-2" />
              <span className="font-bold">
                🔥 Don't Give Up! Your Medical Dream Deserves Another Fight!
              </span>
              <RefreshCw className="w-5 h-5 ml-2 animate-spin" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <RefreshCw className="w-5 h-5 mr-2" />
                NEET Dropper Intensive Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Turn Your <span className="text-yellow-300">Setback</span> into{' '}
                <span className="text-yellow-300">Comeback</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Failed NEET? Don't lose hope! Our DROPPER program has helped 1,800+ students
                transform their failures into medical college admissions. Your dream is still alive!
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-300" />
                  Why Droppers Often Succeed Better:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    Complete focus - no board exam distractions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    Experience advantage - know exam patterns
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    Stronger motivation - burning desire to succeed
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    Better time management - full year for preparation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    Mature mindset - serious about medical career
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Comeback Journey
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Download Success Stories
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <metric.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                    <div className="text-lg font-bold">{metric.label}</div>
                    <div className="text-xs opacity-80">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Dropper Success Stories */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Dropper Success Transformations
                </h3>

                <div className="space-y-6">
                  {successStories.map((story, index) => (
                    <motion.div
                      key={story.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="bg-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{story.name}</div>
                        <div className="text-green-300 font-bold">+{story.improvement} marks</div>
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        <span className="text-red-300">{story.firstAttempt}</span> →{' '}
                        <span className="text-green-300">{story.secondAttempt}</span> marks
                      </div>
                      <div className="text-xs opacity-80 mb-2">{story.college}</div>
                      <div className="text-xs opacity-70 italic">"{story.story}"</div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Link href="/success-stories">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-orange-600"
                    >
                      Read More Success Stories
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Dropper Program */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Our Dropper Program is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges droppers face. Our specialized program addresses
              your specific needs with proven strategies for second-attempt success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {dropperAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${advantage.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <advantage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10-Month Dropper Program Structure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Strategic 10-Month Dropper Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A scientifically designed program that systematically builds your preparation from
              foundation to mastery, ensuring maximum score improvement.
            </p>
          </motion.div>

          <div className="space-y-8">
            {dropperProgram.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <phase.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{phase.phase}</h3>
                  <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-lg font-medium text-gray-700">{phase.duration}</span>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">{phase.focus}</p>
                </div>

                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Key Activities:</h4>
                    <ul className="space-y-3 text-gray-700">
                      {index === 0 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Complete syllabus revision
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Concept clarity sessions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Weakness identification
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Study plan customization
                          </li>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Chapter-wise test series
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Previous year questions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Advanced problem solving
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Speed and accuracy drills
                          </li>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Full-length mock tests
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Performance analysis
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Weak area strengthening
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Time management training
                          </li>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Final revision strategy
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Confidence building sessions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Exam day preparation
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                            Mental conditioning
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Average Score Improvement: 156+ marks in dropper year
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our systematic approach has helped 1,800+ droppers achieve their medical dreams.
                Your second attempt will be your successful attempt!
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-orange-600 to-red-600"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Start Your Transformation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Toppers - Dropper Success Stories */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials - Focus on Dropper Parents */}
      <ParentTestimonialsSection />

      {/* Final Motivational CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 mr-3 text-red-300" />
                <span className="text-2xl font-bold">Your Dreams Are Worth Fighting For</span>
                <Heart className="w-8 h-8 ml-3 text-red-300" />
              </div>
              <blockquote className="text-xl italic mb-4">
                "Success is not final, failure is not fatal: it is the courage to continue that
                counts."
              </blockquote>
              <p className="text-lg opacity-90">
                Every medical student has a unique journey. Some succeed in the first attempt,
                others in the second. What matters is that you never give up on your dream.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Medical Dream Deserves a Second Chance
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't let one setback define your future. Join 1,800+ droppers who turned their
              disappointment into determination and failure into success. Your comeback story starts
              now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary_cta"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Begin Your Comeback Story
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Heart className="w-5 h-5 mr-2" />
                Talk to Dropper Alumni
              </Button>
            </div>

            {/* Final Inspiration */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>78.4% Dropper Success</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>156+ Avg Improvement</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>1,800+ Dreams Fulfilled</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
