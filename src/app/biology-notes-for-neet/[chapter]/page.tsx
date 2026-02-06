import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CONTACT_INFO } from "@/lib/constants/contactInfo"
import ChapterNotesContent from "./ChapterNotesContent"

/* ─────────────── Chapter Data ─────────────── */

interface Chapter {
  name: string
  slug: string
  class: 11 | 12
  unit: string
  weightage: number
  difficulty: "Easy" | "Moderate" | "Hard"
  description: string
}

const CHAPTERS_MAP: Record<string, Chapter> = {
  "molecular-basis-of-inheritance": {
    name: "Molecular Basis of Inheritance",
    slug: "molecular-basis-of-inheritance",
    class: 12,
    unit: "Genetics & Evolution",
    weightage: 15,
    difficulty: "Hard",
    description: "Comprehensive notes on DNA structure, replication, transcription, translation, gene regulation, and DNA fingerprinting for NEET Biology",
  },
  "principles-of-inheritance-and-variation": {
    name: "Principles of Inheritance and Variation",
    slug: "principles-of-inheritance-and-variation",
    class: 12,
    unit: "Genetics & Evolution",
    weightage: 10,
    difficulty: "Moderate",
    description: "Mendel's laws, inheritance patterns, sex-linked traits, chromosomal disorders, and pedigree analysis for NEET Biology",
  },
  "human-physiology": {
    name: "Human Physiology",
    slug: "human-physiology",
    class: 11,
    unit: "Human Physiology",
    weightage: 30,
    difficulty: "Hard",
    description: "Complete human physiology notes covering digestion, respiration, circulation, excretion, locomotion, neural control, and hormonal coordination for NEET Biology",
  },
}

/* ─────────────── Generate Static Params ─────────────── */

export async function generateStaticParams() {
  return Object.values(CHAPTERS_MAP).map((chapter) => ({
    chapter: chapter.slug,
  }))
}

/* ─────────────── Generate Metadata ─────────────── */

export async function generateMetadata({
  params,
}: {
  params: { chapter: string }
}): Promise<Metadata> {
  const chapterData = CHAPTERS_MAP[params.chapter]

  if (!chapterData) {
    return {
      title: "Chapter Not Found",
      description: "The requested chapter could not be found.",
    }
  }

  const baseUrl = "https://cerebrumbiologyacademy.com"
  const canonicalUrl = `${baseUrl}/biology-notes-for-neet/${params.chapter}`
  const pageTitle = `${chapterData.name} - Class ${chapterData.class} ${chapterData.unit} Notes for NEET`
  const pageDescription = `${chapterData.description} Prepare for NEET with comprehensive notes, diagrams, and practice questions. Weightage: ${chapterData.weightage} marks.`

  return {
    title: pageTitle,
    description: pageDescription,
    canonical: canonicalUrl,
    keywords: [
      chapterData.name.toLowerCase(),
      "NEET biology notes",
      `class ${chapterData.class}`,
      chapterData.unit.toLowerCase(),
      "genetics and evolution",
      "study material",
      "NCERT",
    ],
    authors: [{ name: "Cerebrum Biology Academy" }],
    openGraph: {
      type: "article",
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "Cerebrum Biology Academy",
      images: [
        {
          url: `${baseUrl}/og-biology-notes.jpg`,
          width: 1200,
          height: 630,
          alt: `${chapterData.name} Notes for NEET`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${baseUrl}/og-biology-notes.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

/* ─────────────── Server Component ─────────────── */

export default function ChapterPage({
  params,
}: {
  params: { chapter: string }
}) {
  const chapterData = CHAPTERS_MAP[params.chapter]

  if (!chapterData) {
    notFound()
  }

  // Schema markup for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${chapterData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${chapterData.name} covers fundamental concepts of ${chapterData.unit} with weightage of ${chapterData.weightage} marks in NEET examination.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the weightage of ${chapterData.name} in NEET?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${chapterData.name} has a weightage of ${chapterData.weightage} marks in NEET Biology examination.`,
        },
      },
    ],
  }

  // Schema markup for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://cerebrumbiologyacademy.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Biology Notes for NEET",
        item: "https://cerebrumbiologyacademy.com/biology-notes-for-neet",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: chapterData.name,
        item: `https://cerebrumbiologyacademy.com/biology-notes-for-neet/${params.chapter}`,
      },
    ],
  }

  // Schema markup for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${chapterData.name} - Class ${chapterData.class} ${chapterData.unit}`,
    description: chapterData.description,
    author: {
      "@type": "Organization",
      name: "Cerebrum Biology Academy",
      url: "https://cerebrumbiologyacademy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Cerebrum Biology Academy",
      logo: {
        "@type": "ImageObject",
        url: "https://cerebrumbiologyacademy.com/logo.png",
      },
    },
    image: "https://cerebrumbiologyacademy.com/og-biology-notes.jpg",
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Client Component */}
      <ChapterNotesContent chapter={chapterData} slug={params.chapter} />
    </>
  )
}
