"use client";

import { Card } from "@/components/ui/card";
import { Brain, History, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI智能解析",
    description: "运用先进的人工智能技术，提供准确、深入的梦境分析"
  },
  {
    icon: History,
    title: "历史记录",
    description: "记录并追踪您的梦境模式，发现潜在的规律"
  },
  {
    icon: Lock,
    title: "隐私保护",
    description: "严格的数据加密和隐私保护措施，确保您的梦境内容安全"
  },
  {
    icon: Sparkles,
    title: "个性化推荐",
    description: "基于您的梦境特点，提供定制化的解读和建议"
  }
];

export default function Features() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">为什么选择我们？</h2>
          <p className="text-muted-foreground">
            专业的梦境解读服务，帮助您探索潜意识的奥秘
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-colors">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}