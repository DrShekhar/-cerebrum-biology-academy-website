'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TrackedWhatsAppButton } from '@/components/common/TrackedWhatsAppButton'

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
  dwarka: {
    name: 'Dwarka',
    fullName: 'Dwarka (All Sectors), West Delhi',
    description: 'Largest sub-city in Asia with 29 sectors',
    heroDescription:
      'Dwarka is one of the largest sub-cities in Asia with 29 planned sectors. Home to DPS Dwarka students and educated families near IGI Airport seeking quality NEET coaching with proven results.',
    nearbyMetro: [
      'Dwarka Sector 21 Metro',
      'Dwarka Metro',
      'Dwarka Mor Metro',
      'Uttam Nagar Metro',
    ],
    landmarks: ['IGI Airport', 'Dwarka Sector 21', 'Pacific Mall', 'Vegas Mall'],
    schools: ['DPS Dwarka', 'Mount Carmel', 'Ryan International', 'Modern School Dwarka'],
    highlights: ['All 29 Sectors', 'Airport Area', 'Metro Connected', 'Planned City'],
    type: 'residential',
    pincode: '110075',
  },
  janakpuri: {
    name: 'Janakpuri',
    fullName: 'Janakpuri, West Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      'Janakpuri is one of West Delhis most prestigious residential areas, home to DPS Janakpuri and affluent families. High demand for quality NEET coaching with personalized attention.',
    nearbyMetro: ['Janakpuri West Metro', 'Janakpuri East Metro', 'Dwarka Mor Metro'],
    landmarks: ['Janakpuri District Centre', 'DPS Janakpuri', 'Unity One Mall', 'C Block Market'],
    schools: ['DPS Janakpuri', 'DAV Public School', 'Ryan International', 'Mount Carmel'],
    highlights: ['DPS Janakpuri', 'District Centre', 'Premium Area', 'Business Families'],
    type: 'posh',
    pincode: '110058',
  },
  'rajouri-garden': {
    name: 'Rajouri Garden',
    fullName: 'Rajouri Garden, West Delhi',
    description: 'Commercial and coaching hub in West Delhi',
    heroDescription:
      'Rajouri Garden is a major commercial hub known for its markets and coaching centers. Students from surrounding areas access coaching institutes here, creating a competitive environment.',
    nearbyMetro: ['Rajouri Garden Metro', 'Kirti Nagar Metro', 'Tagore Garden Metro'],
    landmarks: ['Rajouri Garden Market', 'Main Market', 'City Centre Mall', 'TDI Mall'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Modern School'],
    highlights: ['Commercial Hub', 'Coaching Area', 'Shopping Destination', 'Metro Connected'],
    type: 'commercial',
    pincode: '110027',
  },
  vikaspuri: {
    name: 'Vikaspuri',
    fullName: 'Vikaspuri, West Delhi',
    description: 'Large residential colony with good schools',
    heroDescription:
      'Vikaspuri is a large residential area in West Delhi with multiple blocks and good schools. Affordable housing attracts middle-class families seeking quality NEET preparation.',
    nearbyMetro: ['Uttam Nagar East Metro', 'Janakpuri West Metro'],
    landmarks: ['Vikaspuri Main Road', 'Vikaspuri Market', 'Outer Ring Road'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Bal Bharati'],
    highlights: ['Large Area', 'Affordable', 'Metro Access', 'Growing Population'],
    type: 'residential',
    pincode: '110018',
  },
  'uttam-nagar': {
    name: 'Uttam Nagar',
    fullName: 'Uttam Nagar, West Delhi',
    description: 'Densely populated area with high student demand',
    heroDescription:
      'Uttam Nagar is one of the most densely populated areas in Delhi with high demand for affordable coaching. Students here seek quality NEET preparation with value for money.',
    nearbyMetro: ['Uttam Nagar West Metro', 'Uttam Nagar East Metro', 'Nawada Metro'],
    landmarks: ['Uttam Nagar Market', 'West Enclave', 'Milap Nagar', 'Indira Park'],
    schools: ['DAV Public School', 'Government Schools', 'Private Schools', 'Ryan International'],
    highlights: ['High Density', 'Budget Friendly', 'Metro Hub', 'Student Area'],
    type: 'residential',
    pincode: '110059',
  },
  'tilak-nagar': {
    name: 'Tilak Nagar',
    fullName: 'Tilak Nagar, West Delhi',
    description: 'Established residential colony with metro access',
    heroDescription:
      'Tilak Nagar is an established residential colony in West Delhi with excellent metro connectivity. Families here value education and seek quality NEET coaching institutes.',
    nearbyMetro: ['Tilak Nagar Metro', 'Subhash Nagar Metro', 'Janakpuri East Metro'],
    landmarks: ['Tilak Nagar Market', 'Metro Station', 'Govt. Hospital', 'Community Centre'],
    schools: ['DAV Public School', 'Bal Bharati', 'Ryan International', 'Cambridge School'],
    highlights: ['Old Colony', 'Metro Connected', 'Commercial Mix', 'Established Area'],
    type: 'residential',
    pincode: '110018',
  },
  'subhash-nagar': {
    name: 'Subhash Nagar',
    fullName: 'Subhash Nagar, West Delhi',
    description: 'Residential area with metro station',
    heroDescription:
      'Subhash Nagar is a residential area with its own metro station, providing excellent connectivity. Students can easily access coaching centers across Delhi.',
    nearbyMetro: ['Subhash Nagar Metro', 'Tilak Nagar Metro', 'Rajouri Garden Metro'],
    landmarks: ['Subhash Nagar Metro Station', 'Main Market', 'Community Centre'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati', 'Cambridge School'],
    highlights: ['Metro Station', 'Residential', 'Good Schools', 'Central Location'],
    type: 'residential',
    pincode: '110027',
  },
  'paschim-vihar': {
    name: 'Paschim Vihar',
    fullName: 'Paschim Vihar, West Delhi',
    description: 'Large residential colony with multiple blocks',
    heroDescription:
      'Paschim Vihar is a large residential colony with multiple blocks (A1, A2, B1, B2, etc.). Home to educated families seeking quality NEET coaching for their children.',
    nearbyMetro: ['Paschim Vihar West Metro', 'Paschim Vihar East Metro', 'Madipur Metro'],
    landmarks: ['Paschim Vihar Market', 'A Block Market', 'Metro Walk', 'District Park'],
    schools: ['DAV Public School', 'Ryan International', 'Mount Carmel', 'Cambridge School'],
    highlights: ['Multiple Blocks', 'Residential', 'Metro Access', 'Good Schools'],
    type: 'residential',
    pincode: '110063',
  },
  'punjabi-bagh': {
    name: 'Punjabi Bagh',
    fullName: 'Punjabi Bagh, West Delhi',
    description: 'Premium residential area with business families',
    heroDescription:
      'Punjabi Bagh is one of West Delhis most affluent areas, known for its wide roads and business families. Students here demand premium NEET coaching with personalized attention.',
    nearbyMetro: ['Punjabi Bagh Metro', 'Shivaji Park Metro', 'ESI Hospital Metro'],
    landmarks: ['Club Road', 'Punjabi Bagh Club', 'Ring Road', 'West Punjabi Bagh'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School', 'Cambridge School'],
    highlights: ['Premium Area', 'Business Families', 'Club Road', 'Posh Locality'],
    type: 'posh',
    pincode: '110026',
  },
  'hari-nagar': {
    name: 'Hari Nagar',
    fullName: 'Hari Nagar, West Delhi',
    description: 'Residential area near Janakpuri',
    heroDescription:
      'Hari Nagar is a residential area adjacent to Janakpuri, offering more affordable housing options. Students from here access coaching centers in Janakpuri and Rajouri Garden.',
    nearbyMetro: ['Janakpuri West Metro', 'Tilak Nagar Metro'],
    landmarks: ['Hari Nagar Clock Tower', 'Main Road', 'Community Centre', 'Gurudwara'],
    schools: ['DAV Public School', 'Government Schools', 'Ryan International', 'Private Schools'],
    highlights: ['Near Janakpuri', 'Affordable', 'Metro Connected', 'Residential'],
    type: 'residential',
    pincode: '110064',
  },
  'kirti-nagar': {
    name: 'Kirti Nagar',
    fullName: 'Kirti Nagar, West Delhi',
    description: 'Known for famous furniture market',
    heroDescription:
      'Kirti Nagar is famous for Asias largest furniture market but also has significant residential areas. Business families here seek quality education for their children.',
    nearbyMetro: ['Kirti Nagar Metro', 'Moti Nagar Metro', 'Rajouri Garden Metro'],
    landmarks: ['Kirti Nagar Furniture Market', 'Metro Station', 'Industrial Area'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Private Schools'],
    highlights: ['Furniture Hub', 'Commercial Area', 'Metro Access', 'Business Families'],
    type: 'commercial',
    pincode: '110015',
  },
  'moti-nagar': {
    name: 'Moti Nagar',
    fullName: 'Moti Nagar, West Delhi',
    description: 'Residential area with commercial activity',
    heroDescription:
      'Moti Nagar is a mixed residential and commercial area with its own metro station. Students benefit from excellent connectivity to coaching centers across Delhi.',
    nearbyMetro: ['Moti Nagar Metro', 'Kirti Nagar Metro', 'Ramesh Nagar Metro'],
    landmarks: ['Moti Nagar Metro Station', 'Main Road', 'Industrial Area', 'Market'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati', 'Private Schools'],
    highlights: ['Metro Station', 'Mixed Use', 'Good Connectivity', 'Affordable'],
    type: 'residential',
    pincode: '110015',
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

export default function WestDelhiAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaDetails[areaSlug]

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Area not found</h1>
          <Link href="/neet-coaching-west-delhi">
            <Button>Back to West Delhi</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as typeof globalThis & { gtag?: Function }).gtag) {
      ;(window as typeof globalThis & { gtag: Function }).gtag(
        'event',
        `demo_booking_${areaSlug}`,
        {
          event_category: 'conversion',
          event_label: `neet_coaching_west_delhi_${areaSlug}`,
          value: 1,
        }
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Comprehensive Schema Markup for AI/LLM Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://cerebrumbiologyacademy.com/#organization',
            name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
            alternateName: ['Cerebrum Academy', 'Cerebrum NEET Coaching'],
            description: area.heroDescription,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-west-delhi/${areaSlug}`,
            telephone: '+91-8826444334',
            email: 'info@cerebrumbiologyacademy.com',
            areaServed: {
              '@type': 'City',
              name: 'Delhi',
              containsPlace: [
                { '@type': 'Place', name: area.name },
                { '@type': 'Place', name: 'West Delhi' },
              ],
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              bestRating: '5',
              ratingCount: '847',
              reviewCount: '523',
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: '98% Success Rate in NEET',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'AIIMS-Qualified Faculty',
              },
            ],
          }),
        }}
      />
      {/* FAQPage Schema for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is the best NEET coaching in ${area.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Cerebrum Biology Academy is rated the best NEET coaching in ${area.name}, West Delhi with 98% success rate, AIIMS-qualified faculty, and proven track record. We offer personalized attention with small batch sizes of 15-20 students.`,
                },
              },
              {
                '@type': 'Question',
                name: `How much does NEET coaching cost in ${area.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `NEET coaching fees at Cerebrum Biology Academy for ${area.name} students range from ₹75,000 for 1-year programs to ₹1,20,000 for 2-year comprehensive courses. EMI options available.`,
                },
              },
              {
                '@type': 'Question',
                name: `Is there online NEET coaching for ${area.name} students?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes, Cerebrum Biology Academy offers both online and offline NEET coaching for ${area.name} students. Online program includes live classes, recorded lectures, doubt sessions, and weekly tests.`,
                },
              },
            ],
          }),
        }}
      />
      {/* CourseList Schema for AI Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `NEET Biology Courses for ${area.name} Students`,
            itemListElement: courseOptions.map((course, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Course',
                name: course.name,
                description: `${course.name} - ${course.duration} NEET Biology program for ${area.name} students`,
                provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                offers: {
                  '@type': 'Offer',
                  price: course.fee.replace(/[₹,]/g, ''),
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              },
            })),
          }),
        }}
      />
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'West Delhi', item: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi' },
              { '@type': 'ListItem', position: 3, name: area.name, item: `https://cerebrumbiologyacademy.com/neet-coaching-west-delhi/${areaSlug}` },
            ],
          }),
        }}
      />
      {/* WebPage with Speakable for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Best NEET Coaching in ${area.name} | Cerebrum Biology Academy`,
            description: area.heroDescription,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', '.hero-description'],
            },
            mainEntity: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/neet-coaching-west-delhi"
              className="inline-flex items-center text-orange-300 hover:text-orange-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to West Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-orange-300" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-orange-300">NEET Coaching in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">{area.description}</p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-orange-500 text-white hover:bg-orange-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>

              <TrackedWhatsAppButton
                source={`west-delhi-${areaSlug}-hero`}
                message={`Hi! I'm from ${area.name}, West Delhi. I want to join NEET Biology coaching. What batches are available?`}
                buttonText="WhatsApp Now"
                variant="primary"
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white font-bold"
              />
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
          </motion.div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Train className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">Nearest Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                    {metro}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-semibold text-lg">Top Schools Nearby</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-rose-500" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Students from {area.name} Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better results with personalized attention and AIIMS faculty
            </p>
          </motion.div>

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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-center"
          >
            <p className="text-white/90 text-lg mb-2">Ready to start your NEET preparation?</p>
            <p className="text-white text-xl md:text-2xl font-bold mb-4">
              Talk to our counselor for {area.name} students
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedWhatsAppButton
                source={`west-delhi-${areaSlug}-why-cerebrum`}
                message={`Hi! I'm a student from ${area.name}. I want to know more about your NEET coaching programs. Please share details.`}
                buttonText="Chat on WhatsApp"
                variant="secondary"
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 font-bold"
              />
              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  Book Demo Class
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-white/70 text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Average response time: 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-gray-600">Choose the program that fits your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseOptions.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-xl text-navy-900 mb-2">{course.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-4">{course.fee}</div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo-booking">
                  <Button variant="primary" className="w-full">
                    Enquire Now
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Reach from {area.name}</h2>
            <p className="text-gray-300">Easy connectivity via Blue Line Metro</p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">By Metro</h3>
                  <p className="text-gray-300">
                    Take Blue Line from {area.nearbyMetro[0]} towards Vaishali/Noida. Change at
                    Rajiv Chowk or Mandi House for Yellow Line to Green Park/AIIMS. Our center is
                    just 5 minutes walk from Green Park Metro.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Travel Time</h3>
                  <p className="text-gray-300">
                    Approximately 35-50 minutes from {area.name} via Metro. Blue Line connectivity
                    makes commute convenient for West Delhi students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Preparation?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Join successful students from {area.name}. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <TrackedWhatsAppButton
                source={`west-delhi-${areaSlug}-footer-cta`}
                message={`Hi! I'm from ${area.name}, West Delhi. I want to enroll for NEET coaching. Please share batch details and fees.`}
                buttonText="WhatsApp Counselor"
                variant="primary"
                size="xl"
                className="bg-green-500 hover:bg-green-400 text-white font-bold"
              />
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Average response time: 2 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
