'use client'

import { useState } from 'react'
import {
  Crown,
  Star,
  Users,
  Clock,
  Shield,
  Target,
  Gem,
  Trophy,
  Check,
  X,
  Lock,
  Microscope,
  BookOpen,
  Brain,
  UserCheck,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  Calendar,
} from 'lucide-react'
import { getDisplayPhone } from '@/lib/constants/contactInfo'

export function IntensiveNEETBiologyPage() {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false)

  const exclusiveFeatures = [
    {
      icon: Crown,
      title: 'AIIMS Faculty Exclusive',
      description: 'Learn from active AIIMS Delhi professors and researchers',
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Users,
      title: 'Cohort of 50 Elite Students',
      description: 'Carefully selected through rigorous screening process',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Target,
      title: 'Guaranteed AIR <100',
      description: "Money-back guarantee if you don't achieve top 100 rank",
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Brain,
      title: 'Advanced Cognitive Training',
      description: 'Memory palace techniques and speed thinking methodologies',
      color: 'bg-[#5a6d5a]',
    },
    {
      icon: Microscope,
      title: 'Research Lab Access',
      description: 'Hands-on experience at partner research institutions',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Shield,
      title: '24/7 Personal Mentor',
      description: 'Dedicated AIIMS alumnus as your personal guide',
      color: 'bg-[#3d4d3d]',
    },
  ]

  const successMetrics = [
    {
      metric: '100%',
      label: 'AIIMS Selection Rate',
      sublabel: 'Last 3 batches',
      color: 'text-[#3d4d3d]',
    },
    {
      metric: 'AIR 1-50',
      label: 'Average Rank Range',
      sublabel: 'Consistent top performance',
      color: 'text-[#4a5d4a]',
    },
    {
      metric: '98%',
      label: 'Student Satisfaction',
      sublabel: 'Would recommend to peers',
      color: 'text-[#3d4d3d]',
    },
    {
      metric: '₹2.5Cr',
      label: 'Avg. Package Post-MBBS',
      sublabel: 'For our alumni',
      color: 'text-[#4a5d4a]',
    },
  ]

  const curriculumModules = [
    {
      module: 'Cellular Biology Mastery',
      duration: '4 weeks intensive',
      topics: ['Advanced cell signaling', 'Molecular mechanisms', 'Research methodologies'],
      exclusivity: 'Research insights',
    },
    {
      module: 'Human Physiology Excellence',
      duration: '6 weeks deep-dive',
      topics: ['Systems integration', 'Clinical correlations', 'Advanced diagnostics'],
      exclusivity: 'Live patient case studies',
    },
    {
      module: 'Genetics & Evolution Expertise',
      duration: '4 weeks advanced',
      topics: ['CRISPR technologies', 'Population genetics', 'Evolutionary medicine'],
      exclusivity: 'High priority Topics',
    },
    {
      module: 'Plant Biology Innovation',
      duration: '3 weeks focused',
      topics: ['Advanced botany', 'Agricultural biotechnology', 'Plant research'],
      exclusivity: 'Concept maps',
    },
    {
      module: 'Ecology & Environment Mastery',
      duration: '3 weeks intensive',
      topics: ['Climate biology', 'Conservation strategies', 'Environmental medicine'],
      exclusivity: 'Field research expeditions',
    },
  ]

  const premiumTestimonials = [
    {
      name: 'Arjun Mehta',
      rank: 'AIR 7, NEET 2023',
      college: 'AIIMS Delhi',
      testimonial:
        "The Intensive course transformed my understanding of biology. The AIIMS faculty's insights were game-changing. Worth every rupee of the premium investment.",
      score: '715/720',
    },
    {
      name: 'Priya Patel',
      rank: 'AIR 12, NEET 2023',
      college: 'AIIMS Delhi',
      testimonial:
        'This course is in a league of its own. The research lab access and personal mentorship made all the difference. I secured my dream college.',
      score: '712/720',
    },
    {
      name: 'Vikram Singh',
      rank: 'AIR 23, NEET 2022',
      college: 'AIIMS Delhi',
      testimonial:
        'The advanced methodologies and exclusive content gave me an edge over lakhs of students. The investment paid off handsomely.',
      score: '708/720',
    },
  ]

  const pricingTiers = [
    {
      name: 'Intensive Mentorship',
      price: '₹1,50,000',
      duration: '12 months',
      features: [
        'AIIMS Trained faculty',
        'Exclusive Cohort',
        '24/7 personal mentor',
        'The Best Possible results',
        'Premium study material and tests',
        'Weekly one on one session',
      ],
      recommended: true,
      color: 'bg-[#3d4d3d]',
      borderColor: 'border-[#3d4d3d]',
    },
    {
      name: 'Intensive Biology Program',
      price: '₹3,60,000',
      duration: '12 months',
      priceNote: '+ Pinnacle ZA fee',
      features: [
        'Intensive mentorship',
        'Ultra Exclusive Cohort',
        'Great Results',
        'Custom Study Plan',
        'Daily mentor check-ins',
        'Top Rank/College Focus',
      ],
      recommended: false,
      color: 'bg-[#4a5d4a]',
      borderColor: 'border-[#4a5d4a]',
      buttonText: 'Apply for Intensive Biology Course',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3d4d3d] rounded-xl flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 font-bold text-xl">Intensive NEET Biology</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Features
              </a>
              <a
                href="#curriculum"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Curriculum
              </a>
              <a
                href="#faculty"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Faculty
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Investment
              </a>
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="bg-[#3d4d3d] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#4a5d4a] transition-all shadow-lg shadow-[#3d4d3d]/25"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-[#3d4d3d] rounded-full px-4 py-2">
                <Lock className="h-4 w-4 text-white" />
                <span className="text-white font-semibold text-sm">
                  Invitation Only • Limited to 50 Students
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                India's Most
                <span className="text-[#4a5d4a] block">Exclusive</span>
                NEET Biology Course
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                For serious aspirants targeting AIR 1-100. Featuring AIIMS faculty, personalized
                mentorship, and methodologies reserved for India's medical elite.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setIsApplicationFormOpen(true)}
                  className="bg-[#3d4d3d] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4a5d4a] transition-all shadow-xl shadow-[#3d4d3d]/30 flex items-center gap-2"
                >
                  Submit Application
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div className="text-left">
                  <div className="text-gray-500 text-sm">Starting Investment</div>
                  <div className="text-gray-900 font-bold text-2xl">₹2,50,000</div>
                </div>
              </div>
            </div>

            {/* Hero Stats Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-[#3d4d3d]/10 p-8 border border-[#e8ede8]">
              <div className="grid grid-cols-2 gap-6">
                {successMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-[#e8ede8]/50 border border-[#e8ede8]"
                  >
                    <div className="text-3xl font-bold text-[#3d4d3d]">{metric.metric}</div>
                    <div className="text-gray-900 font-semibold mt-1 text-sm">{metric.label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#e8ede8] flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BadgeCheck className="h-5 w-5 text-[#4a5d4a]" />
                  <span>Verified Results</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-[#3d4d3d]" />
                  <span>Money-back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-6 bg-[#3d4d3d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-white/80" />
              <span className="font-medium">AIIMS Faculty</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-white/80" />
              <span className="font-medium">100% Selection Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-white/80" />
              <span className="font-medium">50 Elite Students Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-white/80" />
              <span className="font-medium">AIR &lt;100 Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Features */}
      <section id="features" className="py-20 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              Premium Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes This <span className="text-[#4a5d4a]">Exclusive</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Features and methodologies available nowhere else in India's coaching ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusiveFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3d4d3d] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                      <Gem className="h-4 w-4 text-[#4a5d4a]" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Curriculum */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="h-4 w-4" />
              Advanced Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research-Level <span className="text-[#3d4d3d]">Curriculum</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Going beyond NCERT to research-level understanding that top rankers possess
            </p>
          </div>

          <div className="space-y-4">
            {curriculumModules.map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xl font-bold text-gray-900">{module.module}</span>
                      <span className="bg-[#3d4d3d] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {module.exclusivity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Clock className="h-4 w-4" />
                      {module.duration}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center">
                      <Crown className="h-5 w-5 text-[#3d4d3d]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Faculty */}
      <section id="faculty" className="py-20 bg-[#e8ede8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8] text-center">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <GraduationCap className="h-4 w-4" />
              Elite Faculty
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn from <span className="text-[#4a5d4a]">AIIMS Expert</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Dr. Shekhar Singh, AIIMS Delhi alumnus with 14+ years of experience in NEET Biology
              coaching and 2,500+ successful medical college admissions.
            </p>
            <a
              href="/dr-shekhar-singh"
              className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4a5d4a] transition-all shadow-lg shadow-[#3d4d3d]/25"
            >
              <UserCheck className="h-5 w-5" />
              Meet Dr. Shekhar Singh
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="h-4 w-4" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Rankers <span className="text-[#4a5d4a]">Speak</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who achieved AIR ranks that dreams are made of
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {premiumTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8]"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-14 h-14 bg-[#3d4d3d] rounded-full flex items-center justify-center">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold">{testimonial.name}</h4>
                    <p className="text-[#4a5d4a] font-semibold text-sm">{testimonial.rank}</p>
                    <p className="text-gray-500 text-xs">{testimonial.college}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{testimonial.testimonial}"
                </p>
                <div className="bg-[#e8ede8] text-[#3d4d3d] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  NEET Score: {testimonial.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Pricing */}
      <section id="pricing" className="py-20 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Gem className="h-4 w-4" />
              Investment Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment in <span className="text-[#4a5d4a]">Excellence</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Premium education for serious aspirants who demand the best
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-xl ${tier.recommended ? 'shadow-[#3d4d3d]/20 border-2 border-[#3d4d3d] relative' : 'shadow-[#3d4d3d]/10 border border-[#e8ede8]'}`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-[#3d4d3d] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500">/ {tier.duration}</span>
                  </div>
                  {tier.priceNote && (
                    <p className="text-sm text-gray-500 mt-1">{tier.priceNote}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#e8ede8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-[#3d4d3d]" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setIsApplicationFormOpen(true)}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                    tier.recommended
                      ? 'bg-[#3d4d3d] text-white hover:bg-[#4a5d4a] shadow-lg shadow-[#3d4d3d]/25'
                      : 'bg-[#e8ede8] text-gray-900 hover:bg-[#d8ddd8]'
                  }`}
                >
                  {tier.buttonText || `Apply for ${tier.name}`}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-3">
              Payment plans available • EMI options • Education loans supported
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                The Best possible results
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                Refund policy
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                Secure payments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d]/10 text-[#3d4d3d] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calendar className="h-4 w-4" />
              Selection Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Application <span className="text-[#3d4d3d]">Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Rigorous selection ensures only the most committed students join our elite cohort
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Submit Application',
                description: 'Complete detailed application form with academic records',
                color: 'bg-[#3d4d3d]',
              },
              {
                step: 2,
                title: 'Aptitude Assessment',
                description: 'Biology aptitude test and psychological evaluation',
                color: 'bg-[#4a5d4a]',
              },
              {
                step: 3,
                title: 'Faculty Interview',
                description: 'One-on-one interview with AIIMS faculty member',
                color: 'bg-[#5a6d5a]',
              },
              {
                step: 4,
                title: 'Acceptance',
                description: 'Receive acceptance letter and secure your seat',
                color: 'bg-[#3d4d3d]',
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 ${process.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#3d4d3d]/20`}
                >
                  <span className="text-white font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#e8ede8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-[#4a5d4a]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Why is this course priced at ₹2.5L when other courses cost much less?',
                answer:
                  "This is India's only course with active AIIMS faculty, guaranteed AIR <100, personal mentorship, and research lab access. The investment reflects the exclusive value and guaranteed outcomes that no other course can provide.",
              },
              {
                question: 'What makes the faculty different from other coaching institutes?',
                answer:
                  'Our faculty are active AIIMS professors, not just AIIMS graduates. They are currently teaching at AIIMS, conducting research, and setting NEET questions. This level of faculty access is unprecedented in coaching history.',
              },
              {
                question: 'How do you guarantee AIR <100 ranking?',
                answer:
                  "With our rigorous selection process, AIIMS faculty training, and proven methodologies, we've achieved 100% AIIMS selection rate. If you don't achieve AIR <100, we provide a full refund as per our guarantee policy.",
              },
              {
                question: 'What is the selection criteria for the 50 students?',
                answer:
                  'Students must have 90%+ in Class 12 Biology, clear our aptitude assessment, pass the faculty interview, and demonstrate serious commitment to medical excellence. Only 1 in 10 applicants are accepted.',
              },
              {
                question: 'Can I get financial assistance or EMI options?',
                answer:
                  'Yes, we offer flexible payment plans, EMI options through partner banks, and education loan facilitation. Merit scholarships up to 20% are available for exceptional candidates.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#d8ddd8] p-6 shadow-sm shadow-[#3d4d3d]/5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-gray-900 font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#3d4d3d]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your AIIMS Dream <span className="text-green-400">Starts Here</span>
            </h2>

            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join the elite cohort of 50 students who will dominate NEET 2026. Applications close
              when seats are filled.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="bg-white text-[#3d4d3d] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2"
              >
                Submit Application Now
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="text-white/60 text-sm">Limited Seats</div>
                <div className="text-white font-bold text-lg">Only 23 Seats Remaining</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white/70 text-sm pt-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{getDisplayPhone()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>elite@cerebrumbiologyacademy.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {isApplicationFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Application Form</h3>
                <p className="text-gray-500 text-sm mt-1">Intensive NEET Biology Program</p>
              </div>
              <button
                onClick={() => setIsApplicationFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Class 12 Biology %
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
                    placeholder="Enter percentage"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Target NEET Year
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent">
                    <option value="2025">NEET 2025</option>
                    <option value="2026">NEET 2026</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Why do you want to join this elite program?
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
                  placeholder="Share your motivation and commitment..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-[#3d4d3d] focus:ring-[#3d4d3d]"
                />
                <span className="text-gray-600 text-sm">
                  I understand this is a premium course with rigorous selection criteria and am
                  committed to excellence.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3d4d3d] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#4a5d4a] transition-all shadow-lg shadow-[#3d4d3d]/25"
              >
                Submit Application
              </button>
            </form>

            <div className="mt-6 text-center text-gray-500 text-sm space-y-1">
              <p>Our admissions team will contact you within 24 hours</p>
              <p>Application processing fee: ₹5,000 (adjustable against course fee)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
