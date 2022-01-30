import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const vueApp = createApp({
  render: () => h(App)
})

vueApp.use(router)
vueApp.use(store)
vueApp.mount('#app')
