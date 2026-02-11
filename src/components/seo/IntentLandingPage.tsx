import Link from 'next/link'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { HowToSchema, DrShekharSinghSchema } from './StructuredData'
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Trophy,
  GraduationCap,
  BookOpen,
  Clock,
  Target,
  MessageCircle,
  Video,
  Building,
  Sparkles,
} from 'lucide-react'

export interface HowToStepData {
  name: string
  text: string
  url?: string
}

export interface IntentPageData {
  slug: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  heroHighlight?: string
  primaryCTA: string
  secondaryCTA?: string
  problemStatement: {
    title: string
    points: string[]
  }
  solution: {
    title: string
    description: string
    features: Array<{
      icon: 'target' | 'users' | 'clock' | 'book' | 'video' | 'message' | 'building' | 'star'
      title: string
      description: string
    }>
  }
  benefits: Array<{
    title: string
    description: string
  }>
  testimonial?: {
    quote: string
    name: string
    result: string
  }
  faqs: Array<{ question: string; answer: string }>
  relatedPages: Array<{ name: string; url: string }>
  stats: {
    primary: { value: string; label: string }
    secondary: { value: string; label: string }
    tertiary: { value: string; label: string }
  }
  howToSteps?: HowToStepData[]
  howToMeta?: {
    totalTime?: string
    supply?: string[]
    tool?: string[]
  }
}

const iconMap = {
  target: Target,
  users: Users,
  clock: Clock,
  book: BookOpen,
  video: Video,
  message: MessageCircle,
  building: Building,
  star: Star,
}

interface IntentLandingPageProps {
  data: IntentPageData
}

