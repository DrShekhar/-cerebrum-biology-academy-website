import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Coaching for Nepali Students",
  description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
  openGraph: {
    title: "NEET Coaching for Nepali Students",
    description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
    url: "https://cerebrumbiologyacademy.com/neet-coaching-nri-nepal",
    type: "website",
    images: [
      {
        url: "https://cerebrumbiologyacademy.com/og-neet-coaching-nepal.jpg",
        width: 1200,
        height: 630,
        alt: "NEET Coaching in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Coaching for Nepali Students",
    description: "NEET coaching for Nepali students. NEET is the primary exam for medical education. 98% success rate with Nepali curriculum bridge.",
    creator: "@cerebrumbiology",
    site: "@cerebrumbiology",
    images: {
      url: "https://cerebrumbiologyacademy.com/og-neet-coaching-nepal.jpg",
      alt: "NEET Coaching in Nepal",
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
