import { Metadata } from "next";
import PageContent from "./PageContent";
import LocalitySchema from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Singapore",
  description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/neet-coaching-nri-singapore",
  },
  openGraph: {
    title: "NEET Coaching for NRI Students in Singapore",
    description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-singapore",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-singapore.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Singapore - Cerebrum Biology Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Singapore",
    description: "NEET coaching for NRI students in Singapore. 4 CBSE schools, 600K Indians. Bridge from IB/IGCSE to NEET with 98% success rate.",
    creator: "@cerebrumbiology",
    images: ["https://cerebrumbiologyacademy.com/og-neet-coaching-singapore.jpg"],
  },
};

export default function Page() {
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://cerebrumbiologyacademy.com/#organization",
        "name": "Cerebrum Biology Academy",
        "url": "https://cerebrumbiologyacademy.com",
        "logo": "https://cerebrumbiologyacademy.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/cerebrumbiology",
          "https://www.youtube.com/cerebrumbiology",
          "https://www.instagram.com/cerebrumbiology"
        ],
        "foundingDate": "2010",
        "description": "Expert NEET coaching for NRI students with 98% success rate",
        "telephone": "+918826444334",
        "areaServed": {
          "@type": "City",
          "name": "Singapore"
        },
        "offers": {
          "@type": "EducationalOccupationalProgram",
          "name": "NEET Coaching",
          "description": "Comprehensive NEET preparation for Singapore students"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is NEET preparation necessary for Singapore students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NEET is essential for admission to medical colleges in India. Our specialized coaching helps Singapore students master the NEET curriculum with Singapore-specific study schedules and exam center support."
            }
          },
          {
            "@type": "Question",
            "name": "What is your success rate for Singapore students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain a 98% success rate for all students including Singapore NRI students. Many of our students secure admissions in top AIIMS and medical colleges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer online coaching for students in Singapore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer both online and hybrid batches with flexible timings suitable for Singapore's timezone (SGT)."
            }
          },
          {
            "@type": "Question",
            "name": "Can Singapore students take NEET exam in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide guidance for NEET exam registration and center allocation. Our exam centers are in Singapore."
            }
          },
          {
            "@type": "Question",
            "name": "What about visa support for medical education?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Work permit to medical education visa transition support"
            }
          },
          {
            "@type": "Question",
            "name": "How many students from Singapore study with us?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have a thriving community of Singapore students with strong peer networks and regular success stories. Our community includes students from 4 CBSE schools."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cerebrumbiologyacademy.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "NRI Coaching",
            "item": "https://cerebrumbiologyacademy.com/nri-coaching"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "NEET Coaching in Singapore",
            "item": "https://cerebrumbiologyacademy.com/neet-coaching-nri-singapore"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <LocalitySchema
        locality="Singapore"
        region="Singapore"
        country="Singapore"
      />
      <PageContent />
    </>
  );
}
