import Link from 'next/link'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  Clock,
  BookOpen,
  GraduationCap,
  Video,
  MessageCircle,
  Building,
  ArrowRight,
  Target,
  Wifi,
  Navigation,
  FileText,
  Calculator,
  ClipboardList,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import type { CityHubData } from '@/data/city-seo/city-hub-data'

interface CityHubPageProps {
  data: CityHubData
}

const courses = [
  {
    name: 'Class 9-10 Foundation',
    description: 'Build strong biology foundation',
    features: ['NCERT Mastery', 'Concept Building', 'Basic Lab Skills'],
  },
  {
    name: 'Class 11 NEET Foundation',
    description: '60% of NEET syllabus covered',
    features: ['Complete NCERT', 'NEET Pattern', 'Weekly Tests'],
  },
  {
    name: 'Class 12 NEET + Boards',
    description: 'Dual preparation for boards and NEET',
    features: ['Board + NEET Focus', 'PYQ Analysis', 'Mock Tests'],
  },
  {
    name: 'NEET Dropper Batch',
    description: 'Intensive 1-year program',
    features: ['Complete Revision', 'Daily Practice', '100+ Mocks'],
  },
]

const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS-Trained Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS New Delhi Alumnus with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Only 15-20 students per batch for personalized attention',
  },
  {
    icon: Target,
    title: '98% Success Rate',
    description: 'Proven track record with thousands of NEET qualifiers',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Flexibility to attend online or offline as per convenience',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'Get doubts resolved anytime via WhatsApp',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Focused Material',
    description: 'Comprehensive study material aligned with NEET pattern',
  },
]

const freeResources = [
  {
    icon: FileText,
    title: 'Free Study Notes',
    description: 'Chapter-wise biology notes for NEET preparation',
    href: '/free-resources',
    cta: 'Get Free Notes',
  },
  {
    icon: ClipboardList,
    title: 'Free Mock Tests',
    description: 'Practice with NEET-pattern questions',
    href: '/neet-mock-test-free',
    cta: 'Start Free Test',
  },
  {
    icon: ExternalLink,
    title: 'Official NEET Resources',
    description: 'NTA official materials and previous papers',
    href: '/neet-official-resources',
    cta: 'Access Resources',
  },
]

const neetTools = [
  {
    icon: Calculator,
    title: 'NEET Rank Predictor',
    description: 'Predict your rank based on expected score',
    href: '/neet-rank-predictor',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: ClipboardList,
    title: 'OMR Sheet Checker',
    description: 'Practice filling OMR sheets accurately',
    href: '/neet-tools/omr-checker',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Calculator,
    title: 'NEET Calculators',
    description: 'Score, percentile & college prediction tools',
    href: '/calculator',
    color: 'bg-green-100 text-green-600',
  },
]

