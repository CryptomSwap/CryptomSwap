import './globals.css';

export const metadata = {
  title: 'PEEPZ',
  description: 'Exclusivity at your fingertips',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text min-h-screen">{children}</body>
    </html>
  );
} 