import './globals.css';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://bayv.com'),
  title: {
    default: 'BayV - Premium Gaming Accessories',
    template: '%s | BayV',
  },
  description: 'Discover premium gaming accessories, controllers, headsets, keyboards, and more. Level up your gaming experience with top-quality gear.',
  keywords: ['gaming accessories', 'gaming keyboard', 'gaming mouse', 'gaming headset', 'controller', 'RGB', 'esports', 'gaming gear', 'PC gaming'],
  authors: [{ name: 'BayV' }],
  openGraph: {
    title: 'BayV - Premium Gaming Accessories',
    description: 'Level up your gaming with premium accessories. Controllers, headsets, keyboards & more.',
    url: 'https://bayv.com',
    siteName: 'BayV',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BayV - Premium Gaming Accessories',
    description: 'Level up your gaming with premium accessories.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0f0f1a] text-gray-100`}>
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
