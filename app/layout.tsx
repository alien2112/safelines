import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from './components/Navbar';
// import { LoadingScreen } from './components/LoadingScreen';
import { PageLoader } from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import { Playpen_Sans } from 'next/font/google';
import { LanguageProvider } from './contexts/LanguageContext';

const playpen = Playpen_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-playpen' });

export const metadata: Metadata = {
  title: 'Safe Lines Customs Clearance - Professional Logistics & Freight Services',
  description: 'Safe Lines provides comprehensive customs clearance, transportation, and logistics services. Expert freight forwarding, warehousing, and supply chain solutions for businesses worldwide.',
  keywords: ['customs clearance', 'logistics', 'freight services', 'transportation', 'supply chain', 'warehousing', 'cargo services'],
  authors: [{ name: 'Safe Lines' }],
  creator: 'Safe Lines',
  publisher: 'Safe Lines',
  metadataBase: new URL('https://safelines.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Safe Lines Customs Clearance - Professional Logistics Services',
    description: 'Expert customs clearance, transportation, and logistics solutions for your business.',
    url: 'https://safelines.vercel.app',
    siteName: 'Safe Lines',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safe Lines Customs Clearance',
    description: 'Professional logistics & freight services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/safelines-logo.png', type: 'image/png' },
    ],
    shortcut: ['/safelines-logo.png'],
    apple: ['/safelines-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playpen.variable}>
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.app" />
      </head>
      <body>
        {/* <LoadingScreen /> */}
        <PageLoader />
        <LanguageProvider>
          <Navbar />
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}


