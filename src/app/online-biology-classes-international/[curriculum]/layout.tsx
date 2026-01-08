import { Metadata } from 'next'
import {
  getInternationalBySlug,
  getAllInternationalSlugs,
} from '@/lib/onlineClasses/internationalData'

interface Props {
  params: Promise<{ curriculum: string }>
  children: React.ReactNode
}

export async function generateStaticParams() {
  return getAllInternationalSlugs().map((curriculum) => ({
    curriculum,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const curriculum = getInternationalBySlug(resolvedParams.curriculum)

  if (!curriculum) {
    return {
      title: 'International Biology Classes',
    }
  }

  return {
    title: curriculum.metaTitle,
    description: curriculum.metaDescription,
    keywords: [
      `${curriculum.name} biology online classes`,
      `${curriculum.name} biology tutor`,
      `${curriculum.fullName} tutoring`,
      `${curriculum.name} biology exam preparation`,
      `online ${curriculum.name} biology classes`,
      `${curriculum.name} biology help`,
      `${curriculum.examBoard} biology`,
    ],
    openGraph: {
      title: curriculum.metaTitle,
      description: curriculum.metaDescription,
      url: `https://cerebrumbiologyacademy.com/online-biology-classes-international/${curriculum.slug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: curriculum.metaTitle,
      description: curriculum.metaDescription,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/online-biology-classes-international/${curriculum.slug}`,
    },
  }
}

export default function InternationalLayout({ children }: Props) {
  return <>{children}</>
}
