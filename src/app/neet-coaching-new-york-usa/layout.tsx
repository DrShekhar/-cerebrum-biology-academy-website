import { Metadata } from "next";
import { LocalitySchema } from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching in New York, USA | Cerebrum Biology Academy",
  description: "Expert NEET coaching for New York, USA students. 98% success rate with Dr. Shekhar C Singh. WhatsApp: 918826444334",
  keywords: "NEET coaching new york, new york NEET classes, medical coaching new york, NEET usa",
  openGraph: {
    title: "NEET Coaching in New York, USA",
    description: "98% Success Rate | Expert NEET Coaching by Dr. Shekhar C Singh",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-new-york-usa`,
    siteName: "Cerebrum Biology Academy",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in New York, USA",
    description: "98% success rate. Dr. Shekhar C Singh. Free counseling +918826444334",
    creator: "@cerebrumacademy",
    site: "@cerebrumacademy"
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/cities/neet-coaching-new-york-usa`
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  }
};

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalitySchema 
        cityName="New York"
        country="USA"
        latitude=40.7128
        longitude=-74.006
        phone="+918826444334"
        whatsapp="918826444334"
        email="info@cerebrumbiologyacademy.com"
        website="https://cerebrumbiologyacademy.com"
      />
      {children}
    </>
  );
}
