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
  'Hi! I am interested in NEET coaching (Zirakpur area). Please share details about online classes.'
)

const zirakpurAreas = [
  { name: 'VIP Road', students: '25+', highlight: 'Main Highway', priority: 'high' },
  { name: 'Baltana', students: '20+', highlight: 'Growing Hub', priority: 'high' },
  { name: 'Dhakoli', students: '15+', highlight: 'Residential', priority: 'high' },
  { name: 'Maya Garden', students: '12+', highlight: 'Premium Township', priority: 'medium' },
  { name: 'Patiala Road', students: '10+', highlight: 'Main Road', priority: 'medium' },
  { name: 'Lohgarh', students: '8+', highlight: 'Nearby Area', priority: 'medium' },
]

const whyNotSector34 = [
  { problem: '30-45 min daily commute to Chandigarh', icon: Car },
  { problem: 'Heavy traffic on Zirakpur-Chandigarh road', icon: Clock },
  { problem: 'Rs 3000-4500/month transport cost', icon: TrendingUp },
  { problem: 'VIP Road traffic jams waste hours', icon: Clock },
  { problem: 'No quality NEET coaching in Zirakpur', icon: BookOpen },
  { problem: 'Parents worry about daily travel safety', icon: Shield },
]

const cerebrumAdvantages = [
  { point: 'Study from Zirakpur home - Zero commute', icon: Laptop },
  { point: 'Same Sector 34 quality, online delivery', icon: Award },
  { point: 'Small batches of 10-15 students', icon: Users },
  { point: 'AIIMS-trained faculty', icon: GraduationCap },
  { point: 'Save Rs 45,000+ yearly on travel', icon: TrendingUp },
  { point: 'WhatsApp doubt support - always available', icon: MessageCircle },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online sessions from Zirakpur. Same quality as Sector 34 coaching centers.',
  },
  {
    icon: Users,
    title: 'Batch Size: 10-15 Only',
    description: 'Unlike 100+ batches at Chandigarh centers. Every Zirakpur student gets attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: 'Teachers trained at AIIMS Delhi. Not available in Zirakpur or nearby areas.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning and evening batches. Perfect for school students in Zirakpur.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'Digital notes, video recordings, mock tests - all included in fees.',
  },
  {
    icon: Target,
    title: 'PGIMER Focus',
    description: 'Special preparation for PGIMER, GMCH - dream colleges for Zirakpur students.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358/360', icon: Star },
  { label: 'Zirakpur Students', value: '90+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const zirakpurSchools = [
  'Shivalik Public School',
  'Rayat Bahra School',
  'Guru Nanak Public School',
  'Spring Dale Senior School',
  'Woodland School',
  'Little Flower Convent',
  'KC International School',
  'Doon Public School',
]

const medicalColleges = [
  { name: 'PGIMER Chandigarh', seats: '150', distance: '15 km' },
  { name: 'GMCH Sector 32', seats: '150', distance: '12 km' },
  { name: 'AIIMS Bathinda', seats: '100', distance: '185 km' },
  { name: 'GMC Patiala', seats: '250', distance: '55 km' },
  { name: 'DMC Ludhiana', seats: '200', distance: '95 km' },
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'NEET Syllabus 2026', href: '/neet-syllabus', icon: BookOpen },
  { name: 'Previous Papers', href: '/neet-previous-papers', icon: Target },
]

