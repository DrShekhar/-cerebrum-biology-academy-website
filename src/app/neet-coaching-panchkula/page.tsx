'use client'

import { motion } from 'framer-motion'
import {
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
  Laptop,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching (Panchkula area). Please share details about online classes.'
)

const panchkulaAreas = [
  { name: 'Sector 12A', students: '30+', highlight: 'Main Commercial', priority: 'high' },
  { name: 'Sector 20', students: '25+', highlight: 'Residential Hub', priority: 'high' },
  { name: 'MDC Sector 5', students: '20+', highlight: 'Modern Complex', priority: 'high' },
  { name: 'Sector 11', students: '18+', highlight: 'Near Hospital', priority: 'medium' },
  { name: 'Sector 4', students: '15+', highlight: 'Old Panchkula', priority: 'medium' },
  { name: 'Sector 14', students: '12+', highlight: 'Residential', priority: 'medium' },
  { name: 'Kalka', students: '15+', highlight: 'Hill Gateway', priority: 'medium' },
  { name: 'Pinjore', students: '10+', highlight: 'Historic Area', priority: 'medium' },
]

const whyNotChandigarh = [
  { problem: '25-40 min commute to Sector 34 Chandigarh', icon: Car },
  { problem: 'Cross UT border daily - traffic hassles', icon: Clock },
  { problem: 'Rs 2500-4000/month on transport', icon: TrendingUp },
  { problem: '2 hours daily wasted in travel', icon: Clock },
  { problem: 'Evening return in dark - safety concerns', icon: Shield },
  { problem: 'Haryana board students need local support', icon: BookOpen },
]

const cerebrumAdvantages = [
  { point: 'Study from Panchkula home - Zero travel', icon: Laptop },
  { point: 'Same Chandigarh quality, online delivery', icon: Award },
  { point: 'Small batches of 10-15 students', icon: Users },
  { point: 'AIIMS-trained faculty', icon: GraduationCap },
  { point: 'Save Rs 40,000+ yearly on commute', icon: TrendingUp },
  { point: 'WhatsApp doubt clearing - instant response', icon: MessageCircle },
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
    description: 'Unlike 100+ batches at Sector 34. Every Panchkula student gets personal attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi. Not available at any Panchkula or nearby coaching.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, evening batches. Perfect for Haryana board school students.',
  },
  {
    icon: BookOpen,
    title: 'CBSE + Haryana Board Support',
    description: 'Content aligned with both CBSE and Haryana board for Panchkula students.',
  },
  {
    icon: Target,
    title: 'PGIMER & BPS GMC Focus',
    description: 'Special prep for PGIMER Chandigarh and BPS GMC Khanpur - top choices for Haryana students.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358/360', icon: Star },
  { label: 'Panchkula Students', value: '150+', icon: Users },
  { label: 'Govt Medical Selections', value: '18+', icon: GraduationCap },
]

const panchkulaSchools = [
  'St. Soldier School',
  'Bhavan Vidyalaya Panchkula',
  'DAV Public School Sector 8',
  'Mount Carmel School',
  'Gurukul Global School',
  'Ryan International School',
  'Shemrock School',
  'Delhi Public School Panchkula',
  'Vivek High School Sector 7',
  'Army Public School',
]

