// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e0e8f5',
      100: '#c1d0ec',
      200: '#a2b9e3',
      300: '#739ed5',
      400: '#4e86cb',
      500: '#0055A4',
      600: '#004a93',
      700: '#004082',
      800: '#003671',
      900: '#002a59',
      950: '#00173b'
    }
  }
});

export default defineNuxtConfig({
  site: { indexable: false },
  robots: {
    disallow: '*',
  },
  compatibilityDate: '2024-09-26',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiEntreprises: process.env.NUXT_API_ENTREPRISES_GOUV
    }
  },  
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxt/content'
  ],
  primevue: {
    options: {
        ripple: true,
        theme: {
            preset: MyPreset
        }
    }
  },
  tailwindcss: {
    configPath: '~/tailwind.mjs'
  },
})