import redirectSSL from 'redirect-ssl'

export default {
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:8000'
  },
  ssr: false,
  modules: ['bootstrap-vue/nuxt'],
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  components: true,
  fontawesome: {
    icons: {
      solid: ['faSpinner', 'faCheck', 'faTimes', 'faCogs', 'faShare', 'faInfoCircle', 'faThumbsUp'],
    }
  },
  plugins: [
    {src: '~/plugins/local-storage.js', ssr: false},
  ],
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
    }),
  ]
}
