import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in Houston, USA",
  description: "Expert NEET coaching for Houston, USA students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching houston, NEET classes houston, medical entrance exam houston, biology coaching houston, Cerebrum Biology Academy houston",
  openGraph: {
    title: "NEET Coaching in Houston, USA",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-houston-usa`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-houston-usa.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching Houston"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Houston, USA",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-houston-usa.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
