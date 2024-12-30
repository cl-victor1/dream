import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // 配置支持的语言
  locales: ['en', 'zh'],
  // 默认语言
  defaultLocale: 'en',
  // 总是显示语言前缀
  localePrefix: 'always'
});
 
export const config = {
  // 匹配所有路径，除了api、静态文件等
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};