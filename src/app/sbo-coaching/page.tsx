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

const sboPathway = [
  {
    stage: 'Stage 1',
    name: 'SBO Selection',
    description: 'School-based nomination',
    date: 'January',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'SBO Round 1',
    description: 'Written theory examination',
    date: 'February',
    icon: Award,
  },
  {
    stage: 'Stage 3',
    name: 'SBO Round 2',
    description: 'Theory + Practical exams',
    date: 'March-April',
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
      'Complete coverage of all 56 chapters from Campbell Biology, aligned with SBO requirements',
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description:
      'Learn from IBO medalists and experienced Biology Olympiad coaches with proven track records',
  },
  {
    icon: Target,
    title: 'SBO-Focused Strategy',
    description:
      'Targeted preparation for Singapore Biology Olympiad exam format and question patterns',
  },
  {
    icon: ClipboardCheck,
    title: 'Weekly Assessments',
    description:
      'Regular practice tests modeled on SBO past papers with detailed performance analytics',
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
    question: 'What is the Singapore Biology Olympiad (SBO)?',
    answer:
      'The Singapore Biology Olympiad (SBO) is organized by the Singapore National Institute of Education. It selects the top 4 students to represent Singapore at the International Biology Olympiad (IBO). Singapore consistently achieves outstanding results at IBO.',
  },
  {
    question: 'Who is eligible for SBO?',
    answer:
      'SBO is open to secondary school and junior college students in Singapore. Students are typically nominated by their schools and must meet the age requirements for IBO participation (under 20 on July 1st of competition year).',
  },
  {
    question: 'What is the format of the SBO exam?',
    answer:
      'SBO consists of multiple rounds. Round 1 is a written theory examination. Top performers advance to Round 2 which includes both theory and practical examinations. The final 4 students are selected to represent Singapore at IBO.',
  },
  {
    question: 'How do I prepare for SBO?',
    answer:
      "SBO preparation requires mastery of Campbell Biology (12th edition), strong practical skills, and extensive practice with past papers. Our coaching program provides structured preparation aligned with Singapore's rigorous standards.",
  },
  {
    question: 'Can international students join your SBO coaching?',
    answer:
      'Yes! Our online SBO coaching is available to students worldwide. While SBO participation requires Singapore eligibility, our program is excellent preparation for any biology olympiad.',
  },
  {
    question: 'What makes your SBO coaching different?',
    answer:
      'We offer personalized 1-on-1 coaching, complete Campbell Biology coverage, SBO past paper analysis, practical exam preparation, weekly assessments, and direct access to faculty via WhatsApp.',
  },
]

const testimonials = [
  {
    name: 'Wei Lin T.',
    location: 'Singapore',
    achievement: 'SBO Gold Medalist 2024',
    quote:
      'The structured Campbell Biology coverage and practical preparation helped me excel in SBO. Made it to the national team!',
    avatar: 'WT',
  },
  {
    name: 'Sarah C.',
    location: 'Singapore',
    achievement: 'SBO Silver Medalist',
    quote:
      'The faculty really understand the SBO exam pattern. Their guidance on practical techniques was invaluable.',
    avatar: 'SC',
  },
  {
    name: 'Kevin L.',
    location: 'Singapore',
    achievement: 'SBO Bronze Medalist',
    quote:
      'WhatsApp doubt clearing was a game-changer. I could get help whenever I was stuck on difficult concepts.',
    avatar: 'KL',
  },
]

const pricing = [
  {
    name: 'SBO Foundation',
    price: 'SGD 799',
    priceUSD: '$599 USD',
    duration: '3 months',
    features: [
      'Complete Campbell Biology coverage',
      'Weekly live classes (2 hrs/week)',
      'SBO past papers (10 years)',
      'WhatsApp doubt support',
      'Performance tracking',
    ],
    popular: false,
  },
  {
    name: 'SBO Intensive',
    price: 'SGD 1,399',
    priceUSD: '$1,049 USD',
    duration: '6 months',
    features: [
      'Everything in Foundation',
      '1-on-1 mentoring sessions',
      'Extended live classes (4 hrs/week)',
      'Mock tests with analysis',
      'Practical exam preparation',
      'IBO-level problem solving',
    ],
    popular: true,
  },
  {
    name: 'SBO Elite',
    price: 'SGD 2,299',
    priceUSD: '$1,725 USD',
    duration: '12 months',
    features: [
      'Everything in Intensive',
      'Daily doubt clearing',
      'Advanced practical training',
      'Priority faculty access',
      'International competition prep',
      'Lifetime recorded access',
    ],
    popular: false,
  },
]

export default function SBOCoachingPage() {
  const handleWhatsAppClick = (source: string) => {
    const message = `Hi! I'm from Singapore and interested in SBO coaching. I'd like to know more about your program. [Source: ${source}]`
    trackAndOpenWhatsApp({
      message,
      source,
      page: 'sbo-coaching',
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
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-red-400 font-medium">For Students in Singapore</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              SBO Coaching Online
              <span className="block text-yellow-400 mt-2">Singapore Biology Olympiad</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert online coaching for the Singapore Biology Olympiad. Prepare with IBO-level
              curriculum, experienced faculty, and personalized mentorship to represent Singapore at
              the International Biology Olympiad.
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
              { value: '35+', label: 'SBO Medalists Trained' },
              { value: '92%', label: 'Round 2 Selection' },
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

      {/* SBO Pathway */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SBO Selection Pathway
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey from school selection to representing Singapore at IBO
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sboPathway.map((stage, index) => (
              <div
                key={index}
                className="relative animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <stage.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-sm font-semibold text-red-600 mb-1">{stage.stage}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {stage.date}
                  </div>
                </div>
                {index < sboPathway.length - 1 && (
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
              SBO Syllabus Coverage
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
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <unit.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
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
              Why Choose Our SBO Coaching?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in the Singapore Biology Olympiad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
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
              Hear from our SBO medalists from Singapore
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 animate-fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">SBO Coaching Plans</h2>
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
              Everything you need to know about SBO preparation
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
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your SBO Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join Singapore&apos;s top Biology Olympiad coaching program. Chat with us to learn more.
          </p>
          <button
            onClick={() => handleWhatsAppClick('footer-cta')}
            className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
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
              <BookOpen className="h-8 w-8 text-red-600 mb-3" />
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
            name: 'SBO Coaching Online - Singapore Biology Olympiad Preparation',
            description:
              'Expert online coaching for the Singapore Biology Olympiad (SBO). Complete Campbell Biology coverage, past paper practice, and personalized mentorship.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              sameAs: 'https://cerebrumbiologyacademy.com',
            },
            courseCode: 'SBO-PREP',
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
