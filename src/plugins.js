import Vue from 'vue'
import VueFormulateExtended from 'vue-formulate-extended'
import IMask from 'imask'

import { formatDate } from './services/helpers'

import FormulateAutocomplete from './views/crud/formulate/autocomplete'
import FormulateWysiwyg from './views/crud/formulate/wysiwyg'
import FormulateSwitch from './views/crud/formulate/switch'
import FormulateCode from './views/crud/formulate/code'
import FormulateImage from './views/crud/formulate/image'
import FormulateTags from './views/crud/formulate/tags'
import FormulateDynamicSelect from './views/crud/formulate/dynamic-select'
import FormulateJson from './views/crud/formulate/json'
import FormulateObject from './views/crud/formulate/object'
import FormulateImageText from './views/crud/formulate/image-text'
import FormulateGrid from './views/crud/formulate/grid'
// Default input replacement
import FormulateSelect from './views/crud/formulate/select'

// Global components
import Widget from './views/crud/layouts/WidgetInput'
import Wizard from './views/crud/layouts/WizardInput'
import ImagePreview from './views/crud/layouts/ImagePreview'
import Placeholder from './views/crud/layouts/Placeholder'
import Tabs from './views/crud/formulate/tabs'

Vue.component('Crud', FormulateGrid)
Vue.component('Widget', Widget)
Vue.component('Wizard', Wizard)
Vue.component('ImagePreview', ImagePreview)
Vue.component('Place', Placeholder)
Vue.component('Tabs', Tabs)

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

// Our first plugin
function TypesHookPlugin (instance) {
  // Add a new validation rule

  instance.extend({
    hooks: {
      // schema:[
      //   {
      //     handler(data, data1) {
      //       console.log(data, data1)


      //       return data
      //     }
      //   }
      // ],
      model: [
        //INPUT format
        {
          handler(value, { context = {} }) {
            if( context.type == 'switch' )
              return value === true
            if( value && context.type.includes('date') && value.includes('Z') ){ 
              let format = ( context.type == 'date' ? 'YYYY-MM-DD': 'YYYY-MM-DD\\Thh:mm:ss' )
              console.log('entreou em data')
              return formatDate(value, format, null, (context.attributes.utc || true))
            } 
            return value
          }
        },
        // masks 
        {
          handler(value, { context }) {
            const hasMask = 'masks' in context.attributes || 'masks' in context.attributes
            if (context.classification === 'text' && hasMask) {
              const options = context.attributes['masks'] || context.attributes.masks
              const maskOptions = typeof options === 'object' && options.mask ? options : { mask: options }
              const masked = IMask.createMask(maskOptions)
              const resolved = masked.resolve(value)
              return resolved
            } else {
              return value
            }
          },
        },
      ]
    }
  })
}

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
        component: 'Crud'
      },
      object: {
        classification: 'object',
        component: 'FormulateObject'
      }
    },
    plugins: [
      TypesHookPlugin ,
      // VueFormulateExtended({
      //   features: {
      //     formEvents: true, // by-default
      //     textMask: true, // by-default
      //     enforceNumber: true, // by-default
      //   },
      // }),
    ],
}