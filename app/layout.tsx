import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from './components/Navbar';
import { Playpen_Sans } from 'next/font/google';

const playpen = Playpen_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-playpen' });

export const metadata: Metadata = {
  title: 'Safe Liens Customs Clearance',
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}


