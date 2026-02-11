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
  Building,
  Phone,
  Target,
  Car,
  TrendingUp,
  Laptop,
  Train,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Ambala area). Please share details about online classes.'
)

const ambalaAreas = [
  { name: 'Ambala Cantt', students: '120+', highlight: 'Defense Families', priority: 'high' },
  { name: 'Ambala City', students: '90+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Model Town', students: '45+', highlight: 'Premium Residential', priority: 'high' },
  { name: 'Baldev Nagar', students: '35+', highlight: 'Educational Area', priority: 'medium' },
  { name: 'Mahesh Nagar', students: '30+', highlight: 'Central Location', priority: 'medium' },
  { name: 'Sector 9', students: '25+', highlight: 'New Development', priority: 'medium' },
  { name: 'Barara', students: '20+', highlight: 'Nearby Town', priority: 'medium' },
  { name: 'Shahzadpur', students: '15+', highlight: 'Rural Area', priority: 'low' },
]

const whyOnlineForAmbala = [
  { problem: '45-60 min travel to Chandigarh coaching', icon: Car },
  { problem: 'Rs 5000-8000/month hostel in Chandigarh', icon: TrendingUp },
  { problem: 'Limited quality coaching options in Ambala', icon: Building },
  { problem: 'Parents worry about child staying away', icon: Shield },
  { problem: 'Railway junction traffic delays', icon: Train },
  { problem: 'Miss school for coaching commute', icon: Clock },
]

const cerebrumAdvantages = [
  { point: 'Chandigarh quality from Ambala home', icon: Laptop },
  { point: 'AIIMS-trained faculty access', icon: Award },
  { point: 'Small batches of 10-15 students', icon: Users },
  { point: 'Save Rs 1 lakh+ yearly on hostel', icon: TrendingUp },
  { point: 'Defense family friendly timings', icon: Shield },
  { point: 'Instant doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online sessions. Same quality as top Chandigarh coaching centers.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Ambala student. Not 100+ crowded batches.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi. Not available at any Ambala coaching.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, evening batches. Perfect for Ambala school students & defense kids.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, practice tests - all included.',
  },
  {
    icon: Target,
    title: 'Haryana Quota Focus',
    description: 'Special preparation for PGIMS Rohtak, KCGMC Karnal - state quota seats.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Ambala Students', value: '250+', icon: Users },
  { label: 'Avg Score Improvement', value: '+120', icon: TrendingUp },
  { label: 'PGIMS Selections', value: '45+', icon: Award },
]

const ambalaSchools = [
  'Army Public School Ambala Cantt',
  'DAV Public School Ambala',
  'St. Annes School Ambala',
  'Shivalik Public School',
  'Guru Nanak Khalsa Sr. Sec. School',
  'S.D. Public School Ambala',
  'Army School Ambala',
  'Kendriya Vidyalaya Ambala',
]

const medicalColleges = [
  { name: 'PGIMS Rohtak', distance: '140 km', seats: '150', quota: 'Haryana Quota' },
  { name: 'KCGMC Karnal', distance: '85 km', seats: '100', quota: 'Haryana Quota' },
  { name: 'GMCH Chandigarh', distance: '45 km', seats: '100', quota: 'UT Quota' },
  { name: 'SHKM GMC Mewat', distance: '200 km', seats: '100', quota: 'Haryana Quota' },
  { name: 'BPS GMC Khanpur', distance: '180 km', seats: '100', quota: 'Haryana Quota' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Ambala for Biology?',
    answer:
      'Cerebrum Biology Academy offers the best NEET Biology coaching for Ambala students through online classes. Our AIIMS-trained faculty, small batch sizes (10-15 students), and 98% success rate make us the top choice. Students from Ambala Cantt, Ambala City, and nearby areas join our live interactive sessions.',
  },
  {
    question: 'Is online NEET coaching effective for Ambala students?',
    answer:
      'Yes, online NEET coaching is highly effective for Ambala students. You get Chandigarh-quality teaching without daily 45-60 minute commute. Our Ambala students have secured admissions in PGIMS Rohtak, KCGMC Karnal, and GMCH Chandigarh through online preparation.',
  },
  {
    question: 'What are the fees for NEET coaching for Ambala students?',
    answer:
      'Our NEET coaching fees for Ambala students are Rs 45,000-85,000 per year depending on the program. This is significantly lower than Chandigarh coaching (Rs 1.5-2.5 lakhs) plus you save Rs 60,000-1 lakh yearly on hostel and travel expenses.',
  },
  {
    question: 'How do Ambala students perform in NEET compared to Chandigarh students?',
    answer:
      'Our Ambala students perform equally well as Chandigarh students. In NEET 2025, 45+ students from Ambala secured admissions in government medical colleges. The key is quality teaching and dedicated preparation, which our online platform provides.',
  },
  {
    question: 'Do you have special batches for Army/Defense families in Ambala Cantt?',
    answer:
      'Yes, we have flexible timing options ideal for defense families. Our online format means no disruption during postings. Many students from Army Public School Ambala and Kendriya Vidyalaya Ambala are part of our NEET batches.',
  },
  {
    question: 'Which medical colleges can Ambala students target under Haryana quota?',
    answer:
      'Ambala students with Haryana domicile can target: PGIMS Rohtak (150 seats), KCGMC Karnal (100 seats), BPS GMC Khanpur (100 seats), SHKM GMC Mewat (100 seats). We provide specific counseling for Haryana quota admissions.',
  },
  {
    question: 'Is there any NEET coaching center in Ambala Cantt?',
    answer:
      'While there are some local coaching centers in Ambala Cantt, quality varies significantly. Cerebrum Academy offers online coaching that brings Chandigarh-level expertise directly to Ambala Cantt students without commute or relocation.',
  },
  {
    question: 'How to prepare for NEET 2026 from Ambala?',
    answer:
      'For NEET 2026 preparation from Ambala: 1) Join quality online coaching like Cerebrum Academy, 2) Focus on NCERT for Biology, 3) Practice previous year papers, 4) Take regular mock tests, 5) Clear doubts immediately via WhatsApp support. Start early for best results.',
  },
  {
    question: 'Can students from Barara and Shahzadpur join your coaching?',
    answer:
      'Absolutely! Students from Barara, Shahzadpur, Mullana, Saha, and all areas around Ambala can join our online NEET coaching. You only need a stable internet connection. Many students from these areas are already part of our batches.',
  },
  {
    question: 'What is the NEET cut-off for Haryana quota medical colleges?',
    answer:
      'For Haryana quota in NEET 2025, general category cut-offs were approximately: PGIMS Rohtak (620+), KCGMC Karnal (580+), BPS GMC (550+). We help Ambala students strategize their preparation to achieve these scores.',
  },
  {
    question: 'Do you provide study material for NEET to Ambala students?',
    answer:
      'Yes, all Ambala students receive: Digital study notes, chapter-wise video lectures, 5000+ MCQ practice bank, previous year papers (2015-2025), mock tests every week, and NCERT-based comprehensive Biology material.',
  },
  {
    question: 'How are doubt sessions conducted for Ambala students?',
    answer:
      'Doubt clearing for Ambala students is available 24/7 via WhatsApp. Additionally, we have dedicated doubt sessions after each class, weekly doubt marathons on Sundays, and one-on-one video calls for complex topics.',
  },
]

