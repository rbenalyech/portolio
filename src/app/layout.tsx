import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Riyad Benalyech — Cybersecurity, Systems & Networks',
  description: 'IT student specializing in Cybersecurity, Systems Administration, Networks and Digital Consulting. Explore my projects, skills and technical journey.',
  keywords: ['cybersecurity', 'systems administration', 'networking', 'IT infrastructure', 'VMware', 'portfolio', 'Riyad Benalyech'],
  authors: [{ name: 'Riyad Benalyech' }],
  creator: 'Riyad Benalyech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rbenalyech.github.io',
    title: 'Riyad Benalyech — Cybersecurity, Systems & Networks',
    description: 'IT student specializing in Cybersecurity, Systems Administration, Networks and Digital Consulting.',
    siteName: 'Riyad Benalyech Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riyad Benalyech — Cybersecurity, Systems & Networks',
    description: 'IT student specializing in Cybersecurity, Systems Administration, Networks and Digital Consulting.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
