import { Metadata } from "next";
import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "NEET Coaching in London, UK | Cerebrum Biology Academy",
  description: "Expert NEET coaching for London, UK students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers.",
  keywords: "NEET coaching london, NEET classes london, medical entrance exam london, biology coaching london, Cerebrum Biology Academy london",
  openGraph: {
    title: "NEET Coaching in London, UK | Cerebrum Biology Academy",
    description: "98% Success Rate. Expert NEET coaching by Dr. Shekhar C Singh. Call +918826444334 for free counseling.",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-london-uk`,
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-london-uk.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching London"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in London, UK",
    description: "98% success rate with Dr. Shekhar C Singh. Limited seats available!",
    creator: "@cerebrumacademy",
    images: ["https://cerebrumbiologyacademy.com/twitter-neet-coaching-london-uk.jpg"]
  }
};

export default function Page() {
  return <PageContent />;
}
