import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NRI Medical Admission Guide - 15% NRI Quota Counseling",
  description: "Comprehensive counseling for NRI families navigating Indian medical admissions.",
  keywords: "NRI medical admission counseling, NRI quota medical colleges, Indian medical admission",
  openGraph: {
    title: "NRI Medical Admission Guide - 15% NRI Quota Counseling",
    description: "Comprehensive counseling for NRI families navigating Indian medical admissions.",
    type: "website",
    url: "https://cerebrumbiologyacademy.com/nri-medical-admission-counseling"
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Medical Admission Counseling",
    description: "Comprehensive counseling for NRI families navigating Indian medical admissions.",
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
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "What is the 15% NRI quota in Indian medical colleges?", "acceptedAnswer": {"@type": "Answer", "text": "The 15% NRI quota is a separate merit-based category for Non-Resident Indians."}}, {"@type": "Question", "name": "What score is needed for NRI quota medical admission?", "acceptedAnswer": {"@type": "Answer", "text": "Generally, scores range from 550-650+ depending on the college's reputation."}}, {"@type": "Question", "name": "Which medical colleges have the best NRI quota programs?", "acceptedAnswer": {"@type": "Answer", "text": "Top colleges like AIIMS Delhi, JIPMER Puducherry, CMC Vellore have good NRI programs."}}, {"@type": "Question", "name": "What documents are required for NRI medical admission?", "acceptedAnswer": {"@type": "Answer", "text": "Key documents include passport, NEET scorecard, school certificates, and domicile proof."}}, {"@type": "Question", "name": "How is the NRI counseling process different from general admission?", "acceptedAnswer": {"@type": "Answer", "text": "NRI counseling follows a separate process with registration, merit list, and document verification."}}, {"@type": "Question", "name": "Can you help with admission to private medical colleges as well?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! We guide families on private college options with fee structure comparison."}}]}`
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
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "NRI Medical Admission Counseling", "description": "Comprehensive counseling for NRI families navigating Indian medical admissions.", "provider": {"@type": "EducationalOrganization", "name": "Cerebrum Biology Academy", "url": "https://cerebrumbiologyacademy.com"}, "instructor": [{"@type": "Person", "name": "Dr. Shekhar C Singh"}]}`
        }}
      />
    </>
  );
}
