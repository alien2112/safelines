import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { Playpen_Sans } from 'next/font/google';
import { LanguageProvider } from './contexts/LanguageContext';

const playpen = Playpen_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-playpen' });

export const metadata: Metadata = {
  title: 'Safe Lines Customs Clearance',
  description: 'Modern logistics & freight services website',
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
      <body>
        <LoadingScreen />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}


