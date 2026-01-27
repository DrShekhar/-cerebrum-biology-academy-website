'use client'

import { motion } from 'framer-motion'
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
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocalBusinessSchema, FAQSchema, BreadcrumbSchema, SpeakableSchema } from '@/components/seo/StructuredData'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'

const noidaSectors = [
  { sector: '18', area: 'Atta Market, Great India Place', students: '120+', metro: 'Sector 18' },
  { sector: '62', area: 'IT Hub, Coaching Center', students: '95+', metro: 'Sector 62' },
  { sector: '44', area: 'Golf Course, Premium Area', students: '65+', metro: 'Golf Course' },
  { sector: '137', area: 'IT/ITES Hub', students: '85+', metro: 'Sector 137' },
  { sector: '50', area: 'Residential Hub', students: '70+', metro: 'Sector 52' },
  { sector: '37', area: 'Family Area, Schools', students: '60+', metro: 'Sector 34' },
  { sector: '93', area: 'Expressway, Modern Apartments', students: '55+', metro: 'Sector 101' },
  { sector: '150', area: 'Ultra-Modern Development', students: '45+', metro: 'Sector 148' },
  { sector: '104', area: 'Supertech Supernova', students: '40+', metro: 'Sector 101' },
  { sector: '128', area: 'Corporate Offices', students: '35+', metro: 'Pari Chowk' },
  { sector: '15A', area: 'Established Premium', students: '50+', metro: 'Sector 15' },
  { sector: '168', area: 'Buddh Circuit Area', students: '30+', metro: null },
]

const premiumSocieties = [
  { name: 'Gaur City', location: 'Greater Noida West', students: '180+' },
  { name: 'ATS Pristine', location: 'Sector 150', students: '45+' },
  { name: 'Godrej Woods', location: 'Sector 43', students: '35+' },
  { name: 'Mahagun Moderne', location: 'Sector 78', students: '50+' },
  { name: 'Gulshan Dynasty', location: 'Sector 144', students: '40+' },
  { name: 'Jaypee Greens', location: 'Sector 128', students: '55+' },
  { name: 'Supertech Eco Village', location: 'Greater Noida West', students: '65+' },
  { name: 'Logix Blossom County', location: 'Sector 137', students: '30+' },
  { name: 'Ace City', location: 'Greater Noida West', students: '70+' },
  { name: 'Prateek Stylome', location: 'Sector 45', students: '25+' },
  { name: 'Eldeco Utopia', location: 'Sector 93A', students: '35+' },
  { name: 'Paras Tierea', location: 'Sector 137', students: '28+' },
]

const nearbySchools = [
  { name: 'DPS Noida', sector: '30', distance: '5 km' },
  { name: 'Amity International School', sector: '44', distance: '3 km' },
  { name: 'Lotus Valley International', sector: '126', distance: '8 km' },
  { name: 'Ryan International', sector: 'Multiple', distance: '2-6 km' },
  { name: 'Shiv Nadar School', sector: '168', distance: '12 km' },
  { name: 'Step by Step School', sector: '132', distance: '7 km' },
  { name: 'Pathways School', sector: '100', distance: '10 km' },
  { name: 'Cambridge School', sector: '27', distance: '4 km' },
  { name: 'Apeejay School', sector: '16A', distance: '3 km' },
  { name: 'JBM Global School', sector: '132', distance: '7 km' },
  { name: 'Khaitan Public School', sector: '40', distance: '4 km' },
  { name: 'Genesis Global School', sector: 'Alpha', distance: '15 km' },
]

const metroStations = [
  { name: 'Botanical Garden', line: 'Blue Line', areas: 'Sector 37, 38, 39' },
  { name: 'Noida City Centre', line: 'Blue Line', areas: 'Sector 32, 33, 34' },
  { name: 'Sector 18', line: 'Blue Line', areas: 'Atta Market, GIP Mall' },
  { name: 'Sector 62', line: 'Blue Line', areas: 'IT Hub, Coaching Hub' },
  { name: 'Sector 137', line: 'Aqua Line', areas: 'IT/ITES, Logix' },
  { name: 'Sector 142', line: 'Aqua Line', areas: 'Advant Navis' },
  { name: 'Sector 144', line: 'Aqua Line', areas: 'Gulshan Dynasty' },
  { name: 'Pari Chowk', line: 'Aqua Line', areas: 'Greater Noida' },
  { name: 'Knowledge Park II', line: 'Aqua Line', areas: 'Universities' },
  { name: 'Alpha 1', line: 'Aqua Line', areas: 'Greater Noida' },
]

const universities = [
  { name: 'Amity University', location: 'Sector 125', students: '200+' },
  { name: 'Sharda University', location: 'Greater Noida', students: '150+' },
  { name: 'Galgotias University', location: 'Greater Noida', students: '120+' },
  { name: 'Bennett University', location: 'Greater Noida', students: '80+' },
  { name: 'JIIT', location: 'Sector 62/128', students: '60+' },
  { name: 'GL Bajaj Institute', location: 'Greater Noida', students: '45+' },
]

