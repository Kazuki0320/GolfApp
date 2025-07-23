import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './Vuex/store'
import { loadFirebaseModules } from './firebase/firebase'

Vue.config.productionTip = true

async function initApp() {
  // プロダクション環境の場合、Firebaseモジュールを遅延ロード
  if (import.meta.env.PROD) {
    await loadFirebaseModules();
  }

  new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}

initApp();
