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
  BarChart3,
  FlaskConical,
  Layers,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biology Olympiad Practice | NSEB, USABO, INBO, BBO, IBO | Cerebrum Biology Academy',
  description:
    'Practice 3,000+ Biology Olympiad questions for NSEB, USABO, INBO, BBO, and IBO. MTF, Data Interpretation, Experimental Design — aligned to Campbell Biology with expert-level depth.',
  keywords: [
    'biology olympiad',
    'NSEB practice',
    'USABO questions',
    'IBO preparation',
    'INBO practice',
    'BBO questions',
    'Campbell Biology MCQ',
    'MTF questions biology',
    'biology olympiad practice',
    'olympiad biology questions',
  ],
  openGraph: {
    title: 'Biology Olympiad Practice | Cerebrum Biology Academy',
    description:
      'Practice 3,000+ Biology Olympiad questions with MTF, Data Interpretation & Experimental Design formats.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-tools/olympiad-practice',
  },
}

const examCards = [
  {
    level: 'NSEB',
    title: 'National Standard Examination in Biology',
    description: 'Stage 1 — NCERT+ concepts with application-based questions. 750 questions across all Campbell units.',
    icon: Target,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    difficulty: 'HARD',
    questionCount: 750,
    format: 'MCQ + Multiple Select',
  },
  {
    level: 'USABO_OPEN',
    title: 'USABO Open Exam',
    description: 'First round of USA Biology Olympiad. Covers all Campbell Biology domains with emphasis on conceptual understanding.',
    icon: BookOpen,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    difficulty: 'HARD',
    questionCount: 600,
    format: 'MCQ',
  },
  {
    level: 'USABO_SEMI',
    title: 'USABO Semifinal',
    description: 'Advanced round with MTF and data interpretation. Requires university-level depth in molecular biology and physiology.',
    icon: Beaker,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    difficulty: 'EXPERT',
    questionCount: 450,
    format: 'MTF + Data Interpretation',
  },
  {
    level: 'INBO',
    title: 'Indian National Biology Olympiad',
    description: 'Stage 2 for NSEB qualifiers. Deep Campbell Biology concepts, experimental design, and data interpretation.',
    icon: Beaker,
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    difficulty: 'EXPERT',
    questionCount: 450,
    format: 'MTF + Experimental Design',
  },
  {
    level: 'BBO',
    title: 'British Biology Olympiad',
    description: 'UK national competition. Broad coverage with emphasis on ecology, evolution, and plant biology.',
    icon: GraduationCap,
    color: 'bg-teal-100',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    difficulty: 'HARD-EXPERT',
    questionCount: 300,
    format: 'MCQ + Data Interpretation',
  },
  {
    level: 'IBO',
    title: 'International Biology Olympiad',
    description: 'The pinnacle. Expert-level MTF questions covering molecular biology, genetics, ecology, and physiology at university depth.',
    icon: Trophy,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    difficulty: 'EXPERT',
    questionCount: 450,
    format: 'MTF + Experimental Design',
  },
]

const campbellUnits = [
  { unit: 1, title: 'Chemistry of Life', chapters: 'Ch 1-5', questions: 75, iboWeight: '2.5%', tier: 3 },
  { unit: 2, title: 'The Cell', chapters: 'Ch 6-12', questions: 600, iboWeight: '20%', tier: 1 },
  { unit: 3, title: 'Genetics', chapters: 'Ch 13-21', questions: 600, iboWeight: '20%', tier: 1 },
  { unit: 4, title: 'Evolution', chapters: 'Ch 22-26', questions: 225, iboWeight: '7.5%', tier: 2 },
  { unit: 5, title: 'Diversity of Life', chapters: 'Ch 27-34', questions: 150, iboWeight: '5%', tier: 3 },
  { unit: 6, title: 'Plant Form & Function', chapters: 'Ch 35-39', questions: 375, iboWeight: '12.5%', tier: 2 },
  { unit: 7, title: 'Animal Form & Function', chapters: 'Ch 40-49', questions: 750, iboWeight: '25%', tier: 1 },
  { unit: 8, title: 'Ecology', chapters: 'Ch 52-56', questions: 225, iboWeight: '7.5%', tier: 2 },
]

