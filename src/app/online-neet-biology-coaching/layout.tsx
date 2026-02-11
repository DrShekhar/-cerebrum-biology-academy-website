import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online NEET Biology Coaching 2026 — Live Classes by AIIMS Faculty | Cerebrum Academy",
  description: "Join India's best online NEET biology coaching with live classes by AIIMS faculty. Small batches, personal mentoring, doubt clearing. Starting Rs 2,500/month.",
  keywords:
    "online neet biology coaching, neet biology online classes, best online neet coaching, live neet biology classes, online neet preparation",
  twitter: {
    card: 'summary_large_image',
    title: 'Online NEET Biology Coaching 2026 — Live Classes by AIIMS Faculty | Cerebrum Academy',
    description: 'Live NEET biology classes from anywhere in India. AIIMS faculty, small batches, personal mentoring.',
  },
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/online-neet-biology-coaching",
  },
  openGraph: {
    title: "Online NEET Biology Coaching 2026 — Live Classes by AIIMS Faculty",
    description: "Live NEET biology classes from anywhere in India. AIIMS faculty, small batches, personal mentoring. Starting Rs 2,500/month.",
    url: "https://cerebrumbiologyacademy.com/online-neet-biology-coaching",
    type: "website",
  },
}

export default function OnlineNEETBiologyCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
