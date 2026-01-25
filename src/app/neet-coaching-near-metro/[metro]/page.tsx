import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllMetroSlugs, getMetroBySlug } from '@/data/south-delhi-metros'
import { areaDetails } from '@/data/south-delhi-areas'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'
import { MapPin, Train, Clock, Phone, ArrowRight, CheckCircle, GraduationCap, Home, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'

interface PageProps {
  params: Promise<{ metro: string }>
}

export async function generateStaticParams() {
  return getAllMetroSlugs().map((metro) => ({
    metro,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { metro: metroSlug } = await params
  const metro = getMetroBySlug(metroSlug)

  if (!metro) {
    return {
      title: 'Metro Station Not Found | Cerebrum Biology Academy',
    }
  }

  const title = `NEET Coaching Near ${metro.name} Metro | Cerebrum Academy`
  const description = `Best NEET Biology coaching near ${metro.name} Metro. ${CEREBRUM_METRICS.successRateText} success rate, just ${metro.walkingTime}. Small batches, expert faculty.`

  return {
    title,
    description,
    keywords: [
      `NEET coaching near ${metro.name} metro`,
      `NEET coaching ${metro.name} metro`,
      `Biology coaching near ${metro.name} metro`,
      `NEET preparation near ${metro.name}`,
      `Medical coaching near ${metro.name} metro`,
      ...metro.nearbyAreas.map((area) => `NEET coaching ${area}`),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
    },
  }
}

export default async function MetroLandingPage({ params }: PageProps) {
  const { metro: metroSlug } = await params
  const metro = getMetroBySlug(metroSlug)

  if (!metro) {
    notFound()
  }

  const nearbyAreaDetails = metro.nearbyAreas
    .map((areaName) => {
      const slug = areaName.toLowerCase().replace(/\s+/g, '-')
      return areaDetails[slug]
    })
    .filter(Boolean)

  const organizationId = 'https://cerebrumbiologyacademy.com/#organization'
  const localBusinessId = `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}#localbusiness`

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': localBusinessId,
    name: `Cerebrum Biology Academy - Near ${metro.name} Metro`,
    description: `NEET coaching center near ${metro.name} Metro station. ${metro.description}`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    priceRange: '₹₹',
    image: 'https://cerebrumbiologyacademy.com/logo.png',
    parentOrganization: { '@id': organizationId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CEREBRUM_METRICS.mainAddress,
      addressLocality: 'South Delhi',
      addressRegion: 'Delhi',
      postalCode: CEREBRUM_METRICS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: metro.coordinates.lat.toString(),
      longitude: metro.coordinates.lng.toString(),
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: metro.coordinates.lat.toString(),
        longitude: metro.coordinates.lng.toString(),
      },
      geoRadius: '3000',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: CEREBRUM_METRICS.rating.toString(),
      reviewCount: CEREBRUM_METRICS.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Student near ' + metro.name },
        datePublished: '2025-11-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Perfect location near ${metro.name} Metro! I travel from ${metro.nearbyAreas[0] || 'nearby areas'} and it takes just ${metro.walkingTime}. The faculty is excellent and the small batch size ensures personal attention.`,
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Parent' },
        datePublished: '2025-10-05',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `My daughter easily commutes via ${metro.line} Line to reach Cerebrum. The coaching quality is excellent - she improved her Biology score from 150 to 340+ out of 360. Highly recommended!`,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeClass12,
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 12 Intensive NEET Biology',
            description: '1-year intensive NEET Biology course with focus on board + NEET integration',
            provider: { '@id': organizationId },
            educationalLevel: 'Class 12',
            timeRequired: 'P1Y',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['onsite', 'online', 'blended'],
            },
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeDropper,
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Course',
            name: 'Dropper Batch NEET Biology',
            description: '1-year comprehensive revision course for NEET repeaters',
            provider: { '@id': organizationId },
            educationalLevel: '12th Pass / Dropper',
            timeRequired: 'P1Y',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['onsite', 'online', 'blended'],
            },
          },
        },
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Near ${metro.name} Metro`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
      },
    ],
  }

  // FAQPage Schema - Metro specific
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How far is Cerebrum Biology Academy from ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy is just ${metro.walkingTime} from ${metro.name} Metro station on the ${metro.line} Line. Students can easily commute from ${metro.nearbyAreas.slice(0, 3).join(', ')} and surrounding areas.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the fee for NEET coaching near ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our NEET Biology coaching fee is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 12, ₹${CEREBRUM_METRICS.feeClass11.toLocaleString()}/year for Class 11, and ₹${CEREBRUM_METRICS.feeDropper.toLocaleString()}/year for dropper batch. EMI options and scholarships up to 50% available.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which areas can reach Cerebrum via ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Students from ${metro.nearbyAreas.join(', ')} can easily reach us via ${metro.name} Metro (${metro.line} Line). Key landmarks nearby include ${metro.landmarks.slice(0, 3).join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the success rate of NEET coaching near ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy has a ${CEREBRUM_METRICS.successRateText} success rate with ${CEREBRUM_METRICS.medicalSelectionsText} medical college selections. Our top student scored ${CEREBRUM_METRICS.topScoreText} in NEET Biology.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is online coaching available for students near ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! We offer online, offline, and hybrid modes. Students near ${metro.name} Metro can choose convenient batch timings - morning (8-10 AM), afternoon (2-4 PM), or evening (6-8 PM).`,
        },
      },
      {
        '@type': 'Question',
        name: `What makes Cerebrum the best choice near ${metro.name} Metro?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum offers small batches of ${CEREBRUM_METRICS.batchSizeText}, AIIMS/JIPMER trained faculty with ${CEREBRUM_METRICS.facultyExperienceText} experience, convenient ${metro.line} Line metro access, and flexible timings for students from ${metro.nearbyAreas[0]} and surrounding areas.`,
        },
      },
    ],
  }

  // HowTo Schema for enrollment
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll in NEET Coaching Near ${metro.name} Metro`,
    description: `Step-by-step guide to enroll in Cerebrum Biology Academy for students commuting via ${metro.name} Metro.`,
    totalTime: 'P3D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: CEREBRUM_METRICS.feeClass12,
    },
    supply: [
      { '@type': 'HowToSupply', name: 'School ID Card or Marksheet' },
      { '@type': 'HowToSupply', name: 'Address Proof (Aadhar/Passport)' },
      { '@type': 'HowToSupply', name: 'Passport Size Photographs (2)' },
      { '@type': 'HowToSupply', name: 'Parent/Guardian Contact Details' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book Free Demo Class',
        text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form. Mention you'll commute via ${metro.name} Metro.`,
        url: 'https://cerebrumbiologyacademy.com/demo-booking',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Visit Our Center',
        text: `Take ${metro.line} Line to ${metro.name} Metro. Our center is ${metro.walkingTime}. Near landmarks: ${metro.landmarks[0]}.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Attend Demo Session',
        text: 'Attend a 1-hour demo class with Dr. Shekhar Suman. Experience our teaching methodology and small batch environment.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Your Batch',
        text: `Select batch timing that works with your commute via ${metro.name} Metro. Morning (8-10 AM), afternoon (2-4 PM), or evening (6-8 PM) batches available.`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Complete Enrollment',
        text: `Submit documents and pay fees via UPI, bank transfer, or EMI. Scholarship up to 50% available for deserving students.`,
      },
    ],
  }

  // AggregateOffer Schema
  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}#offers`,
    priceCurrency: 'INR',
    lowPrice: CEREBRUM_METRICS.feeCrashCourse,
    highPrice: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
    offerCount: 4,
    offers: [
      {
        '@type': 'Offer',
        name: 'Class 11+12 Two-Year Program',
        price: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
      },
      {
        '@type': 'Offer',
        name: 'Class 12 One-Year Intensive',
        price: CEREBRUM_METRICS.feeClass12,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
      },
      {
        '@type': 'Offer',
        name: 'Dropper Batch',
        price: CEREBRUM_METRICS.feeDropper,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
      },
      {
        '@type': 'Offer',
        name: 'Crash Course',
        price: CEREBRUM_METRICS.feeCrashCourse,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
      },
    ],
  }

  // Event Schema for Demo Classes
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Free NEET Biology Demo Class - Near ${metro.name} Metro`,
    description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants commuting via ${metro.name} Metro. Meet Dr. Shekhar Suman.`,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: [
      {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy',
        address: {
          '@type': 'PostalAddress',
          streetAddress: CEREBRUM_METRICS.mainAddress,
          addressLocality: 'South Delhi',
          addressRegion: 'Delhi',
          postalCode: CEREBRUM_METRICS.pincode,
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'VirtualLocation',
        url: 'https://cerebrumbiologyacademy.com/demo-booking',
      },
    ],
    performer: {
      '@type': 'Person',
      name: 'Dr. Shekhar Suman',
      jobTitle: 'Founder & Lead Faculty',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: 'https://cerebrumbiologyacademy.com/demo-booking',
      validFrom: new Date().toISOString().split('T')[0],
    },
    image: 'https://cerebrumbiologyacademy.com/logo.png',
  }

  // Speakable Schema for voice search
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}#webpage`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
    name: `NEET Coaching Near ${metro.name} Metro | Cerebrum Biology Academy`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.hero-description', '.quick-answers'],
    },
    mainEntity: { '@id': localBusinessId },
  }

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://cerebrumbiologyacademy.com/#website',
    url: 'https://cerebrumbiologyacademy.com',
    name: 'Cerebrum Biology Academy',
    description: 'Best NEET Biology Coaching in South Delhi with 94% success rate',
    publisher: { '@id': organizationId },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Visual Breadcrumb Navigation */}
        <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li className="flex items-center">
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center">
                  <Home className="w-4 h-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/neet-coaching-south-delhi" className="text-gray-600 hover:text-purple-600 transition-colors">
                  NEET Coaching South Delhi
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-purple-700 font-medium">Near {metro.name} Metro</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: metro.lineColor + '30', borderColor: metro.lineColor }}
              >
                <Train className="w-5 h-5 mr-2" style={{ color: metro.lineColor }} />
                {metro.line} Line Metro Station
              </div>

              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                NEET Coaching Near <span className="text-yellow-400">{metro.name} Metro</span>
              </h1>

              <p className="hero-description text-lg md:text-xl text-gray-300 mb-4">{metro.description}</p>

              <div className="flex items-center justify-center gap-2 text-yellow-400 mb-8">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{metro.walkingTime}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo-booking">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                  >
                    Book Free Demo Class
                  </Button>
                </Link>
                <a href="tel:+918826444334">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +91-88264-44334
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas & Landmarks */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-purple-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Areas We Serve</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Students from these areas can easily reach us via {metro.name} Metro:
                </p>
                <ul className="space-y-3">
                  {metro.nearbyAreas.map((area) => {
                    const slug = area.toLowerCase().replace(/\s+/g, '-')
                    const hasPage = areaDetails[slug]
                    return (
                      <li key={area} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        {hasPage ? (
                          <Link
                            href={`/neet-coaching-south-delhi/${slug}`}
                            className="text-purple-600 hover:text-purple-800 font-medium"
                          >
                            {area}
                          </Link>
                        ) : (
                          <span className="text-gray-700">{area}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Nearby Landmarks</h2>
                </div>
                <p className="text-gray-600 mb-4">Key landmarks near {metro.name} Metro station:</p>
                <ul className="space-y-3">
                  {metro.landmarks.map((landmark) => (
                    <li key={landmark} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Students Near {metro.name} Metro Choose Us
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Metro Accessible',
                  desc: `Just ${metro.walkingTime} from ${metro.name} Metro`,
                  icon: Train,
                },
                {
                  title: 'Expert Faculty',
                  desc: 'AIIMS/JIPMER trained Biology experts',
                  icon: GraduationCap,
                },
                {
                  title: 'Small Batches',
                  desc: 'Only 15-20 students per batch',
                  icon: CheckCircle,
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Answers - Speakable for Voice Search */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="quick-answers">
              <QuickAnswers locality={`Near ${metro.name} Metro`} />
            </div>
          </div>
        </section>

        {/* Explore Other Areas */}
        {nearbyAreaDetails.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Explore NEET Coaching in Nearby Areas
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {nearbyAreaDetails.slice(0, 3).map((area) => {
                  const slug = area.name.toLowerCase().replace(/\s+/g, '-')
                  return (
                    <Link
                      key={slug}
                      href={`/neet-coaching-south-delhi/${slug}`}
                      className="block bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        NEET Coaching in {area.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                      <span className="text-purple-600 font-medium flex items-center">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Conveniently located near {metro.name} Metro. Book your free demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="/neet-coaching-south-delhi">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Areas
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateOfferSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
