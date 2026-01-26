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
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  Play,
  Home,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TrackedWhatsAppButton } from '@/components/common/TrackedWhatsAppButton'

interface SectorData {
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

const sectorData: Record<string, SectorData> = {
  'sector-18': {
    name: 'Sector 18',
    fullName: 'Sector 18, Noida',
    description:
      'Sector 18 is the commercial heart of Noida, home to Great India Place (GIP) Mall, Atta Market, and excellent metro connectivity. Our NEET coaching is perfect for students in this bustling area.',
    highlights: [
      'Commercial hub of Noida',
      'Great India Place Mall nearby',
      'Atta Market for convenience',
      'Excellent metro connectivity',
    ],
    nearbyMetro: ['Sector 18 Metro', 'Noida City Centre', 'Botanical Garden'],
    societies: [
      'Sector 18 Apartments',
      'Wave City Center',
      'DLF Mall area residences',
      'Gardens Galleria apartments',
    ],
    schools: ['Cambridge School', 'Apeejay School', 'DPS Noida', 'Ryan International'],
    landmarks: ['Great India Place', 'Atta Market', 'Wave Mall', 'Gardens Galleria'],
    studentCount: '120+',
    successStories: [
      {
        name: 'Rahul Sharma',
        score: 'AIR 1,856',
        quote:
          'Living near GIP, I could focus entirely on studies with online classes. No commute hassles!',
      },
      {
        name: 'Priya Gupta',
        score: '680/720',
        quote:
          'Best decision was joining Cerebrum. Got 360/360 in Biology while staying in Sector 18.',
      },
    ],
  },
  'sector-62': {
    name: 'Sector 62',
    fullName: 'Sector 62, Noida',
    description:
      "Sector 62 is Noida's premier IT and coaching hub. With multiple coaching institutes and tech companies, it's ideal for NEET aspirants seeking quality education in a focused environment.",
    highlights: [
      'IT & Coaching Hub of Noida',
      'Home to major coaching institutes',
      'Young professional neighborhood',
      'Metro connected sector',
    ],
    nearbyMetro: ['Sector 62 Metro', 'Sector 61 Metro', 'Sector 59 Metro'],
    societies: [
      'Stellar IT Park residences',
      'Spaze IT Park area',
      'NSEZ apartments',
      'Sector 62 government flats',
    ],
    schools: ['JIIT', 'Amity University nearby', 'DPS Greater Noida', 'Step by Step'],
    landmarks: ['Spaze IT Park', 'Stellar IT Park', 'NSEZ', 'Electronic City'],
    studentCount: '95+',
    successStories: [
      {
        name: 'Ankit Verma',
        score: 'AIR 2,145',
        quote:
          "Sector 62 has coaching vibes. Cerebrum's online classes fit perfectly with my schedule.",
      },
      {
        name: 'Sneha Agarwal',
        score: '665/720',
        quote: 'AIIMS faculty made the difference. Got personal attention despite online mode.',
      },
    ],
  },
  'sector-137': {
    name: 'Sector 137',
    fullName: 'Sector 137, Noida',
    description:
      "Sector 137 is a prime IT/ITES hub along Noida Expressway with premium residential complexes. Connected by Aqua Line metro, it's home to many NEET aspirants from tech families.",
    highlights: [
      'Noida Expressway location',
      'IT/ITES corporate hub',
      'Aqua Line metro connected',
      'Premium residential area',
    ],
    nearbyMetro: ['Sector 137 Metro (Aqua Line)', 'Sector 142 Metro', 'Sector 143 Metro'],
    societies: [
      'Logix Blossom County',
      'Paras Tierea',
      'Prateek Wisteria',
      'Supertech Emerald Court',
    ],
    schools: ['JBM Global School', 'Step by Step School', 'Amity International', 'DPS Noida'],
    landmarks: ['Logix Technova', 'Advant Navis', 'Max Hospital', 'Jaypee Greens'],
    studentCount: '85+',
    successStories: [
      {
        name: 'Kavya Singh',
        score: 'AIR 1,567',
        quote: "From Logix Blossom County to MBBS! Cerebrum's online classes were a game-changer.",
      },
      {
        name: 'Rohan Mehta',
        score: '675/720',
        quote:
          'Parents are in IT, they loved the tech-enabled learning approach. Perfect for Sector 137 families.',
      },
    ],
  },
  'sector-150': {
    name: 'Sector 150',
    fullName: 'Sector 150, Noida',
    description:
      "Sector 150 is Noida's newest ultra-modern development with premium high-rise societies like ATS Pristine. Perfect for families seeking world-class education in a premium environment.",
    highlights: [
      'Ultra-modern development',
      'Premium high-rise societies',
      'Near Noida Expressway end',
      'Family-oriented neighborhood',
    ],
    nearbyMetro: ['Sector 148 Metro (Aqua Line)', 'Sector 147 Metro', 'Sector 146 Metro'],
    societies: ['ATS Pristine', 'Gulshan Botnia', 'ATS Picturesque', 'Nirala Aspire'],
    schools: ['Shiv Nadar School', 'Pathways School', 'Genesis Global', 'DPS Greater Noida'],
    landmarks: ['ATS Pristine Sector 150', 'Expressway end', 'Golf Course extension'],
    studentCount: '45+',
    successStories: [
      {
        name: 'Aditya Kumar',
        score: 'AIR 1,234',
        quote:
          'ATS Pristine to AIIMS! Best online coaching available without leaving our beautiful society.',
      },
      {
        name: 'Ishita Jain',
        score: '690/720',
        quote: "Top score from Sector 150! Cerebrum's AIIMS faculty knows exactly what NEET needs.",
      },
    ],
  },
  'sector-44': {
    name: 'Sector 44',
    fullName: 'Sector 44, Noida',
    description:
      "Sector 44 is one of Noida's most prestigious residential areas, near the Golf Course with spacious plots and bungalows. Home to affluent families seeking premium NEET coaching.",
    highlights: [
      'Ultra-premium residential area',
      'Near Noida Golf Course',
      'Spacious bungalow plots',
      'Affluent neighborhood',
    ],
    nearbyMetro: ['Golf Course Metro', 'Botanical Garden Metro', 'Noida City Centre'],
    societies: ['Godrej Woods', 'Sector 44 Bungalows', 'Golf Course residences'],
    schools: ['Amity International School', 'DPS Noida', 'Pathways School'],
    landmarks: ['Noida Golf Course', 'Amity University entrance', 'Botanical Garden'],
    studentCount: '65+',
    successStories: [
      {
        name: 'Aryan Malhotra',
        score: 'AIR 956',
        quote: 'Premium coaching for premium results! From Sector 44 to top medical college.',
      },
      {
        name: 'Simran Kapoor',
        score: '685/720',
        quote: 'Best Biology coaching near Golf Course. My rank speaks for the quality.',
      },
    ],
  },
  'sector-50': {
    name: 'Sector 50',
    fullName: 'Sector 50, Noida',
    description:
      "Sector 50 is a well-developed residential hub with excellent connectivity. Close to Sector 52 metro, it's ideal for families seeking quality NEET coaching.",
    highlights: [
      'Well-developed residential area',
      'Excellent road connectivity',
      'Near Sector 52 Metro',
      'Family-friendly neighborhood',
    ],
    nearbyMetro: ['Sector 52 Metro', 'Sector 51 Metro', 'Sector 50 Metro'],
    societies: ['Sector 50 apartments', 'Nearby Sector 51 societies', 'Premium flats'],
    schools: ['DPS Noida', 'Ryan International', 'Cambridge School'],
    landmarks: ['Sector 50 Market', 'City Centre Mall nearby', 'Brahmaputra Market'],
    studentCount: '70+',
    successStories: [
      {
        name: 'Vikram Yadav',
        score: 'AIR 2,034',
        quote:
          'Sector 50 to medical college - Cerebrum made it possible with personalized attention.',
      },
      {
        name: 'Neha Saxena',
        score: '660/720',
        quote: 'Online classes from home in Sector 50. Convenient and effective!',
      },
    ],
  },
  'sector-37': {
    name: 'Sector 37',
    fullName: 'Sector 37, Noida',
    description:
      'Sector 37 is a family-friendly residential area near Botanical Garden with good schools and amenities. Perfect for NEET aspirants in a peaceful study environment.',
    highlights: [
      'Family-friendly residential area',
      'Near Botanical Garden',
      'Good schools nearby',
      'Peaceful study environment',
    ],
    nearbyMetro: ['Botanical Garden Metro', 'Noida City Centre Metro', 'Sector 34 Metro'],
    societies: ['Sector 37 apartments', 'Gardens area residences', 'Government flats'],
    schools: ['DPS Noida', 'Apeejay School', 'Ryan International', 'Cambridge School'],
    landmarks: ['Botanical Garden', 'Sector 37 Market', 'Golf Course nearby'],
    studentCount: '60+',
    successStories: [
      {
        name: 'Shivam Tripathi',
        score: 'AIR 1,789',
        quote: 'From peaceful Sector 37 to top medical college. Perfect study environment!',
      },
      {
        name: 'Pooja Sharma',
        score: '670/720',
        quote: 'Near Botanical Garden, focused on Biology. Ironic but worked!',
      },
    ],
  },
  'sector-93': {
    name: 'Sector 93',
    fullName: 'Sector 93/93A/93B, Noida',
    description:
      'Sectors 93, 93A, and 93B are modern residential areas along Noida Expressway with premium apartments. Well-connected via Aqua Line for convenient access.',
    highlights: [
      'Noida Expressway location',
      'Modern apartment complexes',
      'Premium residential area',
      'Growing neighborhood',
    ],
    nearbyMetro: ['Sector 101 Metro (Aqua Line)', 'Sector 81 Metro', 'NSEZ Metro'],
    societies: ['Eldeco Utopia', 'ATS Greens Village', 'Supertech Czar', 'Amrapali Silicon City'],
    schools: ['Lotus Valley International', 'JBM Global', 'Pathways School'],
    landmarks: ['Noida Expressway', 'Sector 93 Commercial', 'Eldeco Utopia Club'],
    studentCount: '55+',
    successStories: [
      {
        name: 'Aman Gupta',
        score: 'AIR 1,456',
        quote: 'Eldeco Utopia resident here. Online classes made NEET prep so convenient!',
      },
      {
        name: 'Riya Sharma',
        score: '655/720',
        quote: 'Modern lifestyle, modern education. Perfect combo for NEET success.',
      },
    ],
  },
  'sector-104': {
    name: 'Sector 104',
    fullName: 'Sector 104, Noida',
    description:
      'Sector 104 is home to Supertech Supernova and other premium high-rises along Noida Expressway. A rapidly developing area with modern amenities.',
    highlights: [
      'Supertech Supernova location',
      'Premium high-rise towers',
      'Noida Expressway access',
      'Modern development',
    ],
    nearbyMetro: ['Sector 101 Metro (Aqua Line)', 'Sector 83 Metro', 'Sector 76 Metro'],
    societies: ['Supertech Supernova', 'The Coralwood', 'Other premium towers'],
    schools: ['Lotus Valley', 'JBM Global School', 'Step by Step'],
    landmarks: ['Supertech Supernova', 'Noida Expressway', 'Sector 104 Commercial'],
    studentCount: '40+',
    successStories: [
      {
        name: 'Karan Singh',
        score: 'AIR 2,567',
        quote: 'From Supernova heights to medical college heights! Cerebrum rocks!',
      },
      {
        name: 'Anjali Verma',
        score: '645/720',
        quote: 'Premium location, premium results. Best coaching for Sector 104.',
      },
    ],
  },
  'sector-128': {
    name: 'Sector 128',
    fullName: 'Sector 128, Noida',
    description:
      'Sector 128 is a corporate hub near Pari Chowk with premium residential options like Jaypee Greens. Connected to Greater Noida via Aqua Line metro.',
    highlights: [
      'Corporate office hub',
      'Jaypee Greens nearby',
      'Pari Chowk connectivity',
      'Near Greater Noida',
    ],
    nearbyMetro: ['Pari Chowk Metro (Aqua Line)', 'Knowledge Park II Metro', 'Alpha 1 Metro'],
    societies: ['Jaypee Greens', 'Sector 128 apartments', 'Corporate housing'],
    schools: ['JIIT', 'Sharda University', 'DPS Greater Noida'],
    landmarks: ['Jaypee Greens', 'Pari Chowk', 'Formula 1 Track area', 'JIIT Campus'],
    studentCount: '35+',
    successStories: [
      {
        name: 'Mohit Kumar',
        score: 'AIR 1,678',
        quote: 'Jaypee Greens to government medical college. Dream came true with Cerebrum!',
      },
      {
        name: 'Kritika Agarwal',
        score: '650/720',
        quote: 'Near F1 track, but focused on the NEET race. Won it!',
      },
    ],
  },
  'sector-15a': {
    name: 'Sector 15A',
    fullName: 'Sector 15A, Noida',
    description:
      "Sector 15A is one of Noida's oldest and most established premium areas with green surroundings and bungalows. Perfect for focused NEET preparation.",
    highlights: [
      'Established premium area',
      'Green and peaceful',
      'Bungalow-style living',
      'Heritage neighborhood',
    ],
    nearbyMetro: ['Sector 15 Metro', 'Sector 16 Metro', 'Sector 18 Metro'],
    societies: ['Sector 15A bungalows', 'Premium residences', 'Government quarters'],
    schools: ['Apeejay School', 'Cambridge School', 'DPS Noida'],
    landmarks: ['Sector 15A Market', 'Film City nearby', 'Sector 18 Commercial'],
    studentCount: '50+',
    successStories: [
      {
        name: 'Ayush Gupta',
        score: 'AIR 1,234',
        quote: 'Old Noida charm, new-age coaching. Perfect combination for NEET success!',
      },
      {
        name: 'Nisha Srivastava',
        score: '680/720',
        quote: 'From our peaceful Sector 15A home to top medical college.',
      },
    ],
  },
  'sector-168': {
    name: 'Sector 168',
    fullName: 'Sector 168, Noida (Buddh Circuit Area)',
    description:
      'Sector 168 is near the famous Buddh International Circuit (Formula 1 track) with modern developments like Shiv Nadar School. A growing area for families.',
    highlights: [
      'Near Buddh International Circuit',
      'Shiv Nadar School area',
      'Modern development',
      'Growing family area',
    ],
    nearbyMetro: ['Depot Metro (Aqua Line end)', 'Delta 1 Metro', 'Alpha 1 Metro'],
    societies: ['Sector 168 apartments', 'Greater Noida extension', 'Modern townships'],
    schools: ['Shiv Nadar School', 'Genesis Global', 'G.D. Goenka'],
    landmarks: ['Buddh International Circuit', 'Shiv Nadar University', 'F1 Track'],
    studentCount: '30+',
    successStories: [
      {
        name: 'Varun Kapoor',
        score: 'AIR 2,890',
        quote: 'F1 track nearby motivated me for the ultimate race - NEET. Won it with Cerebrum!',
      },
      {
        name: 'Ananya Singh',
        score: '640/720',
        quote: 'Remote area but top-class online coaching. Location no barrier!',
      },
    ],
  },
  'greater-noida-west': {
    name: 'Greater Noida West',
    fullName: 'Greater Noida West (Noida Extension)',
    description:
      'Greater Noida West, popularly known as Noida Extension, is home to massive residential projects like Gaur City, Ace City, and Supertech Eco Village. A rapidly growing area with young families.',
    highlights: [
      'Largest residential area',
      'Gaur City, Ace City hub',
      'Affordable premium living',
      'Young family neighborhood',
    ],
    nearbyMetro: ['Knowledge Park II Metro', 'Pari Chowk Metro', 'Alpha 1 Metro'],
    societies: [
      'Gaur City 1 & 2',
      'Ace City',
      'Supertech Eco Village',
      'Panchsheel Greens',
      'Ajnara Homes',
      'Paramount Emotions',
    ],
    schools: ['DPS Greater Noida', 'Ryan International', 'Genesis Global'],
    landmarks: ['Gaur City Mall', 'Pari Chowk', 'Knowledge Park'],
    studentCount: '250+',
    successStories: [
      {
        name: 'Rahul Yadav',
        score: 'AIR 1,123',
        quote: "Gaur City to government medical college! Cerebrum's online classes are the best.",
      },
      {
        name: 'Priyanka Sharma',
        score: '695/720',
        quote: 'Highest score from Greater Noida West! Small batches made all the difference.',
      },
      {
        name: 'Amit Singh',
        score: 'AIR 1,567',
        quote: 'Ace City resident here. Top-notch coaching without travel hassles.',
      },
    ],
  },
}

export default function SectorPage() {
  const params = useParams()
  const sectorSlug = params.sector as string

  const data = sectorData[sectorSlug]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sector Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t find information for this sector.</p>
          <Link href="/neet-coaching-noida">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Noida Coaching
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_sector', {
        event_category: 'conversion',
        event_label: `noida_${sectorSlug}`,
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
            <Link href="/" className="hover:text-green-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-noida" className="hover:text-green-600">
              NEET Coaching Noida
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{data.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-16 md:py-20 overflow-hidden">
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

              <TrackedWhatsAppButton
                source={`noida-${sectorSlug}-hero`}
                message={`Hi! I'm from ${data.name}, Noida. I want to join NEET Biology coaching. What batches are available?`}
                buttonText="WhatsApp Now"
                variant="primary"
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white font-bold"
              />

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-900"
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
              { icon: Award, label: 'NEET Selections', value: '850+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Details Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metro Stations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <Train className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Metro Stations</h3>
              <ul className="space-y-2">
                {data.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {metro}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Societies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <Building2 className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Residential Societies</h3>
              <ul className="space-y-2">
                {data.societies.map((society) => (
                  <li key={society} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {society}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Schools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <School className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Schools</h3>
              <ul className="space-y-2">
                {data.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Landmarks */}
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
                  <li key={landmark} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
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
                className="bg-green-50 rounded-xl p-6 border border-green-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-green-600 font-semibold">{story.score}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{story.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA after testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-center"
          >
            <p className="text-white/90 text-lg mb-2">Want to achieve similar results?</p>
            <p className="text-white text-xl md:text-2xl font-bold mb-4">
              Talk to our {data.name} counselor now
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedWhatsAppButton
                source={`noida-${sectorSlug}-testimonial`}
                message={`Hi! I saw the success stories from ${data.name}. How can I achieve similar NEET scores?`}
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
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
            </div>
          </motion.div>
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
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

              <TrackedWhatsAppButton
                source={`noida-${sectorSlug}-footer-cta`}
                message={`Hi! I'm from ${data.name}, Noida. I want to enroll for NEET coaching. Please share batch details and fees.`}
                buttonText="WhatsApp Counselor"
                variant="primary"
                size="xl"
                className="bg-white text-green-700 hover:bg-green-50 font-bold"
              />
            </div>

            <p className="mt-6 text-white/70 text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Average response time: 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Schema Markup for AI/LLM Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://cerebrumbiologyacademy.com/#organization',
            name: `Cerebrum Biology Academy - NEET Coaching ${data.name}`,
            alternateName: ['Cerebrum Academy', 'Cerebrum NEET Coaching'],
            description: `Best NEET Biology coaching in ${data.fullName}. ${data.description}`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sectorSlug}`,
            telephone: '+91-9310-387-227',
            email: 'info@cerebrumbiologyacademy.com',
            priceRange: '₹₹',
            areaServed: [
              { '@type': 'Place', name: data.fullName },
              { '@type': 'City', name: 'Noida' },
              { '@type': 'State', name: 'Uttar Pradesh' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'NEET Biology Courses',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'NEET Biology Foundation',
                  description: 'Foundation course for Class 11 students starting NEET preparation',
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Comprehensive',
                  description: 'Complete NEET Biology preparation for Class 12 and droppers',
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Crash Course',
                  description: 'Intensive revision course for final NEET preparation',
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: data.studentCount.replace('+', ''),
              bestRating: '5',
              worstRating: '1',
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'NEET Biology Specialist',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'AIIMS/JIPMER Faculty',
              },
            ],
            sameAs: [
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/@cerebrumbiologyacademy',
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
                name: `What is the best NEET coaching in ${data.name}, Noida?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Cerebrum Biology Academy offers the best NEET coaching in ${data.name}, Noida with expert faculty from AIIMS/JIPMER. We have helped ${data.studentCount} students from ${data.name} achieve top NEET scores with our comprehensive biology-focused program.`,
                },
              },
              {
                '@type': 'Question',
                name: `How much does NEET coaching cost in ${data.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `NEET coaching fees at Cerebrum Biology Academy for ${data.name} students range from ₹25,000 to ₹75,000 depending on the course duration. We offer flexible payment options and scholarship programs for deserving students.`,
                },
              },
              {
                '@type': 'Question',
                name: `Is there online NEET coaching available for ${data.name} students?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes! Cerebrum Biology Academy provides both online and hybrid NEET coaching for ${data.name} students. Our online classes offer live interactive sessions, recorded lectures, and personalized doubt-clearing support.`,
                },
              },
              {
                '@type': 'Question',
                name: `What are the NEET coaching class timings for ${data.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `We offer flexible batch timings for ${data.name} students: Morning batches (6 AM - 9 AM), Evening batches (5 PM - 8 PM), and Weekend batches for school students. Online classes are available 24/7 through recorded sessions.`,
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
            name: `NEET Biology Courses for ${data.name} Students`,
            description: `Best NEET Biology coaching programs available for students in ${data.fullName}`,
            numberOfItems: 4,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'Course',
                  name: 'NEET Biology Foundation (Class 11)',
                  description: 'Build strong biology fundamentals for NEET from Class 11',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'blended',
                    courseWorkload: 'PT6H/week',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'Course',
                  name: 'NEET Biology Comprehensive (Class 12)',
                  description: 'Complete NEET Biology syllabus coverage with expert guidance',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'blended',
                    courseWorkload: 'PT10H/week',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'Course',
                  name: 'NEET Biology Crash Course',
                  description: '3-month intensive revision for NEET Biology',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'blended',
                    courseWorkload: 'PT15H/week',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 4,
                item: {
                  '@type': 'Course',
                  name: 'NEET Biology Dropper Batch',
                  description: 'Dedicated program for droppers targeting NEET success',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'blended',
                    courseWorkload: 'PT12H/week',
                  },
                },
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList Schema for Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'NEET Coaching Noida',
                item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: `NEET Coaching ${data.name}`,
                item: `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sectorSlug}`,
              },
            ],
          }),
        }}
      />

      {/* WebPage with Speakable Schema for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sectorSlug}#webpage`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sectorSlug}`,
            name: `Best NEET Coaching in ${data.name}, Noida | Cerebrum Biology Academy`,
            description: `Top-rated NEET Biology coaching institute in ${data.fullName}. Expert faculty from AIIMS/JIPMER. Join ${data.studentCount} successful students.`,
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://cerebrumbiologyacademy.com/#website',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            about: {
              '@type': 'Thing',
              name: 'NEET Biology Coaching',
              description: 'Medical entrance exam preparation for biology',
            },
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', '.hero-description'],
            },
            mainContentOfPage: {
              '@type': 'WebPageElement',
              cssSelector: 'main',
            },
          }),
        }}
      />
    </div>
  )
}
