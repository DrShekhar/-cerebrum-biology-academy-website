'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  Award,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  Calculator,
  Target,
  Car,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Sector 34 Chandigarh area). Please share details.'
)

const nearbySectors = [
  { name: 'Sector 34', students: '85+', highlight: 'Coaching Hub', priority: 'high', distance: '0 km' },
  { name: 'Sector 35', students: '70+', highlight: 'Adjacent Sector', priority: 'high', distance: '1 km' },
  { name: 'Sector 22', students: '65+', highlight: 'Commercial Hub', priority: 'high', distance: '2 km' },
  { name: 'Sector 17', students: '80+', highlight: 'City Center', priority: 'high', distance: '3 km' },
  { name: 'Sector 44', students: '55+', highlight: 'Premium Area', priority: 'medium', distance: '2 km' },
  { name: 'Manimajra', students: '60+', highlight: 'Growing Hub', priority: 'medium', distance: '4 km' },
  { name: 'Sector 43', students: '45+', highlight: 'Residential', priority: 'medium', distance: '1.5 km' },
  { name: 'Sector 32', students: '40+', highlight: 'Near PGI', priority: 'medium', distance: '2 km' },
]

const competitorInfo = [
  {
    name: 'Allen Career Institute',
    location: 'SCO 350-352, Sector 34',
    batchSize: '60-100+ students',
    fees: 'Rs 1.5-2.5 Lakhs/year',
    issue: 'Overcrowded batches, long waiting times',
  },
  {
    name: 'Aakash Institute',
    location: 'Near Sector 34 Market',
    batchSize: '80-120+ students',
    fees: 'Rs 1-3.5 Lakhs/year',
    issue: 'Mass coaching approach, less personal attention',
  },
  {
    name: 'Physics Wallah Center',
    location: 'Sector 34-C',
    batchSize: '50-80+ students',
    fees: 'Rs 50K-1.5 Lakhs/year',
    issue: 'New center, limited track record in Chandigarh',
  },
]

const cerebrumAdvantages = [
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'AIIMS-trained faculty (not just MBBS)', icon: Award },
  { point: 'No commute - learn from home', icon: Car },
  { point: 'Fees: Rs 24,000 - 68,000 only', icon: TrendingUp },
  { point: '94.2% success rate', icon: Trophy },
  { point: 'Instant doubt resolution via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online coaching. No need to sit in crowded Sector 34 classrooms.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Unlike 100+ student batches at Allen/Aakash. Every doubt gets addressed.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Faculty trained at AIIMS Delhi, not just MBBS graduates teaching part-time.',
  },
  {
    icon: Car,
    title: 'Skip the Traffic',
    description: 'No more 30-60 min commute to Sector 34. Study from home comfort.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, evening batches. Work around your school schedule.',
  },
  {
    icon: Shield,
    title: 'Better Results, Lower Fees',
    description: '94.2% success rate at 1/4th the fees of Sector 34 coaching centers.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Sector 34 Area Students', value: '320+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const problemsWithSector34 = [
  { problem: 'Parking nightmare - Rs 50-100 daily', icon: Car },
  { problem: 'Crowded batches - 60-120 students', icon: Users },
  { problem: 'High fees - Rs 1.5-3.5 Lakhs', icon: AlertTriangle },
  { problem: '30-60 min commute from nearby sectors', icon: Clock },
  { problem: 'Less personal attention from faculty', icon: XCircle },
  { problem: 'Fixed timings - miss school or coaching', icon: Clock },
]