const faqs = [
  {
    question: 'Is there any good NEET coaching in Zirakpur?',
    answer: 'Zirakpur lacks quality NEET coaching centers. Cerebrum Biology Academy provides online NEET coaching accessible from Zirakpur with AIIMS faculty, 94.2% success rate. 90+ Zirakpur students already enrolled. Better than traveling to Chandigarh daily!',
  },
  {
    question: 'How much does NEET coaching cost for Zirakpur students?',
    answer: 'Cerebrum Academy fees: Foundation (Class 11) - Rs 24,000/year, Comprehensive (Class 12) - Rs 36,000/year, Dropper batch - Rs 68,000/year. Plus you save Rs 45,000+ yearly by not traveling to Chandigarh Sector 34.',
  },
  {
    question: 'Should Zirakpur students travel to Chandigarh for NEET coaching?',
    answer: 'No! Zirakpur to Sector 34 takes 30-45 min each way, costs Rs 3000-4500/month in transport, and VIP Road traffic is unpredictable. Cerebrum offers same quality online - study from home in Zirakpur.',
  },
  {
    question: 'Which areas in Zirakpur does Cerebrum cover?',
    answer: 'Cerebrum serves all Zirakpur areas: VIP Road, Baltana, Dhakoli, Maya Garden, Patiala Road, Lohgarh, and nearby localities. Online classes = no travel required.',
  },
  {
    question: 'What are the batch timings for Zirakpur students?',
    answer: 'Multiple options: Morning batch (6 AM - 8 AM), After-school batch (4 PM - 6 PM), Evening batch (7 PM - 9 PM). Choose based on your school timing. Weekend batches also available.',
  },
  {
    question: 'Is online NEET coaching effective for Zirakpur students?',
    answer: 'Yes! 94.2% success rate. Live interactive classes, small batches (10-15 students), instant WhatsApp doubt clearing, recorded sessions for revision. 90+ Zirakpur students achieving great results.',
  },
  {
    question: 'Which medical colleges can Zirakpur students target?',
    answer: 'Target colleges: PGIMER Chandigarh (15 km), GMCH Sector 32 (12 km), AIIMS Bathinda, GMC Patiala (55 km for Punjab quota), DMC Ludhiana. Cerebrum provides college-specific guidance.',
  },
  {
    question: 'How does Cerebrum compare to Chandigarh coaching?',
    answer: 'Cerebrum advantages: (1) Batch 10-15 vs 60-120 at Allen/Aakash, (2) AIIMS faculty, (3) Fees Rs 24-68K vs Rs 1.5-3.5 Lakhs, (4) No Chandigarh commute from Zirakpur, (5) 94.2% success rate.',
  },
  {
    question: 'Is NEET coaching available on VIP Road Zirakpur?',
    answer: 'There\'s no dedicated NEET coaching on VIP Road. Cerebrum\'s online coaching is accessible from VIP Road area. 25+ students from VIP Road enrolled. Save 30+ min daily commute to Chandigarh.',
  },
  {
    question: 'Does Cerebrum provide study material for Zirakpur students?',
    answer: 'Complete package included: Digital notes, chapter-wise video lectures, 10,000+ MCQs, previous year papers (2015-2025), mock tests with analysis. All accessible online from Zirakpur.',
  },
  {
    question: 'Is dropper batch available for Zirakpur students?',
    answer: 'Yes! Dedicated dropper batch at Rs 68,000/year. Intensive 6-8 hours daily, personal mentorship, weekly tests, AIIMS faculty. Many Zirakpur droppers improved 100+ marks with Cerebrum.',
  },
  {
    question: 'How to book free demo from Zirakpur?',
    answer: 'Simple: (1) Call/WhatsApp: +91-8826444334, (2) Visit cerebrumbiologyacademy.com, (3) Attend live demo from Zirakpur home, (4) Meet AIIMS faculty. Free demo - no commitment required.',
  },
  {
    question: 'Can Baltana students join Cerebrum?',
    answer: 'Absolutely! 20+ students from Baltana already enrolled. Online classes mean no travel from Baltana to anywhere. Study from home with same quality as Chandigarh coaching.',
  },
  {
    question: 'Are there scholarships for Zirakpur students?',
    answer: 'Yes! Monthly scholarship test with 25-100% fee waiver. Zirakpur students appear online. Also: sibling discount (10%), early bird discount (15%), need-based scholarships available.',
  },
  {
    question: 'What is the success rate for Zirakpur students?',
    answer: '94.2% overall success rate. From Zirakpur specifically: 12+ students in government medical colleges in 2024, several in PGIMER/GMCH. Highest Biology score 358/360.',
  },
]

