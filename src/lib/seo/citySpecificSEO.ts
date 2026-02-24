import { globalSEOService } from './globalSEO'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface CityData {
  name: string
  state: string
  region: string
  coachingRank: 'tier1' | 'tier2' | 'tier3'
  keywords: string[]
  competitors: string[]
  studentVolume: number
}

export class CitySpecificSEOService {
  private coachingHubCities: CityData[] = [
    // Tier 1 Coaching Hubs
    {
      name: 'Kota',
      state: 'Rajasthan',
      region: 'North',
      coachingRank: 'tier1',
      keywords: [
        'kota coaching',
        'kota biology classes',
        'kota NEET preparation',
        'resonance alternative',
        'allen alternative',
      ],
      competitors: ['Allen', 'Resonance', 'Bansal Classes', 'Career Point', 'Vibrant Academy'],
      studentVolume: 250000,
    },
    {
      name: 'Delhi',
      state: 'Delhi',
      region: 'North',
      coachingRank: 'tier1',
      keywords: [
        'delhi coaching',
        'delhi biology tuition',
        'NCR NEET classes',
        'connaught place coaching',
      ],
      competitors: ['Aakash', 'Bansal Classes', 'FIITJEE', 'VMC', 'Unacademy'],
      studentVolume: 180000,
    },
    {
      name: 'Hyderabad',
      state: 'Telangana',
      region: 'South',
      coachingRank: 'tier1',
      keywords: [
        'hyderabad coaching',
        'telangana NEET preparation',
        'chaitanya alternative',
        'narayana alternative',
      ],
      competitors: ['Chaitanya', 'Narayana', 'Sri Gayatri', 'Aakash', 'FIITJEE'],
      studentVolume: 150000,
    },
    // Tier 2 Cities
    {
      name: 'Bangalore',
      state: 'Karnataka',
      region: 'South',
      coachingRank: 'tier2',
      keywords: ['bangalore coaching', 'bengaluru NEET classes', 'karnataka biology coaching'],
      competitors: ['Deeksha', 'BASE', 'PU Science', 'Aakash', "BYJU'S"],
      studentVolume: 120000,
    },
    {
      name: 'Mumbai',
      state: 'Maharashtra',
      region: 'West',
      coachingRank: 'tier2',
      keywords: ['mumbai coaching', 'mumbai biology classes', 'maharashtra NEET preparation'],
      competitors: ['PACE IIT & Medical', 'Vidyalankar', 'FIITJEE', 'Aakash'],
      studentVolume: 100000,
    },
    {
      name: 'Pune',
      state: 'Maharashtra',
      region: 'West',
      coachingRank: 'tier2',
      keywords: ['pune coaching', 'pune biology tuition', 'maharashtra CET coaching'],
      competitors: ['Ace Academy', 'PACE', 'Vidyalankar', 'FIITJEE'],
      studentVolume: 80000,
    },
    {
      name: 'Chennai',
      state: 'Tamil Nadu',
      region: 'South',
      coachingRank: 'tier2',
      keywords: ['chennai coaching', 'tamil nadu NEET preparation', 'madras biology classes'],
      competitors: ['Pace Junior Science College', 'T.I.M.E.', 'Aakash', 'FIITJEE'],
      studentVolume: 90000,
    },
    // Emerging Coaching Centers
    {
      name: 'Indore',
      state: 'Madhya Pradesh',
      region: 'Central',
      coachingRank: 'tier2',
      keywords: ['indore coaching', 'MP NEET preparation', 'indore biology classes'],
      competitors: ['Career Point', 'Bansal Classes', 'Aakash'],
      studentVolume: 60000,
    },
    {
      name: 'Lucknow',
      state: 'Uttar Pradesh',
      region: 'North',
      coachingRank: 'tier2',
      keywords: ['lucknow coaching', 'UP NEET preparation', 'lucknow biology tuition'],
      competitors: ['Motion Education', 'Aakash', 'Career Point'],
      studentVolume: 70000,
    },
    {
      name: 'Patna',
      state: 'Bihar',
      region: 'East',
      coachingRank: 'tier3',
      keywords: ['patna coaching', 'bihar NEET preparation', 'patna biology classes'],
      competitors: ['Super 30', 'Aakash', 'Career Point'],
      studentVolume: 50000,
    },
    {
      name: 'Bhubaneswar',
      state: 'Odisha',
      region: 'East',
      coachingRank: 'tier3',
      keywords: ['bhubaneswar coaching', 'odisha NEET preparation', 'kalinga coaching'],
      competitors: ['Kalinga Institute', 'Career Point', 'Aakash'],
      studentVolume: 40000,
    },
    {
      name: 'Jaipur',
      state: 'Rajasthan',
      region: 'North',
      coachingRank: 'tier2',
      keywords: ['jaipur coaching', 'rajasthan NEET preparation', 'pink city biology'],
      competitors: ['Allen', 'Career Point', 'Resonance'],
      studentVolume: 75000,
    },
  ]