const faqs = [
  {
    question: 'Why is Sector 34 called the coaching hub of Chandigarh?',
    answer:
      'Sector 34 Chandigarh has the highest concentration of coaching institutes including Allen (SCO 350-352), Aakash, Physics Wallah, and 50+ smaller centers. However, this has led to overcrowding, parking issues, and inflated fees. Cerebrum offers the same quality education online without these hassles.',
  },
  {
    question: 'Which is better for NEET - Allen Sector 34 or Cerebrum online?',
    answer:
      'Allen Sector 34 (SCO 350-352) has 60-100+ students per batch with fees of Rs 1.5-2.5 lakhs. Cerebrum has 10-15 students per batch with AIIMS faculty and fees of Rs 24K-68K. Our 94.2% success rate matches Allen\'s results. The key difference: personalized attention and no commute stress.',
  },
  {
    question: 'Is Aakash Sector 34 worth the fees for NEET coaching?',
    answer:
      'Aakash near Sector 34 charges Rs 1-3.5 lakhs with 80-120 students per batch. While they have good infrastructure, the personal attention suffers. Cerebrum offers AIIMS-trained faculty (better than most Aakash teachers), smaller batches, and saves you 1-2 hours daily commute. Results are comparable at 1/4th the fees.',
  },
  {
    question: 'How far is Sector 34 from nearby sectors for coaching?',
    answer:
      'From Sector 17: 3 km (15-20 min). From Sector 22: 2 km (10-15 min). From Sector 35: 1 km (5 min). From Sector 44: 2 km (10 min). From Manimajra: 4 km (20-25 min). With our online classes, distance becomes irrelevant - save 30-60 min daily commute time for extra study.',
  },
  {
    question: 'What are the parking charges near Sector 34 coaching centers?',
    answer:
      'Parking in Sector 34 costs Rs 20-50 for two-wheelers and Rs 50-100 for cars per visit. Monthly parking passes cost Rs 1000-2000. Over a year, this adds Rs 12,000-24,000 to your coaching expenses. With Cerebrum online coaching, parking cost is zero!',
  },
  {
    question: 'Do students from Sector 17, 22, 35 need to travel to Sector 34 for NEET coaching?',
    answer:
      'Not anymore! Cerebrum brings Sector 34-quality NEET coaching to your home. 80+ students from Sector 17, 65+ from Sector 22, and 70+ from Sector 35 have switched to our online classes. Same AIIMS faculty, better attention, no commute required.',
  },
  {
    question: 'Is Physics Wallah center in Sector 34 good for NEET?',
    answer:
      'Physics Wallah opened their Sector 34-C center recently with 50-80 students per batch. While their fees (Rs 50K-1.5L) are lower than Allen/Aakash, they lack local track record. Cerebrum has 5+ years of proven results in Chandigarh with 94.2% success rate and even smaller batch sizes.',
  },
  {
    question: 'What is the best time to attend coaching in Sector 34?',
    answer:
      'Sector 34 coaching centers are most crowded between 4-8 PM. Morning batches (8-10 AM) have parking issues due to office traffic. With Cerebrum online, you can choose any slot - 7 AM, 2 PM, 6 PM, or weekend batches. Your convenience, your time.',
  },
  {
    question: 'How much can I save by choosing online over Sector 34 coaching?',
    answer:
      'Annual savings: Fees (Rs 1-2.5 lakhs vs Rs 24K-68K = save Rs 76K-1.8L), Commute (Rs 15K-30K saved), Parking (Rs 12K-24K saved), Food outside (Rs 20K+ saved). Total annual savings: Rs 1.2 - 2.5 lakhs while getting better personalized attention!',
  },
  {
    question: 'Do Manimajra students go to Sector 34 for NEET coaching?',
    answer:
      'Many Manimajra students commute 20-25 minutes to Sector 34 daily. 60+ Manimajra students have switched to Cerebrum online coaching. They save 40-50 minutes daily commute, get smaller batch attention, and have more time for self-study.',
  },
  {
    question: 'What is the success rate of Sector 34 coaching centers vs Cerebrum?',
    answer:
      'Allen Sector 34 claims 85-90% success rate, Aakash claims similar. Cerebrum has verified 94.2% success rate. The difference: our small batches ensure every student gets attention, not just toppers. We track progress weekly and intervene early for struggling students.',
  },
  {
    question: 'Can I get demo class before deciding between Sector 34 centers and Cerebrum?',
    answer:
      'Absolutely! We offer free demo classes - experience our teaching quality before deciding. Most Sector 34 centers charge Rs 500-1000 for trial classes. WhatsApp us at 88264-44334 or book through our website. See the difference in attention and quality yourself.',
  },
  {
    question: 'Which schools in Sector 34 area send students to your coaching?',
    answer:
      'Students from St. John\'s High School, Carmel Convent, DAV Sector 15, Government Model School Sector 35, Bhavan Vidyalaya, and schools from Sector 17, 22, 44, Manimajra join us. Our flexible online timings work with all school schedules.',
  },
  {
    question: 'Is online NEET coaching as effective as classroom coaching in Sector 34?',
    answer:
      'Our 94.2% success rate proves it! Live interactive classes (not recorded), instant doubt resolution, smaller batches mean better attention. 320+ students from Sector 34 area have chosen us over crowded offline centers. Many Allen/Aakash dropouts improved 100+ marks with us.',
  },
  {
    question: 'What if I face technical issues during online classes?',
    answer:
      'All classes are recorded and available within 2 hours. WhatsApp support available 8 AM - 10 PM. Technical team resolves issues within 30 minutes. Even if you miss a class, catch up with recordings. This flexibility is impossible in Sector 34 physical coaching.',
  },
]

