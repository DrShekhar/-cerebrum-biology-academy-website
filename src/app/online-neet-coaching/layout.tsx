import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online NEET Coaching 2025-26 | Best Online Biology Classes | Cerebrum Academy',
  description:
    "India's #1 online NEET coaching with AIIMS faculty. Live online NEET classes, 1-on-1 online NEET tuition, doubt clearing sessions & online NEET test series. 2,500+ selections. Free demo class available!",
  keywords: [
    // High-volume primary keywords (90K+ monthly)
    'online neet coaching',
    'neet online classes',
    'online neet preparation',
    'best online neet coaching',
    'online biology tuition',
    'online biology classes for neet',
    'neet biology online course',
    // Service-based keywords
    'online neet biology coaching',
    'online biology tutor for neet',
    'online neet classes with doubt clearing',
    'live online biology classes',
    'one-on-one online neet coaching',
    'online neet test series',
    'online neet mock test',
    'recorded neet biology lectures',
    'online neet crash course',
    'online neet dropper batch',
    // Class-based keywords
    'online neet coaching class 11',
    'online neet coaching class 12',
    'online biology tuition class 9',
    'online biology tuition class 10',
    // Feature-based keywords
    'online neet coaching with personal mentor',
    'affordable online neet coaching',
    'best online biology teacher for neet',
    'online neet coaching in hindi',
    // Year-specific
    'online coaching for neet 2025',
    'online coaching for neet 2026',
  ],
  openGraph: {
    title: 'Online NEET Coaching | Best Online Coaching for NEET 2026',
    description:
      "Join India's best online NEET coaching with AIIMS-trained faculty. Live classes, recorded lectures & complete study material.",
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online NEET Coaching | Best Online Coaching for NEET 2026',
    description:
      "Join India's best online NEET coaching with AIIMS-trained faculty. Live classes, recorded lectures & complete study material.",
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching',
  },
}

export default function OnlineNeetCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
