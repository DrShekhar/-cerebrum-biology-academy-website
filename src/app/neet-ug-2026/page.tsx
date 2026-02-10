import { Metadata } from 'next'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  FileText,

  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Users,
  MapPin,
  GraduationCap,
  Shield,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  Info,
  ChevronDown,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET UG 2026 Registration, Dates, Eligibility & Updates',
  description:
    'Complete guide to NEET UG 2026 — registration dates, application fee, eligibility, exam pattern, documents required, and step-by-step form filling guide. Apply before 8th March 2026.',
  keywords: [
    'NEET UG 2026',
    'NEET 2026 registration',
    'NEET 2026 form filling',
    'NEET 2026 application',
    'NEET 2026 exam date',
    'NEET 2026 eligibility',
    'NTA NEET 2026',
    'NEET UG 2026 syllabus',
    'NEET 2026 fee',
    'NEET 2026 documents',
    'neet.nta.nic.in',
    'NEET biology crash course',
    'NEET 2026 preparation',
  ],
  openGraph: {
    title: 'NEET UG 2026 — Complete Registration & Exam Guide',
    description:
      'Everything you need to know about NEET UG 2026: registration, dates, fees, eligibility, exam pattern, and more. Official links included.',
    url: 'https://cerebrumbiologyacademy.com/neet-ug-2026',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-ug-2026',
  },
}

const importantDates = [
  { event: 'Registration Opens', date: '8th February 2026' },
  { event: 'Last Date to Apply', date: '8th March 2026 (up to 9:00 PM)' },
  {
    event: 'Fee Payment Deadline',
    date: '8th March 2026 (up to 11:50 PM)',
  },
  { event: 'Correction Window', date: '10th – 12th March 2026' },
  { event: 'City Intimation Slip', date: 'Mid-April 2026 (Expected)' },
  {
    event: 'Admit Card Release',
    date: 'Late April 2026 (Expected)',
  },
  {
    event: 'NEET UG 2026 Exam',
    date: '3rd May 2026 (Sunday), 2:00 – 5:00 PM',
    highlight: true,
  },
  { event: 'Answer Key Release', date: 'May 2026 (Expected)' },
  { event: 'Result Declaration', date: 'June 2026 (Expected)' },
]

const applicationFees = [
  { category: 'General', fee: '₹ 1,700' },
  { category: 'Gen-EWS / OBC-NCL', fee: '₹ 1,600' },
  { category: 'SC / ST / PwBD / Third Gender', fee: '₹ 1,000' },
  { category: 'Foreign Nationals', fee: '₹ 9,500' },
]

const documentsRequired = [
  'Valid Photo ID (Aadhaar / Passport / PAN)',
  'Class 10th & 12th Mark Sheets',
  'Passport-size Photo (white BG, taken after 1 Jan 2026)',
  'Scanned Signature (black ink, running handwriting — NOT capitals)',
  'Left & Right Thumb Impressions (blue ink)',
  'Category / PwBD / EWS Certificate (if applicable)',
  'Live Photograph (captured during form filling via webcam/mobile)',
]

const howToApply = [
  'Visit neet.nta.nic.in',
  "Click 'Registration for NEET (UG) 2026'",
  'Complete Aadhaar eKYC — verify via OTP',
  'Fill personal & academic details',
  'Select category, language, preferred cities (up to 4)',
  'Upload documents (JPG/PDF format)',
  'Capture & submit live photograph',
  'Pay fee & save confirmation page',
]

const whatsNew2026 = [
  {
    title: 'Aadhaar eKYC Mandatory',
    description:
      'ID verification now linked via Aadhaar. OTP sent to Aadhaar-linked mobile number. Name, DOB, and gender must match Class 10/12 certificates exactly.',
    icon: Shield,
  },
  {
    title: 'Live Photo Capture',
    description:
      'Real-time photo via webcam or smartphone QR code scan. Auto-compared against Aadhaar database photo for identity verification.',
    icon: Users,
  },
  {
    title: 'Document Upload at Registration',
    description:
      'All documents uploaded during the form itself — no separate upload window. Keep scanned copies ready beforehand.',
    icon: FileText,
  },
  {
    title: 'Smart City Allocation',
    description:
      'Exam centres aligned with your present/permanent address. Choose up to 4 preferred cities, but final allocation considers your state of residence.',
    icon: MapPin,
  },
]

const examPattern = [
  { subject: 'Physics', sectionA: 35, sectionB: '15 (attempt 10)', total: 45 },
  {
    subject: 'Chemistry',
    sectionA: 35,
    sectionB: '15 (attempt 10)',
    total: 45,
  },
  { subject: 'Botany', sectionA: 35, sectionB: '15 (attempt 10)', total: 45 },
  { subject: 'Zoology', sectionA: 35, sectionB: '15 (attempt 10)', total: 45 },
]

