import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.scss';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Lendsqr Admin',
  description: 'Lendsqr Frontend Engineering Assessment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
