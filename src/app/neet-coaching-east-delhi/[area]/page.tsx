'use client'

import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Play,
  Target,
  Building2,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const areaDetails: Record<
  string,
  {
    name: string
    fullName: string
    description: string
    heroDescription: string
    nearbyMetro: string[]
    landmarks: string[]
    schools: string[]
    highlights: string[]
    type: string
    pincode: string
  }
> = {
  'laxmi-nagar': {
    name: 'Laxmi Nagar',
    fullName: 'Laxmi Nagar, East Delhi',
    description: 'Famous coaching hub with highest coaching density in East Delhi',
    heroDescription:
      'Laxmi Nagar is East Delhis most famous coaching destination, known for its high concentration of coaching institutes. While many opt for mass coaching here, serious NEET aspirants prefer quality over quantity at Cerebrum Academy.',
    nearbyMetro: ['Laxmi Nagar Metro', 'Nirman Vihar Metro', 'Preet Vihar Metro'],
    landmarks: ['Laxmi Nagar Market', 'V3S Mall', 'Nirman Vihar Complex'],
    schools: ['DAV Public School', 'Ryan International', 'DPS Laxmi Nagar'],
    highlights: ['Coaching Hub', 'Metro Connected', 'High Student Density', 'Commercial Center'],
    type: 'coaching-hub',
    pincode: '110092',
  },
  'preet-vihar': {
    name: 'Preet Vihar',
    fullName: 'Preet Vihar, East Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      'Preet Vihar is one of East Delhis most sought-after residential localities, home to DPS students and educated families. Students here seek quality NEET coaching with personalized attention.',
    nearbyMetro: ['Preet Vihar Metro', 'Karkardooma Metro'],
    landmarks: ['Preet Vihar Market', 'DPS Preet Vihar', 'Karkardooma Court'],
    schools: ['DPS Preet Vihar', 'Ryan International', 'Cambridge School'],
    highlights: ['DPS Students', 'Premium Area', 'Metro Access', 'Family Locality'],
    type: 'residential',
    pincode: '110092',
  },
  'mayur-vihar-phase-1': {
    name: 'Mayur Vihar Phase 1',
    fullName: 'Mayur Vihar Phase 1, East Delhi',
    description: 'Largest DDA colony with excellent metro connectivity',
    heroDescription:
      'Mayur Vihar Phase 1 is one of the largest DDA colonies in East Delhi with direct metro connectivity. Home to educated middle-class families seeking quality NEET preparation for their children.',
    nearbyMetro: ['Mayur Vihar Phase 1 Metro', 'Mayur Vihar Extension Metro'],
    landmarks: ['Mayur Vihar Extension', 'Patparganj Road', 'Phase 1 Market'],
    schools: ['DAV Public School', 'Apeejay School', 'Mount Carmel School'],
    highlights: ['DDA Colony', 'Metro Hub', 'Large Population', 'Growing Demand'],
    type: 'residential',
    pincode: '110091',
  },
  'mayur-vihar-phase-2': {
    name: 'Mayur Vihar Phase 2',
    fullName: 'Mayur Vihar Phase 2, East Delhi',
    description: 'Established residential area near Akshardham',
    heroDescription:
      'Mayur Vihar Phase 2 is an established residential locality near the famous Akshardham Temple. Families here value education and seek quality NEET coaching for their aspiring doctors.',
    nearbyMetro: ['Mayur Vihar Phase 2 Metro', 'Akshardham Metro'],
    landmarks: ['Akshardham Temple', 'Phase 2 Market', 'NH-24'],
    schools: ['Ryan International', 'DAV Public School', 'Bal Bharati'],
    highlights: ['Near Akshardham', 'Established Colony', 'Good Schools', 'Family Area'],
    type: 'residential',
    pincode: '110091',
  },
  'mayur-vihar-phase-3': {
    name: 'Mayur Vihar Phase 3',
    fullName: 'Mayur Vihar Phase 3, East Delhi',
    description: 'Growing residential area with new developments',
    heroDescription:
      'Mayur Vihar Phase 3 is a rapidly developing residential area with new housing complexes. Growing student population seeking affordable yet quality NEET coaching options.',
    nearbyMetro: ['New Ashok Nagar Metro', 'Noida Sector 15 Metro'],
    landmarks: ['Phase 3 Market', 'Noida Link Road', 'DND Flyway'],
    schools: ['Apeejay School', 'DAV Public School', 'Kendriya Vidyalaya'],
    highlights: ['Growing Area', 'Affordable Housing', 'Student Population', 'Noida Connection'],
    type: 'residential',
    pincode: '110096',
  },
  patparganj: {
    name: 'Patparganj',
    fullName: 'Patparganj, East Delhi',
    description: 'Industrial-residential area with IT hub',
    heroDescription:
      'Patparganj is a unique mix of industrial and residential areas, including the famous IP Extension. Home to corporate families and IT professionals seeking quality education for their children.',
    nearbyMetro: ['IP Extension Metro', 'Mayur Vihar Extension Metro'],
    landmarks: ['IP Extension', 'Patparganj Industrial Area', 'Mother Dairy'],
    schools: ['DPS IP Extension', 'Ryan International', 'Cambridge School'],
    highlights: ['IP Extension', 'IT Hub', 'Corporate Families', 'Mixed Development'],
    type: 'residential',
    pincode: '110092',
  },
  'ip-extension': {
    name: 'IP Extension',
    fullName: 'IP Extension, East Delhi',
    description: 'Upscale residential colony in East Delhi',
    heroDescription:
      'IP Extension (Indraprastha Extension) is one of East Delhis most upscale residential colonies. Home to professionals, businessmen, and families from top schools seeking premium NEET coaching.',
    nearbyMetro: ['IP Extension Metro', 'Mayur Vihar Phase 1 Metro'],
    landmarks: ['IP Estate', 'Jaypee Greens', 'IP Market'],
    schools: ['DPS IP Extension', 'Amity International', 'The Indian School'],
    highlights: ['Premium Colony', 'Educated Families', 'Good Schools', 'Professional Area'],
    type: 'posh',
    pincode: '110092',
  },
  karkardooma: {
    name: 'Karkardooma',
    fullName: 'Karkardooma, East Delhi',
    description: 'Legal hub with Karkardooma Court Complex',
    heroDescription:
      'Karkardooma is known for its large court complex and is home to many legal professionals and their families. Students here seek quality education with disciplined environment.',
    nearbyMetro: ['Karkardooma Metro', 'Anand Vihar Metro'],
    landmarks: ['Karkardooma Court Complex', 'Anand Vihar ISBT', 'Karkardooma Market'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School'],
    highlights: ['Court Area', 'Legal Professionals', 'Metro Connected', 'Growing Demand'],
    type: 'commercial',
    pincode: '110092',
  },
  shakarpur: {
    name: 'Shakarpur',
    fullName: 'Shakarpur, East Delhi',
    description: 'Dense residential area near Laxmi Nagar coaching hub',
    heroDescription:
      'Shakarpur is a densely populated residential area adjacent to the Laxmi Nagar coaching hub. Budget-conscious students here often seek quality alternatives to mass coaching centers.',
    nearbyMetro: ['Laxmi Nagar Metro', 'Nirman Vihar Metro'],
    landmarks: ['Shakarpur Khas', 'Laxmi Nagar Border', 'Old Kondli Road'],
    schools: ['Sarvodaya Vidyalaya', 'DAV Public School', 'Govt Schools'],
    highlights: ['Near Coaching Hub', 'Affordable Area', 'Student Housing', 'Dense Population'],
    type: 'residential',
    pincode: '110092',
  },
  'anand-vihar': {
    name: 'Anand Vihar',
    fullName: 'Anand Vihar, East Delhi',
    description: 'Major transport hub with ISBT terminal',
    heroDescription:
      'Anand Vihar is a major transport hub with the Inter-State Bus Terminal and Railway Station. Students from UP and neighboring states access coaching centers here.',
    nearbyMetro: ['Anand Vihar Metro', 'Anand Vihar ISBT Metro', 'Kaushambi Metro'],
    landmarks: ['Anand Vihar ISBT', 'Anand Vihar Railway Station', 'Kaushambi'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School'],
    highlights: ['ISBT Terminal', 'Railway Station', 'Metro Hub', 'Transport Center'],
    type: 'commercial',
    pincode: '110092',
  },
  'nirman-vihar': {
    name: 'Nirman Vihar',
    fullName: 'Nirman Vihar, East Delhi',
    description: 'Busy commercial and residential area',
    heroDescription:
      'Nirman Vihar is a vibrant commercial and residential area with excellent metro connectivity. Growing demand for quality NEET coaching from students in the area.',
    nearbyMetro: ['Nirman Vihar Metro', 'Laxmi Nagar Metro'],
    landmarks: ['Nirman Vihar Complex', 'V3S Mall', 'Krishna Nagar Border'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati'],
    highlights: ['Commercial Hub', 'Metro Access', 'Shopping Area', 'Good Connectivity'],
    type: 'commercial',
    pincode: '110092',
  },
  'pandav-nagar': {
    name: 'Pandav Nagar',
    fullName: 'Pandav Nagar, East Delhi',
    description: 'Affordable residential locality',
    heroDescription:
      'Pandav Nagar is an affordable residential area in East Delhi. Students here often look for quality NEET coaching that provides value for money with good results.',
    nearbyMetro: ['Mother Dairy Metro', 'IP Extension Metro'],
    landmarks: ['Mother Dairy Complex', 'Pandav Nagar Market', 'IP Extension Border'],
    schools: ['Sarvodaya Vidyalaya', 'Govt Schools', 'Private Schools'],
    highlights: ['Affordable Area', 'Near Mother Dairy', 'Budget Friendly', 'Student Housing'],
    type: 'residential',
    pincode: '110091',
  },
  'krishna-nagar': {
    name: 'Krishna Nagar',
    fullName: 'Krishna Nagar, East Delhi',
    description: 'Historic East Delhi locality with famous market',
    heroDescription:
      'Krishna Nagar is one of the oldest and most established localities in East Delhi, known for its vibrant market and strong business community. Families here prioritize quality education.',
    nearbyMetro: ['Krishna Nagar Metro', 'Jhilmil Metro'],
    landmarks: ['Krishna Nagar Market', 'Famous Sweets Shops', 'Lal Quarter'],
    schools: ['DAV Public School', 'Cambridge School', 'Ryan International'],
    highlights: ['Historic Area', 'Business Families', 'Famous Market', 'Established Locality'],
    type: 'residential',
    pincode: '110051',
  },
  'vivek-vihar': {
    name: 'Vivek Vihar',
    fullName: 'Vivek Vihar, East Delhi',
    description: 'Residential colony near Anand Vihar',
    heroDescription:
      'Vivek Vihar is a well-established residential colony near Anand Vihar with good schools and educated families seeking quality NEET preparation options.',
    nearbyMetro: ['Anand Vihar Metro', 'Karkardooma Metro'],
    landmarks: ['Vivek Vihar Market', 'GTB Hospital', 'Dilshad Garden Border'],
    schools: ['DAV Public School', 'Ryan International', 'Bloom Public School'],
    highlights: ['Residential Colony', 'Near GTB Hospital', 'Educated Families', 'Good Schools'],
    type: 'residential',
    pincode: '110095',
  },
  'dilshad-garden': {
    name: 'Dilshad Garden',
    fullName: 'Dilshad Garden, East Delhi',
    description: 'Large residential area with metro connectivity',
    heroDescription:
      'Dilshad Garden is a large residential area with metro connectivity and growing demand for quality coaching. Students from nearby areas also access coaching centers here.',
    nearbyMetro: ['Dilshad Garden Metro', 'Jhilmil Metro'],
    landmarks: ['Dilshad Garden Market', 'GTB Hospital', 'Jhilmil Industrial Area'],
    schools: ['Ryan International', 'DAV Public School', 'Kendriya Vidyalaya'],
    highlights: ['Metro Connected', 'Large Area', 'Growing Population', 'Affordable'],
    type: 'residential',
    pincode: '110095',
  },
}

const courseOptions = [
  {
    name: 'Class 11+12 Comprehensive',
    duration: '2 Years',
    fee: '₹1,20,000',
    features: ['Complete NEET Biology', 'NCERT + Advanced', 'Mock Tests', 'Doubt Sessions'],
  },
  {
    name: 'Class 12 Intensive',
    duration: '1 Year',
    fee: '₹75,000',
    features: ['Class 12 Biology', 'Revision + Practice', 'Test Series', 'PYQ Analysis'],
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    fee: '₹85,000',
    features: ['Complete Revision', 'Daily Tests', 'Personal Mentor', 'Doubt Priority'],
  },
]

export default function EastDelhiAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaDetails[areaSlug]

  if (!area) {
    notFound()
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as typeof globalThis & { gtag?: Function }).gtag) {
      ;(window as typeof globalThis & { gtag: Function }).gtag(
        'event',
        `demo_booking_${areaSlug}`,
        {
          event_category: 'conversion',
          event_label: `neet_coaching_east_delhi_${areaSlug}`,
          value: 1,
        }
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
            description: area.heroDescription,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}`,
            telephone: '+91-8826444334',
            areaServed: area.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <Link
              href="/neet-coaching-east-delhi"
              className="inline-flex items-center text-green-400 hover:text-green-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to East Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-green-400" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-green-400">NEET Coaching in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">{area.description}</p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-green-600 text-white hover:bg-green-500 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Train className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">Nearest Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {metro}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">Top Schools Nearby</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-orange-500" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Students from {area.name} Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better results than Laxmi Nagar coaching centers with personalized attention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Small Batches',
                desc: '15-20 students per batch for personal attention',
              },
              {
                icon: GraduationCap,
                title: 'AIIMS Faculty',
                desc: 'Doctors from AIIMS/MAMC as teachers',
              },
              { icon: Trophy, title: '98% Success', desc: 'Highest success rate in Delhi NCR' },
              {
                icon: Target,
                title: 'Result Oriented',
                desc: 'Focus on NEET marks, not attendance',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-gray-600">Choose the program that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseOptions.map((course, index) => (
              <div
                key={course.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-400 transition-colors animate-fadeInUp"
              >
                <h3 className="font-semibold text-xl text-navy-900 mb-2">{course.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="text-3xl font-bold text-green-600 mb-4">{course.fee}</div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo-booking">
                  <Button variant="primary" className="w-full">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Reach from {area.name}</h2>
            <p className="text-gray-300">Easy connectivity via Metro and Bus</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">By Metro</h3>
                  <p className="text-gray-300">
                    Take Blue Line from {area.nearbyMetro[0]} to AIIMS or Green Park. Our center is
                    just 5 minutes walk from Green Park Metro.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Travel Time</h3>
                  <p className="text-gray-300">
                    Approximately 25-35 minutes from {area.name} via Metro. Direct connectivity
                    makes daily commute convenient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Preparation?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join successful students from {area.name}. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
