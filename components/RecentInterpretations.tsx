"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export type Dream = {
  id: number;
  title: string;
  excerpt: string;
  interpretation: string;
  date: string;
  tags: string[];
  emotions: string[];
  symbols: string[];
};

const recentDreams: Dream[] = [
  {
    id: 1,
    title: "飞翔的梦",
    excerpt: "梦见自己在广阔的蓝天上自由飞翔，俯瞰城市和山川，感觉无比轻松和自由。途中遇到一群白鸽，它们与我一同翱翔...",
    interpretation: "飞翔象征着对自由的渴望和突破现实限制的愿望。白鸽代表和平与希望，暗示你正在寻求内心的平静。这个梦反映了你渴望摆脱当前的束缚，追求更广阔的人生视野。",
    date: "2024-03-20",
    tags: ["自由", "突破", "希望"],
    emotions: ["轻松", "愉悦", "向往"],
    symbols: ["天空", "白鸽", "飞翔"]
  },
  {
    id: 2,
    title: "海底探险梦",
    excerpt: "梦见潜入深海，周围是五彩斑斓的珊瑚和游动的鱼群。在一座神秘的水下宫殿里，发现了一颗发光的珍珠...",
    interpretation: "深海代表潜意识和内心世界，珊瑚和鱼群象征丰富的情感和想象力。发光珍珠暗示你即将发现自己的内在价值，水下宫殿则预示着精神世界的探索之旅。",
    date: "2024-03-19",
    tags: ["探索", "发现", "神秘"],
    emotions: ["好奇", "惊奇", "平静"],
    symbols: ["海洋", "珍珠", "宫殿"]
  },
  {
    id: 3,
    title: "古老森林梦",
    excerpt: "梦中漫步在一片古老的森林，巨大的树木散发着神秘的光芒。遇见一只会说话的白狐，它引导我找到一本古老的书籍...",
    interpretation: "森林象征着生命的智慧和神秘，白狐作为向导代表直觉和智慧的指引。古书暗示着你将获得重要的知识或领悟，这个梦展现了精神成长的过程。",
    date: "2024-03-18",
    tags: ["智慧", "指引", "成长"],
    emotions: ["敬畏", "专注", "期待"],
    symbols: ["森林", "白狐", "古书"]
  },
  {
    id: 4,
    title: "星空对话梦",
    excerpt: "梦见躺在草地上仰望繁星，突然能够听懂星星们的交谈。它们讲述着宇宙的故事，分享着远古的智慧...",
    interpretation: "星空象征着更高的意识和宇宙智慧，能听懂星星说话暗示着你正在开启更深层的精神觉知。这个梦反映了你对宇宙真理的追求和对自我提升的渴望。",
    date: "2024-03-17",
    tags: ["觉知", "宇宙", "智慧"],
    emotions: ["宁静", "启发", "敬畏"],
    symbols: ["星星", "夜空", "对话"]
  }
  // ... 其他梦境案例保持不变
];

export default function RecentInterpretations() {
  const [dreams, setDreams] = useState(recentDreams);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && !isTransitioning) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.dream-card')?.clientWidth || 0;
      const gap = 24; // gap-6 equals 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      
      let newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount);
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // 处理循环滚动
      if (newPosition < 0) {
        newPosition = maxScroll;
        container.scrollLeft = 0;
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
          container.scrollLeft = maxScroll;
        }, 0);
      } else if (newPosition > maxScroll) {
        newPosition = 0;
        container.scrollLeft = maxScroll;
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
          container.scrollLeft = 0;
        }, 0);
      } else {
        container.style.scrollBehavior = 'smooth';
        container.scrollLeft = newPosition;
      }
      
      setScrollPosition(newPosition);
    }
  };

  // 自动滚动
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoScrollEnabled && !isTransitioning) {
      intervalId = setInterval(() => {
        handleScroll('right');
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [autoScrollEnabled, scrollPosition, isTransitioning]);

  // 监听新的解梦案例
  useEffect(() => {
    const handleNewDream = (event: CustomEvent<Dream>) => {
      const newDream = event.detail;
      setDreams(prevDreams => [newDream, ...prevDreams]);
    };

    window.addEventListener('newDreamAnalysis', handleNewDream as EventListener);
    return () => {
      window.removeEventListener('newDreamAnalysis', handleNewDream as EventListener);
    };
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">最近的解梦案例</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
          >
            {autoScrollEnabled ? "暂停自动滚动" : "开启自动滚动"}
          </Button>
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseEnter={() => setAutoScrollEnabled(false)}
            onMouseLeave={() => setAutoScrollEnabled(true)}
          >
            {dreams.map((dream, index) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="dream-card min-w-[300px] sm:min-w-[400px]"
              >
                <Card className="p-6 h-full backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{dream.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(dream.date)}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{dream.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dream.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">情感:</span>
                      {dream.emotions.map(emotion => (
                        <span key={emotion} className="text-sm text-muted-foreground">
                          {emotion}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">象征:</span>
                      {dream.symbols.map(symbol => (
                        <span key={symbol} className="text-sm text-muted-foreground">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-medium">解读：{dream.interpretation}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}