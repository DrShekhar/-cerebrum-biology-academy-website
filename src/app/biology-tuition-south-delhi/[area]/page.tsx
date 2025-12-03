'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  MapPin,
  GraduationCap,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Microscope,
  Train,
  BookOpen,
  Play,
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
    pincode: string
  }
> = {
  'hauz-khas': {
    name: 'Hauz Khas',
    fullName: 'Hauz Khas, South Delhi',
    description: 'Premier coaching hub near IIT Delhi campus',
    heroDescription:
      "Hauz Khas is South Delhi's premier education hub. Students from nearby areas seek quality biology tuition here for board exams and NEET foundation.",
    nearbyMetro: ['Hauz Khas Metro', 'Green Park Metro', 'IIT Delhi Metro'],
    landmarks: ['Hauz Khas Village', 'IIT Delhi', 'Deer Park'],
    schools: ['DPS RK Puram', 'Sardar Patel Vidyalaya', 'Mount Carmel School'],
    highlights: ['Near IIT Delhi', 'Coaching Hub', 'Metro Connected', 'Cultural Center'],
    pincode: '110016',
  },
  'kalu-sarai': {
    name: 'Kalu Sarai',
    fullName: 'Kalu Sarai, Near IIT Delhi',
    description: 'The coaching capital of Delhi near IIT Gate',
    heroDescription:
      "Kalu Sarai is Delhi's coaching capital. Serious students from across Delhi NCR come here for quality biology tuition and competitive exam preparation.",
    nearbyMetro: ['IIT Delhi Metro', 'Hauz Khas Metro'],
    landmarks: ['IIT Delhi Main Gate', 'SDA Market', 'JNU'],
    schools: ['DPS RK Puram', 'Kendriya Vidyalaya JNU'],
    highlights: ['Coaching Capital', 'Near IIT Gate', 'Study Environment', 'Affordable'],
    pincode: '110016',
  },
  'greater-kailash': {
    name: 'Greater Kailash',
    fullName: 'Greater Kailash (GK-I & GK-II), South Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      "Greater Kailash (GK) is one of South Delhi's most prestigious localities. Students from DPS GK and other top schools seek quality biology tuition here.",
    nearbyMetro: ['Greater Kailash Metro', 'Nehru Place Metro', 'Kailash Colony Metro'],
    landmarks: ['M Block Market', 'N Block Market', 'GK-II M Block'],
    schools: ['DPS Greater Kailash', 'Springdales GK', 'The Indian School'],
    highlights: ['Premium Locality', 'DPS Students', 'High Quality', 'Affluent Area'],
    pincode: '110048',
  },
  'defence-colony': {
    name: 'Defence Colony',
    fullName: 'Defence Colony, South Delhi',
    description: 'Prestigious colony with educated families',
    heroDescription:
      'Defence Colony is home to educated families seeking quality education. Biology tuition here focuses on both board excellence and NEET preparation.',
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Defence Colony Market', 'Lajpat Nagar Central Market'],
    schools: ['Modern School Barakhamba', 'Delhi Public School'],
    highlights: ['Prestigious Colony', 'Educated Families', 'Metro Access', 'Central Location'],
    pincode: '110024',
  },
  'vasant-vihar': {
    name: 'Vasant Vihar',
    fullName: 'Vasant Vihar, South Delhi',
    description: 'Ultra-premium locality with top schools',
    heroDescription:
      'Vasant Vihar is home to students from elite schools like DPS Vasant Vihar, Modern School, and Vasant Valley. Premium biology tuition for all boards.',
    nearbyMetro: ['Vasant Vihar Metro'],
    landmarks: ['Priya Complex', 'DPS Vasant Vihar', 'American Embassy School'],
    schools: ['DPS Vasant Vihar', 'Modern School', 'Vasant Valley School'],
    highlights: ['Ultra Premium', 'Top Schools', 'Elite Students', 'Embassy Area'],
    pincode: '110057',
  },
  'rk-puram': {
    name: 'RK Puram',
    fullName: 'RK Puram (All Sectors), South Delhi',
    description: 'Govt officers colony with DPS RKP',
    heroDescription:
      "RK Puram is home to DPS RK Puram - one of Delhi's top schools. Students from all sectors (1-13) seek quality biology tuition for boards and NEET.",
    nearbyMetro: ['RK Puram Metro', 'Munirka Metro', 'IIT Delhi Metro'],
    landmarks: ['DPS RK Puram', 'Sector Markets', 'Bhikaji Cama Place'],
    schools: ['DPS RK Puram', 'Army Public School', 'Kendriya Vidyalaya'],
    highlights: ['DPS RKP Students', 'All Sectors', 'Govt Colony', 'Metro Access'],
    pincode: '110022',
  },
  'sarojini-nagar': {
    name: 'Sarojini Nagar',
    fullName: 'Sarojini Nagar, South Delhi',
    description: 'Govt quarters with affordable options',
    heroDescription:
      'Sarojini Nagar houses thousands of students from govt families. Affordable biology tuition for Classes 9-12 with NEET foundation.',
    nearbyMetro: ['Sarojini Nagar Metro', 'INA Metro'],
    landmarks: ['Sarojini Nagar Market', 'DDA Flats', 'INA Market'],
    schools: ['Kendriya Vidyalaya', 'Sarvodaya Vidyalaya', 'Army School'],
    highlights: ['Affordable', 'Govt Quarters', 'Metro Connected', 'Student Friendly'],
    pincode: '110023',
  },
  'lodhi-colony': {
    name: 'Lodhi Colony',
    fullName: 'Lodhi Colony, New Delhi',
    description: 'Premium area for senior officials',
    heroDescription:
      'Lodhi Colony is an exclusive area near Lodhi Gardens. Biology tuition here caters to students from top schools seeking personalized attention.',
    nearbyMetro: ['Jor Bagh Metro', 'Khan Market Metro'],
    landmarks: ['Lodhi Gardens', 'Khan Market', 'India Habitat Centre'],
    schools: ['Modern School', "St. Columba's School", 'Mater Dei School'],
    highlights: ['Premium Location', 'Near Lodhi Gardens', 'Personalized', 'Elite Families'],
    pincode: '110003',
  },
  saket: {
    name: 'Saket',
    fullName: 'Saket, South Delhi',
    description: 'Modern area with metro connectivity',
    heroDescription:
      'Saket is a modern, developing area with excellent metro connectivity. Growing demand for quality biology tuition for all classes.',
    nearbyMetro: ['Saket Metro', 'Malviya Nagar Metro', 'Hauz Khas Metro'],
    landmarks: ['Select City Walk', 'DLF Place', 'Saket District Centre'],
    schools: ['Salwan Public School', 'Ryan International'],
    highlights: ['Modern Area', 'Metro Hub', 'Growing Demand', 'Well Connected'],
    pincode: '110017',
  },
  'malviya-nagar': {
    name: 'Malviya Nagar',
    fullName: 'Malviya Nagar, South Delhi',
    description: 'Affordable coaching with metro access',
    heroDescription:
      'Malviya Nagar is a popular choice for students seeking affordable biology tuition with excellent metro connectivity.',
    nearbyMetro: ['Malviya Nagar Metro'],
    landmarks: ['Malviya Nagar Market', 'Shivalik', 'Panchshila Club'],
    schools: ['Apeejay School', 'DAV Public School'],
    highlights: ['Affordable', 'Student Area', 'Metro Access', 'Budget Friendly'],
    pincode: '110017',
  },
  'green-park': {
    name: 'Green Park',
    fullName: 'Green Park, South Delhi',
    description: 'Central location with easy access',
    heroDescription:
      'Green Park offers central access to coaching centers. Students from nearby areas find it convenient for biology tuition.',
    nearbyMetro: ['Green Park Metro'],
    landmarks: ['Green Park Market', 'Aurobindo Market', 'Green Park Extension'],
    schools: ['Sardar Patel Vidyalaya', 'Springdales School'],
    highlights: ['Central Location', 'Metro Connected', 'Easy Access', 'Residential'],
    pincode: '110016',
  },
  'cr-park': {
    name: 'CR Park',
    fullName: 'Chittaranjan Park, South Delhi',
    description: 'Academic community with education focus',
    heroDescription:
      "CR Park is known for its academic culture. Biology tuition here caters to the community's strong focus on quality education.",
    nearbyMetro: ['Kalkaji Mandir Metro', 'Govind Puri Metro'],
    landmarks: ['CR Park Market', 'Durga Puja Pandals', 'Kalkaji Temple'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya'],
    highlights: ['Academic Culture', 'Education Focus', 'Community', 'Quality Students'],
    pincode: '110019',
  },
  munirka: {
    name: 'Munirka',
    fullName: 'Munirka, South Delhi',
    description: 'Student hub near JNU',
    heroDescription:
      'Munirka is a vibrant student area near JNU. Affordable biology tuition options for students from various backgrounds.',
    nearbyMetro: ['Munirka Metro', 'RK Puram Metro'],
    landmarks: ['JNU Campus', 'Munirka Village', 'Nelson Mandela Marg'],
    schools: ['Kendriya Vidyalaya JNU', 'Sarvodaya Vidyalaya'],
    highlights: ['Student Hub', 'Near JNU', 'Affordable', 'Study Environment'],
    pincode: '110067',
  },
  'lajpat-nagar': {
    name: 'Lajpat Nagar',
    fullName: 'Lajpat Nagar, South Delhi',
    description: 'Commercial hub with metro access',
    heroDescription:
      'Lajpat Nagar is a commercial and residential hub with excellent metro connectivity. Students from Defence Colony and GK access tuition here.',
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Central Market', 'Defence Colony Flyover', 'Amar Colony'],
    schools: ['Delhi Public School', 'Modern School', 'Bal Bharati'],
    highlights: ['Metro Hub', 'Central Location', 'Easy Access', 'Commercial Area'],
    pincode: '110024',
  },
  kalkaji: {
    name: 'Kalkaji',
    fullName: 'Kalkaji, South Delhi',
    description: 'Residential area near Nehru Place',
    heroDescription:
      'Kalkaji is a well-established residential area near Nehru Place. Students from CR Park, GK, and Okhla access biology tuition here.',
    nearbyMetro: ['Kalkaji Mandir Metro', 'Nehru Place Metro'],
    landmarks: ['Kalkaji Temple', 'Nehru Place', 'Lotus Temple'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya', 'Ryan International'],
    highlights: ['Near Nehru Place', 'Temple Area', 'Established', 'Good Schools'],
    pincode: '110019',
  },
  'east-of-kailash': {
    name: 'East of Kailash',
    fullName: 'East of Kailash (EOK), South Delhi',
    description: 'Premium area with DPS EOK',
    heroDescription:
      'East of Kailash is home to DPS EOK students. Premium biology tuition for Classes 9-12 with board and NEET focus.',
    nearbyMetro: ['Kailash Colony Metro', 'Nehru Place Metro'],
    landmarks: ['DPS East of Kailash', 'EOK Market', 'GK-I M Block'],
    schools: ['DPS East of Kailash', 'Bal Bharati', 'Mount Carmel'],
    highlights: ['DPS EOK Students', 'Near GK', 'Premium Area', 'Quality Education'],
    pincode: '110065',
  },
}

const classOptions = [
  { class: 'Class 9', duration: '12 Months', fee: '₹60,000/year' },
  { class: 'Class 10', duration: '12 Months', fee: '₹72,000/year' },
  { class: 'Class 11', duration: '12 Months', fee: '₹96,000/year' },
  { class: 'Class 12', duration: '12 Months', fee: '₹1,20,000/year' },
]

export default function BiologyTuitionAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaDetails[areaSlug]

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Area not found</h1>
          <Link href="/biology-tuition-south-delhi">
            <Button>Back to South Delhi</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/biology-tuition-south-delhi"
              className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to South Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">
              Classes 9-12 | CBSE, ICSE & State Boards | NEET Foundation
            </p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
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
              viewport={{ once: true }}
              className="bg-green-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <Train className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Nearby Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {metro}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-emerald-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-emerald-600 mr-2" />
                <h3 className="font-bold text-gray-900">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-teal-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-teal-600 mr-2" />
                <h3 className="font-bold text-gray-900">Schools We Serve</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Class Options */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition Options for {area.name} Students
            </h2>
            <p className="text-lg text-gray-600">All boards covered - CBSE, ICSE, State</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {classOptions.map((option, index) => (
              <motion.div
                key={option.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                  <h3 className="text-xl font-bold">{option.class}</h3>
                  <p className="text-sm opacity-90">{option.duration}</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-600 mb-4">{option.fee}</div>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Complete NCERT Coverage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Board Exam Focus
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      NEET Foundation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Weekly Tests
                    </li>
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Enroll Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students from {area.name} Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER faculty',
              'All boards - CBSE, ICSE, State',
              'NEET foundation from Class 9',
              'Small batch of 15-20 students',
              'Weekly tests & assessments',
              'Practical lab sessions',
              'Doubt clearing sessions',
              'Parent-teacher meetings',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Biology Excellence Journey from {area.name}!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join students from {area.name} who scored 95%+ in boards. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/biology-tuition-south-delhi">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Other Areas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - Biology Tuition ${area.name}`,
            description: `Best biology tuition in ${area.name} for Classes 9-12.`,
            url: `https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/${areaSlug}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'South Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
          }),
        }}
      />
    </div>
  )
}
