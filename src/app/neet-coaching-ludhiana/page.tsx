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
  Calculator,
  Target,
  Car,
  TrendingUp,
  CheckCircle,
  Laptop,
  Factory,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Ludhiana). Please share details about online classes.'
)

const ludhianaAreas = [
  { name: 'Model Town', students: '150+', highlight: 'Premium Residential', priority: 'high' },
  { name: 'Civil Lines', students: '120+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'Sarabha Nagar', students: '100+', highlight: 'Upscale Area', priority: 'high' },
  { name: 'Dugri', students: '80+', highlight: 'Growing Area', priority: 'high' },
  { name: 'BRS Nagar', students: '60+', highlight: 'Central Location', priority: 'medium' },
  { name: 'Pakhowal Road', students: '50+', highlight: 'Industrial Belt', priority: 'medium' },
  { name: 'Ferozepur Road', students: '45+', highlight: 'Commercial Zone', priority: 'medium' },
  { name: 'Jagraon', students: '35+', highlight: 'Nearby Town', priority: 'low' },
]

const whyOnlineForLudhiana = [
  { problem: 'No AIIMS-level coaching in Ludhiana', icon: Building },
  { problem: '3+ hours daily commute to Chandigarh', icon: Car },
  { problem: 'Rs 8000-12000/month hostel in Chandigarh', icon: TrendingUp },
  { problem: 'Parents busy with business, need child at home', icon: Factory },
  { problem: 'Local coaching lacks NEET specialization', icon: BookOpen },
  { problem: 'Quality faculty shortage in Punjab', icon: GraduationCap },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty now accessible in Ludhiana', icon: Award },
  { point: 'Online = No 100km Chandigarh commute', icon: Laptop },
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'Save Rs 1.5 lakh+ yearly on hostel', icon: TrendingUp },
  { point: 'Business family flexible timings', icon: Clock },
  { point: '24/7 doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with Chandigarh-quality teaching. Ask questions live.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Ludhiana student. Personal mentoring.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - not available anywhere in Ludhiana.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, evening batches. Perfect for business families\' schedules.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - all included.',
  },
  {
    icon: Target,
    title: 'Punjab Quota Focus',
    description: 'Special prep for GMC Patiala, GMC Amritsar, DMCH - Punjab quota seats.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Ludhiana Students', value: '400+', icon: Users },
  { label: 'Avg Score Improvement', value: '+125', icon: TrendingUp },
  { label: 'GMC Selections', value: '65+', icon: Award },
]

const ludhianaSchools = [
  'Sacred Heart Convent School',
  'Satpaul Mittal School',
  'BCM School Ludhiana',
  'Guru Nanak Public School',
  'DAV Public School Ludhiana',
  'SCD Government College',
  'Kundan Vidya Mandir',
  'Ryan International School',
  'Delhi Public School Ludhiana',
  'Nankana Sahib Public School',
]

const medicalColleges = [
  { name: 'DMCH Ludhiana', distance: '0 km', seats: '50', quota: 'Private (Christian)' },
  { name: 'GMC Patiala', distance: '60 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Amritsar', distance: '140 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Faridkot', distance: '100 km', seats: '150', quota: 'Punjab Quota' },
  { name: 'GMCH Chandigarh', distance: '100 km', seats: '100', quota: 'UT/Punjab Quota' },
  { name: 'SGRD Amritsar', distance: '140 km', seats: '100', quota: 'Private' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Ludhiana?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Ludhiana students through online classes. With AIIMS-trained faculty, small batch sizes (10-15 students), and 94.2% success rate, we bring Chandigarh-quality coaching to Punjab\'s largest city. Students from Model Town, Civil Lines, Sarabha Nagar join our live sessions.',
  },
  {
    question: 'Is there any good NEET coaching center in Ludhiana?',
    answer:
      'While Ludhiana has some coaching centers, they lack AIIMS-level faculty and NEET specialization. Cerebrum Academy\'s online coaching brings expert teachers directly to Ludhiana students - no relocation needed. We have 400+ students from Ludhiana with excellent results.',
  },
  {
    question: 'What are the fees for NEET coaching in Ludhiana?',
    answer:
      'Cerebrum Academy\'s NEET coaching fees for Ludhiana students are Rs 45,000-85,000 per year. Compare this to Chandigarh coaching (Rs 1.5-2.5 lakhs) plus Rs 1-1.5 lakh hostel expenses. You get better quality at 1/4th the total cost.',
  },
  {
    question: 'Should I go to Chandigarh or Kota for NEET coaching from Ludhiana?',
    answer:
      'Neither is necessary. Online coaching from Cerebrum Academy gives you AIIMS-faculty teaching in Ludhiana itself. Our students have outperformed many who went to Chandigarh/Kota. Save Rs 2+ lakhs and stay with family while getting top-quality preparation.',
  },
  {
    question: 'Which medical colleges can Ludhiana students target under Punjab quota?',
    answer:
      'Ludhiana students with Punjab domicile can target: GMC Patiala (200 seats), GMC Amritsar (200 seats), GMC Faridkot (150 seats), plus private colleges like DMCH Ludhiana. We provide specific counseling for Punjab quota admissions.',
  },
  {
    question: 'How do business families in Ludhiana manage NEET coaching?',
    answer:
      'Our online format is perfect for Ludhiana\'s business families. Students can attend classes from home with flexible morning/evening batches. Parents don\'t need to send children away, and study schedule adjusts around family commitments.',
  },
  {
    question: 'Is DMCH Ludhiana good for MBBS?',
    answer:
      'DMCH Ludhiana is a reputed Christian Medical College with 50 MBBS seats. It has excellent infrastructure and clinical exposure. However, it\'s private with higher fees. Our counseling helps students weigh DMCH vs government college options based on NEET scores.',
  },
  {
    question: 'What is the NEET cut-off for Punjab government medical colleges?',
    answer:
      'For Punjab quota in NEET 2025, general category cut-offs were approximately: GMC Patiala (600+), GMC Amritsar (580+), GMC Faridkot (560+). We help Ludhiana students achieve these scores with targeted preparation.',
  },
  {
    question: 'Can students from Jagraon, Khanna, Mandi Gobindgarh join?',
    answer:
      'Absolutely! Students from Jagraon, Khanna, Mandi Gobindgarh, Samrala, Machhiwara, and all areas around Ludhiana can join our online NEET coaching. You only need stable internet. Many students from these towns are already enrolled.',
  },
  {
    question: 'Do you provide study material for NEET to Ludhiana students?',
    answer:
      'Yes, all Ludhiana students receive: Digital study notes, chapter-wise video lectures, 5000+ MCQ practice bank, previous year papers (2015-2025), weekly mock tests, and NCERT-based comprehensive Biology material - all delivered online.',
  },
  {
    question: 'How are online classes conducted for Ludhiana students?',
    answer:
      'Live interactive classes are conducted via our platform. You can ask questions in real-time, just like offline coaching. Classes are recorded for revision. Doubt sessions, tests, and parent meetings - all happen online seamlessly.',
  },
  {
    question: 'What makes Ludhiana students successful in NEET?',
    answer:
      'Ludhiana students are hardworking and disciplined. With proper guidance from AIIMS faculty, comprehensive material, and focused preparation, they excel in NEET. Our 65+ selections in government medical colleges prove this.',
  },
]

