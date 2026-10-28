import { Inter, Inter_Tight } from 'next/font/google';
import { SITE, FULL_NAME, EMAIL, SOCIALS, CONTACT } from '@/lib/content';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter-tight' });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: FULL_NAME, url: SITE.url }],
  creator: FULL_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: FULL_NAME,
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    locale: 'en_US',
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${FULL_NAME} — Front-End Developer` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  ...(SITE.googleVerification && { verification: { google: SITE.googleVerification } }),
};

export const viewport = { themeColor: '#d6cfbe' };

// structured data: tells Google this site is about a person and the services they offer
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: FULL_NAME,
      jobTitle: 'Front-End Developer',
      url: SITE.url,
      image: `${SITE.url}${SITE.ogImage}`,
      email: `mailto:${EMAIL}`,
      telephone: `+${CONTACT.whatsapp}`,
      sameAs: Object.values(SOCIALS).filter(u => u.startsWith('http')),
      knowsAbout: ['Shopify', 'WordPress', 'WooCommerce', 'Elementor', 'Webflow', 'Next.js', 'React', 'JavaScript', 'GSAP', 'Figma', 'SEO', 'Website performance'],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'National College of Business Administration and Economics (NCBAE), Lahore' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#service`,
      name: `${FULL_NAME} — Web Development`,
      url: SITE.url,
      image: `${SITE.url}${SITE.ogImage}`,
      description: SITE.description,
      founder: { '@id': `${SITE.url}/#person` },
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
      serviceType: ['Shopify development', 'WordPress development', 'Webflow development', 'Next.js development', 'Website speed optimization', 'SEO'],
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: FULL_NAME, publisher: { '@id': `${SITE.url}/#person` } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="is-loading">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
