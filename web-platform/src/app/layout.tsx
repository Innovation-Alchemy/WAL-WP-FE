import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RiveNavBar } from '@/rive-components/navBar';
import Footer from '@/components/footer';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'We Are Lebanon',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative lg:flex lg:flex-col">
          <div className="absolute top-0 left-0 w-full z-50">
            <RiveNavBar />
          </div>
          <main className="lg:flex-grow lg:overflow-hidden">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
