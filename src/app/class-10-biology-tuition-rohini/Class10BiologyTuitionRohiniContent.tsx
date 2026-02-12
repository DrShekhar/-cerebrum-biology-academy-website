'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
  Users,
  Target,
  GraduationCap,
  FileText,
  Microscope,
  Dna,
  Brain,
  Leaf,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const syllabusTopics = [
  {
    unit: 'Life Processes',
    chapters: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'],
    board: 'CBSE & ICSE',
    icon: Dna,
    neetRelevance: 'High',
  },
  {
    unit: 'Control & Coordination',
    chapters: ['Nervous System', 'Hormonal Control', 'Reflex Actions', 'Plant Hormones'],
    board: 'CBSE & ICSE',
    icon: Brain,
    neetRelevance: 'Very High',
  },
  {
    unit: 'How Do Organisms Reproduce',
    chapters: ['Asexual Reproduction', 'Sexual Reproduction', 'Human Reproduction', 'Reproductive Health'],
    board: 'CBSE & ICSE',
    icon: Microscope,
    neetRelevance: 'Very High',
  },
  {
    unit: 'Heredity & Evolution',
    chapters: ['Mendel\'s Laws', 'Sex Determination', 'Evolution', 'Speciation'],
    board: 'CBSE & ICSE',
    icon: Dna,
    neetRelevance: 'Very High',
  },
  {
    unit: 'Our Environment',
    chapters: ['Ecosystem', 'Food Chain & Web', 'Ozone Depletion', 'Waste Management'],
    board: 'CBSE & ICSE',
    icon: Leaf,
    neetRelevance: 'High',
  },
]

const features = [
  {
    title: 'Board + NEET Dual Prep',
    description: 'Integrated preparation for board exams and NEET foundation',
    icon: Target,
  },
  {
    title: 'CBSE & ICSE Coverage',
    description: 'Complete syllabus coverage for both board patterns',
    icon: FileText,
  },
  {
    title: 'Experienced Teachers',
    description: 'Faculty with 15+ years of teaching Class 10 Biology',
    icon: Users,
  },
  {
    title: 'Small Batch Size',
    description: 'Maximum 15 students per batch for personal attention',
    icon: GraduationCap,
  },
  {
    title: 'NCERT + Beyond',
    description: 'NCERT mastery plus competitive exam preparation',
    icon: Microscope,
  },
  {
    title: 'Regular Testing',
    description: 'Weekly tests, monthly assessments & mock board exams',
    icon: BookOpen,
  },
]

