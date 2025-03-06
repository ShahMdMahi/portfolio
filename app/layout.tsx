import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data";
// import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description:
    "Portfolio of Shah Md. Mahi, a versatile full-stack developer with extensive experience in both front-end and back-end technologies.",
  keywords: [
    "developer",
    "full-stack",
    "web development",
    "react",
    "next.js",
    "portfolio",
    personalInfo.name,
    personalInfo.nickname,
  ],
  authors: [
    {
      name: personalInfo.name,
      url: personalInfo.socialMedia.find((s) => s.name === "LinkedIn")?.url,
    },
  ],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shahmdmahi.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description:
      "Full-Stack Developer with expertise in modern web technologies",
    url: "https://shahmdmahi.live",
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: personalInfo.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description:
      "Full-Stack Developer with expertise in modern web technologies",
    creator:
      personalInfo.socialMedia.find((s) => s.name === "X")?.username ||
      "@shahmdmahi_",
    images: ["/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {/* <ThemeProvider defaultTheme="dark"> */}
          {children}
          {/* </ThemeProvider> */}
        </ErrorBoundary>
      </body>
    </html>
  );
}
