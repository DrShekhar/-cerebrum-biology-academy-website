import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { ncertSEOPages } from '@/data/seo-landing'

const content = ncertSEOPages['ncert-biology-notes-class-11']

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
}

const class11Chapters = [
  { unit: 'Diversity of Living Organisms', chapters: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'], neetQ: '8-10', tip: 'Focus on classification tables and phylum characteristics' },
  { unit: 'Structural Organisation', chapters: ['Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Structural Organisation in Animals'], neetQ: '5-7', tip: 'Master tissue types and root/stem/leaf anatomy diagrams' },
  { unit: 'Cell Structure and Function', chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'], neetQ: '8-10', tip: 'Cell organelle functions, enzyme properties, and mitosis vs meiosis' },
  { unit: 'Plant Physiology', chapters: ['Transport in Plants', 'Mineral Nutrition', 'Photosynthesis in Higher Plants', 'Respiration in Plants', 'Plant Growth and Development'], neetQ: '10-12', tip: 'Calvin cycle, C3 vs C4, Krebs cycle, and phytohormones' },
  { unit: 'Human Physiology', chapters: ['Digestion and Absorption', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation', 'Excretory Products', 'Locomotion and Movement', 'Neural Control', 'Chemical Coordination'], neetQ: '15-18', tip: 'Highest-scoring unit — master NCERT diagrams and flowcharts' },
]

export default function NcertBiologyNotesClass11Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <SEOLandingPage content={content} />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            NCERT Class 11 Biology: Unit-Wise Chapter Guide for NEET
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            NCERT Biology Class 11 has 22 chapters across 5 units. For NEET, approximately 45-50 questions (180-200 marks) come from Class 11, with Human Physiology and Plant Physiology being the highest-weightage units. Reading NCERT line-by-line is non-negotiable — over 85% of NEET Biology questions can be answered directly from NCERT textbook language.
          </p>

          <div className="space-y-6 mb-12">
            {class11Chapters.map((unit) => (
              <div key={unit.unit} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{unit.unit}</h3>
                  <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {unit.neetQ} NEET Questions
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {unit.chapters.map((ch) => (
                    <span key={ch} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                      {ch}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>NEET Tip:</strong> {unit.tip}
                </p>
              </div>
            ))}
          </div>

          <article className="prose prose-lg prose-green max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              How to Make NCERT Notes That Actually Help in NEET
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Effective NCERT notes for NEET are not summaries — they are structured extractions of exam-relevant information. For each chapter, note down: (1) all definitions and scientific terms, (2) differences tables (e.g., mitosis vs meiosis, C3 vs C4 plants), (3) diagrams with labels (NEET frequently tests diagram-based MCQs), (4) flowcharts for processes (photosynthesis, digestion, urine formation), and (5) NCERT-specific statements that are commonly twisted into MCQ options.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Cerebrum Biology Academy, our Class 11 notes follow a three-layer system: Layer 1 is NCERT line-by-line highlights, Layer 2 is comparison tables and flowcharts, and Layer 3 is previous year NEET questions mapped to each NCERT paragraph. This system ensures every NCERT concept is connected to its exam application, helping students answer both direct and application-based questions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 not-prose">
              <Link href="/biology-notes" className="text-green-700 hover:text-green-900 font-medium">
                All Biology Notes →
              </Link>
              <Link href="/class-11-neet-preparation-online" className="text-green-700 hover:text-green-900 font-medium">
                Class 11 NEET Prep →
              </Link>
              <Link href="/mcq" className="text-green-700 hover:text-green-900 font-medium">
                Practice MCQs →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
