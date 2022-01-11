import Vue from 'vue'
import App from './App.vue'
import './main.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
