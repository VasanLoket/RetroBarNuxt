export default defineNuxtConfig({
  css: ['~/public/css/main.css'],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
/*
  routeRules: {
   '/': {
     prerender: true,
   },
   '/products/**': {
     swr: 3600,
   },
   '/blog': {
     isr: 3600,
   },
   '/admin/**': {
     ssr: false,
   },
 },
*/
  app: {
    baseURL: '/RetroBarNuxt/', 
  },
  nitro: {
    preset: 'github_pages', 
    prerender: {
      routes: ['/'], 
    },
  },
   routeRules: {
    '/**': { prerender: true }, // Все страницы будут статическими[reference:2]
  },

/*
  nitro: {
    routeRules: {
      // Главная — статическая (генерируется при сборке)
      '/': { prerender: true },
      
      // Страницы, которые редко меняются — SWR-кеш на 1 час
      '/menu': { swr: 3600 },
      '/account': { swr: 3600 },
      
      // Страницы с динамическими данными (бронирование, корзина) — SSR без кеша
      '/booking': { ssr: true },
      '/cart': { ssr: true },
      '/payment': { ssr: true },
      
      // API-маршруты — без кеша
      '/api/**': { cors: true },
    }
  },
  */

  modules: ['@nuxtjs/ngrok'],
  ngrok: {
    authtoken_from_env: true,
  },
  
})