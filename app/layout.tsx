import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from './providers';
import { SEO_CONFIG } from './seo.config';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { CookieConsent } from '@/components/CookieConsent';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: SEO_CONFIG.author, url: SEO_CONFIG.authorUrl }],
  creator: SEO_CONFIG.author,
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.url,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.ogImage],
    creator: SEO_CONFIG.twitter,
  },
  icons: {
    icon: SEO_CONFIG.favicon,
    shortcut: SEO_CONFIG.favicon,
    apple: SEO_CONFIG.appleIcon,
  },
  manifest: SEO_CONFIG.manifest,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href={SEO_CONFIG.url} />
        <link rel="icon" href={SEO_CONFIG.favicon} />
        <link rel="apple-touch-icon" href={SEO_CONFIG.appleIcon} />
        <link rel="manifest" href={SEO_CONFIG.manifest} />
      </head>
      <body className={inter.className + ' bg-white text-gray-900'}>
        <Providers>
          <GoogleAnalytics />
          <CookieConsent />
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
