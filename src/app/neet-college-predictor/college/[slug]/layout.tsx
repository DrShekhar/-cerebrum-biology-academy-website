import type { Metadata } from 'next'
import colleges from '@/data/colleges.json'

interface College {
  name: string
  state: string
  type: 'Government' | 'Private' | 'Deemed'
  quotaType: 'AIQ_Only' | 'AIQ_and_State'
  tier: number
  totalSeats: number
  aiqSeats: number
  stateSeats: number
  nirfRank: number | null
  aiqCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
    general_pwd?: number
    ews_pwd?: number
    obc_pwd?: number
    sc_pwd?: number
    st_pwd?: number
  }
  stateCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
  } | null
  fees: number
  feeDisplay: string
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getMarksFromRank(rankNum: number): number {
  if (rankNum <= 1) return 720
  if (rankNum <= 10) return 720 - Math.round((rankNum - 1) / 2)
  if (rankNum <= 100) return 715 - Math.round((rankNum - 10) / 6)
  if (rankNum <= 1100) return 700 - Math.round((rankNum - 100) / 50)
  if (rankNum <= 5000) return 680 - Math.round((rankNum - 1100) / 130)
  if (rankNum <= 25000) return 650 - Math.round((rankNum - 5000) / 400)
  if (rankNum <= 70000) return 600 - Math.round((rankNum - 25000) / 900)
  if (rankNum <= 150000) return 550 - Math.round((rankNum - 70000) / 1600)
  if (rankNum <= 300000) return 500 - Math.round((rankNum - 150000) / 3000)
  if (rankNum <= 500000) return 450 - Math.round((rankNum - 300000) / 4000)
  if (rankNum <= 750000) return 400 - Math.round((rankNum - 500000) / 5000)
  return Math.max(0, 350 - Math.round((rankNum - 750000) / 6000))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collegesData = colleges as College[]
  const college = collegesData.find((c) => generateSlug(c.name) === slug)

  if (!college) {
    return {
      title: 'College Not Found | NEET College Predictor',
      description: 'The requested college profile was not found.',
    }
  }

  const estimatedMarks = getMarksFromRank(college.aiqCutoffs.general)

  return {
    title: `${college.name} NEET Cutoff 2024 | Fees, Seats & Admission`,
    description: `Get ${college.name} NEET cutoff rank (${college.aiqCutoffs.general.toLocaleString('en-IN')}) for 2024. Know required marks (~${estimatedMarks}/720), fees (${college.feeDisplay}), ${college.totalSeats} seats & category-wise cutoffs for admission.`,
    keywords: [
      `${college.name} cutoff`,
      `${college.name} NEET cutoff`,
      `${college.name} admission`,
      `${college.name} fees`,
      `${college.name} seats`,
      `NEET cutoff ${college.state}`,
      `${college.type} medical college ${college.state}`,
      'NEET 2024 cutoff',
      'MBBS admission 2024',
    ],
    openGraph: {
      title: `${college.name} NEET Cutoff 2024 | Fees & Admission`,
      description: `NEET cutoff rank: ${college.aiqCutoffs.general.toLocaleString('en-IN')} (General). Fees: ${college.feeDisplay}. Total seats: ${college.totalSeats}. ${college.type} college in ${college.state}.`,
      type: 'website',
      url: `https://cerebrumbiologyacademy.com/neet-college-predictor/college/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${college.name} NEET Cutoff 2024`,
      description: `Cutoff: ${college.aiqCutoffs.general.toLocaleString('en-IN')} | Marks: ~${estimatedMarks}/720 | Fees: ${college.feeDisplay}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-college-predictor/college/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const collegesData = colleges as College[]

  // Generate static pages for tier 1 and tier 2 colleges (most searched)
  const topColleges = collegesData.filter((c) => c.tier === 1 || c.tier === 2)

  return topColleges.map((college) => ({
    slug: generateSlug(college.name),
  }))
}

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
