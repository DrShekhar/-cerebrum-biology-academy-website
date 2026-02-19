'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Users,
  Target,
  Award,
  Clock,
  BookOpen,
  Zap,
  Star,
  ArrowRight,
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

const comparisonData = [
  {
    feature: 'Batch Size',
    cerebrum: '15-20 students',
    velocity: '50-80 students',
    winner: 'cerebrum',
  },
  {
    feature: 'Personal Attention',
    cerebrum: 'High - Know every student',
    velocity: 'Limited - Large batches',
    winner: 'cerebrum',
  },
  {
    feature: 'Faculty',
    cerebrum: 'AIIMS Alumnus (Dr. Shekhar)',
    velocity: 'General faculty',
    winner: 'cerebrum',
  },
  {
    feature: 'Subject Focus',
    cerebrum: 'Biology Specialized',
    velocity: 'Generic PCB coaching',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Clearing',
    cerebrum: 'Daily 1-on-1 sessions',
    velocity: 'Limited doubt time',
    winner: 'cerebrum',
  },
  {
    feature: 'Study Material',
    cerebrum: 'Curated NCERT-focused',
    velocity: 'Standard material',
    winner: 'cerebrum',
  },
  {
    feature: 'MCQ Practice Bank',
    cerebrum: '19,600+ questions',
    velocity: 'Basic question bank',
    winner: 'cerebrum',
  },
  {
    feature: 'Fee Structure',
    cerebrum: '₹45K - ₹1.56L/year',
    velocity: '~₹36K for 6 months',
    winner: 'velocity',
  },
  {
    feature: 'Success Rate',
    cerebrum: '98% (Biology)',
    velocity: 'Not published',
    winner: 'cerebrum',
  },
  {
    feature: 'Online/Hybrid Option',
    cerebrum: 'Full hybrid model',
    velocity: 'Offline only',
    winner: 'cerebrum',
  },
]

const reasons = [
  {
    title: 'Large Batch Sizes',
    description:
      "Velocity's 50-80 student batches mean you're just a face in the crowd. At Cerebrum, every student gets individual attention with 15-20 per batch.",
    icon: Users,
  },
  {
    title: 'Biology Needs Specialization',
    description:
      'Generic PCB coaching treats Biology as just another subject. Our AIIMS faculty specializes exclusively in NEET Biology with diagram-focused teaching.',
    icon: BookOpen,
  },
  {
    title: 'No AIIMS-Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh (AIIMS alumnus) who brings real medical college perspective to NEET Biology preparation.',
    icon: Zap,
  },
  {
    title: 'Better Value for Investment',
    description:
      'While Velocity is affordable, Cerebrum offers significantly more value: AIIMS faculty, 3x smaller batches, 19,600+ MCQ bank, and hybrid options.',
    icon: Target,
  },
]

const testimonials = [
  {
    name: 'Rahul V.',
    score: '638/720',
    previous: 'Ex-Velocity Student',
    quote:
      'Velocity was good for basics but the large batches held me back. At Cerebrum, Dr. Shekhar personally tracked my progress. Biology score jumped by 60 marks.',
  },
  {
    name: 'Meera S.',
    score: '621/720',
    previous: 'Velocity + Cerebrum',
    quote:
      'Kept Velocity for Physics/Chemistry but joined Cerebrum for Biology. The specialized approach and small batch made Biology my strongest subject.',
  },
  {
    name: 'Aditya K.',
    score: '645/720',
    previous: 'Switched from Velocity',
    quote:
      'Was struggling in a batch of 70+ students. Cerebrum felt like a different world - the faculty actually knew my name and my weak areas.',
  },
]

