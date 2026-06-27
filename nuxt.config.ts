export default defineNuxtConfig({
<<<<<<< HEAD
  css: ['~/public/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
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

=======
  css: ['~/public/css/main.css']
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
})