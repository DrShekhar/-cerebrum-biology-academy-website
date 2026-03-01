import { Metadata } from 'next'
import Link from 'next/link'
import { SEOLandingPage } from '@/components/seo-landing'
import { topicsSEOPages } from '@/data/seo-landing'

const content = topicsSEOPages['genetics-biology-tuition']

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

export default function GeneticsBiologyTuitionPage() {
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
        <article className="max-w-4xl mx-auto px-4 prose prose-lg prose-green">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Genetics Is the Highest-Scoring Chapter in NEET Biology
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Genetics contributes approximately 25-30 marks in NEET every year, making it the single highest-weightage unit in Biology. The unit spans both Class 11 (Principles of Inheritance and Variation) and Class 12 (Molecular Basis of Inheritance), covering everything from Mendel&apos;s laws of segregation and independent assortment to the central dogma of molecular biology including DNA replication, transcription, and translation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Chapter-Wise Breakdown for NEET Genetics
          </h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Principles of Inheritance and Variation (Class 12)</strong> covers Mendelian genetics, incomplete dominance, codominance, multiple allelism (ABO blood groups), pleiotropy, polygenic inheritance, sex determination mechanisms, sex-linked inheritance, pedigree analysis, and chromosomal disorders including Down syndrome, Turner syndrome, and Klinefelter syndrome. On average, 8-10 questions appear from this chapter alone.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Molecular Basis of Inheritance (Class 12)</strong> focuses on DNA and RNA structure, the Meselson-Stahl experiment proving semiconservative replication, the lac operon model of gene regulation, the genetic code properties, and the Human Genome Project. This chapter typically contributes 6-8 questions in NEET.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Mistakes Students Make in Genetics
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Most students lose marks in genetics due to three mistakes: confusing incomplete dominance with codominance, making errors in dihybrid cross ratios, and struggling with pedigree analysis. At Cerebrum Biology Academy, we use a systematic approach to solve genetic crosses — starting with identifying the type of inheritance, writing genotypes, constructing Punnett squares, and verifying phenotypic ratios. Our students practice 200+ genetics problems covering every variation that has appeared in NEET from 2015-2025.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How We Teach Genetics Differently
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our approach begins with NCERT line-by-line reading since 85% of NEET genetics questions come directly from NCERT. We then build problem-solving skills through graded difficulty levels — starting with simple monohybrid crosses, progressing to dihybrid and trihybrid problems, and finally tackling complex pedigree and linkage questions. Every concept is reinforced with previous year NEET questions and original MCQs designed by our faculty.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/neet-biology-important-questions" className="text-green-700 hover:text-green-900 font-medium no-underline">
              NEET Important Questions →
            </Link>
            <Link href="/biology-notes" className="text-green-700 hover:text-green-900 font-medium no-underline">
              Biology Notes →
            </Link>
            <Link href="/mcq" className="text-green-700 hover:text-green-900 font-medium no-underline">
              Practice MCQs →
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
