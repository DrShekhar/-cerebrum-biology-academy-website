'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
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
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Dharamshala/Kangra). Please share details about online classes.'
)

const dharamshalaAreas = [
  { name: 'Dharamshala Main', students: '55+', highlight: 'District HQ', priority: 'high' },
  { name: 'McLeodGanj', students: '35+', highlight: 'Tourist Hub', priority: 'high' },
  { name: 'Kangra Town', students: '50+', highlight: 'Historic City', priority: 'high' },
  { name: 'Palampur', students: '45+', highlight: 'Tea Garden City', priority: 'high' },
  { name: 'Nagrota Bagwan', students: '30+', highlight: 'Growing Town', priority: 'medium' },
  { name: 'Jawali', students: '20+', highlight: 'Valley Area', priority: 'medium' },
  { name: 'Nurpur', students: '25+', highlight: 'Border Town', priority: 'medium' },
  { name: 'Shahpur', students: '15+', highlight: 'Rural Area', priority: 'low' },
]

const whyOnlineForDharamshala = [
  { problem: 'Hilly terrain - 2+ hours to reach coaching', icon: Mountain },
  { problem: 'RPGMC Tanda is 50km away - no coaching nearby', icon: Building },
  { problem: 'Limited quality coaching in Kangra district', icon: GraduationCap },
  { problem: 'Tourism season disrupts local coaching', icon: Globe },
  { problem: 'Harsh winters affect regular attendance', icon: Snowflake },
  { problem: '400km+ to Delhi/Chandigarh for quality coaching', icon: Car },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty now in Dharamshala hills', icon: Award },
  { point: 'No mountain road travel needed', icon: Laptop },
  { point: 'Small batches of 10-15 students', icon: Users },
  { point: 'RPGMC Tanda focused preparation', icon: Target },
  { point: 'Study from McLeodGanj to Palampur', icon: Mountain },
  { point: '24/7 WhatsApp doubt clearing', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions. Perfect for RPGMC Tanda and IGMC Shimla preparation.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Kangra student. Personal mentoring included.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - not available in entire Kangra district.',
  },
  {
    icon: Mountain,
    title: 'Hill Station Perfect',
    description: 'Weather-proof learning. Classes continue in rain, snow, or landslide season.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - works offline too.',
  },
  {
    icon: Target,
    title: 'HP Quota Focus',
    description: 'RPGMC Tanda (120 seats), IGMC Shimla, all HP medical colleges covered.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Kangra Students', value: '150+', icon: Users },
  { label: 'Avg Score Boost', value: '+118', icon: TrendingUp },
  { label: 'RPGMC Selections', value: '18+', icon: Award },
]

const dharamshalaSchools = [
  'DAV Public School Dharamshala',
  'Army Public School Yol',
  'St. Pauls School McLeodGanj',
  'Govt. Sr. Sec. School Dharamshala',
  'TCV School McLeodGanj',
  'Kangra Valley School',
  'Dr. Graham\'s Homes Palampur',
  'Govt. College Dharamshala',
  'Saupin\'s School Palampur',
  'JNV Kangra',
]

const medicalColleges = [
  { name: 'RPGMC Tanda', distance: '50 km', seats: '120', quota: 'HP State Quota' },
  { name: 'IGMC Shimla', distance: '250 km', seats: '120', quota: 'HP State (102) + AIQ' },
  { name: 'SLBSGMC Mandi', distance: '150 km', seats: '120', quota: 'HP State Quota' },
  { name: 'JLNGMC Chamba', distance: '120 km', seats: '120', quota: 'HP State Quota' },
  { name: 'AIIMS Bilaspur', distance: '200 km', seats: '50', quota: 'All India Quota' },
  { name: 'GMCH Chandigarh', distance: '250 km', seats: '100', quota: 'UT Quota' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Dharamshala?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Dharamshala and Kangra district students through online classes. With AIIMS-trained faculty, small batch sizes (10-15), and 98% success rate, we bring world-class coaching to your hill town. Students from McLeodGanj, Kangra, Palampur all study with us.',
  },
  {
    question: 'Is there any NEET coaching in Kangra district?',
    answer:
      'Kangra district has limited NEET coaching options - mostly in Dharamshala town with varying quality. For AIIMS-level preparation, online coaching is the best option. Cerebrum Academy has 150+ students from Kangra district with 18+ selections in RPGMC Tanda.',
  },
  {
    question: 'How to prepare for RPGMC Tanda from Dharamshala?',
    answer:
      'RPGMC Tanda (Dr. Rajendra Prasad Govt. Medical College) has 120 MBBS seats under HP quota. From Dharamshala, online NEET coaching is ideal - no 50km daily travel to Tanda. Our focused HP quota preparation has helped 18+ Kangra students get into RPGMC.',
  },
  {
    question: 'What are NEET coaching fees in Dharamshala?',
    answer:
      'Local Dharamshala coaching fees range Rs 30,000-60,000 but lack specialized faculty. Cerebrum Academy online coaching is Rs 45,000-85,000/year with AIIMS faculty. You save lakhs on travel/hostel compared to going to plains.',
  },
  {
    question: 'Can students from McLeodGanj and Palampur join?',
    answer:
      'Absolutely! Students from McLeodGanj, Palampur, Nagrota Bagwan, Jawali, Nurpur, and entire Kangra valley join our online classes. You only need basic internet - our content works offline too. 45+ students from Palampur alone are enrolled.',
  },
  {
    question: 'Is online coaching effective in hilly areas like Dharamshala?',
    answer:
      'Online coaching is IDEAL for Dharamshala! No dangerous mountain road travel, no class cancellation due to weather, study from your warm home. Our Kangra students consistently outperform those travelling to plains for coaching.',
  },
  {
    question: 'What is NEET cut-off for RPGMC Tanda?',
    answer:
      'RPGMC Tanda HP state quota cut-off for general category is approximately 540-570 (varies yearly). Being a Kangra domicile gives you home advantage for this college. We provide specific cut-off analysis and counseling guidance.',
  },
  {
    question: 'Do you have coaching for Tibetan students in McLeodGanj?',
    answer:
      'Yes! Many Tibetan students from TCV and other McLeodGanj schools prepare for NEET with us. Our English medium teaching and flexible timings suit diverse student backgrounds. Several Tibetan students have secured medical admissions.',
  },
  {
    question: 'How do doubt sessions work from remote Kangra areas?',
    answer:
      'Doubt clearing is 24/7 via WhatsApp - works even with basic 2G internet. We also have dedicated doubt sessions after each class and weekly doubt marathons. Students from remote areas like Shahpur and Baijnath study effectively with us.',
  },
  {
    question: 'Can I prepare for NEET while managing family tourism business?',
    answer:
      'Yes! Many Dharamshala students help with family hotels/guesthouses. Our flexible batch timings (morning/evening) and recorded lectures let you balance work and studies. Tourism season doesn\'t affect your NEET preparation.',
  },
]

