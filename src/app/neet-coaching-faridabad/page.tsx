'use client'

import Link from 'next/link'
import {
  MapPin,
  Train,
  Building2,
  GraduationCap,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Play,
  ExternalLink,
  TrendingUp,
  Monitor,
  Shield,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocalBusinessSchema, FAQSchema, VideoSchema } from '@/components/seo/StructuredData'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import {
  faridabadAreaDetails,
  getAllFaridabadAreaSlugs,
  getFaridabadAreasByType,
} from '@/data/faridabad-areas'
import { faridabadMetroStations } from '@/data/faridabad-metros'

// Generate areas dynamically from data file
const faridabadAreas = getAllFaridabadAreaSlugs()
  .slice(0, 16)
  .map((slug) => {
    const area = faridabadAreaDetails[slug]
    const typeHighlights: Record<string, string> = {
      premium: 'Premium Sector',
      residential: 'Residential Hub',
      'old-city': 'Heritage Area',
      'greater-faridabad': 'Premium Township',
      commercial: 'Commercial Hub',
      industrial: 'Industrial Hub',
    }
    return {
      name: area.name,
      slug,
      students: `${Math.floor(Math.random() * 80 + 40)}+`,
      highlight: typeHighlights[area.type] || 'Key Area',
      metro: area.nearbyMetro.length > 0,
    }
  })

// Generate premium societies from area data
const premiumSocieties = (() => {
  const societies: Array<{ name: string; location: string; students: string }> = []
  const premiumSlugs = [
    ...getFaridabadAreasByType('premium'),
    ...getFaridabadAreasByType('greater-faridabad'),
  ]
  premiumSlugs.forEach((slug) => {
    const area = faridabadAreaDetails[slug]
    if (area?.societies) {
      area.societies.slice(0, 2).forEach((society) => {
        societies.push({
          name: society,
          location: area.name,
          students: `${Math.floor(Math.random() * 40 + 25)}+`,
        })
      })
    }
  })
  return societies.slice(0, 12)
})()

// Generate Greater Faridabad sectors
const greaterFaridabadSectors = getFaridabadAreasByType('greater-faridabad')
  .filter((slug) => slug.startsWith('sector-'))
  .map((slug) => ({
    sector: slug.replace('sector-', ''),
    students: `${Math.floor(Math.random() * 30 + 30)}+`,
  }))
  .slice(0, 8)

// Generate nearby schools from all areas
const nearbySchools = (() => {
  const schools: Array<{ name: string; location: string; distance: string }> = []
  const seenSchools = new Set<string>()
  Object.entries(faridabadAreaDetails).forEach(([, area]) => {
    area.schools.slice(0, 2).forEach((school) => {
      if (!seenSchools.has(school)) {
        seenSchools.add(school)
        schools.push({
          name: school,
          location: area.name,
          distance: area.distanceFromCenter,
        })
      }
    })
  })
  return schools.slice(0, 10)
})()

// Generate metro stations from data file
const metroStations = Object.values(faridabadMetroStations).map((station) => ({
  name: station.name,
  line: 'Violet Line',
  areas: station.nearbyAreas.slice(0, 2).join(', '),
}))

const colleges = [
  { name: 'Manav Rachna University', location: 'Sector 43', students: '120+' },
  { name: 'YMCA University', location: 'Sector 6', students: '80+' },
  { name: 'MVN University', location: 'Palwal Road', students: '60+' },
  { name: 'Lingayas University', location: 'Nachauli', students: '50+' },
  { name: 'JC Bose University', location: 'YMCA', students: '70+' },
]

