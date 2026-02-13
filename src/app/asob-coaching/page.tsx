'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Globe,
  Microscope,
  Dna,
  Leaf,
  Heart,
  GraduationCap,
  Clock,
  ClipboardCheck,
  Layers,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const asobPathway = [
  {
    stage: 'Stage 1',
    name: 'ASOE Exam',
    description: 'Australian Science Olympiad Exam',
    date: 'August',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'Summer School',
    description: 'Top 24 students selected',
    date: 'January',
    icon: Award,
  },
  {
    stage: 'Stage 3',
    name: 'Team Selection',
    description: 'Final 4 for IBO team',
    date: 'February',
    icon: GraduationCap,
  },
  {
    stage: 'Stage 4',
    name: 'IBO',
    description: 'International Biology Olympiad',
    date: 'July',
    icon: Globe,
  },
]

const syllabus = [
  {
    unit: 'Cell Biology & Biochemistry',
    topics: ['Cell Structure', 'Metabolism', 'Enzymes', 'Cell Signaling'],
    weightage: '20%',
    icon: Microscope,
  },
  {
    unit: 'Genetics & Evolution',
    topics: [
      'Mendelian Genetics',
      'Molecular Genetics',
      'Population Genetics',
      'Evolutionary Theory',
    ],
    weightage: '20%',
    icon: Dna,
  },
  {
    unit: 'Plant Biology',
    topics: ['Plant Anatomy', 'Photosynthesis', 'Transport', 'Plant Reproduction'],
    weightage: '15%',
    icon: Leaf,
  },
  {
    unit: 'Animal Anatomy & Physiology',
    topics: ['Human Systems', 'Comparative Anatomy', 'Homeostasis', 'Development'],
    weightage: '25%',
    icon: Heart,
  },
  {
    unit: 'Ecology & Behavior',
    topics: ['Population Ecology', 'Community Ecology', 'Animal Behavior', 'Conservation'],
    weightage: '15%',
    icon: Globe,
  },
  {
    unit: 'Biosystematics',
    topics: ['Taxonomy', 'Phylogenetics', 'Classification', 'Biodiversity'],
    weightage: '5%',
    icon: Layers,
  },
]

const features = [
  {
    icon: BookOpen,
    title: 'Campbell Biology Coverage',
    description:
      'Complete coverage of all 56 chapters from Campbell Biology, aligned with ASOB requirements',
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description:
      'Learn from IBO medalists and experienced Biology Olympiad coaches with proven track records',
  },
  {
    icon: Target,
    title: 'ASOB-Focused Strategy',
    description:
      'Targeted preparation for Australian Science Olympiad exam format and question patterns',
  },
  {
    icon: ClipboardCheck,
    title: 'Weekly Assessments',
    description:
      'Regular practice tests modeled on ASOB past papers with detailed performance analytics',
  },
  {
    icon: MessageCircle,
    title: '1-on-1 Doubt Sessions',
    description: 'Personalized doubt clearing sessions via WhatsApp and video calls',
  },
  {
    icon: Play,
    title: 'Recorded Lectures',
    description: 'Access to 200+ hours of recorded lectures for revision anytime, anywhere',
  },
]

const faqs = [
  {
    question: 'What is the Australian Science Olympiad Biology (ASOB)?',
    answer:
      'The Australian Science Olympiad Biology (ASOB) is part of the Australian Science Olympiad program run by Australian Science Innovations (ASI). It identifies and trains talented biology students who may represent Australia at the International Biology Olympiad (IBO).',
  },
  {
    question: 'Who is eligible for ASOB?',
    answer:
      'ASOB is open to secondary school students in Australia who are Australian citizens or permanent residents. Students typically in Years 10-12 participate, and must be under 20 years of age on July 1st of the IBO year.',
  },
  {
    question: 'What is the format of the ASOB exam?',
    answer:
      'The Australian Science Olympiad Exam (ASOE) is a 2-hour written exam consisting of multiple choice and short answer questions covering all areas of biology. Top performers are invited to the residential Summer School.',
  },
  {
    question: 'How do I prepare for ASOB?',
    answer:
      'ASOB preparation requires mastery of Campbell Biology (12th edition), understanding of IBO syllabus topics, and extensive practice with past papers. Our coaching program provides structured preparation with expert guidance.',
  },
  {
    question: 'Can international students join your ASOB coaching?',
    answer:
      'Yes! Our online ASOB coaching is available to students worldwide. While ASOB participation requires Australian eligibility, our program is excellent preparation for any biology olympiad.',
  },
  {
    question: 'What makes your ASOB coaching different?',
    answer:
      'We offer personalized 1-on-1 coaching, complete Campbell Biology coverage, ASOB past paper analysis, weekly assessments, and direct access to faculty via WhatsApp for doubt clearing.',
  },
]

const testimonials = [
  {
    name: 'Liam K.',
    location: 'Sydney, NSW',
    achievement: 'ASOB Gold Medalist 2024',
    quote:
      'The structured Campbell Biology coverage helped me systematically prepare for ASOB. Made it to the Summer School!',
    avatar: 'LK',
  },
  {
    name: 'Emma W.',
    location: 'Melbourne, VIC',
    achievement: 'ASOB Silver Medalist',
    quote:
      'The faculty really understand the ASOE exam pattern. Their guidance on practical skills was invaluable.',
    avatar: 'EW',
  },
  {
    name: 'Noah T.',
    location: 'Brisbane, QLD',
    achievement: 'ASOB Bronze Medalist',
    quote:
      'WhatsApp doubt clearing was a game-changer. I could get help whenever I was stuck on difficult concepts.',
    avatar: 'NT',
  },
]

