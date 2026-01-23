'use client'

import Link from 'next/link'
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
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            NEET Biology Coaching
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 opacity-90">
              Across India
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto opacity-90">
            Find the perfect NEET Biology coaching program tailored for your city's unique
            requirements
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">{locationDatabase.length}</div>
              <div className="text-xs sm:text-sm opacity-80">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">
                {locationDatabase
                  .reduce((total, location) => total + location.neetAspirants, 0)
                  .toLocaleString()}
                +
              </div>
              <div className="text-xs sm:text-sm opacity-80">NEET Aspirants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">98%</div>
              <div className="text-xs sm:text-sm opacity-80">Success Rate</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/demo-booking" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto min-h-[44px]"
              >
                <GraduationCap className="mr-2 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Book Free Demo Class
              </Button>
            </Link>
            <Link href="/course-finder" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all w-full sm:w-auto min-h-[44px]"
              >
                <Target className="mr-2 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Find Your Perfect Course
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Cities by NEET Aspirants */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              Top NEET Coaching Destinations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Cities with the highest concentration of NEET aspirants
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-blue-600 flex-shrink-0" />
                      <div className="font-semibold text-blue-900 text-xs sm:text-sm">
                        {location.neetAspirants.toLocaleString()}+
                      </div>
                      <div className="text-blue-600 text-xs">Aspirants</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-green-600 flex-shrink-0" />
                      <div className="font-semibold text-green-900 text-xs sm:text-sm">
                        {location.medicalColleges}
                      </div>
                      <div className="text-green-600 text-xs">Med Colleges</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm text-gray-600">
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
                            <Trophy className="w-3 h-3 mr-1 flex-shrink-0" />
                            {college.length > 20 ? `${college.substring(0, 20)}...` : college}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t">
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-3">
                      <span className="text-gray-600">Avg. Coaching Fee:</span>
                      <span className="line-through text-red-500">
                        ₹{location.localContext.avgCoachingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-4">
                      <span className="font-semibold">Our Price:</span>
                      <span className="font-bold text-green-600">
                        ₹{(location.localContext.avgCoachingFee * 0.6).toLocaleString()}
                      </span>
                    </div>

                    <Link href={`/locations/${location.slug}`}>
                      <Button className="w-full group min-h-[44px]">
                        Explore {location.city} Program
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              All Available Locations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Choose your city and start your NEET Biology success journey
            </p>
          </div>

          {/* Tier 1 Cities */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center mb-4 sm:mb-6">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Tier 1 Cities
              </h3>
              <Badge className="ml-2 sm:ml-3 bg-purple-100 text-purple-800 text-xs sm:text-sm">
                Highest Competition
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center mb-4 sm:mb-6">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Tier 2 Cities
              </h3>
              <Badge className="ml-2 sm:ml-3 bg-blue-100 text-blue-800 text-xs sm:text-sm">
                Growing Markets
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
            <div className="flex items-center mb-4 sm:mb-6">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Tier 3 Cities
              </h3>
              <Badge className="ml-2 sm:ml-3 bg-green-100 text-green-800 text-xs sm:text-sm">
                Emerging Opportunities
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                      <ChevronRight className="w-4 h-4 text-green-600" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
            Don't See Your City Listed?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            We're expanding rapidly. Contact us to bring Cerebrum Biology Academy to your city or
            start with our online programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/demo-booking" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[44px]"
              >
                <MapPin className="mr-2 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Book Free Demo Class
              </Button>
            </Link>
            <Link href="/course-finder" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[44px]"
              >
                <Users className="mr-2 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Find My Perfect Course
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
            Or{' '}
            <Link href="/pricing" className="text-blue-600 hover:underline font-medium">
              view all pricing options
            </Link>{' '}
            •{' '}
            <Link href="/quick-enroll" className="text-blue-600 hover:underline font-medium">
              enroll in 2 minutes
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
