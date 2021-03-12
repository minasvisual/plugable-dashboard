import Vue from 'vue'
import VueFormulateExtended from 'vue-formulate-extended'
import { request } from '../services/models'

import FormulateAutocomplete from '../views/crud/formulate/autocomplete'
import FormulateWysiwyg from '../views/crud/formulate/wysiwyg'
import FormulateSwitch from '../views/crud/formulate/switch'
import FormulateCode from '../views/crud/formulate/code'
import FormulateImage from '../views/crud/formulate/image'
import FormulateTags from '../views/crud/formulate/tags'
import FormulateDynamicSelect from '../views/crud/formulate/dynamic-select'
import FormulateJson from '../views/crud/formulate/json'
import FormulateGrid from '../views/crud/formulate/grid'

Vue.component('MyFormulateAutocomplete', FormulateAutocomplete)
Vue.component('FormulateWysiwyg', FormulateWysiwyg)
Vue.component('FormulateSwitch', FormulateSwitch)
Vue.component('FormulateCode', FormulateCode)
Vue.component('FormulateImage', FormulateImage)
Vue.component('FormulateTags', FormulateTags)
Vue.component('FormulateDynamicSelect', FormulateDynamicSelect)
Vue.component('FormulateJson', FormulateJson)
Vue.component('FormulateGrid', FormulateGrid)

export default {
    library: {
      autocomplete: {
        classification: 'text',
        component: 'MyFormulateAutocomplete'
      },
      code: {
        classification: 'text',
        component: 'FormulateCode'
      },
      switch: {
        classification: 'boolean',
        component: 'FormulateSwitch'
      },
      image: {
        classification: 'text',
        component: 'FormulateImage'
      },
      json: {
        classification: 'text',
        component: 'FormulateJson'
      },
      tags: {
        classification: 'tags',
        component: 'FormulateTags',
        slotProps: {
          component: ['output']
        }
      },
      wysiwyg: {
        classification: 'textarea',
        component: 'FormulateWysiwyg'
      },
      dynamicSelect: {
        classification: 'text',
        component: 'FormulateDynamicSelect'
      },
      grid: {
        classification: 'array',
        component: 'FormulateGrid'
      }
    },
    plugins: [
      VueFormulateExtended({
        features: {
          formEvents: true, // by-default
          textMask: false, // by-default
          enforceNumber: false, // by-default
        },
      }),
    ],
}