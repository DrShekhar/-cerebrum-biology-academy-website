import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AP Biology to NEET Biology Bridge',
  description:
    'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ap-biology-to-neet-preparation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology to NEET Biology Bridge',
    description:
      'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
  },

  openGraph: {
    title: 'AP Biology to NEET Biology Bridge',
    description:
      'Bridge course for AP Biology students moving to NEET-UG: maps College Board AP units onto the NCERT-based NEET syllabus, closes India-specific content gaps, and drills NCERT-line-precise answer accuracy. Live online, biology-only specialist faculty.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
