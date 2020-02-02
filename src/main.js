import Vue from 'vue'
import App from './App.vue'
import router from './selfRouter'
// import router from './krouter'
// import router from './router'
import store from './selfStore'
// import store from './kstore'
// import store from './store'

Vue.config.productionTip = false

new Vue({
  // Vue.prototype.$router = router
  router,
  store,
  render: h => h(App)
}).$mount('#app')
