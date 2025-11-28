import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lai Liao - Singapore Bus Arrival Times Display",
  description:
    "Real-time Singapore bus arrival times. Perfect for old iPads as a dedicated bus timing display at home. Check when your bus is coming - lai liao!",
  keywords: [
    "singapore bus timing",
    "sg bus arrival",
    "bus timing singapore",
    "lta bus arrival",
    "singapore bus app",
    "bus arrival time singapore",
    "sg bus",
    "singapore public transport",
    "bus display",
    "ipad bus timing",
  ],
  authors: [{ name: "Lai Liao" }],
  creator: "Lai Liao",
  publisher: "Lai Liao",
  metadataBase: new URL("https://buslailiao.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lai Liao - Singapore Bus Arrival Times",
    description:
      "Real-time Singapore bus timings. Turn your old iPad into a dedicated bus arrival display!",
    url: "https://buslailiao.com",
    siteName: "Lai Liao",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lai Liao - Singapore Bus Arrival Times",
    description:
      "Real-time Singapore bus timings. Turn your old iPad into a dedicated bus arrival display!",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lai Liao",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased no-select">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
