import { Metadata } from "next";
import DreamAnalyzer from '@/components/DreamAnalyzer';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import RecentInterpretations from '@/components/RecentInterpretations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string }
};

export const metadata: Metadata = {
  title: '梦境解读 - 探索你的潜意识世界',
  description: '专业的在线梦境解读平台，通过AI技术为您提供个性化的梦境分析和解读服务。',
};

export default function Home({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <LanguageSwitcher />
      <Hero />
      <DreamAnalyzer />
      <Features />
      <RecentInterpretations />
    </main>
  );
}