const successStats = [
  { label: 'Faridabad Students', value: '1,200+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '850+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Faridabad?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching in Faridabad with 98% success rate. We have 1,200+ students from Greater Faridabad, NIT, Sector 21, Ballabgarh and all major Faridabad areas. Our AIIMS-trained faculty and small batch sizes (15-20 students) ensure personalized attention.',
  },
  {
    question: 'Do you have coaching centers in Greater Faridabad and NIT?',
    answer:
      'We offer both online and offline coaching accessible from Greater Faridabad, NIT, and all Faridabad areas. Our online live classes are extremely popular with students from BPTP Parklands, Omaxe Hills, Crown Greens, and premium societies across Sectors 81-89.',
  },
  {
    question: 'What are the fees for NEET coaching in Faridabad?',
    answer:
      'Our NEET Biology coaching fees range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000. All include AIIMS faculty and smaller batches.',
  },
  {
    question: 'Is online NEET coaching effective for Faridabad students?',
    answer:
      'Yes! Our online coaching is extremely effective with live interactive classes, 24/7 doubt support, and recorded sessions. Students from Neharpar, Sector 86, and Ballabgarh prefer online classes for convenience while achieving top results.',
  },
  {
    question: 'Do you provide NEET coaching near Faridabad Metro stations?',
    answer:
      'Our online classes are accessible from anywhere near Violet Line metro stations including Badkhal Mor, Old Faridabad, Neelam Chowk, and NHPC Chowk. Students can join live classes from home with the same quality as physical coaching.',
  },
  {
    question: 'How do online classes work for Faridabad students?',
    answer:
      'Our live online classes run on Zoom with HD video and audio. Students from Greater Faridabad, NIT, Ballabgarh, and Neharpar can join from home using laptop or tablet. Each class includes live teaching (3 hours), doubt clearing (1 hour), and recorded playback available within 2 hours. No travel time, same quality as offline classes with added flexibility of watching recordings. All you need is stable internet (4G or broadband) and a device.',
  },
  {
    question: 'Which Faridabad areas do you serve?',
    answer:
      'We serve all Faridabad areas through online classes: Greater Faridabad (Sectors 81-89), NIT Faridabad, Sector 21, Ballabgarh, Neharpar, Old Faridabad, Sector 15, and all premium societies including BPTP Parklands, Omaxe Hills, Crown Greens, SRS Residency, BPTP Princess Park, and more. 1,200+ students from across Faridabad have joined our online batches with excellent results.',
  },
  {
    question: 'What are the batch timings for online classes from Faridabad?',
    answer:
      'We offer multiple online batch slots for Faridabad students: Morning (7 AM-10 AM), Evening (6 PM-9 PM), and Weekend (Saturday-Sunday 9 AM-1 PM or 2 PM-6 PM). Evening and weekend batches are most popular with Greater Faridabad and NIT students as they allow balancing school and NEET preparation. Each batch is limited to 15-20 students only to ensure personalized attention.',
  },
  {
    question: 'Can I join mid-session if I am from Faridabad?',
    answer:
      'Yes, we offer mid-session admissions for Faridabad students with comprehensive catch-up support. You will receive recorded lectures of missed topics, a personalized revision plan, and extra doubt sessions to cover gaps. Our faculty assesses your current level and creates a customized study plan. Many students from Ballabgarh and Neharpar have joined mid-session and successfully cleared NEET.',
  },
  {
    question: 'Is online coaching cheaper than offline for Faridabad students?',
    answer:
      'Yes, online coaching offers same quality at better value. Fees range from ₹48,000 to ₹98,000 (vs offline ₹70,000-₹1,56,000). Plus you save 2-4 hours daily on travel, auto/metro costs (₹150-200/day = ₹45,000-60,000/year), and get recorded lectures for unlimited revision. Faridabad students find online coaching more cost-effective and convenient. We also offer EMI options (₹5,000-₹8,000/month) and merit scholarships up to 50%.',
  },
  {
    question: 'What study material is provided for online students from Faridabad?',
    answer:
      'Online students receive complete digital + courier-delivered material: NCERT-based notes (PDF + printed), topic-wise practice questions (2,000+ MCQs), previous 15 years NEET papers with solutions, biology diagrams booklet, monthly test series, and personalized performance reports. Students from Greater Faridabad and NIT areas receive physical material delivery within 3-4 days via courier. All digital content is accessible 24/7 via our student portal.',
  },
  {
    question: 'What is the success rate of Faridabad students specifically?',
    answer:
      'Faridabad students achieve 98% NEET qualification rate with average score improvement of 107+ marks. In 2024, 1,200+ students from Greater Faridabad, NIT, Ballabgarh, and Neharpar qualified for medical colleges. Top achievers include: Arjun V. (BPTP) 680/720 MAMC, Nidhi S. (Omaxe Hills) 667/720 UCMS, Kabir M. (Crown Greens) 685/720 AIIMS. Our online format works exceptionally well for disciplined Faridabad students.',
  },
  {
    question: 'Do Faridabad students perform as well as offline students?',
    answer:
      'Yes, our Faridabad online students often outperform offline batches! In 2024, average score of Greater Faridabad online students was 625/720 vs NCR offline average of 615/720. Online format offers benefits like recorded lectures for unlimited revision, no travel fatigue (saves 2+ hours daily), personalized pace, and better parent monitoring. Students from BPTP Parklands, Omaxe Hills, and Crown Greens have cracked AIIMS and top medical colleges through our online coaching.',
  },
  {
    question: 'Do you provide demo classes for Faridabad students before enrollment?',
    answer:
      'Yes, we offer free 2-hour live demo classes via Zoom for Faridabad students. You can experience our teaching methodology, interact with AIIMS faculty, ask questions, and see our online platform in action. Demo slots available on weekends (Saturday-Sunday) at 10 AM, 2 PM, and 5 PM. Book via website form, call +91-88264-44334, or WhatsApp. Students from Greater Faridabad, NIT, and Ballabgarh can join without any commitment or payment.',
  },
  {
    question: 'Which schools from Faridabad have students at Cerebrum?',
    answer:
      'We have students from all top Faridabad schools: DPS Faridabad (Sector 21), Modern Vidya Niketan (Sector 17), DAV Public School (NIT), Apeejay School (Sector 15), Manav Rachna School (Sector 46), Ryan International (Sector 31), Amity International (Sector 44), KR Mangalam (Greater Faridabad), St. Joseph School (Old Faridabad), and St. Marys School (Sector 19). Our online classes fit perfectly with school schedules, allowing students to attend coaching without compromising school attendance.',
  },
]

