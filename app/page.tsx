import { Metadata } from "next";
import DreamAnalyzer from '@/components/DreamAnalyzer';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import RecentInterpretations from '@/components/RecentInterpretations';

export const metadata: Metadata = {
  title: '梦境解读 - 探索你的潜意识世界',
  description: '专业的在线梦境解读平台，通过AI技术为您提供个性化的梦境分析和解读服务。发现梦境背后的深层含义。',
  keywords: '梦境解读,解梦,AI解梦,梦境分析,潜意识探索,心理分析,个性化解梦',
  openGraph: {
    title: '梦境解读 - 探索你的潜意识世界',
    description: '专业的在线梦境解读平台，通过AI技术为您提供个性化的梦境分析和解读服务。',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Hero />
      <DreamAnalyzer />
      <Features />
      <RecentInterpretations />
    </main>
  );
}