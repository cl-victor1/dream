"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      className="fixed top-4 right-4 z-50"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        Switch to {locale === 'en' ? '中文' : 'English'}
      </span>
    </Button>
  );
}