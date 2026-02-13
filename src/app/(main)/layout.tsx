
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/client-wrapper";
import { Toaster } from 'sonner'
import PostFormModal from "@/components/post-form-modal";
import { Providers } from "@/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <Toaster richColors position="top-center" duration={2000} />
          <ClientProvider>
            <main className="w-full z-10">
              {children}
            </main>
            <PostFormModal />
          </ClientProvider>
        </Providers>
      </body>
    </html>
  );
}
