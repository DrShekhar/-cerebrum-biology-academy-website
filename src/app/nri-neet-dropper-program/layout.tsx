import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NRI NEET Dropper Program - Focused Repeater Coaching',
  description:
    'Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.',
  keywords:
    'NRI NEET dropper program, NEET repeater coaching, NRI dropper program, NEET improvement program',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nri-neet-dropper-program',
  },

  openGraph: {
    title: 'NRI NEET Dropper Program - Focused Repeater Coaching',
    description:
      'Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/nri-neet-dropper-program',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRI NEET Dropper Program',
    description:
      'Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.',
    creator: '@cerebrumbiology',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How much improvement can I expect as a dropper student?", "acceptedAnswer": {"@type": "Answer", "text": "On average, our dropper students improve by 150-200 marks over their previous attempt, and 98% of Cerebrum students go on to qualify NEET."}}, {"@type": "Question", "name": "I am studying abroad — does this work across time zones?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You can study for NEET as a dropper from anywhere abroad. Live classes are scheduled across Gulf (GST), SE-Asia (SGT/ICT), UK (GMT) and US/Canada (ET/PT) time zones, and every session is recorded so you can catch up on anything you miss."}}, {"@type": "Question", "name": "How does the NEET NRI/OCI quota work for dropper students?", "acceptedAnswer": {"@type": "Answer", "text": "NRI and OCI candidates can apply under the 15% NRI quota at AIIMS, JIPMER, Manipal, KMC and deemed medical colleges. Cut-offs vary by college and year, so we benchmark your target against the latest published cut-offs and build your plan to clear them."}}, {"@type": "Question", "name": "How do you personalize the study plan for each student?", "acceptedAnswer": {"@type": "Answer", "text": "We conduct a comprehensive gap analysis of your previous NEET attempt and tailor the plan to your weak areas. Printed material can be shipped internationally, or you can use instant digital access."}}, {"@type": "Question", "name": "What if I have limited time before the next NEET?", "acceptedAnswer": {"@type": "Answer", "text": "Our flexible 10-12 month program can be compressed based on your timeline."}}, {"@type": "Question", "name": "Are mock tests included, and how frequent are they?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, weekly mock tests matching the exact NEET pattern are included."}}]}`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "NRI NEET Dropper Program", "description": "A 10-12 month second-attempt NEET Biology program for NRI and OCI students studying abroad, with live classes scheduled across Gulf, SE-Asia, UK and US/Canada time zones and NRI-quota cut-off targeting.", "provider": {"@type": "EducationalOrganization", "@id": "https://cerebrumbiologyacademy.com/#organization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com"}, "instructor": [{"@type": "Person", "name": "Dr. Shekhar C Singh"}]}`,
        }}
      />
    </>
  )
}
