import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynerdtech.com"),
  title: {
    default: "FlyNerd Tech | AI Automation Agency | Atlanta",
    template: "%s | FlyNerd Tech",
  },
  description:
    "FlyNerd Tech builds AI-powered automation systems for small and midsize businesses. Marketing operations, email campaigns, AI agents, and workflow design. Atlanta-based, global reach.",
  keywords: [
    "AI automation for small business",
    "marketing automation",
    "AI agency Atlanta",
    "AI agents for customer lifecycle",
    "email automation services",
    "CRM automation",
    "workflow automation",
    "AI chatbots",
    "marketing operations",
  ],
  authors: [{ name: "FlyNerd Tech" }],
  creator: "FlyNerd Tech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flynerdtech.com",
    siteName: "FlyNerd Tech",
    title: "FlyNerd Tech | AI Automation Agency",
    description:
      "Where intelligence meets influence. AI-powered automation for businesses ready to scale smarter.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlyNerd Tech - AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyNerd Tech | AI Automation Agency",
    description:
      "Where intelligence meets influence. AI-powered automation for businesses ready to scale smarter.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FlyNerd Tech",
              url: "https://flynerdtech.com",
              logo: "https://flynerdtech.com/logo.png",
              description:
                "AI automation agency specializing in marketing operations, email campaigns, and workflow design for small and midsize businesses.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Atlanta",
                addressRegion: "GA",
                addressCountry: "US",
              },
              sameAs: [
                "https://flynerdofficial.com",
                "https://linkedin.com/company/flynerdtech",
                "https://twitter.com/flynerdtech",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "hello@flynerdtech.com",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-orb w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,185,35,0.15)_0%,transparent_70%)] -top-[300px] -right-[200px] absolute" />
          <div className="bg-orb w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(43,90,106,0.2)_0%,transparent_70%)] -bottom-[200px] -left-[200px] absolute" style={{ animationDelay: "-5s" }} />
          <div className="bg-orb w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,185,35,0.1)_0%,transparent_70%)] top-[50%] left-[60%] absolute" style={{ animationDelay: "-10s" }} />
          <div className="grid-lines" />
          <div className="scan-line" />
          <div className="data-stream absolute inset-0 pointer-events-none opacity-50" />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
