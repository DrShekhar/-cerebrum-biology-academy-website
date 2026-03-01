import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { neetGuideSEOPages } from '@/data/seo-landing'

const content = neetGuideSEOPages['neet-zoology-syllabus']

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

const zoologyChapters = [
  { chapter: 'Animal Kingdom', class: '11', questions: '3-4', weightage: 'High', key: 'Classification up to phyla, salient features of each phylum' },
  { chapter: 'Structural Organisation in Animals', class: '11', questions: '2-3', weightage: 'Medium', key: 'Morphology and anatomy of cockroach, tissue types' },
  { chapter: 'Body Fluids and Circulation', class: '11', questions: '2-3', weightage: 'High', key: 'Human circulatory system, blood groups, ECG, cardiac cycle' },
  { chapter: 'Excretory Products and Elimination', class: '11', questions: '2-3', weightage: 'High', key: 'Nephron structure, urine formation, countercurrent mechanism' },
  { chapter: 'Locomotion and Movement', class: '11', questions: '2-3', weightage: 'Medium', key: 'Types of muscles, skeletal system, joints, disorders' },
  { chapter: 'Neural Control and Coordination', class: '11', questions: '3-4', weightage: 'High', key: 'Neuron structure, synapse, reflex arc, brain anatomy, eye and ear' },
  { chapter: 'Chemical Coordination and Integration', class: '11', questions: '2-3', weightage: 'High', key: 'Endocrine glands, hormones, feedback mechanisms, disorders' },
  { chapter: 'Human Reproduction', class: '12', questions: '3-4', weightage: 'High', key: 'Gametogenesis, menstrual cycle, fertilization, embryonic development' },
  { chapter: 'Reproductive Health', class: '12', questions: '1-2', weightage: 'Medium', key: 'Contraception methods, STDs, infertility, ART' },
  { chapter: 'Human Health and Disease', class: '12', questions: '3-4', weightage: 'High', key: 'Immunity types, AIDS, cancer, drugs and alcohol abuse' },
  { chapter: 'Evolution', class: '12', questions: '2-3', weightage: 'Medium', key: 'Origin of life, Darwinism, Hardy-Weinberg principle, adaptive radiation' },
]

export default function NeetZoologySyllabusPage() {
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
            Complete NEET Zoology Chapter-Wise Syllabus and Weightage
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Zoology contributes approximately 45 questions (180 marks) in NEET, split between Class 11 Animal Diversity and Human Physiology chapters and Class 12 Reproduction, Genetics, and Ecology chapters. Human Physiology alone accounts for 50+ marks, making it the most important unit in the entire NEET Biology syllabus.
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-red-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">Chapter</th>
                  <th className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-900">Class</th>
                  <th className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-900">Avg Questions</th>
                  <th className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-900">Weightage</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">Key Topics</th>
                </tr>
              </thead>
              <tbody>
                {zoologyChapters.map((ch, i) => (
                  <tr key={ch.chapter} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{ch.chapter}</td>
                    <td className="border border-gray-200 px-3 py-3 text-center">{ch.class}</td>
                    <td className="border border-gray-200 px-3 py-3 text-center">{ch.questions}</td>
                    <td className="border border-gray-200 px-3 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${ch.weightage === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {ch.weightage}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">{ch.key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <article className="prose prose-lg prose-red max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              High-Yield Zoology Topics for NEET 2026
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Based on analysis of NEET papers from 2019-2025, the highest-yield zoology topics are: Human Physiology (Neural Control, Body Fluids, Excretion, Chemical Coordination), Human Reproduction and Reproductive Health, Human Health and Disease (especially Immunity), and Animal Kingdom classification. Together, these chapters contribute 30-35 questions every year.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Human Physiology unit from Class 11 is particularly important because questions are direct and NCERT-based. Students who master the cardiac cycle, nephron functioning, neuron transmission, and hormonal regulation can score 40-50 marks from this unit alone. Our faculty recommends spending 40% of zoology preparation time on Human Physiology.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Smart Strategy: How to Cover Zoology in 60 Days
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Week 1-3:</strong> Complete Human Physiology (all 6 chapters) with NCERT + previous year questions. <strong>Week 3-4:</strong> Animal Kingdom classification — memorize phylum characteristics using comparison tables. <strong>Week 5-6:</strong> Human Reproduction, Reproductive Health, and Human Health and Disease. <strong>Week 7-8:</strong> Evolution and remaining chapters with full revision. This sequence prioritizes high-weightage chapters first so even partial completion yields maximum marks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 not-prose">
              <Link href="/neet-biology-important-questions" className="text-red-700 hover:text-red-900 font-medium">
                Important Questions →
              </Link>
              <Link href="/neet-biology-revision-notes" className="text-red-700 hover:text-red-900 font-medium">
                Revision Notes →
              </Link>
              <Link href="/mcq" className="text-red-700 hover:text-red-900 font-medium">
                Practice MCQs →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
