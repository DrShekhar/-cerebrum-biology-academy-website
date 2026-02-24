import { Metadata } from "next";
import { LocalitySchema } from "@/components/seo/LocalitySchema";

export const metadata: Metadata = {
  title: "NEET Coaching in Vancouver, Canada",
  description: "Expert NEET coaching for Vancouver, Canada students. 98% success rate with Dr. Shekhar C Singh. WhatsApp: 918826444334",
  keywords: "NEET coaching vancouver, vancouver NEET classes, medical coaching vancouver, NEET canada",
  openGraph: {
    title: "NEET Coaching in Vancouver, Canada",
    description: "98% Success Rate | Expert NEET Coaching by Dr. Shekhar C Singh",
    url: `https://cerebrumbiologyacademy.com/cities/neet-coaching-vancouver-canada`,
    siteName: "Cerebrum Biology Academy",
    type: "website",
    locale: "en_CA"
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching in Vancouver, Canada",
    description: "98% success rate. Dr. Shekhar C Singh. Free counseling +918826444334",
    creator: "@cerebrumacademy",
    site: "@cerebrumacademy"
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/cities/neet-coaching-vancouver-canada`
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
        cityName="Vancouver"
        country="Canada"
        latitude={49.2827}
        longitude={-123.1207}
        phone="+918826444334"
        whatsapp="918826444334"
        email="info@cerebrumbiologyacademy.com"
        website="https://cerebrumbiologyacademy.com"
      />
      {children}
    </>
  );
}
