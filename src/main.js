import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/index' // Import router

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router) // Sử dụng router
  .mount('#app')
