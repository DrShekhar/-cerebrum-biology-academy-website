import { Metadata } from "next";
import PageContent from "./PageContent";
import LocalitySchema from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in UK",
  description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
  alternates: {
    canonical: "https://cerebrumbiologyacademy.com/neet-coaching-nri-uk",
  },
  openGraph: {
    title: "NEET Coaching for NRI Students in UK",
    description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-uk",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-uk.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in United Kingdom - Cerebrum Biology Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in UK",
    description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
    creator: "@cerebrumbiology",
    images: ["https://cerebrumbiologyacademy.com/og-neet-coaching-uk.jpg"],
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
          "name": "United Kingdom"
        },
        "offers": {
          "@type": "EducationalOccupationalProgram",
          "name": "NEET Coaching",
          "description": "Comprehensive NEET preparation for United Kingdom students"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is NEET preparation necessary for United Kingdom students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NEET is essential for admission to medical colleges in India. Our specialized coaching helps United Kingdom students master the NEET curriculum with United Kingdom-specific study schedules and exam center support."
            }
          },
          {
            "@type": "Question",
            "name": "What is your success rate for United Kingdom students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain a 98% success rate for all students including United Kingdom NRI students. Many of our students secure admissions in top AIIMS and medical colleges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer online coaching for students in United Kingdom?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer both online and hybrid batches with flexible timings suitable for United Kingdom's timezone (GMT)."
            }
          },
          {
            "@type": "Question",
            "name": "Can United Kingdom students take NEET exam in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide guidance for NEET exam registration and center allocation. Our exam centers are in London."
            }
          },
          {
            "@type": "Question",
            "name": "What about visa support for medical education?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Student visa sponsorship with NHS career pathway guidance"
            }
          },
          {
            "@type": "Question",
            "name": "How many students from United Kingdom study with us?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have a thriving community of United Kingdom students with strong peer networks and regular success stories. Our community includes students from 3 CBSE schools."
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
            "name": "NEET Coaching in United Kingdom",
            "item": "https://cerebrumbiologyacademy.com/neet-coaching-nri-uk"
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
        locality="United Kingdom"
        region="United Kingdom"
        country="United Kingdom"
      />
      <PageContent />
    </>
  );
}
