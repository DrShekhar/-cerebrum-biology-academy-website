import Link from 'next/link'
import { Metadata } from 'next'
import {
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Target,
  GraduationCap,
  Beaker,
  Trophy,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Olympiad Practice | NSEB, INBo, IBO | Cerebrum Biology Academy',
  description:
    'Practice Biology Olympiad questions for NSEB, INBo, and IBO. Campbell Biology-aligned MCQs with advanced conceptual depth for Olympiad preparation.',
  keywords: [
    'biology olympiad',
    'NSEB practice',
    'INBo questions',
    'IBO preparation',
    'Campbell Biology MCQ',
    'olympiad biology questions',
    'biology olympiad practice',
  ],
  openGraph: {
    title: 'Biology Olympiad Practice | Cerebrum Biology Academy',
    description:
      'Practice Biology Olympiad questions for NSEB, INBo, and IBO with Campbell Biology-aligned MCQs.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-tools/olympiad-practice',
  },
}

const olympiadLevels = [
  {
    level: 'NSEB',
    title: 'National Standard Examination in Biology',
    description:
      'Stage 1 of the Biology Olympiad. Tests NCERT+ concepts with application-based questions. Ideal starting point for Olympiad aspirants.',
    icon: Target,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    depth: 'Foundation to Intermediate',
  },
  {
    level: 'INBo',
    title: 'Indian National Biology Olympiad',
    description:
      'Stage 2 for NSEB qualifiers. Requires deep understanding of Campbell Biology concepts, experimental design, and data interpretation.',
    icon: Beaker,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    depth: 'Intermediate to Advanced',
  },
  {
    level: 'IBO',
    title: 'International Biology Olympiad',
    description:
      'The pinnacle of Biology Olympiad. Expert-level questions covering molecular biology, genetics, ecology, and plant/animal physiology at university depth.',
    icon: Trophy,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    depth: 'Advanced to Expert',
  },
]

const campbellUnits = [
  { unit: 1, title: 'The Chemistry of Life', chapters: '2-5' },
  { unit: 2, title: 'The Cell', chapters: '6-12' },
  { unit: 3, title: 'Genetics', chapters: '13-21' },
  { unit: 4, title: 'Mechanisms of Evolution', chapters: '22-26' },
  { unit: 5, title: 'The Evolutionary History of Biological Diversity', chapters: '27-34' },
  { unit: 6, title: 'Plant Form and Function', chapters: '35-39' },
  { unit: 7, title: 'Animal Form and Function', chapters: '40-49' },
  { unit: 8, title: 'Ecology', chapters: '50-56' },
]

export default function OlympiadPracticePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 pt-16 pb-24 text-white md:pt-24 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-yellow-500/10" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-300">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-tools" className="hover:underline">
              NEET Tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Olympiad Practice</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
              <Award className="h-5 w-5" />
              <span className="font-semibold">Biology Olympiad</span>
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              Biology Olympiad Practice
            </h1>
            <p className="mb-8 text-lg text-slate-300 md:text-xl">
              Prepare for NSEB, INBo, and IBO with Campbell Biology-aligned questions.
              Practice at different conceptual depths to build Olympiad-level mastery.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">Campbell Biology Aligned</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">NSEB / INBo / IBO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiad Levels */}
      <section className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 md:-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {olympiadLevels.map((item) => (
              <Link
                key={item.level}
                href={`/mcq-practice?isOlympiad=true&olympiadLevel=${item.level}`}
                className={`group rounded-2xl border ${item.borderColor} bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                >
                  <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <div className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.level}
                </div>

                <h2 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {item.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600">{item.description}</p>

                <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                  <Target className="h-4 w-4" />
                  <span>Depth: {item.depth}</span>
                </div>

                <span className="flex items-center gap-1 font-semibold text-blue-600 transition-all group-hover:gap-2">
                  Start Practice <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Campbell Biology Units */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Practice by Campbell Biology Unit
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Questions organized by Campbell Biology units and chapters for systematic preparation
          </p>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {campbellUnits.map((unit) => (
              <Link
                key={unit.unit}
                href={`/mcq-practice?isOlympiad=true&campbellUnit=${unit.unit}`}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 font-bold text-green-700">
                  {unit.unit}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {unit.title}
                  </h3>
                  <p className="text-sm text-gray-500">Chapters {unit.chapters}</p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-gray-300 transition-colors group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conceptual Depth */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Conceptual Depth Levels
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Questions are tagged by depth to match your current preparation stage
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                depth: 'foundation',
                label: 'Foundation',
                desc: 'NCERT-level concepts with Olympiad framing',
                color: 'bg-green-500',
              },
              {
                depth: 'intermediate',
                label: 'Intermediate',
                desc: 'Campbell Biology core concepts',
                color: 'bg-blue-600',
              },
              {
                depth: 'advanced',
                label: 'Advanced',
                desc: 'Research-level understanding required',
                color: 'bg-purple-700',
              },
              {
                depth: 'expert',
                label: 'Expert',
                desc: 'IBO-level conceptual mastery',
                color: 'bg-slate-800',
              },
            ].map((item) => (
              <Link
                key={item.depth}
                href={`/mcq-practice?isOlympiad=true&conceptualDepth=${item.depth}`}
                className="group rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className={`mb-3 h-2 w-16 rounded-full ${item.color}`} />
                <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-blue-600">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Olympiad */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Why Prepare for Biology Olympiad?
          </h2>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                icon: Award,
                title: 'International Recognition',
                desc: 'Medal winners at IBO gain international recognition and research opportunities at top universities worldwide.',
              },
              {
                icon: GraduationCap,
                title: 'Admission Advantage',
                desc: 'Olympiad qualifiers get preference in admissions at IISc, CMC Vellore, and international universities.',
              },
              {
                icon: BookOpen,
                title: 'Deeper Understanding',
                desc: 'Olympiad preparation builds conceptual depth that makes NEET Biology significantly easier.',
              },
              {
                icon: CheckCircle,
                title: 'NEET Synergy',
                desc: 'Over 60% of Olympiad topics overlap with NEET syllabus. Olympiad preparation directly boosts NEET scores.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Ready to Start Your Olympiad Journey?
          </h2>
          <p className="mb-8 text-gray-600">
            Begin with NSEB-level questions and progressively work your way up to IBO-level mastery.
          </p>
          <Link
            href="/mcq-practice?isOlympiad=true"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-800 px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-yellow-700"
          >
            Start Olympiad Practice
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
