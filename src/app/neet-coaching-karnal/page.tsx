'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
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
  Wheat,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Karnal). Please share details about online classes.'
)

const karnalAreas = [
  { name: 'Model Town', students: '70+', highlight: 'Premium Area', priority: 'high' },
  { name: 'Sector 12', students: '55+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'NDRI Area', students: '45+', highlight: 'Research Hub', priority: 'high' },
  { name: 'Kunjpura', students: '40+', highlight: 'Defense Area', priority: 'medium' },
  { name: 'Sector 6', students: '35+', highlight: 'Central Location', priority: 'medium' },
  { name: 'GT Road Area', students: '30+', highlight: 'Commercial Zone', priority: 'medium' },
  { name: 'Nilokheri', students: '25+', highlight: 'Nearby Town', priority: 'low' },
  { name: 'Assandh', students: '20+', highlight: 'Rural Area', priority: 'low' },
]

const whyOnlineForKarnal = [
  { problem: 'KCGMC is here but specialized coaching lacking', icon: Building },
  { problem: '130km travel to Chandigarh for quality coaching', icon: Car },
  { problem: 'Local coaching lacks AIIMS-level expertise', icon: GraduationCap },
  { problem: 'Agriculture families need child nearby', icon: Wheat },
  { problem: 'Rs 8000+/month hostel in Chandigarh', icon: TrendingUp },
  { problem: 'NDRI student families want quality at home', icon: Shield },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty for KCGMC preparation', icon: Award },
  { point: 'No 130km Chandigarh commute needed', icon: Laptop },
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'Agriculture family flexible timings', icon: Wheat },
  { point: 'Save Rs 1.2 lakh+ yearly on hostel', icon: TrendingUp },
  { point: '24/7 doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions. Perfect preparation for KCGMC Karnal aspirants.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Karnal student. Personal mentoring.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - superior to any coaching in Karnal.',
  },
  {
    icon: Wheat,
    title: 'Agriculture Family Friendly',
    description: 'Flexible timings. Students help at farm and study for NEET too.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - all included.',
  },
  {
    icon: Target,
    title: 'KCGMC Focus',
    description: 'Special prep for KCGMC Karnal (100 seats) - your hometown medical college.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Karnal Students', value: '220+', icon: Users },
  { label: 'Avg Score Improvement', value: '+115', icon: TrendingUp },
  { label: 'KCGMC Selections', value: '28+', icon: Award },
]

const karnalSchools = [
  'DAV Public School Karnal',
  'St. Theresa\'s Convent School',
  'Tagore Public School',
  'D.N. Model School',
  'Army Public School Karnal',
  'Carmel Convent School',
  'S.D. Public School',
  'Kendriya Vidyalaya Karnal',
  'Sainik School Kunjpura',
  'NDRI School',
]

const medicalColleges = [
  { name: 'KCGMC Karnal', distance: '0 km', seats: '100', quota: 'Haryana Quota' },
  { name: 'PGIMS Rohtak', distance: '100 km', seats: '150', quota: 'Haryana Quota' },
  { name: 'BPS GMC Khanpur', distance: '150 km', seats: '100', quota: 'Haryana Quota' },
  { name: 'SHKM GMC Mewat', distance: '180 km', seats: '100', quota: 'Haryana Quota' },
  { name: 'GMCH Chandigarh', distance: '130 km', seats: '100', quota: 'UT Quota' },
  { name: 'PGIMER Chandigarh', distance: '130 km', seats: '75', quota: 'All India' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Karnal?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Karnal students through online classes. With AIIMS-trained faculty, small batch sizes (10-15 students), and 98% success rate, we provide superior preparation for KCGMC Karnal. Students from Model Town, Sector 12, NDRI Area trust us.',
  },
  {
    question: 'Is there good NEET coaching in Karnal for KCGMC preparation?',
    answer:
      'While Karnal has some coaching centers, they lack specialized AIIMS-level faculty. Cerebrum Academy\'s online coaching brings expert teachers to Karnal - 28+ of our students have secured admission in KCGMC Karnal and other Haryana medical colleges.',
  },
  {
    question: 'What are NEET coaching fees for Karnal students?',
    answer:
      'Cerebrum Academy\'s NEET coaching fees for Karnal students are Rs 45,000-85,000 per year. This is much lower than Chandigarh coaching (Rs 1.5-2 lakhs) plus hostel (Rs 1 lakh+). You save significantly while getting better faculty.',
  },
  {
    question: 'How to get admission in KCGMC Karnal?',
    answer:
      'KCGMC Karnal (Kalpana Chawla Govt. Medical College) has 100 MBBS seats under Haryana quota. NEET 2025 cut-off was around 580+ for general category. Our targeted preparation helps Karnal students achieve these scores.',
  },
  {
    question: 'Is Karnal good for medical studies?',
    answer:
      'Yes! KCGMC Karnal (named after astronaut Kalpana Chawla) is a well-established government medical college. Being a hometown student gives you proximity advantage during MBBS. Our coaching helps you secure admission here.',
  },
  {
    question: 'Can agriculture family students manage NEET preparation?',
    answer:
      'Absolutely! Many Karnal students come from agriculture families. Our online format allows flexible study schedules. Students can help at farm during harvest season and still maintain their NEET preparation. Several such students have cracked NEET.',
  },
  {
    question: 'What is the NEET cut-off for KCGMC Karnal?',
    answer:
      'For Haryana quota in NEET 2025, KCGMC Karnal general category cut-off was approximately 580+. SC/ST/OBC categories have lower cut-offs. We help Karnal students strategize their preparation to achieve these scores.',
  },
  {
    question: 'Can students from Nilokheri, Assandh, Gharaunda join?',
    answer:
      'Yes! Students from Nilokheri, Assandh, Gharaunda, Indri, Taraori, and all areas around Karnal can join our online NEET coaching. We have 65+ students from these areas already enrolled.',
  },
  {
    question: 'Do students from Sainik School Kunjpura join your coaching?',
    answer:
      'Yes! Several students from Sainik School Kunjpura are part of our NEET batches. Our online format is perfect for boarding school students - they can study during vacations and free periods.',
  },
  {
    question: 'How does NDRI area student benefit from online coaching?',
    answer:
      'NDRI (National Dairy Research Institute) area families are research-oriented and value quality education. Our AIIMS faculty and scientific approach to NEET preparation resonates with them. Many NDRI campus students study with us.',
  },
]

