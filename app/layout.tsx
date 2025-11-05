import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Navbar } from './components/Navbar';
// import { LoadingScreen } from './components/LoadingScreen';
import { PageLoader } from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import { Playpen_Sans, Tajawal } from 'next/font/google';
import { LanguageProvider } from './contexts/LanguageContext';

const playpen = Playpen_Sans({ 
  subsets: ['latin'], 
  weight: ['400','600','700'], 
  variable: '--font-playpen',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif']
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0B1B3B',
};

export const metadata: Metadata = {
  title: {
    default: 'Safe Lines Customs Clearance - Professional Logistics & Freight Services',
    template: '%s | Safe Lines Customs Clearance'
  },
  description: 'Safe Lines offers comprehensive customs clearance, logistics, and freight forwarding services. Expert handling of international shipments with reliable, efficient solutions for your business needs.',
  keywords: ['customs clearance', 'logistics', 'freight services', 'shipping', 'cargo', 'international trade', 'supply chain'],
  authors: [{ name: 'Safe Lines Customs Clearance' }],
  creator: 'Safe Lines Customs Clearance',
  publisher: 'Safe Lines Customs Clearance',
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
      { url: '/safelines-logo.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: ['/safelines-logo.png'],
    apple: [
      { url: '/safelines-logo.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    url: 'https://safelines.com',
    siteName: 'Safe Lines Customs Clearance',
    title: 'Safe Lines Customs Clearance - Professional Logistics & Freight Services',
    description: 'Expert customs clearance, logistics, and freight forwarding services for international shipments.',
    images: [
      {
        url: '/hero-banner.webp',
        width: 1200,
        height: 630,
        alt: 'Safe Lines Customs Clearance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safe Lines Customs Clearance - Professional Logistics & Freight Services',
    description: 'Expert customs clearance, logistics, and freight forwarding services.',
    images: ['/hero-banner.webp'],
  },
  alternates: {
    canonical: 'https://safelines.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playpen.variable} ${tajawal.variable}`}>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/hero-banner.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/safelines-logo.png" 
          as="image" 
          type="image/png"
        />
      </head>
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {/* <LoadingScreen /> */}
        <PageLoader />
        <LanguageProvider>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}


