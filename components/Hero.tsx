"use client";

import { Button } from "@/components/ui/button";
import { MoonStar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg
          className="h-full w-full"
          viewBox="0 0 1097 845"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1097 845H0V0L1097 845Z"
            fill="url(#paint0_radial_1_2)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(548.5 422.5) rotate(90) scale(422.5 548.5)"
            >
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--background))" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MoonStar className="mx-auto h-16 w-16 text-primary mb-8" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {t('title')}
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-8">
            {t('description')}
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="#dream-analyzer">
                <Sparkles className="h-4 w-4" />
                {t('startButton')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                {t('learnMore')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}