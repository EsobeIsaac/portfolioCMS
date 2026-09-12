import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import "aos/dist/aos.css";

import getWebContent from "@/app/admin/components/getWebContents";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const webContentRes = await getWebContent();
    const webContent = webContentRes.data;

    const title = webContent?.banner?.title || "Personal Website";
    const headline = webContent?.banner?.headline || "";
    const description =
      webContent?.banner?.message ||
      "Welcome to my personal portfolio website.";

    // Convert Cloudinary HTTP URLs to HTTPS
    const image = webContent?.banner?.image?.replace(
      "http://",
      "https://"
    );

    return {
      title: `${title} | ${headline}`,

      description,

      keywords: [
        "Visual Designer",
        "Webflow Developer",
        "UI/UX Designer",
        "Graphic Designer",
        "Web Developer",
        "Portfolio",
      ],

      openGraph: {
        title: `${title} | ${headline}`,
        description,
        type: "website",
        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: headline,
              },
            ]
          : [],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | ${headline}`,
        description,
        images: image ? [image] : [],
      },

      icons: {
        icon: webContent?.logo?.image?.replace(
          "http://",
          "https://"
        ),
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);

    return {
      title: "Personal Website",
      description: "Welcome to my personal portfolio website.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
