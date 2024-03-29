import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './Vuex/store'

Vue.config.productionTip = true

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
