'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronUp,
  Building2,
  Microscope,
  Heart,
  Leaf,
  FlaskConical,
  Dna,
  Brain,
  Stethoscope,
  BookOpen,
  DollarSign,
  MapPin,
  Users,
  Award,
  Target,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import type { Metadata } from 'next'

// Career Options Data
const careerCategories = [
  {
    id: 'allied-health',
    title: 'Allied Health Sciences',
    subtitle: 'Without NEET',
    icon: Heart,
    color: 'rose',
    description: "Healthcare careers that don't require NEET. 92% placement rate within 6 months!",
    careers: [
      {
        name: 'B.Sc. Nursing',
        duration: '4 years',
        salary: '₹3-6 LPA',
        growth: '17-18% by 2027',
        highlight: true,
      },
      {
        name: 'BPT (Physiotherapy)',
        duration: '4.5 years',
        salary: '₹3-6 LPA',
        growth: 'High demand in rehab',
      },
      {
        name: 'BMLT (Lab Technology)',
        duration: '3 years',
        salary: '₹2.5-5 LPA',
        growth: 'Labs hiring actively',
      },
      { name: 'B.Sc. Radiology', duration: '3 years', salary: '₹3-6 LPA', growth: '92% placement' },
      {
        name: 'BOT (Occupational Therapy)',
        duration: '4.5 years',
        salary: '₹3-5 LPA',
        growth: 'Growing field',
      },
      { name: 'B.Sc. Optometry', duration: '4 years', salary: '₹3-8 LPA', growth: 'Eye care boom' },
    ],
  },
  {
    id: 'alternative-medicine',
    title: 'Alternative Medicine',
    subtitle: 'With NEET',
    icon: Leaf,
    color: 'emerald',
    description: 'Traditional medicine systems with growing acceptance and government support.',
    careers: [
      {
        name: 'BAMS (Ayurveda)',
        duration: '5.5 years',
        salary: '₹4-10 LPA',
        growth: 'Govt push for AYUSH',
        highlight: true,
      },
      {
        name: 'BHMS (Homeopathy)',
        duration: '5.5 years',
        salary: '₹4-8 LPA',
        growth: 'Established practice',
      },
      {
        name: 'BDS (Dental Surgery)',
        duration: '5 years',
        salary: '₹6-15 LPA',
        growth: 'Private practice options',
      },
      {
        name: 'BUMS (Unani Medicine)',
        duration: '5.5 years',
        salary: '₹3-8 LPA',
        growth: 'Niche demand',
      },
      {
        name: 'BNYS (Naturopathy)',
        duration: '5.5 years',
        salary: '₹3-6 LPA',
        growth: 'Wellness trend',
      },
    ],
  },
  {
    id: 'life-sciences',
    title: 'Life Sciences & Research',
    subtitle: 'Pure Sciences Path',
    icon: Microscope,
    color: 'blue',
    description:
      'For those passionate about research, discovery, and advancing scientific knowledge.',
    careers: [
      {
        name: 'B.Sc. Biotechnology',
        duration: '3 years',
        salary: '₹3-8 LPA',
        growth: 'USD 150B industry',
        highlight: true,
      },
      {
        name: 'B.Sc. Microbiology',
        duration: '3 years',
        salary: '₹4-12.7 LPA',
        growth: 'Diagnostic labs hiring',
      },
      { name: 'B.Sc. Biochemistry', duration: '3 years', salary: '₹3-8 LPA', growth: 'Pharma R&D' },
      {
        name: 'B.Sc. Genetics',
        duration: '3 years',
        salary: '₹4-10 LPA',
        growth: 'DNA testing surge',
      },
      {
        name: 'B.Sc. Environmental Science',
        duration: '3 years',
        salary: '₹3-8 LPA',
        growth: 'Green policy demand',
      },
      {
        name: 'B.Sc. Marine Biology',
        duration: '3 years',
        salary: '₹3-7 LPA',
        growth: 'Research focus',
      },
    ],
  },
  {
    id: 'emerging-fields',
    title: 'Emerging High-Growth Fields',
    subtitle: 'Future-Ready Careers',
    icon: Dna,
    color: 'purple',
    description:
      'Cutting-edge fields with explosive growth potential. Perfect for tech-savvy biology students.',
    careers: [
      {
        name: 'Biomedical Engineering',
        duration: '4 years',
        salary: '₹6-15 LPA',
        growth: 'Medical devices boom',
        highlight: true,
      },
      {
        name: 'Bioinformatics',
        duration: '3-4 years',
        salary: '₹6-15 LPA',
        growth: 'AI + Genomics',
        highlight: true,
      },
      {
        name: 'Genetic Counseling',
        duration: 'M.Sc.',
        salary: '₹5-12 LPA',
        growth: 'DNA testing surge',
      },
      {
        name: 'Clinical Research',
        duration: 'PG Diploma',
        salary: '₹5-25 LPA',
        growth: 'Pharma trials',
      },
      { name: 'Food Technology', duration: '4 years', salary: '₹4-10 LPA', growth: 'FSSAI roles' },
      {
        name: 'Forensic Science',
        duration: '3 years',
        salary: '₹4-10 LPA',
        growth: 'Crime labs, CBI',
      },
    ],
  },
]

