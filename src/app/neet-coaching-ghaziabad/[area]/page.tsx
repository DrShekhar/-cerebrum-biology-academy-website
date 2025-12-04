'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Train,
  Building2,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  Play,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AreaData {
  name: string
  fullName: string
  description: string
  highlights: string[]
  nearbyMetro: string[]
  societies: string[]
  schools: string[]
  landmarks: string[]
  studentCount: string
  successStories: { name: string; score: string; quote: string }[]
}

const areaData: Record<string, AreaData> = {
  indirapuram: {
    name: 'Indirapuram',
    fullName: 'Indirapuram, Ghaziabad',
    description:
      "Indirapuram is Ghaziabad's most premium residential hub, divided into several Khands including Ahinsa Khand, Vaibhav Khand, Nyay Khand, and more. Home to IT professionals and families seeking quality education.",
    highlights: [
      'Premium residential hub',
      'Multiple Khands (localities)',
      'Near NH-24 & Vaishali Metro',
      'Top schools & societies',
    ],
    nearbyMetro: ['Vaishali Metro (Blue Line)', 'Kaushambi Metro'],
    societies: [
      'ATS Advantage',
      'Shipra Srishti',
      'Saya Gold Avenue',
      'Saya Zenith',
      'Orange County',
      'Gaur Green City',
      'Ashiana Upvan',
      'Apex D Rio',
    ],
    schools: [
      'DPS Indirapuram',
      'Cambridge School',
      'G D Goenka',
      'St. Teresa School',
      'Presidium',
    ],
    landmarks: ['Shipra Mall', 'CISF Camp', 'Ahinsa Khand Market', 'Vaibhav Khand Market'],
    studentCount: '350+',
    successStories: [
      {
        name: 'Rahul Sharma',
        score: 'AIR 1,234',
        quote: 'From ATS Advantage to AIIMS! Best coaching decision ever.',
      },
      {
        name: 'Priya Gupta',
        score: '685/720',
        quote: 'Shipra Srishti resident here. Online classes were perfect for my schedule.',
      },
      {
        name: 'Ankit Verma',
        score: 'AIR 1,567',
        quote: 'Ahinsa Khand to medical college. Cerebrum made it possible!',
      },
    ],
  },
  vaishali: {
    name: 'Vaishali',
    fullName: 'Vaishali, Ghaziabad',
    description:
      "Vaishali is a well-established luxury residential area with Blue Line metro connectivity. Close to Noida and East Delhi, it's home to premium societies and top schools.",
    highlights: [
      'Blue Line Metro connected',
      'Established luxury area',
      'Close to Noida & Delhi',
      'Premium townships',
    ],
    nearbyMetro: ['Vaishali Metro (Blue Line)', 'Kaushambi Metro'],
    societies: [
      'Ramprastha Greens',
      'Ramprastha Platinum Height',
      'Mahagun Moderne',
      'Vaishali Apartments',
    ],
    schools: ['K.R. Mangalam World School', 'Ryan International', 'Amity School'],
    landmarks: ['Vaishali Metro Station', 'Mahagun Metro Mall', 'Sector 4 Market'],
    studentCount: '180+',
    successStories: [
      {
        name: 'Sneha Agarwal',
        score: 'AIR 1,890',
        quote: 'Ramprastha Greens to top medical college. Thank you Cerebrum!',
      },
      {
        name: 'Vikram Singh',
        score: '670/720',
        quote: 'Metro connectivity made online classes even more convenient.',
      },
    ],
  },
  vasundhara: {
    name: 'Vasundhara',
    fullName: 'Vasundhara, Ghaziabad',
    description:
      "Vasundhara is a growing residential area with good schools and connectivity. Close to Vaishali metro and NH-24, it's becoming increasingly popular among families.",
    highlights: [
      'Growing residential area',
      'Near Vaishali Metro',
      'Good schools nearby',
      'Connected to NH-24',
    ],
    nearbyMetro: ['Vaishali Metro (Blue Line)', 'Upcoming Vasundhara Sector 5 Metro'],
    societies: ['ABA Olive County', 'Vasundhara Enclave', 'Sector 1-16 Apartments'],
    schools: ['Amity International School', 'Ryan International', 'DPS nearby'],
    landmarks: ['Vasundhara Market', 'CISF Camp', 'Sector 1 Commercial'],
    studentCount: '120+',
    successStories: [
      {
        name: 'Mohit Kumar',
        score: 'AIR 2,345',
        quote: 'ABA Olive County to medical college. Dream come true!',
      },
      {
        name: 'Neha Sharma',
        score: '655/720',
        quote: 'Vasundhara Sector 5 resident. Best online coaching.',
      },
    ],
  },
  'crossing-republik': {
    name: 'Crossing Republik',
    fullName: 'Crossing Republik, Ghaziabad',
    description:
      "Crossing Republik is a massive planned township on NH-24 with over 45 residential projects. Home to 200,000+ residents, it's one of the largest townships in NCR.",
    highlights: [
      'Mega township on NH-24',
      '45+ residential projects',
      'Young families hub',
      'Affordable premium living',
    ],
    nearbyMetro: ['Upcoming Metro Extension', 'Near Vaishali Metro'],
    societies: [
      'Mahagun Montage',
      'Mahagun Mascot',
      'Supertech Livingston',
      'Ajnara GenX',
      'Assotech The Nest',
      'GH7 Crossings',
      'Panchsheel Wellington',
      'SKB Gold Coast',
    ],
    schools: ['Schools within township', 'Ryan International nearby', 'DPS nearby'],
    landmarks: ['Crossing Republik Main Gate', 'Township Club', 'Central Park'],
    studentCount: '200+',
    successStories: [
      {
        name: 'Amit Yadav',
        score: 'AIR 1,456',
        quote: 'Mahagun Montage to government medical college!',
      },
      {
        name: 'Riya Sharma',
        score: '680/720',
        quote: 'Supertech Livingston resident. No need to travel for coaching!',
      },
      {
        name: 'Karan Singh',
        score: 'AIR 2,100',
        quote: 'Ajnara GenX to MBBS. Online classes were a game-changer.',
      },
    ],
  },
  'raj-nagar-extension': {
    name: 'Raj Nagar Extension',
    fullName: 'Raj Nagar Extension, Ghaziabad',
    description:
      'Raj Nagar Extension is a rapidly developing area along NH-58 with premium high-rise societies. Close to Shaheed Sthal metro, it offers affordable luxury living.',
    highlights: [
      'NH-58 corridor',
      'Premium high-rises',
      'Near Red Line Metro',
      'Affordable luxury',
    ],
    nearbyMetro: ['Shaheed Sthal Metro (Red Line)', 'Hindon River Metro'],
    societies: [
      'VVIP Addresses',
      'KW Srishti',
      'VVIP Homes',
      'Landcraft River Heights',
      'Ashiana Palm Court',
      'Charms Castle',
      'Windsor Paradise 2',
      'Apex Sky Heights',
    ],
    schools: ['Schools in RNE', 'DPS nearby', 'Ryan nearby'],
    landmarks: ['NH-58', 'VVIP Cricket Stadium', 'RNE Main Road'],
    studentCount: '150+',
    successStories: [
      {
        name: 'Priyanka Verma',
        score: 'AIR 1,678',
        quote: 'VVIP Addresses to top medical college. Best investment!',
      },
      {
        name: 'Rohit Gupta',
        score: '665/720',
        quote: 'KW Srishti resident. AIIMS faculty teaching from home!',
      },
    ],
  },
  kaushambi: {
    name: 'Kaushambi',
    fullName: 'Kaushambi, Ghaziabad',
    description:
      'Kaushambi is a commercial and residential hub with Blue Line metro connectivity. It serves as a key transit point between Ghaziabad and Delhi.',
    highlights: [
      'Blue Line Metro hub',
      'Commercial center',
      'Transit point to Delhi',
      'Established locality',
    ],
    nearbyMetro: ['Kaushambi Metro (Blue Line)', 'Vaishali Metro nearby'],
    societies: ['Kaushambi Apartments', 'Anand Vihar Extension', 'Nearby sectors'],
    schools: ['Schools in Kaushambi', 'Indirapuram schools nearby'],
    landmarks: ['Kaushambi Metro Station', 'Anand Vihar ISBT', 'Commercial Complex'],
    studentCount: '95+',
    successStories: [
      {
        name: 'Sakshi Mishra',
        score: 'AIR 2,567',
        quote: 'Metro connectivity made coaching so accessible!',
      },
      {
        name: 'Arjun Patel',
        score: '645/720',
        quote: 'Kaushambi resident. Perfect online coaching experience.',
      },
    ],
  },
  'mohan-nagar': {
    name: 'Mohan Nagar',
    fullName: 'Mohan Nagar, Ghaziabad',
    description:
      "Mohan Nagar is a key locality on the Red Line metro with commercial and residential mix. Part of Sahibabad area, it's well-connected to Delhi.",
    highlights: [
      'Red Line Metro connected',
      'Commercial hub',
      'Sahibabad Industrial nearby',
      'Good connectivity',
    ],
    nearbyMetro: ['Mohan Nagar Metro (Red Line)', 'Shyam Park Metro', 'Rajendra Nagar Metro'],
    societies: ['Mohan Nagar Apartments', 'Sahibabad sectors', 'Industrial area housing'],
    schools: ['Schools in Mohan Nagar', 'Sahibabad schools'],
    landmarks: ['Mohan Nagar Metro Station', 'RDC Raj Nagar', 'Sahibabad Industrial Area'],
    studentCount: '75+',
    successStories: [
      {
        name: 'Deepak Sharma',
        score: 'AIR 2,890',
        quote: 'Red Line metro area to medical college!',
      },
      {
        name: 'Pooja Yadav',
        score: '640/720',
        quote: 'Mohan Nagar resident. Great online coaching!',
      },
    ],
  },
  sahibabad: {
    name: 'Sahibabad',
    fullName: 'Sahibabad, Ghaziabad',
    description:
      "Sahibabad is an industrial and residential hub with multiple Red Line metro stations. Well-connected to Delhi, it's home to many working professionals.",
    highlights: [
      'Industrial hub',
      'Multiple Red Line stations',
      'Working professionals',
      'Delhi connectivity',
    ],
    nearbyMetro: ['Mohan Nagar Metro', 'Shyam Park Metro', 'Shaheed Nagar Metro', 'Raj Bagh Metro'],
    societies: ['Sahibabad Apartments', 'Industrial housing', 'Nearby residential areas'],
    schools: ['Schools in Sahibabad', 'Ghaziabad schools nearby'],
    landmarks: ['Sahibabad Industrial Area', 'Red Line Metro Corridor', 'NH-24'],
    studentCount: '60+',
    successStories: [
      {
        name: 'Vivek Kumar',
        score: 'AIR 3,100',
        quote: 'Sahibabad to medical college. Made it with Cerebrum!',
      },
    ],
  },
}

