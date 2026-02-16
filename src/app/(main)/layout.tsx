
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "400",
  display: 'swap'
});


export const metadata: Metadata = {
  metadataBase: new URL("https://inquire.com"),
  title: {
    default: "Inquire | Share Knowledge, Ask Questions",
    template: "%s | Inquire"
  },
  description: "Join Inquire to ask questions, share your expertise, and connect with a community of curious minds. The fastest way to get reliable answers to your tech and lifestyle queries.",
  keywords: [
    "Inquire",
    "Q&A platform",
    "social media app",
    "ask questions",
    "share knowledge",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inquire.com",
    siteName: "Inquire",
    images: [
      {
        url: '/logo.png',
        width: 1000,
        height: 630,
        alt: 'Preview of Inquire App',
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <main className="w-full min-h-screen z-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
