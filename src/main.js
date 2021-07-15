import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store' 
import { formatDate } from './services/helpers'
 
import "../node_modules/@braid/vue-formulate/dist/snow.min.css";
import VueFormulate from '@braid/vue-formulate'
import FormulateConfig  from './services/formulateConfig'
import VJsoneditor from 'v-jsoneditor'
import VueQuill from 'vue-quill'
import DashPlugin from './services/plugin'
import VueCompositionAPI from '@vue/composition-api'


Vue.config.performance = true


Vue.use(VueCompositionAPI)
Vue.use(VueQuill) 
Vue.use(CoreuiVue) 
Vue.use(DashPlugin) 

Vue.use(VJsoneditor)
Vue.filter('formatDate', formatDate)
// register your component with Vue

Vue.use(VueFormulate, FormulateConfig)


Vue.prototype.$log = console.log.bind(console) 

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
