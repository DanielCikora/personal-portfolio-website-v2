import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
 applicationName: 'Daniel Cikora Portfolio',
 authors: [{ name: 'Daniel Cikora', url: 'https://danielcikora.vercel.app' }],
 title: 'Daniel Cikora | Frontend Developer',
 metadataBase: new URL("https://danielcikora.vercel.app"),
 description:
  'Hi, Im Daniel Cikora, a Frontend Developer specializing in React, Next.js, and Tailwind. Check out my projects and skills here.',
 keywords: ['Daniel Cikora', 'Frontend Developer', 'React', 'Next.js', 'Tailwind', 'Portfolio'],
 creator: 'Daniel Cikora',
 icons: [
  { rel: 'icon', url: '/icons/logo/dc-logo-white.ico' },
  { rel: 'apple-touch-icon', url: '/icons/logo/dc-logo-white.ico' },
 ],
 openGraph: {
  title: 'Daniel Cikora | Frontend Developer',
  description:
   "Hi, I'm Daniel Cikora, a Frontend Developer specializing in React, Next.js, and Tailwind. Check out my projects and skills here.",
  url: 'https://your-portfolio-link.com',
  siteName: 'Daniel Cikora Portfolio',
  images: [
   {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Daniel Cikora Portfolio',
   },
  ],
  type: 'website',
 },
 twitter: {
  card: 'summary_large_image',
  title: 'Daniel Cikora | Frontend Developer',
  description: 'Hi, I’m Daniel Cikora, a Frontend Developer specializing in React, Next.js, and Tailwind.',
  images: ['/og-image.png'],
  creator: '@YourTwitterHandle',
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang='en'>
   <body className='bg-black text-main'>{children}</body>
  </html>
 );
}