// Biotechnology Colleges Data
const biotechColleges = {
  iits: [
    {
      name: 'IIT Delhi',
      rank: '#1',
      avgPackage: '₹20+ LPA',
      cutoff: 'Under 3000',
      highlight: true,
    },
    { name: 'IIT Kharagpur', rank: 'Top 5', avgPackage: '₹18+ LPA', cutoff: 'Under 4000' },
    { name: 'IIT Madras', rank: 'Top 5', avgPackage: '₹20+ LPA', cutoff: 'Under 3500' },
    { name: 'IIT Roorkee', rank: 'Top 10', avgPackage: '₹15+ LPA', cutoff: 'Under 5000' },
    {
      name: 'IIT Hyderabad',
      rank: 'Top 10',
      avgPackage: '₹20 LPA (Max ₹63.78 LPA)',
      cutoff: 'Under 5000',
    },
  ],
  other: [
    { name: 'BITS Pilani', admission: 'BITSAT', fees: '₹15-20L (4 years)', acceptsPCB: true },
    { name: 'VIT Vellore', admission: 'VITEEE', fees: '₹8-10L (4 years)', acceptsPCB: true },
    { name: 'SRM University', admission: 'SRMJEE', fees: '₹6-8L (4 years)', acceptsPCB: true },
    { name: 'Manipal Institute', admission: 'MET', fees: '₹12-15L (4 years)', acceptsPCB: false },
    { name: 'DTU Delhi', admission: 'JEE Main', fees: '₹3-4L (4 years)', acceptsPCB: false },
    { name: 'NIT Warangal', admission: 'JEE Main', fees: '₹2-3L (4 years)', acceptsPCB: false },
  ],
}

// Entrance Exams Data
const entranceExams = {
  ug: [
    { name: 'NEET', purpose: 'Medical + Some BSc', when: 'May', accepts: 'PCB', important: true },
    {
      name: 'CUET',
      purpose: 'Central Universities',
      when: 'May-June',
      accepts: 'PCB',
      important: true,
    },
    { name: 'ICAR AIEEA', purpose: 'Agricultural Universities', when: 'Via CUET', accepts: 'PCB' },
    { name: 'JEE Main', purpose: 'NITs, DTU, IIIT', when: 'Jan-April', accepts: 'PCM' },
    { name: 'BITSAT', purpose: 'BITS Pilani', when: 'May-June', accepts: 'PCM/PCB' },
    { name: 'VITEEE', purpose: 'VIT', when: 'April-May', accepts: 'PCM/PCB' },
  ],
  pg: [
    { name: 'IIT JAM', purpose: 'M.Sc at IITs', validity: '1 year', important: true },
    { name: 'GATE XL/BT', purpose: 'M.Tech, PhD, PSUs', validity: '3 years', important: true },
    { name: 'CUET PG', purpose: 'Central Universities', validity: '1 year' },
    { name: 'GAT-B', purpose: 'DBT Institutes', validity: '1 year' },
    { name: 'JNU CEEB', purpose: 'JNU Programs', validity: '1 year' },
  ],
}

// International Opportunities Data
const internationalOptions = [
  {
    country: 'USA',
    flag: '🇺🇸',
    why: 'Best research, funding',
    tuition: '$30-60k/year',
    universities: 'MIT, Stanford, Harvard, Johns Hopkins',
  },
  {
    country: 'UK',
    flag: '🇬🇧',
    why: '1-year Masters',
    tuition: '£15-30k/year',
    universities: 'Cambridge, Oxford, Imperial, UCL',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    why: 'FREE tuition at public unis',
    tuition: 'Only semester fees',
    universities: 'TU Munich, Heidelberg, LMU',
    highlight: true,
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    why: 'Life sciences leader',
    tuition: '€8-15k/year',
    universities: 'Leiden, Wageningen, Utrecht',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    why: 'Immigration friendly',
    tuition: 'CAD 15-30k/year',
    universities: 'Toronto, UBC, McGill',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    why: 'Research opportunities',
    tuition: 'AUD 25-40k/year',
    universities: 'Melbourne, Sydney, ANU',
  },
]

