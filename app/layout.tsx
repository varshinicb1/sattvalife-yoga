import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  fallback: ["Georgia", "serif"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sattvalife.yoga"),
  title: {
    default: "Sattvalife Yoga - Stop Worrying, Start Living! | Leicester Yoga Classes",
    template: "%s | Sattvalife Yoga",
  },
  description: "Sattvalife offers personalised yoga classes in Leicester, suitable for small groups, individuals and corporate. Vinyasa, Hatha, meditation & wellness programmes.",
  keywords: ["yoga", "Leicester", "vinyasa", "hatha", "meditation", "wellness", "corporate yoga", "yoga classes", "Amisha Soni", "Nish Soni"],
  authors: [{ name: "Amisha Soni" }],
  creator: "Sattvalife Yoga",
  publisher: "Sattvalife Yoga",
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://sattvalife.yoga",
    siteName: "Sattvalife Yoga",
    title: "Sattvalife Yoga - Stop Worrying, Start Living!",
    description: "Sattvalife offers personalised yoga classes in Leicester, suitable for small groups, individuals and corporate. Vinyasa, Hatha, meditation & wellness programmes.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Sattvalife Yoga - Personalised yoga classes in Leicester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sattvalife Yoga - Stop Worrying, Start Living!",
    description: "Sattvalife offers personalised yoga classes in Leicester, suitable for small groups, individuals and corporate.",
    images: ["/og-default.jpg"],
    creator: "@sattvalifeyoga",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "health",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A18" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}