const premiumSchools = [
  'St. Johns High School',
  'Carmel Convent School',
  'DAV Sector 15',
  'Bhavan Vidyalaya',
  'Govt Model School Sec 35',
  'Vivek High School',
  'St. Kabir Public School',
  'AKSIPS Schools',
  'DPS Chandigarh',
  'Strawberry Fields High',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function NEETCoachingSector34Page() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'sector_34_chandigarh_neet_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Chandigarh Sector 34"
        citySlug="chandigarh-sector-34"
        state="Chandigarh"
        localities={nearbySectors.map((l) => l.name)}
        faqs={faqs}
        studentCount="320"
        coordinates={{ lat: '30.7281', lng: '76.7679' }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Sector 34 - Chandigarh&apos;s Coaching Hub
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#4ade80]">NEET Coaching in Sector 34</span> Chandigarh
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Skip the Traffic. Skip the Crowd. Skip High Fees.
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why fight for parking at SCO 350-352? Get better NEET coaching online. 94.2% success rate,
              AIIMS faculty, batches of 10-15 students. Same quality as Allen/Aakash at 1/4th the fees!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90 mb-12">
              <Phone className="w-5 h-5" />
              <span>Or call us: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems with Sector 34 Coaching */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Problems with Sector 34 Coaching Centers
            </h2>
            <p className="text-xl text-gray-600">What students face daily at crowded coaching institutes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsWithSector34.map((item, index) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{item.problem}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cerebrum Solution */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Cerebrum Advantage
            </h2>
            <p className="text-xl text-gray-600">Same quality, better attention, lower fees, no commute</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cerebrumAdvantages.map((item, index) => (
              <motion.div
                key={item.point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{item.point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Sector 34 Coaching Centers vs Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Allen, Aakash, Physics Wallah - all have centers in Sector 34. See how we compare.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {competitorInfo.map((competitor, index) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{competitor.name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{competitor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{competitor.batchSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{competitor.fees}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-red-600">{competitor.issue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cerebrum Comparison Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Cerebrum Biology Academy</h3>
              <p className="text-white/80">The smart alternative to Sector 34 coaching</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                <div className="font-bold">10-15 Students</div>
                <div className="text-sm opacity-80">per batch</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                <div className="font-bold">Rs 24K-68K</div>
                <div className="text-sm opacity-80">annual fees</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                <div className="font-bold">AIIMS Faculty</div>
                <div className="text-sm opacity-80">not just MBBS</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                <div className="font-bold">94.2% Success</div>
                <div className="text-sm opacity-80">verified rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all hover:scale-105"
              >
                <tool.icon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/neet-tools">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1e3a5f]"
              >
                View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Students from Sectors Near Sector 34
            </h2>
            <p className="text-xl text-gray-600">
              No more commuting to Sector 34 - join from your sector
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbySectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${sector.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{sector.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{sector.students}</div>
                  <div className="text-sm text-gray-500 mb-2">{sector.highlight}</div>
                  <div className="text-xs text-gray-400">
                    {sector.distance} from Sector 34 (saved daily!)
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us Over Sector 34 Centers
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Schools Near Sector 34 Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school) => (
                <span
                  key={school}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Save Rs 1-2.5 Lakhs Annually
            </h2>
            <p className="text-xl text-gray-600">Complete cost comparison: Sector 34 vs Cerebrum</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sector 34 Costs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <XCircle className="w-6 h-6 text-red-500 mr-2" />
                Sector 34 Coaching (Annual)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Coaching Fees</span>
                  <span className="font-bold">Rs 1.5-3.5 Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>Commute (Petrol/Transport)</span>
                  <span className="font-bold">Rs 15,000-30,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking</span>
                  <span className="font-bold">Rs 12,000-24,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Outside Food</span>
                  <span className="font-bold">Rs 20,000+</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-red-600">Rs 2-4 Lakhs+</span>
                </div>
              </div>
            </motion.div>

            {/* Cerebrum Costs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Cerebrum Online (Annual)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Coaching Fees</span>
                  <span className="font-bold">Rs 24,000-68,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Commute</span>
                  <span className="font-bold text-green-600">Rs 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking</span>
                  <span className="font-bold text-green-600">Rs 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Food (Home)</span>
                  <span className="font-bold text-green-600">Rs 0 extra</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-green-600">Rs 24K-68K only</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-8 p-6 bg-[#1e3a5f] rounded-xl text-white"
          >
            <div className="text-3xl font-bold mb-2">You Save: Rs 1.2 - 3.5 Lakhs</div>
            <div className="text-white/80">Plus 300-500 hours of commute time for extra study!</div>
          </motion.div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Sector 34 Chandigarh
            </h2>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  className="text-xl font-bold text-gray-900 mb-4 flex items-start"
                  itemProp="name"
                >
                  <MessageCircle className="w-6 h-6 mr-3 text-[#1e3a5f] flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-700 leading-relaxed ml-9" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Skip Sector 34 Chaos. Get Better Results.
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 320+ students from Sector 34 area. 94.2% success rate. Save Rs 1-2.5 Lakhs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-[#1e3a5f] hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" />
              <span>Call: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb for SEO */}
      <section className="py-4 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#1e3a5f]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-chandigarh" className="hover:text-[#1e3a5f]">NEET Coaching Chandigarh</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Sector 34</span>
          </nav>
        </div>
      </section>
    </div>
  )
}
