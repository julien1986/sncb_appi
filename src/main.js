import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuelidate from 'vuelidate'
import Store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import date from '@/filters/date'

Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.use(Store)

Vue.config.productionTip = false

new Vue({
  router,
  Store,
  render: h => h(App),
  data: {
    favoris: false
  },
  filters: {
    date: date
  },
  created() {
    if (localStorage.favoris) {
      this.favoris = true

    }
  }

}).$mount('#app')