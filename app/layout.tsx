import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Marswin Precision Tools | CNC Precision Cutting Tools in Coimbatore',
    template: '%s | Marswin Precision Tools',
  },
  description:
    'Marswin Precision Tools provides CNC precision cutting tools, End Mills, Drills, Port Cutters, Reamers, tool grinding, regrinding, and custom tooling solutions in Coimbatore, Tamil Nadu.',
  keywords: [
    'CNC Precision Cutting Tools',
    'CNC Tool Manufacturing',
    'Tool Regrinding Coimbatore',
    'End Mills',
    'Carbide Drills',
    'Port Cutters',
    'Reamers',
    '5-Axis CNC Tool Grinding',
    'Coimbatore Tool Manufacturers',
  ],
  authors: [{ name: 'Marswin Precision Tools' }],
  creator: 'Marswin Precision Tools',
  publisher: 'Marswin Precision Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Marswin Precision Tools | CNC Precision Cutting Tools in Coimbatore',
    description:
      'Precision tooling solutions manufactured with accuracy, consistency, and engineering excellence. End Mills, Drills, Port Cutters, Reamers & Regrinding.',
    url: 'https://marswinprecisiontools.in',
    siteName: 'Marswin Precision Tools',
    images: [
      {
        url: '/images/hero/cnc-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Marswin Precision CNC Cutting Tools',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marswin Precision Tools | CNC Precision Cutting Tools',
    description:
      'Advanced CNC precision tooling solutions manufactured with accuracy, consistency, and engineering excellence in Coimbatore.',
    images: ['/images/hero/cnc-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    name: 'Marswin Precision Tools',
    image: 'https://marswinprecisiontools.in/images/hero/cnc-hero.jpg',
    '@id': 'https://marswinprecisiontools.in',
    url: 'https://marswinprecisiontools.in',
    telephone: '+91 96555 05586',
    email: 'info@marswinprecisiontools.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '11.0668',
      longitude: '76.9930',
    },
    description:
      'Marswin Precision Tools provides CNC precision cutting tools, End Mills, Drills, Port Cutters, Reamers, tool grinding, regrinding, and custom tooling solutions in Coimbatore.',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '19:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#071A2B] text-gray-100 antialiased selection:bg-[#1677FF] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
