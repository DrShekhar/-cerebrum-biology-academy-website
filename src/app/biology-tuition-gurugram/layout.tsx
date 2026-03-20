import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Gurugram 2026 | Class 11, 12 | CBSE, IB, IGCSE | Visit Center',
  description:
    'Top biology tuition in Gurugram. CBSE, IB, IGCSE boards + NEET by AIIMS Alumnus. Visit M2K Corporate Park, Sector 51. 15 students/batch. Call 88264-44334.',
  keywords:
    'biology tuition gurugram, biology tuition gurgaon, biology home tuition gurgaon, CBSE biology tuition gurugram, IB biology tuition gurugram, biology tutor gurugram, DPS gurugram biology tuition, biology coaching gurugram, biology classes gurgaon, IGCSE biology tuition gurugram, biology tuition DLF gurgaon, biology tuition sushant lok',
  openGraph: {
    title: 'Best Biology Tuition in Gurugram 2026 | CBSE, IB, IGCSE, NEET',
    description:
      'Top biology tuition in Gurugram. CBSE, IB, IGCSE + NEET by AIIMS Alumnus. Visit our Sector 51 center. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Gurugram 2026',
    description:
      'Top biology tuition in Gurugram. CBSE, IB, IGCSE + NEET. Visit M2K Corporate Park, Sector 51. Call 88264-44334.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-gurugram',
  },
}

export default function BiologyTuitionGurugramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
