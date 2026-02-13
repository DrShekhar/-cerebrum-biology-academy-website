'use client'

import { useState } from 'react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  Trophy,
  CheckCircle,
  Award,
  BookOpen,
  GraduationCap,
  Target,
  Brain,
  Microscope,
  FileText,
  TrendingUp,
  Zap,
  ChevronRight,
  Beaker,
  Heart,
  Dna,
} from 'lucide-react'
import Link from 'next/link'

const mcatBioSections = [
  {
    section: 'Biological & Biochemical Foundations',
    code: 'Section 1 (Bio/Biochem)',
    topics: [
      'Amino Acids & Proteins',
      'Enzyme Kinetics',
      'DNA/RNA Structure',
      'Cell Biology',
      'Organ Systems',
      'Metabolism',
    ],
    percentage: '~65% of Bio questions',
    icon: Microscope,
    color: 'bg-blue-500',
  },
  {
    section: 'Chemical & Physical Foundations',
    code: 'Section 2 (Chem/Phys)',
    topics: [
      'Biochemistry overlap',
      'Organic Chemistry',
      'General Chemistry',
      'Physics in Biology',
    ],
    percentage: '~25% Bio content',
    icon: Beaker,
    color: 'bg-purple-500',
  },
  {
    section: 'Psychological & Social Foundations',
    code: 'Section 3 (Psych/Soc)',
    topics: [
      'Nervous System',
      'Sensory Processing',
      'Biological Bases of Behavior',
      'Neuroscience',
    ],
    percentage: '~10% Bio content',
    icon: Brain,
    color: 'bg-green-500',
  },
]

