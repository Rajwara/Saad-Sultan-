import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter-tight' });

export const metadata = {
  title: 'Saad Sultan — Front-End Developer',
  description: 'Saad Sultan is a front-end developer building responsive websites and online stores with Shopify, WordPress, Webflow and React.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}
