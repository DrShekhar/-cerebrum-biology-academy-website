import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NRI NEET Crash Course - Last 3-6 Months Intensive Program",
  description: "Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.",
  keywords: "NRI NEET crash course, NEET last minute preparation, NRI NEET intensive program",
  openGraph: {
    title: "NRI NEET Crash Course - Last 3-6 Months Intensive Program",
    description: "Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.",
    type: "website",
    url: "https://cerebrumbiologyacademy.com/nri-neet-crash-course"
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI NEET Crash Course",
    description: "Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.",
    creator: "@cerebrumbiology"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is 3-6 months enough time to improve my NEET score significantly?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! Our crash course focuses on high-yield topics that constitute 70% of the NEET paper."}}, {"@type": "Question", "name": "Which 40 topics should I prioritize in my last months?", "acceptedAnswer": {"@type": "Answer", "text": "We provide detailed topic prioritization based on NEET exam analysis."}}, {"@type": "Question", "name": "How many mock tests are included in the crash course?", "acceptedAnswer": {"@type": "Answer", "text": "In the 3-month program: ~90 mock tests. In the 6-month program: ~180 mock tests."}}, {"@type": "Question", "name": "Can NRI students join mid-month?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! You can start the program at any point and catch up with recorded sessions."}}, {"@type": "Question", "name": "What makes this different from regular NEET preparation?", "acceptedAnswer": {"@type": "Answer", "text": "Our crash course is specifically designed for last-minute preparation with focus on exam strategy."}}, {"@type": "Question", "name": "Is NCERT revision included or should I study separately?", "acceptedAnswer": {"@type": "Answer", "text": "Complete NCERT revision notes and videos are provided as part of the crash course."}}]}`
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "EducationalOrganization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com", "telephone": "+918826444334", "address": {"@type": "PostalAddress", "addressCountry": "IN"}, "founder": {"@type": "Person", "name": "Dr. Shekhar C Singh"}, "areaServed": "IN"}`
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "NRI NEET Crash Course", "description": "Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.", "provider": {"@type": "EducationalOrganization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com"}, "instructor": [{"@type": "Person", "name": "Dr. Shekhar C Singh"}]}`
        }}
      />
    </>
  );
}
