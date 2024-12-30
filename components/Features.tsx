"use client";

import { Card } from "@/components/ui/card";
import { Brain, History, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Brain,
      title: t('aiAnalysis.title'),
      description: t('aiAnalysis.description')
    },
    {
      icon: History,
      title: t('history.title'),
      description: t('history.description')
    },
    {
      icon: Lock,
      title: t('privacy.title'),
      description: t('privacy.description')
    },
    {
      icon: Sparkles,
      title: t('personalization.title'),
      description: t('personalization.description')
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground">
            {t('description')}
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