export function IntentLandingPage({ data }: IntentLandingPageProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const pageUrl = `${baseUrl}/${data.slug}`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/#organization`,
    name: 'Cerebrum Biology Academy',
    alternateName: ['Cerebrum Academy', 'Cerebrum NEET Coaching', 'Cerebrum Biology'],
    description: data.metaDescription,
    url: baseUrl,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/og-image.jpg`,
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      honorificPrefix: 'Dr.',
      jobTitle: 'Founder & Head Faculty',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'All India Institute of Medical Sciences (AIIMS)',
      },
      knowsAbout: ['NEET Biology', 'Medical Entrance Examination', 'Human Physiology', 'Genetics'],
    },
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://maps.app.goo.gl/cerebrum-biology-academy',
    ],
    knowsAbout: [
      'NEET-UG Preparation',
      'NEET Biology Coaching',
      'Medical Entrance Coaching',
      'Class 11 Biology',
      'Class 12 Biology',
      'CBSE Biology',
      'Botany for NEET',
      'Zoology for NEET',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: '98% Success Rate in NEET',
        description: '98% of students qualify NEET with coaching from Cerebrum Biology Academy',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Top Score 695/720',
        description: 'Highest score achieved by a Cerebrum student in NEET Biology section',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
      reviewCount: '32',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.primary,
      contactType: 'admissions',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.heroTitle,
        item: pageUrl,
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: data.metaTitle,
    description: data.metaDescription,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-intro', '.speakable-features', '.speakable-cta'],
    },
    mainEntity: { '@id': `${baseUrl}/#organization` },
  }

  const defaultHowToSteps = [
    {
      name: 'Book Free Demo',
      text: `Contact us via WhatsApp (${CONTACT_INFO.phone.primary}) or fill the form on our website to book a free demo class.`,
      url: `${pageUrl}#contact`,
    },
    {
      name: 'Attend Demo Class',
      text: 'Experience our teaching methodology and interact with faculty during the demo session.',
    },
    {
      name: 'Choose Your Batch',
      text: 'Select from Foundation (Class 11), Advanced (Class 12), Dropper, or Crash Course batches.',
    },
    {
      name: 'Complete Enrollment',
      text: 'Submit required documents and complete fee payment to confirm admission.',
    },
  ]

  const hasContentSpecificHowTo = data.howToSteps && data.howToSteps.length > 0
  const howToSteps = hasContentSpecificHowTo ? data.howToSteps! : defaultHowToSteps
  const howToName = hasContentSpecificHowTo
    ? data.heroTitle
    : 'How to Join NEET Coaching at Cerebrum Biology Academy'
  const howToDescription = hasContentSpecificHowTo
    ? data.metaDescription
    : 'Step-by-step guide to enroll in NEET biology coaching'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <HowToSchema
        name={howToName}
        description={howToDescription}
        steps={howToSteps}
        totalTime={data.howToMeta?.totalTime || 'PT30M'}
        supply={data.howToMeta?.supply}
        tool={data.howToMeta?.tool}
      />

      {/* Author Schema for E-E-A-T signals */}
      <DrShekharSinghSchema />

      {/* AI-Optimized Speakable Content for Voice Search & LLMs */}
      <div className="sr-only" aria-hidden="false">
        <p className="speakable-intro">
          Cerebrum Biology Academy is one of the best NEET coaching institutes in Delhi. With a 98%
          success rate and top score of 695 out of 720, we offer expert biology coaching for NEET-UG
          preparation. Our AIIMS-qualified faculty provides personalized attention in small batches
          of 25 students maximum.
        </p>
        <p className="speakable-features">
          Key features include: AIIMS-qualified expert faculty led by Dr. Shekhar C Singh, small batch
          sizes of maximum 25 students, comprehensive study material aligned with NCERT, regular
          mock tests and performance tracking, doubt clearing sessions, and flexible batch timings
          for school students.
        </p>
        <p className="speakable-cta">
          To join the best NEET biology coaching, call us at {CONTACT_INFO.phone.primary} or visit
          cerebrumbiologyacademy.com. Book your free demo class today and take the first step
          towards your medical career.
        </p>
      </div>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {data.heroHighlight && (
                <div className="mb-6 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {data.heroHighlight}
                </div>
              )}

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{data.heroTitle}</h1>

              <p className="mb-8 text-xl text-blue-100 md:text-2xl">{data.heroSubtitle}</p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
                >
                  {data.primaryCTA}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {data.secondaryCTA || `Call: ${getDisplayPhone()}`}
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.primary.value}</div>
                <div className="text-xs text-blue-200 sm:text-sm">{data.stats.primary.label}</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Users className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.secondary.value}</div>
                <div className="text-xs text-blue-200 sm:text-sm">{data.stats.secondary.label}</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <GraduationCap className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.tertiary.value}</div>
                <div className="text-xs text-blue-200 sm:text-sm">{data.stats.tertiary.label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-2 border-red-100 bg-red-50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {data.problemStatement.title}
                </h2>
                <ul className="space-y-3">
                  {data.problemStatement.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-200 text-xs text-red-700">
                        !
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Our Solution
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                {data.solution.title}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">{data.solution.description}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.solution.features.map((feature) => {
                const Icon = iconMap[feature.icon]
                return (
                  <div key={feature.title} className="rounded-xl bg-white p-6 shadow-md">
                    <Icon className="mb-4 h-10 w-10 text-blue-600" />
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                What You Get with Us
              </h2>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-2">
                {data.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 rounded-xl border border-gray-200 p-6"
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {data.testimonial && (
          <section className="bg-blue-900 py-16 text-white">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="mb-6 text-xl italic text-blue-100 md:text-2xl">
                  &ldquo;{data.testimonial.quote}&rdquo;
                </blockquote>
                <div className="font-semibold">{data.testimonial.name}</div>
                <div className="text-sm text-blue-300">{data.testimonial.result}</div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Related Pages</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.relatedPages.map((page) => (
                <Link
                  key={page.name}
                  href={page.url}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Join 1,50,000+ students who have transformed their NEET preparation with us. Book a
              free demo today!
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Free Demo Class
              </Link>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
