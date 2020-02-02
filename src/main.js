import Vue from 'vue'
import App from './App.vue'
import router from './selfRouter'
import store from './store'
// import router from './krouter'
// import router from './router'

Vue.config.productionTip = false

new Vue({
  // Vue.prototype.$router = router
  router,

  store,
  render: h => h(App)
}).$mount('#app')
