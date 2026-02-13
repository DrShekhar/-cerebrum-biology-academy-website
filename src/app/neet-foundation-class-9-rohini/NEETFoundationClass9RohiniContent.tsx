'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Award, Users, Target, GraduationCap, Star, Train, Calculator, Building2, Brain,
  Sparkles, Trophy, ArrowRight, MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const rohiniCenter = CONTACT_INFO.centers.rohini

const syllabusTopics = [
  { unit: 'Cell - The Unit of Life', chapters: ['Cell structure & organelles', 'Prokaryotic vs Eukaryotic', 'Cell division basics'], neetRelevance: 'High', questions: '15-20' },
  { unit: 'Tissues', chapters: ['Plant tissues types', 'Animal tissues classification', 'Tissue functions & NEET MCQs'], neetRelevance: 'High', questions: '12-15' },
  { unit: 'Diversity in Living Organisms', chapters: ['Five Kingdom Classification', 'Nomenclature rules', 'Characteristic features'], neetRelevance: 'Medium', questions: '10-12' },
  { unit: 'Life Processes - I', chapters: ['Nutrition in plants & animals', 'Respiration mechanisms', 'Transport systems'], neetRelevance: 'High', questions: '18-22' },
  { unit: 'Scientific Methodology', chapters: ['Observation & hypothesis', 'Experimental design', 'Data interpretation'], neetRelevance: 'Foundation', questions: 'Builds base' },
]

const benefits = [
  { title: '3-Year NEET Advantage', description: 'Start early, score higher. Class 9 foundation leads to 50-100 marks improvement in NEET.', icon: Clock },
  { title: '98% NEET Qualification', description: 'Our students have 98% NEET qualification rate with multiple AIIMS selections.', icon: Trophy },
  { title: 'DC Chauk Location', description: 'Prime Rohini location at Vikas Surya Tower. 5 min from Rohini West Metro.', icon: MapPin },
  { title: 'Small Batch Excellence', description: 'Maximum 15-18 students per batch for personalized NEET coaching.', icon: Users },
  { title: 'AIIMS Faculty', description: 'Learn from Dr. Shekhar Singh (AIIMS Delhi) with 15+ years experience.', icon: GraduationCap },
  { title: 'NEET MCQ Training', description: 'Early exposure to NEET pattern MCQs builds competitive exam temperament.', icon: Target },
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator, description: 'Predict your All India Rank', color: 'bg-orange-100 text-orange-600' },
  { name: 'NEET College Predictor', href: '/neet-college-predictor', icon: Building2, description: 'Find colleges for your rank', color: 'bg-blue-100 text-blue-600' },
  { name: 'Biology MCQ Practice', href: '/neet-biology-mcq', icon: Brain, description: '10,000+ NEET Biology MCQs', color: 'bg-green-100 text-green-600' },
]

const topperResults = [
  { name: 'Sadhna Sirin', score: '695/720', college: 'LHMC Delhi', percentile: '100%' },
  { name: 'Nishita', score: '680/720', college: 'Government Medical College', percentile: '99.9%' },
  { name: 'Aditya', score: '672/720', college: 'AFMC Pune', percentile: '99.8%' },
]

const nearbySchools = [
  'DPS Rohini', 'Ryan International Rohini', 'Bal Bharati Public School', 'Mount Abu Public School',
  'Venkateshwar International', 'DPSG Rohini', 'RPVV Rohini', 'Sanskriti School', 'DAV Public School',
  'St. Marks Public School', 'Modern Public School', 'Tagore International'
]

const metroConnectivity = [
  { station: 'Rohini West', line: 'Red Line', distance: '5 min walk' },
  { station: 'Rohini East', line: 'Red Line', distance: '10 min walk' },
  { station: 'Pitampura', line: 'Red Line', distance: '2 stations' },
  { station: 'Netaji Subhash Place', line: 'Red/Pink Lines', distance: '4 stations' },
]