const successStats = [
  { label: 'Noida Students', value: '1,200+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '850+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Noida?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching in Noida with 98% success rate. We have 1,200+ students from Sectors 18, 62, 137, 150 and all major Noida areas. Our AIIMS-trained faculty and small batch sizes (15-20 students) ensure personalized attention for every student.',
  },
  {
    question: 'Do you have coaching centers in different Noida sectors?',
    answer:
      'We offer both online and offline coaching accessible from all Noida sectors. Our online live classes are popular with students from Sector 18, 62, 137, 150, Greater Noida West (Gaur City, Ace City), and premium societies like ATS Pristine, Mahagun Moderne, and Jaypee Greens.',
  },
  {
    question: 'What are the fees for NEET coaching in Noida?',
    answer:
      'Our NEET Biology coaching fees range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000. All include AIIMS faculty and smaller batches.',
  },
  {
    question: 'Is online NEET coaching effective for Noida students?',
    answer:
      'Yes! Our online coaching is extremely effective with live interactive classes, 24/7 doubt support, and recorded sessions. Students from Gaur City, Sector 150, and remote areas prefer online classes for convenience while maintaining top results.',
  },
  {
    question: 'Do you provide coaching near Noida metro stations?',
    answer:
      'Our online classes are accessible from anywhere in Noida. Students near Sector 18, Sector 62, Botanical Garden, Sector 137, and all Aqua Line stations can join live classes from home with the same quality as physical coaching.',
  },
  {
    question: 'How do online classes work for Noida students?',
    answer:
      'Our live online classes run on Zoom with HD video and audio. Students from Sector 18, 62, 137, 150, Gaur City, and all Noida areas can join from home using laptop or tablet. Each class includes live teaching (3 hours), interactive doubt clearing (1 hour), and recorded playback available within 2 hours. Online batches maintain same small size (15-20 students) as offline classes. You get personalized attention, screen sharing for concepts, digital whiteboard, and ability to ask questions just like physical classes. Works perfectly for Greater Noida West students saving 3+ hours daily commute.',
  },
  {
    question: 'Which Noida areas and sectors do you serve?',
    answer:
      'We serve ALL Noida and Greater Noida areas through online classes: Sector 18 (Atta Market), Sector 62 (IT Hub), Sector 137 (Aqua Line), Sector 150, Sector 50, Sector 37, Greater Noida West (Gaur City, Ace City, Supertech Eco Village), and all premium societies including ATS Pristine, Mahagun Moderne, Jaypee Greens, Godrej Woods. Students near Blue Line (Botanical Garden, Noida City Centre) and Aqua Line (Sector 137, 144, Pari Chowk) metro stations can easily access online classes. Universities students from Amity, Sharda, Galgotias also join our dropper batches.',
  },
  {
    question: 'What are the batch timings for Noida students?',
    answer:
      'We offer flexible batch timings perfect for Noida students: Morning Batch: 6:00 AM - 9:00 AM (for early risers), Day Batch: 2:00 PM - 6:00 PM (for droppers), Evening Batch: 6:00 PM - 9:00 PM (for school students), Weekend Batch: Saturday-Sunday 9:00 AM - 1:00 PM. All batches available online. School students from DPS, Amity, Lotus Valley prefer evening batches (6-9 PM). Droppers and university students choose day batches (2-6 PM). Choose timing that fits your schedule best.',
  },
  {
    question: 'Can I join mid-session from Noida?',
    answer:
      "Yes, mid-session admissions are allowed with catch-up support. If you join late, we provide: Recorded lectures of missed classes (available within 24 hours), Extra doubt sessions to cover backlog topics, Personalized catch-up schedule by faculty, Previous week's study materials and practice sheets. Most Noida students join within first 2 months of session. Beyond that, we assess syllabus coverage and recommend appropriate batch. Call +91 88264 44334 to discuss your specific situation and get customized admission guidance.",
  },
  {
    question: 'Is online coaching cheaper than offline for Noida students?',
    answer:
      'Online and offline coaching fees are identical - you get same quality at same price. However, online students SAVE significantly on: Travel costs: ₹3,000-5,000/month saved (metro/auto from Gaur City, Sector 150), Time: 2-3 hours daily saved (equals 600-900 hours/year for focused study), Food/snacks: ₹2,000-3,000/month saved, Additional tuitions: Not needed due to comprehensive online doubt support. Total savings: ₹50,000-80,000/year for Greater Noida West students. Plus recorded lectures (₹15,000 value) included free for revision.',
  },
  {
    question: 'What study material is provided for online Noida students?',
    answer:
      'Complete digital + physical study material provided: NCERT Chapter Notes: Topic-wise summary with diagrams (PDF + printed), Practice Question Banks: 5,000+ MCQs, assertion-reason, case studies, Previous Year Papers: NEET 2013-2024 with solutions, Weekly Test Series: 40+ chapter tests + 10 full syllabus mocks, Revision Modules: Quick revision notes before NEET, Video Lectures: Recorded classes accessible 24/7. Material shipped to your Noida address (Gaur City, Sector 150, anywhere). Digital access immediate upon enrollment. Updated annually with latest NEET pattern.',
  },
  {
    question: 'What is the success rate of Noida students specifically?',
    answer:
      'Noida students success rate: 98% qualified NEET 2024 batch. Out of 1,200+ Noida students: 850+ qualified NEET (above cutoff), 420+ scored 600+ marks, 180+ secured government medical colleges, 95+ got AIIMS/JIPMER/top colleges. Average score improvement: +85 marks. Average final NEET score: 647/720. Students from Sector 18, 62, 137, Gaur City, Greater Noida West perform equally well in online batches. No difference between online vs offline results.',
  },
  {
    question: 'Do Noida online students perform as well as offline students?',
    answer:
      'YES! Online students actually perform slightly BETTER in some metrics: Online batch average: 625/720, Offline batch average: 615/720. Reasons for online success: Recorded lectures enable unlimited revision, Comfortable home environment reduces stress, No travel fatigue (3+ hours saved daily), Can rewatch difficult topics (Genetics, Evolution) multiple times, Better attendance (no metro delays, traffic issues). Over 60% of our 1,200+ Noida students now prefer online classes. Results prove online coaching is equally effective, sometimes superior for self-disciplined students.',
  },
  {
    question: 'Do you provide demo classes for Noida students?',
    answer:
      'Yes, FREE demo class available for all Noida students: Online Demo: Join live Zoom class (1 hour Biology lecture + 30 min doubt session), Offline Demo: Visit South Extension center (if from nearby sectors with metro access), Recorded Demo: Watch pre-recorded sample lecture anytime. Book demo via: Website: cerebrumbiologyacademy.com/demo-booking, Phone: +91 88264 44334, WhatsApp: Direct message button on website. Demo includes interaction with Dr. Shekhar Sir, sample study material, and counseling session.',
  },
  {
    question: 'Which schools from Noida have students at Cerebrum?',
    answer:
      'Students from ALL top Noida schools study with us: DPS Noida (Sector 30): 120+ students, Amity International (Sector 44): 95+ students, Lotus Valley International (Sector 126): 80+ students, Ryan International: 70+ students, Shiv Nadar School (Sector 168): 45+ students, Cambridge School (Sector 27): 65+ students, Apeejay School (Sector 16A): 50+ students, Step by Step School (Sector 132): 40+ students. Plus students from Pathways, JBM Global, Khaitan Public, Genesis Global. Online classes fit perfectly with school schedules.',
  },
]

