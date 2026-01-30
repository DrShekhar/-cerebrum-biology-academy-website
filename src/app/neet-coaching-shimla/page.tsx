'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  Target,
  Car,
  TrendingUp,
  Laptop,
  School,
  Mountain,
  Snowflake,
  Bus,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Shimla, Himachal Pradesh). Please share details about online classes.'
)

const shimlaAreas = [
  { name: 'Mall Road', students: '45+', highlight: 'City Center', priority: 'high' },
  { name: 'Lakkar Bazaar', students: '40+', highlight: 'IGMC Area', priority: 'high' },
  { name: 'Sanjauli', students: '35+', highlight: 'University Area', priority: 'high' },
  { name: 'Chhota Shimla', students: '30+', highlight: 'Residential Hub', priority: 'medium' },
  { name: 'Khalini', students: '25+', highlight: 'Growing Area', priority: 'medium' },
  { name: 'Kasumpti', students: '20+', highlight: 'Commercial Zone', priority: 'medium' },
  { name: 'Kufri', students: '15+', highlight: 'Tourist Area', priority: 'low' },
  { name: 'Solan', students: '50+', highlight: 'Nearby District', priority: 'high' },
]

const whyOnlineForShimla = [
  { problem: 'Hilly terrain makes daily commute exhausting', icon: Mountain },
  { problem: 'Limited quality coaching in hill capital', icon: Building },
  { problem: '350km+ travel to Chandigarh/Delhi for coaching', icon: Car },
  { problem: 'Harsh winters disrupt offline classes', icon: Snowflake },
  { problem: 'Public transport unreliable in hills', icon: Bus },
  { problem: 'Students miss school for coaching travel', icon: Clock },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty accessible in Shimla hills', icon: Award },
  { point: 'No 350km Chandigarh/Delhi commute needed', icon: Laptop },
  { point: 'Study from home - rain, snow, or shine', icon: Snowflake },
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'Save Rs 2 lakh+ yearly on hostel', icon: TrendingUp },
  { point: '24/7 doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions. Perfect IGMC Shimla preparation from your mountain home.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Shimla student. Personal mentoring included.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - not available anywhere in Himachal Pradesh.',
  },
  {
    icon: Mountain,
    title: 'Hill Station Friendly',
    description: 'Weather-proof learning. No classes cancelled due to snow or landslides.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - all included.',
  },
  {
    icon: Target,
    title: 'IGMC & AIIMS Bilaspur Focus',
    description: 'Special prep for HP quota seats - IGMC Shimla (120), AIIMS Bilaspur.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'HP Students', value: '180+', icon: Users },
  { label: 'Avg Score Improvement', value: '+112', icon: TrendingUp },
  { label: 'IGMC Selections', value: '22+', icon: Award },
]

const shimlaSchools = [
  'Bishop Cotton School',
  'Auckland House School',
  'St. Edward\'s School',
  'Loreto Convent Tara Hall',
  'DAV Public School Lakkar Bazaar',
  'Kendriya Vidyalaya Jakhoo',
  'St. Thomas School',
  'Himachal Pradesh University School',
  'Sanjauli School',
  'JNV Shimla',
]