export default function NEETCoachingKarnal() {
  return (
    <>
      <CitySchema
        cityName="Karnal"
        stateName="Haryana"
        description="Best NEET coaching for Karnal students. Online classes from AIIMS faculty. 98% success rate. Serving Model Town, Sector 12, NDRI Area, Kunjpura."
        url="https://cerebrumbiologyacademy.com/neet-coaching-karnal"
      />

      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-green-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-800">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">KCGMC City - 220+ Students Enrolled</span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Karnal
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Kalpana Chawla&apos;s City</strong> deserves stellar NEET coaching. Prepare
                  for KCGMC Karnal from your hometown.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Model Town, Sector 12, NDRI Area, Kunjpura,
                  and nearby areas. <strong>98% success rate</strong> with AIIMS faculty.
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
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 220+ Karnal students</span>
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
                    Karnal Students Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-emerald-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-center text-white">
                    <p className="font-semibold">28+ Selections in KCGMC Karnal</p>
                    <p className="text-sm opacity-90">Kalpana Chawla&apos;s legacy continues!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Karnal Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Karnal Families Choose Online NEET Coaching
              </h2>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForKarnal.map((item, index) => (
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

            <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy Solution for Karnal
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

        {/* Karnal Areas We Serve */}
        <section className="bg-emerald-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for Karnal & Nearby Areas
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {karnalAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-emerald-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-emerald-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <Users className="h-4 w-4" />
                    {area.students} students enrolled
                  </p>
                </motion.div>
              ))}
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
                Why Cerebrum is Best for Karnal Students
              </h2>
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
                  <div className="mb-4 inline-flex rounded-lg bg-emerald-100 p-3">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-emerald-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Karnal Schools
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {karnalSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 shrink-0 text-emerald-600" />
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
                Target Medical Colleges for Karnal Students
              </h2>
              <p className="text-lg text-gray-600">KCGMC Karnal is in your city!</p>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-emerald-50">
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
                      className={`hover:bg-gray-50 ${college.name === 'KCGMC Karnal' ? 'bg-emerald-50' : ''}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {college.name}
                        {college.name === 'KCGMC Karnal' && (
                          <span className="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                            Hometown
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{college.distance}</td>
                      <td className="px-6 py-4 text-gray-600">{college.seats}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            college.quota.includes('Haryana')
                              ? 'bg-emerald-100 text-emerald-700'
                              : college.quota === 'All India'
                                ? 'bg-blue-100 text-blue-700'
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
          </div>
        </section>

        {/* Video Testimonials */}
        <VideoTestimonialsSection />

        {/* Cost Comparison */}
        <section className="bg-emerald-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh vs Online for Karnal Students
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-red-600">
                  Going to Chandigarh (Traditional)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Coaching Fees</span>
                    <span className="font-semibold">Rs 1,50,000 - 2,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hostel/PG (12 months)</span>
                    <span className="font-semibold">Rs 96,000 - 1,20,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food & Living</span>
                    <span className="font-semibold">Rs 42,000 - 60,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel (Home visits)</span>
                    <span className="font-semibold">Rs 18,000 - 25,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 3,06,000 - 4,05,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Karnal)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Complete NEET Program</span>
                    <span className="font-semibold">Rs 45,000 - 85,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stay at home</span>
                    <span className="font-semibold text-green-600">Rs 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home food</span>
                    <span className="font-semibold text-green-600">Rs 0 extra</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No travel needed</span>
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
                    Save Rs 2,20,000 - 3,20,000 with better results!
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
                FAQs: NEET Coaching in Karnal
              </h2>
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
                      <span className="ml-4 text-emerald-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Join KCGMC Karnal from Your Hometown?
              </h2>
              <p className="mb-8 text-xl text-emerald-100">
                220+ Karnal students trust us. 28+ now studying in KCGMC Karnal.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-emerald-600 hover:bg-emerald-50">
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
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