const faqs = [
  {
    q: 'Is there an upper age limit for NEET UG 2026?',
    a: 'No. The National Medical Commission (NMC) has removed the upper age limit. There is also no cap on the number of attempts.',
  },
  {
    q: 'Is Aadhaar mandatory for NEET 2026 registration?',
    a: 'Yes. Aadhaar-based eKYC is compulsory for identity verification. Ensure your Aadhaar-linked mobile number is active.',
  },
  {
    q: 'Can I change my exam city preference after submitting the form?',
    a: 'Only during the correction window (10th–12th March 2026). After that, exam city and question paper language cannot be changed.',
  },
  {
    q: 'What is the marking scheme for NEET UG 2026?',
    a: '+4 for each correct answer, –1 for each incorrect answer, 0 for unattempted questions. Total marks: 720.',
  },
  {
    q: 'What are the minimum qualifying marks in Class 12?',
    a: 'General: 50% in PCB aggregate, OBC/SC/ST: 40%, PwBD: 45%. You must have studied Physics, Chemistry, and Biology from a recognised board.',
  },
  {
    q: 'Is the NEET 2026 syllabus changed?',
    a: 'No. The syllabus remains unchanged — 79 chapters across Physics, Chemistry, and Biology as confirmed by NMC.',
  },
  {
    q: 'How many exam centres will there be?',
    a: 'NEET UG 2026 will be conducted in 552 cities across India and 14 cities abroad (12 countries).',
  },
  {
    q: 'Which languages is the exam available in?',
    a: '13 languages: English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu, and Urdu.',
  },
]

