import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
