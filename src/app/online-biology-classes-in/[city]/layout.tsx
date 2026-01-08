import { Metadata } from 'next'
import { cities, getCityBySlug, getAllCitySlugs } from '@/lib/onlineClasses/cityData'

interface Props {
  params: Promise<{ city: string }>
  children: React.ReactNode
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({
    city,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const city = getCityBySlug(resolvedParams.city)

  if (!city) {
    return {
      title: 'Online Biology Classes',
    }
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: [
      `online biology classes ${city.name}`,
      `online biology classes in ${city.name}`,
      `NEET coaching ${city.name} online`,
      `biology tuition ${city.name} online`,
      `online biology tutor ${city.name}`,
      `best online biology classes ${city.name}`,
      `NEET biology online ${city.name}`,
    ],
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://cerebrumbiologyacademy.com/online-biology-classes-in/${city.slug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: city.metaTitle,
      description: city.metaDescription,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/online-biology-classes-in/${city.slug}`,
    },
  }
}

export default function CityLayout({ children }: Props) {
  return <>{children}</>
}