const mcatBioTopics = [
  {
    category: 'Molecular Biology',
    weight: '25%',
    topics: [
      'DNA replication, repair, recombination',
      'Transcription and translation',
      'Gene regulation (prokaryotes & eukaryotes)',
      'Biotechnology and recombinant DNA',
      'Genome structure and organization',
    ],
    icon: Dna,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    category: 'Cell Biology',
    weight: '20%',
    topics: [
      'Cell structure and organelles',
      'Membrane transport mechanisms',
      'Cell cycle and mitosis',
      'Apoptosis and cell signaling',
      'Cytoskeleton and cell motility',
    ],
    icon: Microscope,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    category: 'Biochemistry',
    weight: '25%',
    topics: [
      'Amino acids and protein structure',
      'Enzyme kinetics and regulation',
      'Carbohydrate metabolism (glycolysis, TCA)',
      'Oxidative phosphorylation',
      'Lipid metabolism and membranes',
    ],
    icon: Beaker,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    category: 'Human Physiology',
    weight: '20%',
    topics: [
      'Cardiovascular system',
      'Respiratory system',
      'Nervous system and endocrine',
      'Renal and digestive systems',
      'Immune system',
    ],
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    category: 'Genetics & Evolution',
    weight: '10%',
    topics: [
      'Mendelian and population genetics',
      'Hardy-Weinberg equilibrium',
      'Natural selection mechanisms',
      'Speciation and phylogeny',
      'Human genetic disorders',
    ],
    icon: TrendingUp,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
]

const examFormat = {
  sections: [
    {
      name: 'Biological & Biochemical Foundations of Living Systems',
      questions: 59,
      time: '95 minutes',
      focus: 'Biology, Biochemistry, Organic Chemistry, General Chemistry',
    },
    {
      name: 'Chemical & Physical Foundations of Biological Systems',
      questions: 59,
      time: '95 minutes',
      focus: 'General Chemistry, Organic Chemistry, Biochemistry, Physics, Biology',
    },
    {
      name: 'Psychological, Social & Biological Foundations of Behavior',
      questions: 59,
      time: '95 minutes',
      focus: 'Psychology, Sociology, Biology',
    },
    {
      name: 'Critical Analysis & Reasoning Skills (CARS)',
      questions: 53,
      time: '90 minutes',
      focus: 'Reading Comprehension (no science)',
    },
  ],
  totalTime: '7 hours 30 minutes',
  totalQuestions: 230,
  scoreRange: '472-528',
}

const features = [
  {
    icon: BookOpen,
    title: 'Campbell Biology Foundation',
    description:
      'Master MCAT biology using Campbell Biology as your primary resource. We cover all 56 chapters with MCAT-focused emphasis.',
  },
  {
    icon: FileText,
    title: 'Passage-Based Practice',
    description:
      'Extensive practice with MCAT-style passages. Learn to extract key information and apply biological concepts under pressure.',
  },
  {
    icon: Brain,
    title: 'Biochemistry Integration',
    description:
      'Seamlessly integrate biochemistry with biology concepts. Master enzyme kinetics, metabolism, and molecular biology.',
  },
  {
    icon: Target,
    title: 'High-Yield Focus',
    description:
      'Concentrate on the highest-yield topics that appear most frequently on the MCAT. Strategic preparation for maximum score improvement.',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement Tracking',
    description:
      'Regular diagnostic tests to track your progress. Identify weak areas and focus your study time effectively.',
  },
  {
    icon: Zap,
    title: 'Expert MCAT Faculty',
    description:
      'Learn from instructors who have scored 520+ on the MCAT and understand the exam inside out.',
  },
]

const pricingPlans = [
  {
    name: 'Senior Faculty',
    price: '$120-150',
    unit: 'per hour',
    description: '520+ MCAT Scorers & Medical School Faculty',
    features: [
      '520+ MCAT scorer instructors',
      'MD/PhD faculty members',
      'Personalized study plan',
      'Passage strategy coaching',
      'Direct WhatsApp support',
      'Score improvement guarantee',
    ],
    popular: true,
    cta: 'Book Senior Faculty',
  },
  {
    name: 'Junior Faculty',
    price: '$60-75',
    unit: 'per hour',
    description: '515+ MCAT Scorers & Medical Students',
    features: [
      '515+ MCAT scorer tutors',
      'Current medical students',
      'Content review sessions',
      'Practice passage help',
      'Doubt clearing support',
      'Progress tracking',
    ],
    popular: false,
    cta: 'Book Junior Faculty',
  },
  {
    name: 'Batch Programs',
    price: '$40',
    unit: 'per hour',
    description: 'Intensive Group Training (4-6 Students)',
    features: [
      'Small batch (4-6 students)',
      'Collaborative learning',
      'Weekly live sessions',
      'Recorded lectures access',
      'Practice tests included',
      'Study group formation',
    ],
    popular: false,
    cta: 'Join Batch',
  },
]

const faqs = [
  {
    question: 'How much biology is on the MCAT?',
    answer:
      'Biology makes up approximately 65% of the Biological and Biochemical Foundations section (Section 1), plus significant portions of Sections 2 and 3. In total, biology-related content accounts for about 40-50% of the entire MCAT. This includes molecular biology, biochemistry, cell biology, genetics, evolution, and human physiology.',
  },
  {
    question: 'Is Campbell Biology sufficient for MCAT preparation?',
    answer:
      'Campbell Biology (12th edition) provides an excellent foundation for MCAT biology content. It covers all major topics tested on the MCAT at the appropriate depth. However, for biochemistry specifically, you may want to supplement with additional biochemistry resources. Our tutoring integrates Campbell Biology with MCAT-specific strategies and practice.',
  },
  {
    question: 'What MCAT score can I achieve with proper preparation?',
    answer:
      'With dedicated preparation (300-400 hours typically), most students can achieve significant score improvements. The average MCAT score is around 500, while competitive medical school applicants typically score 510-520+. Our structured approach using Campbell Biology as a foundation has helped students improve by 10-15 points on average.',
  },
  {
    question: 'How long should I prepare for the MCAT biology sections?',
    answer:
      'We recommend 3-6 months of dedicated MCAT preparation, with biology content review taking approximately 4-6 weeks. This includes covering all major topics in Campbell Biology, extensive passage practice, and full-length practice tests. Our personalized study plans are tailored to your starting point and target score.',
  },
  {
    question: 'Do you offer passage-based practice for MCAT?',
    answer:
      'Yes! MCAT biology questions are passage-based, requiring you to apply concepts to novel scenarios. Our tutoring includes extensive practice with MCAT-style passages, teaching you to efficiently extract key information, eliminate wrong answers, and manage time effectively across all sections.',
  },
  {
    question: 'How is your MCAT tutoring different from other prep courses?',
    answer:
      'Our approach uses Campbell Biology as the foundation, which provides deeper conceptual understanding than typical MCAT prep books. We focus on building true comprehension rather than memorization, which is essential for the application-based MCAT questions. Plus, our 1:1 tutoring allows for personalized attention to your specific weak areas.',
  },
]

export default function MCATBiologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'mcat-page',
      message:
        'Hi! I am preparing for the MCAT and need help with the biology and biochemistry sections. I want to use Campbell Biology as my primary resource. Please share details about your MCAT coaching program.',
      campaign: 'mcat-biology-preparation',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Pre-Medical Preparation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              MCAT Biology Preparation
              <span className="block text-blue-400 mt-2">Master Biology for Medical School</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert MCAT biology coaching using Campbell Biology as your foundation. Score higher
              on the Biological and Biochemical Foundations sections with our comprehensive
              preparation program.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>520+ Score Faculty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Campbell Biology Based</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-green-400" />
                <span>High-Yield Focus</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-green-500/25 transition-colors animate-fadeInUp"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start MCAT Prep
              </button>
              <Link
                href="/campbell-biology/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Campbell Biology Study Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MCAT Exam Format */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              MCAT Exam Structure
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Understanding the exam format is crucial for strategic preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {examFormat.sections.map((section, index) => (
              <div
                key={section.name}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{section.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{section.questions}</div>
                    <div className="text-sm text-slate-600">Questions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{section.time}</div>
                    <div className="text-sm text-slate-600">Time</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Focus:</span> {section.focus}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-center">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {examFormat.totalQuestions}
                </div>
                <div className="text-slate-400">Total Questions</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400">
                  {examFormat.totalTime}
                </div>
                <div className="text-slate-400">Total Time</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-400">
                  {examFormat.scoreRange}
                </div>
                <div className="text-slate-400">Score Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biology Topics Coverage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              MCAT Biology Topics We Cover
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive coverage of all biology topics tested on the MCAT, using Campbell
              Biology as your foundation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcatBioTopics.map((topic, index) => (
              <div
                key={topic.category}
                className={`${topic.bgColor} rounded-2xl p-6 border border-slate-100`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                    <topic.icon className={`w-6 h-6 ${topic.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{topic.weight}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{topic.category}</h3>
                <ul className="space-y-2">
                  {topic.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className={`w-4 h-4 ${topic.color} flex-shrink-0 mt-0.5`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our MCAT Biology Coaching?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert preparation from 520+ MCAT scorers who know what it takes to succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">MCAT Coaching Plans</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Flexible options for pre-med students preparing for medical school
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-6 ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{plan.price}</div>
                  <div className="text-slate-500 text-sm">{plan.unit}</div>
                  <p className="text-slate-600 text-sm mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleWhatsAppEnquiry}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about MCAT biology preparation
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden animate-fadeInUp"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-90' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Explore More Resources
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/campbell-biology/"
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Campbell Biology
              </div>
              <div className="text-xs text-slate-500">56 Chapters</div>
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                AP Biology
              </div>
              <div className="text-xs text-slate-500">College Board Prep</div>
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Biology Olympiad
              </div>
              <div className="text-xs text-slate-500">USABO, BBO, IBO</div>
            </Link>
            <Link
              href="/ib-biology-online-classes/"
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                IB Biology
              </div>
              <div className="text-xs text-slate-500">HL & SL</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Ace the MCAT Biology Sections?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our MCAT preparation program and build a strong foundation in biology using
              Campbell Biology. Our expert tutors will guide you to your target score.
            </p>
            <button
              onClick={handleWhatsAppEnquiry}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-colors animate-fadeInUp"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start MCAT Preparation
            </button>
            <p className="mt-4 text-blue-100">
              Free consultation • Personalized study plan • 520+ score faculty
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'MCAT Biology Preparation',
            description:
              'Expert MCAT biology coaching using Campbell Biology as your foundation. Prepare for the Biological and Biochemical Foundations sections.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              sameAs: 'https://cerebrumbiologyacademy.com',
            },
            coursePrerequisites: 'Undergraduate Biology coursework',
            educationalLevel: 'Pre-Medical',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  )
}
