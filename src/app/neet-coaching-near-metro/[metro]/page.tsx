import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllMetroSlugs, getMetroBySlug } from '@/data/south-delhi-metros'
import { areaDetails } from '@/data/south-delhi-areas'
import { MapPin, Train, Clock, Phone, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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

  const title = `NEET Coaching Near ${metro.name} Metro | Cerebrum Biology Academy`
  const description = `Best NEET Biology coaching near ${metro.name} Metro station in South Delhi. ${metro.description} Just ${metro.walkingTime}. Expert faculty, small batches, flexible timings.`

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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}#localbusiness`,
    name: `Cerebrum Biology Academy - Near ${metro.name} Metro`,
    description: `NEET coaching center near ${metro.name} Metro station. ${metro.description}`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kalu Sarai, Near IIT Delhi',
      addressLocality: 'South Delhi',
      addressRegion: 'Delhi',
      postalCode: '110016',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5459',
      longitude: '77.1926',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
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
        name: `NEET Coaching Near ${metro.name} Metro`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${metroSlug}`,
      },
    ],
  }

  return (
    <>
      <div className="min-h-screen">
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

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                NEET Coaching Near <span className="text-yellow-400">{metro.name} Metro</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-4">{metro.description}</p>

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
    </>
  )
}
