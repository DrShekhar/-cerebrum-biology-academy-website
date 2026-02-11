import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for NRI Students in Malaysia | Cerebrum Biology Academy",
  description: "NEET coaching for NRI students in Malaysia. 5 CBSE schools, 200K Indians. Affordable coaching with 98% success rate in KL and beyond.",
  openGraph: {
    title: "NEET Coaching for NRI Students in Malaysia | Cerebrum Biology Academy",
    description: "NEET coaching for NRI students in Malaysia. 5 CBSE schools, 200K Indians. Affordable coaching with 98% success rate in KL and beyond.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-malaysia",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-malaysia.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for NRI Students in Malaysia | Cerebrum Biology Academy",
    description: "NEET coaching for NRI students in Malaysia. 5 CBSE schools, 200K Indians. Affordable coaching with 98% success rate in KL and beyond.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-malaysia.jpg",
      alt: "NEET Coaching in Malaysia",
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
