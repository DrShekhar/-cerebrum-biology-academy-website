'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
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
  Globe,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Jalandhar). Please share details about online classes.'
)

const jalandharAreas = [
  { name: 'Model Town', students: '100+', highlight: 'Premium Area', priority: 'high' },
  { name: 'Urban Estate', students: '85+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'Maqsudan', students: '60+', highlight: 'Central Location', priority: 'high' },
  { name: 'BMC Chowk', students: '50+', highlight: 'Commercial Zone', priority: 'medium' },
  { name: 'Nakodar Road', students: '45+', highlight: 'Growing Area', priority: 'medium' },
  { name: 'Rama Mandi', students: '35+', highlight: 'Industrial Belt', priority: 'medium' },
  { name: 'Phagwara', students: '40+', highlight: 'Nearby Town', priority: 'medium' },
  { name: 'Kapurthala', students: '30+', highlight: 'District HQ', priority: 'low' },
]

const whyOnlineForJalandhar = [
  { problem: 'No AIIMS-level coaching in Jalandhar', icon: Building },
  { problem: '3-4 hours daily commute to Chandigarh', icon: Car },
  { problem: 'NRI families want child to stay home', icon: Globe },
  { problem: 'Local coaching lacks specialization', icon: BookOpen },
  { problem: 'Quality faculty not available locally', icon: GraduationCap },
  { problem: 'Rs 10,000+/month hostel in Chandigarh', icon: TrendingUp },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty now accessible in Jalandhar', icon: Award },
  { point: 'No 145km Chandigarh commute needed', icon: Laptop },
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'NRI family friendly - global timings', icon: Globe },
  { point: 'Save Rs 1.5 lakh+ yearly on hostel', icon: TrendingUp },
  { point: '24/7 doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with Chandigarh-quality teaching. Doaba students thrive here.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Jalandhar student. Personal mentoring included.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - not available anywhere in Jalandhar.',
  },
  {
    icon: Globe,
    title: 'NRI Family Flexible',
    description: 'Special timing options for students with family abroad. Global accessibility.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - all included.',
  },
  {
    icon: Target,
    title: 'Punjab Quota Focus',
    description: 'Special prep for GMC Patiala, GMC Amritsar - Punjab quota seats.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Jalandhar Students', value: '350+', icon: Users },
  { label: 'Avg Score Improvement', value: '+118', icon: TrendingUp },
  { label: 'GMC Selections', value: '55+', icon: Award },
]

const jalandharSchools = [
  'St. Joseph\'s Convent School',
  'DAV Public School Jalandhar',
  'Apeejay School Jalandhar',
  'CT Public School',
  'Lyallpur Khalsa College School',
  'MGN Public School',
  'Police DAV Public School',
  'Shiv Jyoti Public School',
  'Holy Heart Presidency School',
  'Innocent Hearts School',
]

const medicalColleges = [
  { name: 'GMC Amritsar', distance: '80 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Patiala', distance: '160 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Faridkot', distance: '150 km', seats: '150', quota: 'Punjab Quota' },
  { name: 'GMCH Chandigarh', distance: '145 km', seats: '100', quota: 'UT/Punjab Quota' },
  { name: 'SGRD Amritsar', distance: '80 km', seats: '100', quota: 'Private' },
  { name: 'Adesh Medical College', distance: '160 km', seats: '150', quota: 'Private' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Jalandhar?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Jalandhar students through online classes. With AIIMS-trained faculty, small batch sizes (10-15 students), and 94.2% success rate, we bring Chandigarh-quality coaching to Doaba region. Students from Model Town, Urban Estate, Maqsudan join our live sessions.',
  },
  {
    question: 'Is there good NEET coaching available in Jalandhar city?',
    answer:
      'While Jalandhar has some coaching centers, they lack AIIMS-level faculty and NEET specialization. Cerebrum Academy\'s online coaching brings expert teachers directly to Jalandhar students. We have 350+ students from Jalandhar with excellent results in NEET.',
  },
  {
    question: 'What are NEET coaching fees for Jalandhar students?',
    answer:
      'Cerebrum Academy\'s NEET coaching fees for Jalandhar students are Rs 45,000-85,000 per year. Compare this to Chandigarh coaching (Rs 1.5-2.5 lakhs) plus Rs 1.2 lakh hostel expenses. You get superior quality at fraction of the cost.',
  },
  {
    question: 'Is online coaching suitable for NRI families in Jalandhar?',
    answer:
      'Absolutely! Many Jalandhar families have relatives abroad. Our online format allows students to study from home, and we offer flexible timings. Parents can monitor progress remotely. NRI families appreciate that children stay safe at home.',
  },
  {
    question: 'Which medical colleges can Jalandhar students target?',
    answer:
      'Jalandhar students with Punjab domicile can target: GMC Amritsar (200 seats, closest), GMC Patiala (200 seats), GMC Faridkot (150 seats). Private options include SGRD Amritsar and Adesh Medical College.',
  },
  {
    question: 'Can students from Phagwara and Kapurthala join?',
    answer:
      'Yes! Students from Phagwara, Kapurthala, Nakodar, Shahkot, Kartarpur, and all areas around Jalandhar can join our online NEET coaching. We have 70+ students from these areas already enrolled.',
  },
  {
    question: 'How do Jalandhar students perform in NEET compared to others?',
    answer:
      'Jalandhar students are known for their hard work and discipline. With proper guidance from AIIMS faculty, they excel in NEET. Our 55+ selections in government medical colleges from Jalandhar region prove this.',
  },
  {
    question: 'What is the NEET cut-off for Punjab government medical colleges?',
    answer:
      'For Punjab quota in NEET 2025, general category cut-offs were approximately: GMC Amritsar (580+), GMC Patiala (600+), GMC Faridkot (560+). We help Jalandhar students achieve these scores with targeted preparation.',
  },
  {
    question: 'Do you provide study material for NEET to Jalandhar students?',
    answer:
      'Yes, all Jalandhar students receive: Digital study notes, chapter-wise video lectures, 5000+ MCQ practice bank, previous year papers (2015-2025), weekly mock tests, and NCERT-based comprehensive Biology material.',
  },
  {
    question: 'How are doubt sessions conducted for Jalandhar students?',
    answer:
      'Doubt clearing is available 24/7 via WhatsApp. We also have dedicated doubt sessions after each class, weekly doubt marathons, and one-on-one video calls for complex Biology topics. No doubt goes unanswered.',
  },
]

