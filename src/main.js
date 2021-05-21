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

import Crud from './views/crud/formulate/grid'

Vue.config.performance = true


Vue.component('Crud', Crud)

Vue.use(VueQuill) 
Vue.use(CoreuiVue) 

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
