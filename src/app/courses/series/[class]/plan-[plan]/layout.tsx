import type { Metadata } from 'next'

type Props = {
  params: Promise<{ class: string; plan: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const className = resolvedParams.class.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const planName = resolvedParams.plan.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${className} ${planName} Plan | NEET Biology Coaching - Cerebrum Academy`,
    description: `${planName} coaching plan for ${className} students. Expert AIIMS faculty, comprehensive NEET preparation.`,
    keywords: `${className} NEET coaching, ${planName} plan, biology coaching, NEET preparation`,
    openGraph: {
      title: `${className} ${planName} Plan | Cerebrum Biology Academy`,
      description: `Join our ${planName} plan for ${className}. Expert faculty, proven results.`,
      url: `https://cerebrumbiologyacademy.com/courses/series/${resolvedParams.class}/plan-${resolvedParams.plan}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
    card: 'summary_large_image',
    title: '${className} ${planName} Plan | NEET Biology Coaching - Cerebrum Academy',
    description: '${planName} coaching plan for ${className} students. Expert AIIMS faculty, comprehensive NEET preparation.',
  },
  alternates: {
      canonical: `https://cerebrumbiologyacademy.com/courses/series/${resolvedParams.class}/plan-${resolvedParams.plan}`,
    },
  }
}

export default function CoursePlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