const medicalColleges = [
  { name: 'IGMC Shimla', distance: '0 km', seats: '120', quota: 'HP State (102) + AIQ (18)' },
  { name: 'AIIMS Bilaspur', distance: '90 km', seats: '100', quota: 'All India Quota' },
  { name: 'Dr. RPGMC Tanda', distance: '250 km', seats: '150', quota: 'HP State Quota' },
  { name: 'Dr. YSP GMC Nahan', distance: '100 km', seats: '100', quota: 'HP State Quota' },
  { name: 'SLBSGMC Mandi', distance: '150 km', seats: '100', quota: 'HP State Quota' },
  { name: 'GMCH Chandigarh', distance: '115 km', seats: '100', quota: 'UT Quota' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Shimla?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Shimla students through online classes. With AIIMS-trained faculty, small batch sizes (10-15 students), and 94.2% success rate, we provide superior preparation for IGMC Shimla. Students from Mall Road, Lakkar Bazaar, Sanjauli, and even Solan district trust us.',
  },
  {
    question: 'Is there good NEET coaching available in Shimla city?',
    answer:
      'Shimla has limited NEET coaching options due to its hilly terrain and small population. Most good coaching centers are in Chandigarh (115km away). Cerebrum Academy\'s online coaching brings AIIMS-level teaching directly to Shimla - no travel needed. We have 180+ students from Himachal Pradesh.',
  },
  {
    question: 'What are NEET coaching fees for Shimla students?',
    answer:
      'Cerebrum Academy\'s NEET coaching fees for Shimla students are Rs 45,000-85,000 per year. Compare this to Chandigarh coaching (Rs 1.5-2 lakhs) plus hostel (Rs 1.2 lakh+) plus travel. You save over Rs 2 lakhs while getting better faculty.',
  },
  {
    question: 'How to get admission in IGMC Shimla?',
    answer:
      'IGMC Shimla (Indira Gandhi Medical College) has 120 MBBS seats - 102 under HP State Quota and 18 under All India Quota. NEET 2024 AIQ closing rank was around 2625. HP domicile students have a significant advantage. Our targeted preparation helps Shimla students secure these coveted seats.',
  },
  {
    question: 'Is online coaching effective in hilly areas like Shimla?',
    answer:
      'Online coaching is IDEAL for Shimla and other hill stations. No commute through difficult terrain, no class cancellations due to weather, study from the warmth of your home during harsh winters. Our Shimla students consistently outperform those who travel to plains for coaching.',
  },
  {
    question: 'Can students from Solan, Kasauli, Kandaghat join?',
    answer:
      'Absolutely! Students from Solan, Kasauli, Kandaghat, Chail, Kufri, Mashobra, and all areas of HP can join our online NEET coaching. We have 50+ students from Solan district alone. You only need a stable internet connection.',
  },
  {
    question: 'What is the NEET cut-off for IGMC Shimla?',
    answer:
      'For HP State Quota in NEET 2025, IGMC Shimla general category cut-off was approximately 550-580. AIQ closing rank was around 2625. SC/ST/OBC categories have lower cut-offs. We help Shimla students strategize for these competitive scores.',
  },
  {
    question: 'Is AIIMS Bilaspur a good option for Shimla students?',
    answer:
      'AIIMS Bilaspur (90km from Shimla) is an excellent option with 100 MBBS seats under All India Quota. Being relatively new, cut-offs are competitive but achievable. We specifically prepare students for both IGMC Shimla and AIIMS Bilaspur.',
  },
  {
    question: 'Do you provide study material for NEET to Shimla students?',
    answer:
      'Yes, all Shimla students receive: Digital study notes (no courier delays to hills), chapter-wise video lectures, 5000+ MCQ practice bank, previous year papers (2015-2025), weekly mock tests, and NCERT-based comprehensive Biology material - all accessible offline.',
  },
  {
    question: 'How do doubt sessions work for students in remote HP areas?',
    answer:
      'Doubt clearing is available 24/7 via WhatsApp - works even with basic internet. We also have dedicated doubt sessions after each class, weekly doubt marathons, and one-on-one video calls. Even students from remote areas like Kinnaur and Lahaul-Spiti study with us.',
  },
  {
    question: 'What about winter months when Shimla gets heavy snowfall?',
    answer:
      'This is where online coaching shines! While offline coaching gets disrupted due to snow, our classes continue uninterrupted. Students can study from the comfort of their warm homes. Many Shimla students specifically chose us for weather-proof learning.',
  },
  {
    question: 'Are there special batches for HP board students?',
    answer:
      'Yes, we understand HP Board syllabus and exam patterns. Our teaching integrates well with HP Board studies. Many students from Bishop Cotton, Auckland House, and government schools in Shimla successfully balance board exams and NEET preparation with us.',
  },
]