export default function NEETFoundationClass9RohiniContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'foundation-class9-rohini',
      message: 'Hi! I want to start NEET preparation from Class 9 at Rohini center',
      campaign: 'foundation-class9-rohini',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-rohini" className="text-gray-600 hover:text-teal-600">NEET Coaching Rohini</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Foundation Class 9</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-green-900 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                3-Year NEET Preparation Program
              </div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium">
                <Trophy className="w-4 h-4" />
                98% NEET Qualification Rate
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Foundation Class 9
              <span className="block text-green-400 mt-2">in Rohini, Delhi</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Start your medical dream journey from Class 9 at our DC Chauk center in Rohini.
              Join Sadhna Sirin (695/720), Nishita, Aditya, and 1,50,000+ successful students.
              Build strong biology foundation for NEET with AIIMS-trained faculty.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-green-400" />
                <span>3-Year Head Start</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Train className="w-5 h-5 text-red-400" />
                <span>Rohini West Metro - 5 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Top Score: 695/720</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-green-500 text-white hover:bg-green-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <MessageCircle className="w-5 h-5" />WhatsApp: +91-88264-44334
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold">98%</p>
              <p className="text-green-100 mt-1">NEET Qualification Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">695</p>
              <p className="text-green-100 mt-1">Top Score (Sadhna Sirin)</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">67+</p>
              <p className="text-green-100 mt-1">Medical College Selections</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">15+</p>
              <p className="text-green-100 mt-1">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Start Early */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Why Class 9?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              3-Year Advantage for NEET Success
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Students who start NEET preparation from Class 9 at Cerebrum consistently outperform those who start in Class 11
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topper Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4 inline mr-1" /> Our Toppers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Students Who Started Early, Scored Big</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topperResults.map((topper, index) => (
              <div
                key={topper.name}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 text-center animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {topper.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{topper.name}</h3>
                <p className="text-3xl font-bold text-green-600 my-2">{topper.score}</p>
                <p className="text-slate-600">{topper.college}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {topper.percentile} Percentile
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE NEET Tools */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              100% FREE NEET Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Start Preparing Now with Free Tools</h2>
            <p className="text-slate-600">Use our AI-powered tools to predict your NEET rank and college chances</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {neetTools.map((tool, index) => (
              <div
                key={tool.name}
               className="animate-fadeInUp">
                <Link
                  href={tool.href}
                  className="group block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all h-full"
                >
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-gray-500 mt-1">{tool.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 mt-3 group-hover:gap-2 transition-all">
                    Try Free <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/neet-tools" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              View All Free NEET Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Class 9 NEET Foundation Syllabus</h2>
            <p className="text-xl text-slate-600">NCERT-aligned curriculum with NEET MCQ pattern integration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic, index) => (
              <div
                key={topic.unit}
                className="bg-green-50 rounded-2xl p-6 border border-green-100 animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 pr-2">{topic.unit}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                    topic.neetRelevance === 'High' ? 'bg-green-200 text-green-700' :
                    topic.neetRelevance === 'Medium' ? 'bg-yellow-200 text-yellow-700' :
                    'bg-blue-200 text-blue-700'
                  }`}>
                    {topic.neetRelevance} NEET
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{chapter}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-slate-500 border-t border-green-200 pt-3">
                  Expected NEET Questions: <span className="font-medium text-green-600">{topic.questions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Schools */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-4">Students from Top Rohini Schools</h2>
            <p className="text-green-100">We have students from all major schools in North-West Delhi</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbySchools.map((school) => (
              <span key={school} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">{school}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg animate-fadeInUp"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Course</span><span className="font-semibold">Class IX NEET Foundation</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Duration</span><span className="font-semibold">1 Year (Continues to Class 10, 11, 12)</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Fee Range</span><span className="font-semibold text-green-600">Rs 45,000 - Rs 90,000/year</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Tiers</span><span className="font-semibold">Pursuit | Ascent | Pinnacle</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-slate-600">Batch Size</span><span className="font-semibold">10-40 students (by tier)</span></div>
                <div className="flex justify-between py-3"><span className="text-slate-600">Mode</span><span className="font-semibold">Offline + Online Support</span></div>
              </div>
              <div className="mt-6 space-y-3">
                <Link href="/demo-booking" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Book Free Demo Class</Button>
                </Link>
                <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Quick Response
                </button>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 animate-fadeInUp"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Rohini Center</h2>
              </div>
              <p className="text-gray-700 mb-4"><strong>Address:</strong> {rohiniCenter.streetAddress}, {rohiniCenter.addressLocality}</p>
              <p className="text-gray-700 mb-4"><strong>Landmark:</strong> Vikas Surya Tower, DC Chauk, Sector 9</p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Train className="w-5 h-5 text-red-500" /> Metro Connectivity
                </h3>
                <div className="space-y-2">
                  {metroConnectivity.map((metro) => (
                    <div key={metro.station} className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 text-sm">
                      <span className="font-medium text-gray-800">{metro.station}</span>
                      <div className="text-right">
                        <span className="text-red-500 text-xs">{metro.line}</span>
                        <span className="text-gray-500 ml-2">{metro.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button>
                </a>
                <a href={rohiniCenter.mapUrl} target="_blank" rel="noopener">
                  <Button><MapPin className="w-4 h-4 mr-2" />Get Directions</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/neet-foundation-class-10-rohini" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Foundation Class 10 Rohini</h3>
              <p className="text-sm text-gray-600">Continue your NEET journey</p>
            </Link>
            <Link href="/neet-coaching-rohini" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Rohini</h3>
              <p className="text-sm text-gray-600">Full NEET program</p>
            </Link>
            <Link href="/neet-biology-mcq" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Biology MCQ Practice</h3>
              <p className="text-sm text-gray-600">10,000+ free MCQs</p>
            </Link>
            <Link href="/neet-rank-predictor" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Rank Predictor</h3>
              <p className="text-sm text-gray-600">Free AI-powered tool</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your 3-Year NEET Journey from Class 9</h2>
          <p className="text-xl mb-4 opacity-90">Join Cerebrum Biology Academy Rohini - 98% NEET Qualification Rate</p>
          <p className="text-lg mb-8 opacity-80">DC Chauk, Sector 9 | 5 min from Rohini West Metro</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button variant="secondary" size="xl" className="bg-white text-green-600 hover:bg-gray-100 font-bold">
                <Play className="w-5 h-5 mr-2" />Book Free Demo
              </Button>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-600 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />WhatsApp Now
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
