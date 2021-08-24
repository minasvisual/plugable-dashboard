<template>
  <div
    :class="`formulate-input-element formulate-input-element--${schema.type}`"
    :data-type="schema.type"
    v-if="renderComponent"
  >  
      <FormBase
        v-if="schema.type == 'form'"
        :schema="schema"
        :resource="resource"
      />  
      <Widget
        v-else-if="schema.type == 'widget'"
        :schema="schema"
      />  
      <Grid  
        v-else
        :schema="schema"
        :resource="resource"
      />  
  </div>
</template>

<script>
import { get,  has } from 'lodash'
import { mergeDeep, isRegex } from '../../../services/helpers'
import ControllerMixin from '../../../services/controller.mixin'

// import Table from '../table'
// import Form from '../formulate'
import FormBase from '../form'
import Grid from '../crud'
import Widget from '../../widgets/base'

export default {
  mixins: [ControllerMixin],
  components:{
    Grid, FormBase, Widget
  },
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
        schema: {},
        renderComponent: false, 
        resource:[]
    }
  },
  computed: {
    model:{
      get(){ 
          return this.context.model 
      },
      set(value){
        if(value)
          this.context.model = value
      }
    },
    name(){
      return this.context.name
    },
    overwrite(){
      return this.context.overwrite || {}
    },
    schemaProp(){
      return get(this.context, 'schema', get(this.context, 'attributes.schema', {}))
    },  
    isStandalone(){
      return get(this.schema, 'api.bypassGetData', false)
    },  
    formValues(){
      return this.$store.state.crud.row || {}
    }
  },
  methods: { 
    async loadSubmodel(modelPath){
      let url
      if( isRegex(modelPath, 'url') )
        url = modelPath
      else
        url = this.currentProject.resources_path + modelPath

      return await this.loadModelByUrl(url)
        .catch(err => {
          this.$message && this.$message(`Error to load submodel: ${err.message}`)
          console.error(err)
        })
    },
    async transformSchema(schema){
      schema = mergeDeep( {...schema}, {...this.overwrite} ) 
      schema = mergeDeep( {...schema}, { api: {...this.request}} ) 

      if( get(schema, 'api.bypassGetData', false) )
          this.resource = this.formValues[this.name]
      else if( has(schema, 'api.resource') )
          this.resource = get(schema, 'api.resource')
      else
          this.resource = this.formValues

      schema.api.resource = this.resource
          
      return schema
    }
  },
  async mounted(){
    this.renderComponent = false

    if( typeof this.schemaProp == 'string' ){ 
      var loadedSchema = await this.loadSubmodel(this.schemaProp) 
      //loadedSchema = mergeDeep(loadedSchema, {...this.overwrite})

      this.schema = await this.transformSchema( loadedSchema ) 
    }else{
      let loadedSchema = await this.transformSchema( this.schemaProp) 
      this.schema = mergeDeep({ ...loadedSchema }, {...this.overwrite}) 
      console.debug("Carregou mouted", loadedSchema, this.schema)
    }

    // if( this.schema.type == 'form' )
    //   await this.loadForm()

    this.renderComponent = true
  }
}
</script>
