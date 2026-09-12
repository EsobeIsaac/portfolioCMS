import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./globals.css";
import 'aos/dist/aos.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Website"
};

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
