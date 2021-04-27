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
import FormulateObject from '../views/crud/formulate/object'
import FormulateImageText from '../views/crud/formulate/image-text'
// Default input replacement
import FormulateSelect from '../views/crud/formulate/select'

Vue.component('MyFormulateAutocomplete', FormulateAutocomplete)
Vue.component('FormulateWysiwyg', FormulateWysiwyg)
Vue.component('FormulateSwitch', FormulateSwitch)
Vue.component('FormulateCode', FormulateCode)
Vue.component('FormulateImage', FormulateImage)
Vue.component('FormulateTags', FormulateTags)
Vue.component('FormulateDynamicSelect', FormulateDynamicSelect)
Vue.component('FormulateJson', FormulateJson)
Vue.component('FormulateGrid', FormulateGrid)
Vue.component('FormulateObject', FormulateObject)
Vue.component('FormulateImageText', FormulateImageText)
Vue.component('FormulateSelect', FormulateSelect)

export default {
    library: {
      select: {
        classification: 'select',
        component: 'FormulateSelect'
      },
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
      imageText: {
        classification: 'text',
        component: 'FormulateImageText'
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
        classification: 'select',
        component: 'FormulateSelect'
      },
      grid: {
        classification: 'array',
        component: 'FormulateGrid'
      },
      object: {
        classification: 'object',
        component: 'FormulateObject'
      }
    },
    plugins: [
      VueFormulateExtended({
        features: {
          formEvents: true, // by-default
          textMask: true, // by-default
          enforceNumber: true, // by-default
        },
      }),
    ],
}