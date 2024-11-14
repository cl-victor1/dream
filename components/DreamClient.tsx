"use client";

import { useEffect, useState } from "react";
import type { Dream } from "@/components/RecentInterpretations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";

export default function DreamClient({ id }: { id: string }) {
  const [dream, setDream] = useState<Dream | null>(null);

  useEffect(() => {
    const dreamData = localStorage.getItem(`dream_${id}`);
    if (dreamData) {
      setDream(JSON.parse(dreamData));
    }
  }, [id]);

  if (!dream) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">未找到梦境解读</h1>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 backdrop-blur-sm bg-card/50">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{dream.title}</h1>
              <span className="text-muted-foreground">{formatDate(dream.date)}</span>
            </div>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">梦境内容</h2>
              <p className="text-muted-foreground mb-6">{dream.excerpt}</p>

              <h2 className="text-xl font-semibold mb-4">详细解析</h2>
              <p className="mb-6">{dream.interpretation}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">主要象征</h3>
                  <div className="flex flex-wrap gap-2">
                    {dream.symbols?.map((symbol) => (
                      <Badge key={symbol} variant="outline">{symbol}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">情感解读</h3>
                  <div className="flex flex-wrap gap-2">
                    {dream.emotions?.map((emotion) => (
                      <Badge key={emotion} variant="secondary">{emotion}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">关键主题</h3>
                <div className="flex flex-wrap gap-2">
                  {dream.tags?.map((tag) => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}