import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in UK | Cerebrum Biology Academy",
  description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in UK | Cerebrum Biology Academy",
    description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-uk",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-uk.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in United Kingdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in UK | Cerebrum Biology Academy",
    description: "A-Level to NEET bridge coaching for NRI students in UK. 3 CBSE schools, 1.8M Indians. NHS pathway with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-uk.jpg",
      alt: "NEET Coaching in United Kingdom",
    },
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
