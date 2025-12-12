import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Leaf,
  HeartPulse,
  Microscope,
  Dna,
  Globe,
  ArrowRight,
  CheckCircle,
  Download,
  BarChart3,
  Award,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Biology Syllabus 2026 - Complete Chapter-wise Syllabus with Weightage | NCERT',
  description:
    'NEET Biology Syllabus 2026 with chapter-wise topics from Class 11 & 12 NCERT. Complete Botany & Zoology syllabus, topic weightage, important chapters, and preparation strategy.',
  keywords: [
    'NEET Biology syllabus 2026',
    'NEET syllabus 2026',
    'NEET Biology chapters',
    'NEET Botany syllabus',
    'NEET Zoology syllabus',
    'NEET Biology weightage',
    'NCERT Biology NEET',
    'NEET Biology important chapters',
    'NEET Biology topics',
    'NEET 2026 syllabus PDF',
  ],
  openGraph: {
    title: 'NEET Biology Syllabus 2026 - Complete Chapter-wise Syllabus',
    description:
      'Complete NEET Biology syllabus for 2026 with Botany, Zoology topics from Class 11 & 12 NCERT.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-biology-syllabus-2026',
    type: 'article',
    images: [
      {
        url: '/images/neet-biology-syllabus-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Biology Syllabus 2026',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-biology-syllabus-2026',
  },
}

const class11Botany = [
  {
    unit: 'Unit 1: Diversity in Living World',
    chapters: [
      { name: 'The Living World', weightage: '2-3%', questions: '2-3' },
      { name: 'Biological Classification', weightage: '3-4%', questions: '3-4' },
      { name: 'Plant Kingdom', weightage: '4-5%', questions: '4-5' },
    ],
  },
  {
    unit: 'Unit 2: Structural Organisation in Plants',
    chapters: [
      { name: 'Morphology of Flowering Plants', weightage: '4-5%', questions: '4-5' },
      { name: 'Anatomy of Flowering Plants', weightage: '3-4%', questions: '3-4' },
    ],
  },
  {
    unit: 'Unit 3: Cell Structure and Function',
    chapters: [
      { name: 'Cell: The Unit of Life', weightage: '4-5%', questions: '4-5' },
      { name: 'Biomolecules', weightage: '3-4%', questions: '3-4' },
      { name: 'Cell Cycle and Cell Division', weightage: '3-4%', questions: '3-4' },
    ],
  },
  {
    unit: 'Unit 4: Plant Physiology',
    chapters: [
      { name: 'Transport in Plants', weightage: '2-3%', questions: '2-3' },
      { name: 'Mineral Nutrition', weightage: '2-3%', questions: '2-3' },
      { name: 'Photosynthesis in Higher Plants', weightage: '4-5%', questions: '4-5' },
      { name: 'Respiration in Plants', weightage: '2-3%', questions: '2-3' },
      { name: 'Plant Growth and Development', weightage: '2-3%', questions: '2-3' },
    ],
  },
]

const class12Botany = [
  {
    unit: 'Unit 5: Reproduction',
    chapters: [
      { name: 'Sexual Reproduction in Flowering Plants', weightage: '5-6%', questions: '5-6' },
    ],
  },
  {
    unit: 'Unit 6: Genetics and Evolution',
    chapters: [
      { name: 'Principles of Inheritance and Variation', weightage: '6-8%', questions: '6-8' },
      { name: 'Molecular Basis of Inheritance', weightage: '5-6%', questions: '5-6' },
    ],
  },
  {
    unit: 'Unit 7: Biology and Human Welfare',
    chapters: [
      {
        name: 'Strategies for Enhancement in Food Production',
        weightage: '2-3%',
        questions: '2-3',
      },
      { name: 'Microbes in Human Welfare', weightage: '2-3%', questions: '2-3' },
    ],
  },
  {
    unit: 'Unit 8: Biotechnology',
    chapters: [
      { name: 'Biotechnology: Principles and Processes', weightage: '3-4%', questions: '3-4' },
      { name: 'Biotechnology and Its Applications', weightage: '2-3%', questions: '2-3' },
    ],
  },
  {
    unit: 'Unit 9: Ecology',
    chapters: [
      { name: 'Organisms and Populations', weightage: '3-4%', questions: '3-4' },
      { name: 'Ecosystem', weightage: '3-4%', questions: '3-4' },
      { name: 'Biodiversity and Conservation', weightage: '2-3%', questions: '2-3' },
      { name: 'Environmental Issues', weightage: '2-3%', questions: '2-3' },
    ],
  },
]

const class11Zoology = [
  {
    unit: 'Unit 1: Diversity in Living World',
    chapters: [{ name: 'Animal Kingdom', weightage: '5-6%', questions: '5-6' }],
  },
  {
    unit: 'Unit 2: Structural Organisation in Animals',
    chapters: [{ name: 'Structural Organisation in Animals', weightage: '3-4%', questions: '3-4' }],
  },
  {
    unit: 'Unit 3: Cell Structure and Function',
    chapters: [
      { name: 'Cell: The Unit of Life', weightage: '(Covered in Botany)', questions: '-' },
      { name: 'Biomolecules', weightage: '(Covered in Botany)', questions: '-' },
      { name: 'Cell Cycle and Cell Division', weightage: '(Covered in Botany)', questions: '-' },
    ],
  },
  {
    unit: 'Unit 4: Human Physiology',
    chapters: [
      { name: 'Digestion and Absorption', weightage: '3-4%', questions: '3-4' },
      { name: 'Breathing and Exchange of Gases', weightage: '2-3%', questions: '2-3' },
      { name: 'Body Fluids and Circulation', weightage: '3-4%', questions: '3-4' },
      { name: 'Excretory Products and Their Elimination', weightage: '3-4%', questions: '3-4' },
      { name: 'Locomotion and Movement', weightage: '3-4%', questions: '3-4' },
      { name: 'Neural Control and Coordination', weightage: '4-5%', questions: '4-5' },
      { name: 'Chemical Coordination and Integration', weightage: '3-4%', questions: '3-4' },
    ],
  },
]

const class12Zoology = [
  {
    unit: 'Unit 5: Reproduction',
    chapters: [
      { name: 'Reproduction in Organisms', weightage: '2-3%', questions: '2-3' },
      { name: 'Human Reproduction', weightage: '5-6%', questions: '5-6' },
      { name: 'Reproductive Health', weightage: '2-3%', questions: '2-3' },
    ],
  },
  {
    unit: 'Unit 6: Genetics and Evolution',
    chapters: [
      {
        name: 'Principles of Inheritance and Variation',
        weightage: '(Covered in Botany)',
        questions: '-',
      },
      { name: 'Molecular Basis of Inheritance', weightage: '(Covered in Botany)', questions: '-' },
      { name: 'Evolution', weightage: '3-4%', questions: '3-4' },
    ],
  },
  {
    unit: 'Unit 7: Biology and Human Welfare',
    chapters: [{ name: 'Human Health and Disease', weightage: '4-5%', questions: '4-5' }],
  },
]

const topChapters = [
  {
    chapter: 'Principles of Inheritance & Variation',
    subject: 'Genetics',
    questions: '8-10',
    priority: 'Very High',
  },
  {
    chapter: 'Molecular Basis of Inheritance',
    subject: 'Genetics',
    questions: '5-7',
    priority: 'Very High',
  },
  {
    chapter: 'Human Physiology (All)',
    subject: 'Zoology',
    questions: '20-25',
    priority: 'Very High',
  },
  { chapter: 'Plant Physiology (All)', subject: 'Botany', questions: '12-15', priority: 'High' },
  { chapter: 'Ecology (All)', subject: 'Botany', questions: '10-12', priority: 'High' },
  { chapter: 'Cell Biology', subject: 'Both', questions: '8-10', priority: 'High' },
  {
    chapter: 'Sexual Reproduction in Plants',
    subject: 'Botany',
    questions: '5-6',
    priority: 'High',
  },
  { chapter: 'Human Reproduction', subject: 'Zoology', questions: '5-6', priority: 'High' },
]

const faqData = [
  {
    question: 'What is the NEET Biology syllabus 2026?',
    answer:
      'NEET Biology syllabus 2026 covers Class 11 and Class 12 NCERT Biology. It includes Botany (Plant Biology) and Zoology (Animal Biology) with 90 questions worth 360 marks. Key topics include Human Physiology, Plant Physiology, Genetics, Ecology, Cell Biology, and Reproduction.',
  },
  {
    question: 'How many questions come from Biology in NEET?',
    answer:
      'In NEET, 90 questions come from Biology section - 45 from Botany and 45 from Zoology. Total marks for Biology is 360 (out of 720 total).',
  },
  {
    question: 'Which chapters are most important for NEET Biology 2026?',
    answer:
      'Most important chapters for NEET Biology include: Human Physiology (20-25 questions), Genetics (12-15 questions), Ecology (10-12 questions), Cell Biology (8-10 questions), Plant Physiology (12-15 questions), and Reproduction (10-12 questions).',
  },
  {
    question: 'Is NCERT enough for NEET Biology 2026?',
    answer:
      'Yes, NCERT is absolutely sufficient for NEET Biology. About 95% of questions are directly from NCERT textbooks. Read NCERT line by line, understand diagrams, and memorize important terms. Supplement with previous year questions for practice.',
  },
  {
    question: 'What is the weightage of Class 11 vs Class 12 in NEET Biology?',
    answer:
      'In NEET Biology, Class 12 has slightly higher weightage (approximately 55-60%) compared to Class 11 (40-45%). Key Class 12 chapters like Genetics, Human Reproduction, and Human Health carry more marks.',
  },
  {
    question: 'How to prepare Biology for NEET 2026?',
    answer:
      'For NEET Biology 2026: 1) Read NCERT thoroughly (line by line), 2) Make notes with diagrams, 3) Focus on high-weightage chapters first, 4) Solve previous year questions, 5) Take regular mock tests, 6) Revise frequently especially for terminology.',
  },
  {
    question: 'Is there any change in NEET Biology syllabus 2026?',
    answer:
      'As per current information, NEET Biology syllabus 2026 remains based on NCERT Class 11 and 12. Any syllabus changes will be announced by NTA in the official notification. Check the official NTA website for updates.',
  },
  {
    question: 'How to score 340+ in NEET Biology?',
    answer:
      'To score 340+ in NEET Biology: 1) Master NCERT completely, 2) Focus on Human Physiology and Genetics, 3) Practice 10,000+ MCQs, 4) Learn all diagrams and flowcharts, 5) Memorize scientific names and terminology, 6) Attempt all previous year papers.',
  },
]

function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Biology Syllabus 2026',
        item: 'https://www.cerebrumbiologyacademy.com/neet-biology-syllabus-2026',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export default function NEETBiologySyllabusPage() {
  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 py-16 text-white md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET Biology Syllabus 2026</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET Biology Syllabus 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-purple-100 md:text-xl">
              Complete chapter-wise Biology syllabus for NEET 2026 with topic weightage, important
              chapters, and preparation strategy based on NCERT Class 11 & 12.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">100 Questions</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-semibold">400 Marks</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Dna className="h-5 w-5" />
                <span className="font-semibold">Botany + Zoology</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="-mt-8 px-4">
          <div className="container mx-auto">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Botany</h3>
                <p className="text-2xl font-bold text-green-600">50 Questions</p>
                <p className="text-sm text-gray-600">200 Marks (45 to attempt)</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <HeartPulse className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Zoology</h3>
                <p className="text-2xl font-bold text-red-600">50 Questions</p>
                <p className="text-sm text-gray-600">200 Marks (45 to attempt)</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Microscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Class 11</h3>
                <p className="text-2xl font-bold text-blue-600">40-45%</p>
                <p className="text-sm text-gray-600">Weightage in NEET</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Dna className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Class 12</h3>
                <p className="text-2xl font-bold text-purple-600">55-60%</p>
                <p className="text-sm text-gray-600">Weightage in NEET</p>
              </div>
            </div>
          </div>
        </section>

        {/* High Weightage Chapters */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              High Weightage Chapters - Focus These First
            </h2>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left">Chapter</th>
                    <th className="px-4 py-4 text-center">Subject</th>
                    <th className="px-4 py-4 text-center">Expected Questions</th>
                    <th className="px-4 py-4 text-center">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topChapters.map((item) => (
                    <tr key={item.chapter} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">{item.chapter}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.subject}</td>
                      <td className="px-4 py-4 text-center font-semibold text-purple-600">
                        {item.questions}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            item.priority === 'Very High'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Class 11 Botany */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 11 Botany Syllabus</h2>
                <p className="text-gray-600">Plant Biology from NCERT Class 11</p>
              </div>
            </div>

            <div className="space-y-6">
              {class11Botany.map((unit) => (
                <div key={unit.unit} className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-green-700">{unit.unit}</h3>
                  <div className="space-y-3">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.name}
                        className="flex items-center justify-between rounded-lg bg-green-50 p-3"
                      >
                        <span className="font-medium text-gray-900">{chapter.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Weightage: {chapter.weightage}
                          </span>
                          <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                            {chapter.questions} Qs
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class 12 Botany */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 12 Botany Syllabus</h2>
                <p className="text-gray-600">Plant Biology from NCERT Class 12</p>
              </div>
            </div>

            <div className="space-y-6">
              {class12Botany.map((unit) => (
                <div key={unit.unit} className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-green-700">{unit.unit}</h3>
                  <div className="space-y-3">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.name}
                        className="flex items-center justify-between rounded-lg bg-green-50 p-3"
                      >
                        <span className="font-medium text-gray-900">{chapter.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Weightage: {chapter.weightage}
                          </span>
                          <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                            {chapter.questions} Qs
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class 11 Zoology */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <HeartPulse className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 11 Zoology Syllabus</h2>
                <p className="text-gray-600">Animal Biology from NCERT Class 11</p>
              </div>
            </div>

            <div className="space-y-6">
              {class11Zoology.map((unit) => (
                <div key={unit.unit} className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-red-700">{unit.unit}</h3>
                  <div className="space-y-3">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.name}
                        className="flex items-center justify-between rounded-lg bg-red-50 p-3"
                      >
                        <span className="font-medium text-gray-900">{chapter.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Weightage: {chapter.weightage}
                          </span>
                          {chapter.questions !== '-' && (
                            <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                              {chapter.questions} Qs
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class 12 Zoology */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <HeartPulse className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Class 12 Zoology Syllabus</h2>
                <p className="text-gray-600">Animal Biology from NCERT Class 12</p>
              </div>
            </div>

            <div className="space-y-6">
              {class12Zoology.map((unit) => (
                <div key={unit.unit} className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-red-700">{unit.unit}</h3>
                  <div className="space-y-3">
                    {unit.chapters.map((chapter) => (
                      <div
                        key={chapter.name}
                        className="flex items-center justify-between rounded-lg bg-red-50 p-3"
                      >
                        <span className="font-medium text-gray-900">{chapter.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Weightage: {chapter.weightage}
                          </span>
                          {chapter.questions !== '-' && (
                            <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                              {chapter.questions} Qs
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation Strategy */}
        <section className="bg-purple-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET Biology Preparation Strategy
            </h2>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                  1
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Master NCERT First</h3>
                <p className="text-gray-600">
                  Read NCERT line by line. Highlight important terms, diagrams, and flowcharts. 95%
                  of questions come directly from NCERT.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                  2
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Focus High-Weightage</h3>
                <p className="text-gray-600">
                  Prioritize Human Physiology, Genetics, Plant Physiology, and Ecology. These
                  chapters alone contribute 60% of Biology marks.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                  3
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Practice MCQs Daily</h3>
                <p className="text-gray-600">
                  Solve 50-100 MCQs daily. Focus on previous year questions and take full-length
                  mock tests weekly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Master NEET Biology with Expert Guidance
                  </h2>
                  <p className="mb-6 text-purple-100">
                    Join Cerebrum Biology Academy for comprehensive NEET Biology preparation.
                    Chapter-wise video lectures, MCQs, and personalized mentorship.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Complete NCERT-based video course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>1000+ chapter-wise MCQs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Previous year questions analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Live doubt solving sessions</span>
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 sm:px-6 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50 w-full sm:w-auto"
                    >
                      <span className="whitespace-nowrap">Book Demo</span>
                      <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    </Link>
                    <Link
                      href="/courses"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-5 sm:px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 w-full sm:w-auto"
                    >
                      <span className="whitespace-nowrap">View Courses</span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-purple-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Dna className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - NEET Biology Syllabus
            </h2>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqData.map((faq, index) => (
                <details key={index} className="group rounded-lg border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="border-t border-gray-200 p-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Related Resources</h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-2026-exam-date"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">
                  NEET 2026 Exam Date
                </h3>
                <p className="text-sm text-gray-600">Complete schedule and important dates</p>
              </Link>

              <Link
                href="/neet-2026-cutoff"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">
                  NEET 2026 Cutoff
                </h3>
                <p className="text-sm text-gray-600">Expected category-wise cutoff marks</p>
              </Link>

              <Link
                href="/neet-biology-mcq"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">
                  Biology MCQs
                </h3>
                <p className="text-sm text-gray-600">Practice chapter-wise questions</p>
              </Link>

              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">
                  Rank Predictor
                </h3>
                <p className="text-sm text-gray-600">Predict your NEET rank from marks</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
