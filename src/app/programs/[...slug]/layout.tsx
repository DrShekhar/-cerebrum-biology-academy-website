import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const programSlug = slug.join('/')
  const programName = slug[slug.length - 1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${programName} | NEET Biology Coaching - Cerebrum Academy`,
    description: `Enroll in our ${programName} for NEET preparation. Expert AIIMS faculty, comprehensive study material, proven results.`,
    keywords: `${programName}, NEET program, biology coaching, NEET preparation, medical entrance`,
    openGraph: {
      title: `${programName} | Cerebrum Biology Academy`,
      description: `Join our ${programName} for NEET success. Expert faculty, small batches, 98% success rate.`,
      url: `https://cerebrumbiologyacademy.com/programs/${programSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/programs/${programSlug}`,
    },
  }
}

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