  generateCityLandingPage(cityName: string) {
    const city = this.coachingHubCities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())
    if (!city) return null

    const seoData = globalSEOService.generateLocationPageSEO(city.name, city.state)

    return {
      ...seoData,
      title: `Best Biology Coaching in ${city.name} | Top NEET Classes ${city.name} 2027 | Cerebrum Academy`,
      description: `🏆 #1 Biology coaching in ${city.name}, ${city.state}. 98% NEET success rate, AIIMS faculty, online+offline classes. Better than ${city.competitors[0]}! Book free demo.`,
      keywords: [
        ...city.keywords,
        `best biology coaching ${city.name.toLowerCase()}`,
        `NEET coaching ${city.name.toLowerCase()}`,
        `biology classes ${city.name.toLowerCase()}`,
        `medical entrance ${city.name.toLowerCase()}`,
        `biology tuition ${city.name.toLowerCase()}`,
        `${city.name.toLowerCase()} coaching center`,
        `online biology coaching ${city.name.toLowerCase()}`,
        `NEET preparation ${city.name.toLowerCase()}`,
        ...city.competitors.map((comp) => `better than ${comp.toLowerCase()}`),
        ...city.competitors.map((comp) => `${comp.toLowerCase()} alternative`),
        `${city.state.toLowerCase()} NEET coaching`,
        `biology teacher ${city.name.toLowerCase()}`,
        `medical coaching ${city.name.toLowerCase()}`,
      ],
      cityData: city,
      customSchema: this.generateCitySpecificSchema(city),
    }
  }

  private generateCitySpecificSchema(city: CityData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: `Cerebrum Biology Academy - ${city.name}`,
      alternateName: [
        `Best Biology Coaching ${city.name}`,
        `NEET Classes ${city.name}`,
        `Biology Tuition ${city.name}`,
      ],
      description: `Top Biology coaching institute in ${city.name}, ${city.state}. Specialized NEET preparation with 98% success rate.`,
      url: `https://cerebrumbiologyacademy.com/locations/${city.name.toLowerCase()}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: 'India',
      },
      areaServed: [
        {
          '@type': 'City',
          name: city.name,
        },
        {
          '@type': 'State',
          name: city.state,
        },
      ],
      serviceType: [
        'Biology Coaching',
        'NEET Preparation',
        'Medical Entrance Coaching',
        'Online Biology Classes',
        'Biology Tuition',
      ],
      hasOfferingCatalog: {
        '@type': 'OfferingCatalog',
        name: 'Biology Courses',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'NEET Biology Coaching',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        ratingCount: '32',
        bestRating: '5',
      },
      priceRange: '₹₹',
      telephone: CONTACT_INFO.phone.display.hyphenated.primary,
      openingHours: 'Mo-Su 06:00-22:00',
      sameAs: [
        'https://cerebrumbiologyacademy.com',
        'https://www.facebook.com/cerebrumbiologyacademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.youtube.com/@cerebrumbiologyacademy',
        'https://www.youtube.com/@drshekharcsingh',
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Biology Coaching',
          },
          price: '75000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      ],
    }
  }

  generateCompetitorComparisonPages() {
    const comparisons: any[] = []

    this.coachingHubCities.forEach((city) => {
      city.competitors.forEach((competitor) => {
        const comparisonSEO = globalSEOService.generateComparisonPageSEO(competitor)
        comparisons.push({
          ...comparisonSEO,
          title: `Cerebrum vs ${competitor} in ${city.name} | Which is Better for NEET Biology 2027?`,
          description: `🔥 Honest comparison: Cerebrum Biology Academy vs ${competitor} in ${city.name}. Compare fees, success rate, faculty. 98% students choose Cerebrum!`,
          keywords: [
            ...comparisonSEO.keywords,
            `cerebrum vs ${competitor.toLowerCase()} ${city.name.toLowerCase()}`,
            `${competitor.toLowerCase()} vs cerebrum ${city.name.toLowerCase()}`,
            `better than ${competitor.toLowerCase()} ${city.name.toLowerCase()}`,
            `${competitor.toLowerCase()} alternative ${city.name.toLowerCase()}`,
            `${city.name.toLowerCase()} coaching comparison`,
            `best biology coaching ${city.name.toLowerCase()} comparison`,
          ],
          city: city.name,
          competitor,
          canonicalUrl: `https://cerebrumbiologyacademy.com/compare/${competitor.toLowerCase()}-vs-cerebrum-${city.name.toLowerCase()}`,
        })
      })
    })

    return comparisons
  }

  generateLocalBusinessSchema() {
    return this.coachingHubCities.map((city) => ({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `https://cerebrumbiologyacademy.com/locations/${city.name.toLowerCase()}#business`,
      name: `Cerebrum Biology Academy ${city.name}`,
      image: `https://cerebrumbiologyacademy.com/images/locations/${city.name.toLowerCase()}-branch.jpg`,
      telephone: CONTACT_INFO.phone.display.hyphenated.primary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `Cerebrum Biology Academy`,
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: this.getCityCoordinates(city.name).lat,
        longitude: this.getCityCoordinates(city.name).lng,
      },
      url: `https://cerebrumbiologyacademy.com/locations/${city.name.toLowerCase()}`,
      priceRange: '₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '22:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '38',
      },
    }))
  }

  private getCityCoordinates(cityName: string) {
    const coordinates: Record<string, { lat: number; lng: number }> = {
      Kota: { lat: 25.2138, lng: 75.8648 },
      Delhi: { lat: 28.7041, lng: 77.1025 },
      Hyderabad: { lat: 17.385, lng: 78.4867 },
      Bangalore: { lat: 12.9716, lng: 77.5946 },
      Mumbai: { lat: 19.076, lng: 72.8777 },
      Pune: { lat: 18.5204, lng: 73.8567 },
      Chennai: { lat: 13.0827, lng: 80.2707 },
      Indore: { lat: 22.7196, lng: 75.8577 },
      Lucknow: { lat: 26.8467, lng: 80.9462 },
      Patna: { lat: 25.5941, lng: 85.1376 },
      Bhubaneswar: { lat: 20.2961, lng: 85.8245 },
      Jaipur: { lat: 26.9124, lng: 75.7873 },
    }

    return coordinates[cityName] || { lat: 28.7041, lng: 77.1025 } // Default to Delhi
  }

  getAllCoachingHubCities() {
    return this.coachingHubCities
  }

  generateCitySpecificSitemap() {
    const cityPages: any[] = []

    this.coachingHubCities.forEach((city) => {
      // Main city page
      cityPages.push({
        url: `/locations/${city.name.toLowerCase()}`,
        priority:
          city.coachingRank === 'tier1' ? '0.9' : city.coachingRank === 'tier2' ? '0.8' : '0.7',
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      })

      // City-specific course pages
      cityPages.push({
        url: `/locations/${city.name.toLowerCase()}/neet-coaching`,
        priority: '0.8',
        changefreq: 'weekly',
      })

      // Competitor comparison pages
      city.competitors.forEach((competitor) => {
        cityPages.push({
          url: `/compare/${competitor.toLowerCase()}-vs-cerebrum-${city.name.toLowerCase()}`,
          priority: '0.7',
          changefreq: 'monthly',
        })
      })
    })

    return cityPages
  }
}

export const citySpecificSEOService = new CitySpecificSEOService()
