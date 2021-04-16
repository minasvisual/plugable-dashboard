<template>
    <div class="form-loader w-100 text-center" v-if="loader">
      <CSpinner color="info"/>
    </div>
    <FormulateForm 
          v-else
          v-model="model"
          :schema="form"
          @submit="submit"
          #default="{ hasErrors }"
    >
    <div class="action-buttons mt-3">
      <CButton
          type="button"
          color="danger"
          class="mr-2"
          @click="$emit('close', { refresh: false })"
        >
            Cancel
      </CButton>
      <CButton
          type="submit"
          color="success"
          :disabled="hasErrors"
        >
            Save
      </CButton>
    </div>
    </FormulateForm>
</template>

<script>
import { get } from 'lodash'
import { schemaColumns, formatDate, formatModel } from '../../services/helpers'
import ControllerMixin from '../../services/controller.mixin'

export default {
    mixins:[ControllerMixin],
    data(){
      return{
        form: [],
        model: {},
        columns: [],
        loader: true
      }
    },
    props:{
      schema: {
        type:Object,
        default: () => ([])
      },
      data: Object
    },
    computed:{
      primaryKey(){
        return get(this.schema, 'primaryKey', 'id')
      },
      isStandalone(){
        return get(this.schema, 'api.bypassGetByid', false) || get(this.schema, 'api.bypassGetData', false)
      }
    },
    mounted(){
      ( this.isStandalone ? Promise.resolve(this.data) : this.getRow() ).then( (data) => {
            this.form =  this.schema.properties
            this.columns = schemaColumns(this.schema.properties)
            data = formatModel(this.columns, data)
            
            this.model = data
            this.loader = false
        }).catch((err) => {
          console.debug('Form mounted error', err)
          this.$message(err.message, 'danger')
            
          this.loader = false
        })
    },
    methods: {
      async submit (data) {
        this.$emit('model:saved', data)
        
        return data
      },
      getRow(){
          if( !this.data || Object.keys( this.data ).length == 0 ) return Promise.resolve({})

          return this.getData(this.schema, this.data)
      }
    },
}
</script>

<style lang="scss">

.formulate-input{
  width: 100% !important;
  margin-right: 10px;
  &:last-child{
    margin-right: 0;
  }
}
.formulate-input-element{
  	max-width: 100% !important;
    input[readonly] {
      background: #eee;
    }
}
.action-buttons{
  justify-content: flex-end;
  display: flex;
  .formulate-input:first-child{
    margin-right: 10px;
  }
}

</style>