export default function NeetCoachingNoidaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_noida', {
        event_category: 'conversion',
        event_label: 'noida_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Coaching in Noida &amp; Greater Noida
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Noida
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Sector 18 • Sector 62 • Sector 137 • Sector 150 • Greater Noida West
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 1,200+ NEET aspirants from Noida. Expert AIIMS faculty, 98% success rate, live
              online classes accessible from Gaur City, ATS Pristine, Mahagun Moderne, Jaypee Greens
              &amp; all premium Noida societies.
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {successStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6"
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Noida Sectors Coverage */}
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
              NEET Coaching Across All Noida Sectors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every Noida sector trust us. Click on your sector to see local success
              stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {noidaSectors.map((item, index) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/neet-coaching-noida/sector-${item.sector}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">Sector {item.sector}</span>
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{item.area}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">{item.students} students</span>
                    {item.metro && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                        <Train className="w-3 h-3 mr-1" />
                        Metro
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Societies Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Premium Noida Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Noida&apos;s best residential complexes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumSocieties.map((society, index) => (
              <motion.div
                key={society.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-green-50 rounded-xl p-5 border border-green-100"
              >
                <Building2 className="w-6 h-6 text-green-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-green-600 font-semibold mt-2">{society.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes Section - Online/Hybrid/Offline */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Monitor className="w-4 h-4" />
              Flexible Learning Options
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Learning Mode
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Study from your Noida home or visit our South Extension center - the choice is yours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Online Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition"
            >
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-slate-300 mb-4">Live interactive classes from your Noida home. No travel needed.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Live classes with Dr. Shekhar</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Instant doubt resolution</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Recorded lectures for revision</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Digital study material</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-yellow-400 font-semibold">Rs 45,000/year</span>
                <span className="text-slate-400 text-sm ml-2">Most Popular</span>
              </div>
            </motion.div>

            {/* Hybrid Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-yellow-500 rounded-2xl p-6 text-slate-900 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-slate-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-slate-700 mb-4">Online classes + Weekend offline sessions at South Extension.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />All online benefits included</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Weekend tests at center</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Face-to-face doubt sessions</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Peer learning environment</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-900/20">
                <span className="text-slate-900 font-semibold">Rs 55,000/year</span>
                <span className="text-slate-700 text-sm ml-2">Best Value</span>
              </div>
            </motion.div>

            {/* Offline Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition"
            >
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-slate-300 mb-4">Daily classes at our South Extension center, Delhi.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Regular classroom learning</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Small batch of 15 students</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Physical library access</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Daily doubt classes</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-yellow-400 font-semibold">Rs 65,000/year</span>
                <span className="text-slate-400 text-sm ml-2">Premium</span>
              </div>
            </motion.div>
          </div>

          {/* South Extension Center Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/5 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">South Extension Offline Center</h3>
                <p className="text-slate-300 mb-4">
                  Our flagship center in South Extension, Delhi is just 45-60 minutes from most Noida locations via Noida-Greater Noida Expressway.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1"><Train className="w-4 h-4 text-yellow-400" />Metro: AIIMS + Auto</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-yellow-400" />45-60 min from Noida</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-yellow-400" />M-Block, South Extension</span>
                </div>
              </div>
              <Link
                href="/locations/south-extension"
                className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
              >
                View Center Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Top Noida Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students from DPS, Amity, Lotus Valley, Ryan &amp; other premier schools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbySchools.map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <School className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900">{school.name}</div>
                <div className="text-sm text-gray-500">Sector {school.sector}</div>
                <div className="text-blue-600 text-sm mt-2">Online classes available</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Noida Metro Stations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes accessible from Blue Line &amp; Aqua Line metro corridors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Blue Line Stations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {metroStations
                  .filter((s) => s.line === 'Blue Line')
                  .map((station) => (
                    <div key={station.name} className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-500">{station.areas}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Aqua Line Stations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {metroStations
                  .filter((s) => s.line === 'Aqua Line')
                  .map((station) => (
                    <div key={station.name} className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-500">{station.areas}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 md:py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Noida Universities &amp; Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NEET droppers and repeaters from premier Noida institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900">{uni.name}</div>
                <div className="text-sm text-gray-500">{uni.location}</div>
                <div className="text-purple-600 font-semibold mt-2">{uni.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Noida Students Choose Cerebrum Biology Academy
            </h2>
          </motion.div>

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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 mr-2" />
              Real Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Success Stories from NEET Toppers & Medical College Admits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from our students who cracked NEET and secured top medical colleges.
              Accessible from all Noida sectors via online classes or Blue/Aqua Line metro. Every
              story is authentic, every achievement verified.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Video 1: Sadhna Sirin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Sadhna Sirin</h3>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Delhi-NCR Topper
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    695/720 NEET 2023
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    100 Percentile Biology
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Dr. Shekhar Sir's unique teaching methods helped me achieve perfection in
                  Biology. Perfect for students from Sector 18, 62, or taking online classes from
                  Gaur City."
                </p>
              </div>
            </motion.div>

            {/* Video 2: Abhisek */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/NfhkGqOQXzk"
                  title="Abhisek - AFMC Selection"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Abhisek</h3>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AFMC Pune
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    AFMC Selection 2023
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    Armed Forces Medical College
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Rigorous preparation and personal mentoring helped me crack AFMC. Online classes
                  saved 3+ hours daily for students from Greater Noida West and Sector 137."
                </p>
              </div>
            </motion.div>

            {/* Video 3: Nishita */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Nishita</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    6-Month Success
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    Medical College Selection
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    6-Month Transformation
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Intensive program transformed my Biology preparation completely. Flexible timings
                  perfect for students from DPS Noida, Amity, or anywhere in Noida via online."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Watch More CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
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
            <p className="text-sm text-gray-600 mt-4">
              Join students from Sector 18, 62, 137, 150, Gaur City, and all Noida areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Business Profile & Reviews Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 1,200+ Noida Students & Parents
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read verified reviews from students across Sector 18, 62, 137, 150, Gaur City, and all
              Noida areas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Google Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl sticky top-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <svg className="w-12 h-12" viewBox="0 0 48 48">
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-1">4.9</div>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
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
                    Verified reviews from students across all Noida sectors
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Review Highlights */}
            <div className="lg:col-span-2 space-y-5">
              {/* Review 1: DPS Noida Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Ananya, DPS Noida Sector 30</div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Best NEET Biology coaching accessible from Noida! I take online classes from my
                  home. Small batch of 15 students, personalized attention. Scored 662/720 in NEET
                  2024 and got UCMS Delhi. Metro connectivity from Sector 18 Blue Line makes it
                  convenient for offline students too!"
                </p>
                <div className="mt-3 flex items-center text-sm text-teal-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">662/720 NEET 2024 | UCMS Delhi</span>
                </div>
              </motion.div>

              {/* Review 2: Amity University Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Rohan K., Amity University Sector 125
                      </div>
                      <div className="text-sm text-gray-600">Dropper Batch Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Dropper batch student here. Online classes from Greater Noida worked perfectly.
                  AIIMS faculty and comprehensive study material helped me score 648 in NEET. The
                  flexible evening timings fit my repeat preparation schedule. Highly recommend for
                  Noida students!"
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-700">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="font-semibold">648/720 NEET 2024 | Excellent Faculty</span>
                </div>
              </motion.div>

              {/* Review 3: Gaur City Parent */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      S
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Sunita M., Parent from Gaur City
                      </div>
                      <div className="text-sm text-gray-600">Greater Noida West</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "My daughter from Gaur City Greater Noida West takes online classes. Went from 545
                  in mock tests to 625 in final NEET. The recorded lectures and doubt sessions till
                  late night were extremely helpful. Best investment for our child's future!"
                </p>
                <div className="mt-3 flex items-center text-sm text-orange-700">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">
                    545→625 Improvement | Government Medical College
                  </span>
                </div>
              </motion.div>

              {/* Review 4: Sector 62 Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      K
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Kavya S., Sector 62 Coaching Hub
                      </div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Perfect for Noida students - online classes save 2+ hours of daily travel. Scored
                  355/360 in Biology with focused preparation. Dr. Shekhar Sir's conceptual teaching
                  made Botany and Zoology easy. Weekly tests kept me on track."
                </p>
                <div className="mt-3 flex items-center text-sm text-purple-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">355/360 Biology | Perfect Biology Score</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Google Maps & Noida Connectivity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8"
          >
            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <LazyGoogleMap
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5351350896896!2d77.23806131508236!3d28.566682982448893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c16e000001%3A0x5027e47c24e3e43e!2sSouth%20Extension%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                title="NEET Coaching Center Location"
                height={300}
                placeholder={{
                  lat: 28.5667,
                  lng: 77.2381,
                  address: "Cerebrum Biology Academy, South Extension, New Delhi"
                }}
              />
            </div>

            {/* Metro Connectivity Benefits */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Noida Metro Connectivity & Online Classes
              </h3>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Blue Line Direct Access</div>
                    <p className="text-sm text-gray-600">
                      Direct metro from Sector 18, 62, Botanical Garden to South Extension (Jangpura
                      station). Travel time: 45 minutes from Sector 18.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Aqua Line Connectivity</div>
                    <p className="text-sm text-gray-600">
                      Students from Sector 137, 144, Greater Noida can switch to Blue Line at
                      Botanical Garden. Total: 60 minutes travel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Online Classes - Save 3+ Hours Daily
                    </div>
                    <p className="text-sm text-gray-600">
                      Live Zoom classes for Noida students - save 3+ hours daily commute from Gaur
                      City, Sector 150, Greater Noida West. Same quality as offline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Recorded Lectures 24/7</div>
                    <p className="text-sm text-gray-600">
                      All classes recorded and available within 2 hours for unlimited revision from
                      anywhere in Noida, Gaur City, or Greater Noida West.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleDemoBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Free Demo Class from Noida
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Success Stories Section - Phase 3 */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Detailed Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Transformations: From Struggle to Medical College Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read how our students achieved remarkable score improvements and secured top
              government medical colleges through personalized mentoring and strategic preparation
            </p>
          </motion.div>

          {/* 3 Success Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Story 1: Priya Sehgal - Purple-pink gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Priya Sehgal</div>
                    <div className="text-sm opacity-90">St. Mary&apos;s Convent</div>
                  </div>
                  <GraduationCap className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Before</div>
                    <div className="text-xl font-bold text-red-700">545</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">615</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +70 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 2,340
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ESI Medical
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-purple-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    After scoring only 545 in my first NEET attempt, I was devastated. My parents
                    suggested Cerebrum&apos;s online coaching instead of daily travel to coaching
                    centers. Initially skeptical about online classes, I was amazed by the quality -
                    HD video, small batch of just 15 students, and Dr. Shekhar Sir&apos;s incredible
                    teaching made Biology come alive.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    The flexibility was perfect for a dropper like me - I could attend evening
                    batches from home while managing other responsibilities. The faculty identified
                    my weaknesses in Human Physiology and Genetics, providing customized practice
                    sheets and dedicated doubt sessions via video calls. Weekly mock tests helped me
                    track improvement consistently. The recorded lectures were invaluable during
                    revision - I could rewatch difficult topics like Molecular Basis of Inheritance
                    multiple times. Improved by 70 marks to score 615 and secured ESI Medical
                    College. Best decision joining Cerebrum online!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 2: Vinita Singh - Red-orange gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Vinita Singh</div>
                    <div className="text-sm opacity-90">Modern Vidya Niketan</div>
                  </div>
                  <Trophy className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Mock</div>
                    <div className="text-xl font-bold text-red-700">580</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">670</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +90 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 890
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AFMC Pune
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-red-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    AFMC was my dream - one of the toughest medical entrances in India. I scored 580
                    in early mocks and knew I needed exceptional coaching. Cerebrum&apos;s online
                    classes were game-changing - AIIMS-trained faculty who understood both NEET and
                    AFMC patterns inside-out.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    What set Cerebrum apart was the dual preparation strategy - NEET excellence plus
                    AFMC-specific coaching. The faculty provided separate sessions on AFMC exam
                    patterns, intelligence tests, and interview preparation alongside regular NEET
                    classes. Daily online practice with previous year AFMC questions, personalized
                    mentoring calls twice a week, and strategic time management techniques helped me
                    excel. The small online batch (only 12 students in my group) ensured individual
                    attention to my weak areas - Ecology and Evolution. Scored 670 in NEET with AIR
                    890 and cleared AFMC entrance and interview. Online coaching made my AFMC dream
                    reality!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 3: Dipika Singh - Green-teal gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Dipika Singh</div>
                    <div className="text-sm opacity-90">DPS</div>
                  </div>
                  <Award className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Mock</div>
                    <div className="text-xl font-bold text-red-700">560</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">655</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +95 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 1,480
                  </div>
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
                    PGI Rohatak
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-green-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    I had access to good schools but needed specialized NEET coaching. After scoring
                    560 in my first mock test, I realized school preparation wasn&apos;t enough. My
                    parents explored coaching institutes but the 2-3 hour daily commute seemed
                    impractical. That&apos;s when we discovered Cerebrum&apos;s online coaching -
                    perfect solution!
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    Dr. Shekhar Sir&apos;s teaching methodology was phenomenal - he made complex
                    Botany topics like Plant Physiology and Molecular Biology so simple with
                    real-life examples and clinical case studies. The online format had unexpected
                    advantages - recorded lectures available 24/7 meant I could revise difficult
                    chapters multiple times at my own pace. Weekly online tests with detailed
                    performance analysis helped identify weak areas systematically. The faculty
                    provided personalized study plans targeting my weaknesses in Ecology and
                    Biotechnology with extra practice modules and one-on-one doubt sessions.
                    Improved from 560 to 655 (95 marks jump!), secured AIR 1,480 and got PGI Rohatak
                    - a top government medical college!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Proven Success Across All Batches
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">+85</div>
                <div className="text-sm md:text-base opacity-90">Average Marks Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">647</div>
                <div className="text-sm md:text-base opacity-90">Average Final NEET Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-sm md:text-base opacity-90">Success Rate (2024 Batch)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
                <div className="text-sm md:text-base opacity-90">Total Students Placed</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 mb-4">
                <p className="text-sm font-semibold">
                  Featured Colleges: ESI Medical College, AFMC Pune, PGI Rohatak
                </p>
              </div>
              <div>
                <Button
                  onClick={handleDemoBooking}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Success Story Today
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section - Phase 4 */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why 1,200+ Noida Students Trust Cerebrum Biology Academy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every credential verified, every promise delivered
            </p>
          </motion.div>

          {/* 6 Trust Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Badge 1: 15+ Years of Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Years of Excellence</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Established NEET coaching institute since 2009. Over a decade of proven track record
                helping thousands of students achieve medical college admissions through expert
                teaching methods.
              </p>
            </motion.div>

            {/* Badge 2: 1,200+ Noida Students */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-green-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">1,200+</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Noida Students Placed</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students from Sector 18, 62, 137, 150, Greater Noida West, Gaur City, and all
                premium societies trust us for NEET Biology excellence. Proven results across all
                Noida areas.
              </p>
            </motion.div>

            {/* Badge 3: 4.9/5 Google Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Google Rating</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Based on 500+ verified student and parent reviews. Students consistently praise
                teaching quality, study material, doubt resolution, and personalized attention that
                helped them achieve NEET goals.
              </p>
            </motion.div>

            {/* Badge 4: AIIMS Trained Faculty */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">AIIMS</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Faculty Excellence</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dr. Shekhar C Singh (AIIMS New Delhi Alumnus) leads our team. 15+ years of NEET
                coaching experience with deep understanding of exam patterns and high-yield topics.
              </p>
            </motion.div>

            {/* Badge 5: 98% Success Rate */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">
                NEET Qualification Rate
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                2024 batch success rate. 850+ students qualified NEET with our coaching, many
                securing ranks under 2000 AIR and admissions to AIIMS, JIPMER, and top government
                medical colleges.
              </p>
            </motion.div>

            {/* Badge 6: Live Online Classes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">LIVE</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">
                Online Classes Available
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                HD Zoom classes accessible from all Noida sectors. Small batches (15-20 students),
                live doubt clearing, recorded lectures, and same quality as offline coaching.
                Perfect for Gaur City, Sector 150, Greater Noida West students.
              </p>
            </motion.div>
          </div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join 1,200+ Successful Noida Students
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Start your NEET journey with expert guidance, proven methods, and personalized support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDemoBooking}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Free Demo Class
              </Button>
              <Link href="tel:+918826444334">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Area Spotlight Cards - Phase 7 */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Area-Wise Success
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Noida&apos;s Top NEET Coaching Hubs - Student Success by Area
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how students from your Noida area are excelling in NEET preparation. Each
              region has dedicated batch timings, local success stories, and metro connectivity
              details.
            </p>
          </motion.div>

          {/* 3 Area Spotlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Sector 18, 62 & Central Noida - Blue-purple gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    420+ students
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Sector 18, 62 & Central Noida</h3>
                <div className="space-y-1 text-sm opacity-90">
                  <div>• Sector 18 (Atta Market, Great India Place)</div>
                  <div>• Sector 62 (IT Hub, Coaching Center)</div>
                  <div>• Sectors 15A, 37, 50</div>
                  <div>• Nearby: Botanical Garden, Noida City Centre</div>
                </div>
              </div>

              {/* Card Body - White section */}
              <div className="bg-white p-6 space-y-4">
                {/* Metro Access */}
                <div>
                  <div className="flex items-center mb-2">
                    <Train className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="font-semibold text-gray-900">Metro Access</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Blue Line: Direct from Sector 18, 62, Botanical Garden to Jangpura (South
                    Extension). Travel time: 45 minutes.
                  </p>
                </div>

                {/* Popular Online Batch */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="font-semibold text-gray-900">Popular Online Batch</div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Evening 6 PM - 9 PM</strong> (240+ students)
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Perfect for DPS, Amity, Cambridge students</li>
                    <li>• Live classes + doubt sessions</li>
                    <li>• Recorded lectures by 11 PM same day</li>
                  </ul>
                </div>

                {/* Top Achievement */}
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="font-semibold text-gray-900 mb-1">Top Achievement</div>
                  <p className="text-sm text-gray-700">
                    <strong>Ananya M.</strong> - 662/720, UCMS Delhi
                  </p>
                  <p className="text-xs text-gray-500">From DPS Sector 30, online evening batch</p>
                </div>

                {/* Parent Testimonial */}
                <div className="bg-gray-50 rounded-lg p-4 italic text-sm text-gray-700">
                  &ldquo;My son from Sector 37 takes online evening classes. Saves 2 hours daily
                  commute, maintains school performance, and scored 635 in NEET. Perfect
                  balance!&rdquo;
                  <div className="text-xs text-gray-500 mt-2 not-italic">
                    - Rajesh K., Sector 37
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Greater Noida West (Gaur City, Ace City) - Green-teal gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    550+ students
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Greater Noida West (Gaur City, Ace City)
                </h3>
                <div className="space-y-1 text-sm opacity-90">
                  <div>• Gaur City (180+ students)</div>
                  <div>• Ace City (70+ students)</div>
                  <div>• Supertech Eco Village (65+ students)</div>
                  <div>• ATS Pristine, Gulshan Dynasty, Eldeco Utopia</div>
                </div>
              </div>

              {/* Card Body - White section */}
              <div className="bg-white p-6 space-y-4">
                {/* Metro Access */}
                <div>
                  <div className="flex items-center mb-2">
                    <Train className="w-5 h-5 text-green-600 mr-2" />
                    <div className="font-semibold text-gray-900">Metro Access</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    No direct metro (under construction). Online classes highly preferred - saves 4+
                    hours daily travel. Some use Pari Chowk (Aqua Line) but 1.5 hour commute.
                  </p>
                </div>

                {/* Popular Online Batch */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <div className="font-semibold text-gray-900">Popular Online Batch</div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Morning 6 AM - 9 AM</strong> (180+ students)
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Early risers batch for serious aspirants</li>
                    <li>• Fresh mind learning, productive mornings</li>
                    <li>• Afternoons free for self-study and practice</li>
                  </ul>
                </div>

                {/* Top Achievement */}
                <div className="border-l-4 border-green-600 pl-4">
                  <div className="font-semibold text-gray-900 mb-1">Top Achievement</div>
                  <p className="text-sm text-gray-700">
                    <strong>Rohan K.</strong> - 648/720, Government Medical College
                  </p>
                  <p className="text-xs text-gray-500">
                    From Gaur City, morning online batch, dropper
                  </p>
                </div>

                {/* Student Testimonial */}
                <div className="bg-gray-50 rounded-lg p-4 italic text-sm text-gray-700">
                  &ldquo;From Gaur City, traveling to Delhi was impossible (4 hours daily). Online
                  morning batch was game-changer - scored 625 from home!&rdquo;
                  <div className="text-xs text-gray-500 mt-2 not-italic">
                    - Sunita M., Gaur City parent
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Sector 137, 144, 150 & Aqua Line Corridor - Orange-yellow gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    230+ students
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Sector 137, 144, 150 & Aqua Line Corridor
                </h3>
                <div className="space-y-1 text-sm opacity-90">
                  <div>• Sector 137 (IT/ITES Hub, Logix Blossom)</div>
                  <div>• Sector 144 (Gulshan Dynasty)</div>
                  <div>• Sector 150 (ATS Pristine, Ultra-modern)</div>
                  <div>• Sector 128, 93A (Jaypee Greens, Eldeco)</div>
                </div>
              </div>

              {/* Card Body - White section */}
              <div className="bg-white p-6 space-y-4">
                {/* Metro Access */}
                <div>
                  <div className="flex items-center mb-2">
                    <Train className="w-5 h-5 text-orange-600 mr-2" />
                    <div className="font-semibold text-gray-900">Metro Access</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Aqua Line: Sector 137, 142, 144, 148 stations. Switch to Blue Line at Botanical
                    Garden (15 min). Total: 60 minutes to South Extension. Online preferred for
                    time-saving.
                  </p>
                </div>

                {/* Popular Online Batch */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-orange-600 mr-2" />
                    <div className="font-semibold text-gray-900">Popular Online Batch</div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Weekend Saturday-Sunday 9 AM - 1 PM</strong> (120+ students)
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 4-hour intensive sessions</li>
                    <li>• Perfect for working parents&apos; children</li>
                    <li>• Full week for self-study, weekends for expert guidance</li>
                  </ul>
                </div>

                {/* Top Achievement */}
                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="font-semibold text-gray-900 mb-1">Top Achievement</div>
                  <p className="text-sm text-gray-700">
                    <strong>Kavya S.</strong> - 355/360 Biology (98.6%), AIR Top 500
                  </p>
                  <p className="text-xs text-gray-500">From Sector 62, weekend online batch</p>
                </div>

                {/* Parent Testimonial */}
                <div className="bg-gray-50 rounded-lg p-4 italic text-sm text-gray-700">
                  &ldquo;Weekend batch from Sector 150 perfect! My daughter balances school (Amity)
                  with NEET prep. Scored 640 without stress.&rdquo;
                  <div className="text-xs text-gray-500 mt-2 not-italic">
                    - Meera P., ATS Pristine
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
                <div className="text-sm md:text-base opacity-90">Total Noida Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">420</div>
                <div className="text-sm md:text-base opacity-90">Live Online Batches</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">180+</div>
                <div className="text-sm md:text-base opacity-90">Weekend Batch Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-sm md:text-base opacity-90">Success Rate (2024)</div>
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={handleDemoBooking}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Your Free Demo from Noida
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching in Noida - FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey in Noida Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ successful Noida students. Book your free demo class now!
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
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Sector 18', 'Sector 62', 'Sector 137', 'Sector 150', 'Greater Noida West'].map(
                (area) => (
                  <span key={area} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {area}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Noida',
            description:
              'Best NEET Biology coaching in Noida. Expert AIIMS faculty, 98% success rate, online & offline classes.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            areaServed: [
              {
                '@type': 'City',
                name: 'Noida',
                containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' },
              },
              {
                '@type': 'City',
                name: 'Greater Noida',
                containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' },
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
              ratingValue: '4.9',
              reviewCount: '1200',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* WhatsApp Floating Button - Phase 6 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      >
        {/* Hover Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900" />
          </div>
        </div>

        {/* WhatsApp Button */}
        <Link
          href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20NEET%20Biology%20coaching%20for%20Noida%20students.%20I'd%20like%20to%20know%20about%20live%20online%20class%20timings%2C%20batch%20dates%2C%20fees%2C%20and%20demo%20classes.%20I'm%20from%20Noida."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
        </Link>
      </motion.div>

      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <FAQSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'NEET Coaching', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
        ]}
      />
      <SpeakableSchema
        name="NEET Coaching in Noida"
        description="Best NEET Biology coaching for Noida students. Online classes with optional offline at South Extension. Serving all premium societies and high-rises."
        speakableSelectors={['h1', '.quick-answer', '.hero-description']}
        url="https://cerebrumbiologyacademy.com/neet-coaching-noida"
      />

      {/* Noida Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-noida#service',
            name: 'NEET Biology Coaching Noida',
            description: 'Online NEET Biology coaching for Noida students with optional offline classes at South Extension, Delhi. Serving Gaur City, ATS Pristine, Jaypee Greens, and all premium societies.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
            areaServed: [
              { '@type': 'City', name: 'Noida', containedIn: { '@type': 'State', name: 'Uttar Pradesh' } },
              { '@type': 'City', name: 'Greater Noida', containedIn: { '@type': 'State', name: 'Uttar Pradesh' } },
            ],
            serviceType: 'Online NEET Coaching with Hybrid Option',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
              servicePhone: '+918826444334',
              availableLanguage: ['English', 'Hindi'],
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Online NEET Biology Classes',
                description: 'Live interactive online classes from home',
                price: '45000',
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                name: 'Hybrid Mode (Online + Weekend Offline)',
                description: 'Online classes with weekend offline sessions at South Extension',
                price: '55000',
                priceCurrency: 'INR',
              },
            ],
          }),
        }}
      />

      {/* Topic Cluster Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'NEET Coaching Noida - Related Resources',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Online NEET Classes Noida', url: 'https://cerebrumbiologyacademy.com/online-neet-classes-noida' },
              { '@type': 'ListItem', position: 2, name: 'NEET Coaching Fee Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-noida' },
              { '@type': 'ListItem', position: 3, name: 'Gaur City NEET Coaching', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gaur-city-noida' },
              { '@type': 'ListItem', position: 4, name: 'How to Prepare for NEET in Noida', url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-noida' },
              { '@type': 'ListItem', position: 5, name: 'South Extension Offline Center', url: 'https://cerebrumbiologyacademy.com/locations/south-extension' },
            ],
          }),
        }}
      />
    </div>
  )
}
