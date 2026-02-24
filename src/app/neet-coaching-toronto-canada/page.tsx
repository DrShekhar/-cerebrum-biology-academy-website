import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in Toronto, Canada",
  description: "Expert NEET coaching for Toronto, Canada students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching toronto, NEET classes toronto, medical entrance exam toronto, biology coaching toronto, Cerebrum Biology Academy toronto",
  openGraph: {
    title: "NEET Coaching in Toronto, Canada",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-toronto-canada`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-toronto-canada.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching Toronto"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Toronto, Canada",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-toronto-canada.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
