import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Major Courses & Career Paths | MBBS, BDS, BAMS, BSc Biology | Cerebrum',
  description:
    'Comprehensive guide to biology-major undergraduate courses and career paths after Class 12 — MBBS, BDS, BAMS, BHMS, BVSc, BPT, BSc Biology, BSc Biotechnology, BSc Microbiology, B.Pharm, Biomedical Engineering. NEET-led pathway vs alternate pathways, eligibility, exam structure, college options across India and overseas.',
  keywords: [
    'biology major courses after 12th',
    'biology career paths',
    'MBBS BDS BAMS BHMS BVSc options',
    'BSc biology career',
    'biotechnology career',
    'pharmacy career biology',
    'biomedical engineering Class 12 biology',
    'NEET alternate paths',
    'biology PCB courses list',
    'after NEET career options',
    'medical career guide India',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/biology-major-courses' },
  openGraph: {
    title: 'Biology Major Courses & Career Paths | Cerebrum',
    description:
      'MBBS, BDS, BAMS, BVSc, BSc Biology, Biotech, B.Pharm — full biology-career landscape.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-major-courses',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Major Courses & Career Paths | Cerebrum',
    description: 'Complete career guide for biology students after Class 12.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
