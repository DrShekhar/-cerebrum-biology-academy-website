import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
  description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
  openGraph: {
    title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
    description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-saudi-arabia",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-saudi-arabia.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Saudi Arabia | Cerebrum Biology Academy",
    description: "Expert NEET coaching for NRI students in Saudi Arabia. 42 CBSE schools, 2.6M Indians. IST-friendly evening batches with 98% success rate.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-saudi-arabia.jpg",
      alt: "NEET Coaching in Saudi Arabia",
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