const medicalColleges = [
  { name: 'PGIMER Chandigarh', seats: '150', distance: '12 km', quota: 'All India' },
  { name: 'GMCH Sector 32', seats: '150', distance: '10 km', quota: 'UT + All India' },
  { name: 'BPS GMC Khanpur', seats: '150', distance: '45 km', quota: 'Haryana' },
  { name: 'PGIMS Rohtak', seats: '200', distance: '240 km', quota: 'Haryana' },
  { name: 'Kalpana Chawla GMC', seats: '150', distance: '90 km', quota: 'Haryana' },
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'NEET Syllabus 2026', href: '/neet-syllabus', icon: BookOpen },
  { name: 'Previous Papers', href: '/neet-previous-papers', icon: Target },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Panchkula?',
    answer: 'Cerebrum Biology Academy is the best NEET coaching for Panchkula students. With AIIMS-trained faculty, 98% success rate, and online classes, Panchkula students get top-quality coaching without crossing the border to Chandigarh. 150+ students from Panchkula already enrolled.',
  },
  {
    question: 'How much does NEET coaching cost for Panchkula students?',
    answer: 'Cerebrum Academy fees: Foundation (Class 11) - Rs 24,000/year, Comprehensive (Class 12) - Rs 36,000/year, Dropper batch - Rs 68,000/year. This is 60-70% cheaper than Chandigarh coaching centers, plus you save Rs 40,000+ yearly on transport.',
  },
  {
    question: 'Should Panchkula students go to Chandigarh Sector 34 for NEET coaching?',
    answer: 'Not necessary! Panchkula students waste 2 hours daily commuting to Chandigarh, spend Rs 2500-4000/month on transport, and face border crossing hassles. Cerebrum offers identical quality online - study from your Panchkula home.',
  },
  {
    question: 'Is online NEET coaching effective for Panchkula students?',
    answer: 'Absolutely! Cerebrum\'s online coaching has 98% success rate. Live interactive classes, small batches (10-15 students), instant doubt clearing via WhatsApp, and recorded sessions. 150+ Panchkula students achieving excellent results.',
  },
  {
    question: 'Which areas in Panchkula does Cerebrum serve?',
    answer: 'Cerebrum serves all Panchkula areas: Sector 12A, Sector 20, MDC Sector 5, Sector 11, Sector 4, Sector 14, Kalka, Pinjore, and surrounding areas. Online classes mean no location restrictions.',
  },
  {
    question: 'What are the batch timings for Panchkula students?',
    answer: 'Multiple options: Morning batch (6 AM - 8 AM), After-school batch (4 PM - 6 PM), Evening batch (7 PM - 9 PM). Panchkula students can choose based on school schedule. Weekend batches also available.',
  },
  {
    question: 'Does Cerebrum support Haryana Board students from Panchkula?',
    answer: 'Yes! Our content is aligned with both CBSE and Haryana Board. Many Panchkula students follow Haryana Board, and we ensure NEET preparation complements their board studies. Special focus on Biology for Haryana students.',
  },
  {
    question: 'Which medical colleges can Panchkula students target?',
    answer: 'Panchkula students can target: PGIMER Chandigarh (12 km), GMCH Sector 32 (10 km) for All India quota, and BPS GMC Khanpur, PGIMS Rohtak, Kalpana Chawla GMC for Haryana state quota. We provide college-specific guidance.',
  },
  {
    question: 'Is there NEET coaching in Sector 12A Panchkula?',
    answer: 'There\'s limited quality NEET coaching in Sector 12A. Cerebrum provides superior online coaching accessible from Sector 12A. 30+ students from Sector 12A area enrolled. Save 25+ min daily commute to Chandigarh.',
  },
  {
    question: 'How does Cerebrum compare to Chandigarh coaching centers?',
    answer: 'Cerebrum advantages: (1) Batch size 10-15 vs 60-120 at Allen/Aakash, (2) AIIMS faculty vs regular teachers, (3) Fees Rs 24-68K vs Rs 1-3.5 Lakhs, (4) Online - no Chandigarh commute, (5) 98% success rate, (6) Haryana board support.',
  },
  {
    question: 'Does Cerebrum provide study material for Panchkula students?',
    answer: 'Yes! Complete package: Digital notes (NCERT-based), chapter-wise video lectures, 10,000+ MCQs, previous year papers (2015-2025), mock tests with analysis. All accessible online from Panchkula.',
  },
  {
    question: 'Is dropper batch available for Panchkula students?',
    answer: 'Yes! Dedicated dropper/repeater batch at Rs 68,000/year. Intensive 6-8 hours daily coaching, personal mentorship, weekly tests, AIIMS faculty guidance. Many Panchkula droppers improved 100+ marks.',
  },
  {
    question: 'How to book free demo from Panchkula?',
    answer: 'Easy process: (1) Call/WhatsApp: +91-8826444334, (2) Visit cerebrumbiologyacademy.com, (3) Attend live demo class from your Panchkula home, (4) Meet AIIMS faculty. Free demo - no commitment.',
  },
  {
    question: 'What is the success rate for Panchkula students?',
    answer: '98% of Cerebrum students qualify NEET. From Panchkula: 18+ students in government medical colleges in 2024, 6 in PGIMER/GMCH, 5 in Haryana GMCs. Highest score 358/360 in Biology.',
  },
  {
    question: 'Are there scholarships for Panchkula students?',
    answer: 'Yes! Monthly scholarship test with 25-100% fee waiver for top performers. Panchkula students can appear online. Also: sibling discount (10%), early bird discount (15%), need-based financial aid.',
  },
  {
    question: 'Can Kalka students join Cerebrum?',
    answer: 'Absolutely! 15+ students from Kalka area enrolled. Online classes mean excellent connectivity from Kalka. No need to travel to Panchkula city or Chandigarh. Study from the comfort of your home in Kalka.',
  },
  {
    question: 'What makes Cerebrum better than local Panchkula tutors?',
    answer: 'Key differences: (1) AIIMS-trained faculty vs local graduates, (2) Structured NEET curriculum vs generic teaching, (3) National-level mock tests, (4) 98% proven success rate, (5) Complete study material, (6) Technology-enabled learning.',
  },
  {
    question: 'How do Panchkula students clear doubts online?',
    answer: 'Multiple channels: (1) Live doubt solving during class, (2) WhatsApp direct to faculty (2-hour response guarantee), (3) Weekly dedicated doubt sessions, (4) One-on-one video calls. No doubt remains unanswered.',
  },
]

