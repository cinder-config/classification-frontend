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
      solid: ['faSpinner', 'faCheck', 'faTimes', 'faCogs', 'faShare'],
    }
  },
  plugins: [
    {src: '~/plugins/local-storage.js', ssr: false},
  ]
}