export default function AreaPage() {
  const params = useParams()
  const areaSlug = params.area as string

  const data = areaData[areaSlug]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Area Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t find information for this area.</p>
          <Link href="/neet-coaching-ghaziabad">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ghaziabad Coaching
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_area', {
        event_category: 'conversion',
        event_label: `ghaziabad_${areaSlug}`,
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-ghaziabad" className="hover:text-purple-600">
              NEET Coaching Ghaziabad
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{data.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 mr-2 text-yellow-300" />
              {data.studentCount} students from this area
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Best NEET Coaching in <span className="text-yellow-300">{data.fullName}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-6">{data.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {data.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+919876543210">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Students', value: data.studentCount },
              { icon: Trophy, label: 'Success Rate', value: '98%' },
              { icon: Star, label: 'Google Rating', value: '4.9' },
              { icon: Award, label: 'NEET Selections', value: '1,100+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <Train className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Metro</h3>
              <ul className="space-y-2">
                {data.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <Building2 className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Premium Societies</h3>
              <ul className="space-y-2">
                {data.societies.slice(0, 5).map((society) => (
                  <li key={society} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {society}
                  </li>
                ))}
                {data.societies.length > 5 && (
                  <li className="text-purple-600 text-sm font-medium">
                    +{data.societies.length - 5} more societies
                  </li>
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <School className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Schools</h3>
              <ul className="space-y-2">
                {data.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <MapPin className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Landmarks</h3>
              <ul className="space-y-2">
                {data.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Success Stories from {data.name}
            </h2>
            <p className="text-gray-600">Real students, real results from your neighborhood</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-purple-600 font-semibold">{story.score}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{story.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why {data.name} Students Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Expert teachers with 15+ years experience',
              },
              {
                icon: Users,
                title: 'Small Batches',
                desc: 'Only 15-20 students for personal attention',
              },
              {
                icon: Clock,
                title: 'Flexible Timing',
                desc: 'Morning, afternoon & evening batches',
              },
              {
                icon: BookOpen,
                title: 'Complete Material',
                desc: 'NCERT notes, tests & PYQs included',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Join {data.studentCount} Students from {data.name}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Book your free demo class today and start your NEET journey!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/neet-coaching-ghaziabad">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Ghaziabad Areas
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
            name: `Cerebrum Biology Academy - ${data.fullName}`,
            description: `Best NEET Biology coaching in ${data.fullName}. ${data.description}`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${areaSlug}`,
            areaServed: {
              '@type': 'Place',
              name: data.fullName,
              containedInPlace: { '@type': 'City', name: 'Ghaziabad' },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: data.studentCount.replace('+', ''),
              bestRating: '5',
            },
          }),
        }}
      />
    </div>
  )
}
