import './globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { cn } from '@/shared/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: '꼬박약',
  description: '복약 관리 PWA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn('font-sans', geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