// Salary Progression Data
const salaryProgression = [
  { level: 'Entry (Fresher)', experience: '0-2 years', salary: '₹3-8 LPA' },
  { level: 'Mid-Level', experience: '3-5 years', salary: '₹8-15 LPA' },
  { level: 'Senior', experience: '6-10 years', salary: '₹15-25 LPA' },
  { level: 'Research Scientist', experience: '5+ years', salary: '₹7-20 LPA' },
  { level: 'Manager Roles', experience: '8+ years', salary: '₹20-30 LPA' },
]

// FAQs
const faqs = [
  {
    question: 'Can PCB students do BTech in Biotechnology?',
    answer:
      'Yes! Many top institutions like VIT Vellore, BITS Pilani (with Biology), and SRM University accept PCB students for BTech Biotechnology. Some require additional eligibility tests. IITs require JEE Advanced which needs PCM, but you can still pursue M.Tech after B.Sc.',
  },
  {
    question: 'What is the highest paying career for PCB students without NEET?',
    answer:
      'Bioinformatics (₹6-25 LPA), Clinical Research (₹5-25 LPA), and Biomedical Engineering (₹6-15 LPA) are among the highest-paying careers. With experience and specialization, senior roles in these fields can pay ₹30+ LPA.',
  },
  {
    question: 'Is Biotechnology a good career in India?',
    answer:
      "Absolutely! India's biotech sector is expected to reach USD 150 billion by 2025. With companies like Serum Institute, Biocon, and Bharat Biotech leading innovation, career opportunities are expanding rapidly. Entry salaries range from ₹3-8 LPA, growing to ₹15-30 LPA for experienced professionals.",
  },
  {
    question: 'Can I study abroad for MS/PhD in Biology without GRE?',
    answer:
      'Yes, in 2025, many top universities have made GRE optional. Universities in UK, Germany (free tuition!), Netherlands, and some US universities accept applications without GRE. Focus on GPA, research experience, and strong recommendation letters.',
  },
  {
    question: 'What entrance exams should PCB students prepare for?',
    answer:
      'Essential exams include NEET (medical), CUET (central universities), and ICAR AIEEA (agricultural science). For private universities, VITEEE, SRMJEE, and MET are important. For PG studies, prepare for IIT JAM, GATE XL/BT, and CUET PG.',
  },
  {
    question: 'What government jobs are available for Biology students?',
    answer:
      'Biology graduates can work in CSIR, ICMR, DBT, DRDO, and various research institutions. Posts include Research Scientist, Lab Technician, Drug Inspector, and Food Inspector. UPSC also has science-related positions in IFS (Forest Service) and other departments.',
  },
  {
    question: 'Is B.Sc. enough or should I pursue M.Sc.?',
    answer:
      'For research positions and higher salaries, M.Sc. or higher is recommended. B.Sc. opens entry-level positions (₹2-5 LPA), while M.Sc. graduates typically earn ₹5-10 LPA. For industry leadership or academic positions, PhD is often required.',
  },
  {
    question: 'What are the best courses after 12th PCB without NEET?',
    answer:
      "Top options include B.Sc. Nursing, B.Sc. Biotechnology, BPT (Physiotherapy), BMLT, B.Sc. Microbiology, B.Sc. Agriculture, B.Sc. Food Technology, and B.Sc. Environmental Science. These don't require NEET and have excellent career prospects.",
  },
]

// Color mapping for categories
const colorMap: Record<
  string,
  { bg: string; text: string; border: string; light: string; gradient: string }
> = {
  rose: {
    bg: 'bg-rose-500',
    text: 'text-rose-600',
    border: 'border-rose-200',
    light: 'bg-rose-50',
    gradient: 'from-rose-500 to-pink-500',
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    light: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-500',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    light: 'bg-blue-50',
    gradient: 'from-blue-500 to-indigo-500',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    light: 'bg-purple-50',
    gradient: 'from-purple-500 to-violet-500',
  },
}

