import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Biology Classes for NEET and Boards (9-12) & Droppers | Online, Offline, Hybrid | Delhi NCR',
  description:
    'Biology classes for NEET, CBSE/ICSE Boards (Classes 9-12), and droppers. Online, offline, and hybrid modes. Offline centres in South Extension New Delhi, Gurugram Sector 51, Faridabad Sector 17, and Rohini. AIIMS-trained faculty, small batches, 98% success rate.',
  keywords: [
    'biology classes',
    'biology classes for NEET',
    'biology classes class 11',
    'biology classes class 12',
    'biology classes for droppers',
    'biology classes for boards',
    'online biology classes',
    'offline biology classes',
    'hybrid biology classes',
    'biology classes south extension',
    'biology classes gurugram sector 51',
    'biology classes faridabad sector 17',
    'biology classes rohini',
    'biology classes delhi ncr',
    'CBSE biology classes',
    'ICSE biology classes',
    'NEET biology coaching Delhi',
    'best biology coaching Delhi NCR',
  ],
  openGraph: {
    title: 'Biology Classes for NEET and Boards (9-12) & Droppers | Online, Offline, Hybrid',
    description:
      'AIIMS-trained faculty. Small batches. 4 Delhi NCR centres: South Extension, Gurugram, Faridabad, Rohini. Plus live online and hybrid options.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-classes',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Classes for NEET and Boards (9-12) & Droppers | Delhi NCR',
    description:
      'Online, offline, and hybrid biology classes with AIIMS-trained faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes',
    languages: {
      'en-IN': 'https://cerebrumbiologyacademy.com/biology-classes',
      en: 'https://cerebrumbiologyacademy.com/biology-classes',
      'x-default': 'https://cerebrumbiologyacademy.com/biology-classes',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function BiologyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