export function CityHubPage({ data }: CityHubPageProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/biology-classes-${data.slug}#organization`,
    name: `Cerebrum Biology Academy - ${data.cityName}`,
    description: data.metaDescription,
    url: `${baseUrl}/biology-classes-${data.slug}`,
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    priceRange: '₹₹',
    address: data.hasOfflineCenter
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.nearestCenter?.address,
          addressLocality: data.cityName,
          addressRegion: data.stateName,
          addressCountry: 'IN',
        }
      : undefined,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geoCoordinates.lat,
      longitude: data.geoCoordinates.lng,
    },
    areaServed: [data.cityName, ...data.localities.map((l) => l.name)],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.stats.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: data.stats.studentsFromCity.replace(/[^0-9]/g, ''),
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
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
        name: `Biology Classes in ${data.cityName}`,
        item: `${baseUrl}/biology-classes-${data.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                {data.hasOfflineCenter ? (
                  <>
                    <Building className="mr-2 h-4 w-4 text-green-400" />
                    Offline Center Available
                  </>
                ) : (
                  <>
                    <Wifi className="mr-2 h-4 w-4 text-yellow-400" />
                    Online Classes + Nearby Centers
                  </>
                )}
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{data.heroTitle}</h1>

              <p className="mb-8 text-xl text-blue-100 md:text-2xl">{data.heroSubtitle}</p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
                >
                  Book Free Demo Class
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: 88264-44334
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Users className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.studentsFromCity}</div>
                <div className="text-xs text-blue-200 sm:text-sm">
                  Students from {data.cityName}
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.successRate}</div>
                <div className="text-xs text-blue-200 sm:text-sm">Success Rate</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6">
                <Star className="mx-auto mb-2 h-6 w-6 text-yellow-400 sm:h-8 sm:w-8" />
                <div className="text-xl font-bold sm:text-2xl">{data.stats.rating}/5</div>
                <div className="text-xs text-blue-200 sm:text-sm">Student Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Center Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {data.hasOfflineCenter ? (
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                      <Building className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        {data.nearestCenter?.name}
                      </h2>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-green-600" />
                        {data.nearestCenter?.address}
                      </div>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <Clock className="h-5 w-5 text-green-600" />
                        Open: 8:00 AM - 8:00 PM (Mon-Sat)
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href="/demo"
                          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                          Book Demo at Center
                        </Link>
                        <a
                          href={`https://maps.google.com/?q=${data.geoCoordinates.lat},${data.geoCoordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-green-600 px-6 py-3 font-medium text-green-700 transition hover:bg-green-50"
                        >
                          <Navigation className="mr-2 inline h-4 w-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <Wifi className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        Live Online Classes for {data.cityName} Students
                      </h2>
                      <p className="mb-4 text-gray-600">
                        Join our interactive online classes from the comfort of your home. Same
                        AIIMS faculty, same curriculum, same results!
                      </p>
                      {data.nearestCenter && (
                        <div className="mb-4 rounded-lg bg-white p-4">
                          <p className="mb-1 text-sm font-medium text-gray-700">
                            Nearest Offline Center:
                          </p>
                          <p className="text-gray-600">
                            {data.nearestCenter.name} - {data.nearestCenter.distance}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <Link
                          href="/demo"
                          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                          Book Online Demo
                        </Link>
                        <Link
                          href="/online-biology-classes"
                          className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
                        >
                          Learn About Online Classes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why {data.cityName} Students Choose Cerebrum?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We are committed to helping you excel in NEET and board exams
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-6 shadow-md">
                  <item.icon className="mb-4 h-10 w-10 text-blue-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Biology Courses for {data.cityName} Students
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{course.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{course.description}</p>
                  <ul className="space-y-2">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                View All Courses & Fees
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Free Resources Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <Sparkles className="mr-2 h-4 w-4" />
                100% Free Resources
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Preparation Resources
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Start your preparation with our free study materials - no registration required
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {freeResources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group rounded-xl border-2 border-transparent bg-white p-6 shadow-md transition hover:border-green-600 hover:shadow-lg"
                >
                  <resource.icon className="mb-4 h-10 w-10 text-green-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{resource.title}</h3>
                  <p className="mb-4 text-gray-600">{resource.description}</p>
                  <span className="inline-flex items-center font-medium text-green-600 group-hover:text-green-700">
                    {resource.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEET Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Tools for {data.cityName} Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Use our free tools to track your preparation and predict your performance
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {neetTools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col items-center rounded-xl bg-gray-50 p-6 text-center transition hover:bg-gray-100 hover:shadow-md"
                >
                  <div className={`mb-4 rounded-full p-4 ${tool.color}`}>
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{tool.title}</h3>
                  <p className="mb-3 text-sm text-gray-600">{tool.description}</p>
                  <span className="mt-auto inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Try Now Free
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/neet-tools"
                className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-700"
              >
                View All NEET Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Localities */}
        {data.localities.length > 0 && (
          <section className="bg-blue-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Biology Classes in {data.cityName} Areas
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {data.localities.map((locality) => (
                  <Link
                    key={locality.name}
                    href={locality.url}
                    className="rounded-lg bg-white px-5 py-3 text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                  >
                    Biology Classes in {locality.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                Frequently Asked Questions - {data.cityName}
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

        {/* Related Cities */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              Biology Classes in Nearby Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.relatedCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.url}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  Biology Classes in {city.name}
                </Link>
              ))}
              <Link
                href="/online-biology-classes"
                className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
              >
                Online Biology Classes
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Your NEET Journey from {data.cityName}!
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Join {data.stats.studentsFromCity} students from {data.cityName}. Book a free demo
              class today!
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Free Demo - {data.cityName}
              </Link>
              <a
                href="tel:+918826444334"
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