export default function NEETUG2026Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Registration is LIVE — Apply Now
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              NEET UG 2026
              <br />
              <span className="text-yellow-300">Complete Guide</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              Everything you need to know — registration, dates, fees, eligibility, exam pattern,
              and step-by-step form filling guide.
            </p>
            <p className="text-base text-gray-300 mb-8">
              Official NTA Application Window:{' '}
              <span className="text-white font-semibold">8th Feb – 8th Mar 2026</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://neet.nta.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                Apply on NTA Portal
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="#exam-details"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Exam Details
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              {
                label: 'Exam Date',
                value: '3 May 2026',
                icon: Calendar,
              },
              { label: 'Duration', value: '3 Hours', icon: Clock },
              { label: 'Total Marks', value: '720', icon: Star },
              {
                label: 'Questions',
                value: '200 (attempt 180)',
                icon: FileText,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Notice Banner */}
      <section className="bg-red-100 border-y-2 border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start sm:items-center gap-3 text-red-800">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm sm:text-base font-semibold">
              Do NOT wait till the last date — complete registration well before 8th March 2026.
              Update Aadhaar & keep documents ready!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Important Dates */}
        <section className="mb-16" id="dates">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Important Dates</h2>
          </div>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date / Details</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((item, i) => (
                    <tr
                      key={item.event}
                      className={`border-b border-gray-100 ${
                        item.highlight
                          ? 'bg-yellow-50 font-semibold'
                          : i % 2 === 0
                            ? 'bg-white'
                            : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-700">{item.event}</td>
                      <td
                        className={`px-6 py-4 font-medium ${item.highlight ? 'text-blue-700' : 'text-gray-900'}`}
                      >
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Two Column: Application Fee + What's New */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Application Fee */}
          <div id="fees">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">Application Fee</h2>
            </div>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="px-5 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-5 py-3 text-right text-sm font-semibold">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationFees.map((item, i) => (
                    <tr
                      key={item.category}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-5 py-3 text-gray-700">{item.category}</td>
                      <td className="px-5 py-3 text-right font-bold text-gray-900">{item.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-5 py-3 text-xs text-gray-500 bg-gray-50">
                Online payment only. Non-refundable. Modes: Credit/Debit Card, Net Banking, UPI.
              </p>
            </div>
          </div>

          {/* What's New in 2026 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">What&apos;s New in 2026</h2>
            </div>
            <div className="space-y-4">
              {whatsNew2026.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exam Pattern */}
        <section className="mb-16" id="exam-details">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Exam Pattern</h2>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Mode', value: 'Offline (Pen & Paper)', icon: FileText },
                { label: 'Duration', value: '3 Hours', icon: Clock },
                {
                  label: 'Marking',
                  value: '+4 Correct, –1 Wrong',
                  icon: CheckCircle2,
                },
                {
                  label: 'Languages',
                  value: '13 Languages',
                  icon: BookOpen,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center"
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="px-5 py-3 text-left text-sm font-semibold">Subject</th>
                    <th className="px-5 py-3 text-center text-sm font-semibold">
                      Section A (Mandatory)
                    </th>
                    <th className="px-5 py-3 text-center text-sm font-semibold">
                      Section B (Choice)
                    </th>
                    <th className="px-5 py-3 text-center text-sm font-semibold">Total Qs</th>
                    <th className="px-5 py-3 text-center text-sm font-semibold">Max Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {examPattern.map((item, i) => (
                    <tr
                      key={item.subject}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-5 py-3 font-semibold text-gray-800">{item.subject}</td>
                      <td className="px-5 py-3 text-center text-gray-700">{item.sectionA}</td>
                      <td className="px-5 py-3 text-center text-gray-700">{item.sectionB}</td>
                      <td className="px-5 py-3 text-center font-medium text-gray-900">
                        {item.total}
                      </td>
                      <td className="px-5 py-3 text-center font-bold text-blue-700">
                        {item.total * 4}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800 text-white font-bold">
                    <td className="px-5 py-3">Total</td>
                    <td className="px-5 py-3 text-center">140</td>
                    <td className="px-5 py-3 text-center">60 (attempt 40)</td>
                    <td className="px-5 py-3 text-center">180</td>
                    <td className="px-5 py-3 text-center text-yellow-300">720</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Question paper contains 200 questions (50 per subject). Section B has 15 questions
              per subject — attempt any 10.
            </p>
          </div>
        </section>

        {/* Two Column: Documents Required + How to Apply */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Documents */}
          <div id="documents">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">Documents Required</h2>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6">
              <ul className="space-y-3">
                {documentsRequired.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Pro Tip:</span> Keep 6–8 passport-size and 4–6
                    postcard-size colour photographs ready. Ensure Aadhaar-linked mobile is active
                    for OTP.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Apply */}
          <div id="how-to-apply">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">How to Apply — Step by Step</h2>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6">
              <ol className="space-y-4">
                {howToApply.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <a
                href="https://neet.nta.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Go to NTA Portal
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="mb-16" id="eligibility">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Eligibility Criteria</h2>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Educational Qualification',
                  desc: 'Passed (or appearing) Class 12th with Physics, Chemistry & Biology from a recognised board.',
                  icon: GraduationCap,
                },
                {
                  title: 'Minimum Marks in Class 12',
                  desc: 'General: 50% in PCB, OBC/SC/ST: 40%, PwBD: 45% aggregate in Physics, Chemistry & Biology.',
                  icon: Star,
                },
                {
                  title: 'Age Requirement',
                  desc: 'Minimum 17 years by 31st December 2026. No upper age limit. No cap on number of attempts.',
                  icon: Users,
                },
                {
                  title: 'Nationality',
                  desc: 'Indian Nationals, NRIs, OCIs, PIOs, and Foreign Nationals are eligible to apply.',
                  icon: MapPin,
                },
                {
                  title: 'Subjects Required',
                  desc: 'Must have studied Physics, Chemistry, and Biology/Biotechnology in Class 11th and 12th.',
                  icon: BookOpen,
                },
                {
                  title: 'Syllabus',
                  desc: '79 chapters across Physics, Chemistry & Biology. Syllabus unchanged from previous year (NMC confirmed).',
                  icon: FileText,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 p-5"
                >
                  <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crash Course Promotion */}
        <section className="mb-16">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
            </div>
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  NEET 2026 Preparation
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Need Help with NEET 2026 Preparation?
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Join Cerebrum Biology Academy&apos;s{' '}
                  <span className="text-yellow-300 font-semibold">Biology Crash Course</span> —
                  small batches, personalised mentorship & curriculum by an AIIMS alumnus.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'AIIMS-trained faculty',
                    'Small batch size (15–20 students)',
                    'Complete NCERT + Beyond NCERT coverage',
                    'Daily DPPs & weekly mock tests',
                    'Doubt clearing sessions',
                    'Personalised mentorship',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-200">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/courses/neet-crash-course"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Explore Crash Course
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="https://wa.me/918826444334?text=Hi!%20I%20saw%20the%20NEET%20UG%202026%20page.%20I%20want%20to%20know%20about%20the%20Biology%20Crash%20Course%20for%20NEET%202026."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-green-400 text-green-400 hover:bg-green-400/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </div>
                <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 88264 44334</span>
                  </div>
                  <span className="text-gray-600">|</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Rohini &bull; Gurugram &bull; South Delhi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16" id="faq">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl shadow-sm border border-gray-100 group"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-gray-900 hover:text-blue-700 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Official Portal Link */}
        <section className="text-center mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Official NEET UG 2026 Portal</h2>
            <p className="text-gray-600 mb-6">
              For registration, updates, admit card, and results — visit the official NTA portal.
            </p>
            <a
              href="https://neet.nta.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Visit neet.nta.nic.in
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-xs text-gray-400 mt-4">
              This page is maintained by Cerebrum Biology Academy for informational purposes. For
              official notifications, always refer to NTA.
            </p>
          </div>
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'NEET UG 2026 Registration, Dates, Eligibility & Updates',
            description:
              'Complete guide to NEET UG 2026 — registration, exam dates, fees, eligibility, and step-by-step form filling guide.',
            url: 'https://cerebrumbiologyacademy.com/neet-ug-2026',
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            datePublished: '2026-02-10',
            dateModified: '2026-02-10',
          }),
        }}
      />
    </div>
  )
}