export default function NEETCoachingPanchkulaPage() {
  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Panchkula"
        citySlug="panchkula"
        state="Haryana"
        localities={panchkulaAreas.map((a) => a.name)}
        faqs={faqs}
        studentCount="150+"
        coordinates={{ lat: '30.6942', lng: '76.8606' }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-6">
                🎯 150+ Panchkula Students | Haryana's Smart Choice
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Panchkula
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed">
                Why cross the border to Chandigarh? Get <strong>same quality NEET coaching</strong> online
                from your Panchkula home. AIIMS faculty, 98% success rate, starting ₹24,000/year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Now
                  </Button>
                </Link>
                <Link href="/book-free-demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                    Book Free Demo Class
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50"
              >
                <metric.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl lg:text-4xl font-bold text-purple-900">{metric.value}</div>
                <div className="text-gray-600 mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Chandigarh */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Panchkula Students Should <span className="text-red-600">NOT</span> Go to Chandigarh
            </h2>
            <p className="text-xl text-gray-600">The hidden costs of crossing the border daily</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyNotChandigarh.map((item, index) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-red-100"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cerebrum Solution */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-green-600">Cerebrum Solution</span> for Panchkula
            </h2>
            <p className="text-xl text-gray-600">Premium NEET coaching delivered to your Haryana home</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cerebrumAdvantages.map((item, index) => (
              <motion.div
                key={item.point}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-green-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Panchkula Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Students from All <span className="text-purple-600">Panchkula Areas</span>
            </h2>
            <p className="text-xl text-gray-600">Online classes accessible across Panchkula district</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {panchkulaAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl text-center ${
                  area.priority === 'high'
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="font-bold text-lg">{area.name}</div>
                <div className={`text-sm ${area.priority === 'high' ? 'text-purple-100' : 'text-gray-600'}`}>
                  {area.students} students
                </div>
                <div className={`text-xs mt-1 ${area.priority === 'high' ? 'text-purple-200' : 'text-gray-500'}`}>
                  {area.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Panchkula Students Choose Cerebrum
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <School className="w-10 h-10 inline-block mr-3 text-purple-600" />
              Students from Top Panchkula Schools
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {panchkulaSchools.map((school) => (
              <span
                key={school}
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Colleges */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Target Medical Colleges for Panchkula Students
            </h2>
            <p className="text-lg text-gray-600">Haryana quota + All India options</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {medicalColleges.map((college) => (
              <div key={college.name} className="bg-white p-4 rounded-xl text-center shadow-sm">
                <GraduationCap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900 text-sm">{college.name}</div>
                <div className="text-xs text-gray-600">{college.seats} seats</div>
                <div className="text-xs text-purple-600 font-medium">{college.quota}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cost Comparison: Chandigarh vs Cerebrum
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <h3 className="text-xl font-bold text-red-700 mb-6">Chandigarh Coaching (from Panchkula)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹1,50,000 - ₹3,50,000</span></li>
                <li className="flex justify-between"><span>Transport (yearly)</span><span className="font-bold">₹30,000 - ₹48,000</span></li>
                <li className="flex justify-between"><span>Time Wasted (hrs/year)</span><span className="font-bold">500+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">60-120 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-red-700">₹1,80,000+</span></li>
              </ul>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-6">Cerebrum Online (From Panchkula)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹24,000 - ₹68,000</span></li>
                <li className="flex justify-between"><span>Transport</span><span className="font-bold">₹0</span></li>
                <li className="flex justify-between"><span>Time Saved</span><span className="font-bold">500+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">10-15 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-green-700">₹24,000 - ₹68,000</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-green-600">Save ₹1,10,000+ with Cerebrum!</p>
          </div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Free NEET Tools for Panchkula Students</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <tool.icon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions - NEET Coaching Panchkula
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-5 bg-white">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your NEET Journey from Panchkula?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 150+ Panchkula students who chose smart preparation over daily Chandigarh commute.
            Book your free demo class today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call/WhatsApp: +91-8826444334
              </Button>
            </Link>
            <Link href="/book-free-demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Book Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/neet-coaching-chandigarh" className="hover:text-purple-600">NEET Coaching Chandigarh</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Panchkula</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
