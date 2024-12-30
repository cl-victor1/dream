import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">页面未找到</h2>
        <p className="text-muted-foreground mb-8">抱歉，您访问的页面不存在。</p>
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