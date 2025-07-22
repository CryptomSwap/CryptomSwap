import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PEEPZ',
  description: 'Exclusivity at your fingertips',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + ' bg-background text-text min-h-screen'}>{children}</body>
    </html>
  );
} 