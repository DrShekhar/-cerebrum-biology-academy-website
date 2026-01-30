'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

// All city pages with their metadata
export const cityPages = {
  // Tier-1 Cities
  mumbai: {
    name: 'Mumbai',
    href: '/neet-coaching-mumbai',
    region: 'Maharashtra',
    students: '1,50,000+',
  },
  bangalore: {
    name: 'Bangalore',
    href: '/neet-coaching-bangalore',
    region: 'Karnataka',
    students: '3,000+',
  },
  hyderabad: {
    name: 'Hyderabad',
    href: '/neet-coaching-hyderabad',
    region: 'Telangana',
    students: '2,400+',
  },
  chennai: {
    name: 'Chennai',
    href: '/neet-coaching-chennai',
    region: 'Tamil Nadu',
    students: '2,300+',
  },
  pune: {
    name: 'Pune',
    href: '/neet-coaching-pune',
    region: 'Maharashtra',
    students: '2,800+',
  },
  // Delhi NCR
  delhiNCR: {
    name: 'Delhi NCR',
    href: '/best-neet-coaching-delhi-ncr',
    region: 'Delhi NCR',
    students: '5,000+',
  },
  southDelhi: {
    name: 'South Delhi',
    href: '/neet-coaching-south-delhi',
    region: 'Delhi',
    students: '1,200+',
  },
  eastDelhi: {
    name: 'East Delhi',
    href: '/neet-coaching-east-delhi',
    region: 'Delhi',
    students: '900+',
  },
  northDelhi: {
    name: 'North Delhi',
    href: '/neet-coaching-north-delhi',
    region: 'Delhi',
    students: '800+',
  },
  westDelhi: {
    name: 'West Delhi',
    href: '/neet-coaching-west-delhi',
    region: 'Delhi',
    students: '750+',
  },
  // NCR Cities
  noida: {
    name: 'Noida',
    href: '/neet-coaching-noida',
    region: 'Uttar Pradesh',
    students: '1,100+',
  },
  gurgaon: {
    name: 'Gurgaon',
    href: '/neet-coaching-gurgaon',
    region: 'Haryana',
    students: '1,000+',
  },
  faridabad: {
    name: 'Faridabad',
    href: '/neet-coaching-faridabad',
    region: 'Haryana',
    students: '600+',
  },
  ghaziabad: {
    name: 'Ghaziabad',
    href: '/neet-coaching-ghaziabad',
    region: 'Uttar Pradesh',
    students: '700+',
  },
  greaterNoida: {
    name: 'Greater Noida',
    href: '/neet-coaching-greater-noida-west',
    region: 'Uttar Pradesh',
    students: '450+',
  },
  // Coaching Hubs
  kaluSarai: {
    name: 'Kalu Sarai',
    href: '/neet-coaching-kalu-sarai',
    region: 'Delhi',
    students: '400+',
  },
  rajinderNagar: {
    name: 'Rajinder Nagar',
    href: '/neet-coaching-rajinder-nagar',
    region: 'Delhi',
    students: '500+',
  },
  mukherjeeNagar: {
    name: 'Mukherjee Nagar',
    href: '/neet-coaching-mukherjee-nagar',
    region: 'Delhi',
    students: '350+',
  },
  // Major Coaching Hub Cities
  kota: {
    name: 'Kota',
    href: '/neet-coaching-kota',
    region: 'Rajasthan',
    students: '2,500+',
  },
  jaipur: {
    name: 'Jaipur',
    href: '/neet-coaching-jaipur',
    region: 'Rajasthan',
    students: '3,500+',
  },
  // Eastern India
  kolkata: {
    name: 'Kolkata',
    href: '/neet-coaching-kolkata',
    region: 'West Bengal',
    students: '4,000+',
  },
  patna: {
    name: 'Patna',
    href: '/neet-coaching-patna',
    region: 'Bihar',
    students: '3,000+',
  },
  // Western India
  ahmedabad: {
    name: 'Ahmedabad',
    href: '/neet-coaching-ahmedabad',
    region: 'Gujarat',
    students: '3,500+',
  },
  // Northern India
  lucknow: {
    name: 'Lucknow',
    href: '/neet-coaching-lucknow',
    region: 'Uttar Pradesh',
    students: '4,500+',
  },
  kanpur: {
    name: 'Kanpur',
    href: '/neet-coaching-kanpur',
    region: 'Uttar Pradesh',
    students: '3,200+',
  },
  prayagraj: {
    name: 'Prayagraj',
    href: '/neet-coaching-prayagraj',
    region: 'Uttar Pradesh',
    students: '2,800+',
  },
  varanasi: {
    name: 'Varanasi',
    href: '/neet-coaching-varanasi',
    region: 'Uttar Pradesh',
    students: '3,500+',
  },
}

type CityKey = keyof typeof cityPages

interface RelatedCityLinksProps {
  currentCity: CityKey
  variant?: 'default' | 'compact' | 'grid'
  title?: string
  showRegion?: boolean
}