export default function CareerOptionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState<string>('allied-health')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Complete Career Guide 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Career Options After 12th
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                PCB (Biology) - Beyond MBBS
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              50+ career paths for Physics, Chemistry, Biology students. From Biotechnology to
              Bioinformatics, Allied Health to International Studies. Your complete roadmap to
              success!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-sm text-white/80">Career Options</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-green-300">₹30L+</div>
                <div className="text-sm text-white/80">Top Salaries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-blue-300">100+</div>
                <div className="text-sm text-white/80">Top Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-purple-300">6</div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#careers">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300 font-semibold px-8 py-3 rounded-xl">
                  Explore Career Options
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl">
                  Book Free Counseling
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">
                Biotech sector: <strong className="text-green-600">USD 150B by 2025</strong>
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">
                Nursing demand: <strong className="text-blue-600">100% growth abroad</strong>
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">
                Germany: <strong className="text-purple-600">FREE tuition</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories */}
      <section id="careers" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Career Options for PCB Students
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gone are the days when PCB = Doctor. Explore 50+ high-growth career paths!
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {careerCategories.map((cat) => {
              const colors = colorMap[cat.color]
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    isActive
                      ? `${colors.bg} text-white shadow-lg`
                      : `${colors.light} ${colors.text} hover:shadow-md`
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </button>
              )
            })}
          </div>

          {/* Active Category Content */}
          {careerCategories.map((category) => {
            if (category.id !== activeCategory) return null
            const colors = colorMap[category.color]

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
              >
                <div
                  className={`${colors.light} rounded-2xl p-6 md:p-8 mb-8 border ${colors.border}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
                    >
                      <category.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <span
                          className={`${colors.bg} text-white text-xs px-2 py-0.5 rounded-full`}
                        >
                          {category.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {category.careers.map((career, idx) => (
                      <div
                        key={idx}
                        className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
                          career.highlight ? `ring-2 ${colors.border}` : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{career.name}</h4>
                          {career.highlight && (
                            <span
                              className={`${colors.bg} text-white text-xs px-2 py-0.5 rounded-full`}
                            >
                              Top Pick
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Duration</span>
                            <p className="font-medium text-gray-900">{career.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Salary</span>
                            <p className={`font-medium ${colors.text}`}>{career.salary}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Growth</span>
                            <p className="font-medium text-gray-900 text-xs">{career.growth}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Biotechnology Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Dna className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">India&apos;s Fastest Growing Sector</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Biotechnology - The Future Career
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              USD 150 billion industry by 2025. Top companies like Serum Institute, Biocon, and
              Bharat Biotech are hiring!
            </p>
          </motion.div>

          {/* Salary Progression */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold text-center mb-6 text-white/90">
              Salary Progression in Biotechnology
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {salaryProgression.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                >
                  <div className="text-lg font-bold text-yellow-300 mb-1">{item.salary}</div>
                  <div className="text-sm font-medium text-white">{item.level}</div>
                  <div className="text-xs text-white/70">{item.experience}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-6 text-white/90">
              Top Biotechnology Colleges in India
            </h3>

            {/* IITs */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-300">
                  Premier Institutes (JEE Advanced)
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {biotechColleges.iits.map((college, idx) => (
                  <div
                    key={idx}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border ${
                      college.highlight ? 'border-yellow-400/50' : 'border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{college.name}</h4>
                      <span className="bg-yellow-400/20 text-yellow-300 text-xs px-2 py-0.5 rounded">
                        {college.rank}
                      </span>
                    </div>
                    <div className="text-sm text-white/80">
                      <p>
                        Avg Package:{' '}
                        <span className="text-green-300 font-medium">{college.avgPackage}</span>
                      </p>
                      <p>
                        Cutoff: <span className="text-blue-300">{college.cutoff}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Colleges */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-blue-300" />
                <span className="font-semibold text-blue-300">Other Top Institutions</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {biotechColleges.other.map((college, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{college.name}</h4>
                      {college.acceptsPCB && (
                        <span className="bg-green-400/20 text-green-300 text-xs px-2 py-0.5 rounded">
                          PCB OK
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-white/80">
                      <p>Admission: {college.admission}</p>
                      <p>Fees: {college.fees}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance Exams Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Important Entrance Exams
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key exams for UG and PG admissions. Start preparing early!
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* UG Exams */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">After Class 12 (UG)</h3>
              </div>
              <div className="space-y-3">
                {entranceExams.ug.map((exam, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl p-4 ${exam.important ? 'ring-2 ring-blue-200' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{exam.name}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          exam.accepts === 'PCB'
                            ? 'bg-green-100 text-green-700'
                            : exam.accepts === 'PCM/PCB'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {exam.accepts}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exam.purpose}</p>
                    <p className="text-xs text-gray-500 mt-1">When: {exam.when}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PG Exams */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">After Graduation (PG)</h3>
              </div>
              <div className="space-y-3">
                {entranceExams.pg.map((exam, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl p-4 ${exam.important ? 'ring-2 ring-purple-200' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{exam.name}</h4>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        Valid: {exam.validity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exam.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Study Abroad</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              International Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top destinations for MS/PhD in Life Sciences. GRE optional at many universities in
              2025!
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow ${
                  option.highlight ? 'ring-2 ring-green-300' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{option.flag}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{option.country}</h3>
                    <p className="text-sm text-gray-500">{option.why}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tuition</span>
                    <span
                      className={`font-medium ${option.highlight ? 'text-green-600' : 'text-gray-900'}`}
                    >
                      {option.tuition}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Top Universities:</strong> {option.universities}
                </div>
                {option.highlight && (
                  <div className="mt-3 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">
                    ⭐ Best value for money!
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Requirements Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white"
          >
            <h3 className="font-bold text-lg mb-4 text-center">Requirements for MS/PhD Abroad</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300">3.0+</div>
                <div className="text-sm text-white/80">GPA (USA)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">Optional</div>
                <div className="text-sm text-white/80">GRE (2025)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">90+</div>
                <div className="text-sm text-white/80">TOEFL Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">3</div>
                <div className="text-sm text-white/80">LORs Required</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Which Path is Right for You?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose based on your interests and career goals
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Microscope,
                title: 'If You Love Research',
                path: 'B.Sc → M.Sc → PhD → Postdoc',
                career: 'Research Scientist / Professor',
                salary: '₹8-30 LPA (India) | $60-150k (Abroad)',
                color: 'blue',
              },
              {
                icon: Stethoscope,
                title: 'If You Love Healthcare',
                path: 'B.Sc/B.Pharm → CRA Certification',
                career: 'Clinical Research Associate → Director',
                salary: '₹5-25 LPA',
                color: 'rose',
              },
              {
                icon: Briefcase,
                title: 'If You Love Business',
                path: 'B.Sc/B.Pharm → MBA',
                career: 'Pharma Sales → Manager → Director',
                salary: '₹4-30 LPA',
                color: 'emerald',
              },
              {
                icon: Brain,
                title: 'If You Love Technology',
                path: 'B.Sc + Programming → M.Sc Bioinformatics',
                career: 'Data Scientist in Biotech',
                salary: '₹6-25 LPA',
                color: 'purple',
              },
              {
                icon: Leaf,
                title: 'If You Love Environment',
                path: 'B.Sc Env Science → M.Sc',
                career: 'Environmental Scientist → Consultant',
                salary: '₹4-15 LPA',
                color: 'emerald',
              },
              {
                icon: FlaskConical,
                title: 'If You Love Food Science',
                path: 'B.Tech Food Tech → Industry',
                career: 'Food Technologist → R&D Manager',
                salary: '₹4-20 LPA',
                color: 'blue',
              },
            ].map((item, idx) => {
              const colors = colorMap[item.color]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${colors.light} rounded-2xl p-6 border ${colors.border}`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white mb-4`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <strong>Path:</strong> {item.path}
                    </p>
                    <p className="text-gray-600">
                      <strong>Career:</strong> {item.career}
                    </p>
                    <p className={colors.text}>
                      <strong>Salary:</strong> {item.salary}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Confused About Your Career Path?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Get personalized career counseling from our expert faculty. Whether you choose
              medicine, biotechnology, or any other field - we&apos;ll help you succeed!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300 font-semibold px-8 py-3 rounded-xl">
                  Book Free Counseling
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl">
                  Call +91 88264 44334
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>500+ Students Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Career Options After 12th PCB - Complete Guide 2025',
            description:
              '50+ career options for PCB students beyond MBBS. Biotechnology, Allied Health, International Studies and more.',
            author: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cerebrumbiologyacademy.com/brain-logo.webp',
              },
            },
            datePublished: '2025-01-01',
            dateModified: new Date().toISOString().split('T')[0],
          }),
        }}
      />
    </main>
  )
}
