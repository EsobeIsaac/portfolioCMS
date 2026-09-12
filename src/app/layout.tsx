import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./globals.css";
import 'aos/dist/aos.css';


const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {

  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/api/v1/web-content`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const webContentRes = await response.json();

    const webContent = webContentRes.data;

    const title =
      webContent?.banner?.headline || "Personal Website";

    const description =
      webContent?.banner?.message ||
      "Welcome to my portfolio";

    return {
      title,
      description,

      openGraph: {
        title,
        description,
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("🔥 Metadata error:", error);

    return {
      title: "Personal Website",
      description: "Welcome to my portfolio",
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