export default function NEETCoachingAmbala() {
  return (
    <>
      <CitySchema
        cityName="Ambala"
        stateName="Haryana"
        description="Best NEET coaching for Ambala students. Online classes from AIIMS faculty. 98% success rate. Serving Ambala Cantt, Ambala City, Model Town, Barara."
        url="https://cerebrumbiologyacademy.com/neet-coaching-ambala"
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-800">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Serving 400+ Students from Ambala Region
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Ambala
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Haryana&apos;s Gateway City</strong> deserves gateway-quality NEET
                  preparation. Get Chandigarh-level coaching without leaving Ambala.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Ambala Cantt, Ambala City, Model Town,
                  Baldev Nagar, and nearby areas. <strong>98% success rate</strong> with AIIMS
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
                    <Phone className="h-4 w-4 text-amber-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 250+ Ambala students</span>
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
                    Ambala Students Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-amber-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-center text-white">
                    <p className="font-semibold">Limited Seats for Ambala Batch</p>
                    <p className="text-sm opacity-90">Only 15 seats per batch - Enroll Now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Ambala Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Ambala Students Are Choosing Online NEET Coaching
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                The traditional path of going to Chandigarh for coaching has these challenges
              </p>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForAmbala.map((item, index) => (
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

            <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy Solution for Ambala
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

        {/* Ambala Areas We Serve */}
        <section className="bg-amber-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for All Ambala Areas
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Online classes for students across Ambala district - Cantonment, City, and beyond
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ambalaAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-amber-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-amber-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-amber-600">
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
                Why Cerebrum is Best for Ambala Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Features designed specifically for NEET aspirants from Haryana
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
                  <div className="mb-4 inline-flex rounded-lg bg-amber-100 p-3">
                    <feature.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-amber-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Ambala Schools
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Students from these premier Ambala schools are preparing for NEET with us
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ambalaSchools.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <School className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-gray-800">{school}</span>
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
                Target Medical Colleges for Ambala Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Haryana quota gives Ambala students access to these government medical colleges
              </p>
            </motion.div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-amber-50">
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
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
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
        <section className="bg-amber-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh vs Online for Ambala Students
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
                    <span className="font-semibold">Rs 60,000 - 1,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food & Living</span>
                    <span className="font-semibold">Rs 36,000 - 48,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel (Daily if not staying)</span>
                    <span className="font-semibold">Rs 36,000 - 48,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 2,82,000 - 4,46,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Ambala)
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
                    Save Rs 2,00,000 - 3,50,000 with better results!
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
                FAQs: NEET Coaching in Ambala
              </h2>
              <p className="text-lg text-gray-600">
                Common questions from Ambala students and parents
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
                      <span className="ml-4 text-amber-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Your NEET Journey from Ambala?
              </h2>
              <p className="mb-8 text-xl text-amber-100">
                Join 250+ successful Ambala students. Get Chandigarh-quality coaching at home.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-amber-600 hover:bg-amber-50">
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

              <p className="mt-6 text-sm text-amber-200">
                Free counseling session • No obligation • Get personalized study plan
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
