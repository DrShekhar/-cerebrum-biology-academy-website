'use client'

import {
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  Clock,
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
  Crown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Patiala). Please share details about online classes.'
)

const patialaAreas = [
  { name: 'Model Town', students: '80+', highlight: 'Premium Area', priority: 'high' },
  { name: 'Leela Bhawan', students: '65+', highlight: 'Central Location', priority: 'high' },
  { name: 'Urban Estate', students: '55+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'Tripuri', students: '45+', highlight: 'Growing Area', priority: 'medium' },
  { name: 'Punjabi University Area', students: '40+', highlight: 'Student Hub', priority: 'medium' },
  { name: 'Rajpura', students: '35+', highlight: 'Industrial Town', priority: 'medium' },
  { name: 'Nabha', students: '25+', highlight: 'Historic Town', priority: 'low' },
  { name: 'Samana', students: '20+', highlight: 'Nearby Town', priority: 'low' },
]

const whyOnlineForPatiala = [
  { problem: 'GMC Patiala is here but coaching quality varies', icon: Building },
  { problem: '60km+ travel to Chandigarh for good coaching', icon: Car },
  { problem: 'Local coaching lacks AIIMS-level expertise', icon: GraduationCap },
  { problem: 'Rs 8000+/month hostel in Chandigarh', icon: TrendingUp },
  { problem: 'Royal city students deserve royal coaching', icon: Crown },
  { problem: 'University students need flexible timings', icon: Clock },
]

const cerebrumAdvantages = [
  { point: 'AIIMS faculty for GMC Patiala preparation', icon: Award },
  { point: 'No 60km Chandigarh commute needed', icon: Laptop },
  { point: 'Small batches of 10-15 students only', icon: Users },
  { point: 'Punjabi University student friendly', icon: GraduationCap },
  { point: 'Save Rs 1 lakh+ yearly on hostel', icon: TrendingUp },
  { point: '24/7 doubt clearing via WhatsApp', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with expert teaching. Perfect for GMC Patiala aspirants.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Individual attention for every Patiala student. Personal mentoring included.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi - superior to any coaching in Patiala.',
  },
  {
    icon: Crown,
    title: 'Royal City Special',
    description: 'Patiala students get premium coaching without leaving their historic city.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Digital notes, video recordings, 5000+ MCQs - all included.',
  },
  {
    icon: Target,
    title: 'GMC Patiala Focus',
    description: 'Special prep for GMC Patiala (200 seats) - your hometown medical college.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Patiala Students', value: '280+', icon: Users },
  { label: 'Avg Score Improvement', value: '+122', icon: TrendingUp },
  { label: 'GMC Patiala Selections', value: '35+', icon: Award },
]

const patialaSchools = [
  'YPS Patiala',
  'Yadavindra Public School',
  'BVM School Patiala',
  'Army Public School Patiala',
  'Government Mohindra College School',
  'DAV Public School Patiala',
  'Rajindra Hospital School',
  'Multani Mal Modi College School',
  'National College Patiala',
  'Guru Nanak College School',
]

const medicalColleges = [
  { name: 'GMC Patiala', distance: '0 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Amritsar', distance: '180 km', seats: '200', quota: 'Punjab Quota' },
  { name: 'GMC Faridkot', distance: '100 km', seats: '150', quota: 'Punjab Quota' },
  { name: 'GMCH Chandigarh', distance: '60 km', seats: '100', quota: 'UT/Punjab Quota' },
  { name: 'PGIMER Chandigarh', distance: '60 km', seats: '75', quota: 'All India' },
  { name: 'Adesh Medical College', distance: '100 km', seats: '150', quota: 'Private' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Patiala?',
    answer:
      'Cerebrum Biology Academy offers the best NEET coaching for Patiala students through online classes. With AIIMS-trained faculty, small batch sizes (10-15 students), and 98% success rate, we provide superior preparation for GMC Patiala and other medical colleges. Students from Model Town, Leela Bhawan, Urban Estate trust us.',
  },
  {
    question: 'Is there good NEET coaching in Patiala for GMC Patiala preparation?',
    answer:
      'While Patiala has coaching centers, they lack the specialized AIIMS-level faculty needed for competitive NEET scores. Cerebrum Academy\'s online coaching brings expert teachers to Patiala - 35+ of our students have secured admission in GMC Patiala.',
  },
  {
    question: 'What are NEET coaching fees for Patiala students?',
    answer:
      'Cerebrum Academy\'s NEET coaching fees for Patiala students are Rs 45,000-85,000 per year. This is much lower than Chandigarh coaching (Rs 1.5-2 lakhs) plus hostel (Rs 1 lakh). You save significantly while getting better faculty.',
  },
  {
    question: 'How to get admission in GMC Patiala?',
    answer:
      'GMC Patiala has 200 MBBS seats under Punjab quota. NEET 2025 cut-off was around 600+ for general category. Our targeted preparation helps Patiala students achieve these scores - 35+ students from our academy are studying in GMC Patiala.',
  },
  {
    question: 'Is Patiala good for medical studies?',
    answer:
      'Patiala is excellent for medical studies with GMC Patiala being one of Punjab\'s best government medical colleges. The city has a rich educational heritage with Punjabi University. Our coaching helps you get into GMC Patiala from your hometown.',
  },
  {
    question: 'Can Punjabi University students join NEET coaching?',
    answer:
      'Absolutely! Many students doing BSc or other courses at Punjabi University prepare for NEET alongside. Our flexible online timings accommodate college schedules. Several university students have cleared NEET through our program.',
  },
  {
    question: 'What is the NEET cut-off for GMC Patiala?',
    answer:
      'For Punjab quota in NEET 2025, GMC Patiala general category cut-off was approximately 600+. SC/ST/OBC categories have lower cut-offs. We help Patiala students strategize their preparation to achieve these scores.',
  },
  {
    question: 'Can students from Rajpura, Nabha, Samana join?',
    answer:
      'Yes! Students from Rajpura, Nabha, Samana, Ghagga, Bhunerheri, and all areas around Patiala can join our online NEET coaching. We have 80+ students from these areas already enrolled in our batches.',
  },
  {
    question: 'Do you provide study material for NEET to Patiala students?',
    answer:
      'Yes, all Patiala students receive: Digital study notes, chapter-wise video lectures, 5000+ MCQ practice bank, previous year papers (2015-2025), weekly mock tests, and NCERT-based comprehensive Biology material.',
  },
  {
    question: 'Why choose online coaching over local Patiala coaching?',
    answer:
      'Online coaching from Cerebrum gives you: AIIMS-trained faculty (not available locally), smaller batches, better results (98% success rate), comprehensive material, and 24/7 doubt support. Our track record at GMC Patiala proves our effectiveness.',
  },
]

export default function NEETCoachingPatiala() {
  return (
    <>
      <CitySchema
        cityName="Patiala"
        stateName="Punjab"
        description="Best NEET coaching for Patiala students. Online classes from AIIMS faculty. 98% success rate. Serving Model Town, Leela Bhawan, Urban Estate, Tripuri."
        url="https://cerebrumbiologyacademy.com/neet-coaching-patiala"
      />

      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-rose-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div
               className="animate-fadeInUp">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-800">
                  <Crown className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Royal City&apos;s Premier NEET Coaching
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Best NEET Coaching in{' '}
                  <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Patiala
                  </span>
                </h1>

                <p className="mb-4 text-xl text-gray-600">
                  <strong>Punjab&apos;s Royal City</strong> now has AIIMS-level NEET coaching.
                  Prepare for GMC Patiala from your hometown.
                </p>

                <p className="mb-8 text-lg text-gray-600">
                  Online NEET coaching for students from Model Town, Leela Bhawan, Urban Estate,
                  Tripuri, and nearby areas. <strong>98% success rate</strong> with AIIMS faculty.
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
                    <Phone className="h-4 w-4 text-rose-600" />
                    <span>+91 88264 44334</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 from 280+ Patiala students</span>
                  </div>
                </div>
              </div>

              <div
                className="relative animate-fadeInUp"
              >
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                  <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
                    Patiala Students Success Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="rounded-xl bg-rose-50 p-4 text-center">
                        <metric.icon className="mx-auto mb-2 h-8 w-8 text-rose-600" />
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-center text-white">
                    <p className="font-semibold">35+ Selections in GMC Patiala</p>
                    <p className="text-sm opacity-90">Your hometown medical college awaits!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Patiala Students Choose Online */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Patiala Families Choose Online NEET Coaching
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                The Royal City deserves royal-quality NEET preparation
              </p>
            </div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyOnlineForPatiala.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50 p-4 animate-fadeInUp"
                >
                  <div className="rounded-lg bg-red-100 p-2">
                    <item.icon className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="font-medium text-red-800">{item.problem}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white">
              <h3 className="mb-6 text-center text-2xl font-bold">
                Cerebrum Academy Solution for Patiala
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

        {/* Patiala Areas We Serve */}
        <section className="bg-rose-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for Patiala & Nearby Areas
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {patialaAreas.map((area, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 bg-white p-4 ${
                    area.priority === 'high'
                      ? 'border-rose-300 shadow-lg'
                      : area.priority === 'medium'
                        ? 'border-rose-200'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                    {area.priority === 'high' && (
                      <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                        High Demand
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-sm text-gray-600">{area.highlight}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-rose-600">
                    <Users className="h-4 w-4" />
                    {area.students} students enrolled
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Cerebrum is Best for Patiala Students
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg animate-fadeInUp"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-rose-100 p-3">
                    <feature.icon className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="bg-rose-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Students from Top Patiala Schools
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {patialaSchools.map((school, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm animate-fadeInUp"
                >
                  <School className="h-5 w-5 shrink-0 text-rose-600" />
                  <span className="text-sm font-medium text-gray-800">{school}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Colleges */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Target Medical Colleges for Patiala Students
              </h2>
              <p className="text-lg text-gray-600">GMC Patiala is right in your city!</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-rose-50">
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
                      className={`hover:bg-gray-50 ${college.name === 'GMC Patiala' ? 'bg-rose-50' : ''}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {college.name}
                        {college.name === 'GMC Patiala' && (
                          <span className="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">
                            Hometown
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{college.distance}</td>
                      <td className="px-6 py-4 text-gray-600">{college.seats}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            college.quota.includes('Punjab')
                              ? 'bg-rose-100 text-rose-700'
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
        <section className="bg-rose-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cost Comparison: Chandigarh vs Online for Patiala Students
              </h2>
            </div>

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
                    <span className="font-semibold">Rs 12,000 - 18,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total Cost</span>
                      <span>Rs 3,00,000 - 3,98,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-300 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-green-600">
                  Cerebrum Online (From Patiala)
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
                    Save Rs 2,15,000 - 3,13,000 with better results!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div
              className="mb-12 text-center animate-fadeInUp"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                FAQs: NEET Coaching in Patiala
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white animate-fadeInUp"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-900">
                      {faq.question}
                      <span className="ml-4 text-rose-600 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div
             className="animate-fadeInUp">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Join GMC Patiala from Your Hometown?
              </h2>
              <p className="mb-8 text-xl text-rose-100">
                280+ Patiala students trust us. 35+ now studying in GMC Patiala.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="gap-2 bg-white text-rose-600 hover:bg-rose-50">
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
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