// Define related cities for each city
const relatedCitiesMap: Record<CityKey, CityKey[]> = {
  mumbai: ['bangalore', 'pune', 'hyderabad', 'chennai', 'ahmedabad'],
  bangalore: ['chennai', 'hyderabad', 'mumbai', 'pune', 'kolkata'],
  hyderabad: ['bangalore', 'chennai', 'mumbai', 'pune', 'kolkata'],
  chennai: ['bangalore', 'hyderabad', 'mumbai', 'pune', 'kolkata'],
  pune: ['mumbai', 'bangalore', 'hyderabad', 'chennai', 'ahmedabad'],
  delhiNCR: ['southDelhi', 'noida', 'gurgaon', 'kota', 'lucknow'],
  southDelhi: ['eastDelhi', 'westDelhi', 'northDelhi', 'noida', 'kaluSarai'],
  eastDelhi: ['northDelhi', 'westDelhi', 'southDelhi', 'noida', 'ghaziabad'],
  northDelhi: ['westDelhi', 'eastDelhi', 'southDelhi', 'mukherjeeNagar', 'rajinderNagar'],
  westDelhi: ['northDelhi', 'southDelhi', 'eastDelhi', 'gurgaon', 'delhiNCR'],
  noida: ['greaterNoida', 'ghaziabad', 'eastDelhi', 'lucknow', 'delhiNCR'],
  gurgaon: ['faridabad', 'westDelhi', 'southDelhi', 'noida', 'jaipur'],
  faridabad: ['gurgaon', 'noida', 'southDelhi', 'greaterNoida', 'delhiNCR'],
  ghaziabad: ['noida', 'eastDelhi', 'greaterNoida', 'lucknow', 'delhiNCR'],
  greaterNoida: ['noida', 'ghaziabad', 'faridabad', 'lucknow', 'delhiNCR'],
  kaluSarai: ['rajinderNagar', 'southDelhi', 'delhiNCR', 'kota', 'jaipur'],
  rajinderNagar: ['kaluSarai', 'mukherjeeNagar', 'northDelhi', 'westDelhi', 'delhiNCR'],
  mukherjeeNagar: ['rajinderNagar', 'northDelhi', 'kaluSarai', 'delhiNCR', 'lucknow'],
  // Coaching Hub Cities
  kota: ['jaipur', 'delhiNCR', 'patna', 'lucknow', 'ahmedabad'],
  jaipur: ['kota', 'delhiNCR', 'ahmedabad', 'lucknow', 'mumbai'],
  // Eastern India
  kolkata: ['patna', 'bangalore', 'chennai', 'hyderabad', 'mumbai'],
  patna: ['kolkata', 'lucknow', 'kota', 'delhiNCR', 'bangalore'],
  // Western India
  ahmedabad: ['mumbai', 'pune', 'jaipur', 'kota', 'bangalore'],
  // Northern India
  lucknow: ['kanpur', 'varanasi', 'prayagraj', 'patna', 'kota'],
  kanpur: ['lucknow', 'prayagraj', 'varanasi', 'patna', 'noida'],
  prayagraj: ['varanasi', 'lucknow', 'kanpur', 'patna', 'kota'],
  varanasi: ['prayagraj', 'lucknow', 'patna', 'kanpur', 'kolkata'],
}

export function RelatedCityLinks({
  currentCity,
  variant = 'default',
  title = 'NEET Coaching in Other Cities',
  showRegion = true,
}: RelatedCityLinksProps) {
  const relatedCities = relatedCitiesMap[currentCity] || []

  if (relatedCities.length === 0) return null

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Also Available In
        </h3>
        <div className="flex flex-wrap gap-2">
          {relatedCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <Link
                key={cityKey}
                href={city.href}
                className="inline-flex items-center bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm"
              >
                {city.name}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our NEET coaching programs in other major cities across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedCities.map((cityKey, index) => {
              const city = cityPages[cityKey]
              return (
                <motion.div
                  key={cityKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={city.href}>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-bold text-gray-900 mb-1">{city.name}</h3>
                      {showRegion && <p className="text-sm text-gray-500 mb-2">{city.region}</p>}
                      <p className="text-blue-600 font-medium text-sm">{city.students} Students</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serving NEET aspirants across India with the same quality education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCities.map((cityKey, index) => {
            const city = cityPages[cityKey]
            return (
              <motion.div
                key={cityKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={city.href}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-between group">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          NEET Coaching in {city.name}
                        </h3>
                        {showRegion && <p className="text-sm text-gray-500">{city.region}</p>}
                        <p className="text-blue-600 font-medium text-sm mt-1">
                          {city.students} Students
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Quick links component for footer or sidebar
export function CityQuickLinks() {
  const tier1Cities: CityKey[] = [
    'mumbai',
    'bangalore',
    'hyderabad',
    'chennai',
    'pune',
    'kolkata',
    'ahmedabad',
  ]
  const delhiNCRCities: CityKey[] = [
    'delhiNCR',
    'southDelhi',
    'noida',
    'gurgaon',
    'faridabad',
    'ghaziabad',
  ]
  const coachingHubCities: CityKey[] = ['kota', 'jaipur', 'patna', 'lucknow', 'kanpur', 'prayagraj', 'varanasi']

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Major Cities</h4>
        <ul className="space-y-2">
          {tier1Cities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Delhi NCR</h4>
        <ul className="space-y-2">
          {delhiNCRCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Coaching Hubs</h4>
        <ul className="space-y-2">
          {coachingHubCities.map((cityKey) => {
            const city = cityPages[cityKey]
            return (
              <li key={cityKey}>
                <Link
                  href={city.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  NEET Coaching in {city.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