const boardComparison = [
  { topic: 'Life Processes', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Nutrition, Respiration, Transport, Excretion' },
  { topic: 'Control & Coordination', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Nervous & Hormonal systems' },
  { topic: 'Reproduction', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Asexual & Sexual reproduction' },
  { topic: 'Heredity & Evolution', cbse: '1 Chapter', icse: '2 Chapters', focus: 'Genetics & Evolution theory' },
  { topic: 'Environment', cbse: '1 Chapter', icse: '1 Chapter', focus: 'Ecosystem & Waste management' },
]

const premiumSchools = [
  'DPS Rohini',
  'Ryan International Rohini',
  'Bal Bharati Rohini',
  'GD Goenka Rohini',
  'Mount Abu Public School',
  'Venkateshwar International',
  'St. Marks Sr. Sec. School',
  'Maharaja Agrasen Model School',
  'N.C. Jindal Public School',
]

const neetFoundationBenefits = [
  'Deep conceptual understanding beyond board syllabus',
  'NCERT-based MCQ practice from Class 10 itself',
  'Application-based problem solving',
  'Foundation for Class 11-12 NEET topics',
  '2-year head start for NEET preparation',
  'Diagram-based questions practice',
]

export default function Class10BiologyTuitionRohiniContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'class10-biology-tuition-rohini',
      message: 'Hi! I am interested in Class 10 Biology tuition in Rohini (DC Chauk center). Please share details about Board + NEET preparation.',
      campaign: 'class10-biology-tuition-rohini',
    })
  }

  const rohiniCenter = CONTACT_INFO.centers.rohini

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/biology-coaching" className="text-gray-600 hover:text-teal-600">
                Biology Tuition
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Class 10 Rohini</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Board + NEET Dual Preparation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Class 10 Biology Tuition
              <span className="block text-emerald-400 mt-2">in Rohini, Delhi</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Excel in your Class 10 Board exams while building a strong NEET foundation. Our DC Chauk center offers
              expert-led Biology tuition with dual preparation approach for CBSE & ICSE students.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-emerald-400" />
                <span>Board + NEET</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>CBSE & ICSE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-teal-400" />
                <span>Max 15 Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>DC Chauk Center</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: +91-88264-44334
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Board + NEET Dual Prep */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Board + NEET Dual Preparation?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Class 10 is the perfect time to start NEET foundation - 80% of Class 10 Biology is directly relevant to NEET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                NEET Foundation Benefits
              </h3>
              <ul className="space-y-4">
                {neetFoundationBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Class 10 to NEET Connection</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Life Processes</div>
                  <div className="text-sm text-emerald-100">
                    Direct foundation for Human Physiology (NEET weightage: 20%)
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Heredity & Evolution</div>
                  <div className="text-sm text-emerald-100">
                    Basis for Genetics & Evolution chapters (NEET weightage: 18%)
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Control & Coordination</div>
                  <div className="text-sm text-emerald-100">
                    Foundation for Neural Control & Endocrine System (NEET weightage: 12%)
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Reproduction</div>
                  <div className="text-sm text-emerald-100">
                    Base for Human & Plant Reproduction (NEET weightage: 9%)
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Class 10 Biology Tuition?
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive preparation for both CBSE and ICSE boards with NEET foundation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">CBSE vs ICSE Coverage</h2>
            <p className="text-xl text-slate-600">We cover both board patterns comprehensively</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Topic</th>
                  <th className="px-6 py-4 text-center">CBSE</th>
                  <th className="px-6 py-4 text-center">ICSE</th>
                  <th className="px-6 py-4 text-left">Key Focus</th>
                </tr>
              </thead>
              <tbody>
                {boardComparison.map((row, index) => (
                  <tr key={row.topic} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.topic}</td>
                    <td className="px-6 py-4 text-center">{row.cbse}</td>
                    <td className="px-6 py-4 text-center">{row.icse}</td>
                    <td className="px-6 py-4 text-slate-600">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Class 10 Biology Syllabus
            </h2>
            <p className="text-xl text-slate-600">All NCERT chapters covered with NEET relevance highlighted</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic, index) => (
              <motion.div
                key={topic.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <topic.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{topic.unit}</h3>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    {topic.board}
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    NEET: {topic.neetRelevance}
                  </span>
                </div>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Students from Top Rohini Schools</h2>
            <p className="text-emerald-100">We teach students from all major CBSE & ICSE schools in Rohini</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {premiumSchools.map((school) => (
              <span
                key={school}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-emerald-100">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Class X Foundation (Board + NEET)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-emerald-100">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-emerald-100">
                  <span className="text-slate-600">Fee Range</span>
                  <span className="font-semibold text-emerald-600">Rs. 45,000 - Rs. 65,000/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-emerald-100">
                  <span className="text-slate-600">Tiers</span>
                  <span className="font-semibold">Pursuit | Ascent | Pinnacle</span>
                </div>
                <div className="flex justify-between py-3 border-b border-emerald-100">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">10-40 students (by tier)</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Includes</span>
                  <span className="font-semibold">Study material + NEET MCQs + Doubt sessions</span>
                </div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Free Demo</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-emerald-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Rohini Center</h2>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong> {rohiniCenter.streetAddress}, {rohiniCenter.addressLocality}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Landmark:</strong> Vikas Surya Tower, DC Chauk, Sector 9
              </p>
              <div className="flex items-start gap-2 text-gray-700 mb-6">
                <Train className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Metro:</strong> Rohini West Metro Station (Red Line) - 5 min walk
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Nearby Areas</h4>
                <p className="text-sm text-slate-600">
                  Sector 9, Sector 8, Sector 7, DC Chowk, Rohini West, Rithala, Pitampura, Netaji Subhash Place
                </p>
              </div>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={rohiniCenter.mapUrl} target="_blank" rel="noopener">
                  <Button>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Planning for NEET?"
        subtitle="Start using our free NEET preparation tools alongside your Class 10 studies"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/class-9-biology-tuition-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Class 9 Biology Rohini</h3>
              <p className="text-sm text-gray-600">Foundation building</p>
            </Link>
            <Link
              href="/neet-foundation-class-10-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Foundation Class 10</h3>
              <p className="text-sm text-gray-600">Early NEET prep</p>
            </Link>
            <Link
              href="/neet-coaching-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Rohini</h3>
              <p className="text-sm text-gray-600">Full NEET program</p>
            </Link>
            <Link
              href="/biology-tuition-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Biology Tuition Rohini</h3>
              <p className="text-sm text-gray-600">All classes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Class 10 Board + NEET Journey
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the best Class 10 Biology tuition in Rohini at our DC Chauk center
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp: +91-88264-44334
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  )
}
