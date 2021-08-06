<template >
  <Loading target="widgetInput" :show="renderComponent === false">
    <p v-if="error" class="text-center">{{ error }}</p>  
    <Base v-if="renderComponent" :schema="schema" :resources="resources" /> 
  </Loading>
</template>

<script>
import { get } from 'lodash'
import { mergeDeep, isRegex } from '../../../services/helpers'
import { loadModel } from '../../../services/models'
import InputMixin from '../../../services/input.mixin'

import Base from '../../widgets/base.vue'
import Loading from '../../../containers/Loading.vue' 

export default {
  name: "WidgetInput",
  mixins:[InputMixin],
  components:{
    Base, Loading
  },
  props:{
      context:{
          type: Object,
          default: () => ({})
      }
  },
  data() {
    return {
      error: null,
      schema:{},
      resources: null,
      renderComponent: false,
      loadingInput: false,
    }
  },
  computed:{ 
    schemaProp(){
      return get(this.context, 'schema', get(this.context, 'attributes.schema', {}))
    },  
  },
  methods:{ 
  },
  async mounted(){
    this.renderComponent = false

    if( typeof this.schemaProp == 'string' ){ 
      let url = ''
      if( isRegex(this.schemaProp, 'url') )
        url = this.schemaProp
      else
        url = this.currentProject.resources_path + this.schemaProp
      var loadedSchema = await loadModel( url)
      loadedSchema = mergeDeep(loadedSchema, this.context.overwrite)
 
      this.schema = this.transformSchema( loadedSchema ) 
    }else{
      this.schema = mergeDeep(this.transformSchema( this.schemaProp ), this.context.overwrite) 
    }
    
    if( this.context.data === true && this.formValues )
      this.resources = this.formValues
    else if( typeof this.context.data == "string" && this.formValues )
      this.resources = this.formValues[ this.context.data ]

    if( this.schema.type !== 'widget' ){
      this.error = "Schema isn't a widget"
    }

    this.renderComponent = true
  }
}
</script>