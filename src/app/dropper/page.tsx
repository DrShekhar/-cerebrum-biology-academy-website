'use client'

import React, { useEffect } from 'react'
import {
  BookOpen,
  Target,
  TrendingUp,
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
  RefreshCw,
  Shield,
  Heart,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
export default function DropperPage() {
  // Add Course Schema via useEffect
  useEffect(() => {
    const courseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEET Dropper Program | Second Attempt Success Coaching | Cerebrum Academy',
      description:
        'NEET 2027 Dropper program with a 98% NEET-qualification track record. Transform your second attempt with strategic, biology-focused coaching, full-syllabus revision and 30+ full-length mock tests. Faculty led by Dr. Shekhar C Singh (AIIMS).',
      url: 'https://cerebrumbiologyacademy.com/dropper',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
        url: 'https://cerebrumbiologyacademy.com',
        sameAs: ['https://cerebrumbiologyacademy.com'],
      },
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
        jobTitle: 'Founder & Head Faculty',
        alumniOf: 'AIIMS Delhi',
      },
      inLanguage: ['en', 'hi'],
      isAccessibleForFree: false,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: 'NEET Dropper Intensive Program',
        courseMode: ['onsite', 'online'],
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
        },
        startDate: '2026-07-01',
        endDate: '2027-05-31',
        duration: 'P10M',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(courseSchema)
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'demo_booking_dropper', {
          event_category: 'conversion',
          event_label: 'dropper_landing_page',
          value: 1,
        })
      }
      window.location.href = '/book-free-demo'
    }
  }

  const dropperAdvantages = [
    {
      title: 'Complete Focus on NEET',
      description:
        'No board exam pressure - 100% dedicated NEET preparation with intensive coaching',
      icon: Target,
      color: 'bg-red-600',
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
      color: 'bg-green-600',
    },
  ]

  // Illustrative, anonymised improvement profiles (representative ranges, not
  // named individuals) — used to show the kind of turnaround a focused dropper
  // year targets, without claiming specific people/scores.
  const successStories = [
    {
      name: 'Dropper A',
      firstAttempt: 420,
      secondAttempt: 600,
      improvement: 180,
      college: 'Government medical college',
      story: 'Rebuilt weak chapters first; biology score drove the jump',
    },
    {
      name: 'Dropper B',
      firstAttempt: 475,
      secondAttempt: 600,
      improvement: 125,
      college: 'Government medical college',
      story: 'Full-syllabus revision + 30+ full-length mocks closed the gap',
    },
    {
      name: 'Dropper C',
      firstAttempt: 490,
      secondAttempt: 620,
      improvement: 130,
      college: 'Government medical college',
      story: 'Fixed the 6–8 chapters that cost the most marks last attempt',
    },
  ]

  const dropperProgram = [
    {
      phase: 'Phase 1: Foundation Rebuilding',
      duration: '2 months',
      focus: 'Complete revision of Class 11 & 12 concepts with clarity',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-500',
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
      color: 'bg-green-600',
    },
    {
      phase: 'Phase 4: Final Sprint',
      duration: '1 month',
      focus: 'Last-minute revision, confidence building, and mental preparation',
      icon: Zap,
      color: 'bg-orange-600',
    },
  ]

  const successMetrics = [
    { label: '98%', sublabel: 'NEET Qualification Rate', icon: Trophy },
    { label: '+100–150', sublabel: 'Typical 2nd-Attempt Gain', icon: TrendingUp },
    { label: '360/720', sublabel: 'Biology = 50% of NEET', icon: Star },
    { label: '15–20', sublabel: 'Students per Batch', icon: Users },
  ]

  return (
    <div className="min-h-screen">
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/dropper"
        pageName="NEET Dropper Programme"
        parentHub={{
          name: 'Best NEET Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        }}
        personKnowsAbout={[
          'NEET Dropper Programme',
          '1-Year NEET Repeat',
          'Dropper Year Strategy',
          'NEET 650+ Repeat Target',
          'Dropper Mental Health Support',
        ]}
        courseName="Cerebrum NEET Dropper Programme"
        courseDescription="End-to-end 1-year NEET dropper programme combining compressed Class 11 + 12 NCERT revision, biweekly full-length mocks, weekly 1:1 mentor reviews, and dropper-specific psychological support. Same AIIMS-trained faculty as fresh batches."
      />

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
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <RefreshCw className="w-5 h-5 mr-2" />
                NEET Dropper Intensive Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Turn Your <span className="text-yellow-300">Setback</span> into{' '}
                <span className="text-yellow-300">Comeback</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Didn&apos;t get the NEET score you wanted? Don&apos;t lose hope. Our biology-focused
                DROPPER program is built to turn a second attempt into a medical-college admission.
                Your dream is still alive!
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
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Comeback Journey
                </Button>

                <Link href="/success-stories">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-white text-white hover:bg-white hover:text-orange-600"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    See Success Stories
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {successMetrics.map((metric, index) => (
                  <div key={metric.label} className="text-center animate-fadeInUp">
                    <metric.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                    <div className="text-lg font-bold">{metric.label}</div>
                    <div className="text-xs opacity-80">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fadeInUp">
              {/* Dropper Success Stories */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-2 text-center">
                  Dropper Success Transformations
                </h3>
                <p className="mb-6 text-center text-xs opacity-80">
                  Illustrative improvement profiles — representative of a focused dropper year, not
                  specific individuals.
                </p>

                <div className="space-y-6">
                  {successStories.map((story, index) => (
                    <div key={story.name} className="bg-white/10 rounded-lg p-4 animate-fadeInUp">
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
                    </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* RE-NEET 2026 announcement — purely additive lead-magnet block.
          Surfaces the news + crash-course CTA on high-traffic NEET hubs. */}
      <section className="mx-auto max-w-4xl px-4">
        <aside
          className="my-6 rounded-xl border-2 border-red-200 bg-red-50 p-5"
          aria-label="RE-NEET 2026 announcement"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
              <span aria-hidden="true">!</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-red-900">
                Re-NEET 2026 done — results awaited. Weighing a drop year for NEET 2027?
              </h3>
              <p className="mt-1 text-sm leading-snug text-slate-700">
                NEET-UG 2026 was cancelled over a paper leak and the Re-NEET was held on 21 June
                2026; results are expected in July. If your score isn&apos;t what you hoped, you
                don&apos;t have to decide alone — talk to us about a biology-focused NEET 2027 dropper
                plan built around the chapters that cost you marks. Free demo today.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="/re-neet-2026"
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Read the full update →
                </a>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20gave%20Re-NEET%202026%20and%20I'm%20considering%20a%20NEET%202027%20drop%20year.%20Please%20share%20the%20biology%20dropper%20plan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                >
                  WhatsApp our counsellor
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Why Choose Dropper Program */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Our Dropper Program is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges droppers face. Our specialized program addresses
              your specific needs with proven strategies for second-attempt success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {dropperAdvantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${advantage.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <advantage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10-Month Dropper Program Structure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Strategic 10-Month Dropper Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A scientifically designed program that systematically builds your preparation from
              foundation to mastery, ensuring maximum score improvement.
            </p>
          </div>

          <div className="space-y-8">
            {dropperProgram.map((phase, index) => (
              <div
                key={phase.phase}
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
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Complete syllabus revision
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Concept clarity sessions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Weakness identification
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Study plan customization
                          </li>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Chapter-wise test series
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Previous year questions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Advanced problem solving
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Speed and accuracy drills
                          </li>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Full-length mock tests
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Performance analysis
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Weak area strengthening
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Time management training
                          </li>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Final revision strategy
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Confidence building sessions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Exam day preparation
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                            Mental conditioning
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fadeInUp">
            <div className="bg-orange-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Typical second-attempt gain: 100–150 marks in a focused dropper year
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                A biology-first plan — full-syllabus revision, the 6–8 chapters that cost you most,
                and 30+ full-length mocks — built to make your second attempt your successful one.
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-orange-600"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Start Your Transformation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Toppers - Dropper Success Stories */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials - Focus on Dropper Parents */}
      <ParentTestimonialsSection />

      {/* Final Motivational CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
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
              Don&apos;t let one setback define your future. Turn your disappointment into
              determination with a biology-focused NEET 2027 dropper plan. Your comeback story starts
              now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Begin Your Comeback Story
              </Button>

              <a
                href="https://wa.me/918826444334?text=Hi!%20I'm%20a%20NEET%20dropper%20—%20please%20share%20the%20biology%20dropper%20programme%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Talk to a Counsellor
                </Button>
              </a>
            </div>

            {/* Final Inspiration */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>98% NEET Qualification</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>+100–150 Typical Gain</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Biology = 360/720</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