export default function NEETCoachingDharamshala() {
  return (
    <>
      <CitySchema
        cityName="Dharamshala"
        stateName="Himachal Pradesh"
        description="Best NEET coaching for Dharamshala & Kangra students. Online classes from AIIMS faculty. 98% success rate. RPGMC Tanda preparation. Serving McLeodGanj, Palampur, Kangra."
        url="https://cerebrumbiologyacademy.com/neet-coaching-dharamshala"
      />

      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-teal-800">
                  <Mountain className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Kangra District - HP&apos;s Most Populous
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    Dharamshala
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Little Lhasa</strong> now has AIIMS-level NEET coaching. Prepare for
                  RPGMC Tanda from your Himalayan home.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Dharamshala, McLeodGanj, Kangra, Palampur,
                  and entire Kangra valley. <strong>98% success rate</strong> with AIIMS faculty.
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
                    <Phone className="h-4 w-4 text-teal-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 150+ Kangra students</span>
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
                    Kangra District Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-teal-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-teal-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-center text-white">
                    <p className="font-semibold">18+ Selections in RPGMC Tanda</p>
                    <p className="text-sm opacity-90">Your nearest government medical college!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Online Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Dharamshala Students Choose Online NEET Coaching
              </h2>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForDharamshala.map((item, index) => (
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

            <div className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy: Perfect for Kangra Valley
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

        {/* Areas Section */}
        <section className="bg-teal-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for Entire Kangra District
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dharamshalaAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-teal-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-teal-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-teal-600">
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
                Why Cerebrum is Best for Dharamshala Students
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
                  <div className="mb-4 inline-flex rounded-lg bg-teal-100 p-3">
                    <feature.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools */}
        <section className="bg-teal-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Kangra Schools
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {dharamshalaSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 shrink-0 text-teal-600" />
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
                Target Medical Colleges for Kangra Students
              </h2>
              <p className="text-lg text-gray-600">RPGMC Tanda is just 50km from Dharamshala!</p>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Medical College</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Distance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Seats</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalColleges.map((college, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${college.name === 'RPGMC Tanda' ? 'bg-teal-50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {college.name}
                        {college.name === 'RPGMC Tanda' && (
                          <span className="ml-2 rounded-full bg-teal-500 px-2 py-0.5 text-xs text-white">Nearest</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{college.distance}</td>
                      <td className="px-6 py-4 text-gray-600">{college.seats}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                          college.quota.includes('HP') ? 'bg-teal-100 text-teal-700' :
                          college.quota.includes('All India') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
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

        {/* Testimonials */}
        <VideoTestimonialsSection />

        {/* Cost Comparison */}
        <section className="bg-teal-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Plains vs Online for Dharamshala Students
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-red-600">Going to Delhi/Chandigarh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Coaching Fees</span><span className="font-semibold">Rs 1,50,000 - 2,50,000</span></div>
                  <div className="flex justify-between"><span>Hostel (12 months)</span><span className="font-semibold">Rs 1,20,000 - 1,80,000</span></div>
                  <div className="flex justify-between"><span>Food & Living</span><span className="font-semibold">Rs 60,000 - 84,000</span></div>
                  <div className="flex justify-between"><span>Travel (Hill to plains)</span><span className="font-semibold">Rs 30,000 - 50,000</span></div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span><span>Rs 3,60,000 - 5,64,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">Cerebrum Online (From Dharamshala)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Complete NEET Program</span><span className="font-semibold">Rs 45,000 - 85,000</span></div>
                  <div className="flex justify-between"><span>Stay in beautiful hills</span><span className="font-semibold text-green-600">Rs 0</span></div>
                  <div className="flex justify-between"><span>Home food</span><span className="font-semibold text-green-600">Rs 0 extra</span></div>
                  <div className="flex justify-between"><span>No dangerous travel</span><span className="font-semibold text-green-600">Rs 0</span></div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total Cost</span><span>Rs 45,000 - 85,000</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-green-100 p-3 text-center">
                  <p className="font-bold text-green-700">Save Rs 3,00,000 - 4,80,000!</p>
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
                FAQs: NEET Coaching in Dharamshala
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
                      <span className="ml-4 text-teal-600 transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Join RPGMC Tanda from Dharamshala?
              </h2>
              <p className="mb-8 text-xl text-teal-100">
                150+ Kangra students trust us. 18+ now studying in RPGMC Tanda.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-teal-600 hover:bg-teal-50">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp: +91 88264 44334
                  </Button>
                </Link>
                <Link href="/online-neet-coaching">
                  <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
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
