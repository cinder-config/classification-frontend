export default {
  ssr: false,
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios'],
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
