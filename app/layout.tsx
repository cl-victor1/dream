import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '梦境解读 - 探索你的潜意识世界',
  description: '专业的在线梦境解读平台，通过AI技术为您提供个性化的梦境分析和解读服务。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}