export default function NEETCoachingLudhiana() {
  return (
    <>
      <CitySchema
        cityName="Ludhiana"
        stateName="Punjab"
        description="Best NEET coaching for Ludhiana students. Online classes from AIIMS faculty. 94.2% success rate. Serving Model Town, Civil Lines, Sarabha Nagar, Dugri."
        url="https://cerebrumacademy.in/neet-coaching-ludhiana"
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-800">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Punjab&apos;s Largest City - 800+ Students Enrolled
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Ludhiana
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Punjab&apos;s Industrial Capital</strong> now has access to AIIMS-level
                  NEET coaching. No need to relocate to Chandigarh or Kota.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Model Town, Civil Lines, Sarabha Nagar,
                  Dugri, and all Ludhiana areas. <strong>94.2% success rate</strong> with AIIMS
                  faculty.
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
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 400+ Ludhiana students</span>
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
                    Ludhiana Students Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-blue-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-center text-white">
                    <p className="font-semibold">Limited Seats for Ludhiana Batch</p>
                    <p className="text-sm opacity-90">Only 15 seats per batch - Enroll Now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Ludhiana Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Ludhiana Families Are Choosing Online NEET Coaching
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                The traditional challenge of NEET preparation in Punjab&apos;s biggest city
              </p>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForLudhiana.map((item, index) => (
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

            <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy Solution for Ludhiana
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

        {/* Ludhiana Areas We Serve */}
        <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for All Ludhiana Areas
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Online classes for students across Ludhiana district and surrounding towns
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ludhianaAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-blue-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-blue-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-blue-600">
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
                Why Cerebrum is Best for Ludhiana Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Features designed for NEET aspirants from Punjab&apos;s industrial hub
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
                  <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Ludhiana Schools
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Students from these premier Ludhiana schools are preparing for NEET with us
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {ludhianaSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 shrink-0 text-blue-600" />
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
                Target Medical Colleges for Ludhiana Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Punjab quota and nearby options for MBBS admission
              </p>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-blue-50">
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
        <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh/Kota vs Online for Ludhiana Students
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-red-600">
                  Going to Chandigarh/Kota (Traditional)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Coaching Fees</span>
                    <span className="font-semibold">Rs 1,50,000 - 3,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hostel/PG (12 months)</span>
                    <span className="font-semibold">Rs 96,000 - 1,44,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food & Living</span>
                    <span className="font-semibold">Rs 48,000 - 72,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel (Home visits)</span>
                    <span className="font-semibold">Rs 15,000 - 25,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 3,09,000 - 5,41,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Ludhiana)
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
                    <span>Home food (Maa ke haath ka)</span>
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
                    Save Rs 2,50,000 - 4,50,000 with better results!
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
                FAQs: NEET Coaching in Ludhiana
              </h2>
              <p className="text-lg text-gray-600">
                Common questions from Ludhiana students and parents
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
                      <span className="ml-4 text-blue-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Your NEET Journey from Ludhiana?
              </h2>
              <p className="mb-8 text-xl text-blue-100">
                Join 400+ successful Ludhiana students. Punjab&apos;s largest city deserves the
                best coaching.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50">
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

              <p className="mt-6 text-sm text-blue-200">
                Free counseling session • No obligation • Get personalized study plan
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