export default function VelocityAlternativeContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'velocity-alternative-faridabad',
      message:
        'Hi! I am currently at Velocity Institute/considering Velocity and want to know about Cerebrum as an alternative for NEET Biology. Please share details.',
      campaign: 'velocity-alternative-faridabad',
    })
  }

  return (
    <main className="min-h-screen bg-white">
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
              <Link href="/neet-coaching-faridabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Faridabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Velocity Alternative</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Biology-Specialist NEET Coaching
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Looking for a
              <span className="block text-yellow-400 mt-2">Velocity Alternative in Faridabad?</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Want more than generic PCB coaching? Need AIIMS-trained faculty and smaller batches?
              Discover why Faridabad students choose Cerebrum for specialized NEET Biology
              preparation.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>15-20 Students/Batch</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-green-400" />
                <span>19,600+ MCQ Bank</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Compare with Velocity Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Students Look for Velocity Alternatives
            </h2>
            <p className="text-xl text-slate-600">
              Common reasons students upgrade to specialized coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Cerebrum vs Velocity: Head-to-Head
            </h2>
            <p className="text-xl text-slate-600">
              See why specialized coaching outperforms generic PCB
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center bg-teal-700">Cerebrum</th>
                  <th className="px-6 py-4 text-center">Velocity</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-teal-50">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {row.cerebrum}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && <XCircle className="w-5 h-5 text-red-400" />}
                        {row.winner === 'velocity' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {row.velocity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complement Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Want to Leave Velocity?
                <br />
                Add Biology Specialization!
              </h2>
              <p className="text-xl text-teal-100 mb-6">
                Many students continue at Velocity for Physics & Chemistry while joining Cerebrum
                specifically for Biology. Get the best of both worlds.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Weekend batches that don't clash with Velocity
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Evening sessions for extra Biology practice
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Sector 17 location - close to Velocity's Sector 16
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  AIIMS faculty for Biology-specific depth
                </li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-teal-600 hover:bg-teal-50">
                  Book a Free Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-6">Success Stories: Velocity + Cerebrum</h3>
              {testimonials.slice(1, 2).map((t) => (
                <div key={t.name} className="mb-6">
                  <p className="text-teal-100 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-teal-200">
                        {t.score} | {t.previous}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              From Students Who Upgraded from Velocity
            </h2>
            <p className="text-xl text-slate-600">
              Real results from students who chose specialized coaching
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.previous}</p>
                  </div>
                  <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    {t.score}
                  </div>
                </div>
                <p className="text-slate-600 italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Conveniently Located in Sector 17
                </h2>
                <p className="text-slate-600 mb-6">
                  Our Faridabad center is at <strong>Sector 17</strong> - just one sector away from
                  Velocity's Sector 16 location. Near Bata Chowk Metro (5 min walk), easily
                  accessible from all parts of Faridabad including Sector 15-17, NIT Faridabad, Old
                  Faridabad, Greater Faridabad, and Ballabgarh.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    {CONTACT_INFO.location.faridabad.streetAddress}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    Near Bata Chowk Metro (5 min walk)
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
                    <Button>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Why Cerebrum Over Velocity?</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>AIIMS-Trained Faculty</span>
                    <span className="text-green-600 font-semibold">Yes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Biology Specialist</span>
                    <span className="text-green-600 font-semibold">Yes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Trial Class</span>
                    <span className="text-green-600 font-semibold">7 Days Free</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Online/Hybrid Option</span>
                    <span className="text-green-600 font-semibold">Yes</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>MCQ Practice Bank</span>
                    <span className="text-green-600 font-semibold">19,600+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Use our AI-powered tools to boost your preparation"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
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

      {/* Related */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/aakash-alternative-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Aakash Alternative</h3>
              <p className="text-sm text-gray-600">Compare with Aakash</p>
            </Link>
            <Link
              href="/allen-alternative-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Allen Alternative</h3>
              <p className="text-sm text-gray-600">Compare with Allen</p>
            </Link>
            <Link
              href="/narayana-alternative-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Narayana Alternative</h3>
              <p className="text-sm text-gray-600">Compare with Narayana</p>
            </Link>
            <Link
              href="/neet-coaching-faridabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your NEET Preparation?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference of biology-specialist coaching with AIIMS-trained faculty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
