"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dream } from "./RecentInterpretations";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function DreamAnalyzer() {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [dreamId, setDreamId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!dream.trim()) {
      toast({
        title: "请输入梦境描述",
        description: "请详细描述您的梦境，以便我们提供更准确的解读。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setError("");
      setAnalysis("");

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dream }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '解析过程中出现错误');
      }

      const data = await response.json();
      
      if (!data.analysis) {
        throw new Error('解析结果为空');
      }

      setAnalysis(data.analysis);

      const newDreamId = Date.now().toString();
      const newDream: Dream = {
        id: parseInt(newDreamId),
        title: dream.split('\n')[0].slice(0, 20) + '...',
        excerpt: dream,
        interpretation: data.analysis,
        date: new Date().toISOString().split('T')[0],
        tags: data.tags || [],
        emotions: data.emotions || [],
        symbols: data.symbols || []
      };

      // 保存到 localStorage 以便详情页面使用
      localStorage.setItem(`dream_${newDreamId}`, JSON.stringify(newDream));
      setDreamId(newDreamId);

      // 触发事件更新最近解梦案例
      window.dispatchEvent(new CustomEvent('newDreamAnalysis', { detail: newDream }));

      toast({
        title: "解梦完成",
        description: "您的梦境已经成功解析，点击查看详细分析。",
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '解析过程中出现错误，请稍后重试';
      setError(errorMessage);
      toast({
        title: "解析失败",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="dream-analyzer" className="px-6 py-16 max-w-4xl mx-auto scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="p-6 backdrop-blur-sm bg-card/50">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">梦境分析器</h2>
          </div>
          
          <Textarea
            placeholder="请详细描述您的梦境内容..."
            className="min-h-[200px] mb-4 text-lg resize-y"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
          />
          
          <Button 
            onClick={handleAnalyze}
            className="w-full"
            size="lg"
            disabled={!dream.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在分析...
              </>
            ) : (
              "开始解析"
            )}
          </Button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {analysis && dreamId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <Card className="p-4">
                  <p className="text-muted-foreground mb-4">
                    {analysis.slice(0, 100)}...
                  </p>
                  <Button 
                    onClick={() => router.push(`/dreams/${dreamId}`)}
                    variant="secondary"
                    className="w-full"
                  >
                    查看完整解析
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </section>
  );
}