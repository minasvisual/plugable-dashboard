import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store' 
import VueQuill from 'vue-quill'
import { formatDate } from './services/helpers'

// ...
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDataTables from 'vue-data-tables'

import VueFormulate from '@braid/vue-formulate'
import FormulateConfig  from './services/formulateConfig'
import "../node_modules/@braid/vue-formulate/dist/snow.min.css";
import VJsoneditor from 'v-jsoneditor'

import Crud from './views/crud/formulate/grid'
 

// set language to EN
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.performance = true


Vue.component('Crud', Crud)


Vue.use(VueQuill)
Vue.use(ElementUI, { locale })
Vue.use(CoreuiVue)
Vue.use(VueDataTables) 

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
