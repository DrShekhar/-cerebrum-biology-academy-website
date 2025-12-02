import type { Metadata } from 'next'

interface SectorMetadata {
  title: string
  description: string
  keywords: string
}

const sectorMetadata: Record<string, SectorMetadata> = {
  'sector-18': {
    title: 'NEET Coaching in Sector 18 Noida | Near GIP Mall, Atta Market | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 18 Noida near Great India Place, Atta Market. 98% success rate. AIIMS faculty. Join 120+ students. Online & offline classes. Book free demo!',
    keywords:
      'NEET coaching Sector 18 Noida, NEET classes near GIP Mall, biology coaching Atta Market, NEET tuition Sector 18, medical coaching near Wave Mall, NEET preparation Noida City Centre',
  },
  'sector-62': {
    title: 'NEET Coaching in Sector 62 Noida | IT Hub, Coaching Center | Cerebrum Academy',
    description:
      'Top NEET coaching in Sector 62 Noida IT hub. AIIMS faculty, 98% success rate. Join 95+ students from the coaching hub of Noida. Book free demo class!',
    keywords:
      'NEET coaching Sector 62 Noida, biology coaching IT hub Noida, NEET classes Sector 62, medical coaching NSEZ, NEET tuition near Spaze IT Park, coaching center Sector 62',
  },
  'sector-137': {
    title: 'NEET Coaching in Sector 137 Noida | Expressway, Aqua Line | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 137 Noida Expressway. Near Logix Blossom County, Paras Tierea. Aqua Line metro connected. 85+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 137 Noida, NEET classes Noida Expressway, biology coaching Logix Blossom County, NEET tuition Aqua Line, medical coaching Sector 137',
  },
  'sector-150': {
    title: 'NEET Coaching in Sector 150 Noida | ATS Pristine, Premium Area | Cerebrum Academy',
    description:
      'Premium NEET coaching in Sector 150 Noida. Near ATS Pristine, Gulshan Botnia. AIIMS faculty, small batches. 45+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 150 Noida, NEET classes ATS Pristine, biology coaching Sector 150, NEET tuition premium Noida, medical coaching Noida end',
  },
  'sector-44': {
    title: 'NEET Coaching in Sector 44 Noida | Golf Course, Godrej Woods | Cerebrum Academy',
    description:
      'Exclusive NEET coaching in Sector 44 Noida near Golf Course. Premium area, AIIMS faculty. Near Godrej Woods, Amity. 65+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 44 Noida, NEET classes near Golf Course, biology coaching Godrej Woods, NEET tuition premium Noida, medical coaching Amity area',
  },
  'sector-50': {
    title: 'NEET Coaching in Sector 50 Noida | Residential Hub | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 50 Noida residential area. 98% success rate. Near Sector 52 Metro. 70+ students enrolled. Book free demo!',
    keywords:
      'NEET coaching Sector 50 Noida, NEET classes Sector 52 metro, biology coaching residential Noida, NEET tuition Sector 50, medical coaching central Noida',
  },
  'sector-37': {
    title: 'NEET Coaching in Sector 37 Noida | Botanical Garden Area | Cerebrum Academy',
    description:
      'Top NEET coaching in Sector 37 Noida near Botanical Garden. Family-friendly area. 60+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Sector 37 Noida, NEET classes Botanical Garden, biology coaching Sector 37, NEET tuition near City Centre, medical coaching Noida central',
  },
  'sector-93': {
    title: 'NEET Coaching in Sector 93 Noida | Eldeco Utopia, Expressway | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 93/93A/93B Noida. Near Eldeco Utopia, ATS Greens Village. 55+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 93 Noida, NEET classes Eldeco Utopia, biology coaching ATS Greens Village, NEET tuition Sector 93A, medical coaching Noida Expressway',
  },
  'sector-104': {
    title: 'NEET Coaching in Sector 104 Noida | Supertech Supernova | Cerebrum Academy',
    description:
      'Premium NEET coaching in Sector 104 Noida. Near Supertech Supernova, Coralwood. 40+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Sector 104 Noida, NEET classes Supertech Supernova, biology coaching Sector 104, NEET tuition high-rise Noida, medical coaching Expressway',
  },
  'sector-128': {
    title: 'NEET Coaching in Sector 128 Noida | Jaypee Greens, Pari Chowk | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 128 Noida. Near Jaypee Greens, Pari Chowk. Greater Noida connectivity. 35+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 128 Noida, NEET classes Jaypee Greens, biology coaching Pari Chowk, NEET tuition JIIT area, medical coaching Greater Noida border',
  },
  'sector-15a': {
    title: 'NEET Coaching in Sector 15A Noida | Established Area | Cerebrum Academy',
    description:
      'Premium NEET coaching in Sector 15A Noida. Established premium area. Near Film City. 50+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Sector 15A Noida, NEET classes Film City area, biology coaching Sector 15, NEET tuition old Noida, medical coaching established Noida',
  },
  'sector-168': {
    title: 'NEET Coaching in Sector 168 Noida | Buddh Circuit, F1 Track | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 168 Noida near Buddh International Circuit. Shiv Nadar School area. 30+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 168 Noida, NEET classes Buddh Circuit, biology coaching F1 track area, NEET tuition Shiv Nadar, medical coaching Greater Noida end',
  },
  'greater-noida-west': {
    title: 'NEET Coaching in Greater Noida West | Gaur City, Ace City | Cerebrum Academy',
    description:
      'Top NEET coaching in Greater Noida West (Noida Extension). Gaur City, Ace City, Supertech Eco Village. 250+ students. Best results. Book free demo!',
    keywords:
      'NEET coaching Greater Noida West, NEET classes Gaur City, biology coaching Ace City, NEET tuition Noida Extension, medical coaching Supertech Eco Village, NEET coaching Panchsheel Greens',
  },
}

type Props = {
  params: Promise<{ sector: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params
  const meta = sectorMetadata[sector]

  if (!meta) {
    return {
      title: 'NEET Coaching in Noida | Cerebrum Biology Academy',
      description: 'Best NEET coaching in Noida with 98% success rate.',
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sector}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-noida/${sector}`,
    },
  }
}

export function generateStaticParams() {
  return [
    { sector: 'sector-18' },
    { sector: 'sector-62' },
    { sector: 'sector-137' },
    { sector: 'sector-150' },
    { sector: 'sector-44' },
    { sector: 'sector-50' },
    { sector: 'sector-37' },
    { sector: 'sector-93' },
    { sector: 'sector-104' },
    { sector: 'sector-128' },
    { sector: 'sector-15a' },
    { sector: 'sector-168' },
    { sector: 'greater-noida-west' },
  ]
}

export default function SectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
