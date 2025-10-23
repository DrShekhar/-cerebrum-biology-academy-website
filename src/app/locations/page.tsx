import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  GraduationCap,
  TrendingUp,
  Star,
  ChevronRight,
  Target,
  Trophy,
  Building2,
} from 'lucide-react'
import {
  locationDatabase,
  getLocationsByTier,
  getTopLocationsByAspirants,
} from '@/data/locationData'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Locations | Cerebrum Biology Academy',
  description:
    'Find the best NEET Biology coaching for your city. We serve 12+ major Indian cities with personalized coaching and proven results.',
  keywords: [
    'NEET Biology coaching India',
    'Medical coaching locations',
    'Biology classes Indian cities',
    'NEET preparation centers',
    'Medical entrance coaching',
    'City-wise NEET coaching',
  ].join(', '),
  openGraph: {
    title: 'NEET Biology Coaching Locations | Cerebrum Biology Academy',
    description:
      'Find the best NEET Biology coaching for your city. We serve 12+ major Indian cities with personalized coaching and proven results.',
    url: 'https://cerebrumbiologyacademy.com/locations',
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    images: [
      {
        url: '/images/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Biology Coaching Locations across India',
      },
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations',
  },
}

export default function LocationsPage() {
  const tier1Cities = getLocationsByTier('tier1')
  const tier2Cities = getLocationsByTier('tier2')
  const tier3Cities = getLocationsByTier('tier3')
  const topCitiesByAspirants = getTopLocationsByAspirants(6)

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'tier2':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'tier3':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'very-high':
        return 'text-red-600'
      case 'high':
        return 'text-orange-600'
      case 'moderate':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Cerebrum Biology Academy',
            description: 'Premier NEET Biology coaching across major Indian cities',
            url: 'https://cerebrumbiologyacademy.com/locations',
            areaServed: locationDatabase.map((location) => ({
              '@type': 'City',
              name: location.city,
              containedInPlace: {
                '@type': 'State',
                name: location.state,
              },
            })),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'NEET Biology Coaching Services',
              itemListElement: locationDatabase.map((location, index) => ({
                '@type': 'Offer',
                position: index + 1,
                itemOffered: {
                  '@type': 'Course',
                  name: `NEET Biology Coaching - ${location.city}`,
                  description: location.seoData.description,
                  areaServed: location.city,
                },
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            NEET Biology Coaching
            <span className="block text-3xl md:text-5xl mt-2 opacity-90">Across India</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Find the perfect NEET Biology coaching program tailored for your city's unique
            requirements
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold">{locationDatabase.length}</div>
              <div className="text-sm opacity-80">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {locationDatabase
                  .reduce((total, location) => total + location.neetAspirants, 0)
                  .toLocaleString()}
                +
              </div>
              <div className="text-sm opacity-80">NEET Aspirants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cities by NEET Aspirants */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Top NEET Coaching Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Cities with the highest concentration of NEET aspirants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCitiesByAspirants.map((location, index) => (
              <Card
                key={location.slug}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden"
              >
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getTierBadgeColor(location.tier)}>
                      #{index + 1} • {location.tier.toUpperCase()}
                    </Badge>
                    <Badge
                      className={`border ${getCompetitionColor(location.competitionLevel)} bg-white`}
                    >
                      <Target className="w-3 h-3 mr-1" />
                      {location.competitionLevel.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    {location.city}
                    <span className="text-sm font-normal text-gray-500 ml-2">{location.state}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <div className="font-semibold text-blue-900">
                        {location.neetAspirants.toLocaleString()}+
                      </div>
                      <div className="text-blue-600">Aspirants</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <div className="font-semibold text-green-900">{location.medicalColleges}</div>
                      <div className="text-green-600">Med Colleges</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>Top Medical Colleges:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {location.localContext.topMedicalColleges
                        .slice(0, 2)
                        .map((college, collegeIndex) => (
                          <Badge
                            key={collegeIndex}
                            variant="outline"
                            className="text-xs bg-gold-50 text-gold-700 border-gold-200"
                          >
                            <Trophy className="w-3 h-3 mr-1" />
                            {college.length > 20 ? `${college.substring(0, 20)}...` : college}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600">Avg. Coaching Fee:</span>
                      <span className="line-through text-red-500">
                        ₹{location.localContext.avgCoachingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="font-semibold">Our Price:</span>
                      <span className="font-bold text-green-600">
                        ₹{(location.localContext.avgCoachingFee * 0.6).toLocaleString()}
                      </span>
                    </div>

                    <Link href={`/locations/${location.slug}`}>
                      <Button className="w-full group">
                        Explore {location.city} Program
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Cities by Tiers */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              All Available Locations
            </h2>
            <p className="text-xl text-gray-600">
              Choose your city and start your NEET Biology success journey
            </p>
          </div>

          {/* Tier 1 Cities */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 mr-2 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Tier 1 Cities</h3>
              <Badge className="ml-3 bg-purple-100 text-purple-800">Highest Competition</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tier1Cities.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">{location.city}</h4>
                        <p className="text-sm text-gray-600">{location.state}</p>
                        <p className="text-xs text-purple-600 mt-1">
                          {location.neetAspirants.toLocaleString()}+ aspirants
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-500" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Tier 2 Cities */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Tier 2 Cities</h3>
              <Badge className="ml-3 bg-blue-100 text-blue-800">Growing Markets</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier2Cities.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{location.city}</h4>
                        <p className="text-xs text-gray-600">{location.state}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {location.neetAspirants.toLocaleString()}+ aspirants
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Tier 3 Cities */}
          <div>
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 mr-2 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Tier 3 Cities</h3>
              <Badge className="ml-3 bg-green-100 text-green-800">Emerging Opportunities</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier3Cities.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{location.city}</h4>
                        <p className="text-xs text-gray-600">{location.state}</p>
                        <p className="text-xs text-green-600 mt-1">
                          {location.neetAspirants.toLocaleString()}+ aspirants
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-green-500" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Don't See Your City Listed?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're expanding rapidly. Contact us to bring Cerebrum Biology Academy to your city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <MapPin className="mr-2 w-5 h-5" />
              Request Your City
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Users className="mr-2 w-5 h-5" />
              Start Online Learning
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
