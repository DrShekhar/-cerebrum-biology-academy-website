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
} from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

export interface SchoolPageData {
  slug: string
  schoolName: string
  locality: string
  nearestCenter: string
  distance: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  schoolHighlights: string[]
  whyStudentsChoose: Array<{
    title: string
    description: string
  }>
  successStories: Array<{
    name: string
    batch: string
    result: string
    quote: string
  }>
  faqs: Array<{ question: string; answer: string }>
  relatedSchools: Array<{ name: string; url: string }>
  centerDetails: {
    name: string
    address: string
    timing: string
    phone: string
  }
}

interface SchoolLandingPageProps {
  data: SchoolPageData
}

export function SchoolLandingPage({ data }: SchoolLandingPageProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/${data.slug}#organization`,
    name: 'Cerebrum Biology Academy',
    description: data.metaDescription,
    url: `${baseUrl}/${data.slug}`,
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
      streetAddress: data.centerDetails.address.split(',')[0],
      addressLocality: data.centerDetails.name.includes('Rohini')
        ? 'Rohini'
        : data.centerDetails.name.includes('Gurugram')
          ? 'Gurugram'
          : 'South Delhi',
      addressRegion: data.centerDetails.name.includes('Gurugram') ? 'Haryana' : 'Delhi',
      addressCountry: 'IN',
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
      { '@type': 'ListItem', position: 2, name: 'Schools', item: `${baseUrl}/schools` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching for ${data.schoolName}`,
        item: `${baseUrl}/${data.slug}`,
      },
    ],
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

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-yellow-500/20 px-6 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
                <GraduationCap className="mr-2 h-4 w-4" />
                Exclusive for {data.schoolName} Students
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
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: {getDisplayPhone()}
                </a>
              </div>
            </div>

            {/* Location Badge */}
            <div className="mx-auto mt-12 max-w-md">
              <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <Navigation className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">
                    Just {data.distance} from {data.schoolName}
                  </span>
                </div>
                <div className="mt-1 text-sm text-blue-200">{data.nearestCenter}</div>
              </div>
            </div>
          </div>
        </section>

        {/* School Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                Why {data.schoolName} Students Choose Us
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.schoolHighlights.map((highlight) => (
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
                Perfect for {data.schoolName} Schedule
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                We understand the demands of {data.schoolName}. Our coaching is designed to complement your school
                academics.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {data.whyStudentsChoose.map((reason, index) => (
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

        {/* Success Stories */}
        {data.successStories.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                  <Trophy className="mr-2 h-4 w-4" />
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {data.schoolName} Alumni at Top Medical Colleges
                </h2>
              </div>

              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {data.successStories.map((story) => (
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
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Nearest Center for {data.schoolName} Students
              </h2>
              <div className="rounded-xl bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{data.centerDetails.name}</div>
                    <div className="text-sm text-gray-500">Just {data.distance} from your school</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">{data.centerDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-700">Open: {data.centerDetails.timing}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a
                      href={`tel:${data.centerDetails.phone.replace(/-/g, '')}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {data.centerDetails.phone}
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
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.centerDetails.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-blue-900 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                FAQs for {data.schoolName} Students
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

        {/* Related Schools */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              NEET Coaching for Other Schools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.relatedSchools.map((school) => (
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
              Ready to Join Other {data.schoolName} Students?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Book a free demo class and see why students from {data.schoolName} choose Cerebrum for their NEET
              preparation.
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
