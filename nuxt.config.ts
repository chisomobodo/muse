import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      spotifyClientID: 'bdb3b1e8bde74aa19a2429213693b557',
      spotifyClientSecret: '6493930f9bb642898f542a9c536cb9dc',
      redirectUri: 'https://muse-puce.vercel.app/callback',
    }
  },
  plugins: [
  { src: '~/plugins/myplugin.ts', mode: 'client' }
]
  // runtimeConfig: {
  //   // Public keys that are exposed to the client
  //   public: {
  //     apiBase: 'https://accounts.spotify.com/'
  //   }
  // },
  // modules: [
  //   // Other modules...

  //   // Custom module to set runtime config
  //   // Make sure to create this module file (e.g., modules/apiConfig.js)
  //   '~/modules/apiConfig'
  // ]
})