const pricing = [
  {
    name: 'ASOB Foundation',
    price: 'AUD 649',
    priceUSD: '$425 USD',
    duration: '3 months',
    features: [
      'Complete Campbell Biology coverage',
      'Weekly live classes (2 hrs/week)',
      'ASOB past papers (10 years)',
      'WhatsApp doubt support',
      'Performance tracking',
    ],
    popular: false,
  },
  {
    name: 'ASOB Intensive',
    price: 'AUD 1,149',
    priceUSD: '$750 USD',
    duration: '6 months',
    features: [
      'Everything in Foundation',
      '1-on-1 mentoring sessions',
      'Extended live classes (4 hrs/week)',
      'Mock tests with analysis',
      'IBO-level problem solving',
      'Summer School preparation',
    ],
    popular: true,
  },
  {
    name: 'ASOB Elite',
    price: 'AUD 1,899',
    priceUSD: '$1,250 USD',
    duration: '12 months',
    features: [
      'Everything in Intensive',
      'Daily doubt clearing',
      'Practical exam preparation',
      'Priority faculty access',
      'International competition prep',
      'Lifetime recorded access',
    ],
    popular: false,
  },
]

export default function ASOBCoachingPage() {
  const handleWhatsAppClick = (source: string) => {
    const message = `Hi! I'm from Australia and interested in ASOB coaching. I'd like to know more about your program. [Source: ${source}]`
    trackAndOpenWhatsApp({
      message,
      source,
      page: 'asob-coaching',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="text-center animate-fadeInUp"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-green-500" />
              <span className="text-green-400 font-medium">For Students in Australia</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ASOB Coaching Online
              <span className="block text-yellow-400 mt-2">
                Australian Science Olympiad Biology
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert online coaching for the Australian Science Olympiad Biology. Prepare with
              IBO-level curriculum, experienced faculty, and personalized mentorship to represent
              Australia at the International Biology Olympiad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleWhatsAppClick('hero-cta')}
                className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </button>
              <Link
                href="/biology-olympiad-preparation"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
              >
                Explore All Olympiads
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fadeInUp"
          >
            {[
              { value: '40+', label: 'ASOB Medalists Trained' },
              { value: '90%', label: 'Summer School Selection' },
              { value: '200+', label: 'Hours of Content' },
              { value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASOB Pathway */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ASOB Selection Pathway
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey from the National Exam to representing Australia at IBO
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {asobPathway.map((stage, index) => (
              <div
                key={index}
                className="relative animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <stage.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-semibold text-green-600 mb-1">{stage.stage}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {stage.date}
                  </div>
                </div>
                {index < asobPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ASOB Syllabus Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation based on Campbell Biology and IBO syllabus
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((unit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <unit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {unit.weightage}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{unit.unit}</h3>
                <ul className="space-y-2">
                  {unit.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our ASOB Coaching?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in the Australian Science Olympiad Biology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our ASOB medalists across Australia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 animate-fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-yellow-700">
                    {testimonial.achievement}
                  </span>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">ASOB Coaching Plans</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the plan that best fits your preparation timeline
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-white ring-4 ring-yellow-400'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-white'}`}
                  >
                    {plan.name}
                  </h3>
                  <div
                    className={`text-4xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}
                  >
                    {plan.price}
                  </div>
                  <div className={`text-sm ${plan.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                    {plan.priceUSD} / {plan.duration}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.popular ? 'text-green-500' : 'text-green-400'}`}
                      />
                      <span className={plan.popular ? 'text-gray-600' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    handleWhatsAppClick(`pricing-${plan.name.toLowerCase().replace(' ', '-')}`)
                  }
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  <MessageCircle className="h-5 w-5 inline mr-2" />
                  Enquire on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about ASOB preparation
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your ASOB Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join Australia&apos;s top Biology Olympiad coaching program. Chat with us to learn more.
          </p>
          <button
            onClick={() => handleWhatsAppClick('footer-cta')}
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Start WhatsApp Chat
          </button>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore More Biology Olympiad Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link
              href="/campbell-biology"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <BookOpen className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Campbell Biology</h3>
              <p className="text-sm text-gray-600">Complete chapter-wise coverage</p>
            </Link>
            <Link
              href="/ibo-preparation"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <Globe className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">IBO Preparation</h3>
              <p className="text-sm text-gray-600">International Biology Olympiad</p>
            </Link>
            <Link
              href="/usabo-coaching"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <Award className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">USABO Coaching</h3>
              <p className="text-sm text-gray-600">USA Biology Olympiad</p>
            </Link>
            <Link
              href="/biology-olympiad-preparation"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <Trophy className="h-8 w-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">All Olympiads</h3>
              <p className="text-sm text-gray-600">Complete olympiad guide</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppClick('floating-button')}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 animate-fadeInUp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'ASOB Coaching Online - Australian Science Olympiad Biology Preparation',
            description:
              'Expert online coaching for the Australian Science Olympiad Biology (ASOB). Complete Campbell Biology coverage, past paper practice, and personalized mentorship.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              sameAs: 'https://cerebrumbiologyacademy.com',
            },
            courseCode: 'ASOB-PREP',
            educationalLevel: 'High School',
            inLanguage: 'en',
            teaches: [
              'Biology',
              'Cell Biology',
              'Genetics',
              'Ecology',
              'Plant Biology',
              'Animal Physiology',
            ],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Online',
              instructor: {
                '@type': 'Organization',
                name: 'Cerebrum Biology Academy',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