export default function NEETCoachingShimla() {
  return (
    <>
      <CitySchema
        cityName="Shimla"
        stateName="Himachal Pradesh"
        description="Best NEET coaching for Shimla students. Online classes from AIIMS faculty. 94.2% success rate. Serving Mall Road, Lakkar Bazaar, Sanjauli, Solan. IGMC Shimla preparation."
        url="https://cerebrumacademy.in/neet-coaching-shimla"
      />

      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sky-800">
                  <Mountain className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Queen of Hills - 180+ HP Students Enrolled
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    Shimla
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Himachal&apos;s Capital</strong> now has AIIMS-level NEET coaching.
                  Prepare for IGMC Shimla from your mountain home - rain, snow, or shine.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Mall Road, Lakkar Bazaar, Sanjauli, Solan,
                  and all HP districts. <strong>94.2% success rate</strong> with AIIMS faculty.
                </p>

                <div className="mb-8 flex flex-wrap gap-4">
                  <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                    <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp Now
                    </Button>
                  </Link>
                  <Link href="/online-neet-coaching">
                    <Button size="lg" variant="outline" className="gap-2">
                      Explore Programs
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-sky-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 180+ HP students</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                  <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
                    Himachal Pradesh Students Success
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-sky-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-sky-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 p-4 text-center text-white">
                    <p className="font-semibold">22+ Selections in IGMC Shimla</p>
                    <p className="text-sm opacity-90">HP&apos;s premier medical college!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Shimla Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Shimla & HP Students Choose Online NEET Coaching
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Hill station challenges that make online coaching the smart choice
              </p>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForShimla.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50 p-4"
                >
                  <div className="rounded-lg bg-red-100 p-2">
                    <item.icon className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="font-medium text-red-800">{item.problem}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy: Perfect for Hill Students
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cerebrumAdvantages.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/20 p-2">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shimla Areas We Serve */}
        <section className="bg-sky-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for Shimla & Nearby Areas
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Online classes for students across Shimla district and beyond
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shimlaAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-sky-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-sky-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-sky-600">
                    <Users className="h-4 w-4" />
                    {area.students} students enrolled
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Also Serving Other HP Districts
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Mandi',
                  'Kullu',
                  'Kangra',
                  'Hamirpur',
                  'Una',
                  'Bilaspur',
                  'Sirmaur',
                  'Kinnaur',
                  'Lahaul-Spiti',
                  'Chamba',
                ].map((district, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Cerebrum is Best for Shimla Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Features designed for hill station NEET aspirants
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-sky-100 p-3">
                    <feature.icon className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-sky-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Shimla Schools
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Students from prestigious hill schools choose us
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {shimlaSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 shrink-0 text-sky-600" />
                  <span className="text-sm font-medium text-gray-800">{school}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Colleges */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Target Medical Colleges for Shimla Students
              </h2>
              <p className="text-lg text-gray-600">
                IGMC Shimla is in your city! Plus AIIMS Bilaspur just 90km away.
              </p>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-sky-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Medical College
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Distance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Seats
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Quota
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalColleges.map((college, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 ${college.name === 'IGMC Shimla' ? 'bg-sky-50' : ''}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {college.name}
                        {college.name === 'IGMC Shimla' && (
                          <span className="ml-2 rounded-full bg-sky-500 px-2 py-0.5 text-xs text-white">
                            Hometown
                          </span>
                        )}
                        {college.name === 'AIIMS Bilaspur' && (
                          <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                            AIIMS
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{college.distance}</td>
                      <td className="px-6 py-4 text-gray-600">{college.seats}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            college.quota.includes('HP')
                              ? 'bg-sky-100 text-sky-700'
                              : college.quota.includes('All India')
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {college.quota}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-lg bg-sky-100 p-4">
              <p className="text-center text-sky-800">
                <strong>HP State Quota Advantage:</strong> Himachal domicile students have access to
                102 seats at IGMC Shimla + 300+ seats across other HP GMCs with lower cut-offs than
                AIQ.
              </p>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <VideoTestimonialsSection />

        {/* Cost Comparison */}
        <section className="bg-sky-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh/Delhi vs Online for Shimla Students
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-red-600">
                  Going to Plains (Traditional)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Coaching Fees (Chandigarh/Delhi)</span>
                    <span className="font-semibold">Rs 1,50,000 - 2,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hostel/PG (12 months)</span>
                    <span className="font-semibold">Rs 1,20,000 - 1,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food & Living</span>
                    <span className="font-semibold">Rs 48,000 - 72,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel (Bus/Train to hills)</span>
                    <span className="font-semibold">Rs 25,000 - 40,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 3,43,000 - 5,12,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Shimla)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Complete NEET Program</span>
                    <span className="font-semibold">Rs 45,000 - 85,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stay at home in hills</span>
                    <span className="font-semibold text-green-600">Rs 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home food (Ghar ka khana)</span>
                    <span className="font-semibold text-green-600">Rs 0 extra</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No dangerous hill travel</span>
                    <span className="font-semibold text-green-600">Rs 0</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total Cost</span>
                      <span>Rs 45,000 - 85,000</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-green-100 p-3 text-center">
                  <p className="font-bold text-green-700">
                    Save Rs 2,60,000 - 4,30,000 with better results!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                FAQs: NEET Coaching in Shimla
              </h2>
              <p className="text-lg text-gray-600">
                Common questions from Shimla and Himachal Pradesh students
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-gray-200 bg-white"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-900">
                      {faq.question}
                      <span className="ml-4 text-sky-600 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Join IGMC Shimla from Your Mountain Home?
              </h2>
              <p className="mb-8 text-xl text-sky-100">
                180+ Himachal students trust us. 22+ now studying in IGMC Shimla. Study from your
                hills!
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-sky-600 hover:bg-sky-50">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp: +91 88264 44334
                  </Button>
                </Link>
                <Link href="/online-neet-coaching">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white text-white hover:bg-white/10"
                  >
                    View All Programs
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-sky-200">
                Free counseling session • No obligation • Weather-proof learning guaranteed
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