const questionTypeTraining = [
  {
    type: 'MTF',
    title: 'Multiple True/False',
    description: 'Signature IBO/USABO format — evaluate 4 statements as True or False with partial credit scoring.',
    icon: CheckCircle,
    color: 'bg-purple-600',
    count: 750,
    href: '/neet-biology-mcq?isOlympiad=true&type=MTF',
  },
  {
    type: 'DATA_INTERPRETATION',
    title: 'Data Interpretation',
    description: 'Analyze graphs, tables, and experimental data. Tests ability to extract and interpret biological data.',
    icon: BarChart3,
    color: 'bg-blue-600',
    count: 450,
    href: '/neet-biology-mcq?isOlympiad=true&type=DATA_INTERPRETATION',
  },
  {
    type: 'EXPERIMENTAL_DESIGN',
    title: 'Experimental Design',
    description: 'Design experiments, identify controls, predict outcomes. Critical for IBO and USABO Semi.',
    icon: FlaskConical,
    color: 'bg-green-600',
    count: 300,
    href: '/neet-biology-mcq?isOlympiad=true&type=EXPERIMENTAL_DESIGN',
  },
  {
    type: 'MCQ',
    title: 'Standard MCQ',
    description: 'Single-best-answer format used in NSEB, USABO Open, and BBO. University-level conceptual depth.',
    icon: Target,
    color: 'bg-slate-700',
    count: 1200,
    href: '/neet-biology-mcq?isOlympiad=true&type=MCQ',
  },
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
              <span className="font-semibold">Biology Olympiad Question Bank</span>
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              3,000+ Olympiad Questions
            </h1>
            <p className="mb-6 text-lg text-slate-300 md:text-xl">
              The most comprehensive Biology Olympiad prep resource. MTF, Data Interpretation, and Experimental Design — aligned to IBO syllabus.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Campbell Biology Aligned</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Layers className="h-4 w-4" />
                <span className="font-medium">6 Olympiad Exams</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">MTF + Partial Credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Exam Selector */}
      <section className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 md:-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examCards.map((exam) => (
              <Link
                key={exam.level}
                href={`/neet-biology-mcq?isOlympiad=true&olympiadLevel=${exam.level}`}
                className={`group rounded-2xl border ${exam.borderColor} bg-white p-5 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${exam.color}`}
                  >
                    <exam.icon className={`h-6 w-6 ${exam.iconColor}`} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {exam.questionCount} Qs
                  </span>
                </div>

                <div className="mb-1 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {exam.level.replace('_', ' ')}
                </div>

                <h2 className="mb-1.5 text-base font-bold text-gray-900 group-hover:text-blue-600">
                  {exam.title}
                </h2>
                <p className="mb-3 text-xs text-gray-600 leading-relaxed">{exam.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className={`px-2 py-0.5 rounded-full ${
                    exam.difficulty === 'EXPERT'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {exam.difficulty}
                  </span>
                  <span className="text-gray-400">{exam.format}</span>
                </div>

                <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                  Start Practice <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Campbell Unit Navigator */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Practice by Campbell Biology Unit
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Questions organized by Campbell Biology units, weighted to IBO syllabus distribution
          </p>

          <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2">
            {campbellUnits.map((unit) => (
              <Link
                key={unit.unit}
                href={`/neet-biology-mcq?isOlympiad=true&campbellUnit=${unit.unit}`}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 font-bold text-green-700">
                  {unit.unit}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm">
                      {unit.title}
                    </h3>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      unit.tier === 1
                        ? 'bg-red-100 text-red-700'
                        : unit.tier === 2
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      Tier {unit.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{unit.chapters}</span>
                    <span className="font-medium text-gray-700">{unit.questions} Qs</span>
                    <span className="text-blue-600 font-medium">IBO {unit.iboWeight}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${(unit.questions / 750) * 100}%` }}
                    />
                  </div>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-600 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Question Type Training */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Question Type Training
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Master each format separately before mixing them in full practice sessions
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {questionTypeTraining.map((item) => (
              <Link
                key={item.type}
                href={item.href}
                className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.color} text-white`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">{item.count} Questions</span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                  Practice Now <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Difficulty Ladder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Difficulty Ladder
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Progress from foundation to expert depth systematically
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                depth: 'foundation',
                label: 'Foundation',
                desc: 'NCERT-level concepts with Olympiad framing',
                color: 'bg-green-500',
                textColor: 'text-green-700',
                bgColor: 'bg-green-50',
              },
              {
                depth: 'intermediate',
                label: 'Intermediate',
                desc: 'Campbell Biology core chapters',
                color: 'bg-blue-600',
                textColor: 'text-blue-700',
                bgColor: 'bg-blue-50',
              },
              {
                depth: 'advanced',
                label: 'Advanced',
                desc: 'Multi-textbook integration (Alberts, Lehninger)',
                color: 'bg-purple-700',
                textColor: 'text-purple-700',
                bgColor: 'bg-purple-50',
              },
              {
                depth: 'expert',
                label: 'Expert',
                desc: 'IBO-level conceptual mastery & research literature',
                color: 'bg-slate-800',
                textColor: 'text-slate-700',
                bgColor: 'bg-slate-50',
              },
            ].map((item) => (
              <Link
                key={item.depth}
                href={`/neet-biology-mcq?isOlympiad=true&conceptualDepth=${item.depth}`}
                className={`group rounded-xl ${item.bgColor} p-6 shadow-sm transition-shadow hover:shadow-lg`}
              >
                <div className={`mb-3 h-2 w-16 rounded-full ${item.color}`} />
                <h3 className={`mb-1 font-semibold ${item.textColor} group-hover:text-blue-600`}>
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Olympiad */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
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
                desc: 'Olympiad qualifiers get preference at IISc, CMC Vellore, MIT, Stanford, and international universities.',
              },
              {
                icon: BookOpen,
                title: 'Deeper Understanding',
                desc: 'Olympiad preparation builds conceptual depth that makes NEET Biology significantly easier.',
              },
              {
                icon: CheckCircle,
                title: 'NEET Synergy',
                desc: 'Over 60% of Olympiad topics overlap with NEET syllabus. Olympiad prep directly boosts NEET scores.',
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
            href="/neet-biology-mcq?isOlympiad=true"
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
