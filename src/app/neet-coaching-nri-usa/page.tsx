import { Metadata } from "next";
import PageContent from "./PageContent";
import LocalitySchema from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in USA",
  description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/neet-coaching-nri-usa",
  },
  openGraph: {
    title: "NEET Coaching for NRI Students in USA",
    description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-usa",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-usa.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in United States of America - Cerebrum Biology Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in USA",
    description: "AP Biology to NEET bridge coaching for NRI students in USA. 2 CBSE schools, 5.16M Indians. Pre-med pathway with 98% success rate.",
    creator: "@cerebrumbiology",
    images: ["https://cerebrumbiologyacademy.com/og-neet-coaching-usa.jpg"],
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
          "name": "United States of America"
        },
        "offers": {
          "@type": "EducationalOccupationalProgram",
          "name": "NEET Coaching",
          "description": "Comprehensive NEET preparation for United States of America students"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is NEET preparation necessary for United States of America students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NEET is essential for admission to medical colleges in India. Our specialized coaching helps United States of America students master the NEET curriculum with United States of America-specific study schedules and exam center support."
            }
          },
          {
            "@type": "Question",
            "name": "What is your success rate for United States of America students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain a 98% success rate for all students including United States of America NRI students. Many of our students secure admissions in top AIIMS and medical colleges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer online coaching for students in United States of America?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer both online and hybrid batches with flexible timings suitable for United States of America's timezone (EST)."
            }
          },
          {
            "@type": "Question",
            "name": "Can United States of America students take NEET exam in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide guidance for NEET exam registration and center allocation. Our exam centers are in New York, San Francisco."
            }
          },
          {
            "@type": "Question",
            "name": "What about visa support for medical education?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "F-1 visa to medical education visa transition support"
            }
          },
          {
            "@type": "Question",
            "name": "How many students from United States of America study with us?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have a thriving community of United States of America students with strong peer networks and regular success stories. Our community includes students from 2 CBSE schools."
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
            "name": "NEET Coaching in United States of America",
            "item": "https://cerebrumbiologyacademy.com/neet-coaching-nri-usa"
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
        locality="United States of America"
        region="United States of America"
        country="United States of America"
      />
      <PageContent />
    </>
  );
}
