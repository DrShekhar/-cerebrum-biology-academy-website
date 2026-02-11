import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NRI NEET Dropper Program - Focused Repeater Coaching",
  description: "Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.",
  keywords: "NRI NEET dropper program, NEET repeater coaching, NRI dropper program, NEET improvement program",
  openGraph: {
    title: "NRI NEET Dropper Program - Focused Repeater Coaching",
    description: "Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.",
    type: "website",
    url: "https://cerebrumbiologyacademy.com/nri-neet-dropper-program"
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI NEET Dropper Program",
    description: "Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.",
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
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How much improvement can I expect as a dropper student?", "acceptedAnswer": {"@type": "Answer", "text": "On average, our dropper students improve by 150-200 marks. 78% of our students achieve this improvement."}}, {"@type": "Question", "name": "Is this program suitable for NRI students in different timezones?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! We offer flexible timings with recorded sessions available 24/7."}}, {"@type": "Question", "name": "What score improvement is needed for NRI quota?", "acceptedAnswer": {"@type": "Answer", "text": "Most NRI quota seats require 600+ marks. 92% of our dropper students qualify for NRI quota."}}, {"@type": "Question", "name": "How do you personalize the study plan for each student?", "acceptedAnswer": {"@type": "Answer", "text": "We conduct a comprehensive gap analysis of your NEET exam performance."}}, {"@type": "Question", "name": "What if I have limited time before the next NEET?", "acceptedAnswer": {"@type": "Answer", "text": "Our flexible 10-12 month program can be compressed based on your timeline."}}, {"@type": "Question", "name": "Are mock tests included, and how frequent are they?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, weekly mock tests matching the exact NEET pattern are included."}}]}`
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
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "NRI NEET Dropper Program", "description": "Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.", "provider": {"@type": "EducationalOrganization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com"}, "instructor": [{"@type": "Person", "name": "Dr. Shekhar C Singh"}]}`
        }}
      />
    </>
  );
}