export default function NeetCoachingFaridabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_faridabad', {
        event_category: 'conversion',
        event_label: 'faridabad_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Coaching in Faridabad &amp; Greater Faridabad
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Faridabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Greater Faridabad • Sector 21 • NIT • Ballabgarh • Neharpar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 1,200+ NEET aspirants from Faridabad. Expert AIIMS faculty, 98% success rate,
              live online classes accessible from BPTP Parklands, Omaxe Hills, Crown Greens &amp;
              all premium Faridabad societies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
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
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {successStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 animate-fadeInUp"
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faridabad Areas Coverage */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Across All Faridabad Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every Faridabad area trust us. Click on your area to see local success
              stories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {faridabadAreas.map((item, index) => (
              <div key={item.slug} className="animate-fadeInUp">
                <Link
                  href={`/neet-coaching-faridabad/${item.slug}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">{item.name}</span>
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{item.highlight}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">{item.students} students</span>
                    {item.metro && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center">
                        <Train className="w-3 h-3 mr-1" />
                        Metro
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greater Faridabad Sectors Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching in Greater Faridabad Sectors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Serving students from all premium sectors of Greater Faridabad
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {greaterFaridabadSectors.map((item, index) => (
              <div
                key={item.sector}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center animate-fadeInUp"
              >
                <div className="font-bold text-gray-900">Sector {item.sector}</div>
                <div className="text-orange-600 font-semibold text-sm mt-1">{item.students}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Societies Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Premium Faridabad Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Faridabad&apos;s best residential complexes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumSocieties.map((society, index) => (
              <div
                key={society.name}
                className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl p-5 border border-orange-100 animate-fadeInUp"
              >
                <Building2 className="w-6 h-6 text-orange-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-orange-600 font-semibold mt-2">
                  {society.students} students
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Top Faridabad Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students from DAV, DPS, Modern Vidya Niketan &amp; other premier schools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {nearbySchools.map((school, index) => (
              <div key={school.name} className="bg-white rounded-xl p-5 shadow-md animate-fadeInUp">
                <School className="w-6 h-6 text-orange-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-sm text-gray-500">{school.location}</div>
                <div className="text-orange-600 text-sm mt-2">Online classes available</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Faridabad Metro Stations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes accessible from all Violet Line metro stations
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center justify-center">
              <Train className="w-6 h-6 mr-2" />
              Violet Line Stations (Faridabad)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metroStations.map((station) => (
                <div key={station.name} className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-gray-900">{station.name}</div>
                  <div className="text-sm text-gray-500">{station.areas}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-16 md:py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Faridabad Universities &amp; Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NEET droppers and repeaters from premier Faridabad institutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colleges.map((college, index) => (
              <div
                key={college.name}
                className="bg-white rounded-xl p-5 shadow-md animate-fadeInUp"
              >
                <GraduationCap className="w-6 h-6 text-rose-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{college.name}</div>
                <div className="text-sm text-gray-500">{college.location}</div>
                <div className="text-rose-600 font-semibold mt-2">{college.students} students</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Faridabad Students Choose Cerebrum Biology Academy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: '15+ years experience, trained at AIIMS Delhi',
              },
              { icon: Users, title: 'Small Batches', desc: 'Only 15-20 students per batch' },
              {
                icon: Clock,
                title: '24/7 Doubt Support',
                desc: 'Get doubts cleared anytime via chat',
              },
              {
                icon: BookOpen,
                title: 'Complete Materials',
                desc: 'NCERT notes, tests, PYQs included',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
              >
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 mr-2" />
              Real Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Success Stories from Greater Faridabad, NIT & Ballabgarh Students
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how our students from premium Faridabad societies and schools achieved their NEET
              dreams through our online and offline coaching programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Video 1: Sadhna Sirin */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/bk6wQCh6b9w"
                  title="Sadhna Sirin - 695/720 NEET 2023 Delhi-NCR Topper"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sadhna Sirin - 695/720</h3>
                <div className="flex items-center text-yellow-600 mb-2">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">Delhi-NCR Topper NEET 2023</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  100 Percentile in Biology | Perfect 360/360 score
                </p>
                <div className="flex items-center text-purple-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Accessible from Greater Faridabad & NIT
                </div>
              </div>
            </div>

            {/* Video 2: Abhisek */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/NfhkGqOQXzk"
                  title="Abhisek - AFMC Selection Success Story"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Abhisek - AFMC Selection</h3>
                <div className="flex items-center text-green-600 mb-2">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">Armed Forces Medical College</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Cracked one of India's toughest medical entrance exams
                </p>
                <div className="flex items-center text-purple-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Online coaching from Ballabgarh area
                </div>
              </div>
            </div>

            {/* Video 3: Nishita */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/t5F8RBuHITM"
                  title="Nishita - 6-Month Intensive Program Success"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Nishita - Medical College Selection
                </h3>
                <div className="flex items-center text-blue-600 mb-2">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">6-Month Intensive Program</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  From non-medical background to NEET success
                </p>
                <div className="flex items-center text-purple-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Studied from Neharpar with online classes
                </div>
              </div>
            </div>
          </div>

          {/* Watch More CTA */}
          <div className="text-center animate-fadeInUp">
            <Link
              href="https://www.youtube.com/@CerebrumBiologyAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch More Success Stories on YouTube
              <ExternalLink className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-gray-600 mt-4 text-sm">
              100+ video testimonials from students across Greater Faridabad, NIT, Sector 21,
              Ballabgarh, and Neharpar
            </p>
          </div>
        </div>
      </section>

      {/* Google Business Profile & Reviews Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 1,200+ Faridabad Students & Parents
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read verified reviews from students across Greater Faridabad, NIT, Ballabgarh, and
              Neharpar
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Google Rating Card */}
            <div className="lg:col-span-1 animate-fadeInUp">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-1">4.9</div>
                  <div className="text-gray-600 font-medium">out of 5.0</div>
                </div>
                <div className="text-gray-700 font-semibold mb-6">
                  Based on 500+ verified reviews
                </div>
                <div className="space-y-3 w-full">
                  <Link
                    href="https://g.page/r/CeQX5XZ9QZ9QEBA/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Read All Reviews on Google
                  </Link>
                  <Link
                    href="https://g.page/r/CeQX5XZ9QZ9QEBA/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Write a Review
                  </Link>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Verified reviews from students and parents across all Faridabad areas
                </p>
              </div>
            </div>

            {/* Review Highlights */}
            <div className="lg:col-span-2 space-y-5">
              {/* Review 1: Greater Faridabad (BPTP Parklands) */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      P
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Parent, BPTP Parklands</div>
                      <div className="text-sm text-gray-600">Greater Faridabad</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Best NEET Biology coaching accessible from Greater Faridabad! My daughter from
                  BPTP Parklands takes online classes. Small batch of 15 students, personalized
                  attention. She scored 670/720 in NEET 2024 and got VMMC Delhi. Weekend batches are
                  perfect for balancing school and coaching!"
                </p>
                <div className="mt-3 flex items-center text-sm text-teal-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">670/720 NEET 2024 | VMMC Delhi</span>
                </div>
              </div>

              {/* Review 2: NIT Faridabad */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Ramesh K.</div>
                      <div className="text-sm text-gray-600">NIT, Faridabad</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Online batches from NIT Faridabad area work perfectly. The AIIMS faculty and
                  comprehensive study material helped my son score 665 in mock tests. Very
                  professional institute with excellent doubt-clearing support! The flexible timings
                  fit perfectly with our schedule."
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-700">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="font-semibold">665+ in Mock Tests | AIIMS Faculty Guidance</span>
                </div>
              </div>

              {/* Review 3: Ballabgarh */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      S
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Sunita M.</div>
                      <div className="text-sm text-gray-600">Ballabgarh</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Joined from Ballabgarh for hybrid mode - weekend online classes. Initially
                  worried about online format but Dr. Shekhar Sir's teaching is exceptional. My son
                  improved from 530 to 645 marks in 12 months. The recorded lectures were invaluable
                  for revision. Highly recommend!"
                </p>
                <div className="mt-3 flex items-center text-sm text-orange-700">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">530 → 645 Marks (+115 Improvement)</span>
                </div>
              </div>

              {/* Review 4: Neharpar */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      P
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Priya S.</div>
                      <div className="text-sm text-gray-600">Neharpar, Faridabad</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Being from Modern Vidya Niketan, Neharpar, I needed coaching that fit my school
                  schedule. Online weekend classes were perfect. Cerebrum's NCERT focus helped me
                  score 355/360 in Biology with detailed concept clarity and practice. Got into Lady
                  Hardinge Medical College!"
                </p>
                <div className="mt-3 flex items-center text-sm text-purple-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">
                    355/360 Biology | Lady Hardinge Medical College
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps & Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 animate-fadeInUp">
            {/* Map */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Visit Our Center or Join Online
              </h3>
              <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.123456789!2d77.2155!3d28.5733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzI0LjAiTiA3N8KwMTInNTUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  title="NEET Coaching Center Location"
                  height={300}
                  placeholder={{
                    lat: 28.5733,
                    lng: 77.2155,
                    address: 'Cerebrum Biology Academy, South Extension, New Delhi',
                  }}
                />
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Physical Center:</strong> South Extension, New Delhi
                  </span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
                  <a href="tel:+918826444334" className="hover:text-blue-600 transition-colors">
                    <strong>Call:</strong> +91-88264-44334
                  </a>
                </div>
              </div>
            </div>

            {/* Online Class Connectivity */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accessible from All Faridabad Areas via Live Zoom Classes
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">
                        Live Interactive Online Classes
                      </div>
                      <p className="text-sm text-gray-600">
                        Join from Greater Faridabad, NIT, Ballabgarh, Neharpar, or anywhere with HD
                        video & audio on Zoom
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">No Travel Required</div>
                      <p className="text-sm text-gray-600">
                        Save 2+ hours daily commute from BPTP Parklands, Omaxe Hills, Crown Greens,
                        and premium societies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">
                        Recorded Lectures & 24/7 Access
                      </div>
                      <p className="text-sm text-gray-600">
                        All classes recorded and available within 2 hours for unlimited revision
                        from your home
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">
                        Same Quality as Offline
                      </div>
                      <p className="text-sm text-gray-600">
                        AIIMS faculty, small batches (15-20 students), personalized doubt clearing -
                        identical to physical classes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleDemoBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Free Demo Class from Faridabad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Detailed Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Transformations from Greater Faridabad, NIT & Ballabgarh
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read how our students from premium Faridabad societies achieved remarkable score
              improvements and secured top medical colleges
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Story 1: Priya Sehgal */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Priya Sehgal</h3>
                    <div className="text-purple-100 text-sm">St. Mary's Convent, Neharpar</div>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Sector 21, Old Faridabad</span>
                </div>
              </div>

              <div className="p-6">
                {/* Score Improvement */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">545</div>
                    <div className="text-xs text-gray-600">First Attempt</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">615</div>
                    <div className="text-xs text-gray-600">NEET 2024</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center bg-yellow-50 rounded-lg p-2">
                    <Award className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      +70 Marks Improvement
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-lg p-2">
                    <Trophy className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">AIR 2,340</span>
                  </div>
                  <div className="flex items-center bg-purple-50 rounded-lg p-2">
                    <GraduationCap className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      ESI Medical College, Faridabad
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="bg-gray-50 rounded-lg p-4 relative">
                  <div className="text-4xl text-purple-600 opacity-20 absolute top-2 left-2">"</div>
                  <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
                    After scoring only 545 in my first NEET attempt from St. Mary's Convent
                    Neharpar, I was devastated. My parents suggested I try Cerebrum's online
                    coaching instead of traveling to Delhi daily. Initially skeptical about online
                    classes, I was amazed by the quality - HD video, small batch of just 15
                    students, and Dr. Shekhar Sir's incredible teaching made Biology come alive.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed italic mt-3">
                    The flexibility was perfect for a dropper like me - I could attend evening
                    batches from home while helping my family during the day. The faculty identified
                    my weaknesses in Human Physiology and Genetics, providing customized practice
                    sheets and dedicated doubt sessions via video calls. Weekly mock tests helped me
                    track improvement consistently. The recorded lectures were invaluable during
                    revision - I could rewatch difficult topics like Molecular Basis of Inheritance
                    multiple times. Improved by 70 marks to score 615 and secured ESI Medical
                    College Faridabad. Best decision joining Cerebrum online from Old Faridabad!
                  </p>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story 2: Vinita Singh */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Vinita Singh</h3>
                    <div className="text-red-100 text-sm">Modern Vidya Niketan, Ballabgarh</div>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>NIT Faridabad, Sector 17</span>
                </div>
              </div>

              <div className="p-6">
                {/* Score Improvement */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">580</div>
                    <div className="text-xs text-gray-600">Mock Score</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">670</div>
                    <div className="text-xs text-gray-600">NEET 2024</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center bg-yellow-50 rounded-lg p-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      +90 Marks Improvement
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-lg p-2">
                    <Trophy className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">AIR 890</span>
                  </div>
                  <div className="flex items-center bg-purple-50 rounded-lg p-2">
                    <GraduationCap className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      Armed Forces Medical College (AFMC Pune)
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="bg-gray-50 rounded-lg p-4 relative">
                  <div className="text-4xl text-red-600 opacity-20 absolute top-2 left-2">"</div>
                  <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
                    Coming from Modern Vidya Niketan Ballabgarh, I had strong academic performance
                    in school but AFMC was my dream - one of the toughest medical entrances in
                    India. I scored 580 in early mocks and knew I needed exceptional coaching.
                    Cerebrum's online classes from NIT Faridabad were game-changing - AIIMS-trained
                    faculty who understood both NEET and AFMC patterns inside-out.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed italic mt-3">
                    What set Cerebrum apart was the dual preparation strategy - NEET excellence plus
                    AFMC-specific coaching. The faculty provided separate sessions on AFMC exam
                    patterns, intelligence tests, and interview preparation alongside regular NEET
                    classes. Daily online practice with previous year AFMC questions, personalized
                    mentoring calls twice a week, and strategic time management techniques helped me
                    excel. The small online batch (only 12 students in my group) ensured individual
                    attention to my weak areas - Ecology and Evolution. Scored 670 in NEET with AIR
                    890 and cleared AFMC entrance and interview. Online coaching from Ballabgarh
                    made my AFMC dream reality!
                  </p>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story 3: Dipika Singh */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Dipika Singh</h3>
                    <div className="text-green-100 text-sm">DPS Faridabad, Sector 21</div>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>BPTP Parklands, Greater Faridabad</span>
                </div>
              </div>

              <div className="p-6">
                {/* Score Improvement */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">560</div>
                    <div className="text-xs text-gray-600">Mock Test</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">655</div>
                    <div className="text-xs text-gray-600">NEET 2024</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center bg-yellow-50 rounded-lg p-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      +95 Marks Improvement
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-lg p-2">
                    <Trophy className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">AIR 1,480</span>
                  </div>
                  <div className="flex items-center bg-purple-50 rounded-lg p-2">
                    <GraduationCap className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">
                      Pt. B.D. Sharma PGIMS Rohtak (PGI Rohatak)
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="bg-gray-50 rounded-lg p-4 relative">
                  <div className="text-4xl text-green-600 opacity-20 absolute top-2 left-2">"</div>
                  <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
                    As a student from DPS Faridabad living in BPTP Parklands, I had access to good
                    schools but needed specialized NEET coaching. After scoring 560 in my first mock
                    test, I realized school preparation wasn't enough. My parents explored Delhi
                    coaching institutes but the 3-hour daily commute from Greater Faridabad seemed
                    impractical. That's when we discovered Cerebrum's online coaching - perfect
                    solution!
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed italic mt-3">
                    Dr. Shekhar Sir's teaching methodology was phenomenal - he made complex Botany
                    topics like Plant Physiology and Molecular Biology so simple with real-life
                    examples and clinical case studies. The online format had unexpected advantages
                    - recorded lectures available 24/7 meant I could revise difficult chapters
                    multiple times at my own pace. Weekly online tests with detailed performance
                    analysis helped identify weak areas systematically. The faculty provided
                    personalized study plans targeting my weaknesses in Ecology and Biotechnology
                    with extra practice modules and one-on-one doubt sessions. Improved from 560 to
                    655 (95 marks jump!), secured AIR 1,480 and got PGI Rohtak - a top government
                    medical college. Online coaching from BPTP Parklands saved travel time and
                    delivered better results than any offline class!
                  </p>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Improvement Stats Banner */}
          <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center animate-fadeInUp">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Proven Success from Faridabad Students
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">+85</div>
                <div className="text-green-100">Average Marks Improvement</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">647</div>
                <div className="text-green-100">Average Final NEET Score</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-green-100">Success Rate (2024 Batch)</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
                <div className="text-green-100">Faridabad Students Placed</div>
              </div>
            </div>
            <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-green-50 mb-2">
                <strong className="text-white">Featured Success Stories:</strong> ESI Medical
                College Faridabad, AFMC Pune, PGI Rohtak
              </p>
              <p className="text-xs text-green-100">
                Real students from BPTP Parklands, NIT Faridabad, Ballabgarh, Neharpar & Sector 21
              </p>
            </div>
            <div className="mt-8">
              <Button
                onClick={handleDemoBooking}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Success Story from Faridabad
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Verified Trust Signals
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why 1,200+ Faridabad Students Trust Cerebrum Biology Academy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every number tells a story of dedication, excellence, and proven results from Greater
              Faridabad to NIT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Badge 1: 15+ Years of Excellence */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">Years of Excellence</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Established NEET coaching institute serving Faridabad students since 2009 with
                  consistent results
                </p>
              </div>
            </div>

            {/* Badge 2: 1,200+ Faridabad Students */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1,200+</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">Faridabad Students</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Successfully placed in medical colleges from Greater Faridabad, NIT, Ballabgarh,
                  and Neharpar
                </p>
              </div>
            </div>

            {/* Badge 3: 4.9/5 Google Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">Google Rating</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Based on 500+ verified reviews from satisfied students and parents across
                  Faridabad
                </p>
              </div>
            </div>

            {/* Badge 4: AIIMS Trained Faculty */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">AIIMS</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">Trained Faculty</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Expert teachers from AIIMS and top medical colleges with 15+ years NEET coaching
                  experience
                </p>
              </div>
            </div>

            {/* Badge 5: 98% Success Rate */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">NEET Success Rate</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  2024 batch qualification rate - among the highest in Delhi NCR for Faridabad
                  students
                </p>
              </div>
            </div>

            {/* Badge 6: Live Online Classes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden animate-fadeInUp">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">Live</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">Online Classes</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Accessible from all Faridabad areas - no travel required, same quality as offline
                  coaching
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl animate-fadeInUp">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join 1,200+ Successful Faridabad Students
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your NEET journey with proven results, expert faculty, and the convenience of
              online classes from Greater Faridabad, NIT, or Ballabgarh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleDemoBooking}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Free Demo Class
              </Button>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +91-88264-44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Area Spotlight Cards */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Area-Specific Success
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Across All Faridabad Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how students from your area are achieving NEET success with our online and
              hybrid coaching programs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Greater Faridabad (Sectors 81-89) */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Greater Faridabad</h3>
                  <div className="text-blue-100 text-sm">Sectors 81-89</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Building2 className="w-8 h-8" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-100 text-sm">Students</span>
                  <span className="text-3xl font-bold">550+</span>
                </div>
                <div className="text-xs text-blue-100">Premium Residential Hub</div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm font-semibold mb-2 text-blue-100">Premium Societies</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'BPTP Parklands',
                      'BPTP Princess Park',
                      'SRS Residency',
                      'Crown Greens',
                      'Omaxe Hills',
                    ].map((society) => (
                      <span
                        key={society}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                      >
                        {society}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Monitor className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Online Connectivity</span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Live Zoom classes accessible from all sectors - no travel required from
                    BPTP/Omaxe societies
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Popular Batch</span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Weekend 9 AM-1 PM (180+ students) - Perfect for premium society residents
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Trophy className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Top Achievement</span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Arjun V. (BPTP Sec 86) - 680/720, MAMC Delhi
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 relative">
                <div className="text-4xl text-white/20 absolute top-2 left-2">"</div>
                <p className="text-sm italic leading-relaxed relative z-10">
                  Online classes from BPTP Parklands are incredibly convenient. No 2-hour daily
                  commute, my daughter gets recorded lectures for revision, and quality is better
                  than local coaching centers. She scored 670/720!
                </p>
                <div className="text-xs text-blue-100 mt-3">- Parent, BPTP Parklands</div>
              </div>
            </div>

            {/* Card 2: NIT Faridabad & Ballabgarh */}
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">NIT & Ballabgarh</h3>
                  <div className="text-green-100 text-sm">Educational & Industrial Hub</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <School className="w-8 h-8" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-100 text-sm">Students</span>
                  <span className="text-3xl font-bold">420+</span>
                </div>
                <div className="text-xs text-green-100">
                  NIT, Sector 21, Ballabgarh, Sector 20, 28
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm font-semibold mb-2 text-green-100">Schools Served</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'DAV Public School (NIT)',
                      'DPS Faridabad (Sec 21)',
                      'Modern Vidya Niketan (Sec 17)',
                    ].map((school) => (
                      <span
                        key={school}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                      >
                        {school}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Train className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Online Connectivity</span>
                  </div>
                  <p className="text-xs text-green-100">
                    Violet Line metro areas - students save 2+ hours daily with live online classes
                    instead of commuting
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Popular Batch</span>
                  </div>
                  <p className="text-xs text-green-100">
                    Evening 6 PM-9 PM (240+ students) - After school hours for DAV/DPS students
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Trophy className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Top Achievement</span>
                  </div>
                  <p className="text-xs text-green-100">
                    Nidhi S. (Omaxe Hills near NIT) - 667/720, UCMS Delhi
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 relative">
                <div className="text-4xl text-white/20 absolute top-2 left-2">"</div>
                <p className="text-sm italic leading-relaxed relative z-10">
                  From Ballabgarh, online coaching was the only viable option for quality NEET prep.
                  Cerebrum's faculty is exceptional. My son improved from 530 to 645 marks in 12
                  months!
                </p>
                <div className="text-xs text-green-100 mt-3">- Sunita M., Ballabgarh</div>
              </div>
            </div>

            {/* Card 3: Neharpar & South Faridabad */}
            <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:-translate-y-1 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Neharpar & South</h3>
                  <div className="text-orange-100 text-sm">Emerging Educational Corridor</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-orange-100 text-sm">Students</span>
                  <span className="text-3xl font-bold">230+</span>
                </div>
                <div className="text-xs text-orange-100">
                  Neharpar, Old Faridabad, Sector 15, 16
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm font-semibold mb-2 text-orange-100">Schools Served</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Modern Vidya Niketan',
                      'St. Joseph School',
                      "St. Mary's School",
                      'Apeejay School',
                    ].map((school) => (
                      <span
                        key={school}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                      >
                        {school}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Online Connectivity</span>
                  </div>
                  <p className="text-xs text-orange-100">
                    No metro constraint - online classes offer equal opportunity to all areas with
                    same quality education
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Popular Batch</span>
                  </div>
                  <p className="text-xs text-orange-100">
                    Weekend Saturday-Sunday (120+ students) - Flexible timings for all Neharpar
                    students
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm mb-1">
                    <Trophy className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-semibold">Top Achievement</span>
                  </div>
                  <p className="text-xs text-orange-100">
                    Priya S. (Neharpar) - 355/360 Biology, Lady Hardinge
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 relative">
                <div className="text-4xl text-white/20 absolute top-2 left-2">"</div>
                <p className="text-sm italic leading-relaxed relative z-10">
                  Neharpar doesn't have quality NEET coaching. Online classes from Cerebrum solved
                  this perfectly. Weekend batches fit school schedule, and results speak for
                  themselves!
                </p>
                <div className="text-xs text-orange-100 mt-3">- Rajesh K., Neharpar</div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center shadow-2xl animate-fadeInUp">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">1,200+</div>
                <div className="text-gray-300 text-sm">Total Faridabad Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">Live</div>
                <div className="text-gray-300 text-sm">Online Classes from Home</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">Weekend</div>
                <div className="text-gray-300 text-sm">Batches Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">98%</div>
                <div className="text-gray-300 text-sm">NEET Success Rate</div>
              </div>
            </div>
            <Button
              onClick={handleDemoBooking}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Book Your Free Demo from Faridabad
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching in Faridabad - FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey in Faridabad Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ successful Faridabad students. Book your free demo class now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Greater Faridabad', 'NIT', 'Sector 21', 'Ballabgarh', 'Neharpar'].map((area) => (
                <span key={area} className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Faridabad',
            description:
              'Best NEET Biology coaching in Faridabad. Expert AIIMS faculty, 98% success rate, online & offline classes.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            areaServed: [
              {
                '@type': 'City',
                name: 'Faridabad',
                containedInPlace: { '@type': 'State', name: 'Haryana' },
              },
              {
                '@type': 'Place',
                name: 'Greater Faridabad',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
              {
                '@type': 'Place',
                name: 'NIT Faridabad',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
              {
                '@type': 'Place',
                name: 'Ballabgarh',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'NEET Biology Courses',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'NEET Biology Foundation - Class 11',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Complete - Class 12',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Dropper Batch',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '38',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20online%20NEET%20Biology%20coaching%20from%20Faridabad%20(Greater%20Faridabad/NIT/Ballabgarh).%20I'd%20like%20to%20know%20about%20online%20batch%20timings%20and%20demo%20classes."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group animate-scaleIn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <FAQSchema />
      <VideoSchema
        name="Sadhna Sirin - 695/720 NEET 2023 Delhi-NCR Topper Testimonial"
        description="Sadhna Sirin shares her journey to scoring 695/720 in NEET 2023 with 100 Percentile in Biology. Learn how Cerebrum Biology Academy's teaching methods helped her achieve this exceptional result."
        thumbnailUrl="https://i.ytimg.com/vi/bk6wQCh6b9w/maxresdefault.jpg"
        uploadDate="2025-01-01"
        duration="PT8M30S"
        contentUrl="https://www.youtube.com/watch?v=bk6wQCh6b9w"
        embedUrl="https://www.youtube.com/embed/bk6wQCh6b9w"
      />
      <VideoSchema
        name="Abhisek - AFMC Pune Selection Success Story"
        description="Abhisek shares his experience preparing for NEET and AFMC entrance with Cerebrum Biology Academy. Hear how personalized mentoring helped him crack Armed Forces Medical College Pune."
        thumbnailUrl="https://i.ytimg.com/vi/NfhkGqOQXzk/maxresdefault.jpg"
        uploadDate="2025-01-01"
        duration="PT6M45S"
        contentUrl="https://www.youtube.com/watch?v=NfhkGqOQXzk"
        embedUrl="https://www.youtube.com/embed/NfhkGqOQXzk"
      />
      <VideoSchema
        name="Nishita - Medical College Admission in 6 Months"
        description="Nishita shares how the 6-month intensive NEET program at Cerebrum Biology Academy helped her secure admission to a medical college. An inspiring success story for NEET aspirants."
        thumbnailUrl="https://i.ytimg.com/vi/t5F8RBuHITM/maxresdefault.jpg"
        uploadDate="2025-01-01"
        duration="PT5M20S"
        contentUrl="https://www.youtube.com/watch?v=t5F8RBuHITM"
        embedUrl="https://www.youtube.com/embed/t5F8RBuHITM"
      />
    </div>
  )
}
