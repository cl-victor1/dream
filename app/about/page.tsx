import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Sparkles, Users, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: '解梦的科学原理 | 探索梦境的奥秘',
  description: '深入了解现代解梦方法、潜意识分析和梦境象征意义。基于心理学和人工智能的专业梦境解读原理解析。',
  keywords: '解梦原理,梦境分析,潜意识,心理学,人工智能解梦,梦境象征,荣格理论',
  openGraph: {
    title: '解梦的科学原理 | 探索梦境的奥秘',
    description: '深入了解现代解梦方法、潜意识分析和梦境象征意义。基于心理学和人工智能的专业梦境解读原理解析。',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">解梦的科学原理</h1>
        
        <div className="space-y-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">潜意识的窗口</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              梦境被认为是通往潜意识的窗口。在睡眠状态下，我们的大脑会处理日常经历、情感和深层思维，
              这些内容往往以象征性的方式在梦中呈现。通过解析这些象征，我们可以更好地理解自己的内心世界。
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">现代解梦方法</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              现代解梦综合了心理学、神经科学和人工智能技术。我们的AI系统经过大量梦境案例的训练，
              能够识别梦境中的共同模式和个人特定的象征意义，从而提供更准确的解读。
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">个性化分析</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              每个人的梦境都是独特的，受个人经历、文化背景和当前生活状况的影响。
              我们的系统会考虑这些个人因素，提供更有针对性的解读，帮助您更好地理解梦境传达的信息。
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">集体潜意识</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              荣格提出的集体潜意识理论认为，某些梦境象征是人类共同的心理遗产。
              我们的系统能够识别这些普遍性的象征，同时也注意到它们在不同文化背景下的特定含义。
            </p>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}