export default function NEETCoachingZirakpurPage() {
  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Zirakpur"
        citySlug="zirakpur"
        state="Punjab"
        localities={zirakpurAreas.map((a) => a.name)}
        faqs={faqs}
        studentCount="90+"
        coordinates={{ lat: '30.6430', lng: '76.8174' }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium mb-6">
                🎯 90+ Zirakpur Students | Fastest Growing Area
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Best NEET Coaching in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  Zirakpur
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-teal-100 mb-8 leading-relaxed">
                Finally! Quality NEET coaching accessible from Zirakpur. <strong>No more VIP Road traffic</strong> to
                Chandigarh. AIIMS faculty, 94.2% success rate, starting ₹24,000/year.
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
                className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50"
              >
                <metric.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <div className="text-3xl lg:text-4xl font-bold text-teal-900">{metric.value}</div>
                <div className="text-gray-600 mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Sector 34 */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-red-600">Zirakpur Problem</span>: No Good Coaching
            </h2>
            <p className="text-xl text-gray-600">Why Zirakpur students struggle with NEET preparation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyNotSector34.map((item, index) => (
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
              <span className="text-green-600">Cerebrum</span>: Zirakpur's NEET Solution
            </h2>
            <p className="text-xl text-gray-600">Premium coaching delivered to your Zirakpur home</p>
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

      {/* Zirakpur Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Students from All <span className="text-teal-600">Zirakpur Areas</span>
            </h2>
            <p className="text-xl text-gray-600">Online classes accessible from every locality</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {zirakpurAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl text-center ${
                  area.priority === 'high'
                    ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="font-bold text-lg">{area.name}</div>
                <div className={`text-sm ${area.priority === 'high' ? 'text-teal-100' : 'text-gray-600'}`}>
                  {area.students} students
                </div>
                <div className={`text-xs mt-1 ${area.priority === 'high' ? 'text-teal-200' : 'text-gray-500'}`}>
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
              Why Zirakpur Families Choose Cerebrum
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
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-teal-600" />
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
              <School className="w-10 h-10 inline-block mr-3 text-teal-600" />
              Students from Zirakpur Schools
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {zirakpurSchools.map((school) => (
              <span
                key={school}
                className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Colleges */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Target Medical Colleges for Zirakpur Students
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {medicalColleges.map((college) => (
              <div key={college.name} className="bg-white p-4 rounded-xl text-center shadow-sm">
                <GraduationCap className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900 text-sm">{college.name}</div>
                <div className="text-xs text-gray-600">{college.seats} seats</div>
                <div className="text-xs text-gray-500">{college.distance} from Zirakpur</div>
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
              Cost: Chandigarh Commute vs Cerebrum Online
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <h3 className="text-xl font-bold text-red-700 mb-6">Chandigarh Coaching (from Zirakpur)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹1,50,000 - ₹3,50,000</span></li>
                <li className="flex justify-between"><span>Transport (yearly)</span><span className="font-bold">₹36,000 - ₹54,000</span></li>
                <li className="flex justify-between"><span>Time Lost (hrs/year)</span><span className="font-bold">550+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">60-120 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-red-700">₹1,90,000+</span></li>
              </ul>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-6">Cerebrum Online (From Zirakpur)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span>Tuition Fee</span><span className="font-bold">₹24,000 - ₹68,000</span></li>
                <li className="flex justify-between"><span>Transport</span><span className="font-bold">₹0</span></li>
                <li className="flex justify-between"><span>Time Saved</span><span className="font-bold">550+ hours</span></li>
                <li className="flex justify-between"><span>Batch Size</span><span className="font-bold">10-15 students</span></li>
                <li className="flex justify-between border-t pt-3 text-lg"><span>Total Cost</span><span className="font-bold text-green-700">₹24,000 - ₹68,000</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-green-600">Save ₹1,20,000+ with Cerebrum!</p>
          </div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Free NEET Tools for Zirakpur Students</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <tool.icon className="w-5 h-5 text-teal-600" />
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
              Frequently Asked Questions - NEET Coaching Zirakpur
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
                    <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
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
      <section className="py-16 bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Start Your NEET Journey from Zirakpur Today!
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join 90+ Zirakpur students who chose quality education over daily commute stress.
            Book your free demo class now!
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
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/neet-coaching-punjab" className="hover:text-teal-600">NEET Coaching Punjab</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Zirakpur</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
