// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).use(store).mount('#app')


import Vue from "vue"
import App from './App.vue'
import store from './store/index.js'

new Vue ({
  el: "#app",
  store,
  render: h => h(App)
})
