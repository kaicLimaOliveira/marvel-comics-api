export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [,
  ],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.css',
  ],
  runtimeConfig: {
    public: {
      marvelPrivateKey: process.env.NUXT_MARVEL_PRIVATE_KEY,
      marvelPublicKey: process.env.NUXT_MARVEL_PUBLIC_KEY,
    },
  }
})
