'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle,
  BookOpen,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Target,
  Microscope,
  FileText,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function KBOCoachingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleWhatsAppClick = (source: string) => {
    const message = `Hi! I'm from South Korea and interested in KBO (Korean Biology Olympiad) coaching. I want to prepare for the Biology Olympiad and potentially qualify for IBO. Can you tell me about your coaching program, schedule, and fees?`
    trackAndOpenWhatsApp({
      message,
      source,
      page: 'kbo-coaching',
    })
  }

  const pathwayStages = [
    {
      stage: '1',
      title: 'Preliminary Round',
      description: 'School-level selection and regional qualifiers',
      icon: FileText,
    },
    {
      stage: '2',
      title: 'Second Round',
      description: 'National theory examination with MCQs and written answers',
      icon: BookOpen,
    },
    {
      stage: '3',
      title: 'Final Round',
      description: 'Intensive practical and theory examination',
      icon: Microscope,
    },
    {
      stage: '4',
      title: 'IBO Team',
      description: 'Top 4 students represent South Korea at IBO',
      icon: Globe,
    },
  ]

  const syllabusUnits = [
    {
      unit: 'Unit 1',
      title: 'Cell Biology & Biochemistry',
      topics: ['Cell Structure', 'Metabolism', 'Enzymes', 'Molecular Biology'],
    },
    {
      unit: 'Unit 2',
      title: 'Genetics & Evolution',
      topics: ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics', 'Evolution'],
    },
    {
      unit: 'Unit 3',
      title: 'Plant Biology',
      topics: ['Plant Anatomy', 'Photosynthesis', 'Plant Hormones', 'Transport Systems'],
    },
    {
      unit: 'Unit 4',
      title: 'Animal Physiology',
      topics: ['Nervous System', 'Endocrine System', 'Circulatory System', 'Excretion'],
    },
    {
      unit: 'Unit 5',
      title: 'Ecology & Environment',
      topics: ['Ecosystems', 'Population Dynamics', 'Biodiversity', 'Conservation'],
    },
    {
      unit: 'Unit 6',
      title: 'Biosystematics',
      topics: ['Classification', 'Taxonomy', 'Phylogenetics', 'Diversity of Life'],
    },
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Campbell Biology Mastery',
      description: 'Complete coverage of all 56 chapters aligned with KBO syllabus',
    },
    {
      icon: Target,
      title: 'KBO Past Papers',
      description: 'Extensive practice with previous years Korean Biology Olympiad papers',
    },
    {
      icon: Users,
      title: '1-on-1 Mentorship',
      description: 'Personal guidance from experienced Olympiad coaches and IBO medalists',
    },
    {
      icon: Microscope,
      title: 'Practical Training',
      description: 'Virtual lab sessions and practical problem-solving techniques',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Classes scheduled to accommodate Korean timezone (KST)',
    },
    {
      icon: Trophy,
      title: 'Competition Strategy',
      description: 'Specialized tips for Korean Biology Olympiad exam patterns',
    },
  ]

  const testimonials = [
    {
      name: 'Minjun K.',
      location: 'Seoul',
      achievement: 'KBO Finalist 2024',
      quote:
        'The structured Campbell Biology approach helped me understand complex concepts. The practice tests were exactly what I needed for KBO preparation.',
      rating: 5,
    },
    {
      name: 'Soyeon P.',
      location: 'Busan',
      achievement: 'KBO Silver Medal',
      quote:
        'My mentor understood the Korean Biology Olympiad format perfectly. The 1-on-1 sessions made all the difference in my preparation.',
      rating: 5,
    },
    {
      name: 'Jihoon L.',
      location: 'Daejeon',
      achievement: 'IBO 2024 Participant',
      quote:
        'From regional rounds to representing Korea at IBO - Cerebrum was with me at every step. Highly recommended for serious Olympiad aspirants!',
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: 'Foundation',
      priceKRW: '₩350,000',
      priceUSD: '$280',
      period: '/month',
      description: 'Perfect for starting your KBO journey',
      features: [
        '8 live sessions/month',
        'Campbell Biology Units 1-4',
        'KBO past paper access',
        'WhatsApp doubt support',
        'Weekly assessments',
      ],
      popular: false,
    },
    {
      name: 'Intensive',
      priceKRW: '₩550,000',
      priceUSD: '$440',
      period: '/month',
      description: 'Comprehensive preparation for KBO finals',
      features: [
        '16 live sessions/month',
        'Complete Campbell Biology',
        'All KBO past papers + solutions',
        '24/7 priority support',
        'Mock tests with feedback',
        'Practical training sessions',
      ],
      popular: true,
    },
    {
      name: 'IBO Elite',
      priceKRW: '₩850,000',
      priceUSD: '$680',
      period: '/month',
      description: 'For IBO team selection candidates',
      features: [
        'Unlimited sessions',
        'IBO-level preparation',
        'International past papers',
        '1-on-1 mentorship',
        'Lab practical training',
        'Competition strategy sessions',
        'Parent progress reports',
      ],
      popular: false,
    },
  ]

  const faqs = [
    {
      question: 'What is KBO and how do I qualify for it?',
      answer:
        "KBO (Korean Biology Olympiad) is South Korea's premier biology competition. Students first compete at school and regional levels, then progress through multiple rounds of national examinations. Top performers qualify for IBO (International Biology Olympiad) team selection.",
    },
    {
      question: 'How are your classes scheduled for Korean students?',
      answer:
        'We offer flexible scheduling with sessions available in KST (Korea Standard Time) evenings and weekends. Live classes are recorded for review, and our platform allows 24/7 access to study materials.',
    },
    {
      question: 'Do you cover the complete KBO syllabus?',
      answer:
        'Yes! Our curriculum is based on Campbell Biology and covers all topics tested in KBO including Cell Biology, Genetics, Plant Biology, Animal Physiology, Ecology, and Biosystematics. We also include practical components.',
    },
    {
      question: 'What makes your coaching different from local Korean coaching?',
      answer:
        'We offer personalized 1-on-1 mentorship from IBO medalists and experienced coaches, extensive international past paper practice, flexible online scheduling, and a proven track record of producing Olympiad qualifiers.',
    },
    {
      question: 'How do payments work for Korean students?',
      answer:
        'We accept international payments via credit/debit cards and PayPal. Fees are listed in both KRW and USD for transparency. Monthly and quarterly payment options are available.',
    },
    {
      question: 'Can you help with IBO preparation after KBO?',
      answer:
        'Absolutely! Our IBO Elite program is specifically designed for students who qualify for the national team. We provide international-level preparation including past IBO papers, advanced practical training, and intensive theory sessions.',
    },
  ]

  const internalLinks = [
    { href: '/biology-olympiad-preparation', label: 'Biology Olympiad Hub' },
    { href: '/ibo-preparation', label: 'IBO Preparation' },
    { href: '/campbell-biology', label: 'Campbell Biology Chapters' },
    { href: '/usabo-coaching', label: 'USABO Coaching' },
    { href: '/cnbo-coaching', label: 'CNBO Coaching' },
    { href: '/jbo-coaching', label: 'JBO Coaching' },
  ]

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'KBO Coaching - Korean Biology Olympiad Preparation',
            description:
              'Expert online coaching for Korean Biology Olympiad (KBO) with Campbell Biology curriculum, past papers, and IBO preparation.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'High School',
            about: {
              '@type': 'Thing',
              name: 'Biology Olympiad',
            },
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              geographicArea: {
                '@type': 'Country',
                name: 'South Korea',
              },
            },
            inLanguage: 'en',
            offers: {
              '@type': 'Offer',
              category: 'Online Course',
              priceCurrency: 'KRW',
              price: '350000',
              availability: 'https://schema.org/InStock',
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

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div
              className="max-w-4xl mx-auto text-center animate-fadeInUp"
              initial="initial"
              animate="animate"
            >
              <div
                className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 mb-6 animate-fadeInUp"
              >
                <Globe className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">
                  South Korea&apos;s Biology Olympiad
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeInUp"
              >
                KBO Coaching Online
                <span className="block text-yellow-400 mt-2">Korean Biology Olympiad</span>
              </h1>

              <p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeInUp"
              >
                Expert coaching to help you excel in the Korean Biology Olympiad and qualify for the
                International Biology Olympiad (IBO). Join South Korea&apos;s top biology students!
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
              >
                <button
                  onClick={() => handleWhatsAppClick('hero-cta')}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start KBO Preparation
                </button>
                <Link
                  href="#syllabus"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/20"
                >
                  <BookOpen className="w-5 h-5" />
                  View Syllabus
                </Link>
              </div>

              <div
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeInUp"
              >
                {[
                  { value: '200+', label: 'Korean Students' },
                  { value: '25+', label: 'KBO Finalists' },
                  { value: '10+', label: 'IBO Participants' },
                  { value: '4.9/5', label: 'Student Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pathway Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                KBO to IBO Pathway
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your journey from Korean Biology Olympiad to representing South Korea at the
                International Biology Olympiad
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {pathwayStages.map((stage, index) => (
                  <div
                    key={stage.stage}
                    className="relative animate-fadeInUp"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                        <stage.icon className="w-6 h-6 text-slate-900" />
                      </div>
                      <div className="text-sm font-semibold text-yellow-600 mb-2">
                        Stage {stage.stage}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                      <p className="text-gray-600 text-sm">{stage.description}</p>
                    </div>
                    {index < pathwayStages.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Syllabus Section */}
        <section id="syllabus" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                KBO Syllabus Coverage
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete preparation based on Campbell Biology aligned with Korean Biology Olympiad
                requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {syllabusUnits.map((unit, index) => (
                <div
                  key={unit.unit}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
                >
                  <div className="text-sm font-semibold text-yellow-600 mb-2">{unit.unit}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{unit.title}</h3>
                  <ul className="space-y-2">
                    {unit.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => handleWhatsAppClick('syllabus-cta')}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Get Complete Syllabus
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our KBO Coaching?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized features designed for Korean Biology Olympiad success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories from Korea
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from Korean students who achieved KBO success with our coaching
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-sm font-medium text-yellow-600">
                      {testimonial.achievement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                KBO Coaching Plans
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Flexible pricing for Korean students. All prices shown in KRW and USD.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-xl p-6 shadow-lg border-2 ${
                    plan.popular ? 'border-yellow-400' : 'border-gray-100'
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.priceKRW}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">({plan.priceUSD} USD)</div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleWhatsAppClick(`pricing-${plan.name.toLowerCase()}`)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about KBO coaching for Korean students
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeInUp"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ArrowRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Excel in KBO?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of Korean students who have achieved Biology Olympiad success with
              Cerebrum. Start your journey to IBO today!
            </p>
            <button
              onClick={() => handleWhatsAppClick('bottom-cta')}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Start Your KBO Journey
            </button>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Explore More Olympiad Resources
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <button
          onClick={() => handleWhatsAppClick('floating-button')}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 animate-fadeInUp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </main>
    </>
  )
}