export default function NEETCoachingJalandhar() {
  return (
    <>
      <CitySchema
        cityName="Jalandhar"
        stateName="Punjab"
        description="Best NEET coaching for Jalandhar students. Online classes from AIIMS faculty. 94.2% success rate. Serving Model Town, Urban Estate, Maqsudan, Phagwara, Kapurthala."
        url="https://cerebrumacademy.in/neet-coaching-jalandhar"
      />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-violet-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-purple-800">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Doaba Region&apos;s Premier NEET Coaching
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    Jalandhar
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Doaba&apos;s Education Hub</strong> now has access to AIIMS-level NEET
                  coaching. No need to relocate to Chandigarh.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Model Town, Urban Estate, Maqsudan,
                  Phagwara, and Kapurthala. <strong>94.2% success rate</strong> with AIIMS faculty.
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
                    <Phone className="h-4 w-4 text-purple-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 350+ Jalandhar students</span>
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
                    Jalandhar Students Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-purple-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-4 text-center text-white">
                    <p className="font-semibold">Limited Seats for Jalandhar Batch</p>
                    <p className="text-sm opacity-90">Only 15 seats per batch - Enroll Now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Jalandhar Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Jalandhar Families Are Choosing Online NEET Coaching
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                The traditional challenge of NEET preparation in Doaba region
              </p>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForJalandhar.map((item, index) => (
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

            <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy Solution for Jalandhar
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

        {/* Jalandhar Areas We Serve */}
        <section className="bg-purple-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for Jalandhar & Doaba Region
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Online classes for students across Jalandhar district and neighboring areas
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {jalandharAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-purple-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-purple-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-purple-600">
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
                Why Cerebrum is Best for Jalandhar Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Features designed for NEET aspirants from Doaba region
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
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-purple-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Jalandhar Schools
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {jalandharSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 shrink-0 text-purple-600" />
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
                Target Medical Colleges for Jalandhar Students
              </h2>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-purple-50">
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
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{college.name}</td>
                      <td className="px-6 py-4 text-gray-600">{college.distance}</td>
                      <td className="px-6 py-4 text-gray-600">{college.seats}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            college.quota.includes('Punjab')
                              ? 'bg-purple-100 text-purple-700'
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
        <section className="bg-purple-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh vs Online for Jalandhar Students
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
                    <span>Travel (Home visits)</span>
                    <span className="font-semibold">Rs 20,000 - 30,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 3,38,000 - 5,02,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Jalandhar)
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
                    Save Rs 2,50,000 - 4,00,000 with better results!
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
                FAQs: NEET Coaching in Jalandhar
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
                      <span className="ml-4 text-purple-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Your NEET Journey from Jalandhar?
              </h2>
              <p className="mb-8 text-xl text-purple-100">
                Join 350+ successful students from Doaba region. AIIMS-level coaching at home.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-purple-600 hover:bg-purple-50">
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
