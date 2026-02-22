import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllLocalities, Locality } from '@/data/localities'
import { generateCityMetadata } from '@/lib/seo/localityMetadata'
import { MapPin, Users, Award, TrendingUp, ChevronRight, School, Train } from 'lucide-react'
import { TrackedWhatsAppButton } from '@/components/common/TrackedWhatsAppButton'

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

// Generate static paths for all cities
export async function generateStaticParams() {
  const localities = getAllLocalities()
  const cities = [...new Set(localities.map((loc) => loc.citySlug))]

  return cities.map((city) => ({
    city,
  }))
}

// Return 404 for any city not in generateStaticParams
export const dynamicParams = false

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const localities = getAllLocalities()
  const cityLocalities = localities.filter((loc) => loc.citySlug === resolvedParams.city)

  if (cityLocalities.length === 0) {
    return {
      title: 'City Not Found',
    }
  }

  const cityName = cityLocalities[0].city

  return generateCityMetadata(cityName, resolvedParams.city, cityLocalities)
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params
  const localities = getAllLocalities()
  const cityLocalities = localities.filter((loc) => loc.citySlug === resolvedParams.city)

  if (cityLocalities.length === 0) {
    notFound()
  }

  const cityName = cityLocalities[0].city
  const stateName = cityLocalities[0].state

  // Group localities by region
  const localitiesByRegion = cityLocalities.reduce(
    (acc, locality) => {
      const region = locality.region || 'Other'
      if (!acc[region]) {
        acc[region] = []
      }
      acc[region].push(locality)
      return acc
    },
    {} as Record<string, Locality[]>
  )

  const regions = Object.keys(localitiesByRegion).sort()

  // Calculate aggregate stats
  const totalStudents = cityLocalities.reduce((sum, loc) => sum + loc.socialProof.studentCount, 0)
  const avgTopScore = Math.round(
    cityLocalities.reduce((sum, loc) => sum + loc.socialProof.topScore, 0) / cityLocalities.length
  )

  // Schema markup for city-level SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
      { '@type': 'ListItem', position: 3, name: cityName, item: `https://cerebrumbiologyacademy.com/locations/${resolvedParams.city}` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `NEET Biology Coaching Locations in ${cityName}`,
    description: `Find expert NEET Biology coaching near you across ${cityLocalities.length} locations in ${cityName}`,
    numberOfItems: cityLocalities.length,
    itemListElement: cityLocalities
      .sort((a, b) => b.socialProof.studentCount - a.socialProof.studentCount)
      .slice(0, 20)
      .map((locality, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `NEET Biology Coaching in ${locality.displayName}`,
        url: `https://cerebrumbiologyacademy.com/locations/${locality.citySlug}/${locality.slug}`,
      })),
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - ${cityName}`,
    description: `Premier NEET Biology coaching across ${cityLocalities.length} locations in ${cityName}. AIIMS faculty, 98% success rate, small batches.`,
    url: `https://cerebrumbiologyacademy.com/locations/${resolvedParams.city}`,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'State',
        name: stateName,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: String(totalStudents),
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Hero Section */}
      <section className="bg-indigo-500 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-blue-100 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-white">
              Locations
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{cityName}</span>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 mr-2 text-blue-300" />
              <span className="text-blue-100">
                {cityName}, {stateName}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Biology Coaching in {cityName}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Find expert NEET Biology coaching near you. We serve {cityLocalities.length} locations
              across {cityName} with proven results and personalized attention.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MapPin className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{cityLocalities.length}</div>
                <div className="text-sm text-blue-200">Locations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 text-green-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{totalStudents.toLocaleString()}+</div>
                <div className="text-sm text-blue-200">Students Coached</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{avgTopScore}/360</div>
                <div className="text-sm text-blue-200">Average Top Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Localities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Coaching Locations in {cityName}
            </h2>
            <p className="text-gray-600">
              Choose the location nearest to you for convenient NEET Biology coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityLocalities
              .sort((a, b) => b.socialProof.studentCount - a.socialProof.studentCount)
              .slice(0, 6)
              .map((locality) => (
                <Link
                  key={locality.id}
                  href={`/locations/${locality.citySlug}/${locality.slug}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-gray-100 hover:border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {locality.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">{locality.region}</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      <span>{locality.socialProof.studentCount}+ students coached</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-green-600" />
                      <span>Top score: {locality.socialProof.topScore}/360</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Train className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{locality.transportLinks.metros.length} metro stations nearby</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {locality.content.valueProposition}
                  </div>

                  <div className="text-blue-600 font-semibold flex items-center">
                    View {locality.displayName} Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* All Locations by Region */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Locations in {cityName}</h2>
            <p className="text-gray-600">Browse coaching centers by area</p>
          </div>

          {regions.map((region) => {
            const regionLocalities = localitiesByRegion[region]

            return (
              <div key={region} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                  {region} ({regionLocalities.length} locations)
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {regionLocalities.map((locality) => (
                    <Link
                      key={locality.id}
                      href={`/locations/${locality.citySlug}/${locality.slug}`}
                      className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        {locality.displayName}
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </h4>

                      <div className="space-y-1 mb-3 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{locality.socialProof.studentCount}+ students</span>
                        </div>
                        <div className="flex items-center">
                          <School className="w-3 h-3 mr-1" />
                          <span>{locality.demographics.primarySchools.length} schools nearby</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        {locality.nearbyLandmarks.slice(0, 2).join(', ')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Choose Us in City */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why {cityName} Students Choose Cerebrum Biology Academy
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-sm text-gray-600">15+ years of NEET Biology teaching experience</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small Batches</h3>
              <p className="text-sm text-gray-600">Maximum 15-20 students for personal attention</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">85%+ students score 330+ in Biology section</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Convenient Locations</h3>
              <p className="text-sm text-gray-600">
                {cityLocalities.length} centers across {cityName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Find the nearest Cerebrum Biology Academy location in {cityName} and enroll today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Enroll Now
            </Link>
            <TrackedWhatsAppButton
              source={`city-page-${resolvedParams.city}`}
              message={`Hi, I want to know about NEET Biology coaching in ${cityName}`}
              campaign="location-page"
              buttonText="WhatsApp Us"
              variant="outline"
              size="xl"
              showIcon={false}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
            />
          </div>

          <p className="mt-6 text-sm text-blue-200">
            Contact: +91-88264-44334 | Available for calling and WhatsApp
          </p>
        </div>
      </section>
    </div>
  )
}
