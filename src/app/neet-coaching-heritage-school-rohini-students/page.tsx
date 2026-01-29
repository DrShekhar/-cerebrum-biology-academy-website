import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Trophy,
  GraduationCap,
  MapPin,
  Clock,
  Building2,
  Quote,
  Navigation,
  MessageCircle,
  BookOpen,
  Target,
  BarChart3,
  Video,
  FileQuestion,
} from 'lucide-react'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'

const pageData = getSchoolPageData('neet-coaching-heritage-school-rohini-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching heritage school rohini',
    'heritage school rohini neet',
    'biology coaching heritage school students',
    'neet classes near heritage school rohini',
    'after school neet coaching rohini',
    'best coaching for heritage school neet',
    'heritage school sector 23 neet preparation',
    'neet coaching rohini sector 23',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-heritage-school-rohini-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-heritage-school-rohini-students',
  },
}

const freeNeetTools = [
  {
    icon: FileQuestion,
    title: 'Practice Tests',
    description: 'Chapter-wise NEET practice tests with detailed solutions',
  },
  {
    icon: BookOpen,
    title: 'Study Materials',
    description: 'Comprehensive notes aligned with NCERT and NEET syllabus',
  },
  {
    icon: Video,
    title: 'Video Lectures',
    description: 'Recorded sessions for revision and doubt clearing',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed performance reports',
  },
  {
    icon: Target,
    title: 'Previous Year Papers',
    description: 'Solved NEET papers from last 10 years with explanations',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Doubt Support',
    description: '24/7 doubt resolution through dedicated WhatsApp groups',
  },
]

export default function NEETCoachingHeritageSchoolRohiniPage() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const whatsappNumber = '918826444334'
  const whatsappMessage = encodeURIComponent(
    'Hi! I am a Heritage School Rohini student interested in NEET coaching. Please share details about batches and fees.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/${pageData.slug}#organization`,
    name: 'Cerebrum Biology Academy',
    description: pageData.metaDescription,
    url: `${baseUrl}/${pageData.slug}`,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DC Chauk, Sector 9',
      addressLocality: 'Rohini',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Schools', item: `${baseUrl}/schools` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NEET Coaching for Heritage School Rohini',
        item: `${baseUrl}/${pageData.slug}`,
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.metaTitle,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero-title', '#hero-subtitle', '#school-highlights', '#faq-section'],
    },
    url: `${baseUrl}/${pageData.slug}`,
  }

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

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
                <GraduationCap className="mr-2 h-4 w-4" />
                Exclusive for {pageData.schoolName} Students
              </div>

              <h1 id="hero-title" className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                {pageData.heroTitle}
              </h1>

              <p id="hero-subtitle" className="mb-8 text-xl text-blue-100 md:text-2xl">
                {pageData.heroSubtitle}
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
                >
                  Book Free Demo Class
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Location Badge */}
            <div className="mx-auto mt-12 max-w-md">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <Navigation className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">
                    Very close to {pageData.schoolName} - Just {pageData.distance}
                  </span>
                </div>
                <div className="mt-1 text-sm text-blue-200">{pageData.nearestCenter}</div>
              </div>
            </div>
          </div>
        </section>

        {/* School Highlights */}
        <section id="school-highlights" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                Why {pageData.schoolName} Students Choose Us
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {pageData.schoolHighlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="font-medium text-gray-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Students Choose Us */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Perfect for {pageData.schoolName} Schedule
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We understand the demands of {pageData.schoolName}. Our coaching is designed to
                complement your school academics with 1:17 teacher-student ratio and experiential learning.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pageData.whyStudentsChoose.map((reason, index) => (
                <div key={reason.title} className="rounded-xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Free Resources
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Free NEET Preparation Tools
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                All Heritage School students get complimentary access to our comprehensive NEET preparation toolkit.
              </p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {freeNeetTools.map((tool) => (
                  <div
                    key={tool.title}
                    className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <tool.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{tool.title}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Access via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        {pageData.successStories.length > 0 && (
          <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                  <Trophy className="mr-2 h-4 w-4" />
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {pageData.schoolName} Alumni at Top Medical Colleges
                </h2>
              </div>

              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {pageData.successStories.map((story) => (
                    <div
                      key={story.name}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="mb-2 h-8 w-8 text-blue-200" />
                      <p className="mb-4 italic text-gray-600">&ldquo;{story.quote}&rdquo;</p>
                      <div className="border-t border-gray-100 pt-4">
                        <div className="font-semibold text-gray-900">{story.name}</div>
                        <div className="text-sm text-gray-500">{story.batch}</div>
                        <div className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                          {story.result}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Center Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Nearest Center for {pageData.schoolName} Students
              </h2>
              <div className="rounded-xl bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{pageData.centerDetails.name}</div>
                    <div className="text-sm text-gray-500">
                      Very close to your school - Just {pageData.distance}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">{pageData.centerDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">Open: {pageData.centerDetails.timing}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a
                      href={`tel:${pageData.centerDetails.phone.replace(/-/g, '')}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {pageData.centerDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Free Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pageData.centerDetails.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-blue-900 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
              <div>
                <Users className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">1:17</div>
                <div className="text-blue-200">Teacher-Student Ratio</div>
              </div>
              <div>
                <Users className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">1,50,000+</div>
                <div className="text-blue-200">Students Trained</div>
              </div>
              <div>
                <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">65+</div>
                <div className="text-blue-200">AIIMS Selections</div>
              </div>
              <div>
                <GraduationCap className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq-section" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                FAQs for {pageData.schoolName} Students
              </h2>
              <div className="space-y-4">
                {pageData.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Schools */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Coaching for Other Rohini Schools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {pageData.relatedSchools.map((school) => (
                <Link
                  key={school.name}
                  href={school.url}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  {school.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Join Other {pageData.schoolName} Students?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Book a free demo class and experience our 1:17 teacher-student ratio and experiential learning approach.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Free Demo Class
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </a>
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

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:shadow-xl"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>
    </>
  )
}
