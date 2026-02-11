import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NRI NEET Foundation Class 9-10 - Early Preparation Program",
  description: "Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.",
  keywords: "NRI NEET foundation program, Class 9 10 NEET preparation, NEET early preparation",
  openGraph: {
    title: "NRI NEET Foundation Class 9-10 - Early Preparation Program",
    description: "Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.",
    type: "website",
    url: "https://cerebrumbiologyacademy.com/nri-neet-foundation-program"
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI NEET Foundation Program",
    description: "Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.",
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
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is it too early to start NEET preparation in Class 9?", "acceptedAnswer": {"@type": "Answer", "text": "Not at all! Early preparation is highly beneficial. Students score 50-80 marks higher."}}, {"@type": "Question", "name": "How is this different from regular Class 9-10 Biology?", "acceptedAnswer": {"@type": "Answer", "text": "We align topics with NEET patterns while covering school curriculum completely."}}, {"@type": "Question", "name": "Can my child start mid-year if we enroll in Class 10?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! You'll receive recorded sessions plus live access to ongoing classes."}}, {"@type": "Question", "name": "What's the teaching approach for foundation students?", "acceptedAnswer": {"@type": "Answer", "text": "We use concept-based learning with relatable examples rather than rote memorization."}}, {"@type": "Question", "name": "Are there tests and assessments for Class 9-10 students?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, monthly tests in Class 9 and bi-weekly assessments in Class 10."}}, {"@type": "Question", "name": "Will this program prepare my child for board exams too?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely! Our curriculum covers complete board exam syllabus with deeper understanding."}}]}`
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
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "NRI NEET Foundation Program", "description": "Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.", "provider": {"@type": "EducationalOrganization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com"}, "instructor": [{"@type": "Person", "name": "Dr. Shekhar C Singh"}]}`
        }}
      />
    </>
  );
}
