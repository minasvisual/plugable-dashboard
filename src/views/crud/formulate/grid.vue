<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
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
import { get,  merge } from 'lodash'
import { mergeDeep } from '../../../services/helpers'
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
       let url = this.currentProject.resources_path + modelPath
      return await this.loadModelByUrl(url)
        .catch(err => this.$message && this.$message(`Error to load submodel: ${err.message}`))
    },
    transformSchema(schema){
      schema.api = mergeDeep( get(schema, 'api', {}), this.request) 

      if( get(schema, 'api.bypassGetData', false) )
          this.resource = this.formValues[this.name]
      else
          this.resource = this.formValues

      schema.api.resource = this.resource
          
      return schema
    }
  },
  async beforeMount(){
    this.renderComponent = false

    if( typeof this.schemaProp == 'string' ){ 
      var loadedSchema = await this.loadSubmodel(this.schemaProp)
      loadedSchema = mergeDeep(loadedSchema, this.context.overwrite)
 
      this.schema = this.transformSchema( loadedSchema ) 
    }else{
      this.schema = mergeDeep(this.transformSchema( this.schemaProp ), this.context.overwrite) 
    }

    // if( this.schema.type == 'form' )
    //   await this.loadForm()

    this.renderComponent = true
  }
}
</script>
