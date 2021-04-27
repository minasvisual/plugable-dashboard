<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
    v-if="renderComponent"
  > 
    <Table
      ref="tables" 
      v-if="schema.api"
      :schema="schema"
      :resource="resource"
      @actions:create="onCreate"
      @actions:edit="onEdit"
      @actions:delete="onDelete"
      @actions:deleteBatch="bulkDelete" 
    >
    </Table>
 
    <CModal
      :title="'Edit row'"
      :show.sync="formopen"
      :closeOnBackdrop="false"
    >
      <Form
          ref="forms" 
          v-if="formopen"
          :formopen="formopen"
          :schema="schema" 
          :data="(row.data || {})"
          @model:saved="submit"
          @close="closeForm"
        /> 
  
        <template slot="footer"><span></span></template>
    </CModal>
  </div>
</template>

<script>
import { get, has, findIndex, merge } from 'lodash'
import ControllerMixin from '../../../services/controller.mixin'

import Table from '../table'
import Form from '../formulate'

export default {
  mixins: [ControllerMixin],
  components:{
    Table, Form
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
        formopen: false,
        row: null,
        resource:[]
    }
  },
  computed: {
    model:{
      get(){ 
          return this.context.model 
      },
      set(value){
          this.context.model = value
      }
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
    closeForm({ refresh }){
      if( refresh ) this.forceRerender()

      this.row = { index:null, data:{} }
      this.formopen = false
    },
    onCreate() { 
      this.row = { index:null, data:{} }
      this.formopen = true
    },
    onEdit(data){
      let index = null
      console.log('form edit click', data)
      let primaryKey = get(this.schema, 'primaryKey', 'id')
      
      if( this.isStandalone && Array.isArray(this.resource)) 
        index = findIndex(this.resource, [primaryKey, data[primaryKey]])

      this.row = { index, data }
      this.formopen = true
    },
    onDelete(row){
      let index = null
      let primaryKey = get(this.schema, 'primaryKey', 'id')
      
      if( this.isStandalone && Array.isArray(this.resource)) 
        index = findIndex(this.resource, [primaryKey, data[primaryKey]])

      if( index !== null && confirm('Are you sure to delete?') ){
       this.model.splice(index, 1)
       this.$message('Deleted with success') 
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selectedRow = val
    },
    async bulkDelete() {
      if( confirm(`Are you sure to delete ${this.selectedRow.length} rows?`) ){
        for(let row of this.selectedRow){
            this.model.splice(row, 1)
        }
        
        this.formopen = false
        this.$message('Deleted with success') 
      }
    },
    saveRow(data){
      if( this.row.index === null ){
        this.context.model.push(data)
        this.$message('Added with success') 
      }else{
        this.context.model[this.row.index] = data;
        this.$message('Update with success') 
      }
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    async submit(data){
      if( this.isStandalone ){
        this.saveRow(data)
      }else{
        this.$refs.forms.loader = true
        await this.saveData(this.schema, data).then(({data}) => {
            console.debug('Sucess saved', data)
        })
        this.$refs.forms.loader = true
      }
      this.row = { index:null, data:{} }
      this.formopen = false
      this.forceRerender()
    },
    async loadSubmodel(modelPath){
       let url = this.currentProject.resources_path + modelPath
      return await this.loadModelByUrl(url).catch(err => this.$message(`Error to load submodel: ${err.message}`))
    },
    transformSchema(schema){
      schema.api = Object.assign( get(schema, 'api', {}), this.request) 

      return schema
    }
  },
  async mounted(){
    if( typeof this.schemaProp == 'string' ){ 
      let loadedSchema = await this.loadSubmodel(this.schemaProp)
      console.debug('loaded model', loadedSchema, this.context.overwrite )
      this.schema = this.transformSchema( merge( loadedSchema, (this.context.overwrite || {})) )
    }else{
      this.schema = this.transformSchema( this.schemaProp ) 
    }

    if( get(this.schema, 'api.bypassGetData', false) )
        this.resource = this.model
    else
        this.resource = this.formValues

    this.renderComponent = true
  },
}
</script>
